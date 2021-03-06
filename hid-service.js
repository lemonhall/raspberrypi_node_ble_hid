var util = require('util');

var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;

//http://community.silabs.com/t5/Bluetooth-Wi-Fi/BLE113-HID-keyboard-emulation/td-p/148466
//从silabs上找到的一篇文章
//有gatt.xml来对照

// HID Service (0x1812)
// * Protocol Model (0x2A42)
// * Boot Mouse Report (0x2A33)
// * HID Information (0x2A4A)
// * HID Report Map (0x2A4B)
// * HID Control Point (0x2A4C)
// * Report (0x2A4D)

//BLECharCharacteristic bootModeProtocol("2A42", BLERead | BLEWriteWithoutResponse);
//bootModeProtocol.setValue('0');
var ProtocolModelCharacteristic 	= require('./protocol-model-characteristic');

//BLECharacteristic bootMouseReport("2A33", BLERead | BLENotify,3);//Seting up the mouse specific characteristic
var BootMouseReportCharacteristic 	= require('./boot-mouse-report-characteristic');

//BLECharacteristic hidInformation("2A4A",BLERead, 4 );
//hidInformation.setValue(hidInfo, 4);
//unsigned char hidInfo[3] = {'0112', 0x00, 0xc0};
var HIDInformationCharacteristic 	= require('./hid-information-characteristic');

//BLECharacteristic reportMap("2A4B", BLERead,50);
//0x05,0x01,0x09,0x02,0xA1,0x01,0x09,0x01,0xA1,0x00,0x05,0x09,0x19,0x01,0x29,0x03,0x15,0x00,0x25,0x01,0x95,0x03,0x75,0x01,0x81,0x02,0x95,0x01,0x75,0x05,0x81,0x01,0x05,0x01,0x09,0x30,0x09,0x31,0x15,0x81,0x25,0x7F,0x75,0x08,0x95,0x02,0x81,0x06,0xC0,0xC0
var HIDReportMapCharacteristic	 	= require('./hid-report-map-characteristic');

//这个应该是被写入的不管
var HIDControlPointCharacteristic	= require('./hid-control-point-characteristic');

//最后这个是三坐标 2a4d
var HIDReportCharacteristic			= require('./hid-report-characteristic');

var crypto_onoff = false;

function HidService() {
  HidService.super_.call(this, {
    uuid: '1812',
    characteristics: [
    	new ProtocolModelCharacteristic(crypto_onoff),     //2a42
    	new BootMouseReportCharacteristic(crypto_onoff),   //2a33
    	new HIDInformationCharacteristic(crypto_onoff),    //2a4a----call了
    	new HIDReportMapCharacteristic(crypto_onoff),      //2a4b----call了
    	new HIDControlPointCharacteristic(crypto_onoff),   //2a4c
    	new HIDReportCharacteristic(crypto_onoff)          //2a4d----call了
    ]
  });
}

util.inherits(HidService, BlenoPrimaryService);

module.exports = HidService;
