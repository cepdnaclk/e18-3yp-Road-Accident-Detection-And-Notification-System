#include <Arduino.h>
#include <LiquidCrystal_I2C.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <AltSoftSerial.h>
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
AltSoftSerial neogps;
TinyGPSPlus gps;
//--------------------------------------------------------------
#define xPin A1
#define yPin A2
#define zPin A3

#define GREEN_BUTTON 5
#define BLUE_BUTTON 6
#define RED_BUTTON 7
//--------------------------------------------------------------

const String APN = "mobitel"; // hutch3g // dialogbb // mobitel

char deviceID[8] = "DEVICE1";
String latitude = "6.05433";
String longitude = "80.20042";
String activeState = "accident";

// Function prototypes
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
    // pinMode(BUZZER, OUTPUT);
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

    //--------------------------------------------------------------
    // sms_status = "";
    // sender_number = "";
    // received_date = "";
    // msg = "";
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

    // xaxis = analogRead(xPin);
    // yaxis = analogRead(yPin);
    // zaxis = analogRead(zPin);
    //--------------------------------------------------------------
}

/*****************************************************************************************
 * loop() function
 *****************************************************************************************/
void loop()
{
    if (digitalRead(GREEN_BUTTON) == HIGH)
    {
        Serial.println("Green Pressed");
    }
    else if (digitalRead(BLUE_BUTTON) == HIGH)
    {
        Serial.println("Blue Pressed");
    }
    else if (digitalRead(RED_BUTTON) == HIGH)
    {
        Serial.println("Red Pressed");
    }
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
