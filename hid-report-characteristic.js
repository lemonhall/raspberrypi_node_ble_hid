var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var HIDReportCharacteristic = function(crypto_onoff) {
	if(crypto_onoff){
		  HIDReportCharacteristic.super_.call(this, {
		    uuid: '2a4d',
		    properties: ['read','notify'],
		    secure: ['read','notify']
		  });
  	}else{
		  HIDReportCharacteristic.super_.call(this, {
		    uuid: '2a4d',
		    properties: ['read','notify']
		  });  		
  	}
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
  const buf  = Buffer.from([0x00,0x05,0x05,0x05]);
                //   <Buffer 01  00   00   81   00   00   00   00   00>
                //   <Buffer 01  00   00   00   00   00   00   00   00>
  const buf1 = Buffer.from([0x01,0x00,0x00,0x81,0x00,0x00,0x00,0x00,0x00]);
  const buf2 = Buffer.from([0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]);
  const buf3 = Buffer.from([0x00,0x00,0x04,0x00,0x00,0x00,0x00,0x00]);
  const buf4 = Buffer.from([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]);

  this.changeInterval = setInterval(function() {
    console.log('NotifyOnlyCharacteristic update value: ');
                console.log(buf3);
                console.log(buf4);
                updateValueCallback(buf3);
                updateValueCallback(buf4);
  }.bind(this), 500);

};

HIDReportCharacteristic.prototype.onUnsubscribe = function() {
  console.log('NotifyOnlyCharacteristic unsubscribe');

  if (this.changeInterval) {
    clearInterval(this.changeInterval);
    this.changeInterval = null;
  }
};

module.exports = HIDReportCharacteristic;
