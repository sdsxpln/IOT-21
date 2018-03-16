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

#include <stdio.h>
#include <stdbool.h>
#include "./wiring.h"

const int MAX_BLINK_TIMES = 20;
const int GREEN_LED_PIN = 7;
const int BLUE_LED_PIN = 22;

int main(int argc, char *argv[])
{
    int blinkNumber = 0;

    setupWiringPi();
    setPinMode(BLUE_LED_PIN, OUTPUT);
    setPinMode(GREEN_LED_PIN, OUTPUT);

    while (MAX_BLINK_TIMES > blinkNumber++)
    {
        printf("[Device] #%d Blue LED \n", blinkNumber);
        writeToPin(BLUE_LED_PIN, HIGH);
        wait(500);
        writeToPin(BLUE_LED_PIN, LOW);
        printf("[Device] #%d Green LED \n", blinkNumber);
        writeToPin(GREEN_LED_PIN, HIGH);
        wait(500);
        writeToPin(GREEN_LED_PIN, LOW);
    }

    return 0;
}
