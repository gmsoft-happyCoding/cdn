/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */

/******/
(() => {
  // webpackBootstrap

  /******/
  "use strict";
  /******/

  var __webpack_modules__ = {
    /***/
    "./esm/deserialize.js":
    /*!****************************!*\
      !*** ./esm/deserialize.js ***!
      \****************************/

    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.deserialize = undefined;\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _types = __webpack_require__(/*! ./types.js */ \"./esm/types.js\");\n\nvar env = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' ? self : globalThis;\n\nvar deserializer = function deserializer($, _) {\n  var as = function as(out, index) {\n    $.set(index, out);\n    return out;\n  };\n\n  var unpair = function unpair(index) {\n    if ($.has(index)) return $.get(index);\n\n    var _$index = _slicedToArray(_[index], 2),\n        type = _$index[0],\n        value = _$index[1];\n\n    switch (type) {\n      case _types.PRIMITIVE:\n      case _types.VOID:\n        return as(value, index);\n      case _types.ARRAY:\n        {\n          var arr = as([], index);\n          var _iteratorNormalCompletion = true;\n          var _didIteratorError = false;\n          var _iteratorError = undefined;\n\n          try {\n            for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n              var _index = _step.value;\n\n              arr.push(unpair(_index));\n            }\n          } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n              }\n            } finally {\n              if (_didIteratorError) {\n                throw _iteratorError;\n              }\n            }\n          }\n\n          return arr;\n        }\n      case _types.OBJECT:\n        {\n          var object = as({}, index);\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var _step2$value = _slicedToArray(_step2.value, 2),\n                  key = _step2$value[0],\n                  _index2 = _step2$value[1];\n\n              object[unpair(key)] = unpair(_index2);\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n\n          return object;\n        }\n      case _types.DATE:\n        return as(new Date(value), index);\n      case _types.REGEXP:\n        {\n          var source = value.source,\n              flags = value.flags;\n\n          return as(new RegExp(source, flags), index);\n        }\n      case _types.MAP:\n        {\n          var map = as(new Map(), index);\n          var _iteratorNormalCompletion3 = true;\n          var _didIteratorError3 = false;\n          var _iteratorError3 = undefined;\n\n          try {\n            for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n              var _step3$value = _slicedToArray(_step3.value, 2),\n                  key = _step3$value[0],\n                  _index3 = _step3$value[1];\n\n              map.set(unpair(key), unpair(_index3));\n            }\n          } catch (err) {\n            _didIteratorError3 = true;\n            _iteratorError3 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion3 && _iterator3.return) {\n                _iterator3.return();\n              }\n            } finally {\n              if (_didIteratorError3) {\n                throw _iteratorError3;\n              }\n            }\n          }\n\n          return map;\n        }\n      case _types.SET:\n        {\n          var set = as(new Set(), index);\n          var _iteratorNormalCompletion4 = true;\n          var _didIteratorError4 = false;\n          var _iteratorError4 = undefined;\n\n          try {\n            for (var _iterator4 = value[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n              var _index4 = _step4.value;\n\n              set.add(unpair(_index4));\n            }\n          } catch (err) {\n            _didIteratorError4 = true;\n            _iteratorError4 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion4 && _iterator4.return) {\n                _iterator4.return();\n              }\n            } finally {\n              if (_didIteratorError4) {\n                throw _iteratorError4;\n              }\n            }\n          }\n\n          return set;\n        }\n      case _types.ERROR:\n        {\n          var name = value.name,\n              message = value.message;\n\n          return as(new env[name](message), index);\n        }\n      case _types.BIGINT:\n        return as(BigInt(value), index);\n      case 'BigInt':\n        return as(Object(BigInt(value)), index);\n    }\n    return as(new env[type](value), index);\n  };\n\n  return unpair;\n};\n\n/**\n * @typedef {Array<string,any>} Record a type representation\n */\n\n/**\n * Returns a deserialized value from a serialized array of Records.\n * @param {Record[]} serialized a previously serialized value.\n * @returns {any}\n */\nvar deserialize = exports.deserialize = function deserialize(serialized) {\n  return deserializer(new Map(), serialized)(0);\n};\n\n//# sourceURL=webpack://test/./esm/deserialize.js?");
      /***/
    },

    /***/
    "./esm/index.js":
    /*!**********************!*\
      !*** ./esm/index.js ***!
      \**********************/

    /***/
    (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      eval("\n\nvar _deserialize = __webpack_require__(/*! ./deserialize.js */ \"./esm/deserialize.js\");\n\nvar _serialize = __webpack_require__(/*! ./serialize.js */ \"./esm/serialize.js\");\n\nif (window.structuredClone == undefined) {\n  window.structuredClone = function (any, options) {\n    return (0, _deserialize.deserialize)((0, _serialize.serialize)(any, options));\n  };\n}\n\n//# sourceURL=webpack://test/./esm/index.js?");
      /***/
    },

    /***/
    "./esm/serialize.js":
    /*!**************************!*\
      !*** ./esm/serialize.js ***!
      \**************************/

    /***/
    (__unused_webpack_module, exports, __webpack_require__) => {
      eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.serialize = undefined;\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _types = __webpack_require__(/*! ./types.js */ \"./esm/types.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar EMPTY = '';\n\nvar _ref = {},\n    toString = _ref.toString;\nvar keys = Object.keys;\n\n\nvar typeOf = function typeOf(value) {\n  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);\n  if (type !== 'object' || !value) return [_types.PRIMITIVE, type];\n\n  var asString = toString.call(value).slice(8, -1);\n  switch (asString) {\n    case 'Array':\n      return [_types.ARRAY, EMPTY];\n    case 'Object':\n      return [_types.OBJECT, EMPTY];\n    case 'Date':\n      return [_types.DATE, EMPTY];\n    case 'RegExp':\n      return [_types.REGEXP, EMPTY];\n    case 'Map':\n      return [_types.MAP, EMPTY];\n    case 'Set':\n      return [_types.SET, EMPTY];\n  }\n\n  if (asString.includes('Array')) return [_types.ARRAY, asString];\n\n  if (asString.includes('Error')) return [_types.ERROR, asString];\n\n  return [_types.OBJECT, asString];\n};\n\nvar shouldSkip = function shouldSkip(_ref2) {\n  var _ref3 = _slicedToArray(_ref2, 2),\n      TYPE = _ref3[0],\n      type = _ref3[1];\n\n  return TYPE === _types.PRIMITIVE && (type === 'function' || type === 'symbol');\n};\n\nvar serializer = function serializer(strict, json, $, _) {\n\n  var as = function as(out, value) {\n    var index = _.push(out) - 1;\n    $.set(value, index);\n    return index;\n  };\n\n  var pair = function pair(value) {\n    if ($.has(value)) return $.get(value);\n\n    var _typeOf = typeOf(value),\n        _typeOf2 = _slicedToArray(_typeOf, 2),\n        TYPE = _typeOf2[0],\n        type = _typeOf2[1];\n\n    switch (TYPE) {\n      case _types.PRIMITIVE:\n        {\n          var entry = value;\n          switch (type) {\n            case 'bigint':\n              TYPE = _types.BIGINT;\n              entry = value.toString();\n              break;\n            case 'function':\n            case 'symbol':\n              if (strict) throw new TypeError('unable to serialize ' + type);\n              entry = null;\n              break;\n            case 'undefined':\n              return as([_types.VOID], value);\n          }\n          return as([TYPE, entry], value);\n        }\n      case _types.ARRAY:\n        {\n          if (type) return as([type, [].concat(_toConsumableArray(value))], value);\n\n          var arr = [];\n          var index = as([TYPE, arr], value);\n          var _iteratorNormalCompletion = true;\n          var _didIteratorError = false;\n          var _iteratorError = undefined;\n\n          try {\n            for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n              var _entry = _step.value;\n\n              arr.push(pair(_entry));\n            }\n          } catch (err) {\n            _didIteratorError = true;\n            _iteratorError = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion && _iterator.return) {\n                _iterator.return();\n              }\n            } finally {\n              if (_didIteratorError) {\n                throw _iteratorError;\n              }\n            }\n          }\n\n          return index;\n        }\n      case _types.OBJECT:\n        {\n          if (type) {\n            switch (type) {\n              case 'BigInt':\n                return as([type, value.toString()], value);\n              case 'Boolean':\n              case 'Number':\n              case 'String':\n                return as([type, value.valueOf()], value);\n            }\n          }\n\n          if (json && 'toJSON' in value) return pair(value.toJSON());\n\n          var entries = [];\n          var _index = as([TYPE, entries], value);\n          var _iteratorNormalCompletion2 = true;\n          var _didIteratorError2 = false;\n          var _iteratorError2 = undefined;\n\n          try {\n            for (var _iterator2 = keys(value)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n              var key = _step2.value;\n\n              if (strict || !shouldSkip(typeOf(value[key]))) entries.push([pair(key), pair(value[key])]);\n            }\n          } catch (err) {\n            _didIteratorError2 = true;\n            _iteratorError2 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion2 && _iterator2.return) {\n                _iterator2.return();\n              }\n            } finally {\n              if (_didIteratorError2) {\n                throw _iteratorError2;\n              }\n            }\n          }\n\n          return _index;\n        }\n      case _types.DATE:\n        return as([TYPE, value.toISOString()], value);\n      case _types.REGEXP:\n        {\n          var source = value.source,\n              flags = value.flags;\n\n          return as([TYPE, { source: source, flags: flags }], value);\n        }\n      case _types.MAP:\n        {\n          var _entries = [];\n          var _index2 = as([TYPE, _entries], value);\n          var _iteratorNormalCompletion3 = true;\n          var _didIteratorError3 = false;\n          var _iteratorError3 = undefined;\n\n          try {\n            for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n              var _step3$value = _slicedToArray(_step3.value, 2),\n                  _key = _step3$value[0],\n                  _entry2 = _step3$value[1];\n\n              if (strict || !(shouldSkip(typeOf(_key)) || shouldSkip(typeOf(_entry2)))) _entries.push([pair(_key), pair(_entry2)]);\n            }\n          } catch (err) {\n            _didIteratorError3 = true;\n            _iteratorError3 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion3 && _iterator3.return) {\n                _iterator3.return();\n              }\n            } finally {\n              if (_didIteratorError3) {\n                throw _iteratorError3;\n              }\n            }\n          }\n\n          return _index2;\n        }\n      case _types.SET:\n        {\n          var _entries2 = [];\n          var _index3 = as([TYPE, _entries2], value);\n          var _iteratorNormalCompletion4 = true;\n          var _didIteratorError4 = false;\n          var _iteratorError4 = undefined;\n\n          try {\n            for (var _iterator4 = value[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n              var _entry3 = _step4.value;\n\n              if (strict || !shouldSkip(typeOf(_entry3))) _entries2.push(pair(_entry3));\n            }\n          } catch (err) {\n            _didIteratorError4 = true;\n            _iteratorError4 = err;\n          } finally {\n            try {\n              if (!_iteratorNormalCompletion4 && _iterator4.return) {\n                _iterator4.return();\n              }\n            } finally {\n              if (_didIteratorError4) {\n                throw _iteratorError4;\n              }\n            }\n          }\n\n          return _index3;\n        }\n    }\n\n    var message = value.message;\n\n    return as([TYPE, { name: type, message: message }], value);\n  };\n\n  return pair;\n};\n\n/**\n * @typedef {Array<string,any>} Record a type representation\n */\n\n/**\n * Returns an array of serialized Records.\n * @param {any} value a serializable value.\n * @param {{lossy?: boolean}?} options an object with a `lossy` property that,\n *  if `true`, will not throw errors on incompatible types, and behave more\n *  like JSON stringify would behave. Symbol and Function will be discarded.\n * @returns {Record[]}\n */\nvar serialize = exports.serialize = function serialize(value) {\n  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      json = _ref4.json,\n      lossy = _ref4.lossy;\n\n  var _ = [];\n  return serializer(!(json || lossy), !!json, new Map(), _)(value), _;\n};\n\n//# sourceURL=webpack://test/./esm/serialize.js?");
      /***/
    },

    /***/
    "./esm/types.js":
    /*!**********************!*\
      !*** ./esm/types.js ***!
      \**********************/

    /***/
    (__unused_webpack_module, exports) => {
      eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nvar VOID = exports.VOID = -1;\nvar PRIMITIVE = exports.PRIMITIVE = 0;\nvar ARRAY = exports.ARRAY = 1;\nvar OBJECT = exports.OBJECT = 2;\nvar DATE = exports.DATE = 3;\nvar REGEXP = exports.REGEXP = 4;\nvar MAP = exports.MAP = 5;\nvar SET = exports.SET = 6;\nvar ERROR = exports.ERROR = 7;\nvar BIGINT = exports.BIGINT = 8;\n// export const SYMBOL = 9;\n\n//# sourceURL=webpack://test/./esm/types.js?");
      /***/
    }
    /******/

  };
  /************************************************************************/

  /******/
  // The module cache

  /******/

  var __webpack_module_cache__ = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/

    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed

      /******/
      // no module.loaded needed

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/

    /******/
    // Return the exports of the module

    /******/


    return module.exports;
    /******/
  }
  /******/

  /************************************************************************/

  /******/

  /******/
  // startup

  /******/
  // Load entry module and return exports

  /******/
  // This entry module can't be inlined because the eval devtool is used.

  /******/


  var __webpack_exports__ = __webpack_require__("./esm/index.js");
  /******/

  /******/

})();