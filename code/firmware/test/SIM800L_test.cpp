#include <SoftwareSerial.h>


SoftwareSerial SIM800(13,12); // TXD = 2, RXD = 3
String response = "";


boolean waitResponse(String expected_answer="OK", unsigned int timeout=2000);


void setup() {
  Serial.begin(9600);
  SIM800.begin(9600);
}


void loop() {
  while(Serial.available()){
    SIM800.write(Serial.read());
  }
//  if(waitResponse("OK")){
//    Serial.println("DONE");
//  }
//  else{
//    Serial.println("NOT DONE");
//  }

  while(SIM800.available()){
     Serial.write(SIM800.read());
  }
  
}

boolean waitResponse(String expected_answer, unsigned int timeout)
{
  uint8_t x=0, answer=0;
  String response;
  unsigned long previous;
    
  //Clean the input buffer
  while( SIM800.available() > 0) SIM800.read();
  
  previous = millis();
  do{
    //if data in UART INPUT BUFFER, reads it
    if(SIM800.available() != 0){
        char c = SIM800.read();
        response.concat(c);
        x++;
        //checks if the (response == expected_answer)
        if(response.indexOf(expected_answer) > 0){
            answer = 1;
        }
    }
  }while((answer == 0) && ((millis() - previous) < timeout));
  
  Serial.println(response);
  return answer;
}