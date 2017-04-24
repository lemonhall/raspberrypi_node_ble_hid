var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var ProtocolModelCharacteristic = function() {
  ProtocolModelCharacteristic.super_.call(this, {
    uuid: '2a42',
    properties: ['read','writeWithoutResponse']
  });
};

util.inherits(ProtocolModelCharacteristic, Characteristic);

ProtocolModelCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("ProtocolModelCharacteristic");
    callback(this.RESULT_SUCCESS, new Buffer([0]));
};

module.exports = ProtocolModelCharacteristic;
