var noble = require('noble');

var pizzaServiceUuid = '1812';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([pizzaServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
});


noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  noble.stopScanning();
  console.log('found peripheral:', peripheral.advertisement);
  console.log('found peripheral:', peripheral);
  peripheral.connect(function(err) {
  	console.log("connect error:",err);
    peripheral.discoverServices([], function(err, services) {
    	console.log("discoverServices error:",err);
    	console.log(services);
      services.forEach(function(service) {
        console.log('found service:', service.uuid);
        service.discoverCharacteristics([], function(err, characteristics) {
          console.log("discoverCharacteristics error:",err);
          characteristics.forEach(function(characteristic) {
            console.log('found characteristic:', characteristic);
        	});
        });
       });
     });
    });   
 });

