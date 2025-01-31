/**
 * DevExtreme (cjs/viz/vector_map/projection.main.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.projection = exports.Projection = void 0;
var _extend = require("../../core/utils/extend");
var _event_emitter = require("./event_emitter");
const _Number = Number;
const _min = Math.min;
const _max = Math.max;
const _abs = Math.abs;
const _round = Math.round;
const _ln = Math.log;
const _pow = Math.pow;
const TWO_TO_LN2 = 2 / Math.LN2;
const MIN_BOUNDS_RANGE = 1 / 3600 / 180 / 10;
const DEFAULT_MIN_ZOOM = 1;
const DEFAULT_MAX_ZOOM = 256;
const DEFAULT_CENTER = [NaN, NaN];
const DEFAULT_ENGINE_NAME = "mercator";

function floatsEqual(f1, f2) {
    return _abs(f1 - f2) < 1e-8
}

function arraysEqual(a1, a2) {
    return floatsEqual(a1[0], a2[0]) && floatsEqual(a1[1], a2[1])
}

function parseAndClamp(value, minValue, maxValue, defaultValue) {
    const val = _Number(value);
    return isFinite(val) ? _min(_max(val, minValue), maxValue) : defaultValue
}

function parseAndClampArray(value, minValue, maxValue, defaultValue) {
    return [parseAndClamp(value[0], minValue[0], maxValue[0], defaultValue[0]), parseAndClamp(value[1], minValue[1], maxValue[1], defaultValue[1])]
}

function getEngine(engine) {
    return engine instanceof Engine && engine || projection.get(engine) || projection(engine) || projection.get("mercator")
}
const Projection = function(parameters) {
    this._initEvents();
    this._params = parameters;
    this._engine = getEngine();
    this._center = this._engine.center();
    this._adjustCenter()
};
exports.Projection = Projection;
Projection.prototype = {
    constructor: Projection,
    _minZoom: 1,
    _maxZoom: 256,
    _zoom: 1,
    _center: DEFAULT_CENTER,
    _canvas: {},
    _scale: [],
    dispose: function() {
        this._disposeEvents()
    },
    setEngine: function(value) {
        const that = this;
        const engine = getEngine(value);
        if (that._engine !== engine) {
            that._engine = engine;
            that._fire("engine");
            if (that._changeCenter(engine.center())) {
                that._triggerCenterChanged()
            }
            if (that._changeZoom(that._minZoom)) {
                that._triggerZoomChanged()
            }
            that._adjustCenter();
            that._setupScreen()
        }
    },
    setBounds: function(bounds) {
        if (void 0 !== bounds) {
            this.setEngine(this._engine.original().bounds(bounds))
        }
    },
    _setupScreen: function() {
        const that = this;
        const canvas = that._canvas;
        const width = canvas.width;
        const height = canvas.height;
        const engine = that._engine;
        const aspectRatio = engine.ar();
        that._x0 = canvas.left + width / 2;
        that._y0 = canvas.top + height / 2;
        const min = [that.project([engine.min()[0], 0])[0], that.project([0, engine.min()[1]])[1]];
        const max = [that.project([engine.max()[0], 0])[0], that.project([0, engine.max()[1]])[1]];
        const screenAR = width / height;
        const boundsAR = _abs(max[0] - min[0]) / _abs(max[1] - min[1]);
        let correction;
        if (isNaN(boundsAR) || 0 === boundsAR || _min(screenAR, aspectRatio) <= aspectRatio * boundsAR && aspectRatio * boundsAR <= _max(screenAR, aspectRatio)) {
            correction = 1
        } else {
            correction = boundsAR > 1 ? boundsAR : 1 / boundsAR
        }
        if (aspectRatio * boundsAR >= screenAR) {
            that._xRadius = width / 2 / correction;
            that._yRadius = width / 2 / (aspectRatio * correction)
        } else {
            that._xRadius = height / 2 * (aspectRatio / correction);
            that._yRadius = height / 2 / correction
        }
        that._fire("screen")
    },
    setSize: function(canvas) {
        this._canvas = canvas;
        this._setupScreen()
    },
    getCanvas: function() {
        return this._canvas
    },
    _toScreen: function(coordinates) {
        return [this._x0 + this._xRadius * coordinates[0], this._y0 + this._yRadius * coordinates[1]]
    },
    _fromScreen: function(coordinates) {
        return [(coordinates[0] - this._x0) / this._xRadius, (coordinates[1] - this._y0) / this._yRadius]
    },
    _toTransformed: function(coordinates) {
        return [coordinates[0] * this._zoom + this._xCenter, coordinates[1] * this._zoom + this._yCenter]
    },
    _toTransformedFast: function(coordinates) {
        return [coordinates[0] * this._zoom, coordinates[1] * this._zoom]
    },
    _fromTransformed: function(coordinates) {
        return [(coordinates[0] - this._xCenter) / this._zoom, (coordinates[1] - this._yCenter) / this._zoom]
    },
    _adjustCenter: function() {
        const center = this._engine.project(this._center);
        this._xCenter = -center[0] * this._zoom || 0;
        this._yCenter = -center[1] * this._zoom || 0
    },
    project: function(coordinates) {
        return this._engine.project(coordinates)
    },
    transform: function(coordinates) {
        return this._toScreen(this._toTransformedFast(coordinates))
    },
    isInvertible: function() {
        return this._engine.isInvertible()
    },
    getSquareSize: function(size) {
        return [size[0] * this._zoom * this._xRadius, size[1] * this._zoom * this._yRadius]
    },
    getZoom: function() {
        return this._zoom
    },
    _changeZoom: function(value) {
        const that = this;
        const oldZoom = that._zoom;
        const newZoom = that._zoom = parseAndClamp(value, that._minZoom, that._maxZoom, that._minZoom);
        const isChanged = !floatsEqual(oldZoom, newZoom);
        if (isChanged) {
            that._adjustCenter();
            that._fire("zoom")
        }
        return isChanged
    },
    setZoom: function(value) {
        if (this._engine.isInvertible() && this._changeZoom(value)) {
            this._triggerZoomChanged()
        }
    },
    getScaledZoom: function() {
        return _round((this._scale.length - 1) * _ln(this._zoom) / _ln(this._maxZoom))
    },
    setScaledZoom: function(scaledZoom) {
        this.setZoom(this._scale[_round(scaledZoom)])
    },
    changeScaledZoom: function(deltaZoom) {
        this.setZoom(this._scale[_max(_min(_round(this.getScaledZoom() + deltaZoom), this._scale.length - 1), 0)])
    },
    getZoomScalePartition: function() {
        return this._scale.length - 1
    },
    _setupScaling: function() {
        const that = this;
        const k = _max(_round(TWO_TO_LN2 * _ln(that._maxZoom)), 4);
        const step = _pow(that._maxZoom, 1 / k);
        let zoom = that._minZoom;
        that._scale = [zoom];
        for (let i = 1; i <= k; ++i) {
            that._scale.push(zoom *= step)
        }
    },
    setMaxZoom: function(maxZoom) {
        const that = this;
        that._minZoom = 1;
        that._maxZoom = parseAndClamp(maxZoom, that._minZoom, _Number.MAX_VALUE, 256);
        that._setupScaling();
        if (that._zoom > that._maxZoom) {
            that.setZoom(that._maxZoom)
        }
        that._fire("max-zoom")
    },
    getCenter: function() {
        return this._center.slice()
    },
    setCenter: function(value) {
        if (this._engine.isInvertible() && this._changeCenter(value || [])) {
            this._triggerCenterChanged()
        }
    },
    _changeCenter: function(value) {
        const that = this;
        const engine = that._engine;
        const oldCenter = that._center;
        const newCenter = that._center = parseAndClampArray(value, engine.min(), engine.max(), engine.center());
        const isChanged = !arraysEqual(oldCenter, newCenter);
        if (isChanged) {
            that._adjustCenter();
            that._fire("center")
        }
        return isChanged
    },
    _triggerCenterChanged: function() {
        this._params.centerChanged(this.getCenter())
    },
    _triggerZoomChanged: function() {
        this._params.zoomChanged(this.getZoom())
    },
    setCenterByPoint: function(coordinates, screenPosition) {
        const p = this._engine.project(coordinates);
        const q = this._fromScreen(screenPosition);
        this.setCenter(this._engine.unproject([-q[0] / this._zoom + p[0], -q[1] / this._zoom + p[1]]))
    },
    beginMoveCenter: function() {
        if (this._engine.isInvertible()) {
            this._moveCenter = this._center
        }
    },
    endMoveCenter: function() {
        const that = this;
        if (that._moveCenter) {
            if (!arraysEqual(that._moveCenter, that._center)) {
                that._triggerCenterChanged()
            }
            that._moveCenter = null
        }
    },
    moveCenter: function(shift) {
        const that = this;
        if (that._moveCenter) {
            const current = that.toScreenPoint(that._center);
            that._changeCenter(that.fromScreenPoint([current[0] + shift[0], current[1] + shift[1]]))
        }
    },
    getViewport: function() {
        const unproject = this._engine.unproject;
        const lt = unproject(this._fromTransformed([-1, -1]));
        const lb = unproject(this._fromTransformed([-1, 1]));
        const rt = unproject(this._fromTransformed([1, -1]));
        const rb = unproject(this._fromTransformed([1, 1]));
        const minMax = findMinMax([selectFarthestPoint(lt[0], lb[0], rt[0], rb[0]), selectFarthestPoint(lt[1], rt[1], lb[1], rb[1])], [selectFarthestPoint(rt[0], rb[0], lt[0], lb[0]), selectFarthestPoint(lb[1], rb[1], lt[1], rt[1])]);
        return [].concat(minMax.min[0], minMax.max[1], minMax.max[0], minMax.min[1])
    },
    setViewport: function(viewport) {
        const engine = this._engine;
        const data = viewport ? getZoomAndCenterFromViewport(engine.project, engine.unproject, viewport) : [this._minZoom, engine.center()];
        this.setZoom(data[0]);
        this.setCenter(data[1])
    },
    getTransform: function() {
        return {
            translateX: this._xCenter * this._xRadius,
            translateY: this._yCenter * this._yRadius
        }
    },
    fromScreenPoint: function(coordinates) {
        return this._engine.unproject(this._fromTransformed(this._fromScreen(coordinates)))
    },
    toScreenPoint: function(coordinates) {
        return this._toScreen(this._toTransformed(this._engine.project(coordinates)))
    },
    _eventNames: ["engine", "screen", "center", "zoom", "max-zoom"]
};
(0, _event_emitter.makeEventEmitter)(Projection);

function selectFarthestPoint(point1, point2, basePoint1, basePoint2) {
    const basePoint = (basePoint1 + basePoint2) / 2;
    return _abs(point1 - basePoint) > _abs(point2 - basePoint) ? point1 : point2
}

function selectClosestPoint(point1, point2, basePoint1, basePoint2) {
    const basePoint = (basePoint1 + basePoint2) / 2;
    return _abs(point1 - basePoint) < _abs(point2 - basePoint) ? point1 : point2
}

function getZoomAndCenterFromViewport(project, unproject, viewport) {
    const lt = project([viewport[0], viewport[3]]);
    const lb = project([viewport[0], viewport[1]]);
    const rt = project([viewport[2], viewport[3]]);
    const rb = project([viewport[2], viewport[1]]);
    const l = selectClosestPoint(lt[0], lb[0], rt[0], rb[0]);
    const r = selectClosestPoint(rt[0], rb[0], lt[0], lb[0]);
    const t = selectClosestPoint(lt[1], rt[1], lb[1], rb[1]);
    const b = selectClosestPoint(lb[1], rb[1], lt[1], rt[1]);
    return [2 / _max(_abs(l - r), _abs(t - b)), unproject([(l + r) / 2, (t + b) / 2])]
}

function setMinMax(engine, p1, p2) {
    const {
        min: min,
        max: max
    } = findMinMax(p1, p2);
    engine.min = returnArray(min);
    engine.max = returnArray(max)
}
const Engine = class {
    constructor(parameters) {
        const project = createProjectMethod(parameters.to);
        const unproject = parameters.from ? createUnprojectMethod(parameters.from) : returnValue(DEFAULT_CENTER);
        this.project = project;
        this.unproject = unproject;
        this.original = returnValue(this);
        this.source = function() {
            return (0, _extend.extend)({}, parameters)
        };
        this.isInvertible = returnValue(!!parameters.from);
        this.ar = returnValue(parameters.aspectRatio > 0 ? _Number(parameters.aspectRatio) : 1);
        this.center = returnArray(unproject([0, 0]));
        setMinMax(this, [unproject([-1, 0])[0], unproject([0, 1])[1]], [unproject([1, 0])[0], unproject([0, -1])[1]])
    }
    aspectRatio(aspectRatio) {
        const engine = new Engine((0, _extend.extend)(this.source(), {
            aspectRatio: aspectRatio
        }));
        engine.original = this.original;
        engine.min = this.min;
        engine.max = this.max;
        return engine
    }
    bounds(bounds) {
        bounds = bounds || [];
        const parameters = this.source();
        const min = this.min();
        const max = this.max();
        const b1 = parseAndClampArray([bounds[0], bounds[1]], min, max, min);
        const b2 = parseAndClampArray([bounds[2], bounds[3]], min, max, max);
        const p1 = parameters.to(b1);
        const p2 = parameters.to(b2);
        const delta = _min(_abs(p2[0] - p1[0]) > MIN_BOUNDS_RANGE ? _abs(p2[0] - p1[0]) : 2, _abs(p2[1] - p1[1]) > MIN_BOUNDS_RANGE ? _abs(p2[1] - p1[1]) : 2);
        if (delta < 2) {
            (0, _extend.extend)(parameters, createProjectUnprojectMethods(parameters.to, parameters.from, p1, p2, delta))
        }
        const engine = new Engine(parameters);
        engine.original = this.original;
        setMinMax(engine, b1, b2);
        return engine
    }
};

function invertVerticalAxis(pair) {
    return [pair[0], -pair[1]]
}

function createProjectMethod(method) {
    return arg => invertVerticalAxis(method(arg))
}

function createUnprojectMethod(method) {
    return arg => method(invertVerticalAxis(arg))
}

function returnValue(value) {
    return () => value
}

function returnArray(value) {
    return () => value.slice()
}

function findMinMax(p1, p2) {
    return {
        min: [_min(p1[0], p2[0]), _min(p1[1], p2[1])],
        max: [_max(p1[0], p2[0]), _max(p1[1], p2[1])]
    }
}
const projection = function(parameters) {
    return parameters && parameters.to ? new Engine(parameters) : null
};
exports.projection = projection;
const projectionsCache = {};
projection.get = function(name) {
    return projectionsCache[name] || null
};
projection.add = function(name, engine) {
    engine = engine instanceof Engine && engine || projection(engine);
    if (!projectionsCache[name] && engine) {
        projectionsCache[name] = engine
    }
    return projection
};

function createProjectUnprojectMethods(project, unproject, p1, p2, delta) {
    const x0 = (p1[0] + p2[0]) / 2 - delta / 2;
    const y0 = (p1[1] + p2[1]) / 2 - delta / 2;
    const k = 2 / delta;
    return {
        to: function(coordinates) {
            const [p0, p1] = project(coordinates);
            return [(p0 - x0) * k - 1, (p1 - y0) * k - 1]
        },
        from: function(coordinates) {
            return unproject([x0 + (coordinates[0] + 1) / k, y0 + (coordinates[1] + 1) / k])
        }
    }
}
