#include <LiquidCrystal_I2C.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <AltSoftSerial.h>
#include <math.h>
#include <Wire.h>

#define DELAY_MS 2000

// must add i2c lcd address use i2c-scanner.ino file
LiquidCrystal_I2C lcd(0x27, 16, 2);
//--------------------------------------------------------------
// emergency phone number with country code
// const String EMERGENCY_PHONE = "ENTER_EMERGENCY_PHONE_NUMBER";
//--------------------------------------------------------------
// GSM Module RX pin to Arduino 3
// GSM Module TX pin to Arduino 2
SoftwareSerial SIM800(2, 3);
//--------------------------------------------------------------
// GPS Module RX pin to Arduino 9
// GPS Module TX pin to Arduino 8
AltSoftSerial neogps;
TinyGPSPlus gps;
//--------------------------------------------------------------
#define xPin A1
#define yPin A2
#define zPin A3

#define GREEN_BUTTON 5
#define BLUE_BUTTON 6
#define RED_BUTTON 7
#define BUZZER 10
//--------------------------------------------------------------

const String APN = "mobitel"; // hutch3g // dialogbb // mobitel

char deviceID[8] = "DEVICE1";
String latitude = "6.05433";
String longitude = "80.20042";
String activeState = "accident";

short xaxis = 0, yaxis = 0, zaxis = 0;
short vibration = 10, devibrate = 150;
short magnitude = 0;
short sensitivity = 120;
byte updateflag;
String critical_level = "";

boolean impact_detected = false;
// Used to run impact routine every 2mS.
unsigned long time1;
// unsigned long impact_time;
// unsigned long alert_delay = 30000; // 30 seconds
//--------------------------------------------------------------

// Function prototypes
void Impact();
void criticalLevel();
void getGps();
void init_gps();
void init_gsm();
void gprs_connect();
void sendToServer();
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
    pinMode(GREEN_BUTTON, INPUT);
    pinMode(BLUE_BUTTON, INPUT);
    pinMode(RED_BUTTON, INPUT);
    //--------------------------------------------------------------

    lcd.init();
    lcd.backlight();
    lcd.clear();
    lcd.setCursor(4, 0);
    lcd.print("PROTEGO");
    delay(5000);

    init_gsm();

    while (!is_gprs_connected())
    {
        gprs_connect();
    }

    init_gps();

    lcd.clear();
    time1 = micros();

    //--------------------------------------------------------------
    // sms_status = "";
    // sender_number = "";
    // received_date = "";
    // msg = "";
    //--------------------------------------------------------------

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

    //--------------------------------------------------------------
    //  call impact routine every 2mS
    if (micros() - time1 > 1999)
        Impact();
    //--------------------------------------------------------------
    if (updateflag > 0)
    {
        updateflag = 0;
        digitalWrite(BUZZER, HIGH);

        Serial.println("Impact detected!!");
        Serial.print("Magnitude:");
        Serial.println(magnitude);

        lcd.clear();
        lcd.setCursor(0, 0); // col=0 row=0
        lcd.print("Crash Detected");
        lcd.setCursor(0, 1); // col=0 row=1
        lcd.print("Magnitude:" + String(magnitude));
        delay(5000);

        lcd.clear();
        lcd.setCursor(2, 0);
        lcd.print("Update Your");
        lcd.setCursor(1, 1);
        lcd.print("Critical Level");

        getGps();
        criticalLevel();

        lcd.clear();
        lcd.setCursor(1, 0);
        lcd.print("CRITICAL LEVEL");
        lcd.setCursor(0, 1);
        lcd.print(critical_level);

        //        impact_detected = true;
        //        impact_time = millis();
    }

    if (critical_level == "RED")
    {

        //        String sendtoserver_data;
        // sendtoserver_data = "{\"longitude\":\"" + longitude + "\",\"latitude\":\"" + latitude + "\",\"deviceNum\":\"" + deviceID + "\",\"activeState\":\"" + activeState + "\"}";
        //        sendtoserver_data = "";

        // Serial.println(sendtoserver_data);

        while (!is_gprs_connected())
        {
            gprs_connect();
        }

        while (true)
        {
            sendToServer();
            // delay(4000);
        }
    }

    //--------------------------------------------------------------
    // if (impact_detected == true)
    // {
    //     if (millis() - impact_time >= alert_delay)
    //     {
    //         // digitalWrite(BUZZER, LOW);
    //         // makeCall();
    //         // delay(1000);
    //         // sendAlert();
    //         impact_detected = false;
    //         impact_time = 0;
    //     }
    // }

    // if (digitalRead(BUTTON) == LOW)
    // {
    //     delay(200);
    //     digitalWrite(BUZZER, LOW);
    //     impact_detected = false;
    //     impact_time = 0;
    // }
    //--------------------------------------------------------------
    // while (SIM800.available())
    // {
    //     parseData(SIM800.readString());
    // }
    //--------------------------------------------------------------
    // while (Serial.available())
    // {
    //     SIM800.println(Serial.readString());
    // }
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
    short oldx = xaxis; // store previous axis readings for comparison
    short oldy = yaxis;
    short oldz = zaxis;

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

    // Magnitude to calculate force of impact.
    magnitude = sqrt(sq(xaxis - oldx) + sq(yaxis - oldy) + sq(zaxis - oldz));
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

void sendToServer()
{

    String data;
    data = "{\"longitude\":\"" + longitude + "\",\"latitude\":\"" + latitude + "\",\"deviceNum\":\"" + deviceID + "\",\"activeState\":\"" + activeState + "\"}";
    Serial.println(data);

    SIM800.println("AT+HTTPINIT");
    int res = waitResponse();
    if (!res)
    {
        SIM800.println("AT+HTTPTERM");
        waitResponse();
        delay(DELAY_MS);

        SIM800.println("AT+HTTPINIT");
        waitResponse();
    }
    delay(DELAY_MS);

    SIM800.println("AT+HTTPPARA=\"CID\",1");
    waitResponse();
    delay(DELAY_MS);

    SIM800.println("AT+HTTPPARA=\"URL\",\"http://54.255.195.190:5000/api/accident\""); // Server address
    waitResponse();
    delay(DELAY_MS);

    SIM800.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
    waitResponse();
    delay(DELAY_MS);

    // SIM800.println("AT+HTTPDATA=" + String(data.length()) + ",100000");
    SIM800.println("AT+HTTPDATA=\"100\",100000");
    waitResponse();
    delay(DELAY_MS);

    SIM800.println(data);
    waitResponse();
    delay(DELAY_MS);

    SIM800.println("AT+HTTPACTION=1");
    waitResponse();
    delay(DELAY_MS);

    SIM800.println("AT+HTTPREAD");
    waitResponse("OK");
    delay(DELAY_MS);

    SIM800.println("AT+HTTPTERM");
    waitResponse("OK");
    delay(DELAY_MS);
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
    Serial.print("Logitude= ");
    Serial.println(longitude);
}

/*****************************************************************************************
 * criticalLevel() Function
 *****************************************************************************************/
void criticalLevel()
{
    for (unsigned long start = millis(); millis() - start < 5000;)
    {
        if (digitalRead(GREEN_BUTTON) == HIGH)
        {
            critical_level = "GREEN";
            Serial.println("GREEN");
            digitalWrite(BUZZER, LOW);
            return;
        }
        else if (digitalRead(BLUE_BUTTON) == HIGH)
        {
            critical_level = "BLUE";
            Serial.println("BLUE");
            digitalWrite(BUZZER, LOW);
            return;
        }
        else if (digitalRead(RED_BUTTON) == HIGH)
        {
            critical_level = "RED";
            Serial.println("RED");
            digitalWrite(BUZZER, LOW);
            return;
        }
    }
    critical_level = "RED";
    digitalWrite(BUZZER, LOW);
}

/*****************************************************************************************
 * init_gps() function
 *****************************************************************************************/
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
                    lcd.print("GPS Connected!");
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
 * init_gsm() function
 *****************************************************************************************/
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

/*****************************************************************************************
 * gprs_connect() function
 *****************************************************************************************/
void gprs_connect()
{

    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connecting GPRS");
    lcd.setCursor(0, 1);

    for (int i = 0; i < 16; i++)
    {
        lcd.print(".");
        delay(200);
    }

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

    if (is_gprs_connected())
    {
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("GPRS Connected!");
        delay(3000);
    }
}

/*****************************************************************************************
 * is_gprs_connected() function
 *****************************************************************************************/
boolean is_gprs_connected()
{
    SIM800.println("AT+SAPBR=2,1");
    if (waitResponse("0.0.0.0") == 1)
    {
        return false;
    }

    return true;
}

/*****************************************************************************************
 * gprs_disconnect() function
 *****************************************************************************************/
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

/*****************************************************************************************
 * waitResponse() function
 *****************************************************************************************/
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