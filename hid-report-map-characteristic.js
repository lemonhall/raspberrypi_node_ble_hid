var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDReportMapCharacteristic = function() {
  HIDReportMapCharacteristic.super_.call(this, {
    uuid: '2a4b',
    properties: ['read']
  });
};

util.inherits(HIDReportMapCharacteristic, Characteristic);

HIDReportMapCharacteristic.prototype.onReadRequest = function(offset, callback) {
    callback(this.RESULT_SUCCESS, new Buffer([0x05,0x01,0x09,0x02,0xA1,0x01,0x09,0x01,0xA1,0x00,0x05,0x09,0x19,0x01,0x29,0x03,0x15,0x00,0x25,0x01,0x95,0x03,0x75,0x01,0x81,0x02,0x95,0x01,0x75,0x05,0x81,0x01,0x05,0x01,0x09,0x30,0x09,0x31,0x15,0x81,0x25,0x7F,0x75,0x08,0x95,0x02,0x81,0x06,0xC0,0xC0]));
};

module.exports = HIDReportMapCharacteristic;
