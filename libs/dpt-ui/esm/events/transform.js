/**
 * DevExtreme (esm/events/transform.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    sign as mathSign,
    fitIntoRange
} from "../core/utils/math";
import * as iteratorUtils from "../core/utils/iterator";
import {
    hasTouches
} from "./utils/index";
import Emitter from "./core/emitter";
import registerEmitter from "./core/emitter_registrator";
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
    const sign = mathSign(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
    const angle = Math.acos(fitIntoRange(scalarProduct / distanceProduct, -1, 1));
    return sign * angle
};
const getTranslation = function(firstVector, secondVector) {
    return {
        x: firstVector.centerX - secondVector.centerX,
        y: firstVector.centerY - secondVector.centerY
    }
};
const TransformEmitter = Emitter.inherit({
    validatePointers: function(e) {
        return hasTouches(e) > 1
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
registerEmitter({
    emitter: TransformEmitter,
    events: eventNames
});
const exportNames = {};
iteratorUtils.each(eventNames, (function(_, eventName) {
    exportNames[eventName.substring(2)] = eventName
}));
export const {
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
