
~function () {

THREE = THREE || {};
THREE.Input = {};

// Some default alias and modifiers...
var MODIFIERS = ['shift', 'ctrl', 'alt', 'altgr'];
var ALIAS = { // some default aliases...
  'leftArrow'     : [37],
  'upArrow'       : [38],
  'rightArrow'    : [39],
  'downArrow'     : [40],
  'space'         : [32],
  'pageup'        : [33],
  'pagedown'      : [34],
  'tab'           : [9],
  'backspace'     : [8],
  'suppr'         : [46],
  'escape'        : [27],
  'enter'         : [13],
  'F1'            : [112],
  'F2'            : [113],
  'F3'            : [114],
  'F4'            : [115],
  'F5'            : [116],
  'F6'            : [117],
  'F7'            : [118],
  'F8'            : [119],
  'F9'            : [120],
  'F10'           : [121],
  'F11'           : [122],
  'F12'           : [123]
};

var _keyCodes = new Array(256);
var _modifiers = new Array(4);

var _keyDown = {};
var _keyUp = {};

var _isPressed = false;

var _onKeyDown = function (e) { _onKey(e, true); };
var _onKeyUp   = function (e) { _onKey(e, false); };

document.addEventListener("keydown", _onKeyDown, false);
document.addEventListener("keyup", _onKeyUp, false);

function _onKey(e, pressed) {
  _isPressed = pressed;
  _keyCodes[e.keyCode] = pressed;
  switch (e.keyIdentifier) {
    case "U+0000":
      _modifiers['altgr'] = pressed;
      break;
    case "Alt":
      _modifiers['alt'] = pressed;
      break;
    case "Control":
      _modifiers['ctrl'] = pressed;
      break;
    case "Shift":
      _modifiers['shift'] = pressed;
      break;
  }
  var arr = pressed ? _keyUp : _keyDown;
  for (var key in arr)
    arr[key] = false;
};

THREE.Input.isKeyDown = function (keyDesc) {
  if (THREE.Input.isKeyPressed(keyDesc)) {
    if (_keyDown[keyDesc])
      return false;
    _keyDown[keyDesc] = true;
    return true;
  }
  return false;
}

THREE.Input.isKeyUp = function (keyDesc) {
  if (!THREE.Input.isKeyPressed(keyDesc)) {
    if (_keyUp[keyDesc])
      return false;
    _keyUp[keyDesc] = true;
    return true;
  }
  return false;
}

/**
 * Look at keyboard state to know if a key is pressed
 * of not (without args look at all keys)
 *
 * @param {String} keyDesc the description of the key.
 * @return {Boolean} true if the key is pressed, false otherwise
 * @example key.pressed("ctrl+space") == true
*/
THREE.Input.isKeyPressed = function (keyDesc) {
  var keys, pressed, key, modif;

  switch (typeof keyDesc) {
    case "undefined": return _isPressed;
    case "number": return _keyCodes[code];
    case "string": keys = keyDesc.split("+"); break;
    default: throw Error("The key `"+keyDesc+"` have to be undefined, a number or a string.");
  };
  key = keys.length == 1 ? keys[0] : keys[1];
  modif = keys.length == 1 ? null : keys[0];
  if(Object.keys(ALIAS).indexOf(key) !== -1)
    for (i in ALIAS[key]) {
      i = ALIAS[key][i];
      pressed = _keyCodes[i];
      if (pressed == true)
        break;
    }
  else
    pressed = _keyCodes[key.toUpperCase().charCodeAt(0)];

  if (pressed == true && modif !== null && MODIFIERS.indexOf(keys[0]) !== -1) {
    pressed = _modifiers[ modif ];
  }
  return pressed;
};

/**
 * This function allow you to add some aliases to specifiques keycodes
 *
 * @param {String} the alias key
 * @param {Integer} the alias keyCode, you can have multiple keycodes like so:
 * @example key.setAlias('top', 38, 65, 81);
*/
THREE.Input.setAlias = function (key) {
  if (arguments.length < 2)
    return console.error('setAlias need a key and some keyCode values.');
  ALIAS[key] = [];
  for (var i = 1 ; i < arguments.length ; ++i)
    ALIAS[key].push(arguments[i]);
};

/**
 * Return the keyCodes of the alias
 *
 * @param the alias key
 * @return the alias keyCodes
*/
THREE.Input.getAlias = function (key) {
  return ALIAS[key];
};

/**
 * Dump the aliases list
*/
THREE.Input.showAlias = function () {
  console.log(JSON.stringify(ALIAS));
};

}();
