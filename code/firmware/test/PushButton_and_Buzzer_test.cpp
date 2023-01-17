#include <HardwareSerial.h>

//--------------------------------------------------------------
#define GREEN_BUTTON 27
#define BLUE_BUTTON 26
#define RED_BUTTON 25
#define BUZZER 15

void setup()
{
    Serial.begin(9600);
    pinMode(GREEN_BUTTON, INPUT);
    pinMode(BLUE_BUTTON, INPUT);
    pinMode(RED_BUTTON, INPUT);
    pinMode(BUZZER, OUTPUT);

    digitalWrite(BUZZER, HIGH);
    delay(5000);
    digitalWrite(BUZZER, LOW);
}

void loop()
{
    digitalWrite(BUZZER, HIGH);
    if (digitalRead(GREEN_BUTTON) == HIGH)
    {

        Serial.println("GREEN");
    }
    else if (digitalRead(BLUE_BUTTON) == HIGH)
    {

        Serial.println("BLUE");
    }
    else if (digitalRead(RED_BUTTON) == HIGH)
    {

        Serial.println("RED");
    }
}