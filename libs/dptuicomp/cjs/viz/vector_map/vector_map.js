/**
 * DevExtreme (cjs/viz/vector_map/vector_map.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = require("../core/utils");
var _projection = require("./projection.main");
var _control_bar = require("./control_bar/control_bar");
var _gesture_handler = require("./gesture_handler");
var _tracker = require("./tracker");
var _data_exchanger = require("./data_exchanger");
var _legend = require("./legend");
var _layout = require("./layout");
var _map_layer = require("./map_layer");
var _tooltip_viewer = require("./tooltip_viewer");
var _vector_map = require("./vector_map.utils");
require("./projection");
var _m_base_widget = _interopRequireDefault(require("../../__internal/viz/core/m_base_widget"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _export = require("../core/export");
var _title = require("../core/title");
var _tooltip = require("../core/tooltip");
var _loading_indicator = require("../core/loading_indicator");
var _annotations = require("../core/annotations");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;
const RE_STARTS_LAYERS = /^layers/;
const RE_ENDS_DATA_SOURCE = /\.dataSource$/;

function mergeBounds(sumBounds, dataBounds) {
    return dataBounds ? [Math.min(dataBounds[0], dataBounds[2], sumBounds[0]), Math.min(dataBounds[1], dataBounds[3], sumBounds[3]), Math.max(dataBounds[0], dataBounds[2], sumBounds[2]), Math.max(dataBounds[1], dataBounds[3], sumBounds[1])] : sumBounds
}
const dxVectorMap = _m_base_widget.default.inherit({
    _eventsMap: {
        onClick: {
            name: "click"
        },
        onCenterChanged: {
            name: "centerChanged"
        },
        onZoomFactorChanged: {
            name: "zoomFactorChanged"
        },
        onHoverChanged: {
            name: "hoverChanged"
        },
        onSelectionChanged: {
            name: "selectionChanged"
        }
    },
    _rootClassPrefix: "dxm",
    _rootClass: "dxm-vector-map",
    _themeSection: "map",
    _fontFields: ["layer:area.label.font", "layer:marker:dot.label.font", "layer:marker:bubble.label.font", "layer:marker:pie.label.font", "layer:marker:image.label.font", "legend.font", "legend.title.font", "legend.title.subtitle.font"],
    _initLayerCollection: function(dataKey) {
        const that = this;
        that._layerCollection = new _map_layer.MapLayerCollection({
            renderer: that._renderer,
            projection: that._projection,
            themeManager: that._themeManager,
            tracker: that._tracker,
            dataKey: dataKey,
            eventTrigger: that._eventTrigger,
            dataExchanger: that._dataExchanger,
            tooltip: that._tooltip,
            notifyDirty: that._notifyDirty,
            notifyReady: that._notifyReady,
            dataReady() {
                let bounds;
                if (that.option("getBoundsFromData") && !that.option("bounds")) {
                    that._preventProjectionEvents();
                    bounds = that._getBoundsFromData();
                    that._projection.setBounds(bounds);
                    that._allowProjectionEvents()
                }
                if (!that.option("projection")) {
                    bounds = bounds || that._getBoundsFromData();
                    if (Math.ceil(bounds[0]) < -180 || Math.ceil(bounds[3]) < -90 || Math.floor(bounds[2]) > 180 || Math.floor(bounds[1]) > 90) {
                        const longitudeLength = bounds[2] - bounds[0];
                        const latitudeLength = bounds[1] - bounds[3];
                        that._projection.setEngine({
                            to: coordinates => [2 * (coordinates[0] - bounds[0]) / longitudeLength - 1, 2 * (coordinates[1] - bounds[3]) / latitudeLength - 1],
                            from: coordinates => [(coordinates[0] + 1) * longitudeLength / 2 + bounds[0], (coordinates[1] + 1) * latitudeLength / 2 + bounds[3]]
                        })
                    }
                }
            }
        })
    },
    _getBoundsFromData() {
        let bounds = this._getBoundingBoxFromDataSource();
        if (!bounds) {
            const layersBounds = this.getLayers().map((l => l.getBounds())).filter((x => void 0 !== x));
            const boundsByData = (0, _map_layer.getMaxBound)(layersBounds);
            if (boundsByData) {
                bounds = boundsByData
            }
        }
        bounds = bounds || [];
        bounds = [bounds[0], bounds[3], bounds[2], bounds[1]];
        return bounds
    },
    _initLegendsControl: function() {
        this._legendsControl = new _legend.LegendsControl({
            renderer: this._renderer,
            container: this._root,
            widget: this,
            layoutControl: this._layoutControl,
            themeManager: this._themeManager,
            dataExchanger: this._dataExchanger,
            notifyDirty: this._notifyDirty,
            notifyReady: this._notifyReady
        })
    },
    _initControlBar: function(dataKey) {
        this._controlBar = new _control_bar.ControlBar({
            renderer: this._renderer,
            container: this._root,
            layoutControl: this._layoutControl,
            projection: this._projection,
            tracker: this._tracker,
            dataKey: dataKey
        })
    },
    _initElements: function() {
        const that = this;
        const dataKey = (0, _vector_map.generateDataKey)();
        let notifyCounter = 0;
        let preventProjectionEvents;
        that._preventProjectionEvents = function() {
            preventProjectionEvents = true
        };
        that._allowProjectionEvents = function() {
            preventProjectionEvents = false
        };
        that._notifyDirty = function() {
            that._resetIsReady();
            ++notifyCounter
        };
        that._notifyReady = function() {
            that._allowProjectionEvents();
            if (0 === --notifyCounter) {
                that._drawn()
            }
        };
        that._preventProjectionEvents();
        that._dataExchanger = new _data_exchanger.DataExchanger;
        that._projection = new _projection.Projection({
            centerChanged: function(value) {
                if (!preventProjectionEvents) {
                    that._eventTrigger("centerChanged", {
                        center: value
                    })
                }
            },
            zoomChanged: function(value) {
                if (!preventProjectionEvents) {
                    that._eventTrigger("zoomFactorChanged", {
                        zoomFactor: value
                    })
                }
            }
        });
        that._tracker = new _tracker.Tracker({
            root: that._root,
            projection: that._projection,
            dataKey: dataKey
        });
        that._gestureHandler = new _gesture_handler.GestureHandler({
            projection: that._projection,
            renderer: that._renderer,
            tracker: that._tracker
        });
        that._layoutControl = new _layout.LayoutControl(that);
        that._layoutControl.suspend();
        that._initLayerCollection(dataKey);
        that._createHtmlStructure();
        that._initControlBar(dataKey);
        that._initLegendsControl();
        that._prepareExtraElements();
        that._tooltipViewer = new _tooltip_viewer.TooltipViewer({
            tracker: that._tracker,
            tooltip: that._tooltip,
            layerCollection: that._layerCollection
        })
    },
    _change_RESUME_LAYOUT: function() {
        this._layoutControl.resume()
    },
    _initialChanges: ["PROJECTION", "RESUME_LAYOUT", "LAYOUT_INIT", "BOUNDS", "MAX_ZOOM_FACTOR", "ZOOM_FACTOR", "CENTER"],
    _layoutChangesOrder: ["RESUME_LAYOUT", "LAYERS"],
    _customChangesOrder: ["EXTRA_ELEMENTS"],
    _initCore: function() {
        this._root = this._renderer.root.attr({
            align: "center",
            cursor: "default"
        });
        this._initElements()
    },
    _disposeCore: function() {
        this._controlBar.dispose();
        this._gestureHandler.dispose();
        this._tracker.dispose();
        this._legendsControl.dispose();
        this._layerCollection.dispose();
        this._layoutControl.dispose();
        this._tooltipViewer.dispose();
        this._dataExchanger.dispose();
        this._projection.dispose();
        this._dataExchanger = this._gestureHandler = this._projection = this._tracker = this._layoutControl = this._root = this._layerCollection = this._controlBar = this._legendsControl = null
    },
    _setupInteraction: function() {
        const options = {
            centeringEnabled: !!(0, _utils.parseScalar)(this._getOption("panningEnabled", true), true),
            zoomingEnabled: !!(0, _utils.parseScalar)(this._getOption("zoomingEnabled", true), true)
        };
        this._gestureHandler.setInteraction(options);
        this._controlBar.setInteraction(options)
    },
    _getDefaultSize: function() {
        return {
            width: 800,
            height: 400
        }
    },
    _applySize: function(rect) {
        const layout = {
            left: rect[0],
            top: rect[1],
            width: rect[2] - rect[0],
            height: rect[3] - rect[1],
            right: 0,
            bottom: 0
        };
        this._projection.setSize(layout);
        this._layoutControl.setSize(layout);
        this._layerCollection.setRect([layout.left, layout.top, layout.width, layout.height]);
        this._requestChange(["EXTRA_ELEMENTS"])
    },
    _optionChanging: function(name, currentValue, nextValue) {
        if (currentValue && nextValue) {
            if (RE_STARTS_LAYERS.test(name)) {
                if (currentValue.dataSource && nextValue.dataSource && currentValue !== nextValue) {
                    currentValue.dataSource = null
                } else if (RE_ENDS_DATA_SOURCE.test(name)) {
                    this.option(name, null)
                }
            }
        }
    },
    _applyChanges: function() {
        this._notifyDirty();
        this.callBase.apply(this, arguments);
        this._notifyReady()
    },
    _optionChangesMap: {
        background: "BACKGROUND",
        layers: "LAYERS",
        extraElements: "EXTRA_ELEMENTS",
        controlBar: "CONTROL_BAR",
        legends: "LEGENDS",
        touchEnabled: "TRACKER",
        wheelEnabled: "TRACKER",
        panningEnabled: "INTERACTION",
        zoomingEnabled: "INTERACTION",
        projection: "PROJECTION",
        bounds: "BOUNDS",
        maxZoomFactor: "MAX_ZOOM_FACTOR",
        zoomFactor: "ZOOM_FACTOR",
        center: "CENTER"
    },
    _optionChangesOrder: ["PROJECTION", "BOUNDS", "MAX_ZOOM_FACTOR", "ZOOM_FACTOR", "CENTER", "BACKGROUND", "CONTROL_BAR", "LEGENDS", "TRACKER", "INTERACTION"],
    _change_PROJECTION: function() {
        this._setProjection()
    },
    _change_BOUNDS: function() {
        this._setBounds()
    },
    _change_MAX_ZOOM_FACTOR: function() {
        this._setMaxZoom()
    },
    _change_ZOOM_FACTOR: function() {
        this._setZoom()
    },
    _change_CENTER: function() {
        this._setCenter()
    },
    _change_BACKGROUND: function() {
        this._setBackgroundOptions()
    },
    _change_LAYERS: function() {
        this._setLayerCollectionOptions()
    },
    _change_CONTROL_BAR: function() {
        this._setControlBarOptions()
    },
    _change_EXTRA_ELEMENTS: function() {
        this._renderExtraElements()
    },
    _change_LEGENDS: function() {
        this._setLegendsOptions()
    },
    _change_TRACKER: function() {
        this._setTrackerOptions()
    },
    _change_INTERACTION: function() {
        this._setupInteraction()
    },
    _themeDependentChanges: ["BACKGROUND", "LAYERS", "CONTROL_BAR", "LEGENDS", "TRACKER", "INTERACTION"],
    _setProjection: function() {
        this._projection.setEngine(this.option("projection"))
    },
    _setBounds: function() {
        this._projection.setBounds(this.option("bounds"))
    },
    _setMaxZoom: function() {
        this._projection.setMaxZoom(this.option("maxZoomFactor"))
    },
    _setZoom: function() {
        this._projection.setZoom(this.option("zoomFactor"))
    },
    _setCenter: function() {
        this._projection.setCenter(this.option("center"))
    },
    _setBackgroundOptions: function() {
        this._layerCollection.setBackgroundOptions(this._getOption("background"))
    },
    _setLayerCollectionOptions: function() {
        this._layerCollection.setOptions(this.option("layers"))
    },
    _getBoundingBoxFromDataSource() {
        const layers = this._layerCollection.items();
        const infinityBounds = [1 / 0, -1 / 0, -1 / 0, 1 / 0];
        const resultBBox = layers && layers.length ? layers.reduce(((sumBBox, l) => {
            const layerData = l.getData();
            const itemCount = layerData.count();
            if (itemCount > 0) {
                const rootBBox = layerData.getBBox();
                if (rootBBox) {
                    sumBBox = mergeBounds(sumBBox, rootBBox)
                } else {
                    for (let i = 0; i < itemCount; i++) {
                        sumBBox = mergeBounds(sumBBox, layerData.getBBox(i))
                    }
                }
            }
            return sumBBox
        }), infinityBounds) : void 0;
        return resultBBox === infinityBounds ? void 0 : resultBBox
    },
    _setControlBarOptions: function() {
        this._controlBar.setOptions(this._getOption("controlBar"))
    },
    _setLegendsOptions: function() {
        this._legendsControl.setOptions(this.option("legends"))
    },
    _setTrackerOptions: function() {
        this._tracker.setOptions({
            touchEnabled: this._getOption("touchEnabled", true),
            wheelEnabled: this._getOption("wheelEnabled", true)
        })
    },
    getLayers() {
        return this._layerCollection.items().map((l => l.proxy))
    },
    getLayerByIndex: function(index) {
        const layer = this._layerCollection.byIndex(index);
        return layer ? layer.proxy : null
    },
    getLayerByName: function(name) {
        const layer = this._layerCollection.byName(name);
        return layer ? layer.proxy : null
    },
    clearSelection: function(_noEvent) {
        const layers = this._layerCollection.items();
        let i;
        const ii = layers.length;
        for (i = 0; i < ii; ++i) {
            layers[i].clearSelection(_noEvent)
        }
        return this
    },
    center: function(value) {
        const that = this;
        if (void 0 === value) {
            return that._projection.getCenter()
        } else {
            that._projection.setCenter(value);
            return that
        }
    },
    zoomFactor: function(value) {
        const that = this;
        if (void 0 === value) {
            return that._projection.getZoom()
        } else {
            that._projection.setZoom(value);
            return that
        }
    },
    viewport: function(value) {
        const that = this;
        if (void 0 === value) {
            return that._projection.getViewport()
        } else {
            that._projection.setViewport(value);
            return that
        }
    },
    convertCoordinates: function(coordinates) {
        coordinates = coordinates && coordinates.length ? coordinates : [arguments[0], arguments[1]];
        return this.convertToGeo(coordinates[0], coordinates[1])
    },
    convertToGeo: function(x, y) {
        return this._projection.fromScreenPoint([x, y])
    },
    convertToXY: function(longitude, latitude) {
        return this._projection.toScreenPoint([longitude, latitude])
    }
});
(0, _component_registrator.default)("dxVectorMap", dxVectorMap);
var _default = exports.default = dxVectorMap;
dxVectorMap.addPlugin(_export.plugin);
dxVectorMap.addPlugin(_title.plugin);
dxVectorMap.addPlugin(_tooltip.plugin);
dxVectorMap.addPlugin(_loading_indicator.plugin);
dxVectorMap.addPlugin(_annotations.plugins.core);
dxVectorMap.addPlugin(_annotations.plugins.vectorMap);
module.exports = exports.default;
module.exports.default = exports.default;
