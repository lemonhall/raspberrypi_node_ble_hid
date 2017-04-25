var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var ProtocolModelCharacteristic = function(crypto_onoff) {
	if(crypto_onoff){
		  ProtocolModelCharacteristic.super_.call(this, {
		    uuid: '2a4e',
		    properties: ['read','writeWithoutResponse']
		  });
	}else{
		  ProtocolModelCharacteristic.super_.call(this, {
		    uuid: '2a4e',
		    properties: ['read','writeWithoutResponse']
		  });		
	}
};

util.inherits(ProtocolModelCharacteristic, Characteristic);

ProtocolModelCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("ProtocolModelCharacteristic");
    callback(this.RESULT_SUCCESS, new Buffer([1]));
};

module.exports = ProtocolModelCharacteristic;
