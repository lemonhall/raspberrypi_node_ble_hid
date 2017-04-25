var bleno = require('bleno');

var name = 'LemonMouse';
var serviceUuids = ['1812'];

var HidService = require('./hid-service');
var BatteryService = require('./battery-service');
var DeviceInformationService = require('./device-information-service');
var GenericAccessProfileService = require('./generic-access-profile-service');


var hidService = new HidService();
var batteryService = new BatteryService();
var deviceInformationService = new DeviceInformationService();
var genericAccessProfileService = new GenericAccessProfileService();

// Linux only events /////////////////
bleno.on('accept', function(clientAddress) {
  console.log('on -> accept, client: ' + clientAddress);

  bleno.updateRssi();

  bleno.setServices([hidService,batteryService,deviceInformationService,genericAccessProfileService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
  });

});

bleno.on('disconnect', function(clientAddress) {
  console.log('on -> disconnect, client: ' + clientAddress);
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});
//////////////////////////////////////

bleno.on('mtuChange', function(mtu) {
  console.log('on -> mtuChange: ' + mtu);
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function(error) {
  console.log('on -> servicesSet: ' + (error ? 'error ' + error : 'success'));
});

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
    bleno.setServices([hidService,batteryService,deviceInformationService,genericAccessProfileService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    });
  }
});
