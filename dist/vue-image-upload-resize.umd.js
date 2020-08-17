(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-image-upload-resize"] = factory();
	else
		root["vue-image-upload-resize"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "20d0":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Canvas to Blob
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/* global define, Uint8Array, ArrayBuffer, module */

;(function(window) {
  'use strict'

  var CanvasPrototype =
    window.HTMLCanvasElement && window.HTMLCanvasElement.prototype
  var hasBlobConstructor =
    window.Blob &&
    (function() {
      try {
        return Boolean(new Blob())
      } catch (e) {
        return false
      }
    })()
  var hasArrayBufferViewSupport =
    hasBlobConstructor &&
    window.Uint8Array &&
    (function() {
      try {
        return new Blob([new Uint8Array(100)]).size === 100
      } catch (e) {
        return false
      }
    })()
  var BlobBuilder =
    window.BlobBuilder ||
    window.WebKitBlobBuilder ||
    window.MozBlobBuilder ||
    window.MSBlobBuilder
  var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/
  var dataURLtoBlob =
    (hasBlobConstructor || BlobBuilder) &&
    window.atob &&
    window.ArrayBuffer &&
    window.Uint8Array &&
    function(dataURI) {
      var matches,
        mediaType,
        isBase64,
        dataString,
        byteString,
        arrayBuffer,
        intArray,
        i,
        bb
      // Parse the dataURI components as per RFC 2397
      matches = dataURI.match(dataURIPattern)
      if (!matches) {
        throw new Error('invalid data URI')
      }
      // Default to text/plain;charset=US-ASCII
      mediaType = matches[2]
        ? matches[1]
        : 'text/plain' + (matches[3] || ';charset=US-ASCII')
      isBase64 = !!matches[4]
      dataString = dataURI.slice(matches[0].length)
      if (isBase64) {
        // Convert base64 to raw binary data held in a string:
        byteString = atob(dataString)
      } else {
        // Convert base64/URLEncoded data component to raw binary:
        byteString = decodeURIComponent(dataString)
      }
      // Write the bytes of the string to an ArrayBuffer:
      arrayBuffer = new ArrayBuffer(byteString.length)
      intArray = new Uint8Array(arrayBuffer)
      for (i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i)
      }
      // Write the ArrayBuffer (or ArrayBufferView) to a blob:
      if (hasBlobConstructor) {
        return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
          type: mediaType
        })
      }
      bb = new BlobBuilder()
      bb.append(arrayBuffer)
      return bb.getBlob(mediaType)
    }
  if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
    if (CanvasPrototype.mozGetAsFile) {
      CanvasPrototype.toBlob = function(callback, type, quality) {
        var self = this
        setTimeout(function() {
          if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
            callback(dataURLtoBlob(self.toDataURL(type, quality)))
          } else {
            callback(self.mozGetAsFile('blob', type))
          }
        })
      }
    } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
      CanvasPrototype.toBlob = function(callback, type, quality) {
        var self = this
        setTimeout(function() {
          callback(dataURLtoBlob(self.toDataURL(type, quality)))
        })
      }
    }
  }
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return dataURLtoBlob
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(window)


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2af9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return install; });
/* harmony import */ var _ImageUploader_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("324b");
/*!
 * vue-image-upload-resize
 * Based on ImageUploader (c) Ross Turner (https://github.com/rossturner/HTML5-ImageUploader)
 * Adapted by (c) 2018 Svale Fossåskaret (http://kartoteket.as/team/svale.html / @Fossesvale)
 * @license MIT.
 */
// Import vue component
 // Declare install function executed by Vue.use()

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ImageUploader', _ImageUploader_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
} // Create module definition for Vue.use()

var plugin = {
  install: install
}; // Auto-install when vue is found (eg. in browser via <script> tag)

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


_ImageUploader_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].install = install; // To allow use as module (npm/webpack/etc.) export component

/* harmony default export */ __webpack_exports__["a"] = (_ImageUploader_vue__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "324b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fd5725aa-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ImageUploader.vue?vue&type=template&id=51149f51&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('img',{directives:[{name:"show",rawName:"v-show",value:(_vm.imagePreview),expression:"imagePreview"}],staticClass:"img-preview",attrs:{"src":_vm.imagePreview,"width":"400"}}),_c('input',{class:_vm.className,attrs:{"id":_vm.id,"type":"file","accept":_vm.accept,"capture":_vm.capture},on:{"change":_vm.uploadFile}}),_vm._t("upload-label")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ImageUploader.vue?vue&type=template&id=51149f51&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/exifr/dist/full.esm.mjs
function full_esm_e(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}let t="undefined"!=typeof self?self:global;var i="undefined"!=typeof navigator,n=i&&"undefined"==typeof HTMLImageElement,s=!("undefined"==typeof global||"undefined"==typeof process||!process.versions||!process.versions.node);let r=t.Buffer,a=t.BigInt;var o=!!r;function l(e){return u(e)?void 0:e}const h=e=>void 0!==e;function u(e){return void 0===e||(e instanceof Map?0===e.size:0===Object.values(e).filter(h).length)}function c(e){let t=new Error(e);throw delete t.stack,t}function f(e){return""===(e=function(e){for(;e.endsWith("\0");)e=e.slice(0,-1);return e}(e).trim())?void 0:e}function d(e){let t=function(e){let t=0;return e.ifd0.enabled&&(t+=1024),e.exif.enabled&&(t+=2048),e.makerNote&&(t+=2048),e.userComment&&(t+=1024),e.gps.enabled&&(t+=512),e.interop.enabled&&(t+=100),e.ifd1.enabled&&(t+=1024),t+2048}(e);return e.jfif.enabled&&(t+=50),e.xmp.enabled&&(t+=2e4),e.iptc.enabled&&(t+=14e3),e.icc.enabled&&(t+=6e3),t}const p="undefined"!=typeof TextDecoder?new TextDecoder("utf-8"):void 0;function g(e){return p?p.decode(e):o?Buffer.from(e).toString("utf8"):decodeURIComponent(escape(String.fromCharCode.apply(null,e)))}class m{static from(e,t){return e instanceof this&&e.le===t?e:new m(e,void 0,void 0,t)}constructor(e,t=0,i,n){if("boolean"==typeof n&&(this.le=n),Array.isArray(e)&&(e=new Uint8Array(e)),0===e)this.byteOffset=0,this.byteLength=0;else if(e instanceof ArrayBuffer){void 0===i&&(i=e.byteLength-t);let n=new DataView(e,t,i);this._swapDataView(n)}else if(e instanceof Uint8Array||e instanceof DataView||e instanceof m){void 0===i&&(i=e.byteLength-t),(t+=e.byteOffset)+i>e.byteOffset+e.byteLength&&c("Creating view outside of available memory in ArrayBuffer");let n=new DataView(e.buffer,t,i);this._swapDataView(n)}else if("number"==typeof e){let t=new DataView(new ArrayBuffer(e));this._swapDataView(t)}else c("Invalid input argument for BufferView: "+e)}_swapArrayBuffer(e){this._swapDataView(new DataView(e))}_swapBuffer(e){this._swapDataView(new DataView(e.buffer,e.byteOffset,e.byteLength))}_swapDataView(e){this.dataView=e,this.buffer=e.buffer,this.byteOffset=e.byteOffset,this.byteLength=e.byteLength}_lengthToEnd(e){return this.byteLength-e}set(e,t,i=m){return e instanceof DataView||e instanceof m?e=new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer&&(e=new Uint8Array(e)),e instanceof Uint8Array||c("BufferView.set(): Invalid data argument."),this.toUint8().set(e,t),new i(this,t,e.byteLength)}subarray(e,t){return t=t||this._lengthToEnd(e),new m(this,e,t)}toUint8(){return new Uint8Array(this.buffer,this.byteOffset,this.byteLength)}getUint8Array(e,t){return new Uint8Array(this.buffer,this.byteOffset+e,t)}getString(e=0,t=this.byteLength){return g(this.getUint8Array(e,t))}getUnicodeString(e=0,t=this.byteLength){const i=[];for(let n=0;n<t&&e+n<this.byteLength;n+=2)i.push(this.getUint16(e+n));return i.map(e=>String.fromCharCode(e)).join("")}getInt8(e){return this.dataView.getInt8(e)}getUint8(e){return this.dataView.getUint8(e)}getInt16(e,t=this.le){return this.dataView.getInt16(e,t)}getInt32(e,t=this.le){return this.dataView.getInt32(e,t)}getUint16(e,t=this.le){return this.dataView.getUint16(e,t)}getUint32(e,t=this.le){return this.dataView.getUint32(e,t)}getFloat32(e,t=this.le){return this.dataView.getFloat32(e,t)}getFloat64(e,t=this.le){return this.dataView.getFloat64(e,t)}getFloat(e,t=this.le){return this.dataView.getFloat32(e,t)}getDouble(e,t=this.le){return this.dataView.getFloat64(e,t)}getUintBytes(e,t,i){switch(t){case 1:return this.getUint8(e,i);case 2:return this.getUint16(e,i);case 4:return this.getUint32(e,i);case 8:return this.getUint64&&this.getUint64(e,i)}}getUint(e,t,i){switch(t){case 8:return this.getUint8(e,i);case 16:return this.getUint16(e,i);case 32:return this.getUint32(e,i);case 64:return this.getUint64&&this.getUint64(e,i)}}toString(e){return this.dataView.toString(e,this.constructor.name)}ensureChunk(){}}function S(e,t){c("".concat(e," '").concat(t,"' was not loaded, try using full build of exifr."))}class C extends Map{constructor(e){super(),this.kind=e}get(e,t){return this.has(e)||S(this.kind,e),t&&(e in t||function(e,t){c("Unknown ".concat(e," '").concat(t,"'."))}(this.kind,e),t[e].enabled||S(this.kind,e)),super.get(e)}keyList(){return Array.from(this.keys())}}var y=new C("file parser"),b=new C("segment parser"),P=new C("file reader");function I(e,t){return(n=e).startsWith("data:")||n.length>1e4?w(e,t,"base64"):i?k(e,t,"url",T):s?w(e,t,"fs"):void c("Invalid input argument");var n}async function k(e,t,i,n){return P.has(i)?w(e,t,i):n?async function(e,t){let i=await t(e);return new m(i)}(e,n):void c("Parser ".concat(i," is not loaded"))}async function w(e,t,i){let n=new(P.get(i))(e,t);return await n.read(),n}async function T(e){return fetch(e).then(e=>e.arrayBuffer())}async function D(e){return new Promise((t,i)=>{let n=new FileReader;n.onloadend=()=>t(n.result||new ArrayBuffer),n.onerror=i,n.readAsArrayBuffer(e)})}class A extends Map{get tagKeys(){return this.allKeys||(this.allKeys=Array.from(this.keys())),this.allKeys}get tagValues(){return this.allValues||(this.allValues=Array.from(this.values())),this.allValues}}function O(e,t,i){let n=new A;for(let[e,t]of i)n.set(e,t);if(Array.isArray(t))for(let i of t)e.set(i,n);else e.set(t,n);return n}function v(e,t,i){let n,s=e.get(t);for(n of i)s.set(n[0],n[1])}const x=new Map,M=new Map,R=new Map,L=["chunked","firstChunkSize","firstChunkSizeNode","firstChunkSizeBrowser","chunkSize","chunkLimit"],F=["jfif","xmp","icc","iptc"],U=["tiff",...F],B=["ifd0","ifd1","exif","gps","interop"],N=[...U,...B],E=["makerNote","userComment"],G=["translateKeys","translateValues","reviveValues","multiSegment"],V=[...G,"sanitize","mergeOutput"];class z{get translate(){return this.translateKeys||this.translateValues||this.reviveValues}}class H extends z{get needed(){return this.enabled||this.deps.size>0}constructor(t,i,n,s){if(super(),full_esm_e(this,"enabled",!1),full_esm_e(this,"skip",new Set),full_esm_e(this,"pick",new Set),full_esm_e(this,"deps",new Set),full_esm_e(this,"translateKeys",!1),full_esm_e(this,"translateValues",!1),full_esm_e(this,"reviveValues",!1),this.key=t,this.enabled=i,this.parse=this.enabled,this.applyInheritables(s),this.canBeFiltered=B.includes(t),this.canBeFiltered&&(this.dict=x.get(t)),void 0!==n)if(Array.isArray(n))this.parse=this.enabled=!0,this.canBeFiltered&&n.length>0&&this.translateTagSet(n,this.pick);else if("object"==typeof n){if(this.enabled=!0,this.parse=!1!==n.parse,this.canBeFiltered){let{pick:e,skip:t}=n;e&&e.length>0&&this.translateTagSet(e,this.pick),t&&t.length>0&&this.translateTagSet(t,this.skip)}this.applyInheritables(n)}else!0===n||!1===n?this.parse=this.enabled=n:c("Invalid options argument: ".concat(n))}applyInheritables(e){let t,i;for(t of G)i=e[t],void 0!==i&&(this[t]=i)}translateTagSet(e,t){if(this.dict){let i,n,{tagKeys:s,tagValues:r}=this.dict;for(i of e)"string"==typeof i?(n=r.indexOf(i),-1===n&&(n=s.indexOf(Number(i))),-1!==n&&t.add(Number(s[n]))):t.add(i)}else for(let i of e)t.add(i)}finalizeFilters(){!this.enabled&&this.deps.size>0?(this.enabled=!0,Y(this.pick,this.deps)):this.enabled&&this.pick.size>0&&Y(this.pick,this.deps)}}var j={jfif:!1,tiff:!0,xmp:!1,icc:!1,iptc:!1,ifd0:!0,ifd1:!1,exif:!0,gps:!0,interop:!1,makerNote:!1,userComment:!1,multiSegment:!1,skip:[],pick:[],translateKeys:!0,translateValues:!0,reviveValues:!0,sanitize:!0,mergeOutput:!0,silentErrors:!0,chunked:!0,firstChunkSize:void 0,firstChunkSizeNode:512,firstChunkSizeBrowser:65536,chunkSize:65536,chunkLimit:5},W=new Map;class K extends z{static useCached(e){let t=W.get(e);return void 0!==t?t:(t=new this(e),W.set(e,t),t)}constructor(e){super(),!0===e?this.setupFromTrue():void 0===e?this.setupFromUndefined():Array.isArray(e)?this.setupFromArray(e):"object"==typeof e?this.setupFromObject(e):c("Invalid options argument ".concat(e)),void 0===this.firstChunkSize&&(this.firstChunkSize=i?this.firstChunkSizeBrowser:this.firstChunkSizeNode),this.mergeOutput&&(this.ifd1.enabled=!1),this.filterNestedSegmentTags(),this.traverseTiffDependencyTree(),this.checkLoadedPlugins()}setupFromUndefined(){let e;for(e of L)this[e]=j[e];for(e of V)this[e]=j[e];for(e of E)this[e]=j[e];for(e of N)this[e]=new H(e,j[e],void 0,this)}setupFromTrue(){let e;for(e of L)this[e]=j[e];for(e of V)this[e]=j[e];for(e of E)this[e]=!0;for(e of N)this[e]=new H(e,!0,void 0,this)}setupFromArray(e){let t;for(t of L)this[t]=j[t];for(t of V)this[t]=j[t];for(t of E)this[t]=j[t];for(t of N)this[t]=new H(t,!1,void 0,this);this.setupGlobalFilters(e,void 0,B)}setupFromObject(e){let t;for(t of(B.ifd0=B.ifd0||B.image,B.ifd1=B.ifd1||B.thumbnail,Object.assign(this,e),L))this[t]=_(e[t],j[t]);for(t of V)this[t]=_(e[t],j[t]);for(t of E)this[t]=_(e[t],j[t]);for(t of U)this[t]=new H(t,j[t],e[t],this);for(t of B)this[t]=new H(t,j[t],e[t],this.tiff);this.setupGlobalFilters(e.pick,e.skip,B,N),!0===e.tiff?this.batchEnableWithBool(B,!0):!1===e.tiff?this.batchEnableWithUserValue(B,e):Array.isArray(e.tiff)?this.setupGlobalFilters(e.tiff,void 0,B):"object"==typeof e.tiff&&this.setupGlobalFilters(e.tiff.pick,e.tiff.skip,B)}batchEnableWithBool(e,t){for(let i of e)this[i].enabled=t}batchEnableWithUserValue(e,t){for(let i of e){let e=t[i];this[i].enabled=!1!==e&&void 0!==e}}setupGlobalFilters(e,t,i,n=i){if(e&&e.length){for(let e of n)this[e].enabled=!1;let t=X(e,i);for(let[e,i]of t)Y(this[e].pick,i),this[e].enabled=!0}else if(t&&t.length){let e=X(t,i);for(let[t,i]of e)Y(this[t].skip,i)}}filterNestedSegmentTags(){let{ifd0:e,exif:t,xmp:i,iptc:n,icc:s}=this;this.makerNote?t.deps.add(37500):t.skip.add(37500),this.userComment?t.deps.add(37510):t.skip.add(37510),i.enabled||e.skip.add(700),n.enabled||e.skip.add(33723),s.enabled||e.skip.add(34675)}traverseTiffDependencyTree(){let{ifd0:e,exif:t,gps:i,interop:n}=this;n.needed&&(t.deps.add(40965),e.deps.add(40965)),t.needed&&e.deps.add(34665),i.needed&&e.deps.add(34853),this.tiff.enabled=B.some(e=>!0===this[e].enabled)||this.makerNote||this.userComment;for(let e of B)this[e].finalizeFilters()}get onlyTiff(){return!F.map(e=>this[e].enabled).some(e=>!0===e)&&this.tiff.enabled}checkLoadedPlugins(){for(let e of U)this[e].enabled&&!b.has(e)&&S("segment parser",e)}}function X(e,t){let i,n,s,r,a=[];for(s of t){for(r of(i=x.get(s),n=[],i))(e.includes(r[0])||e.includes(r[1]))&&n.push(r[0]);n.length&&a.push([s,n])}return a}function _(e,t){return void 0!==e?e:void 0!==t?t:void 0}function Y(e,t){for(let i of t)e.add(i)}full_esm_e(K,"default",j);class J{constructor(t){full_esm_e(this,"parsers",{}),this.options=K.useCached(t)}setup(){if(this.fileParser)return;let{file:e}=this,t=e.getUint16(0);for(let[i,n]of y)if(n.canHandle(e,t))return this.fileParser=new n(this.options,this.file,this.parsers),e[i]=!0;c("Unknown file format")}async read(e){this.file=await function(e,t){return"string"==typeof e?I(e,t):i&&!n&&e instanceof HTMLImageElement?I(e.src,t):e instanceof Uint8Array||e instanceof ArrayBuffer||e instanceof DataView?new m(e):i&&e instanceof Blob?k(e,t,"blob",D):void c("Invalid input argument")}(e,this.options)}async parse(){this.setup(),await this.fileParser.parse();let e={},t=[],i=Object.values(this.parsers).map(async i=>{let n;if(this.options.silentErrors){try{n=await i.parse()}catch(e){t.push(e)}t.push(...i.errors)}else n=await i.parse();i.assignToOutput(e,n)});return await Promise.all(i),this.options.silentErrors&&t.length>0&&(e.errors=t),this.file.close&&this.file.close(),l(e)}async extractThumbnail(){this.setup();let{options:e,file:t}=this,i=b.get("tiff",e);var n;if(t.tiff?n={start:0,type:"tiff"}:t.jpeg&&(n=await this.fileParser.getOrFindSegment("tiff")),void 0===n)return;let s=await this.fileParser.ensureSegmentChunk(n),r=this.parsers.tiff=new i(s,e,t),a=await r.extractThumbnail();return t.close&&t.close(),a}}async function q(e,t){let i=new J(t);return await i.read(e),i.parse()}var Q=Object.freeze({__proto__:null,parse:q,Exifr:J,fileParsers:y,segmentParsers:b,fileReaders:P,tagKeys:x,tagValues:M,tagRevivers:R,createDictionary:O,extendDictionary:v,fetchUrlAsArrayBuffer:T,readBlobAsArrayBuffer:D,chunkedProps:L,otherSegments:F,segments:U,tiffBlocks:B,segmentsAndBlocks:N,tiffExtractables:E,inheritables:G,allFormatters:V,Options:K});class Z{constructor(t,i,n){full_esm_e(this,"ensureSegmentChunk",async e=>{let t=e.start,i=e.size||65536;if(this.file.chunked)if(this.file.available(t,i))e.chunk=this.file.subarray(t,i);else try{e.chunk=await this.file.readChunk(t,i)}catch(t){c("Couldn't read segment: ".concat(JSON.stringify(e),". ").concat(t.message))}else this.file.byteLength>t+i?e.chunk=this.file.subarray(t,i):void 0===e.size?e.chunk=this.file.subarray(t):c("Segment unreachable: "+JSON.stringify(e));return e.chunk}),this.extendOptions&&this.extendOptions(t),this.options=t,this.file=i,this.parsers=n}createParser(e,t){let i=new(b.get(e))(t,this.options,this.file);return this.parsers[e]=i}}class ${static findPosition(e,t){let i=e.getUint16(t+2)+2,n="function"==typeof this.headerLength?this.headerLength(e,t,i):this.headerLength,s=t+n,r=i-n;return{offset:t,length:i,headerLength:n,start:s,size:r,end:s+r}}static parse(e,t={}){return new this(e,new K({[this.type]:t})).parse()}normalizeInput(e){return e instanceof m?e:new m(e)}constructor(t,i={},n){full_esm_e(this,"errors",[]),full_esm_e(this,"raw",new Map),full_esm_e(this,"handleError",e=>{if(!this.options.silentErrors)throw e;this.errors.push(e.message)}),this.chunk=this.normalizeInput(t),this.file=n,this.type=this.constructor.type,this.globalOptions=this.options=i,this.localOptions=i[this.type],this.canTranslate=this.localOptions&&this.localOptions.translate}translate(){this.canTranslate&&(this.translated=this.translateBlock(this.raw,this.type))}get output(){return this.translated?this.translated:this.raw?Object.fromEntries(this.raw):void 0}translateBlock(e,t){let i=R.get(t),n=M.get(t),s=x.get(t),r=this.options[t],a=r.reviveValues&&!!i,o=r.translateValues&&!!n,l=r.translateKeys&&!!s,h={};for(let[t,r]of e)a&&i.has(t)?r=i.get(t)(r):o&&n.has(t)&&(r=this.translateValue(r,n.get(t))),l&&s.has(t)&&(t=s.get(t)||t),h[t]=r;return h}translateValue(e,t){return t[e]||e}assignToOutput(e,t){this.assignObjectToOutput(e,this.constructor.type,t)}assignObjectToOutput(e,t,i){if(this.globalOptions.mergeOutput)return Object.assign(e,i);e[t]?Object.assign(e[t],i):e[t]=i}}full_esm_e($,"headerLength",4),full_esm_e($,"type",void 0),full_esm_e($,"multiSegment",!1),full_esm_e($,"canHandle",()=>!1);function ee(e){return 192===e||194===e||196===e||219===e||221===e||218===e||254===e}function te(e){return e>=224&&e<=239}function ie(e,t){for(let[i,n]of b)if(n.canHandle(e,t))return i}class ne extends Z{constructor(...t){super(...t),full_esm_e(this,"appSegments",[]),full_esm_e(this,"jpegSegments",[]),full_esm_e(this,"unknownSegments",[])}static canHandle(e,t){return 65496===t}async parse(){await this.findAppSegments(),await this.readSegments(),this.mergeMultiSegments(),this.createParsers()}async readSegments(){let e=this.appSegments.map(this.ensureSegmentChunk);await Promise.all(e)}setupSegmentFinderArgs(e){!0===e?(this.findAll=!0,this.wanted=new Set(b.keyList())):(e=void 0===e?b.keyList().filter(e=>this.options[e].enabled):e.filter(e=>this.options[e].enabled&&b.has(e)),this.findAll=!1,this.remaining=new Set(e),this.wanted=new Set(e)),this.unfinishedMultiSegment=!1}async findAppSegments(e=0,t){this.setupSegmentFinderArgs(t);let{file:i,findAll:n,wanted:s,remaining:r}=this;if(!n&&this.file.chunked&&(n=Array.from(s).some(e=>{let t=b.get(e),i=this.options[e];return t.multiSegment&&i.multiSegment}),n&&await this.file.readWhole()),e=this._findAppSegments(e,i.byteLength,n,s,r),!this.options.onlyTiff&&i.chunked){let t=!1;for(;r.size>0&&!t&&(i.canReadNextChunk||this.unfinishedMultiSegment);){let{nextChunkOffset:n}=i,s=this.appSegments.some(e=>!this.file.available(e.offset||e.start,e.length||e.size));if(t=e>n&&!s?!await i.readNextChunk(e):!await i.readNextChunk(n),void 0===(e=this._findAppSegments(e,i.byteLength)))return}}}_findAppSegments(e,t){t-=2;let i,n,s,r,a,o,{file:l,findAll:h,wanted:u,remaining:c,options:f}=this;for(;e<t;e++)if(255===l.getUint8(e))if(i=l.getUint8(e+1),te(i)){if(n=l.getUint16(e+2),s=ie(l,e),s&&u.has(s)&&(r=b.get(s),a=r.findPosition(l,e),o=f[s],a.type=s,this.appSegments.push(a),!h&&(r.multiSegment&&o.multiSegment?(this.unfinishedMultiSegment=a.chunkNumber<a.chunkCount,this.unfinishedMultiSegment||c.delete(s)):c.delete(s),0===c.size)))break;f.recordUnknownSegments&&(a=$.findPosition(l,e),a.marker=i,this.unknownSegments.push(a)),e+=n+1}else if(ee(i)){if(n=l.getUint16(e+2),218===i&&!1!==f.stopAfterSos)return;f.recordJpegSegments&&this.jpegSegments.push({offset:e,length:n,marker:i}),e+=n+1}return e}mergeMultiSegments(){if(!this.appSegments.some(e=>e.multiSegment))return;let e=function(e,t){let i,n,s,r=new Map;for(let a=0;a<e.length;a++)i=e[a],n=i[t],r.has(n)?s=r.get(n):r.set(n,s=[]),s.push(i);return Array.from(r)}(this.appSegments,"type");this.mergedAppSegments=e.map(([e,t])=>{let i=b.get(e,this.options);if(i.handleMultiSegments){return{type:e,chunk:i.handleMultiSegments(t)}}return t[0]})}async createParsers(){let e=this.mergedAppSegments||this.appSegments;for(let t of e){let{type:e,chunk:i}=t;if(!this.options[e].enabled)continue;let n=this.parsers[e];if(n&&n.append);else if(!n){let t=new(b.get(e,this.options))(i,this.options,this.file);this.parsers[e]=t}}}getSegment(e){return this.appSegments.find(t=>t.type===e)}async getOrFindSegment(e){let t=this.getSegment(e);return void 0===t&&(await this.findAppSegments(0,[e]),t=this.getSegment(e)),t}}full_esm_e(ne,"type","jpeg"),y.set("jpeg",ne);const se=[void 0,1,1,2,4,8,1,1,2,4,8,4,8,4];class re extends ${parseHeader(){var e=this.chunk.getUint16();18761===e?this.le=!0:19789===e&&(this.le=!1),this.chunk.le=this.le,this.headerParsed=!0}parseTags(e,t,i=new Map){let{pick:n,skip:s}=this.options[t];n=new Set(n);let r=n.size>0,a=0===s.size,o=this.chunk.getUint16(e);e+=2;for(let l=0;l<o;l++){let o=this.chunk.getUint16(e);if(r){if(n.has(o)&&(i.set(o,this.parseTag(e,o,t)),n.delete(o),0===n.size))break}else!a&&s.has(o)||i.set(o,this.parseTag(e,o,t));e+=12}return i}parseTag(e,t,i){let{chunk:n}=this,s=n.getUint16(e+2),r=n.getUint32(e+4),a=se[s];if(a*r<=4?e+=8:e=n.getUint32(e+8),(s<1||s>13)&&c("Invalid TIFF value type. block: ".concat(i.toUpperCase(),", tag: ").concat(t.toString(16),", type: ").concat(s,", offset ").concat(e)),e>n.byteLength&&c("Invalid TIFF value offset. block: ".concat(i.toUpperCase(),", tag: ").concat(t.toString(16),", type: ").concat(s,", offset ").concat(e," is outside of chunk size ").concat(n.byteLength)),1===s)return n.getUint8Array(e,r);if(2===s)return f(n.getString(e,r));if(7===s)return n.getUint8Array(e,r);if(1===r)return this.parseTagValue(s,e);{let t=new(function(e){switch(e){case 1:return Uint8Array;case 3:return Uint16Array;case 4:return Uint32Array;case 5:return Array;case 6:return Int8Array;case 8:return Int16Array;case 9:return Int32Array;case 10:return Array;case 11:return Float32Array;case 12:return Float64Array;default:return Array}}(s))(r),i=a;for(let n=0;n<r;n++)t[n]=this.parseTagValue(s,e),e+=i;return t}}parseTagValue(e,t){let{chunk:i}=this;switch(e){case 1:return i.getUint8(t);case 3:return i.getUint16(t);case 4:return i.getUint32(t);case 5:return i.getUint32(t)/i.getUint32(t+4);case 6:return i.getInt8(t);case 8:return i.getInt16(t);case 9:return i.getInt32(t);case 10:return i.getInt32(t)/i.getInt32(t+4);case 11:return i.getFloat(t);case 12:return i.getDouble(t);case 13:return i.getUint32(t);default:c("Invalid tiff type ".concat(e))}}}class ae extends re{static canHandle(e,t){return 225===e.getUint8(t+1)&&1165519206===e.getUint32(t+4)&&0===e.getUint16(t+8)}async parse(){this.parseHeader();let{options:e}=this;return e.ifd0.enabled&&await this.parseIfd0Block(),e.exif.enabled&&await this.safeParse("parseExifBlock"),e.gps.enabled&&await this.safeParse("parseGpsBlock"),e.interop.enabled&&await this.safeParse("parseInteropBlock"),e.ifd1.enabled&&await this.safeParse("parseThumbnailBlock"),this.createOutput()}safeParse(e){let t=this[e]();return void 0!==t.catch&&(t=t.catch(this.handleError)),t}findIfd0Offset(){void 0===this.ifd0Offset&&(this.ifd0Offset=this.chunk.getUint32(4))}findIfd1Offset(){if(void 0===this.ifd1Offset){this.findIfd0Offset();let e=this.chunk.getUint16(this.ifd0Offset),t=this.ifd0Offset+2+12*e;this.ifd1Offset=this.chunk.getUint32(t)}}parseBlock(e,t){let i=new Map;return this[t]=i,this.parseTags(e,t,i),i}async parseIfd0Block(){if(this.ifd0)return;let{file:e}=this;this.findIfd0Offset(),this.ifd0Offset<8&&c("Malformed EXIF data"),!e.chunked&&this.ifd0Offset>e.byteLength&&c("IFD0 offset points to outside of file.\nthis.ifd0Offset: ".concat(this.ifd0Offset,", file.byteLength: ").concat(e.byteLength)),e.tiff&&await e.ensureChunk(this.ifd0Offset,d(this.options));let t=this.parseBlock(this.ifd0Offset,"ifd0");return 0!==t.size?(this.exifOffset=t.get(34665),this.interopOffset=t.get(40965),this.gpsOffset=t.get(34853),this.xmp=t.get(700),this.iptc=t.get(33723),this.icc=t.get(34675),this.options.sanitize&&(t.delete(34665),t.delete(40965),t.delete(34853),t.delete(700),t.delete(33723),t.delete(34675)),t):void 0}async parseExifBlock(){if(this.exif)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.exifOffset)return;this.file.tiff&&await this.file.ensureChunk(this.exifOffset,d(this.options));let e=this.parseBlock(this.exifOffset,"exif");return this.interopOffset||(this.interopOffset=e.get(40965)),this.makerNote=e.get(37500),this.userComment=e.get(37510),this.options.sanitize&&(e.delete(40965),e.delete(37500),e.delete(37510)),this.unpack(e,41728),this.unpack(e,41729),e}unpack(e,t){let i=e.get(t);i&&1===i.length&&e.set(t,i[0])}async parseGpsBlock(){if(this.gps)return;if(this.ifd0||await this.parseIfd0Block(),void 0===this.gpsOffset)return;let e=this.parseBlock(this.gpsOffset,"gps");return e&&e.has(2)&&e.has(4)&&(e.set("latitude",oe(...e.get(2),e.get(1))),e.set("longitude",oe(...e.get(4),e.get(3)))),e}async parseInteropBlock(){if(!this.interop&&(this.ifd0||await this.parseIfd0Block(),void 0!==this.interopOffset||this.exif||await this.parseExifBlock(),void 0!==this.interopOffset))return this.parseBlock(this.interopOffset,"interop")}async parseThumbnailBlock(e=!1){if(!this.ifd1&&!this.ifd1Parsed&&(!this.options.mergeOutput||e))return this.findIfd1Offset(),this.ifd1Offset>0&&(this.parseBlock(this.ifd1Offset,"ifd1"),this.ifd1Parsed=!0),this.ifd1}async extractThumbnail(){if(this.headerParsed||this.parseHeader(),this.ifd1Parsed||await this.parseThumbnailBlock(!0),void 0===this.ifd1)return;let e=this.ifd1.get(513),t=this.ifd1.get(514);return this.chunk.getUint8Array(e,t)}get image(){return this.ifd0}get thumbnail(){return this.ifd1}createOutput(){let e,t,i,n={};for(t of B)if(e=this[t],!u(e))if(i=this.canTranslate?this.translateBlock(e,t):Object.fromEntries(e),this.options.mergeOutput){if("ifd1"===t)continue;Object.assign(n,i)}else n[t]=i;return this.makerNote&&(n.makerNote=this.makerNote),this.userComment&&(n.userComment=this.userComment),n}assignToOutput(e,t){if(this.globalOptions.mergeOutput)Object.assign(e,t);else for(let[i,n]of Object.entries(t))this.assignObjectToOutput(e,i,n)}}function oe(e,t,i,n){var s=e+t/60+i/3600;return"S"!==n&&"W"!==n||(s*=-1),s}full_esm_e(ae,"type","tiff"),full_esm_e(ae,"headerLength",10),b.set("tiff",ae);var le=Object.freeze({__proto__:null,default:Q,parse:q,Exifr:J,fileParsers:y,segmentParsers:b,fileReaders:P,tagKeys:x,tagValues:M,tagRevivers:R,createDictionary:O,extendDictionary:v,fetchUrlAsArrayBuffer:T,readBlobAsArrayBuffer:D,chunkedProps:L,otherSegments:F,segments:U,tiffBlocks:B,segmentsAndBlocks:N,tiffExtractables:E,inheritables:G,allFormatters:V,Options:K});const he={ifd0:!1,ifd1:!1,exif:!1,gps:!1,interop:!1,sanitize:!1,reviveValues:!0,translateKeys:!1,translateValues:!1,mergeOutput:!1},ue=Object.assign({},he,{firstChunkSize:4e4,gps:[1,2,3,4]}),ce=Object.assign({},he,{firstChunkSize:4e4,ifd0:[274]}),fe=Object.assign({},he,{tiff:!1,ifd1:!0,mergeOutput:!1});async function de(e){let t=new J(fe);await t.read(e);let i=await t.extractThumbnail();return i&&o?r.from(i):i}async function pe(e){let t=await this.thumbnail(e);if(void 0!==t){let e=new Blob([t]);return URL.createObjectURL(e)}}async function ge(e){let t=new J(ue);await t.read(e);let i=await t.parse();if(i&&i.gps){let{latitude:e,longitude:t}=i.gps;return{latitude:e,longitude:t}}}async function me(e){let t=new J(ce);await t.read(e);let i=await t.parse();if(i&&i.ifd0)return i.ifd0[274]}const Se={1:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:0,rad:0},2:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:0,rad:0},3:{dimensionSwapped:!1,scaleX:1,scaleY:1,deg:180,rad:180*Math.PI/180},4:{dimensionSwapped:!1,scaleX:-1,scaleY:1,deg:180,rad:180*Math.PI/180},5:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:90,rad:90*Math.PI/180},6:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:90,rad:90*Math.PI/180},7:{dimensionSwapped:!0,scaleX:1,scaleY:-1,deg:270,rad:270*Math.PI/180},8:{dimensionSwapped:!0,scaleX:1,scaleY:1,deg:270,rad:270*Math.PI/180}};var Ce=!0,ye=!0;if("object"==typeof navigator){let e=navigator.userAgent;if(e.includes("iPad")||e.includes("iPhone")){let[t,i,n]=e.match(/OS (\d+)_(\d+)/),s=Number(i)+.1*Number(n);Ce=s<13.4,ye=!1}if(e.includes("Chrome/")){let[t,i]=e.match(/Chrome\/(\d+)/);Number(i)>=81&&(Ce=ye=!1)}}async function be(e){let t=await me(e);return Object.assign({canvas:Ce,css:ye},Se[t])}class Pe extends m{constructor(...t){super(...t),full_esm_e(this,"ranges",new Ie),0!==this.byteLength&&this.ranges.add(0,this.byteLength)}_tryExtend(e,t,i){if(0===e&&0===this.byteLength&&i){let e=new DataView(i.buffer||i,i.byteOffset,i.byteLength);this._swapDataView(e)}else{let i=e+t;if(i>this.byteLength){let{dataView:e}=this._extend(i);this._swapDataView(e)}}}_extend(e){let t;t=o?r.allocUnsafe(e):new Uint8Array(e);let i=new DataView(t.buffer,t.byteOffset,t.byteLength);return t.set(new Uint8Array(this.buffer,this.byteOffset,this.byteLength),0),{uintView:t,dataView:i}}subarray(e,t,i=!1){return t=t||this._lengthToEnd(e),i&&this._tryExtend(e,t),this.ranges.add(e,t),super.subarray(e,t)}set(e,t,i=!1){i&&this._tryExtend(t,e.byteLength,e);let n=super.set(e,t);return this.ranges.add(t,n.byteLength),n}async ensureChunk(e,t){this.chunked&&(this.ranges.available(e,t)||await this.readChunk(e,t))}available(e,t){return this.ranges.available(e,t)}}class Ie{constructor(){full_esm_e(this,"list",[])}get length(){return this.list.length}add(e,t,i=0){let n=e+t,s=this.list.filter(t=>ke(e,t.offset,n)||ke(e,t.end,n));if(s.length>0){e=Math.min(e,...s.map(e=>e.offset)),n=Math.max(n,...s.map(e=>e.end)),t=n-e;let i=s.shift();i.offset=e,i.length=t,i.end=n,this.list=this.list.filter(e=>!s.includes(e))}else this.list.push({offset:e,length:t,end:n})}available(e,t){let i=e+t;return this.list.some(t=>t.offset<=e&&i<=t.end)}}function ke(e,t,i){return e<=t&&t<=i}class we extends Pe{constructor(t,i){super(0),full_esm_e(this,"chunksRead",0),this.input=t,this.options=i}async readWhole(){this.chunked=!1,await this.readChunk(this.nextChunkOffset)}async readChunked(){this.chunked=!0,await this.readChunk(0,this.options.firstChunkSize)}async readNextChunk(e=this.nextChunkOffset){if(this.fullyRead)return this.chunksRead++,!1;let t=this.options.chunkSize,i=await this.readChunk(e,t);return!!i&&i.byteLength===t}async readChunk(e,t){if(this.chunksRead++,0!==(t=this.safeWrapAddress(e,t)))return this._readChunk(e,t)}safeWrapAddress(e,t){return void 0!==this.size&&e+t>this.size?Math.max(0,this.size-e):t}get nextChunkOffset(){if(0!==this.ranges.list.length)return this.ranges.list[0].length}get canReadNextChunk(){return this.chunksRead<this.options.chunkLimit}get fullyRead(){return void 0!==this.size&&this.nextChunkOffset===this.size}read(){return this.options.chunked?this.readChunked():this.readWhole()}close(){}}P.set("blob",class extends we{async readWhole(){this.chunked=!1;let e=await D(this.input);this._swapArrayBuffer(e)}readChunked(){return this.chunked=!0,this.size=this.input.size,super.readChunked()}async _readChunk(e,t){let i=t?e+t:void 0,n=this.input.slice(e,i),s=await D(n);return this.set(s,e,!0)}});var Te=Object.freeze({__proto__:null,default:le,parse:q,Exifr:J,fileParsers:y,segmentParsers:b,fileReaders:P,tagKeys:x,tagValues:M,tagRevivers:R,createDictionary:O,extendDictionary:v,fetchUrlAsArrayBuffer:T,readBlobAsArrayBuffer:D,chunkedProps:L,otherSegments:F,segments:U,tiffBlocks:B,segmentsAndBlocks:N,tiffExtractables:E,inheritables:G,allFormatters:V,Options:K,disableAllOptions:he,gpsOnlyOptions:ue,orientationOnlyOptions:ce,thumbnailOnlyOptions:fe,thumbnail:de,thumbnailUrl:pe,gps:ge,orientation:me,rotations:Se,get rotateCanvas(){return Ce},get rotateCss(){return ye},rotation:be});P.set("url",class extends we{async readWhole(){this.chunked=!1;let e=await T(this.input);this._swapArrayBuffer(e)}async _readChunk(e,t){let i=t?e+t-1:void 0,n={};(e||i)&&(n.range="bytes=".concat([e,i].join("-")));let s=await fetch(this.input,{headers:n}),r=await s.arrayBuffer(),a=r.byteLength;if(416!==s.status)return a!==t&&(this.size=e+a),this.set(r,e,!0)}});m.prototype.getUint64=function(e){let t=this.getUint32(e),i=this.getUint32(e+4);return t<1048575?t<<32|i:void 0!==typeof a?(console.warn("Using BigInt because of type 64uint but JS can only handle 53b numbers."),a(t)<<a(32)|a(i)):void c("Trying to read 64b value but JS can only handle 53b numbers.")};class De extends Z{parseBoxes(e=0){let t=[];for(;e<this.file.byteLength-4;){let i=this.parseBoxHead(e);if(t.push(i),0===i.length)break;e+=i.length}return t}parseSubBoxes(e){e.boxes=this.parseBoxes(e.start)}findBox(e,t){return void 0===e.boxes&&this.parseSubBoxes(e),e.boxes.find(e=>e.kind===t)}parseBoxHead(e){let t=this.file.getUint32(e),i=this.file.getString(e+4,4),n=e+8;return 1===t&&(t=this.file.getUint64(e+8),n+=8),{offset:e,length:t,kind:i,start:n}}parseBoxFullHead(e){let t=this.file.getUint32(e.start);e.version=t>>24,e.start+=4}}class Ae extends De{static canHandle(e){if(0!==e.getUint16(0))return!1;let t=e.getUint16(2);if(t>50)return!1;let i=16,n=[];for(;i<t;)n.push(e.getString(i,4)),i+=4;return n.includes("heic")}async parse(){var e=this.file.getUint32(0);let t=this.parseBoxHead(e);await this.file.ensureChunk(t.offset,t.length),this.parseBoxFullHead(t),this.parseSubBoxes(t),this.options.icc.enabled&&await this.findIcc(t),this.options.tiff.enabled&&await this.findExif(t)}async registerSegment(e,t,i){await this.file.ensureChunk(t,i);let n=this.file.subarray(t,i);this.createParser(e,n)}async findIcc(e){let t=this.findBox(e,"iprp");if(void 0===t)return;let i=this.findBox(t,"ipco");if(void 0===i)return;let n=this.findBox(i,"colr");void 0!==n&&await this.registerSegment("icc",n.offset+12,n.length)}async findExif(e){let t=this.findBox(e,"iinf");if(void 0===t)return;let i=this.findBox(e,"iloc");if(void 0===i)return;let n=this.findExifLocIdInIinf(t),s=this.findExtentInIloc(i,n);if(void 0===s)return;let[r,a]=s;await this.file.ensureChunk(r,a);let o=4+this.file.getUint32(r);r+=o,a-=o,await this.registerSegment("tiff",r,a)}findExifLocIdInIinf(e){this.parseBoxFullHead(e);let t,i,n,s,r=e.start,a=this.file.getUint16(r);for(r+=2;a--;){if(t=this.parseBoxHead(r),this.parseBoxFullHead(t),i=t.start,t.version>=2&&(n=3===t.version?4:2,s=this.file.getString(i+n+2,4),"Exif"===s))return this.file.getUintBytes(i,n);r+=t.length}}get8bits(e){let t=this.file.getUint8(e);return[t>>4,15&t]}findExtentInIloc(e,t){this.parseBoxFullHead(e);let i=e.start,[n,s]=this.get8bits(i++),[r,a]=this.get8bits(i++),o=2===e.version?4:2,l=1===e.version||2===e.version?2:0,h=a+n+s,u=2===e.version?4:2,c=this.file.getUintBytes(i,u);for(i+=u;c--;){let e=this.file.getUintBytes(i,o);i+=o+l+2+r;let u=this.file.getUint16(i);if(i+=2,e===t)return u>1&&console.warn("ILOC box has more than one extent but we're only processing one\nPlease create an issue at https://github.com/MikeKovarik/exifr with this file"),[this.file.getUintBytes(i+a,n),this.file.getUintBytes(i+a+n,s)];i+=u*h}}}full_esm_e(Ae,"type","heic"),y.set("heic",Ae),O(x,["ifd0","ifd1"],[[256,"ImageWidth"],[257,"ImageHeight"],[258,"BitsPerSample"],[259,"Compression"],[262,"PhotometricInterpretation"],[270,"ImageDescription"],[271,"Make"],[272,"Model"],[273,"StripOffsets"],[274,"Orientation"],[277,"SamplesPerPixel"],[278,"RowsPerStrip"],[279,"StripByteCounts"],[282,"XResolution"],[283,"YResolution"],[284,"PlanarConfiguration"],[296,"ResolutionUnit"],[301,"TransferFunction"],[305,"Software"],[306,"ModifyDate"],[315,"Artist"],[316,"HostComputer"],[317,"Predictor"],[318,"WhitePoint"],[319,"PrimaryChromaticities"],[513,"ThumbnailOffset"],[514,"ThumbnailLength"],[529,"YCbCrCoefficients"],[530,"YCbCrSubSampling"],[531,"YCbCrPositioning"],[532,"ReferenceBlackWhite"],[700,"ApplicationNotes"],[33432,"Copyright"],[33723,"IPTC"],[34665,"ExifIFD"],[34675,"ICC"],[34853,"GpsIFD"],[330,"SubIFD"],[40965,"InteropIFD"],[40091,"XPTitle"],[40092,"XPComment"],[40093,"XPAuthor"],[40094,"XPKeywords"],[40095,"XPSubject"]]),O(x,"exif",[[33434,"ExposureTime"],[33437,"FNumber"],[34850,"ExposureProgram"],[34852,"SpectralSensitivity"],[34855,"ISO"],[34858,"TimeZoneOffset"],[34859,"SelfTimerMode"],[34864,"SensitivityType"],[34865,"StandardOutputSensitivity"],[34866,"RecommendedExposureIndex"],[34867,"ISOSpeed"],[34868,"ISOSpeedLatitudeyyy"],[34869,"ISOSpeedLatitudezzz"],[36864,"ExifVersion"],[36867,"DateTimeOriginal"],[36868,"CreateDate"],[36873,"GooglePlusUploadCode"],[36880,"OffsetTime"],[36881,"OffsetTimeOriginal"],[36882,"OffsetTimeDigitized"],[37121,"ComponentsConfiguration"],[37122,"CompressedBitsPerPixel"],[37377,"ShutterSpeedValue"],[37378,"ApertureValue"],[37379,"BrightnessValue"],[37380,"ExposureCompensation"],[37381,"MaxApertureValue"],[37382,"SubjectDistance"],[37383,"MeteringMode"],[37384,"LightSource"],[37385,"Flash"],[37386,"FocalLength"],[37393,"ImageNumber"],[37394,"SecurityClassification"],[37395,"ImageHistory"],[37396,"SubjectArea"],[37500,"MakerNote"],[37510,"UserComment"],[37520,"SubSecTime"],[37521,"SubSecTimeOriginal"],[37522,"SubSecTimeDigitized"],[37888,"AmbientTemperature"],[37889,"Humidity"],[37890,"Pressure"],[37891,"WaterDepth"],[37892,"Acceleration"],[37893,"CameraElevationAngle"],[40960,"FlashpixVersion"],[40961,"ColorSpace"],[40962,"ExifImageWidth"],[40963,"ExifImageHeight"],[40964,"RelatedSoundFile"],[41483,"FlashEnergy"],[41486,"FocalPlaneXResolution"],[41487,"FocalPlaneYResolution"],[41488,"FocalPlaneResolutionUnit"],[41492,"SubjectLocation"],[41493,"ExposureIndex"],[41495,"SensingMethod"],[41728,"FileSource"],[41729,"SceneType"],[41730,"CFAPattern"],[41985,"CustomRendered"],[41986,"ExposureMode"],[41987,"WhiteBalance"],[41988,"DigitalZoomRatio"],[41989,"FocalLengthIn35mmFormat"],[41990,"SceneCaptureType"],[41991,"GainControl"],[41992,"Contrast"],[41993,"Saturation"],[41994,"Sharpness"],[41996,"SubjectDistanceRange"],[42016,"ImageUniqueID"],[42032,"OwnerName"],[42033,"SerialNumber"],[42034,"LensInfo"],[42035,"LensMake"],[42036,"LensModel"],[42037,"LensSerialNumber"],[42080,"CompositeImage"],[42081,"CompositeImageCount"],[42082,"CompositeImageExposureTimes"],[42240,"Gamma"],[59932,"Padding"],[59933,"OffsetSchema"],[65e3,"OwnerName"],[65001,"SerialNumber"],[65002,"Lens"],[65100,"RawFile"],[65101,"Converter"],[65102,"WhiteBalance"],[65105,"Exposure"],[65106,"Shadows"],[65107,"Brightness"],[65108,"Contrast"],[65109,"Saturation"],[65110,"Sharpness"],[65111,"Smoothness"],[65112,"MoireFilter"],[40965,"InteropIFD"]]),O(x,"gps",[[0,"GPSVersionID"],[1,"GPSLatitudeRef"],[2,"GPSLatitude"],[3,"GPSLongitudeRef"],[4,"GPSLongitude"],[5,"GPSAltitudeRef"],[6,"GPSAltitude"],[7,"GPSTimeStamp"],[8,"GPSSatellites"],[9,"GPSStatus"],[10,"GPSMeasureMode"],[11,"GPSDOP"],[12,"GPSSpeedRef"],[13,"GPSSpeed"],[14,"GPSTrackRef"],[15,"GPSTrack"],[16,"GPSImgDirectionRef"],[17,"GPSImgDirection"],[18,"GPSMapDatum"],[19,"GPSDestLatitudeRef"],[20,"GPSDestLatitude"],[21,"GPSDestLongitudeRef"],[22,"GPSDestLongitude"],[23,"GPSDestBearingRef"],[24,"GPSDestBearing"],[25,"GPSDestDistanceRef"],[26,"GPSDestDistance"],[27,"GPSProcessingMethod"],[28,"GPSAreaInformation"],[29,"GPSDateStamp"],[30,"GPSDifferential"],[31,"GPSHPositioningError"]]),O(M,["ifd0","ifd1"],[[274,{1:"Horizontal (normal)",2:"Mirror horizontal",3:"Rotate 180",4:"Mirror vertical",5:"Mirror horizontal and rotate 270 CW",6:"Rotate 90 CW",7:"Mirror horizontal and rotate 90 CW",8:"Rotate 270 CW"}],[296,{1:"None",2:"inches",3:"cm"}]]);let Oe=O(M,"exif",[[34850,{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"}],[37121,{0:"-",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}],[37383,{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"}],[37384,{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"}],[37385,{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"}],[41495,{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"}],[41728,{1:"Film Scanner",2:"Reflection Print Scanner",3:"Digital Camera"}],[41729,{1:"Directly photographed"}],[41985,{0:"Normal",1:"Custom",2:"HDR (no original saved)",3:"HDR (original saved)",4:"Original (for HDR)",6:"Panorama",7:"Portrait HDR",8:"Portrait"}],[41986,{0:"Auto",1:"Manual",2:"Auto bracket"}],[41987,{0:"Auto",1:"Manual"}],[41990,{0:"Standard",1:"Landscape",2:"Portrait",3:"Night",4:"Other"}],[41991,{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"}],[41996,{0:"Unknown",1:"Macro",2:"Close",3:"Distant"}],[42080,{0:"Unknown",1:"Not a Composite Image",2:"General Composite Image",3:"Composite Image Captured While Shooting"}]]);const ve={1:"No absolute unit of measurement",2:"Inch",3:"Centimeter"};Oe.set(37392,ve),Oe.set(41488,ve);const xe={0:"Normal",1:"Low",2:"High"};function Me(e){let t=Array.from(e).slice(1);return t[1]>15&&(t=t.map(e=>String.fromCharCode(e))),"0"!==t[2]&&0!==t[2]||t.pop(),t.join(".")}function Re(e){if("string"==typeof e){var[t,i,n,s,r,a]=e.trim().split(/[-: ]/g).map(Number),o=new Date(t,i-1,n);return Number.isNaN(s)||Number.isNaN(r)||Number.isNaN(a)||(o.setHours(s),o.setMinutes(r),o.setSeconds(a)),Number.isNaN(+o)?e:o}}function Le(e){if("string"==typeof e)return e;let t=[];if(0===e[1]&&0===e[e.length-1])for(let i=0;i<e.length;i+=2)t.push(Fe(e[i+1],e[i]));else for(let i=0;i<e.length;i+=2)t.push(Fe(e[i],e[i+1]));return f(String.fromCodePoint(...t))}function Fe(e,t){return e<<8|t}Oe.set(41992,xe),Oe.set(41993,xe),Oe.set(41994,xe),O(R,["ifd0","ifd1"],[[50827,function(e){return"string"!=typeof e?g(e):e}],[306,Re],[40091,Le],[40092,Le],[40093,Le],[40094,Le],[40095,Le]]),O(R,"exif",[[40960,Me],[36864,Me],[36867,Re],[36868,Re]]),O(R,"gps",[[0,e=>Array.from(e).join(".")],[7,e=>Array.from(e).join(":")]]);class Ue extends ${static canHandle(e,t){return 225===e.getUint8(t+1)&&1752462448===e.getUint32(t+4)&&"http://ns.adobe.com/"===e.getString(t+4,"http://ns.adobe.com/".length)}static headerLength(e,t){return"http://ns.adobe.com/xmp/extension/"===e.getString(t+4,"http://ns.adobe.com/xmp/extension/".length)?79:4+"http://ns.adobe.com/xap/1.0/".length+1}static findPosition(e,t){let i=super.findPosition(e,t);return i.multiSegment=i.extended=79===i.headerLength,i.multiSegment?(i.chunkCount=e.getUint8(t+72),i.chunkNumber=e.getUint8(t+76),0!==e.getUint8(t+77)&&i.chunkNumber++):(i.chunkCount=1/0,i.chunkNumber=-1),i}static handleMultiSegments(e){return e.map(e=>e.chunk.getString()).join("")}normalizeInput(e){return"string"==typeof e?e:e.getString&&e.getString()}parse(e=this.chunk){if(!this.localOptions.parse)return e;e=function(e){let t={"rdf:li":1,"rdf:Seq":1,"rdf:Bag":1,"rdf:Alt":1};return e.replace(We,(e,i,n)=>"<"===i?"".concat(e,"#").concat(t[n]++):"".concat(e,"#").concat(--t[n]))}(e);let t=Ne.findAll(e,"rdf","Description");0===t.length&&t.push(new Ne("rdf","Description",void 0,e));let i,n={};for(let e of t)for(let t of e.properties)i=ze(t.ns,n),Ee(t,i);return function(e){let t;for(let i in e)t=e[i]=l(e[i]),void 0===t&&delete e[i];return l(e)}(n)}assignToOutput(e,t){if(this.localOptions.parse)for(let[i,n]of Object.entries(t))switch(i){case"tiff":this.assignObjectToOutput(e,"ifd0",n);break;case"exif":this.assignObjectToOutput(e,"exif",n);break;case"xmlns":break;default:this.assignObjectToOutput(e,i,n)}else e.xmp=t}}full_esm_e(Ue,"type","xmp"),full_esm_e(Ue,"multiSegment",!0),b.set("xmp",Ue);class Be{static findAll(e){return He(e,/([a-zA-Z0-9-]+):([a-zA-Z0-9-]+)=("[^"]*"|'[^']*')/gm).map(Be.unpackMatch)}static unpackMatch(e){let t=e[1],i=e[2],n=e[3].slice(1,-1);return n=je(n),new Be(t,i,n)}constructor(e,t,i){this.ns=e,this.name=t,this.value=i}serialize(){return this.value}}class Ne{static findAll(e,t,i){if(void 0!==t||void 0!==i){t=t||"[\\w\\d-]+",i=i||"[\\w\\d-]+";var n=new RegExp("<(".concat(t,"):(").concat(i,")(#\\d+)?((\\s+?[\\w\\d-:]+=(\"[^\"]*\"|'[^']*'))*\\s*)(\\/>|>([\\s\\S]*?)<\\/\\1:\\2\\3>)"),"gm")}else n=/<([\w\d-]+):([\w\d-]+)(#\d+)?((\s+?[\w\d-:]+=("[^"]*"|'[^']*'))*\s*)(\/>|>([\s\S]*?)<\/\1:\2\3>)/gm;return He(e,n).map(Ne.unpackMatch)}static unpackMatch(e){let t=e[1],i=e[2],n=e[4],s=e[8];return new Ne(t,i,n,s)}constructor(e,t,i,n){this.ns=e,this.name=t,this.attrString=i,this.innerXml=n,this.attrs=Be.findAll(i),this.children=Ne.findAll(n),this.value=0===this.children.length?je(n):void 0,this.properties=[...this.attrs,...this.children]}get isPrimitive(){return void 0!==this.value&&0===this.attrs.length&&0===this.children.length}get isListContainer(){return 1===this.children.length&&this.children[0].isList}get isList(){let{ns:e,name:t}=this;return"rdf"===e&&("Seq"===t||"Bag"===t||"Alt"===t)}get isListItem(){return"rdf"===this.ns&&"li"===this.name}serialize(){if(0===this.properties.length&&void 0===this.value)return;if(this.isPrimitive)return this.value;if(this.isListContainer)return this.children[0].serialize();if(this.isList)return Ve(this.children.map(Ge));if(this.isListItem&&1===this.children.length&&0===this.attrs.length)return this.children[0].serialize();let e={};for(let t of this.properties)Ee(t,e);return void 0!==this.value&&(e.value=this.value),l(e)}}function Ee(e,t){let i=e.serialize();void 0!==i&&(t[e.name]=i)}var Ge=e=>e.serialize(),Ve=e=>1===e.length?e[0]:e,ze=(e,t)=>t[e]?t[e]:t[e]={};function He(e,t){let i,n=[];if(!e)return n;for(;null!==(i=t.exec(e));)n.push(i);return n}function je(e){if(function(e){return null==e||"null"===e||"undefined"===e||""===e||""===e.trim()}(e))return;let t=Number(e);if(!Number.isNaN(t))return t;let i=e.toLowerCase();return"true"===i||"false"!==i&&e.trim()}const We=/(<|\/)(rdf:li|rdf:Seq|rdf:Bag|rdf:Alt)/g;var Ke=Object.freeze({__proto__:null,default:Te,parse:q,Exifr:J,fileParsers:y,segmentParsers:b,fileReaders:P,tagKeys:x,tagValues:M,tagRevivers:R,createDictionary:O,extendDictionary:v,fetchUrlAsArrayBuffer:T,readBlobAsArrayBuffer:D,chunkedProps:L,otherSegments:F,segments:U,tiffBlocks:B,segmentsAndBlocks:N,tiffExtractables:E,inheritables:G,allFormatters:V,Options:K,disableAllOptions:he,gpsOnlyOptions:ue,orientationOnlyOptions:ce,thumbnailOnlyOptions:fe,thumbnail:de,thumbnailUrl:pe,gps:ge,orientation:me,rotations:Se,get rotateCanvas(){return Ce},get rotateCss(){return ye},rotation:be});if(s)try{var Xe="function"==typeof require?Promise.resolve(require("fs").promises):import(/* webpackIgnore: true */ "fs").then(e=>e.promises)}catch(e){console.warn("Couldn't load 'fs'")}P.set("fs",class extends we{async readWhole(){this.chunked=!1,this.fs=await Xe;let e=await this.fs.readFile(this.input);this._swapBuffer(e)}async readChunked(){this.chunked=!0,this.fs=await Xe,await this.open(),await this.readChunk(0,this.options.firstChunkSize)}async open(){void 0===this.fh&&(this.fh=await this.fs.open(this.input,"r"),this.size=(await this.fh.stat(this.input)).size)}async _readChunk(e,t){void 0===this.fh&&await this.open(),e+t>this.size&&(t=this.size-e);var i=this.subarray(e,t,!0);return await this.fh.read(i.dataView,0,t,e),i}async close(){if(this.fh){let e=this.fh;this.fh=void 0,await e.close()}}});P.set("base64",class extends we{constructor(...e){super(...e),this.input=this.input.replace(/^data:([^;]+);base64,/gim,""),this.size=this.input.length/4*3,this.input.endsWith("==")?this.size-=2:this.input.endsWith("=")&&(this.size-=1)}async _readChunk(e,t){let i,n,s=this.input;void 0===e?(e=0,i=0,n=0):(i=4*Math.floor(e/3),n=e-i/4*3),void 0===t&&(t=this.size);let a=e+t,l=i+4*Math.ceil(a/3);s=s.slice(i,l);let h=Math.min(t,this.size-e);if(o){let t=r.from(s,"base64").slice(n,n+h);return this.set(t,e,!0)}{let t=this.subarray(e,h,!0),i=atob(s),r=t.toUint8();for(let e=0;e<h;e++)r[e]=i.charCodeAt(n+e);return t}}});class _e extends Z{static canHandle(e,t){return 18761===t||19789===t}extendOptions(e){let{ifd0:t,xmp:i,iptc:n,icc:s}=e;i.enabled&&t.deps.add(700),n.enabled&&t.deps.add(33723),s.enabled&&t.deps.add(34675),t.finalizeFilters()}async parse(){let{tiff:e,xmp:t,iptc:i,icc:n}=this.options;if(e.enabled||t.enabled||i.enabled||n.enabled){let e=Math.max(d(this.options),this.options.chunkSize);await this.file.ensureChunk(0,e),this.createParser("tiff",this.file),this.parsers.tiff.parseHeader(),await this.parsers.tiff.parseIfd0Block(),this.adaptTiffPropAsSegment("xmp"),this.adaptTiffPropAsSegment("iptc"),this.adaptTiffPropAsSegment("icc")}}adaptTiffPropAsSegment(e){if(this.parsers.tiff[e]){let t=this.parsers.tiff[e],i=m.from(t);this.options[e].enabled&&this.createParser(e,i)}}}full_esm_e(_e,"type","tiff"),y.set("tiff",_e),O(x,"interop",[[1,"InteropIndex"],[2,"InteropVersion"],[4096,"RelatedImageFileFormat"],[4097,"RelatedImageWidth"],[4098,"RelatedImageHeight"]]),v(x,"ifd0",[[11,"ProcessingSoftware"],[254,"SubfileType"],[255,"OldSubfileType"],[263,"Thresholding"],[264,"CellWidth"],[265,"CellLength"],[266,"FillOrder"],[269,"DocumentName"],[280,"MinSampleValue"],[281,"MaxSampleValue"],[285,"PageName"],[286,"XPosition"],[287,"YPosition"],[290,"GrayResponseUnit"],[297,"PageNumber"],[321,"HalftoneHints"],[322,"TileWidth"],[323,"TileLength"],[332,"InkSet"],[337,"TargetPrinter"],[18246,"Rating"],[18249,"RatingPercent"],[33550,"PixelScale"],[34264,"ModelTransform"],[34377,"PhotoshopSettings"],[50706,"DNGVersion"],[50707,"DNGBackwardVersion"],[50708,"UniqueCameraModel"],[50709,"LocalizedCameraModel"],[50736,"DNGLensInfo"],[50739,"ShadowScale"],[50740,"DNGPrivateData"],[33920,"IntergraphMatrix"],[33922,"ModelTiePoint"],[34118,"SEMInfo"],[34735,"GeoTiffDirectory"],[34736,"GeoTiffDoubleParams"],[34737,"GeoTiffAsciiParams"],[50341,"PrintIM"],[50721,"ColorMatrix1"],[50722,"ColorMatrix2"],[50723,"CameraCalibration1"],[50724,"CameraCalibration2"],[50725,"ReductionMatrix1"],[50726,"ReductionMatrix2"],[50727,"AnalogBalance"],[50728,"AsShotNeutral"],[50729,"AsShotWhiteXY"],[50730,"BaselineExposure"],[50731,"BaselineNoise"],[50732,"BaselineSharpness"],[50734,"LinearResponseLimit"],[50735,"CameraSerialNumber"],[50741,"MakerNoteSafety"],[50778,"CalibrationIlluminant1"],[50779,"CalibrationIlluminant2"],[50781,"RawDataUniqueID"],[50827,"OriginalRawFileName"],[50828,"OriginalRawFileData"],[50831,"AsShotICCProfile"],[50832,"AsShotPreProfileMatrix"],[50833,"CurrentICCProfile"],[50834,"CurrentPreProfileMatrix"],[50879,"ColorimetricReference"],[50885,"SRawType"],[50898,"PanasonicTitle"],[50899,"PanasonicTitle2"],[50931,"CameraCalibrationSig"],[50932,"ProfileCalibrationSig"],[50933,"ProfileIFD"],[50934,"AsShotProfileName"],[50936,"ProfileName"],[50937,"ProfileHueSatMapDims"],[50938,"ProfileHueSatMapData1"],[50939,"ProfileHueSatMapData2"],[50940,"ProfileToneCurve"],[50941,"ProfileEmbedPolicy"],[50942,"ProfileCopyright"],[50964,"ForwardMatrix1"],[50965,"ForwardMatrix2"],[50966,"PreviewApplicationName"],[50967,"PreviewApplicationVersion"],[50968,"PreviewSettingsName"],[50969,"PreviewSettingsDigest"],[50970,"PreviewColorSpace"],[50971,"PreviewDateTime"],[50972,"RawImageDigest"],[50973,"OriginalRawFileDigest"],[50981,"ProfileLookTableDims"],[50982,"ProfileLookTableData"],[51043,"TimeCodes"],[51044,"FrameRate"],[51058,"TStop"],[51081,"ReelName"],[51089,"OriginalDefaultFinalSize"],[51090,"OriginalBestQualitySize"],[51091,"OriginalDefaultCropSize"],[51105,"CameraLabel"],[51107,"ProfileHueSatMapEncoding"],[51108,"ProfileLookTableEncoding"],[51109,"BaselineExposureOffset"],[51110,"DefaultBlackRender"],[51111,"NewRawImageDigest"],[51112,"RawToPreviewGain"]]);let Ye=[[273,"StripOffsets"],[279,"StripByteCounts"],[288,"FreeOffsets"],[289,"FreeByteCounts"],[291,"GrayResponseCurve"],[292,"T4Options"],[293,"T6Options"],[300,"ColorResponseUnit"],[320,"ColorMap"],[324,"TileOffsets"],[325,"TileByteCounts"],[326,"BadFaxLines"],[327,"CleanFaxData"],[328,"ConsecutiveBadFaxLines"],[330,"SubIFD"],[333,"InkNames"],[334,"NumberofInks"],[336,"DotRange"],[338,"ExtraSamples"],[339,"SampleFormat"],[340,"SMinSampleValue"],[341,"SMaxSampleValue"],[342,"TransferRange"],[343,"ClipPath"],[344,"XClipPathUnits"],[345,"YClipPathUnits"],[346,"Indexed"],[347,"JPEGTables"],[351,"OPIProxy"],[400,"GlobalParametersIFD"],[401,"ProfileType"],[402,"FaxProfile"],[403,"CodingMethods"],[404,"VersionYear"],[405,"ModeNumber"],[433,"Decode"],[434,"DefaultImageColor"],[435,"T82Options"],[437,"JPEGTables"],[512,"JPEGProc"],[515,"JPEGRestartInterval"],[517,"JPEGLosslessPredictors"],[518,"JPEGPointTransforms"],[519,"JPEGQTables"],[520,"JPEGDCTables"],[521,"JPEGACTables"],[559,"StripRowCounts"],[999,"USPTOMiscellaneous"],[18247,"XP_DIP_XML"],[18248,"StitchInfo"],[28672,"SonyRawFileType"],[28688,"SonyToneCurve"],[28721,"VignettingCorrection"],[28722,"VignettingCorrParams"],[28724,"ChromaticAberrationCorrection"],[28725,"ChromaticAberrationCorrParams"],[28726,"DistortionCorrection"],[28727,"DistortionCorrParams"],[29895,"SonyCropTopLeft"],[29896,"SonyCropSize"],[32781,"ImageID"],[32931,"WangTag1"],[32932,"WangAnnotation"],[32933,"WangTag3"],[32934,"WangTag4"],[32953,"ImageReferencePoints"],[32954,"RegionXformTackPoint"],[32955,"WarpQuadrilateral"],[32956,"AffineTransformMat"],[32995,"Matteing"],[32996,"DataType"],[32997,"ImageDepth"],[32998,"TileDepth"],[33300,"ImageFullWidth"],[33301,"ImageFullHeight"],[33302,"TextureFormat"],[33303,"WrapModes"],[33304,"FovCot"],[33305,"MatrixWorldToScreen"],[33306,"MatrixWorldToCamera"],[33405,"Model2"],[33421,"CFARepeatPatternDim"],[33422,"CFAPattern2"],[33423,"BatteryLevel"],[33424,"KodakIFD"],[33445,"MDFileTag"],[33446,"MDScalePixel"],[33447,"MDColorTable"],[33448,"MDLabName"],[33449,"MDSampleInfo"],[33450,"MDPrepDate"],[33451,"MDPrepTime"],[33452,"MDFileUnits"],[33589,"AdventScale"],[33590,"AdventRevision"],[33628,"UIC1Tag"],[33629,"UIC2Tag"],[33630,"UIC3Tag"],[33631,"UIC4Tag"],[33918,"IntergraphPacketData"],[33919,"IntergraphFlagRegisters"],[33921,"INGRReserved"],[34016,"Site"],[34017,"ColorSequence"],[34018,"IT8Header"],[34019,"RasterPadding"],[34020,"BitsPerRunLength"],[34021,"BitsPerExtendedRunLength"],[34022,"ColorTable"],[34023,"ImageColorIndicator"],[34024,"BackgroundColorIndicator"],[34025,"ImageColorValue"],[34026,"BackgroundColorValue"],[34027,"PixelIntensityRange"],[34028,"TransparencyIndicator"],[34029,"ColorCharacterization"],[34030,"HCUsage"],[34031,"TrapIndicator"],[34032,"CMYKEquivalent"],[34152,"AFCP_IPTC"],[34232,"PixelMagicJBIGOptions"],[34263,"JPLCartoIFD"],[34306,"WB_GRGBLevels"],[34310,"LeafData"],[34687,"TIFF_FXExtensions"],[34688,"MultiProfiles"],[34689,"SharedData"],[34690,"T88Options"],[34732,"ImageLayer"],[34750,"JBIGOptions"],[34856,"Opto-ElectricConvFactor"],[34857,"Interlace"],[34908,"FaxRecvParams"],[34909,"FaxSubAddress"],[34910,"FaxRecvTime"],[34929,"FedexEDR"],[34954,"LeafSubIFD"],[37387,"FlashEnergy"],[37388,"SpatialFrequencyResponse"],[37389,"Noise"],[37390,"FocalPlaneXResolution"],[37391,"FocalPlaneYResolution"],[37392,"FocalPlaneResolutionUnit"],[37397,"ExposureIndex"],[37398,"TIFF-EPStandardID"],[37399,"SensingMethod"],[37434,"CIP3DataFile"],[37435,"CIP3Sheet"],[37436,"CIP3Side"],[37439,"StoNits"],[37679,"MSDocumentText"],[37680,"MSPropertySetStorage"],[37681,"MSDocumentTextPosition"],[37724,"ImageSourceData"],[40965,"InteropIFD"],[40976,"SamsungRawPointersOffset"],[40977,"SamsungRawPointersLength"],[41217,"SamsungRawByteOrder"],[41218,"SamsungRawUnknown"],[41484,"SpatialFrequencyResponse"],[41485,"Noise"],[41489,"ImageNumber"],[41490,"SecurityClassification"],[41491,"ImageHistory"],[41494,"TIFF-EPStandardID"],[41995,"DeviceSettingDescription"],[42112,"GDALMetadata"],[42113,"GDALNoData"],[44992,"ExpandSoftware"],[44993,"ExpandLens"],[44994,"ExpandFilm"],[44995,"ExpandFilterLens"],[44996,"ExpandScanner"],[44997,"ExpandFlashLamp"],[46275,"HasselbladRawImage"],[48129,"PixelFormat"],[48130,"Transformation"],[48131,"Uncompressed"],[48132,"ImageType"],[48256,"ImageWidth"],[48257,"ImageHeight"],[48258,"WidthResolution"],[48259,"HeightResolution"],[48320,"ImageOffset"],[48321,"ImageByteCount"],[48322,"AlphaOffset"],[48323,"AlphaByteCount"],[48324,"ImageDataDiscard"],[48325,"AlphaDataDiscard"],[50215,"OceScanjobDesc"],[50216,"OceApplicationSelector"],[50217,"OceIDNumber"],[50218,"OceImageLogic"],[50255,"Annotations"],[50459,"HasselbladExif"],[50547,"OriginalFileName"],[50560,"USPTOOriginalContentType"],[50656,"CR2CFAPattern"],[50710,"CFAPlaneColor"],[50711,"CFALayout"],[50712,"LinearizationTable"],[50713,"BlackLevelRepeatDim"],[50714,"BlackLevel"],[50715,"BlackLevelDeltaH"],[50716,"BlackLevelDeltaV"],[50717,"WhiteLevel"],[50718,"DefaultScale"],[50719,"DefaultCropOrigin"],[50720,"DefaultCropSize"],[50733,"BayerGreenSplit"],[50737,"ChromaBlurRadius"],[50738,"AntiAliasStrength"],[50752,"RawImageSegmentation"],[50780,"BestQualityScale"],[50784,"AliasLayerMetadata"],[50829,"ActiveArea"],[50830,"MaskedAreas"],[50935,"NoiseReductionApplied"],[50974,"SubTileBlockSize"],[50975,"RowInterleaveFactor"],[51008,"OpcodeList1"],[51009,"OpcodeList2"],[51022,"OpcodeList3"],[51041,"NoiseProfile"],[51114,"CacheVersion"],[51125,"DefaultUserCrop"],[51157,"NikonNEFInfo"],[65024,"KdcIFD"]];v(x,"ifd0",Ye),v(x,"exif",Ye),O(M,"gps",[[23,{M:"Magnetic North",T:"True North"}],[25,{K:"Kilometers",M:"Miles",N:"Nautical Miles"}]]);class Je extends ${static canHandle(e,t){return 224===e.getUint8(t+1)&&1246120262===e.getUint32(t+4)&&0===e.getUint8(t+8)}parse(){return{JFIFVersion:this.chunk.getUint16(0),ResolutionUnit:this.chunk.getUint8(2),XResolution:this.chunk.getUint16(3),YResolution:this.chunk.getUint16(5),ThumbnailWidth:this.chunk.getUint8(7),ThumbnailHeight:this.chunk.getUint8(8)}}}full_esm_e(Je,"type","jfif"),full_esm_e(Je,"headerLength",9),b.set("jfif",Je);class qe extends ${static canHandle(e,t){return 226===e.getUint8(t+1)&&1229144927===e.getUint32(t+4)}static findPosition(e,t){let i=super.findPosition(e,t);return i.chunkNumber=e.getUint8(t+16),i.chunkCount=e.getUint8(t+17),i.multiSegment=i.chunkCount>1,i}static handleMultiSegments(e){return function(e){let t=function(e){let t=e[0].constructor,i=0;for(let t of e)i+=t.length;let n=new t(i),s=0;for(let t of e)n.set(t,s),s+=t.length;return n}(e.map(e=>e.chunk.toUint8()));return new m(t)}(e)}parse(){return this.raw=new Map,this.parseHeader(),this.parseTags(),this.translate(),this.output}parseHeader(){let{raw:e}=this;this.chunk.byteLength<84&&c("ICC header is too short");for(let[t,i]of Object.entries(Qe)){t=parseInt(t,10);let n=i(this.chunk,t);"\0\0\0\0"!==n&&e.set(t,n)}}parseTags(){let e,t,i,n,s,{raw:r}=this,a=this.chunk.getUint32(128),o=132,l=this.chunk.byteLength;for(;a--;){if(e=this.chunk.getString(o,4),t=this.chunk.getUint32(o+4),i=this.chunk.getUint32(o+8),n=this.chunk.getString(t,4),t+i>l)return void console.warn("reached the end of the first ICC chunk. Enable options.tiff.multiSegment to read all ICC segments.");s=this.parseTag(n,t,i),void 0!==s&&"\0\0\0\0"!==s&&r.set(e,s),o+=12}}parseTag(e,t,i){switch(e){case"desc":return this.parseDesc(t);case"mluc":return this.parseMluc(t);case"text":return this.parseText(t,i);case"sig ":return this.parseSig(t)}if(!(t+i>this.chunk.byteLength))return this.chunk.getUint8Array(t,i)}parseDesc(e){let t=this.chunk.getUint32(e+8)-1;return f(this.chunk.getString(e+12,t))}parseText(e,t){return f(this.chunk.getString(e+8,t-8))}parseSig(e){return f(this.chunk.getString(e+8,4))}parseMluc(e){let{chunk:t}=this,i=t.getUint32(e+8),n=t.getUint32(e+12),s=e+16,r=[];for(let a=0;a<i;a++){let i=t.getString(s+0,2),a=t.getString(s+2,2),o=t.getUint32(s+4),l=t.getUint32(s+8)+e,h=f(t.getUnicodeString(l,o));r.push({lang:i,country:a,text:h}),s+=n}return 1===i?r[0].text:r}translateValue(e,t){return"string"==typeof e?t[e]||t[e.toLowerCase()]||e:t[e]||e}}full_esm_e(qe,"type","icc"),full_esm_e(qe,"multiSegment",!0),full_esm_e(qe,"headerLength",18);const Qe={4:Ze,8:function(e,t){return[e.getUint8(t),e.getUint8(t+1)>>4,e.getUint8(t+1)%16].map(e=>e.toString(10)).join(".")},12:Ze,16:Ze,20:Ze,24:function(e,t){const i=e.getUint16(t),n=e.getUint16(t+2)-1,s=e.getUint16(t+4),r=e.getUint16(t+6),a=e.getUint16(t+8),o=e.getUint16(t+10);return new Date(Date.UTC(i,n,s,r,a,o))},36:Ze,40:Ze,48:Ze,52:Ze,64:(e,t)=>e.getUint32(t),80:Ze};function Ze(e,t){return f(e.getString(t,4))}b.set("icc",qe),O(x,"icc",[[4,"ProfileCMMType"],[8,"ProfileVersion"],[12,"ProfileClass"],[16,"ColorSpaceData"],[20,"ProfileConnectionSpace"],[24,"ProfileDateTime"],[36,"ProfileFileSignature"],[40,"PrimaryPlatform"],[44,"CMMFlags"],[48,"DeviceManufacturer"],[52,"DeviceModel"],[56,"DeviceAttributes"],[64,"RenderingIntent"],[68,"ConnectionSpaceIlluminant"],[80,"ProfileCreator"],[84,"ProfileID"],["Header","ProfileHeader"],["MS00","WCSProfiles"],["bTRC","BlueTRC"],["bXYZ","BlueMatrixColumn"],["bfd","UCRBG"],["bkpt","MediaBlackPoint"],["calt","CalibrationDateTime"],["chad","ChromaticAdaptation"],["chrm","Chromaticity"],["ciis","ColorimetricIntentImageState"],["clot","ColorantTableOut"],["clro","ColorantOrder"],["clrt","ColorantTable"],["cprt","ProfileCopyright"],["crdi","CRDInfo"],["desc","ProfileDescription"],["devs","DeviceSettings"],["dmdd","DeviceModelDesc"],["dmnd","DeviceMfgDesc"],["dscm","ProfileDescriptionML"],["fpce","FocalPlaneColorimetryEstimates"],["gTRC","GreenTRC"],["gXYZ","GreenMatrixColumn"],["gamt","Gamut"],["kTRC","GrayTRC"],["lumi","Luminance"],["meas","Measurement"],["meta","Metadata"],["mmod","MakeAndModel"],["ncl2","NamedColor2"],["ncol","NamedColor"],["ndin","NativeDisplayInfo"],["pre0","Preview0"],["pre1","Preview1"],["pre2","Preview2"],["ps2i","PS2RenderingIntent"],["ps2s","PostScript2CSA"],["psd0","PostScript2CRD0"],["psd1","PostScript2CRD1"],["psd2","PostScript2CRD2"],["psd3","PostScript2CRD3"],["pseq","ProfileSequenceDesc"],["psid","ProfileSequenceIdentifier"],["psvm","PS2CRDVMSize"],["rTRC","RedTRC"],["rXYZ","RedMatrixColumn"],["resp","OutputResponse"],["rhoc","ReflectionHardcopyOrigColorimetry"],["rig0","PerceptualRenderingIntentGamut"],["rig2","SaturationRenderingIntentGamut"],["rpoc","ReflectionPrintOutputColorimetry"],["sape","SceneAppearanceEstimates"],["scoe","SceneColorimetryEstimates"],["scrd","ScreeningDesc"],["scrn","Screening"],["targ","CharTarget"],["tech","Technology"],["vcgt","VideoCardGamma"],["view","ViewingConditions"],["vued","ViewingCondDesc"],["wtpt","MediaWhitePoint"]]);const $e={"4d2p":"Erdt Systems",AAMA:"Aamazing Technologies",ACER:"Acer",ACLT:"Acolyte Color Research",ACTI:"Actix Sytems",ADAR:"Adara Technology",ADBE:"Adobe",ADI:"ADI Systems",AGFA:"Agfa Graphics",ALMD:"Alps Electric",ALPS:"Alps Electric",ALWN:"Alwan Color Expertise",AMTI:"Amiable Technologies",AOC:"AOC International",APAG:"Apago",APPL:"Apple Computer",AST:"AST","AT&T":"AT&T",BAEL:"BARBIERI electronic",BRCO:"Barco NV",BRKP:"Breakpoint",BROT:"Brother",BULL:"Bull",BUS:"Bus Computer Systems","C-IT":"C-Itoh",CAMR:"Intel",CANO:"Canon",CARR:"Carroll Touch",CASI:"Casio",CBUS:"Colorbus PL",CEL:"Crossfield",CELx:"Crossfield",CGS:"CGS Publishing Technologies International",CHM:"Rochester Robotics",CIGL:"Colour Imaging Group, London",CITI:"Citizen",CL00:"Candela",CLIQ:"Color IQ",CMCO:"Chromaco",CMiX:"CHROMiX",COLO:"Colorgraphic Communications",COMP:"Compaq",COMp:"Compeq/Focus Technology",CONR:"Conrac Display Products",CORD:"Cordata Technologies",CPQ:"Compaq",CPRO:"ColorPro",CRN:"Cornerstone",CTX:"CTX International",CVIS:"ColorVision",CWC:"Fujitsu Laboratories",DARI:"Darius Technology",DATA:"Dataproducts",DCP:"Dry Creek Photo",DCRC:"Digital Contents Resource Center, Chung-Ang University",DELL:"Dell Computer",DIC:"Dainippon Ink and Chemicals",DICO:"Diconix",DIGI:"Digital","DL&C":"Digital Light & Color",DPLG:"Doppelganger",DS:"Dainippon Screen",DSOL:"DOOSOL",DUPN:"DuPont",EPSO:"Epson",ESKO:"Esko-Graphics",ETRI:"Electronics and Telecommunications Research Institute",EVER:"Everex Systems",EXAC:"ExactCODE",Eizo:"Eizo",FALC:"Falco Data Products",FF:"Fuji Photo Film",FFEI:"FujiFilm Electronic Imaging",FNRD:"Fnord Software",FORA:"Fora",FORE:"Forefront Technology",FP:"Fujitsu",FPA:"WayTech Development",FUJI:"Fujitsu",FX:"Fuji Xerox",GCC:"GCC Technologies",GGSL:"Global Graphics Software",GMB:"Gretagmacbeth",GMG:"GMG",GOLD:"GoldStar Technology",GOOG:"Google",GPRT:"Giantprint",GTMB:"Gretagmacbeth",GVC:"WayTech Development",GW2K:"Sony",HCI:"HCI",HDM:"Heidelberger Druckmaschinen",HERM:"Hermes",HITA:"Hitachi America",HP:"Hewlett-Packard",HTC:"Hitachi",HiTi:"HiTi Digital",IBM:"IBM",IDNT:"Scitex",IEC:"Hewlett-Packard",IIYA:"Iiyama North America",IKEG:"Ikegami Electronics",IMAG:"Image Systems",IMI:"Ingram Micro",INTC:"Intel",INTL:"N/A (INTL)",INTR:"Intra Electronics",IOCO:"Iocomm International Technology",IPS:"InfoPrint Solutions Company",IRIS:"Scitex",ISL:"Ichikawa Soft Laboratory",ITNL:"N/A (ITNL)",IVM:"IVM",IWAT:"Iwatsu Electric",Idnt:"Scitex",Inca:"Inca Digital Printers",Iris:"Scitex",JPEG:"Joint Photographic Experts Group",JSFT:"Jetsoft Development",JVC:"JVC Information Products",KART:"Scitex",KFC:"KFC Computek Components",KLH:"KLH Computers",KMHD:"Konica Minolta",KNCA:"Konica",KODA:"Kodak",KYOC:"Kyocera",Kart:"Scitex",LCAG:"Leica",LCCD:"Leeds Colour",LDAK:"Left Dakota",LEAD:"Leading Technology",LEXM:"Lexmark International",LINK:"Link Computer",LINO:"Linotronic",LITE:"Lite-On",Leaf:"Leaf",Lino:"Linotronic",MAGC:"Mag Computronic",MAGI:"MAG Innovision",MANN:"Mannesmann",MICN:"Micron Technology",MICR:"Microtek",MICV:"Microvitec",MINO:"Minolta",MITS:"Mitsubishi Electronics America",MITs:"Mitsuba",MNLT:"Minolta",MODG:"Modgraph",MONI:"Monitronix",MONS:"Monaco Systems",MORS:"Morse Technology",MOTI:"Motive Systems",MSFT:"Microsoft",MUTO:"MUTOH INDUSTRIES",Mits:"Mitsubishi Electric",NANA:"NANAO",NEC:"NEC",NEXP:"NexPress Solutions",NISS:"Nissei Sangyo America",NKON:"Nikon",NONE:"none",OCE:"Oce Technologies",OCEC:"OceColor",OKI:"Oki",OKID:"Okidata",OKIP:"Okidata",OLIV:"Olivetti",OLYM:"Olympus",ONYX:"Onyx Graphics",OPTI:"Optiquest",PACK:"Packard Bell",PANA:"Matsushita Electric Industrial",PANT:"Pantone",PBN:"Packard Bell",PFU:"PFU",PHIL:"Philips Consumer Electronics",PNTX:"HOYA",POne:"Phase One A/S",PREM:"Premier Computer Innovations",PRIN:"Princeton Graphic Systems",PRIP:"Princeton Publishing Labs",QLUX:"Hong Kong",QMS:"QMS",QPCD:"QPcard AB",QUAD:"QuadLaser",QUME:"Qume",RADI:"Radius",RDDx:"Integrated Color Solutions",RDG:"Roland DG",REDM:"REDMS Group",RELI:"Relisys",RGMS:"Rolf Gierling Multitools",RICO:"Ricoh",RNLD:"Edmund Ronald",ROYA:"Royal",RPC:"Ricoh Printing Systems",RTL:"Royal Information Electronics",SAMP:"Sampo",SAMS:"Samsung",SANT:"Jaime Santana Pomares",SCIT:"Scitex",SCRN:"Dainippon Screen",SDP:"Scitex",SEC:"Samsung",SEIK:"Seiko Instruments",SEIk:"Seikosha",SGUY:"ScanGuy.com",SHAR:"Sharp Laboratories",SICC:"International Color Consortium",SONY:"Sony",SPCL:"SpectraCal",STAR:"Star",STC:"Sampo Technology",Scit:"Scitex",Sdp:"Scitex",Sony:"Sony",TALO:"Talon Technology",TAND:"Tandy",TATU:"Tatung",TAXA:"TAXAN America",TDS:"Tokyo Denshi Sekei",TECO:"TECO Information Systems",TEGR:"Tegra",TEKT:"Tektronix",TI:"Texas Instruments",TMKR:"TypeMaker",TOSB:"Toshiba",TOSH:"Toshiba",TOTK:"TOTOKU ELECTRIC",TRIU:"Triumph",TSBT:"Toshiba",TTX:"TTX Computer Products",TVM:"TVM Professional Monitor",TW:"TW Casper",ULSX:"Ulead Systems",UNIS:"Unisys",UTZF:"Utz Fehlau & Sohn",VARI:"Varityper",VIEW:"Viewsonic",VISL:"Visual communication",VIVO:"Vivo Mobile Communication",WANG:"Wang",WLBR:"Wilbur Imaging",WTG2:"Ware To Go",WYSE:"WYSE Technology",XERX:"Xerox",XRIT:"X-Rite",ZRAN:"Zoran",Zebr:"Zebra Technologies",appl:"Apple Computer",bICC:"basICColor",berg:"bergdesign",ceyd:"Integrated Color Solutions",clsp:"MacDermid ColorSpan",ds:"Dainippon Screen",dupn:"DuPont",ffei:"FujiFilm Electronic Imaging",flux:"FluxData",iris:"Scitex",kart:"Scitex",lcms:"Little CMS",lino:"Linotronic",none:"none",ob4d:"Erdt Systems",obic:"Medigraph",quby:"Qubyx Sarl",scit:"Scitex",scrn:"Dainippon Screen",sdp:"Scitex",siwi:"SIWI GRAFIKA",yxym:"YxyMaster"},et={scnr:"Scanner",mntr:"Monitor",prtr:"Printer",link:"Device Link",abst:"Abstract",spac:"Color Space Conversion Profile",nmcl:"Named Color",cenc:"ColorEncodingSpace profile",mid:"MultiplexIdentification profile",mlnk:"MultiplexLink profile",mvis:"MultiplexVisualization profile",nkpf:"Nikon Input Device Profile (NON-STANDARD!)"};O(M,"icc",[[4,$e],[12,et],[40,Object.assign({},$e,et)],[48,$e],[80,$e],[64,{0:"Perceptual",1:"Relative Colorimetric",2:"Saturation",3:"Absolute Colorimetric"}],["tech",{amd:"Active Matrix Display",crt:"Cathode Ray Tube Display",kpcd:"Photo CD",pmd:"Passive Matrix Display",dcam:"Digital Camera",dcpj:"Digital Cinema Projector",dmpc:"Digital Motion Picture Camera",dsub:"Dye Sublimation Printer",epho:"Electrophotographic Printer",esta:"Electrostatic Printer",flex:"Flexography",fprn:"Film Writer",fscn:"Film Scanner",grav:"Gravure",ijet:"Ink Jet Printer",imgs:"Photo Image Setter",mpfr:"Motion Picture Film Recorder",mpfs:"Motion Picture Film Scanner",offs:"Offset Lithography",pjtv:"Projection Television",rpho:"Photographic Paper Printer",rscn:"Reflective Scanner",silk:"Silkscreen",twax:"Thermal Wax Printer",vidc:"Video Camera",vidm:"Video Monitor"}]]);class tt extends ${static canHandle(e,t){return 237===e.getUint8(t+1)&&"Photoshop"===e.getString(t+4,9)}static headerLength(e,t,i){for(let s=0;s<i;s++)if(this.isIptcSegmentHead(e,t+s)){var n=e.getUint8(t+s+7);return n%2!=0&&(n+=1),0===n&&(n=4),s+8+n}}static isIptcSegmentHead(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)}parse(){let{raw:e}=this,t=this.chunk.byteLength-1;for(let i=0;i<t;i++)if(28===this.chunk.getUint8(i)&&2===this.chunk.getUint8(i+1)){let t=this.chunk.getUint16(i+3),n=this.chunk.getUint8(i+2),s=this.chunk.getString(i+5,t);e.set(n,this.pluralizeValue(e.get(n),s)),i+=4+t}return this.translate(),this.output}pluralizeValue(e,t){return void 0!==e?e instanceof Array?(e.push(t),e):[e,t]:t}}full_esm_e(tt,"type","iptc"),full_esm_e(tt,"translateValues",!1),full_esm_e(tt,"reviveValues",!1),b.set("iptc",tt),O(x,"iptc",[[0,"ApplicationRecordVersion"],[3,"ObjectTypeReference"],[4,"ObjectAttributeReference"],[5,"ObjectName"],[7,"EditStatus"],[8,"EditorialUpdate"],[10,"Urgency"],[12,"SubjectReference"],[15,"Category"],[20,"SupplementalCategories"],[22,"FixtureIdentifier"],[25,"Keywords"],[26,"ContentLocationCode"],[27,"ContentLocationName"],[30,"ReleaseDate"],[35,"ReleaseTime"],[37,"ExpirationDate"],[38,"ExpirationTime"],[40,"SpecialInstructions"],[42,"ActionAdvised"],[45,"ReferenceService"],[47,"ReferenceDate"],[50,"ReferenceNumber"],[55,"DateCreated"],[60,"TimeCreated"],[62,"DigitalCreationDate"],[63,"DigitalCreationTime"],[65,"OriginatingProgram"],[70,"ProgramVersion"],[75,"ObjectCycle"],[80,"Byline"],[85,"BylineTitle"],[90,"City"],[92,"Sublocation"],[95,"State"],[100,"CountryCode"],[101,"Country"],[103,"OriginalTransmissionReference"],[105,"Headline"],[110,"Credit"],[115,"Source"],[116,"CopyrightNotice"],[118,"Contact"],[120,"Caption"],[121,"LocalCaption"],[122,"Writer"],[125,"RasterizedCaption"],[130,"ImageType"],[131,"ImageOrientation"],[135,"LanguageIdentifier"],[150,"AudioType"],[151,"AudioSamplingRate"],[152,"AudioSamplingResolution"],[153,"AudioDuration"],[154,"AudioOutcue"],[184,"JobID"],[185,"MasterDocumentID"],[186,"ShortDocumentID"],[187,"UniqueDocumentID"],[188,"OwnerID"],[200,"ObjectPreviewFileFormat"],[201,"ObjectPreviewFileVersion"],[202,"ObjectPreviewData"],[221,"Prefs"],[225,"ClassifyState"],[228,"SimilarityIndex"],[230,"DocumentNotes"],[231,"DocumentHistory"],[232,"ExifCameraInfo"],[255,"CatalogSets"]]),O(M,"iptc",[[10,{0:"0 (reserved)",1:"1 (most urgent)",2:"2",3:"3",4:"4",5:"5 (normal urgency)",6:"6",7:"7",8:"8 (least urgent)",9:"9 (user-defined priority)"}],[75,{a:"Morning",b:"Both Morning and Evening",p:"Evening"}],[131,{L:"Landscape",P:"Portrait",S:"Square"}]]);/* harmony default export */ var full_esm = (Ke);

// EXTERNAL MODULE: ./node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js
var canvas_to_blob = __webpack_require__("20d0");
var canvas_to_blob_default = /*#__PURE__*/__webpack_require__.n(canvas_to_blob);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ImageUploader.vue?vue&type=script&lang=js&









//
//
//
//
//
//
//
function createCanvas(img, autoRotate, manipulation) {
  var width = img.width;
  var height = img.height; // only swap width and height if the image is rotated 90 or 270 degrees
  // and if the browser doesn't do autorotation already

  if (manipulation.canvas && manipulation.dimensionSwapped) {
    width = img.height;
    height = img.width;
  }

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d'); // only rotate the image using canvas if browser doesn't do autorotation already

  if (autoRotate && manipulation.canvas) {
    ctx.translate(width / 2, height / 2);
    ctx.rotate(manipulation.rad);
    ctx.scale(manipulation.scaleX, manipulation.scaleY);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
  } else {
    if (autoRotate && manipulation.css) {
      canvas.style.transform = "rotate(".concat(manipulation.deg, "deg) scale(").concat(manipulation.scaleX, ", ").concat(manipulation.scaleY, ")");
    }

    ctx.drawImage(img, 0, 0);
  }

  return canvas;
}
/**
 * vue-ImageUploader: a to-the-point vue-component for client-side image upload with resizing of images (JPG, PNG, GIF)
 *
 * Code based on ImageUploader (c) Ross Turner (https://github.com/rossturner/HTML5-ImageUploader) and
 * exif.js (https://github.com/exif-js/exif-js) for JPEG autoRotate functions
 * Adapted for Vue by Svale Fossåskaret / Kartoteket with some modifications.
 *
 *
 * TODO Items:
 * 1. Progress Report
 * 2. Multiple Files / async handling
 * 3. Support custom completion callback
 * 4. Propper unit testing with https://github.com/visionmedia/supertest
 *
 * LICENSE (from original ImageUploader files by Ross Turner):
 *
 * Copyright (c) 2012 Ross Turner and contributors (https://github.com/zsinj)
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/




/* harmony default export */ var ImageUploadervue_type_script_lang_js_ = ({
  name: 'image-uploader',
  props: {
    /**
     * The ID for the file input, required if more than one instance should be used on the same page.
     *
     * @default fileInput
     * @type {String}
     */
    id: {
      type: String,
      default: 'fileInput'
    },

    /**
     * An integer in pixels for the maximum width allowed for uploaded images, selected images with a greater width than this value will be scaled down before upload.
     * @default 1024
     * @type {Number}
     */
    maxWidth: {
      type: Number,
      default: 1024
    },

    /**
     * An integer in pixels for the maximum height allowed for uploaded images, selected images with a greater height than this value will be scaled down before upload.
     * @default 1024
     * @type {Number}
     */
    maxHeight: {
      type: Number,
      default: 1024
    },

    /**
     * TODO: Does not make sens to me
     * A float value in megapixels (MP) for the maximum overall size of the image allowed for uploaded images, selected images with a greater size than this value will be scaled down before upload. If the value is null or is not specified, then maximum size restriction is not applied
     * @default null
     * @type {Number}
     */
    maxSize: {
      type: Number,
      default: null
    },

    /**
     * A float between 0 and 1.00 for the image quality to use in the resulting image data, around 0.9 is recommended.
     * @default 1.00
     * @type {Number}
     */
    quality: {
      type: Number,
      default: 1.0
    },

    /**
     * Allows scaling down to a specified fraction of the original size. (Example: a value of 0.5 will reduce the size by half.) Accepts a decimal value between 0 and 1.
     * @default null
     * @type {Number}
     */
    scaleRatio: {
      type: Number,
      default: null
    },

    /**
     * A boolean flag, if true then EXIF information from the image is parsed and the image is rotated correctly before upload. If false, then no processing is performed, and unwanted image flipping can happen.
     * @default false
     * @type {Boolean}
     */
    autoRotate: {
      type: Boolean,
      default: false
    },

    /**
     * A boolean flag to toogle an img-tag displaying the uploaded image. When set to false no img-tag is displayed
     * @default true
     * @type {Boolean}
     */
    preview: {
      type: Boolean,
      default: true
    },

    /**
     * Sets the desired format for the returned image. Available formats are
     * 'string' (base64), 'verbose' (object), 'blob' (object), 'info' (object), 'file' (unmodified File object)
     * @default {string}
     * @type {String}
     */
    outputFormat: {
      type: String,
      default: 'string'
    },

    /**
     * Sets the desired class name for the input element
     * @default {fileinput}
     * @type {String or Array}
     */
    className: {
      type: [String, Array],
      default: 'fileinput'
    },

    /**
     * Sets an optional capture attribute. (false, camera, user, environment)
     * @default empty
     * @type [String or Boolean]
     */
    capture: {
      type: [String, Boolean],
      default: false
    },

    /**
     * Sets the accept attribute, in case the same input can accept other files
     * Shoub be a comma seperated string, eg 'audio/*,video/*,image/*'
     * @default image/*
     * @type {String}
     */
    accept: {
      type: String,
      default: 'image/*'
    },

    /**
     * An array of image's extensions that will not be resized (['gif', 'svg'])
     * If only 1 extension, it can be provided directly as a stringEg ('gif')
     * Disable all resizing with a catch all ('*')
     * If not resized, the returned output will always be the unmodifed File object
     * @default []
     * @type {String or Array}
     */
    doNotResize: {
      type: [String, Array],
      default: function _default() {
        return [];
      }
    },

    /**
     * How much to write to the console. 0 = silent. 1 = quite. 2 = loud
     * @default false
     * @type {Boolean}
     */
    debug: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      imagePreview: null,
      currentFile: {},
      dimensions: {},
      exifData: {}
    };
  },
  methods: {
    /**
     * Get file from input
     * @param  {object} event
     */
    uploadFile: function uploadFile(e) {
      var file = e.target.files && e.target.files.length ? e.target.files[0] : null;

      if (file) {
        this.emitLoad();
        this.handleFile(file);
      }
    },

    /**
     * Emit event with output
     * @param  {mixed} output - The resized image. type can be simple dataUrl string, verbose object or Blob instance
     */
    emitEvent: function emitEvent(output) {
      this.log('emitEvent() is called with output:', 2, output);
      this.$emit('input', output);
      this.$emit('change', output);
    },
    emitLoad: function emitLoad() {
      this.$emit('onUpload');
    },
    emitComplete: function emitComplete() {
      this.$emit('onComplete');
    },

    /**
     * Handels the file manipulation on upload
     * @param  {File}     file The current original uploaded file
     * @return {}         nada (yet)
     */
    handleFile: function handleFile(file) {
      this.log('handleFile() is called with file:', 2, file);
      this.currentFile = file;
      var mimetype = file.type.split('/'); // NB: Not supprted by Safari on iOS !??! @todo: TEST!

      var isImage = mimetype[0] === 'image';
      var doNotResize = typeof this.doNotResize === 'string' ? [this.doNotResize] : this.doNotResize; // cast to array
      // Don't resize if not image or doNotResize is set

      if (!isImage || doNotResize.includes('*') || doNotResize.includes(mimetype[1])) {
        this.log('No Resize, return file directly');
        this.emitEvent(file); // does NOT respect the output format prop

        this.emitComplete();
      } else {
        var that = this;
        var img = document.createElement('img');
        var reader = new window.FileReader();

        reader.onload = function (e) {
          that.log('reader.onload() is triggered', 2);
          img.src = e.target.result;

          img.onload = function () {
            that.log('img.onload() is triggered', 2); // this extracts exifdata if available. Returns an empty object if not

            full_esm.parse(img, {
              translateValues: false
            }).then(function (exifData) {
              that.exifData = exifData || {};

              if (Object.keys(that.exifData).length !== 0) {
                that.log('ImageUploader: exif data found and extracted', 2);
              }
            });
            full_esm.rotation(img).then(function (rotation) {
              if (rotation) {
                that.log('ImageUploader: exif rotation found', 2);
              }

              that.scaleImage(img, rotation);
            });
          };
        };

        reader.readAsDataURL(file);
      }
    },

    /**
     * Performance orientation and scaling logic
     * @param  {HTMLElement} img -  A document img element containing the uploaded file as a base764 encoded string as source
     * @param  {int} [orientation = 1] - Exif-extracted orientation code
     */
    scaleImage: function scaleImage(img, rotation) {
      this.log('scaleImage() is called', 2);
      var canvas = createCanvas(img, this.autoRotate, rotation); // Let's find the max available width for scaled image

      var ratio = canvas.width / canvas.height;
      var mWidth = Math.min(this.maxWidth, ratio * this.maxHeight); // suggested re-write by https://github.com/ryancramerdesign
      // https://github.com/rossturner/HTML5-ImageUploader/issues/13

      if (this.maxSize > 0 && this.maxSize < canvas.width * canvas.height / 1000000) {
        var mSize = Math.floor(Math.sqrt(this.maxSize * ratio) * 1000);
        mWidth = mWidth > 0 ? Math.min(mWidth, mSize) : mSize;
      }

      if (this.scaleRatio) {
        mWidth = Math.min(mWidth, Math.floor(this.scaleRatio * canvas.width));
      } // store dimensions


      this.dimensions.orgWidth = canvas.width;
      this.dimensions.orgHeight = canvas.height;
      this.dimensions.width = mWidth;
      this.dimensions.height = Math.floor(mWidth / ratio);
      this.log('ImageUploader: original image size = ' + canvas.width + ' X ' + canvas.height);
      this.log('ImageUploader: scaled image size = ' + mWidth + ' X ' + Math.floor(mWidth / ratio));

      if (mWidth <= 0) {
        mWidth = 1;
        console.warning('ImageUploader: image size is too small');
      } // simple resize with a 2:1 ratio


      while (canvas.width >= 2 * mWidth) {
        canvas = this.getHalfScaleCanvas(canvas);
      } // When factor less than 2:1 remains, finish up with alogorithm


      if (canvas.width > mWidth) {
        canvas = this.scaleCanvasWithAlgorithm(canvas, mWidth);
      } // suggested re-write by https://github.com/ryancramerdesign
      // https://github.com/rossturner/HTML5-ImageUploader/issues/13


      var quality = this.currentFile.type === 'image/jpeg' ? this.quality : 1.0;
      var imageData = canvas.toDataURL(this.currentFile.type, quality);

      if (typeof this.onScale === 'function') {
        this.onScale(imageData);
      }

      this.log('New ImageData is ready', 2); // Display preview of the new image

      if (this.preview) {
        this.imagePreview = imageData;
      } // Return the new image
      // this.emitEvent(this.currentFile) // DEBUG


      this.emitEvent(this.formatOutput(imageData));
      this.emitComplete();
    },

    /**
     * Scale Canvas. Scales the
     * @param {HTMLElement} canvas - canvas element before finale resize
     * @param {int} maxWidth - max image width
     * @returns {HTMLElement} - canvas resized to scale
     */
    scaleCanvasWithAlgorithm: function scaleCanvasWithAlgorithm(canvas, maxWidth) {
      var scaledCanvas = document.createElement('canvas');
      var scale = maxWidth / canvas.width;
      scaledCanvas.width = canvas.width * scale;
      scaledCanvas.height = canvas.height * scale;
      var srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      var destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);
      this.applyBilinearInterpolation(srcImgData, destImgData, scale);
      scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);
      return scaledCanvas;
    },

    /**
     * Interpolation
     * @param  {ImageData} srcCanvasData - Pixel data of source canvas
     * @param  {ImageData} destCanvasData - Pixel data of destionation canvas
     * @param  {int} scale - Resize scale (max width / original width)
     * @author http://web.archive.org/web/20120123142531/http://www.philou.ch/js-bilinear-interpolation.html
     */
    applyBilinearInterpolation: function applyBilinearInterpolation(srcCanvasData, destCanvasData, scale) {
      function inner(f00, f10, f01, f11, x, y) {
        var un_x = 1.0 - x;
        var un_y = 1.0 - y;
        return f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y;
      }

      var i, j;
      var iyv, iy0, iy1, ixv, ix0, ix1;
      var idxD, idxS00, idxS10, idxS01, idxS11;
      var dx, dy;
      var r, g, b, a;

      for (i = 0; i < destCanvasData.height; ++i) {
        iyv = i / scale;
        iy0 = Math.floor(iyv); // Math.ceil can go over bounds

        iy1 = Math.ceil(iyv) > srcCanvasData.height - 1 ? srcCanvasData.height - 1 : Math.ceil(iyv);

        for (j = 0; j < destCanvasData.width; ++j) {
          ixv = j / scale;
          ix0 = Math.floor(ixv); // Math.ceil can go over bounds

          ix1 = Math.ceil(ixv) > srcCanvasData.width - 1 ? srcCanvasData.width - 1 : Math.ceil(ixv);
          idxD = (j + destCanvasData.width * i) * 4; // matrix to vector indices

          idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
          idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
          idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
          idxS11 = (ix1 + srcCanvasData.width * iy1) * 4; // overall coordinates to unit square

          dx = ixv - ix0;
          dy = iyv - iy0; // I let the r, g, b, a on purpose for debugging

          r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy);
          destCanvasData.data[idxD] = r;
          g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy);
          destCanvasData.data[idxD + 1] = g;
          b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy);
          destCanvasData.data[idxD + 2] = b;
          a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy);
          destCanvasData.data[idxD + 3] = a;
        }
      }
    },

    /**
     * getHalfScaleCanvas - return a canvas divided by 2
     * @param  {HTMLElement} canvas - input document canvas element
     * @returns  {HTMLElement} half of input canvas
     */
    getHalfScaleCanvas: function getHalfScaleCanvas(canvas) {
      var halfCanvas = document.createElement('canvas');
      halfCanvas.width = canvas.width / 2;
      halfCanvas.height = canvas.height / 2;
      halfCanvas.getContext('2d').drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);
      return halfCanvas;
    },

    /**
     * Sets the format of the component output
     * @param  {string} imageData  dataUrl
     * @return {mixed}             Either simple dataUrl string or
     *                                    object with dataURl and metadata or
     *                                    blob or
     *                                    file
     */
    formatOutput: function formatOutput(imageData) {
      this.log('ImageUploader: outputFormat: ' + this.outputFormat);

      if (this.outputFormat === 'file') {
        return this.currentFile;
      }

      if (this.outputFormat === 'blob') {
        if (typeof canvas_to_blob_default.a === 'undefined') {
          console.warn('Missing library! blueimp-canvas-to-blob.js must be loaded to output as "blob"');
          console.warn('Falling back to default base64 dataUrl');
          return imageData;
        }

        return canvas_to_blob_default()(imageData);
      }

      var info = {
        name: this.currentFile.name,
        type: this.currentFile.type,
        // size: this.currentFile.size,
        newWidth: this.dimensions.width,
        newHeight: this.dimensions.height,
        orgWidth: this.dimensions.orgWidth,
        orgHeight: this.dimensions.orgHeight,
        aspectRatio: Math.round(this.dimensions.width / this.dimensions.height * 100) / 100,
        //as Float
        modifiedTimestamp: this.currentFile.lastModified,
        modifiedDate: this.currentFile.lastModifiedDate
      }; // return just info

      if (this.outputFormat === 'info') {
        return info;
      }

      if (this.outputFormat === 'verbose') {
        var data = {
          dataUrl: imageData,
          info: info,
          exif: Object.keys(this.exifData).length > 0 ? this.exifData : null
        };
        return data;
      } // simple base64 dataUrl string by default


      return imageData;
    },

    /**
     * Debug logger to console
     * @param  {string} msg - Message to console
     * @param  {int} level - Debug level to output
     * @param  {mixed} details - Extra debug details
     */
    log: function log(msg) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (this.debug >= level) {
        // eslint-disable-next-line
        console.info(msg);

        if (details) {
          // eslint-disable-next-line
          console.info(details);
        }
      }
    }
  },
  created: function created() {
    this.log('Initialised ImageUploader');
  }
});
// CONCATENATED MODULE: ./src/components/ImageUploader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ImageUploadervue_type_script_lang_js_ = (ImageUploadervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/ImageUploader.vue





/* normalize component */

var component = normalizeComponent(
  components_ImageUploadervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ImageUploader = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/components/index.js
var components = __webpack_require__("2af9");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport install */__webpack_require__.d(__webpack_exports__, "install", function() { return components["b" /* install */]; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components["a" /* default */]);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
});