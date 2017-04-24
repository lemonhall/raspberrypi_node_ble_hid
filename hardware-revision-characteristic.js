var util = require('util');

var bleno = require('bleno');
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

function HardwareRevisionCharacteristic() {
  HardwareRevisionCharacteristic.super_.call(this, {
    uuid: '2a27',
    properties: ['read'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'lemon-hid version'
      })
    ]
  });
}

util.inherits(HardwareRevisionCharacteristic, BlenoCharacteristic);

HardwareRevisionCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  } else {
      callback(this.RESULT_SUCCESS, new Buffer(1));
  }
};

module.exports = HardwareRevisionCharacteristic;
