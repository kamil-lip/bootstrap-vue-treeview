import Vue$1 from 'vue';
import { Contextmenu, ContextmenuItem } from 'v-contextmenu';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

var stringify$1 = createCommonjsModule(function (module) {
module.exports = { "default": stringify, __esModule: true };
});

var _JSON$stringify = unwrapExports(stringify$1);

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterators = {};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var _library = true;

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
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

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _redefine = _hide;

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
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

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
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
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$1 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var core_getIterator = _core.getIterator = function (it) {
  var iterFn = core_getIteratorMethod(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return _anObject(iterFn.call(it));
};

var getIterator = core_getIterator;

var getIterator$1 = createCommonjsModule(function (module) {
module.exports = { "default": getIterator, __esModule: true };
});

var _getIterator = unwrapExports(getIterator$1);

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$2 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$2] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var from = _core.Array.from;

var from$1 = createCommonjsModule(function (module) {
module.exports = { "default": from, __esModule: true };
});

unwrapExports(from$1);

var toConsumableArray = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _from2 = _interopRequireDefault(from$1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var SPECIES = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _validateCollection = function (it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var dP$1 = _objectDp.f;









var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$1(C.prototype, 'size', {
      get: function () {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SPECIES$1 = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var dP$2 = _objectDp.f;
var each = _arrayMethods(0);


var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      _anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
        _anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP$2(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

var _arrayFromIterable = function (iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function (NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function (COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/





var _setCollectionFrom = function (COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    _aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) _aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = _ctx(mapFn, arguments[2], 2);
      _forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      _forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var map = _core.Map;

var map$1 = createCommonjsModule(function (module) {
module.exports = { "default": map, __esModule: true };
});

var _Map = unwrapExports(map$1);

var EventBus = new Vue$1();

//

var script = {
  data: function data() {
    return {
      nodeDragOver: false
    };
  },

  methods: {
    draggingEnded: function draggingEnded() {
      this.draggedNode = null;
    },
    dragover: function dragover(ev) {
      ev.dataTransfer.dropEffect = 'move';
    },
    drop: function drop() {
      this.$emit('nodeDrop');
    }
  }
};

var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "drop-between-zone", class: { 'active': _vm.nodeDragOver }, on: { "drop": function drop($event) {
        $event.preventDefault();$event.stopPropagation();return _vm.drop($event);
      }, "dragover": function dragover($event) {
        $event.preventDefault();return _vm.dragover($event);
      }, "dragenter": function dragenter($event) {
        $event.preventDefault();$event.stopPropagation();_vm.nodeDragOver = true;
      }, "dragleave": function dragleave($event) {
        $event.preventDefault();$event.stopPropagation();_vm.nodeDragOver = false;
      } } });
};
var __vue_staticRenderFns__ = [];

var __vue_template__ = typeof __vue_render__ !== 'undefined' ? { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ } : {};
/* style */
var __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-1c447986_0", { source: "\n.drop-between-zone{height:4px;width:100%;z-index:1\n}\n.drop-between-zone.active{position:static;top:0;border:1px dashed #d2d2d2;height:24px\n}", map: undefined, media: undefined });
};
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script$$1 || {};

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(_JSON$stringify(css.map)))) + ' */';
      }

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var DropBetweenZone = __vue_normalize__(__vue_template__, __vue_inject_styles__, typeof __vue_script__ === 'undefined' ? {} : __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, typeof __vue_create_injector__ !== 'undefined' ? __vue_create_injector__ : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var script$1 = {
  name: 'tree-node',
  components: {
    DropBetweenZone: DropBetweenZone
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    keyProp: {
      type: String,
      default: 'id'
    },
    labelProp: {
      type: String,
      default: 'name'
    },
    childrenProp: {
      type: String,
      default: 'children'
    },
    draggable: {
      type: Boolean,
      default: false
    },
    renameOnDblClick: {
      type: Boolean,
      default: false
    },
    // default icon if node icon is not specified
    defaultIconClass: {
      type: String,
      default: null
    },
    // default label class if node label class is not specified
    defaultLabelClass: {
      type: String,
      default: null
    },
    // where to search for node icon
    iconClassProp: {
      type: String,
      default: null
    },
    // where to search for node label class
    labelClassProp: {
      type: String,
      default: null
    },
    // where to search for node expanded
    expandedProp: {
      type: String,
      default: null
    },
    // show icon
    showIcon: {
      type: Boolean,
      default: false
    },
    // class added to every icon no matter what
    prependIconClass: {
      type: String,
      default: null
    },
    // class added to every label no matter what
    prependLabelClass: {
      type: String,
      default: null
    },
    contextMenu: {
      type: Boolean,
      default: true
    },
    nodeIconHtml: {
      type: String,
      default: true
    }
  },
  data: function data() {
    return {
      expanded: this.data[this.expandedProp] || false,
      selected: false,
      nodeDragOver: false,
      enterLeaveCounter: 0,
      draggedNode: null,
      dropDisabled: false,
      renaming: false,
      renameNewLabel: this.data[this.labelProp]
    };
  },

  directives: {
    focus: {
      // directive definition
      inserted: function inserted(el) {
        el.focus();
      }
    },
    selectText: {
      inserted: function inserted(el) {
        el.select();
      }
    }
  },
  watch: {
    selected: function selected(_selected) {
      this.$emit('nodeSelect', this, _selected);
    },
    dropDisabled: function dropDisabled(disabled) {
      this.$emit(disabled ? 'dropDisabled' : 'dropEnabled');
    },
    nodeDragOver: function nodeDragOver(dragover) {
      if (dragover) {
        // check if node has any children, if yes then expand it after 1 sec
        if (!this.expanded && Array.isArray(this.data[this.childrenProp]) && this.data[this.childrenProp].length > 0) {
          this.expandNodeTimeout = setTimeout(this.toggle, 1000);
        }
      } else if (this.expandNodeTimeout) {
        clearTimeout(this.expandNodeTimeout);
      }
    }
  },
  computed: {
    hasChildren: function hasChildren() {
      return this.data[this.childrenProp] !== undefined && this.data[this.childrenProp].length > 0;
    },
    iconClass: function iconClass() {
      return this.iconClassProp && this.data[this.iconClassProp] !== undefined ? this.data[this.iconClassProp] : this.defaultIconClass;
    },
    labelClass: function labelClass() {
      return this.labelClassProp && this.data[this.labelClassProp] !== undefined ? this.data[this.labelClassProp] : this.defaultLabelClass;
    }
  },
  methods: {
    nodeToggle: function nodeToggle(data) {
      this.$emit('nodeToggle', data);
    },
    toggle: function toggle() {
      if (this.data[this.childrenProp] && Array.isArray(this.data[this.childrenProp]) && this.data[this.childrenProp].length > 0) {
        this.expanded = !this.expanded;
        this.$emit('nodeToggle', {
          data: this.data,
          expanded: this.expanded
        });
      }
    },
    toggleSelection: function toggleSelection() {
      if (!this.renaming) {
        this.selected = !this.selected;
      }
    },
    select: function select() {
      if (!this.renaming) {
        this.selected = true;
      }
    },
    deselect: function deselect() {
      if (!this.renaming) {
        this.selected = false;
      }
    },
    expand: function expand() {
      if (this.data[this.childrenProp] && Array.isArray(this.data[this.childrenProp]) && this.data[this.childrenProp].length > 0) {
        this.expanded = true;
      }
    },
    collapse: function collapse() {
      this.expanded = false;
    },
    childNodeSelect: function childNodeSelect(node, isSelected) {
      // forward event to the parent node
      this.$emit('nodeSelect', node, isSelected);
    },
    nodeDragStart: function nodeDragStart() {
      EventBus.$on('dropOK', this.cutNode);
    },
    cutNode: function cutNode() {
      EventBus.$off('dropOK');
      var idx = this.data[this.childrenProp].indexOf(window._bTreeView.draggedNodeData);
      this.data[this.childrenProp].splice(idx, 1);
      // let's notify that node data was successfully cut (removed from array)
      EventBus.$emit('cutOK');
    },
    getChildNodes: function getChildNodes() {
      return this.$refs.childNodes || [];
    },
    dragstart: function dragstart(ev) {
      this.dropDisabled = true;
      ev.dataTransfer.dropEffect = 'none';
      this.$emit('nodeDragStart');
      EventBus.$emit('nodeDragStart', this);
      // didn't use dataTransfer it's not fully supported by ie
      // and beacuse it's not available in the dragover event handler
      if (window._bTreeView === undefined) {
        window._bTreeView = {};
      }
      _bTreeView.draggedNodeData = this.data;
      _bTreeView.draggedNodeKey = this.data[this.keyProp];
    },
    drop: function drop(ev) {
      if (this.data[this.childrenProp] === undefined) {
        Vue.set(this.data, this.childrenProp, []);
      }
      // append node
      this.dropNodeAtPosition(this.data[this.childrenProp].length);
      this.nodeDragOver = false;
    },
    dragEnter: function dragEnter(ev) {
      this.enterLeaveCounter++;
      this.dropEffect = ev.dataTransfer.dropEffect = !this.dropDisabled && window._bTreeView !== undefined && window._bTreeView.draggedNodeKey !== undefined && this.data[this.keyProp] !== window._bTreeView.draggedNodeKey && (this.data[this.childrenProp] === undefined || this.data[this.childrenProp].indexOf(window._bTreeView.draggedNodeData) < 0) && !this.isDescendantOf(window._bTreeView.draggedNodeData) ? 'move' : 'none';
      if (this.dropEffect === 'move' && this.enterLeaveCounter === 1) {
        this.nodeDragOver = true;
      }
    },
    dragLeave: function dragLeave() {
      this.enterLeaveCounter--;
      if (this.enterLeaveCounter !== 1) {
        this.nodeDragOver = false;
      }
    },
    dragend: function dragend(ev) {
      EventBus.$off('dropOK');
      EventBus.$off('cutOK');
      this.dropDisabled = false;
      EventBus.$emit('nodeDragEnd');
    },
    dragover: function dragover(ev) {
      ev.dataTransfer.dropEffect = this.dropEffect || 'none';
    },
    isDescendantOf: function isDescendantOf(nodeData) {
      if (nodeData[this.childrenProp] === undefined) {
        return false;
      }
      var nodes = [nodeData];
      for (var i = 0; i < nodes.length; i++) {
        var tmpNode = nodes[i];
        if (tmpNode[this.childrenProp] !== undefined) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _getIterator(tmpNode[this.childrenProp]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var child = _step.value;

              if (child === this.data) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          nodes.push.apply(nodes, _toConsumableArray(tmpNode[this.childrenProp]));
        }
      }
    },
    draggingStarted: function draggingStarted(draggedNode) {
      this.draggedNode = draggedNode;
      this.enterLeaveCounter = 0;
      // let's listen for the drag end event
      EventBus.$on('nodeDragEnd', this.draggingEnded);
    },
    draggingEnded: function draggingEnded() {
      // stop listening for the dragging end event
      EventBus.$off('nodeDragEnd', this.draggingEnded);
      this.draggedNode = null;
    },
    dropNodeAtPosition: function dropNodeAtPosition(pos) {
      var _this = this;

      // position can change if we move node within the same parent node (same level)
      // so it's better to remember node at previous position
      var insertAfter = pos - 1 < 0 ? null : this.data[this.childrenProp][pos - 1];
      EventBus.$on('cutOK', function () {
        var pos = _this.data[_this.childrenProp].indexOf(insertAfter) + 1;
        _this.data[_this.childrenProp].splice(pos, 0, window._bTreeView.draggedNodeData);
        delete window._bTreeView.draggedNodeKey;
        delete window._bTreeView.draggedNodeData;
        EventBus.$off('cutOK');
      });
      EventBus.$emit('dropOK');
    },
    showContextMenu: function showContextMenu(event) {
      if (this.renaming) {
        this.cancelRenaming();
      }
      this.select();

      if (this.data.disableCtx) {
        event.preventDefault();
        return;
      }

      if (this.contextMenu) {
        event.preventDefault();
        EventBus.$emit('openNodeContextMenuInternal', { event: event, node: this });
      }
    },
    delete: function _delete() {
      this.$emit('deleteNode', this);
    },
    deleteChildNode: function deleteChildNode(childNodeData) {
      var children = this.data[this.childrenProp];
      var idx = children.indexOf(childNodeData);
      children.splice(idx, 1);
    },
    appendChild: function appendChild(childNodeData) {
      if (this.data[this.childrenProp] === undefined) {
        Vue.set(this.data, this.childrenProp, []);
      }
      this.data[this.childrenProp].push(childNodeData);
      this.expanded = true;
    },
    startRenaming: function startRenaming() {
      this.deselect();
      this.renameNewLabel = this.data[this.labelProp];
      this.renaming = true;
    },
    cancelRenaming: function cancelRenaming() {
      this.renameNewLabel = this.data[this.labelProp];
      this.renaming = false;
    },
    endRenaming: function endRenaming() {
      this.data[this.labelProp] = this.renameNewLabel;
      this.renaming = false;
    },
    dblClickLabel: function dblClickLabel() {
      if (this.renameOnDblClick) {
        this.startRenaming();
      }
    }
  },
  created: function created() {
    var _this2 = this;

    EventBus.$on('nodeDragStart', this.draggingStarted);
    this.$watch('data.' + this.childrenProp, function (children) {
      if (children.length === 0 && this.expanded) {
        this.expanded = this.data[this.expandedProp] || false;
      }
    });
    if (this.$parent) {
      this.$parent.$on('dropDisabled', function () {
        _this2.dropDisabled = true;
      });
      this.$parent.$on('dropEnabled', function () {
        _this2.dropDisabled = false;
      });
    }
  }
};

var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tree-branch", class: { selected: _vm.selected } }, [_c('div', { staticClass: "tree-node", class: { 'has-child-nodes': _vm.hasChildren, 'tree-node-expanded': _vm.expanded, 'drop-active': _vm.nodeDragOver }, attrs: { "draggable": _vm.draggable && !_vm.renaming }, on: { "drop": function drop($event) {
        $event.preventDefault();return _vm.drop($event);
      }, "dragover": function dragover($event) {
        $event.preventDefault();return _vm.dragover($event);
      }, "dragstart": function dragstart($event) {
        $event.stopPropagation();return _vm.dragstart($event);
      }, "dragend": _vm.dragend, "dragenter": function dragenter($event) {
        $event.preventDefault();$event.stopPropagation();return _vm.dragEnter($event);
      }, "dragleave": function dragleave($event) {
        $event.preventDefault();$event.stopPropagation();return _vm.dragLeave($event);
      }, "contextmenu": function contextmenu($event) {
        _vm.showContextMenu($event);
      } } }, [_c('transition', { attrs: { "name": "rotateArrow" } }, [_vm.hasChildren ? _c('div', { staticClass: "tree-node-icon-container", on: { "click": function click($event) {
        $event.preventDefault();return _vm.toggle($event);
      } } }, [_vm.nodeIconHtml ? [_c('div', { staticClass: "tree-node-icon" }, [_c('div', { domProps: { "innerHTML": _vm._s(_vm.nodeIconHtml) } })])] : _c('svg', { staticClass: "tree-node-icon", attrs: { "width": "12", "height": "12" } }, [_c('path', { staticClass: "svg-icon", attrs: { "d": "M2 1 L10 6 L2 11 Z" } })])], 2) : _vm._e()]), _vm._v(" "), _c('span', { staticClass: "tree-node-label", on: { "click": _vm.toggleSelection, "dblclick": _vm.dblClickLabel } }, [_vm.showIcon && _vm.iconClass !== null ? _c('i', { class: ['label-icon', _vm.prependIconClass, _vm.iconClass] }) : _vm._e(), _vm._v(" "), _vm.renaming ? _c('input', { directives: [{ name: "model", rawName: "v-model", value: _vm.renameNewLabel, expression: "renameNewLabel" }, { name: "focus", rawName: "v-focus" }, { name: "select-text", rawName: "v-select-text" }], ref: "inputRename", staticClass: "form-control form-control-sm input-rename", attrs: { "type": "text" }, domProps: { "value": _vm.renameNewLabel }, on: { "blur": _vm.endRenaming, "keyup": [function ($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }$event.stopPropagation();return _vm.cancelRenaming($event);
      }, function ($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }$event.stopPropagation();return _vm.endRenaming($event);
      }], "input": function input($event) {
        if ($event.target.composing) {
          return;
        }_vm.renameNewLabel = $event.target.value;
      } } }) : _c('span', { class: ['node-label-text', _vm.prependLabelClass, _vm.labelClass] }, [_vm._v(_vm._s(_vm.data[_vm.labelProp]))])])], 1), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.expanded && _vm.data[_vm.childrenProp] && Array.isArray(_vm.data[_vm.childrenProp]), expression: "expanded && data[childrenProp] && Array.isArray(data[childrenProp])" }], staticClass: "tree-node-children" }, [!_vm.dropDisabled && _vm.draggedNode !== null && _vm.data[_vm.childrenProp] && _vm.draggedNode.data !== _vm.data[_vm.childrenProp][0] ? _c('drop-between-zone', { on: { "nodeDrop": function nodeDrop($event) {
        _vm.dropNodeAtPosition(0);
      } } }) : _vm._e(), _vm._v(" "), _vm._l(_vm.data[_vm.childrenProp], function (nodeData, index) {
    return [_c('tree-node', { key: nodeData[_vm.keyProp], ref: "childNodes", refInFor: true, attrs: { "data": nodeData, "keyProp": _vm.keyProp, "labelProp": _vm.labelProp, "childrenProp": _vm.childrenProp, "renameOnDblClick": _vm.renameOnDblClick, "draggable": _vm.draggable, "defaultIconClass": _vm.defaultIconClass, "defaultLabelClass": _vm.defaultLabelClass, "iconClassProp": _vm.iconClassProp, "labelClassProp": _vm.labelClassProp, "expandedProp": _vm.expandedProp, "showIcon": _vm.showIcon, "prependIconClass": _vm.prependIconClass, "prependLabelClass": _vm.prependLabelClass, "contextMenu": _vm.contextMenu, "nodeIconHtml": _vm.nodeIconHtml }, on: { "nodeSelect": _vm.childNodeSelect, "nodeDragStart": _vm.nodeDragStart, "deleteNode": _vm.deleteChildNode, "nodeToggle": _vm.nodeToggle } }), _vm._v(" "), !_vm.dropDisabled && _vm.draggedNode && _vm.draggedNode.data !== nodeData && (index + 1 >= _vm.data[_vm.childrenProp].length || _vm.draggedNode.data !== _vm.data[_vm.childrenProp][index + 1]) ? _c('drop-between-zone', { on: { "nodeDrop": function nodeDrop($event) {
          _vm.dropNodeAtPosition(index + 1);
        } } }) : _vm._e()];
  })], 2)]);
};
var __vue_staticRenderFns__$1 = [];

var __vue_template__$1 = typeof __vue_render__$1 !== 'undefined' ? { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 } : {};
/* style */
var __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-d59b554c_0", { source: "\n.tree-node-label{cursor:pointer;padding:2px 4px;border-radius:3px;-ms-user-select:none;user-select:none\n}\n.tree-node-label:hover{background-color:#ebecee\n}\n.tree-node-icon-container{display:inline-block\n}\n.tree-node-icon-container .tree-node-icon{color:#464646;transition:transform .3s\n}\n.tree-node{margin-left:16px\n}\n.tree-node.has-child-nodes{margin-left:0\n}\n.tree-node.has-child-nodes .tree-node-icon-container{cursor:pointer\n}\n.tree-node-expanded .tree-node-icon-container .tree-node-icon{transform:rotate(90deg);transition:transform .3s\n}\n.tree-node-children{margin-left:22px\n}\n.tree-branch{position:relative\n}\n.tree-branch.selected>.tree-node>.tree-node-label{background-color:#007bff;color:#fff\n}\n.tree-node.drop-active{border:1px dashed #d2d2d2\n}\n.tree-node-label .label-icon{font-size:90%\n}\n.tree-node>svg{display:inline-block;-ms-user-select:none;user-select:none\n}\n.tree-node .input-rename{display:inline-block;width:auto;font-weight:400;line-height:1;font-size:1rem;padding:2px 4px;height:auto;box-sizing:border-box\n}\n.tree-node svg>.svg-icon{fill:none;opacity:1;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\n}\n.tree-node.tree-node-expanded>svg>.svg-icon{fill:none\n}", map: undefined, media: undefined });
};
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* component normalizer */
function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__$1() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(_JSON$stringify(css.map)))) + ' */';
      }

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var TreeNode = __vue_normalize__$1(__vue_template__$1, __vue_inject_styles__$1, typeof __vue_script__$1 === 'undefined' ? {} : __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, typeof __vue_create_injector__$1 !== 'undefined' ? __vue_create_injector__$1 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

//

var script$2 = {
  components: {
    Contextmenu: Contextmenu,
    ContextmenuItem: ContextmenuItem
  },
  props: {
    contextMenuItems: {
      type: [Array, Object]
    }
  },
  data: function data() {
    return {
      activeNode: null
    };
  },

  computed: {
    ctxItemsForType: function ctxItemsForType() {
      if (this.activeNode === null) return [];
      var ctxIsArray = Array.isArray(this.contextMenuItems);
      var defaultMenu = this.contextMenuItems.default || this.contextMenuItems;
      var nodeType = this.activeNode.data.type;

      if (ctxIsArray) return defaultMenu;
      if (!nodeType) return defaultMenu;

      if (!this.contextMenuItems[nodeType]) return [];

      return this.contextMenuItems[nodeType];
    }
  },
  methods: {
    open: function open(_ref) {
      var event = _ref.event,
          node = _ref.node;

      this.activeNode = node;
      if (!this.ctxItemsForType || this.ctxItemsForType.length === 0) return;
      this.$refs.ctxMenu.show({
        top: event.clientY,
        left: event.clientX
      });
      EventBus.$emit('openNodeContextMenu', this);
    },
    menuItemSelected: function menuItemSelected(item) {
      EventBus.$emit('contextMenuItemSelect', item, this.activeNode);
    }
  },
  created: function created() {
    EventBus.$on('openNodeContextMenuInternal', this.open);
  }
};

var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('contextmenu', { ref: "ctxMenu", attrs: { "id": "context-menu" } }, _vm._l(_vm.ctxItemsForType, function (item) {
    return _c('contextmenu-item', { key: "vue-treeview-ctx-menu-" + item.label, staticClass: "ctx-item", on: { "click": function click($event) {
          _vm.menuItemSelected(item);
        } } }, [_vm._v(_vm._s(item.label))]);
  }), 1);
};
var __vue_staticRenderFns__$2 = [];

var __vue_template__$2 = typeof __vue_render__$2 !== 'undefined' ? { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 } : {};
/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* component normalizer */
function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */
function __vue_create_injector__$2() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(_JSON$stringify(css.map)))) + ' */';
      }

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var ContextMenu = __vue_normalize__$2(__vue_template__$2, __vue_inject_styles__$2, typeof __vue_script__$2 === 'undefined' ? {} : __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, typeof __vue_create_injector__$2 !== 'undefined' ? __vue_create_injector__$2 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var script$3 = {
    props: {
        data: {
            type: Array,
            required: true
        },
        allowMultiple: {
            type: Boolean,
            default: false
        },
        nodeKeyProp: {
            type: String,
            default: 'id'
        },
        nodeChildrenProp: {
            type: String,
            default: 'children'
        },
        nodeLabelProp: {
            type: String,
            default: 'name'
        },
        nodesDraggable: {
            type: Boolean,
            default: false
        },
        contextMenu: {
            type: Boolean,
            default: true
        },
        contextMenuItems: {
            type: [Array, Object],
            default: [{ code: 'DELETE_NODE', label: 'Delete node' }, { code: 'RENAME_NODE', label: 'Rename node' }]
        },
        renameNodeOnDblClick: {
            type: Boolean,
            default: true
        },
        // class added to every icon no matter what
        prependIconClass: {
            type: String,
            default: null
        },
        // class added to every label no matter what
        prependLabelClass: {
            type: String,
            default: null
        },
        // default icon if node icon is not specified
        defaultIconClass: {
            type: String,
            default: null
        },
        // default label class if node label is not specified
        defaultLabelClass: {
            type: String,
            default: null
        },
        // where to search for node icon
        iconClassProp: {
            type: String,
            default: "icon"
        },
        // where to search for node label class
        labelClassProp: {
            type: String,
            default: "labelClass"
        },
        // where to search for node expanded
        expandedProp: {
            type: String,
            default: "expanded"
        },
        // show icons
        showIcons: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            nodeIcon: '',
            draggedNode: null
        };
    },

    components: {
        TreeNode: TreeNode,
        DropBetweenZone: DropBetweenZone,
        ContextMenu: ContextMenu
    },
    methods: {
        nodeToggle: function nodeToggle(data) {
            this.$emit('nodeToggle', data);
        },
        createNodeMap: function createNodeMap() {
            if (this.nodeMap === undefined) {
                var nodeMap = this.nodeMap = new _Map();

                var nodes = this.$refs.rootNodes.slice();

                for (var i = 0; i < nodes.length; i++) {
                    var tmpNode = nodes[i];
                    nodes.push.apply(nodes, _toConsumableArray(tmpNode.getChildNodes()));
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _getIterator(nodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _tmpNode = _step.value;

                        nodeMap.set(_tmpNode.data[this.nodeKeyProp], _tmpNode); // TODO: change to getter
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        getNodeByKey: function getNodeByKey(key) {
            return this.nodeMap.get(key);
        },

        // event bubbles up to the roots
        nodeSelect: function nodeSelect(node, isSelected) {
            this.$emit('nodeSelect', node, isSelected);
            if (isSelected) {
                if (this.selectedNode !== null) {
                    this.selectedNode.deselect();
                }
                this.selectedNode = node;
            } else if (node === this.selectedNode) {
                this.selectedNode = null;
            }
        },
        nodeDragStart: function nodeDragStart() {
            EventBus.$on('dropOK', this.cutNode);
        },
        cutNode: function cutNode() {
            EventBus.$off('dropOK');
            var idx = this.data.indexOf(window._bTreeView.draggedNodeData);
            this.data.splice(idx, 1);
            // let's notify that node data was successfully cut (removed from array)
            EventBus.$emit('cutOK');
        },
        draggingStarted: function draggingStarted(draggedNode) {
            this.draggedNode = draggedNode;
            // let's listen for the drag end event
            EventBus.$on('nodeDragEnd', this.draggingEnded);
        },
        draggingEnded: function draggingEnded() {
            // stop listening for the dragging end event
            EventBus.$off('nodeDragEnd', this.draggingEnded);
            this.draggedNode = null;
        },
        dropNodeAtPosition: function dropNodeAtPosition(pos) {
            var _this = this;

            // position can change if we move node within the same parent node (same level)
            // so it's better to remember node at previous position
            var insertAfter = pos - 1 < 0 ? null : this.data[pos - 1];
            EventBus.$on('cutOK', function () {
                var pos = _this.data.indexOf(insertAfter) + 1;
                _this.data.splice(pos, 0, window._bTreeView.draggedNodeData);
                delete window._bTreeView.draggedNodeKey;
                delete window._bTreeView.draggedNodeData;
                EventBus.$off('cutOK');
            });
            EventBus.$emit('dropOK');
        },
        deleteNode: function deleteNode(nodeData) {
            var nodes = this.data;
            var idx = nodes.indexOf(nodeData);
            nodes.splice(idx, 1);
        },
        menuItemSelected: function menuItemSelected(item, node) {
            switch (item.code) {
                case 'DELETE_NODE':
                    node.delete();
                case 'RENAME_NODE':
                    node.startRenaming();
                default:
                    this.$emit('contextMenuItemSelect', item, node);
            }
        }
    },
    created: function created() {
        var _this2 = this;

        this.selectedNode = null;
        EventBus.$on('nodeDragStart', this.draggingStarted);
        EventBus.$on('contextMenuItemSelect', this.menuItemSelected);
        this.$nextTick(function () {
            _this2.createNodeMap();
        });
    },
    mounted: function mounted() {
        var iconRef = this.$refs.nodeIcon;
        var element = iconRef.$el || iconRef;
        this.nodeIcon = element.innerHTML;
    }
};

var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tree-view" }, [_vm.contextMenu ? _c('context-menu', { attrs: { "contextMenuItems": _vm.contextMenuItems } }) : _vm._e(), _vm._v(" "), _vm.draggedNode !== null && _vm.draggedNode.data !== _vm.data[0] ? _c('drop-between-zone', { on: { "nodeDrop": function nodeDrop($event) {
        _vm.dropNodeAtPosition(0);
      } } }) : _vm._e(), _vm._v(" "), _vm._l(_vm.data, function (nodeData, index) {
    return [_c('tree-node', { key: nodeData[_vm.nodeKeyProp], ref: "rootNodes", refInFor: true, attrs: { "keyProp": _vm.nodeKeyProp, "renameOnDblClick": _vm.renameNodeOnDblClick, "childrenProp": _vm.nodeChildrenProp, "labelProp": _vm.nodeLabelProp, "data": nodeData, "draggable": _vm.nodesDraggable, "defaultIconClass": _vm.defaultIconClass, "defaultLabelClass": _vm.defaultLabelClass, "iconClassProp": _vm.iconClassProp, "labelClassProp": _vm.labelClassProp, "expandedProp": _vm.expandedProp, "showIcon": _vm.showIcons, "prependIconClass": _vm.prependIconClass, "prependLabelClass": _vm.prependLabelClass, "contextMenu": _vm.contextMenu, "nodeIconHtml": _vm.nodeIcon }, on: { "nodeSelect": _vm.nodeSelect, "nodeDragStart": _vm.nodeDragStart, "deleteNode": _vm.deleteNode, "nodeToggle": _vm.nodeToggle } }), _vm._v(" "), _vm.draggedNode !== null && _vm.draggedNode.data !== nodeData && (index + 1 >= _vm.data.length || _vm.draggedNode.data !== _vm.data[index + 1]) ? _c('drop-between-zone', { on: { "nodeDrop": function nodeDrop($event) {
          _vm.dropNodeAtPosition(index + 1);
        } } }) : _vm._e()];
  }), _vm._v(" "), _c('div', { ref: "nodeIcon", staticClass: "d-none" }, [_vm._t("node-icon")], 2)], 2);
};
var __vue_staticRenderFns__$3 = [];

var __vue_template__$3 = typeof __vue_render__$3 !== 'undefined' ? { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 } : {};
/* style */
var __vue_inject_styles__$3 = function (inject) {
  if (!inject) return;
  inject("data-v-60457102_0", { source: "\n.tree-view{text-align:left\n}", map: undefined, media: undefined });
};
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* component normalizer */
function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = script || {};

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__$3() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
        // http://stackoverflow.com/a/26603875
        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(_JSON$stringify(css.map)))) + ' */';
      }

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var bTreeView = __vue_normalize__$3(__vue_template__$3, __vue_inject_styles__$3, typeof __vue_script__$3 === 'undefined' ? {} : __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, typeof __vue_create_injector__$3 !== 'undefined' ? __vue_create_injector__$3 : function () {}, typeof __vue_create_injector_ssr__ !== 'undefined' ? __vue_create_injector_ssr__ : function () {});

var VuePlugin = {
	install: function install(Vue) {
		Vue.component('BTreeView', bTreeView);
	}
};

export default VuePlugin;
export { bTreeView };
//# sourceMappingURL=bootstrap-vue-treeview.esm.js.map
