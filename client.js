var bleno = require('bleno');

var name = 'lemonhall-hid';
var serviceUuids = ['1812'];

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
    // bleno.setServices([primaryService], function(error){
    //   console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    // });
  }
});
