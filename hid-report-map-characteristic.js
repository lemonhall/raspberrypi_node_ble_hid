var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

// #define HID_VERSION_1_11    (0x0111)

// /* HID Class */
// #define HID_CLASS           (3)
// #define HID_SUBCLASS_NONE   (0)
// #define HID_PROTOCOL_NONE   (0)

// /* Descriptors */
// #define HID_DESCRIPTOR          (33)
// #define HID_DESCRIPTOR_LENGTH   (0x09)
// #define REPORT_DESCRIPTOR       (34)

// /* Class requests */
// #define GET_REPORT (0x1)
// #define GET_IDLE   (0x2)
// #define SET_REPORT (0x9)
// #define SET_IDLE   (0xa)

// /* HID Class Report Descriptor */
// /* Short items: size is 0, 1, 2 or 3 specifying 0, 1, 2 or 4 (four) bytes */
// /* of data as per HID Class standard */

// /* Main items */
// #define INPUT(size)             (0x80 | size)
// #define OUTPUT(size)            (0x90 | size)
// #define FEATURE(size)           (0xb0 | size)
// #define COLLECTION(size)        (0xa0 | size)
// #define END_COLLECTION(size)    (0xc0 | size)

// /* Global items */
// #define USAGE_PAGE(size)        (0x04 | size)
// #define LOGICAL_MINIMUM(size)   (0x14 | size)
// #define LOGICAL_MAXIMUM(size)   (0x24 | size)
// #define PHYSICAL_MINIMUM(size)  (0x34 | size)
// #define PHYSICAL_MAXIMUM(size)  (0x44 | size)
// #define UNIT_EXPONENT(size)     (0x54 | size)
// #define UNIT(size)              (0x64 | size)
// #define REPORT_SIZE(size)       (0x74 | size)
// #define REPORT_ID(size)         (0x84 | size)
// #define REPORT_COUNT(size)      (0x94 | size)
// #define PUSH(size)              (0xa4 | size)
// #define POP(size)               (0xb4 | size)

// /* Local items */
// #define USAGE(size)                 (0x08 | size)
// #define USAGE_MINIMUM(size)         (0x18 | size)
// #define USAGE_MAXIMUM(size)         (0x28 | size)
// #define DESIGNATOR_INDEX(size)      (0x38 | size)
// #define DESIGNATOR_MINIMUM(size)    (0x48 | size)
// #define DESIGNATOR_MAXIMUM(size)    (0x58 | size)
// #define STRING_INDEX(size)          (0x78 | size)
// #define STRING_MINIMUM(size)        (0x88 | size)
// #define STRING_MAXIMUM(size)        (0x98 | size)
// #define DELIMITER(size)             (0xa8 | size)

var HIDReportMapCharacteristic = function(crypto_onoff) {
	if(crypto_onoff){
		  HIDReportMapCharacteristic.super_.call(this, {
		    uuid: '2a4b',
		    properties: ['read'],
		    secure: ['read']
		  });
	}else{
  		  HIDReportMapCharacteristic.super_.call(this, {
		    uuid: '2a4b',
		    properties: ['read']
		  });
  	}
};

util.inherits(HIDReportMapCharacteristic, Characteristic);

function USAGE_PAGE(size){
         return (0x04 | size);
}
function USAGE(size){
         return (0x08 | size);
}
function COLLECTION(size){
         return (0xa0 | size);
}
function USAGE_MINIMUM(size){
         return (0x18 | size);
}
function USAGE_MAXIMUM(size){
         return (0x28 | size);
}
function LOGICAL_MINIMUM(size){
         return (0x14 | size);
}
function LOGICAL_MAXIMUM(size){
         return (0x24 | size);
}
function REPORT_COUNT(size){
         return (0x94 | size);
}
function REPORT_SIZE(size){
         return (0x74 | size);
}
function INPUT(size){
         return (0x80 | size);
}
function END_COLLECTION(size){
         return (0xc0 | size);
}
function OUTPUT(size){
         return (0x90 | size);
}

var MOUSE_REPORT_MAP = [
    USAGE_PAGE(1),      0x01,         // Generic Desktop
    USAGE(1),           0x02,         // Mouse
    COLLECTION(1),      0x01,         // Application
    USAGE(1),           0x01,         //  Pointer
    COLLECTION(1),      0x00,         //  Physical
    USAGE_PAGE(1),      0x09,         //   Buttons
    USAGE_MINIMUM(1),   0x01,
    USAGE_MAXIMUM(1),   0x03,
    LOGICAL_MINIMUM(1), 0x00,
    LOGICAL_MAXIMUM(1), 0x01,
    REPORT_COUNT(1),    0x03,         //   3 bits (Buttons)
    REPORT_SIZE(1),     0x01,
    INPUT(1),           0x02,         //   Data, Variable, Absolute
    REPORT_COUNT(1),    0x01,         //   5 bits (Padding)
    REPORT_SIZE(1),     0x05,
    INPUT(1),           0x01,         //   Constant
    USAGE_PAGE(1),      0x01,         //   Generic Desktop
    USAGE(1),           0x30,         //   X
    USAGE(1),           0x31,         //   Y
    USAGE(1),           0x38,         //   Wheel
    LOGICAL_MINIMUM(1), 0x81,         //   -127
    LOGICAL_MAXIMUM(1), 0x7f,         //   127
    REPORT_SIZE(1),     0x08,         //   Three bytes
    REPORT_COUNT(1),    0x03,
    INPUT(1),           0x06,         //   Data, Variable, Relative
    END_COLLECTION(0),
    END_COLLECTION(0),
];

var KEYBOARD_REPORT_MAP= [
    USAGE_PAGE(1),      0x01,       // Generic Desktop Ctrls
    USAGE(1),           0x06,       // Keyboard
    COLLECTION(1),      0x01,       // Application
    USAGE_PAGE(1),      0x07,       //   Kbrd/Keypad
    USAGE_MINIMUM(1),   0xE0,
    USAGE_MAXIMUM(1),   0xE7,
    LOGICAL_MINIMUM(1), 0x00,
    LOGICAL_MAXIMUM(1), 0x01,
    REPORT_SIZE(1),     0x01,       //   1 byte (Modifier)
    REPORT_COUNT(1),    0x08,
    INPUT(1),           0x02,       //   Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position
    REPORT_COUNT(1),    0x01,       //   1 byte (Reserved)
    REPORT_SIZE(1),     0x08,
    INPUT(1),           0x01,       //   Const,Array,Abs,No Wrap,Linear,Preferred State,No Null Position
    REPORT_COUNT(1),    0x05,       //   5 bits (Num lock, Caps lock, Scroll lock, Compose, Kana)
    REPORT_SIZE(1),     0x01,
    USAGE_PAGE(1),      0x08,       //   LEDs
    USAGE_MINIMUM(1),   0x01,       //   Num Lock
    USAGE_MAXIMUM(1),   0x05,       //   Kana
    OUTPUT(1),          0x02,       //   Data,Var,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile
    REPORT_COUNT(1),    0x01,       //   3 bits (Padding)
    REPORT_SIZE(1),     0x03,
    OUTPUT(1),          0x01,       //   Const,Array,Abs,No Wrap,Linear,Preferred State,No Null Position,Non-volatile
    REPORT_COUNT(1),    0x06,       //   6 bytes (Keys)
    REPORT_SIZE(1),     0x08,
    LOGICAL_MINIMUM(1), 0x00,
    LOGICAL_MAXIMUM(1), 0x65,       //   101 keys
    USAGE_PAGE(1),      0x07,       //   Kbrd/Keypad
    USAGE_MINIMUM(1),   0x00,
    USAGE_MAXIMUM(1),   0x65,
    INPUT(1),           0x00,       //   Data,Array,Abs,No Wrap,Linear,Preferred State,No Null Position
    END_COLLECTION(0)
 ];

HIDReportMapCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log("HIDReportMapCharacteristic");
    const tt  = Buffer.from([0x05,0x01,0x09,0x06,0xa1,0x01,0x05,0x07,0x19,0xe0,0x29,0xe7,0x15,0x00,0x25,0x01,0x75,0x01,0x95,0x08,0x81,0x02,0x95,0x01,0x75,0x08,0x81,0x03,0x95,0x05,0x75,0x01,0x05,0x08,0x19,0x01,0x29,0x05,0x91,0x02,0x95,0x01,0x75,0x03,0x91,0x03,0x95,0x09,0x75,0x08,0x15,0x00,0x25,0x65,0x05,0x07,0x19,0x00,0x29,0x65,0x81,0x00,0xc0]);
	const buf = Buffer.from([0x05,0x01,0x09,0x02,0xa1,0x01,0x09,0x01,0xa1,0x00,0x05,0x09,0x19,0x01,0x29,0x03,0x15,0x00,0x25,0x01,0x95,0x03,0x75,0x01,0x81,0x02,0x95,0x01,0x75,0x05,0x81,0x01,0x05,0x01,0x09,0x30,0x09,0x31,0x15,0x81,0x25,0x7F,0x75,0x08,0x95,0x02,0x81,0x06,0xc0,0xc0]);

	const buf2 = Buffer.from(KEYBOARD_REPORT_MAP);
    
	console.log(buf2);

    callback(this.RESULT_SUCCESS,tt);
};

module.exports = HIDReportMapCharacteristic;
