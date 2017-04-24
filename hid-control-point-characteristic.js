var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDControlPointCharacteristic = function() {
  HIDControlPointCharacteristic.super_.call(this, {
    uuid: '2a4c',
    properties: ['writeWithoutResponse']
  });
};

util.inherits(HIDControlPointCharacteristic, Characteristic);

HIDControlPointCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer([98]));
};

module.exports = HIDControlPointCharacteristic;
