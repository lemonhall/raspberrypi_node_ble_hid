var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDInformationCharacteristic = function() {
  HIDInformationCharacteristic.super_.call(this, {
    uuid: '2a4a',
    properties: ['read'],
  });
};

util.inherits(HIDInformationCharacteristic, Characteristic);

HIDInformationCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer(['0112',0x00,0xc0]));
};

module.exports = HIDInformationCharacteristic;
