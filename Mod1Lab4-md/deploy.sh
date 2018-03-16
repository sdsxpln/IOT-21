#!/bin/bash
DEVICE_CONNECTION_STRING="HostName=msIOTHubfeb10.azure-devices.net;DeviceId=msDevicefeb10;SharedAccessKey=eXu4e2RnagY5ajaoBrFnd7JJ30wNG77rddYQD5lOB/w="

if [ $# -eq 0 ]
  then
        echo Deploying to Pi
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