/*
* Developing IoT Solutions with Azure IoT - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*
*
* ©2017 Microsoft Corporation. All rights reserved. The text in this document is available under the 
* Creative Commons Attribution 4.0 License (https://creativecommons.org/licenses/by/4.0/legalcode), 
* additional terms may apply. All other content contained in this document (including, without limitation,
* trademarks, logos, images, etc.) are not included within the Creative Commons license grant. This 
* document does not provide you with any legal rights to any intellectual property in any Microsoft 
* product. 
*
* This document is provided "as-is." Information and views expressed in this document, including URL 
* and other Internet Web site references, may change without notice. You bear the risk of using it. 
* Some examples are for illustration only and are fictitious. No real association is intended or inferred.
* Microsoft makes no warranties, express or implied, with respect to the information provided here.
*
*
*/

#ifndef WIRING_H_
#define WIRING_H_

#include <stdio.h>
#include <stdlib.h>

#ifdef __arm__
#include <wiringPi.h>
#include <wiringPiSPI.h>
#else
#include <unistd.h>
#define HIGH 1
#define LOW 0
#define OUTPUT 0
#define INPUT 1
#endif

int setupWiringPi()
{
#ifdef __arm__
	return wiringPiSetup();
#else
	return 0; //no-op if not on Pi
#endif
}

void setPinMode(int pinNumber, int mode)
{
#ifdef __arm__
	pinMode(pinNumber, mode);
#else
	return;   //no-op if not on Pi
#endif
}

void writeToPin(int pinNumber, int value)
{
#ifdef __arm__
	digitalWrite(pinNumber, value);
#else
	return; //no-op if not on Pi
#endif
}

void wait(int duration)
{
	fflush(stdout);

#ifdef __arm__
	delay(duration);
#else
	usleep(duration * 1000);
#endif
}

#endif // WIRING_H_
