#!/bin/bash

# Ensure connection string
DEVICE_CONNECTION_STRING="HostName=msIOTHubfeb3.azure-devices.net;DeviceId=msDeviceFeb3;SharedAccessKey=sVStgE8SRfPDRStUSK80DXND2QxKZ1WdJStUjehCZG4="

if [ $# -eq 0 ]
  then
        echo Deploying to Pi
        # Ensure IP Address
        ADDRESS="10.10.10.107"
        USERNAME="pi"
        PASSWORD="raspberry"

        sshpass -p $PASSWORD ssh $USERNAME@$ADDRESS "rm -r AzureIoT; mkdir AzureIoT"
        sshpass -p $PASSWORD scp ./main.c ./bme280.c ./bme280.h ./wiring.h ./CMakeLists.txt "$USERNAME@$ADDRESS:/home/pi/AzureIoT"

        sshpass -p $PASSWORD ssh $USERNAME@$ADDRESS "cd ./AzureIoT; cmake . && make; sudo ./app '$DEVICE_CONNECTION_STRING'"
    else
        echo Deploying Locally
        cmake ./ && make && sudo ./app $DEVICE_CONNECTION_STRING
fi