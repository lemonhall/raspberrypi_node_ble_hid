var bleno = require('bleno');

var name = 'lemonhall-hid';
var serviceUuids = ['1812'];

var HidService = require('./hid-service');
var BatteryService = require('./battery-service');
var DeviceInformationService = require('./device-information-service');

var hidService = new HidService();
var batteryService = new BatteryService();
var deviceInformationService = new DeviceInformationService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(name, serviceUuids);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([hidService,batteryService,deviceInformationService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    });
  }
});
