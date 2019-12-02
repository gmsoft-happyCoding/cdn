(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.DvaModelCreator = {}));
}(this, function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function warning(condition, message) {
  {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

function isType(action, actionCreator) {
    return action.type === actionCreator.type;
}
function actionCreatorFactory(prefix, defaultIsError) {
    if (defaultIsError === void 0) { defaultIsError = function (p) { return p instanceof Error; }; }
    var actionTypes = {};
    var base = prefix ? prefix + "/" : '';
    function actionCreator(type, commonMeta, isError) {
        if (isError === void 0) { isError = defaultIsError; }
        var fullType = base + type;
        {
            if (actionTypes[fullType])
                throw new Error("Duplicate action type: " + fullType);
            actionTypes[fullType] = true;
        }
        return Object.assign(function (payload, meta) {
            var action = {
                type: fullType,
                payload: payload,
            };
            if (commonMeta || meta) {
                action.meta = Object.assign({}, commonMeta, meta);
            }
            if (isError && (typeof isError === 'boolean' || isError(payload))) {
                action.error = true;
            }
            return action;
        }, {
            type: fullType,
            toString: function () { return fullType; },
            originType: type,
            match: function (action) { return action.type === fullType; },
        });
    }
    function asyncActionCreators(type, commonMeta) {
        return {
            type: base + type,
            started: actionCreator(type + "_STARTED", commonMeta, false),
            done: actionCreator(type + "_DONE", commonMeta, false),
            failed: actionCreator(type + "_FAILED", commonMeta, true),
        };
    }
    function pollActionCreators(type, commonMeta) {
        return {
            type: base + type,
            originType: type,
            start: actionCreator(type + "-start", commonMeta, false),
            stop: actionCreator(type + "-stop", commonMeta, false),
        };
    }
    return Object.assign(actionCreator, { async: asyncActionCreators, poll: pollActionCreators });
}
function removeActionNamespace(action) {
    var finalType = action.type;
    if (finalType.includes('/')) {
        finalType = finalType.split('/')[1];
    }
    action.type = finalType;
    return action;
}

var DvaModelBuilder = (function () {
    function DvaModelBuilder(initState, namespace) {
        var _this = this;
        this.immer = function (actionCreator, handler) {
            _this.checkType(actionCreator.type);
            _this.model.reducers[actionCreator.originType] = function (state, action) {
                return handler(state, action.payload);
            };
            return _this;
        };
        this.immerWithAction = function (actionCreator, handler) {
            _this.checkType(actionCreator.type);
            _this.model.reducers[actionCreator.originType] = handler;
            return _this;
        };
        this.case = function (actionCreator, handler) {
            _this.checkType(actionCreator.type);
            _this.model.reducers[actionCreator.originType] = function (state, action) {
                return handler(state, action.payload);
            };
            return _this;
        };
        this.caseWithAction = function (actionCreator, handler) {
            _this.checkType(actionCreator.type);
            _this.model.reducers[actionCreator.originType] = handler;
            return _this;
        };
        this.takeEvery = function (actionCreator, handler) {
            return _this.setEffects(actionCreator, function (_a, effects) {
                var payload = _a.payload;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, handler(payload, effects)];
                        case 1: return [2, _b.sent()];
                    }
                });
            });
        };
        this.takeEveryWithAction = function (actionCreator, handler) {
            return _this.setEffects(actionCreator, handler);
        };
        this.takeLatest = function (actionCreator, handler) {
            return _this.setEffects(actionCreator, [
                function (_a, effects) {
                    var payload = _a.payload;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, handler(payload, effects)];
                            case 1: return [2, _b.sent()];
                        }
                    });
                },
                { type: 'takeLatest' },
            ]);
        };
        this.takeLatestWithAction = function (actionCreator, handler) {
            return _this.setEffects(actionCreator, [handler, { type: 'takeLatest' }]);
        };
        this.throttle = function (actionCreator, handler, ms) {
            return _this.setEffects(actionCreator, [
                function (_a, effects) {
                    var payload = _a.payload;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, handler(payload, effects)];
                            case 1: return [2, _b.sent()];
                        }
                    });
                },
                { type: 'throttle', ms: ms },
            ]);
        };
        this.throttleWithAction = function (actionCreator, handler, ms) {
            return _this.setEffects(actionCreator, [handler, { type: 'throttle', ms: ms }]);
        };
        this.watcher = function (actionCreator, handler) {
            return _this.setEffects(actionCreator, [handler, { type: 'watcher' }]);
        };
        this.poll = function (pollActionCreator, handler, delay) {
            return _this.setEffectsWithPollActionCreator(pollActionCreator, [
                function (_a, effects) {
                    var payload = _a.payload;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4, handler(payload, effects)];
                            case 1: return [2, _b.sent()];
                        }
                    });
                },
                { type: 'poll', delay: delay },
            ]);
        };
        this.subscript = function (func) {
            var funcName = func.name;
            warning(!!funcName, "some subscriptions in model " + _this.model.namespace + " don't have name");
            warning(!_this.model.subscriptions[funcName], "duplicate  subscript function name " + funcName);
            _this.model.subscriptions[funcName] = func;
            return _this;
        };
        this.build = function () {
            return _this.model;
        };
        this.setEffects = function (actionCreator, data) {
            _this.checkType(actionCreator.type);
            _this.model.effects[actionCreator.originType] = data;
            return _this;
        };
        this.setEffectsWithPollActionCreator = function (pollActionCreator, data) {
            _this.checkType(pollActionCreator.type);
            _this.model.effects[pollActionCreator.originType] = data;
            return _this;
        };
        this.model = {
            state: initState,
            namespace: namespace,
            effects: {},
            reducers: {},
            subscriptions: {},
        };
    }
    DvaModelBuilder.prototype.checkType = function (type) {
        var namespace = this.model.namespace;
        if (namespace) {
            var action = type.split('/');
            warning(action.length === 2, "action " + type + " in model \"" + namespace + "\" should have namespace");
            if (action.length === 2) {
                warning(action[0] === namespace, "action \"" + type + "\" can't be effects or reducers in model \"" + namespace + "\"");
            }
        }
    };
    return DvaModelBuilder;
}());

exports.DvaModelBuilder = DvaModelBuilder;
exports.actionCreatorFactory = actionCreatorFactory;
exports.isType = isType;
exports.removeActionNamespace = removeActionNamespace;

Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dva-model-creator.js.map
