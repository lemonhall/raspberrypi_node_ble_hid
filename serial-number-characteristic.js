var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

function SerialNumberCharacteristic() {
  SerialNumberCharacteristic.super_.call(this, {
    uuid: '2a50',
    properties: ['read'],
    value: new Buffer([0x02, 0x0000, 0x0000, 0x1234])
  });
}

util.inherits(SerialNumberCharacteristic, BlenoCharacteristic);

module.exports = SerialNumberCharacteristic;
