/**
 * DevExtreme (cjs/events/transform.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.zoomstart = exports.zoomend = exports.zoom = exports.translatestart = exports.translateend = exports.translate = exports.transformstart = exports.transformend = exports.transform = exports.rotatestart = exports.rotateend = exports.rotate = exports.pinchstart = exports.pinchend = exports.pinch = void 0;
var _math = require("../core/utils/math");
var iteratorUtils = _interopRequireWildcard(require("../core/utils/iterator"));
var _index = require("./utils/index");
var _emitter = _interopRequireDefault(require("./core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) {
        return null
    }
    var r = new WeakMap,
        t = new WeakMap;
    return (_getRequireWildcardCache = function(e) {
        return e ? t : r
    })(e)
}

function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) {
        return e
    }
    if (null === e || "object" != typeof e && "function" != typeof e) {
        return {
            default: e
        }
    }
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) {
        return t.get(e)
    }
    var n = {
            __proto__: null
        },
        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) {
        if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
            var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]
        }
    }
    return n.default = e, t && t.set(e, n), n
}
const DX_PREFIX = "dx";
const TRANSFORM = "transform";
const TRANSLATE = "translate";
const PINCH = "pinch";
const ROTATE = "rotate";
const START_POSTFIX = "start";
const UPDATE_POSTFIX = "";
const END_POSTFIX = "end";
const eventAliases = [];
const addAlias = function(eventName, eventArgs) {
    eventAliases.push({
        name: eventName,
        args: eventArgs
    })
};
addAlias(TRANSFORM, {
    scale: true,
    deltaScale: true,
    rotation: true,
    deltaRotation: true,
    translation: true,
    deltaTranslation: true
});
addAlias(TRANSLATE, {
    translation: true,
    deltaTranslation: true
});
addAlias(PINCH, {
    scale: true,
    deltaScale: true
});
addAlias(ROTATE, {
    rotation: true,
    deltaRotation: true
});
const getVector = function(first, second) {
    return {
        x: second.pageX - first.pageX,
        y: -second.pageY + first.pageY,
        centerX: .5 * (second.pageX + first.pageX),
        centerY: .5 * (second.pageY + first.pageY)
    }
};
const getEventVector = function(e) {
    const pointers = e.pointers;
    return getVector(pointers[0], pointers[1])
};
const getDistance = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
};
const getScale = function(firstVector, secondVector) {
    return getDistance(firstVector) / getDistance(secondVector)
};
const getRotation = function(firstVector, secondVector) {
    const scalarProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
    const distanceProduct = getDistance(firstVector) * getDistance(secondVector);
    if (0 === distanceProduct) {
        return 0
    }
    const sign = (0, _math.sign)(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
    const angle = Math.acos((0, _math.fitIntoRange)(scalarProduct / distanceProduct, -1, 1));
    return sign * angle
};
const getTranslation = function(firstVector, secondVector) {
    return {
        x: firstVector.centerX - secondVector.centerX,
        y: firstVector.centerY - secondVector.centerY
    }
};
const TransformEmitter = _emitter.default.inherit({
    validatePointers: function(e) {
        return (0, _index.hasTouches)(e) > 1
    },
    start: function(e) {
        this._accept(e);
        const startVector = getEventVector(e);
        this._startVector = startVector;
        this._prevVector = startVector;
        this._fireEventAliases(START_POSTFIX, e)
    },
    move: function(e) {
        const currentVector = getEventVector(e);
        const eventArgs = this._getEventArgs(currentVector);
        this._fireEventAliases(UPDATE_POSTFIX, e, eventArgs);
        this._prevVector = currentVector
    },
    end: function(e) {
        const eventArgs = this._getEventArgs(this._prevVector);
        this._fireEventAliases(END_POSTFIX, e, eventArgs)
    },
    _getEventArgs: function(vector) {
        return {
            scale: getScale(vector, this._startVector),
            deltaScale: getScale(vector, this._prevVector),
            rotation: getRotation(vector, this._startVector),
            deltaRotation: getRotation(vector, this._prevVector),
            translation: getTranslation(vector, this._startVector),
            deltaTranslation: getTranslation(vector, this._prevVector)
        }
    },
    _fireEventAliases: function(eventPostfix, originalEvent, eventArgs) {
        eventArgs = eventArgs || {};
        iteratorUtils.each(eventAliases, function(_, eventAlias) {
            const args = {};
            iteratorUtils.each(eventAlias.args, (function(name) {
                if (name in eventArgs) {
                    args[name] = eventArgs[name]
                }
            }));
            this._fireEvent("dx" + eventAlias.name + eventPostfix, originalEvent, args)
        }.bind(this))
    }
});
const eventNames = eventAliases.reduce(((result, eventAlias) => {
    [START_POSTFIX, UPDATE_POSTFIX, END_POSTFIX].forEach((eventPostfix => {
        result.push("dx" + eventAlias.name + eventPostfix)
    }));
    return result
}), []);
(0, _emitter_registrator.default)({
    emitter: TransformEmitter,
    events: eventNames
});
const exportNames = {};
iteratorUtils.each(eventNames, (function(_, eventName) {
    exportNames[eventName.substring(2)] = eventName
}));
const {
    transformstart: transformstart,
    transform: transform,
    transformend: transformend,
    translatestart: translatestart,
    translate: translate,
    translateend: translateend,
    zoomstart: zoomstart,
    zoom: zoom,
    zoomend: zoomend,
    pinchstart: pinchstart,
    pinch: pinch,
    pinchend: pinchend,
    rotatestart: rotatestart,
    rotate: rotate,
    rotateend: rotateend
} = exportNames;
exports.rotateend = rotateend;
exports.rotate = rotate;
exports.rotatestart = rotatestart;
exports.pinchend = pinchend;
exports.pinch = pinch;
exports.pinchstart = pinchstart;
exports.zoomend = zoomend;
exports.zoom = zoom;
exports.zoomstart = zoomstart;
exports.translateend = translateend;
exports.translate = translate;
exports.translatestart = translatestart;
exports.transformend = transformend;
exports.transform = transform;
exports.transformstart = transformstart;
