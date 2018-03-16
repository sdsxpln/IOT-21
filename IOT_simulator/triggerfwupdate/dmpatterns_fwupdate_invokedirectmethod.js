'use strict'

var Registry = require('azure-iothub').Registry;
var Client = require('azure-iothub').Client;

var connectionString = "HostName=msIOTHub786.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=2upcDaSUA69WLy+xgc6q2vNte/Q2aReO0BHSW9D+jY0="
var registry = Registry.fromConnectionString(connectionString);
var client = Client.fromConnectionString(connectionString);
var deviceToUpdate = 'msDevice786';

var queryTwinFWUpdateReported = function(){
    registry.getTwin(deviceToUpdate, function(err, twin){
        if(err){
            console.error('could not quesry twins: ' + err.message );
        } else {
            console.log((JSON.stringify(twin.properties.reported.iothubDM.firmwareUpdate ))+ "\n");
        }
    });
};

var startFirmwareUpdate = function(){
    var params = {
        fwPackageUri: 'http://secureuri'
    };

    var methodName = 'firmwareUpdate';
    var payloadData = JSON.stringify(params);

    var methodParams = {
        methodName: methodName,
        payload: payloadData,
        timeoutInSeconds: 30
    };

    client.invokeDeviceMethod(deviceToUpdate, methodParams, function(err, result){
        if(err){
            console.error('could not start firmware update ' + err.message);
        } 
    });
};

startFirmwareUpdate();
setInterval(queryTwinFWUpdateReported, 500);