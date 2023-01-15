# Road Accident Detection And Notification System
___

## Problem Overview
A motor car accident can happen to anyone of us at any given moment. If you’re lucky then you’ll survive without a scratch. But sometimes you may be too shocked to act rationally or you may be unconscious with serious damages. Unfortunately in such situations, it takes an unacceptably long time for an ambulance to attend to you.

This is the main reason why most people pass away. Those critical minutes/seconds just after an accident can save countless lives if the first responders arrive soon enough and the police is notified quickly enough to get rid of other haphazards. And that is the problem that we are trying to solve through our project.

* Most fatal accidents occur when it takes too long for the ambulance to arrive.
* Sometimes wreckage from an accident prevents first responders from reaching those who are involved in the accident.

<p><br></p>

## Our Solution
First we use our hardware to detect a potential accident. This is done through an accelerometer which measures acceleration in 3 perpendicular directions. We optimize the accelerometer to pick up sudden unusually high accelerations and classifies them as potential crash. An automatic alarm would go off in the car to indicate the potential accident. Thirty seconds after the detection of the potential accident , the closest relatives of the driver will be informed. Simultaneously the closest ambulances will also be informed. Both parties will also receive the gps location of the accident.

The police on the other hand, will be shown a full map indicating all the potential accidents.

Our system is equipped to deal with false alarms too. For example,if the system erroneously detects a pothole or a road bump as an accident. Then the alarm would go off instantaneously but the user will be given a physical button on the device to turn off the alarm. If the user turns the alarm off within the first 30 seconds then no notifications will be sent to the respective parties. Even if the user takes more than 30 seconds to turn off a false alarm, the sent notifications to the respective parties will be retracted and they’ll be notified that it was a false alarm.

<p align="center">
<img src="https://github.com/cepdnaclk/e18-3yp-Road-Accident-Detection-And-Notification-System/blob/main/docs/assets/img/protego-logo.png" width="600" height="380"></p>


## Team
E/18/203 - Shehan Madhusanka     : e18203@eng.pdn.ac.lk


E/18/264 - Madushan Nanayakkara  : e18264@eng.pdn.ac.lk


E/18/375 - Akitha Vindula Pathirana      : e18375@eng.pdn.ac.lk
