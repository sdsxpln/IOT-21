'use strict';

var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-mqtt').Mqtt;

//HostName=msIOTHub786.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=2upcDaSUA69WLy+xgc6q2vNte/Q2aReO0BHSW9D+jY0=
var connectionString = "HostName=msIOTHub786.azure-devices.net;DeviceId=msDevice786;SharedAccessKey=bQbWVk4Id05zYSberPGSFhKP8/FvTEjWS4911eqHTIg="
var client = Client.fromConnectionString(connectionString, Protocol);

var reportFWUpdateThroughTwin = function(twin, firmwareUpdateValue){
    var patch = {
        iothubDM: {
            firmwareUpdate: firmwareUpdateValue
        }
    };

    twin.properties.reported.update(patch, function(err){
        if(err) throw err;
        console.log('twin state reported: ' + firmwareUpdateValue.status);
    });
};

var simulateDownloadImage = function(imageUrl, callback){
    var error = null;
    var image = "[fake image data]";

    console.log("Downloading image from " + imageUrl);
    callback(error, image);

};


var simulateApplyImage = function(imageData, callback){
    var error = null;
    if(!imageData){
        error = {message : 'Apply image failed because of miss data.'};
    }

    callback(error);  
};

var waitToDownload = function(twin, fwPackageUriVal, callback){
    var now = new Date();

    reportFWUpdateThroughTwin(twin, {
        fwPackageUri :fwPackageUriVal,
        status : 'waiting',
        error : null,
        startedWaitingTime : now.toISOString()
    });

    setTimeout(callback, 4000);
};

var downloadImage = function(twin, fwPackageUriVal, callback){
    var now = new Date();

    reportFWUpdateThroughTwin(twin , {
        status: 'downloading',
    });

    setTimeout(function(){
        simulateDownloadImage(fwPackageUriVal, function(err, image){
            if (err){
                reportFWUpdateThroughTwin(twin, {
                    status : 'downloadfailed',
                    error: {
                        code : err.error_code,
                        message : err.error_message,
                    }
                });
            }

            else {
                reportFWUpdateThroughTwin(twin, {
                    status : 'downloadComplete',
                    downloadCompleteTime : now.toISOString(),
                });

                setTimeout(function(){
                    callback(image);
                }, 4000);
            }
        
        });
        
       },  4000);
    };

var applyImage = function(twin, imageData, callback){
    var now = Date();

    reportFWUpdateThroughTwin(twin , {
        status: 'applying',
        startedApplyingImage : now.toISOString(),
        });

    setTimeout(function(){
        //simulate apply firmware image
        simulateApplyImage(imageData, function(err){
            if (err){
                reportFWUpdateThroughTwin(twin, {
                    status : 'applyfailed',
                    error: {
                        code : err.error_code,
                        message : err.error_message,
                    }
                });
            }

            else {
                reportFWUpdateThroughTwin(twin, {
                    status : 'applyComplete',
                    lastFirmwareUpdate : now.toISOString(),
                });

                setTimeout(callback, 4000);
            }
        });
    }, 4000);
};

var onFirmwareUpdate = function(request, response){
    //Respond the cloud app for direct method
    response.send(200, 'FirmwareUpdate started', function(err){
        if(err){
            console.error('An err occured when sending method response:\n' + err.toISOString());
        } else {
            console.log('response the method \'' + request.methodName + '\' sent successfully.');
        }

        //Get the parameter from the body of the request
        var fwPackageUri = request.payload.fwPackageUri;

        client.getTwin(function(err,twin){
            if(err){
                console.error('could not get device twin.');
            } else {
                console.log('device twin acquired! ');
            }

            waitToDownload(twin, fwPackageUri, function(){
                downloadImage(twin, fwPackageUri, function(imageData){
                    applyImage(twin, imageData, function(){});
                });
            });
        });

    });
};

client.open(function(err){
    if(err){
        console.error('could not connect to iot hub ');
    } else {
        console.log('client connected to iot hub, waiting for firmwareupdate directmethod ');
    }

    client.onDeviceMethod('firmwareUpdate', onFirmwareUpdate);
});