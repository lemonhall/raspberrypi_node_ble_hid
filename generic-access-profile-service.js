var util = require('util');

var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var DeviceNameCharacteristic = function() {
  DeviceNameCharacteristic.super_.call(this, {
    uuid: '2a00',
    properties: ['read']
  });
};
util.inherits(DeviceNameCharacteristic, Characteristic);

DeviceNameCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("DeviceNameCharacteristic");
    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer('Keyboard'));

};

var DeviceTypeCharacteristic = function() {
  DeviceTypeCharacteristic.super_.call(this, {
    uuid: '2a01',
    properties: ['read']
  });
};

util.inherits(DeviceTypeCharacteristic, Characteristic);

DeviceTypeCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log("DeviceTypeCharacteristic");
    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer([0x03c2]));

};

function GenericAccessProfileService() {
  GenericAccessProfileService.super_.call(this, {
    uuid: '1800',
    characteristics: [
        new DeviceNameCharacteristic(),
        new DeviceTypeCharacteristic()
    ]
  });
}

util.inherits(GenericAccessProfileService, BlenoPrimaryService);

module.exports = GenericAccessProfileService;
