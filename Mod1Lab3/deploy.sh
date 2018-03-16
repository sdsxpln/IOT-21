#!/bin/bash
if [ $# -eq 0 ]
  then
        echo Deploying to Pi
        ADDRESS="10.10.10.107"
        USERNAME="pi"
        PASSWORD="raspberry"

        sshpass -p $PASSWORD ssh $USERNAME@$ADDRESS "rm -r AzureIoT; mkdir AzureIoT"
        sshpass -p $PASSWORD scp ./main.c ./wiring.h ./CMakeLists.txt "$USERNAME@$ADDRESS:/home/pi/AzureIoT"

        sshpass -p $PASSWORD ssh $USERNAME@$ADDRESS "cd ./AzureIoT; cmake . && make; sudo ./app"
    else
        echo Deploying Locally
        cmake ./ && make && sudo ./app
fi