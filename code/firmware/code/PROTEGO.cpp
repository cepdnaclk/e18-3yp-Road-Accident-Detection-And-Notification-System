#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <AltSoftSerial.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <math.h>
#include <Wire.h>

#define DELAY_MS 5000

// must add i2c lcd address use i2c-scanner.ino file
LiquidCrystal_I2C lcd(0x27, 16, 2);
//--------------------------------------------------------------
// emergency phone number with country code
const String EMERGENCY_PHONE = "ENTER_EMERGENCY_PHONE_NUMBER";
//--------------------------------------------------------------
// GSM Module RX pin to Arduino 3
// GSM Module TX pin to Arduino 2
SoftwareSerial SIM800(2, 3);
//--------------------------------------------------------------
// GPS Module RX pin to Arduino 9
// GPS Module TX pin to Arduino 8
SoftwareSerial neogps(8, 9);
TinyGPSPlus gps;
//--------------------------------------------------------------
String sms_status, sender_number, received_date, msg;
//--------------------------------------------------------------
#define BUZZER 12
#define BUTTON 11
//--------------------------------------------------------------
#define xPin A1
#define yPin A2
#define zPin A3
//--------------------------------------------------------------

byte updateflag;

const String APN = "mobitel"; // hutch3g // dialogbb // mobitel

char deviceID[8] = "DEVICE1";
String latitude = "6.05433";
String longitude = "80.20042";
String activeState = "accident";

int xaxis = 0, yaxis = 0, zaxis = 0;
int deltx = 0, delty = 0, deltz = 0;
int vibration = 2, devibrate = 75;
int magnitude = 0;
int sensitivity = 20;
double angle;

boolean impact_detected = false;
// Used to run impact routine every 2mS.
unsigned long time1;
unsigned long impact_time;
unsigned long alert_delay = 30000; // 30 seconds
//--------------------------------------------------------------

// Function prototypes
void sendSms(String text);
void makeCall();
void sendAlert();
void getGps();
void parseData(String buff);
void Impact();
void init_gps();
void init_gsm();
void gprs_connect();
boolean gprs_disconnect();
boolean is_gprs_connected();
boolean waitResponse(String expected_answer = "OK", unsigned int timeout = 2000);

/*****************************************************************************************
 * setup() function
 *****************************************************************************************/
void setup()
{
    //--------------------------------------------------------------
    // Serial.println("Arduino serial initialize");
    Serial.begin(9600);
    //--------------------------------------------------------------
    // Serial.println("SIM800L serial initialize");
    SIM800.begin(9600);
    //--------------------------------------------------------------
    // Serial.println("NEO6M serial initialize");
    neogps.begin(9600);
    //--------------------------------------------------------------
    pinMode(BUZZER, OUTPUT);
    pinMode(BUTTON, INPUT_PULLUP);
    //--------------------------------------------------------------
    // initialize lcd screen
    lcd.init();
    // turn on the backlight
    lcd.backlight();
    lcd.clear();
    lcd.setCursor(4, 0);
    lcd.print("PROTEGO");
    delay(5000);

    SIM800.println("AT"); // Check GSM Module
    waitResponse();
    delay(1000);

    init_gsm();

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connecting GPRS");
    lcd.setCursor(0, 1);

    while (!is_gprs_connected())
    {
        gprs_connect();
    }

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("GPRS Connected!");
    Serial.println("GPRS Connected!");
    delay(3000);

    init_gps();

    //--------------------------------------------------------------
    sms_status = "";
    sender_number = "";
    received_date = "";
    msg = "";
    //--------------------------------------------------------------

    //   SIM800.println("AT"); //Check GSM Module
    //   delay(1000);
    //   //SendAT("AT", "OK", 2000); //Check GSM Module
    //   SIM800.println("ATE1"); //Echo ON
    //   delay(1000);
    //   //SendAT("ATE1", "OK", 2000); //Echo ON
    //   SIM800.println("AT+CPIN?"); //Check SIM ready
    //   delay(1000);
    //   //SendAT("AT+CPIN?", "READY", 2000); //Check SIM ready
    //   SIM800.println("AT+CMGF=1"); //SMS text mode
    //   delay(1000);
    //   //SendAT("AT+CMGF=1", "OK", 2000); //SMS text mode
    //   SIM800.println("AT+CNMI=1,1,0,0,0"); /// Decides how newly arrived SMS should be handled
    //   delay(1000);
    //   //SendAT("AT+CNMI=1,1,0,0,0", "OK", 2000); //set sms received format
    //   //AT +CNMI = 2,1,0,0,0 - AT +CNMI = 2,2,0,0,0 (both are same)
    //   //--------------------------------------------------------------
    //   time1 = micros();
    //   //Serial.print("time1 = "); Serial.println(time1);
    //   //--------------------------------------------------------------
    //   //read calibrated values. otherwise false impact will trigger
    //   //when you reset your Arduino. (By pressing reset button)

    xaxis = analogRead(xPin);
    yaxis = analogRead(yPin);
    zaxis = analogRead(zPin);
    //--------------------------------------------------------------
}

/*****************************************************************************************
 * loop() function
 *****************************************************************************************/
void loop()
{
    lcd.clear();
    //--------------------------------------------------------------
    // call impact routine every 2mS
    if (micros() - time1 > 1999)
        Impact();
    //--------------------------------------------------------------
    if (updateflag > 0)
    {
        updateflag = 0;
        Serial.println("Impact detected!!");
        Serial.print("Magnitude:");
        Serial.println(magnitude);

        getGps();
        digitalWrite(BUZZER, HIGH);
        impact_detected = true;
        impact_time = millis();

        lcd.clear();
        lcd.setCursor(0, 0); // col=0 row=0
        lcd.print("Crash Detected");
        lcd.setCursor(0, 1); // col=0 row=1
        lcd.print("Magnitude:" + String(magnitude));
    }
    //--------------------------------------------------------------
    if (impact_detected == true)
    {
        if (millis() - impact_time >= alert_delay)
        {
            digitalWrite(BUZZER, LOW);
            makeCall();
            delay(1000);
            sendAlert();
            impact_detected = false;
            impact_time = 0;
        }
    }

    if (digitalRead(BUTTON) == LOW)
    {
        delay(200);
        digitalWrite(BUZZER, LOW);
        impact_detected = false;
        impact_time = 0;
    }
    //--------------------------------------------------------------
    while (SIM800.available())
    {
        parseData(SIM800.readString());
    }
    //--------------------------------------------------------------
    while (Serial.available())
    {
        SIM800.println(Serial.readString());
    }
    //--------------------------------------------------------------
}

/*****************************************************************************************
 * Impact() function
 *****************************************************************************************/
void Impact()
{
    //--------------------------------------------------------------
    time1 = micros(); // resets time value
    //--------------------------------------------------------------
    int oldx = xaxis; // store previous axis readings for comparison
    int oldy = yaxis;
    int oldz = zaxis;

    xaxis = analogRead(xPin);
    yaxis = analogRead(yPin);
    zaxis = analogRead(zPin);

    //--------------------------------------------------------------
    // loop counter prevents false triggering. Vibration resets if there is an impact. Don't detect new changes until that "time" has passed.
    vibration--;
    // Serial.print("Vibration = "); Serial.println(vibration);
    if (vibration < 0)
        vibration = 0;
    // Serial.println("Vibration Reset!");

    if (vibration > 0)
        return;
    //--------------------------------------------------------------
    deltx = xaxis - oldx;
    delty = yaxis - oldy;
    deltz = zaxis - oldz;

    // Magnitude to calculate force of impact.
    magnitude = sqrt(sq(deltx) + sq(delty) + sq(deltz));
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    if (magnitude >= sensitivity) // impact detected
    {
        updateflag = 1;
        // reset anti-vibration counter
        vibration = devibrate;
    }
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    else
    {
        // if (magnitude > 15)
        // Serial.println(magnitude);
        // reset magnitude of impact to 0
        magnitude = 0;
    }
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
}

void init_gps()
{
    lcd.clear();
    lcd.setCursor(1, 0);
    lcd.print("Connecting GPS");
    lcd.setCursor(0, 1);

    for (int i = 0; i < 16; i++)
    {
        lcd.print(".");
        delay(200);
    }

    while (true)
    {
        while (neogps.available() > 0)
        {
            if (gps.encode(neogps.read()))
            {
                if (gps.location.isValid())
                {
                    // Serial.print(gps.location.lat(), 6);
                    // Serial.print(F(","));
                    // Serial.print(gps.location.lng(), 6);
                    // Serial.println();

                    lcd.clear();
                    lcd.setCursor(1, 0);
                    lcd.print("GPS Connected");
                    delay(5000);
                    return;
                }
            }
        }
    }

    if (millis() > 5000 && gps.charsProcessed() < 10)
    {
        // lcd.print("NO GPS : Check Wiring");
        Serial.println(F("No GPS detected: check wiring."));
        while (true)
            ;
    }
}
/*****************************************************************************************
 * parseData() function
 *****************************************************************************************/
void parseData(String buff)
{
    Serial.println(buff);

    unsigned int len, index;
    //--------------------------------------------------------------
    // Remove sent "AT Command" from the response string.
    index = buff.indexOf("\r");
    buff.remove(0, index + 2);
    buff.trim();
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    if (buff != "OK")
    {
        //--------------------------------------------------------------
        index = buff.indexOf(":");
        String cmd = buff.substring(0, index);
        cmd.trim();

        buff.remove(0, index + 2);
        // Serial.println(buff);
        //--------------------------------------------------------------
        if (cmd == "+CMTI")
        {
            // get newly arrived memory location and store it in temp
            // temp = 4
            index = buff.indexOf(",");
            String temp = buff.substring(index + 1, buff.length());
            temp = "AT+CMGR=" + temp + "\r";
            // AT+CMGR=4 i.e. get message stored at memory location 4
            SIM800.println(temp);
        }
        //--------------------------------------------------------------
        else if (cmd == "+CMGR")
        {
            // extractSms(buff);
            // Serial.println(buff.indexOf(EMERGENCY_PHONE));
            if (buff.indexOf(EMERGENCY_PHONE) > 1)
            {
                buff.toLowerCase();
                // Serial.println(buff.indexOf("get gps"));
                if (buff.indexOf("get gps") > 1)
                {
                    getGps();
                    String sms_data;
                    sms_data = "GPS Location Data\r";
                    sms_data += "http://maps.google.com/maps?q=loc:";
                    sms_data += latitude + "," + longitude;

                    sendSms(sms_data);
                }
            }
        }
        //--------------------------------------------------------------
    }
    else
    {
        // The result of AT Command is "OK"
    }
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
}

/*****************************************************************************************
 * getGps() Function
 *****************************************************************************************/
void getGps()
{
    // Can take up to 60 seconds
    boolean newData = false;
    for (unsigned long start = millis(); millis() - start < 2000;)
    {
        while (neogps.available())
        {
            if (gps.encode(neogps.read()))
            {
                newData = true;
                break;
            }
        }
    }

    if (newData) // If newData is true
    {
        latitude = String(gps.location.lat(), 6);
        longitude = String(gps.location.lng(), 6);
        newData = false;
    }
    else
    {
        Serial.println("No GPS data is available");
        latitude = "";
        longitude = "";
    }

    Serial.print("Latitude= ");
    Serial.println(latitude);
    Serial.print("Lngitude= ");
    Serial.println(longitude);
}

/*****************************************************************************************
 * sendAlert() function
 *****************************************************************************************/
void sendAlert()
{
    String sms_data;
    sms_data = "Accident Alert!!\r";
    sms_data += "http://maps.google.com/maps?q=loc:";
    sms_data += latitude + "," + longitude;

    sendSms(sms_data);
}

/*****************************************************************************************
 * makeCall() function
 *****************************************************************************************/
void makeCall()
{
    Serial.println("calling....");
    SIM800.println("ATD" + EMERGENCY_PHONE + ";");
    delay(20000); // 20 sec delay
    SIM800.println("ATH");
    delay(1000); // 1 sec delay
}

/*****************************************************************************************
 * sendSms() function
 *****************************************************************************************/
void sendSms(String text)
{
    // return;
    SIM800.print("AT+CMGF=1\r");
    delay(1000);
    SIM800.print("AT+CMGS=\"" + EMERGENCY_PHONE + "\"\r");
    delay(1000);
    SIM800.print(text);
    delay(100);
    SIM800.write(0x1A); // ascii code for ctrl-26 //SIM800.println((char)26); //ascii code for ctrl-26
    delay(1000);
    Serial.println("SMS Sent Successfully.");
}

void init_gsm()
{
    lcd.clear();
    lcd.setCursor(1, 0);
    lcd.print("Connecting GSM");
    lcd.setCursor(0, 1);

    for (int i = 0; i < 16; i++)
    {
        lcd.print(".");
        delay(200);
    }

    // Testing AT Command
    SIM800.println("AT");
    waitResponse();
    delay(DELAY_MS);

    // Checks if the SIM is ready
    SIM800.println("AT+CPIN?");
    waitResponse("+CPIN: READY");
    delay(DELAY_MS);

    // Turning ON full functionality
    SIM800.println("AT+CFUN=1");
    waitResponse();
    delay(DELAY_MS);

    // Register Network (+CREG: 0,1 or +CREG: 0,5 for valid network)
    //+CREG: 0,1 or +CREG: 0,5 for valid network connection
    SIM800.println("AT+CREG?");
    waitResponse("+CREG: 0,");
    delay(DELAY_MS);

    lcd.clear();
    lcd.setCursor(1, 0);
    lcd.print("GSM Connected!");
    delay(3000);
}

void gprs_connect()
{

    // attach or detach from GPRS service
    SIM800.println("AT+CGATT?");
    waitResponse("OK", 2000);
    delay(DELAY_MS);

    // Connecting to GPRS: GPRS - bearer profile 1
    SIM800.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
    waitResponse();
    delay(DELAY_MS);

    // sets the APN settings for your sim card network provider.
    SIM800.println("AT+SAPBR=3,1,\"APN\"," + APN);
    waitResponse();
    delay(DELAY_MS);

    // after executing the following command. the LED light of
    // sim800l blinks very fast (twice a second)
    // enable the GPRS: enable bearer 1
    SIM800.println("AT+SAPBR=1,1");
    waitResponse("OK", 30000);
    delay(DELAY_MS);

    // Get IP Address - Query the GPRS bearer context status
    SIM800.println("AT+SAPBR=2,1");
    waitResponse("OK");
    delay(DELAY_MS);
}

boolean is_gprs_connected()
{
    SIM800.println("AT+SAPBR=2,1");
    if (waitResponse("0.0.0.0") == 1)
    {
        return false;
    }

    return true;
}

boolean gprs_disconnect()
{
    // Disconnect GPRS
    SIM800.println("AT+CGATT=0");
    waitResponse("OK", 60000);
    // delay(DELAY_MS);

    // DISABLE GPRS
    // SIM800.println("AT+SAPBR=0,1");
    // waitResponse("OK",60000);
    // delay(DELAY_MS);

    return true;
}

boolean waitResponse(String expected_answer, unsigned int timeout)
{
    uint8_t x = 0, answer = 0;
    String response;
    unsigned long previous;

    // Clean the input buffer
    while (SIM800.available() > 0)
        SIM800.read();

    previous = millis();
    do
    {
        // if data in UART INPUT BUFFER, reads it
        if (SIM800.available() != 0)
        {
            char c = SIM800.read();
            response.concat(c);
            x++;
            // checks if the (response == expected_answer)
            if (response.indexOf(expected_answer) > 0)
            {
                answer = 1;
            }
        }
    } while ((answer == 0) && ((millis() - previous) < timeout));

    Serial.println(response);
    return answer;
}