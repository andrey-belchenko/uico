/**
 * DevExtreme (esm/viz/chart_components/tracker.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../core/dom_adapter";
import eventsEngine from "../../events/core/events_engine";
import {
    name as clickEventName
} from "../../events/click";
import {
    extend
} from "../../core/utils/extend";
import {
    each as _each
} from "../../core/utils/iterator";
import consts from "../components/consts";
import {
    getDistance,
    pointInCanvas as inCanvas,
    normalizeEnum as _normalizeEnum
} from "../core/utils";
import pointerEvents from "../../events/pointer";
import {
    addNamespace
} from "../../events/utils/index";
import {
    isDefined
} from "../../core/utils/type";
import {
    noop as _noop
} from "../../core/utils/common";
import errors from "../../core/errors";
const _floor = Math.floor;
const eventsConsts = consts.events;
const statesConsts = consts.states;
const HOVER_STATE = statesConsts.hoverMark;
const NORMAL_STATE = statesConsts.normalMark;
const EVENT_NS = "dxChartTracker";
const DOT_EVENT_NS = "." + EVENT_NS;
const POINTER_ACTION = addNamespace([pointerEvents.down, pointerEvents.move], EVENT_NS);
const LEGEND_CLICK = "legendClick";
const SERIES_CLICK = "seriesClick";
const POINT_CLICK = "pointClick";
const POINT_DATA = "chart-data-point";
const SERIES_DATA = "chart-data-series";
const ARG_DATA = "chart-data-argument";
const DELAY = 100;
const HOLD_TIMEOUT = 300;
const NONE_MODE = "none";
const ALL_ARGUMENT_POINTS_MODE = "allargumentpoints";
const INCLUDE_POINTS_MODE = "includepoints";
const EXLUDE_POINTS_MODE = "excludepoints";
const LEGEND_HOVER_MODES = ["includepoints", "excludepoints", "none"];

function getData(event, dataKey, tryCheckParent) {
    const target = event.target;
    if ("tspan" === target.tagName) {
        return target.parentNode[dataKey]
    }
    const data = target[dataKey];
    if (tryCheckParent && !isDefined(data)) {
        const getParentData = function(node) {
            if (node.parentNode) {
                if (isDefined(node.parentNode[dataKey])) {
                    return node.parentNode[dataKey]
                } else {
                    return getParentData(node.parentNode)
                }
            }
            return
        };
        return getParentData(target)
    }
    return data
}

function eventCanceled(_ref, target, clickTarget) {
    let {
        event: event,
        cancel: cancel
    } = _ref;
    const deprecatedCancel = event.cancel;
    const eventCanceled = cancel || deprecatedCancel;
    if (deprecatedCancel) {
        errors.log("W0003", `${clickTarget}Click handler argument`, "event.cancel", "22.1", "Use the 'cancel' field instead")
    }
    return eventCanceled || !target.getOptions()
}

function correctLegendHoverMode(mode) {
    if (LEGEND_HOVER_MODES.indexOf(mode) > -1) {
        return mode
    } else {
        return "includepoints"
    }
}

function correctHoverMode(target) {
    const mode = target.getOptions().hoverMode;
    return "none" === mode ? mode : "allargumentpoints"
}
const baseTrackerPrototype = {
    ctor: function(options) {
        const that = this;
        const data = {
            tracker: that
        };
        that._renderer = options.renderer;
        that._legend = options.legend;
        that._tooltip = options.tooltip;
        that._eventTrigger = options.eventTrigger;
        that._seriesGroup = options.seriesGroup;
        options.seriesGroup.off(DOT_EVENT_NS).on(addNamespace(eventsConsts.showPointTooltip, EVENT_NS), data, that._showPointTooltip).on(addNamespace(eventsConsts.hidePointTooltip, EVENT_NS), data, that._hidePointTooltip);
        that._renderer.root.off(DOT_EVENT_NS).on(POINTER_ACTION, data, that._pointerHandler).on(addNamespace(pointerEvents.up, EVENT_NS), (() => clearTimeout(that._holdTimer))).on(addNamespace(clickEventName, EVENT_NS), data, that._clickHandler)
    },
    update: function(options) {
        this._chart = options.chart
    },
    updateSeries(series, resetDecorations) {
        const that = this;
        const noHoveredSeries = !(null !== series && void 0 !== series && series.some((s => s === that.hoveredSeries)) || that._hoveredPoint && that._hoveredPoint.series);
        if (that._storedSeries !== series) {
            that._storedSeries = series || []
        }
        if (noHoveredSeries) {
            that._clean();
            that._renderer.initDefsElements()
        }
        if (resetDecorations) {
            that.clearSelection();
            if (!noHoveredSeries) {
                that._hideTooltip(that.pointAtShownTooltip);
                that.clearHover()
            }
        }
    },
    setCanvases: function(mainCanvas, paneCanvases) {
        this._mainCanvas = mainCanvas;
        this._canvases = paneCanvases
    },
    repairTooltip: function() {
        const point = this.pointAtShownTooltip;
        if (!point || !point.series || !point.isVisible()) {
            this._hideTooltip(point, true)
        } else {
            this._showTooltip(point)
        }
    },
    _setHoveredPoint: function(point) {
        if (point === this._hoveredPoint) {
            return
        }
        this._releaseHoveredPoint();
        point.hover();
        this._hoveredPoint = point
    },
    _releaseHoveredPoint: function(isPointerOut) {
        if (this._hoveredPoint && this._hoveredPoint.getOptions()) {
            this._hoveredPoint.clearHover();
            this._hoveredPoint = null;
            if (this._tooltip.isEnabled()) {
                this._hideTooltip(this._hoveredPoint, false, isPointerOut)
            }
        }
    },
    _setHoveredSeries: function(series, mode) {
        this._releaseHoveredSeries();
        this._releaseHoveredPoint();
        series.hover(mode);
        this.hoveredSeries = series
    },
    _releaseHoveredSeries() {
        if (this.hoveredSeries) {
            this.hoveredSeries.clearHover();
            this.hoveredSeries = null
        }
    },
    clearSelection() {
        this._storedSeries.forEach((series => {
            if (series) {
                series.clearSelection();
                series.getPoints().forEach((point => point.clearSelection()))
            }
        }))
    },
    _clean: function() {
        this.hoveredPoint = this.hoveredSeries = this._hoveredArgumentPoints = null;
        this._hideTooltip(this.pointAtShownTooltip)
    },
    clearHover: function(isPointerOut) {
        this._resetHoveredArgument();
        this._releaseHoveredSeries();
        this._releaseHoveredPoint(isPointerOut)
    },
    _hideTooltip: function(point, silent, isPointerOut) {
        const that = this;
        if (!that._tooltip || point && that.pointAtShownTooltip !== point) {
            return
        }
        if (!silent && that.pointAtShownTooltip) {
            that.pointAtShownTooltip = null
        }
        that._tooltip.hide(!!isPointerOut)
    },
    _showTooltip: function(point) {
        const that = this;
        let tooltipFormatObject;
        const eventData = {
            target: point
        };
        if (null !== point && void 0 !== point && point.getOptions()) {
            tooltipFormatObject = point.getTooltipFormatObject(that._tooltip, that._tooltip.isShared() && that._chart.getStackedPoints(point));
            if (!isDefined(tooltipFormatObject.valueText) && !tooltipFormatObject.points || !point.isVisible()) {
                return
            }
            const coords = point.getTooltipParams(that._tooltip.getLocation());
            const rootOffset = that._renderer.getRootOffset();
            coords.x += rootOffset.left;
            coords.y += rootOffset.top;
            const callback = result => {
                result && (that.pointAtShownTooltip = point)
            };
            callback(that._tooltip.show(tooltipFormatObject, coords, eventData, void 0, callback))
        }
    },
    _showPointTooltip: function(event, point) {
        const that = event.data.tracker;
        const pointWithTooltip = that.pointAtShownTooltip;
        if (pointWithTooltip && pointWithTooltip !== point) {
            that._hideTooltip(pointWithTooltip)
        }
        that._showTooltip(point)
    },
    _hidePointTooltip: function(event, point) {
        event.data.tracker._hideTooltip(point, false, true)
    },
    _enableOutHandler: function() {
        if (this._outHandler) {
            return
        }
        const that = this;
        const handler = function(e) {
            const rootOffset = that._renderer.getRootOffset();
            const x = _floor(e.pageX - rootOffset.left);
            const y = _floor(e.pageY - rootOffset.top);
            if (!inCanvas(that._mainCanvas, x, y) && !that._isCursorOnTooltip(e)) {
                that._pointerOut();
                that._disableOutHandler()
            }
        };
        eventsEngine.on(domAdapter.getDocument(), POINTER_ACTION, handler);
        this._outHandler = handler
    },
    _isCursorOnTooltip: function(e) {
        return this._tooltip.isEnabled() && this._tooltip.isCursorOnTooltip(e.pageX, e.pageY)
    },
    _disableOutHandler: function() {
        this._outHandler && eventsEngine.off(domAdapter.getDocument(), POINTER_ACTION, this._outHandler);
        this._outHandler = null
    },
    stopCurrentHandling: function() {
        this._pointerOut(true)
    },
    _pointerOut: function(force) {
        this.clearHover(true);
        (force || this._tooltip.isEnabled()) && this._hideTooltip(this.pointAtShownTooltip, false, true)
    },
    _triggerLegendClick: function(eventArgs, elementClick) {
        const eventTrigger = this._eventTrigger;
        eventTrigger(LEGEND_CLICK, eventArgs, (function() {
            !eventCanceled(eventArgs, eventArgs.target, "legend") && eventTrigger(elementClick, eventArgs)
        }))
    },
    _hoverLegendItem: function(x, y) {
        const that = this;
        const item = that._legend.getItemByCoord(x, y);
        let series;
        const legendHoverMode = correctLegendHoverMode(that._legend.getOptions().hoverMode);
        if (item) {
            series = that._storedSeries[item.id];
            if (!series.isHovered() || series.lastHoverMode !== legendHoverMode) {
                that._setHoveredSeries(series, legendHoverMode)
            }
            that._tooltip.isEnabled() && that._hideTooltip(that.pointAtShownTooltip)
        } else {
            that.clearHover()
        }
    },
    _hoverArgument: function(argument, argumentIndex) {
        const that = this;
        const hoverMode = that._getArgumentHoverMode();
        if (isDefined(argument)) {
            that._releaseHoveredPoint();
            that._hoveredArgument = argument;
            that._argumentIndex = argumentIndex;
            that._notifySeries({
                action: "pointHover",
                notifyLegend: that._notifyLegendOnHoverArgument,
                target: {
                    argument: argument,
                    fullState: HOVER_STATE,
                    argumentIndex: argumentIndex,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            })
        }
    },
    _resetHoveredArgument: function() {
        const that = this;
        let hoverMode;
        if (isDefined(that._hoveredArgument)) {
            hoverMode = that._getArgumentHoverMode();
            that._notifySeries({
                action: "clearPointHover",
                notifyLegend: that._notifyLegendOnHoverArgument,
                target: {
                    fullState: NORMAL_STATE,
                    argumentIndex: that._argumentIndex,
                    argument: that._hoveredArgument,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            });
            that._hoveredArgument = null
        }
    },
    _notifySeries: function(data) {
        this._storedSeries.forEach((function(series) {
            series.notify(data)
        }))
    },
    _pointerHandler: function(e) {
        var _series;
        const that = e.data.tracker;
        const rootOffset = that._renderer.getRootOffset();
        const x = _floor(e.pageX - rootOffset.left);
        const y = _floor(e.pageY - rootOffset.top);
        const canvas = that._getCanvas(x, y);
        let series = getData(e, SERIES_DATA);
        let point = getData(e, POINT_DATA) || (null === (_series = series) || void 0 === _series ? void 0 : _series.getPointByCoord(x, y));
        that._isHolding = false;
        clearTimeout(that._holdTimer);
        if (e.type === pointerEvents.down) {
            that._holdTimer = setTimeout((() => that._isHolding = true), 300)
        }
        if (point && !point.getMarkerVisibility()) {
            point = void 0
        }
        that._enableOutHandler();
        if (that._legend.coordsIn(x, y)) {
            that._hoverLegendItem(x, y);
            return
        }
        if (that.hoveredSeries && that.hoveredSeries !== that._stuckSeries) {
            that._releaseHoveredSeries()
        }
        if (that._hoverArgumentAxis(x, y, e)) {
            return
        }
        if (that._isPointerOut(canvas, point)) {
            that._pointerOut()
        }
        if (!canvas && !point) {
            return
        }
        if (series && !point) {
            point = series.getNeighborPoint(x, y);
            if (!that._stickyHovering && point && !point.coordsIn(x, y)) {
                point = null
            }
            if (series !== that.hoveredSeries) {
                that._setTimeout((function() {
                    that._setHoveredSeries(series);
                    that._setStuckSeries(e, series, x, y);
                    that._pointerComplete(point, x, y)
                }), series);
                return
            }
        } else if (point) {
            if (e.type !== pointerEvents.move && "touch" !== e.pointerType) {
                return
            }
            if (that.hoveredSeries) {
                that._setTimeout((() => that._pointerOnPoint(point, x, y, e)), point)
            } else {
                that._pointerOnPoint(point, x, y, e)
            }
            return
        } else if (that._setStuckSeries(e, void 0, x, y) && that._stickyHovering) {
            var _point;
            series = that._stuckSeries;
            point = series.getNeighborPoint(x, y);
            that._releaseHoveredSeries();
            (null === (_point = point) || void 0 === _point ? void 0 : _point.getMarkerVisibility()) && that._setHoveredPoint(point)
        } else if (!that._stickyHovering) {
            that._pointerOut()
        }
        that._pointerComplete(point, x, y)
    },
    _pointerOnPoint: function(point, x, y) {
        this._resetHoveredArgument();
        this._setHoveredPoint(point);
        this._pointerComplete(point, x, y)
    },
    _pointerComplete: function(point) {
        this.pointAtShownTooltip !== point && this._tooltip.isEnabled() && this._showTooltip(point)
    },
    _clickHandler: function(e) {
        var _point2;
        const that = e.data.tracker;
        if (that._isHolding) {
            return
        }
        const rootOffset = that._renderer.getRootOffset();
        const x = _floor(e.pageX - rootOffset.left);
        const y = _floor(e.pageY - rootOffset.top);
        let point = getData(e, POINT_DATA);
        const series = that._stuckSeries || getData(e, SERIES_DATA) || (null === (_point2 = point) || void 0 === _point2 ? void 0 : _point2.series);
        const axis = that._argumentAxis;
        if (that._legend.coordsIn(x, y)) {
            const item = that._legend.getItemByCoord(x, y);
            if (item) {
                that._legendClick(item, e)
            }
        } else if (null !== axis && void 0 !== axis && axis.coordsIn(x, y)) {
            const argument = getData(e, ARG_DATA, true);
            if (isDefined(argument)) {
                that._eventTrigger("argumentAxisClick", {
                    argument: argument,
                    event: e
                })
            }
        } else if (series) {
            var _point3;
            point = point || series.getPointByCoord(x, y);
            if (null !== (_point3 = point) && void 0 !== _point3 && _point3.getMarkerVisibility()) {
                that._pointClick(point, e)
            } else {
                getData(e, SERIES_DATA) && that._eventTrigger(SERIES_CLICK, {
                    target: series,
                    event: e
                })
            }
        }
    },
    dispose: function() {
        this._disableOutHandler();
        this._renderer.root.off(DOT_EVENT_NS);
        this._seriesGroup.off(DOT_EVENT_NS)
    }
};
export const ChartTracker = function(options) {
    this.ctor(options)
};
extend(ChartTracker.prototype, baseTrackerPrototype, {
    _pointClick: function(point, event) {
        const eventTrigger = this._eventTrigger;
        const series = point.series;
        const eventArgs = {
            target: point,
            event: event
        };
        eventTrigger(POINT_CLICK, eventArgs, (function() {
            !eventCanceled(eventArgs, series, "point") && eventTrigger(SERIES_CLICK, {
                target: series,
                event: event
            })
        }))
    },
    update: function(options) {
        baseTrackerPrototype.update.call(this, options);
        this._argumentAxis = options.argumentAxis || {};
        this._axisHoverEnabled = this._argumentAxis && "allargumentpoints" === _normalizeEnum(this._argumentAxis.getOptions().hoverMode);
        this._rotated = options.rotated;
        this._crosshair = options.crosshair;
        this._stickyHovering = options.stickyHovering
    },
    _getCanvas: function(x, y) {
        const canvases = this._canvases || [];
        for (let i = 0; i < canvases.length; i++) {
            const c = canvases[i];
            if (inCanvas(c, x, y)) {
                return c
            }
        }
        return null
    },
    _isPointerOut: function(canvas) {
        return !canvas && this._stuckSeries
    },
    _hideCrosshair: function() {
        var _this$_crosshair;
        null === (_this$_crosshair = this._crosshair) || void 0 === _this$_crosshair || _this$_crosshair.hide()
    },
    _moveCrosshair: function(point, x, y) {
        if (this._crosshair && null !== point && void 0 !== point && point.isVisible()) {
            this._crosshair.show({
                point: point,
                x: x,
                y: y
            })
        }
    },
    _clean: function() {
        baseTrackerPrototype._clean.call(this);
        this._resetTimer();
        this._stuckSeries = null
    },
    _getSeriesForShared: function(x, y) {
        var _point4;
        const that = this;
        const points = [];
        let point = null;
        let distance = 1 / 0;
        if (that._tooltip.isShared() && !that.hoveredSeries) {
            _each(that._storedSeries, (function(_, series) {
                const point = series.getNeighborPoint(x, y);
                point && points.push(point)
            }));
            _each(points, (function(_, p) {
                const coords = p.getCrosshairData(x, y);
                const d = getDistance(x, y, coords.x, coords.y);
                if (d < distance) {
                    point = p;
                    distance = d
                }
            }))
        }
        return null === (_point4 = point) || void 0 === _point4 ? void 0 : _point4.series
    },
    _setTimeout: function(callback, keeper) {
        const that = this;
        if (that._timeoutKeeper !== keeper) {
            that._resetTimer();
            that._hoverTimeout = setTimeout((function() {
                callback();
                that._timeoutKeeper = null
            }), 100);
            that._timeoutKeeper = keeper
        }
    },
    _resetTimer: function() {
        clearTimeout(this._hoverTimeout);
        this._timeoutKeeper = this._hoverTimeout = null
    },
    _stopEvent: function(e) {
        if (!isDefined(e.cancelable) || e.cancelable) {
            e.preventDefault();
            e.stopPropagation()
        }
    },
    _setStuckSeries: function(e, series, x, y) {
        if ("mouse" !== e.pointerType) {
            this._stuckSeries = null
        } else {
            this._stuckSeries = series || this._stuckSeries || this._getSeriesForShared(x, y)
        }
        return !!this._stuckSeries
    },
    _pointerOut: function() {
        this._stuckSeries = null;
        this._hideCrosshair();
        this._resetTimer();
        baseTrackerPrototype._pointerOut.apply(this, arguments)
    },
    _hoverArgumentAxis: function(x, y, e) {
        const that = this;
        that._resetHoveredArgument();
        if (that._axisHoverEnabled && that._argumentAxis.coordsIn(x, y)) {
            that._hoverArgument(getData(e, ARG_DATA, true));
            return true
        }
    },
    _pointerComplete: function(point, x, y) {
        this.hoveredSeries && this.hoveredSeries.updateHover(x, y);
        this._resetTimer();
        this._moveCrosshair(point, x, y);
        baseTrackerPrototype._pointerComplete.call(this, point)
    },
    _legendClick: function(item, e) {
        const series = this._storedSeries[item.id];
        this._triggerLegendClick({
            target: series,
            event: e
        }, SERIES_CLICK)
    },
    _hoverLegendItem: function(x, y) {
        this._stuckSeries = null;
        this._hideCrosshair();
        baseTrackerPrototype._hoverLegendItem.call(this, x, y)
    },
    _pointerOnPoint: function(point, x, y, e) {
        this._setStuckSeries(e, point.series, x, y);
        this._releaseHoveredSeries();
        baseTrackerPrototype._pointerOnPoint.call(this, point, x, y, e)
    },
    _notifyLegendOnHoverArgument: false,
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._argumentAxis)
    },
    dispose: function() {
        this._resetTimer();
        baseTrackerPrototype.dispose.call(this)
    }
});
export const PieTracker = function(options) {
    this.ctor(options)
};
extend(PieTracker.prototype, baseTrackerPrototype, {
    _isPointerOut: function(_, point) {
        return !point
    },
    _legendClick: function(item, e) {
        const points = [];
        this._storedSeries.forEach((s => points.push.apply(points, s.getPointsByKeys(item.argument, item.argumentIndex))));
        this._eventTrigger(LEGEND_CLICK, {
            target: item.argument,
            points: points,
            event: e
        })
    },
    _pointClick: function(point, e) {
        this._eventTrigger(POINT_CLICK, {
            target: point,
            event: e
        })
    },
    _hoverLegendItem: function(x, y) {
        const that = this;
        const item = that._legend.getItemByCoord(x, y);
        if (item && that._hoveredArgument !== item.argument) {
            that._resetHoveredArgument();
            that._hoverArgument(item.argument, item.argumentIndex)
        } else if (!item) {
            that.clearHover()
        }
    },
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._legend)
    },
    _hoverArgumentAxis: _noop,
    _setStuckSeries: _noop,
    _getCanvas: _noop,
    _notifyLegendOnHoverArgument: true
});
