var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDReportCharacteristic = function() {
  HIDReportCharacteristic.super_.call(this, {
    uuid: '2a4d',
    properties: ['read','notify'],
    secure: ['read','notify']
  });
};

util.inherits(HIDReportCharacteristic, Characteristic);

HIDReportCharacteristic.prototype.onReadRequest = function(offset, callback) {
    const buf = Buffer.alloc(3);
	// Prints: <Buffer 00 00 00 00 00>
	console.log("HIDReportCharacteristic:");
	console.log(buf);
    callback(this.RESULT_SUCCESS, buf);
};

HIDReportCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('NotifyOnlyCharacteristic subscribe');
  const buf = Buffer.alloc(3);
  this.changeInterval = setInterval(function() {
    console.log('NotifyOnlyCharacteristic update value: ');
    console.log(buf);
    updateValueCallback(buf);
  }.bind(this), 1000);

};

HIDReportCharacteristic.prototype.onUnsubscribe = function() {
  console.log('NotifyOnlyCharacteristic unsubscribe');

  if (this.changeInterval) {
    clearInterval(this.changeInterval);
    this.changeInterval = null;
  }
};

module.exports = HIDReportCharacteristic;
