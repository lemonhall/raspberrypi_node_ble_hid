var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDInformationCharacteristic = function(crypto_onoff) {
	if(crypto_onoff){
	  HIDInformationCharacteristic.super_.call(this, {
	    uuid: '2a4a',
	    properties: ['read'],
	    secure: ['read']
	  });
	}else{
	  HIDInformationCharacteristic.super_.call(this, {
	    uuid: '2a4a',
	    properties: ['read']
	  });
	}
};

util.inherits(HIDInformationCharacteristic, Characteristic);

HIDInformationCharacteristic.prototype.onReadRequest = function(offset, callback) {
    //unsigned char hidInfo[3] = {'0112', 0x00, 0xc0};
    const buf = Buffer.from([0x01,0x00,0x00,0x02]);
	// Prints: <Buffer 00 00 00 00 00>
	console.log("HIDInformationCharacteristic:");
	console.log(buf);
    callback(this.RESULT_SUCCESS, buf);
};

module.exports = HIDInformationCharacteristic;
