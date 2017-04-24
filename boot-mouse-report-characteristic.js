var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var BootMouseReportCharacteristic = function() {
  BootMouseReportCharacteristic.super_.call(this, {
    uuid: '2a33',
    properties: ['read','notify'],
    secure: ['read','notify']
  });
};

util.inherits(BootMouseReportCharacteristic, Characteristic);

BootMouseReportCharacteristic.prototype.onReadRequest = function(offset, callback) {
    const buf = Buffer.alloc(3);
	// Prints: <Buffer 00 00 00 00 00>
	console.log("BootMouseReportCharacteristic:");
	console.log(buf);
    callback(this.RESULT_SUCCESS, buf);
};

module.exports = BootMouseReportCharacteristic;
