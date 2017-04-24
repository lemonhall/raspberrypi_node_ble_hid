var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BootMouseReportCharacteristic = function() {
  BootMouseReportCharacteristic.super_.call(this, {
    uuid: '2a33',
    properties: ['read','notify']
  });
};

util.inherits(BootMouseReportCharacteristic, Characteristic);

BootMouseReportCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer([0x00,0x00,0x00]));
};

module.exports = BootMouseReportCharacteristic;
