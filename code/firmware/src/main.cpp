#include <LiquidCrystal_I2C.h>
//#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <math.h>
#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define DELAY_MS 2000

// must add i2c lcd address use i2c-scanner.ino file
// SDA - GPIO21 - D21
// SCL - GPIO22 - D22
LiquidCrystal_I2C lcd(0x27, 16, 2);
//--------------------------------------------------------------
// emergency phone number with country code
//--------------------------------------------------------------
// GSM Module RX pin to Arduino 12
// GSM Module TX pin to Arduino 13
SoftwareSerial SIM800(13, 12);
//--------------------------------------------------------------
// GPS Module RX pin to Arduino 18
// GPS Module TX pin to Arduino 5
//SoftwareSerial neogps(18,5);
//TinyGPSPlus gps;
//--------------------------------------------------------------
#define xPin 34
#define yPin 35
#define zPin 32

#define GREEN_BUTTON 27
#define BLUE_BUTTON 26
#define RED_BUTTON 25
#define BUZZER 15
//--------------------------------------------------------------

const String APN = "mobitel"; // hutch3g // dialogbb // mobitel

char deviceID[8] = "DEVICE1";
String latitude = "80.591636";
String longitude = "7.254101";
String activeState = "";

int xaxis = 0, yaxis = 0, zaxis = 0;
int vibration = 15, devibrate = 100;
int magnitude = 0;
int sensitivity = 600;
boolean isAccidentDetected = false;
boolean isDataSentSuccessfully = false;
String critical_level = "";

boolean impact_detected = false;
boolean in_critical_stage = false;
// Used to run impact routine every 2mS.
unsigned long time1;
// unsigned long impact_time;
// unsigned long alert_delay = 30000; // 30 seconds
//--------------------------------------------------------------

const char* ssid = "SHEHAN";
const char* password = "123456789";
const char* serverName = "http://54.255.195.190:5000/api/accident";
unsigned long lastTime = 0;
String payload = "{}";
unsigned long previousMillis = 0;
unsigned long interval = 30000;

// Function prototypes
void Impact();
void criticalLevel();
void getGps();
void init_gps();
void init_wifi();
int sendToServer_wifi();
void init_gsm();
void gprs_connect();
void sendToServer_gprs();
boolean gprs_disconnect();
boolean is_gprs_connected();
boolean waitResponse(String expected_answer = "OK", unsigned int timeout = 2000);

/*****************************************************************************************
 * setup() function
 *****************************************************************************************/
void setup()
{
    //--------------------------------------------------------------
    Serial.begin(9600);
    //--------------------------------------------------------------
    SIM800.begin(9600);
    //--------------------------------------------------------------
//    neogps.begin(9600);
    //--------------------------------------------------------------
    pinMode(BUZZER, OUTPUT);
    pinMode(GREEN_BUTTON, INPUT);
    pinMode(BLUE_BUTTON, INPUT);
    pinMode(RED_BUTTON, INPUT);
    //--------------------------------------------------------------

    lcd.begin();
    lcd.backlight();
    lcd.clear();
    lcd.setCursor(4, 0);
    lcd.print("PROTEGO");
    delay(5000);

    init_gsm();

//    while (!is_gprs_connected())
//    {
//        gprs_connect();
//    }

    gprs_connect();
    //init_gps();

    init_wifi();

    time1 = micros();

    xaxis = analogRead(xPin);
    yaxis = analogRead(yPin);
    zaxis = analogRead(zPin);

    Serial.println(String(xaxis)+" "+String(yaxis)+" "+String(zaxis)+" ");
    //--------------------------------------------------------------

     lcd.clear();
     lcd.setCursor(4,0);
     lcd.print("PROTEGO");
     lcd.setCursor(2,1);
     lcd.print("DRIVE SAFE!");
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
    if (isAccidentDetected)
    {
        isAccidentDetected = false;
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
//      delay(3000);

        //getGps();
        criticalLevel();
        in_critical_stage = true;

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("CRITICAL LEVEL:");
        lcd.setCursor(0, 1);
        lcd.print(critical_level);
        delay(5000);

        //impact_detected = true;
        //impact_time = millis();
    }

    while(in_critical_stage){
      if ((critical_level == "HIGH CRITICAL" || critical_level == "MILD CRITICAL") && isDataSentSuccessfully == false)
    {

//        String sendtoserver_data;
//        sendtoserver_data = "{\"longitude\":\"" + longitude + "\",\"latitude\":\"" + latitude + "\",\"deviceNum\":\"" + deviceID + "\",\"activeState\":\"" + activeState + "\"}";
//        sendtoserver_data = "";
//
//        Serial.println(sendtoserver_data);

//        while (!is_gprs_connected())
//        {
//            gprs_connect();
//        }
//
//        while (true)
//        {
//            sendToServer();
//            delay(4000);
//        }

          lcd.clear();
          lcd.setCursor(0,0);
          lcd.print("Sending Data");
          lcd.setCursor(0,1);
          lcd.print("To The Server...");
          int res = sendToServer_wifi();
          Serial.println(res);
          Serial.println(payload);
          delay(5000);

            if(res == 200){

              DynamicJsonDocument doc(1024);
              deserializeJson(doc, payload);
              String phoneNum = doc[0]["phoneNum"];
              Serial.println(phoneNum);
              //sendAlert(phoneNum);
              delay(5000);
            }
          
            if(res == 200 || res == 401){
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("Data Sent");
            lcd.setCursor(0,1);
            lcd.print("Successfully....");

            delay(5000);
            lcd.clear();
            lcd.setCursor(4,0);
            lcd.print("PROTEGO");
            lcd.setCursor(2,1);
            lcd.print("DRIVE SAFE!");
            isDataSentSuccessfully = true;
            in_critical_stage = false;
         }
         
          else{
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("Data Cannot Sent");
            delay(5000);
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print("Connecting To");
            lcd.setCursor(0,1);
            lcd.print("Server Again....");
            delay(5000);
        }
    }
    else{
            lcd.clear();
            lcd.setCursor(4,0);
            lcd.print("PROTEGO");
            lcd.setCursor(2,1);
            lcd.print("DRIVE SAFE!");
            in_critical_stage = false;
    }
    }   
}



/*****************************************************************************************
 * sendAlert() function
 *****************************************************************************************/
void sendAlert(String pNum)
{
  String sms_data;
  sms_data = "PROTEGO...Accident Alert!!\r";
  sms_data += "http://maps.google.com/maps?q=loc:";
  sms_data += longitude + "," + latitude;
  sendSMS(sms_data, pNum);
}


void sendSMS(String message, String phoneNum) {
  SIM800.println("AT+CMGF=1"); // Set to text mode
  delay(1000);
  SIM800.println("AT+CMGS=\"" + phoneNum + "\""); // Send SMS to the specified phone number
  delay(1000);
  SIM800.println(message); // Send the message
  delay(1000);
  SIM800.println((char)26); // Send the ASCII value of ctrl+z
  delay(1000);
}


/*****************************************************************************************
 * Impact() function
 *****************************************************************************************/
void Impact()
{
    //Serial.println("Impact started");
    //--------------------------------------------------------------
    time1 = micros(); // resets time value
    //--------------------------------------------------------------
    int oldx = xaxis; // store previous axis readings for comparison
    int oldy = yaxis;
    int oldz = zaxis;

    xaxis = analogRead(xPin);
    yaxis = analogRead(yPin);
    zaxis = analogRead(zPin);

    Serial.println(String(oldx)+" "+String(oldy)+" "+String(oldz)+" ");
    Serial.println(String(xaxis)+" "+String(yaxis)+" "+String(zaxis)+" ");
    

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
    Serial.print("magnitude : ");
    Serial.println(magnitude);
    // NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
    if (magnitude >= sensitivity) // impact detected
    {
        isAccidentDetected = true;
        isDataSentSuccessfully = false;
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


/*****************************************************************************************
 * init_wifi() function
 *****************************************************************************************/
void init_wifi(){

//  if(WiFi.status() == WL_CONNECTED){
//    WiFi.disconnect();
//    delay(2000);
//    Serial.print("Wifi disconnected");
//  }
  
  WiFi.mode(WIFI_OFF);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(1000);
  WiFi.begin(ssid, password);
  delay(1000);
  //Serial.println("Connecting to Wifi");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
//  Serial.println("");
//  Serial.print("Connected to WiFi network with IP Address: ");
//  Serial.println(WiFi.localIP());

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Components-Setup");
  lcd.setCursor(3,1);
  lcd.print("Completed");
  delay(5000);
}


/*****************************************************************************************
 * sendToServer_wifi() function
 *****************************************************************************************/
int sendToServer_wifi(){
   unsigned long currentMillis = millis();
  // if WiFi is down, try reconnecting every CHECK_WIFI_TIME seconds
  if ((WiFi.status() != WL_CONNECTED) && (currentMillis - previousMillis >=interval)) {
    Serial.print(millis());
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    delay(1000);
    WiFi.reconnect();
    delay(1000);
    previousMillis = currentMillis;
  }
  
  int httpResponseCode;
  if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      delay(1000);
      http.addHeader("Content-Type", "application/json");
      delay(1000);
      String data = "{\"longitude\":\"" + longitude + "\",\"latitude\":\"" + latitude + "\",\"deviceNum\":\"" + deviceID + "\",\"activeState\":\"" + activeState + "\"}";
      httpResponseCode  = http.POST(data);
      delay(1000);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      
      payload = http.getString();
      delay(1000);
      // Free resources
      http.end();
      delay(1000);
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    return httpResponseCode;
}


/*****************************************************************************************
 * sendToServer_gprs() function
 *****************************************************************************************/
void sendToServer_gprs()
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

    SIM800.println("{\"longitude\":\"80.20042\",\"latitude\":\"6.05433\",\"deviceNum\":\"Device1\",\"activeState\":\"accident\"}");
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
//    // Can take up to 60 seconds
//    boolean newData = false;
//    for (unsigned long start = millis(); millis() - start < 2000;)
//    {
//        while (neogps.available())
//        {
//            if (gps.encode(neogps.read()))
//            {
//                newData = true;
//                break;
//            }
//        }
//    }
//
//    if (newData) // If newData is true
//    {
//        latitude = String(gps.location.lat(), 6);
//        longitude = String(gps.location.lng(), 6);
//        newData = false;
//    }
//    else
//    {
//        Serial.println("No GPS data is available");
//        latitude = "";
//        longitude = "";
//    }
//
//    Serial.print("Latitude= ");
//    Serial.println(latitude);
//    Serial.print("Logitude= ");
//    Serial.println(longitude);
}

/*****************************************************************************************
 * criticalLevel() Function
 *****************************************************************************************/
void criticalLevel()
{
    for (unsigned long start = millis(); millis() - start < 15000;)
    {
        if (digitalRead(GREEN_BUTTON) == HIGH)
        {
            critical_level = "FALSE ALARM";
            Serial.println("GREEN");
            digitalWrite(BUZZER, LOW);
            return;
        }
        else if (digitalRead(BLUE_BUTTON) == HIGH)
        {
            critical_level = "MILD CRITICAL";
            activeState = "Mild CRITICAL";
            Serial.println("BLUE");
            digitalWrite(BUZZER, LOW);
            return;
        }
        else if (digitalRead(RED_BUTTON) == HIGH)
        {
            critical_level = "HIGH CRITICAL";
            activeState = "HIGH CRITICAL";
            Serial.println("RED");
            digitalWrite(BUZZER, LOW);
            return;
        }
    }
    
    critical_level = "HIGH CRITICAL";
    digitalWrite(BUZZER, LOW);
}

/*****************************************************************************************
 * init_gps() function
 *****************************************************************************************/
void init_gps()
{
//    lcd.clear();
//    lcd.setCursor(1, 0);
//    lcd.print("Connecting GPS");
//    lcd.setCursor(0, 1);
//
//    for (int i = 0; i < 16; i++)
//    {
//        lcd.print(".");
//        delay(200);
//    }
//
//    while (true)
//    {
//        while (neogps.available() > 0)
//        {
//            if (gps.encode(neogps.read()))
//            {
//                if (gps.location.isValid())
//                {
//                    // Serial.print(gps.location.lat(), 6);
//                    // Serial.print(F(","));
//                    // Serial.print(gps.location.lng(), 6);
//                    // Serial.println();
//
//                    lcd.clear();
//                    lcd.setCursor(1, 0);
//                    lcd.print("GPS Connected!");
//                    delay(5000);
//                    return;
//                }
//            }
//        }
//    }
//
//    if (millis() > 5000 && gps.charsProcessed() < 10)
//    {
//        // lcd.print("NO GPS : Check Wiring");
//        Serial.println(F("No GPS detected: check wiring."));
//        while (true);
//    }
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

//    if (is_gprs_connected())
//    {
//        lcd.clear();
//        lcd.setCursor(0, 0);
//        lcd.print("GPRS Connected!");
//        delay(3000);
//    }

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("GPRS Connected!");
      delay(3000);
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