/**
 * DevExtreme (cjs/viz/core/renderers/animation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.AnimationController = AnimationController;
exports.easingFunctions = exports.animationSvgStep = void 0;
var _frame = require("../../../animation/frame");
const noop = function() {};
const easingFunctions = exports.easingFunctions = {
    easeOutCubic: function(pos, start, end) {
        return 1 === pos ? end : (1 - Math.pow(1 - pos, 3)) * (end - start) + +start
    },
    linear: function(pos, start, end) {
        return 1 === pos ? end : pos * (end - start) + +start
    }
};
const animationSvgStep = exports.animationSvgStep = {
    segments: function(elem, params, progress, easing, currentParams) {
        const from = params.from;
        const to = params.to;
        let curSeg;
        let seg;
        let i;
        let j;
        const segments = [];
        for (i = 0; i < from.length; i++) {
            curSeg = from[i];
            seg = [curSeg[0]];
            if (curSeg.length > 1) {
                for (j = 1; j < curSeg.length; j++) {
                    seg.push(easing(progress, curSeg[j], to[i][j]))
                }
            }
            segments.push(seg)
        }
        currentParams.segments = params.end && 1 === progress ? params.end : segments;
        elem.attr({
            segments: segments
        })
    },
    arc: function(elem, params, progress, easing) {
        const from = params.from;
        const to = params.to;
        const current = {};
        for (const i in from) {
            current[i] = easing(progress, from[i], to[i])
        }
        elem.attr(current)
    },
    transform: function(elem, params, progress, easing, currentParams) {
        const from = params.from;
        const to = params.to;
        const current = {};
        for (const i in from) {
            current[i] = currentParams[i] = easing(progress, from[i], to[i])
        }
        elem.attr(current)
    },
    base: function(elem, params, progress, easing, currentParams, attributeName) {
        const obj = {};
        obj[attributeName] = currentParams[attributeName] = easing(progress, params.from, params.to);
        elem.attr(obj)
    },
    _: noop,
    complete: function(element, currentSettings) {
        element.attr(currentSettings)
    }
};

function step(now) {
    const that = this;
    const animateStep = that._animateStep;
    let attrName;
    that._progress = that._calcProgress(now);
    for (attrName in that.params) {
        const anim = animateStep[attrName] || animateStep.base;
        anim(that.element, that.params[attrName], that._progress, that._easing, that._currentParams, attrName)
    }
    that.options.step && that.options.step(that._easing(that._progress, 0, 1), that._progress);
    if (1 === that._progress) {
        return that.stop()
    }
    return true
}

function delayTick(now) {
    if (now - this._startTime >= this.delay) {
        this.tick = step
    }
    return true
}

function start(now) {
    this._startTime = now;
    this.tick = this.delay ? delayTick : step;
    return true
}

function Animation(element, params, options) {
    this._progress = 0;
    this.element = element;
    this.params = params;
    this.options = options;
    this.duration = options.partitionDuration ? options.duration * options.partitionDuration : options.duration;
    this.delay = options.delay && options.duration * options.delay || 0;
    this._animateStep = options.animateStep || animationSvgStep;
    this._easing = easingFunctions[options.easing] || easingFunctions.easeOutCubic;
    this._currentParams = {};
    this.tick = start
}
Animation.prototype = {
    _calcProgress: function(now) {
        return Math.min(1, (now - this.delay - this._startTime) / this.duration)
    },
    stop: function(disableComplete) {
        const options = this.options;
        const animateStep = this._animateStep;
        this.stop = this.tick = noop;
        animateStep.complete && animateStep.complete(this.element, this._currentParams);
        options.complete && !disableComplete && options.complete()
    }
};

function AnimationController(element) {
    this._animationCount = 0;
    this._timerId = null;
    this._animations = {};
    this.element = element
}
AnimationController.prototype = {
    _loop: function() {
        const that = this;
        const animations = that._animations;
        let activeAnimation = 0;
        const now = (new Date).getTime();
        let an;
        const endAnimation = that._endAnimation;
        for (an in animations) {
            if (!animations[an].tick(now)) {
                delete animations[an]
            }
            activeAnimation++
        }
        if (0 === activeAnimation) {
            that.stop();
            that._endAnimationTimer = endAnimation && setTimeout((function() {
                if (0 === that._animationCount) {
                    endAnimation();
                    that._endAnimation = null
                }
            }));
            return
        }
        that._timerId = _frame.requestAnimationFrame.call(null, (function() {
            that._loop()
        }), that.element)
    },
    addAnimation: function(animation) {
        const that = this;
        that._animations[that._animationCount++] = animation;
        clearTimeout(that._endAnimationTimer);
        if (!that._timerId) {
            clearTimeout(that._startDelay);
            that._startDelay = setTimeout((function() {
                that._timerId = 1;
                that._loop()
            }), 0)
        }
    },
    animateElement: function(elem, params, options) {
        if (elem && params && options) {
            elem.animation && elem.animation.stop();
            this.addAnimation(elem.animation = new Animation(elem, params, options))
        }
    },
    onEndAnimation: function(endAnimation) {
        this._animationCount ? this._endAnimation = endAnimation : endAnimation()
    },
    dispose: function() {
        this.stop();
        this.element = null
    },
    stop: function() {
        this._animations = {};
        this._animationCount = 0;
        (0, _frame.cancelAnimationFrame)(this._timerId);
        clearTimeout(this._startDelay);
        clearTimeout(this._endAnimationTimer);
        this._timerId = null
    },
    lock: function() {
        let an;
        const animations = this._animations;
        let unstoppable;
        let hasUnstoppableInAnimations;
        for (an in animations) {
            unstoppable = animations[an].options.unstoppable;
            hasUnstoppableInAnimations = hasUnstoppableInAnimations || unstoppable;
            if (!unstoppable) {
                animations[an].stop(true);
                delete animations[an]
            }
        }!hasUnstoppableInAnimations && this.stop()
    }
};
