/**
 * DevExtreme (esm/__internal/ui/map/m_provider.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "../../../core/class";
import {
    map
} from "../../../core/utils/iterator";
import {
    isNumeric,
    isPlainObject
} from "../../../core/utils/type";
import {
    addNamespace
} from "../../../events/utils/index";
const {
    abstract: abstract
} = Class;
const Provider = Class.inherit({
    _defaultRouteWeight: () => 5,
    _defaultRouteOpacity: () => .5,
    _defaultRouteColor: () => "#0000FF",
    ctor(map, $container) {
        this._mapWidget = map;
        this._$container = $container
    },
    render(markerOptions, routeOptions) {
        return this._renderImpl().then((() => Promise.all([this._applyFunctionIfNeeded("addMarkers", markerOptions), this._applyFunctionIfNeeded("addRoutes", routeOptions)]).then((() => true))))
    },
    _renderImpl: abstract,
    updateDimensions: abstract,
    updateMapType: abstract,
    updateBounds: abstract,
    updateCenter: abstract,
    updateZoom: abstract,
    updateControls: abstract,
    updateMarkers(markerOptionsToRemove, markerOptionsToAdd) {
        return new Promise((resolve => this._applyFunctionIfNeeded("removeMarkers", markerOptionsToRemove).then((removeValue => {
            this._applyFunctionIfNeeded("addMarkers", markerOptionsToAdd).then((addValue => {
                resolve(addValue || removeValue)
            }))
        }))))
    },
    addMarkers: abstract,
    removeMarkers: abstract,
    adjustViewport: abstract,
    updateRoutes(routeOptionsToRemove, routeOptionsToAdd) {
        return new Promise((resolve => this._applyFunctionIfNeeded("removeRoutes", routeOptionsToRemove).then((removeValue => {
            this._applyFunctionIfNeeded("addRoutes", routeOptionsToAdd).then((addValue => {
                resolve(addValue || removeValue)
            }))
        }))))
    },
    addRoutes: abstract,
    removeRoutes: abstract,
    clean: abstract,
    map() {
        return this._map
    },
    isEventsCanceled: () => false,
    _option(name, value) {
        if (void 0 === value) {
            return this._mapWidget.option(name)
        }
        this._mapWidget.setOptionSilent(name, value)
    },
    _keyOption(providerName) {
        const key = this._option("apiKey");
        return void 0 === key[providerName] ? key : key[providerName]
    },
    _parseTooltipOptions: option => ({
        text: option.text || option,
        visible: option.isShown || false
    }),
    _getLatLng(location) {
        if ("string" === typeof location) {
            const coords = map(location.split(","), (item => item.trim()));
            const numericRegex = /^[-+]?[0-9]*\.?[0-9]*$/;
            if (2 === coords.length && coords[0].match(numericRegex) && coords[1].match(numericRegex)) {
                return {
                    lat: parseFloat(coords[0]),
                    lng: parseFloat(coords[1])
                }
            }
        } else if (Array.isArray(location) && 2 === location.length) {
            return {
                lat: location[0],
                lng: location[1]
            }
        } else if (isPlainObject(location) && isNumeric(location.lat) && isNumeric(location.lng)) {
            return location
        }
        return null
    },
    _areBoundsSet() {
        return this._option("bounds.northEast") && this._option("bounds.southWest")
    },
    _addEventNamespace(name) {
        return addNamespace(name, this._mapWidget.NAME)
    },
    _applyFunctionIfNeeded(fnName, array) {
        if (!array.length) {
            return Promise.resolve()
        }
        return this[fnName](array)
    },
    _fireAction(name, actionArguments) {
        this._mapWidget._createActionByOption(name)(actionArguments)
    },
    _fireClickAction(actionArguments) {
        this._fireAction("onClick", actionArguments)
    },
    _fireMarkerAddedAction(actionArguments) {
        this._fireAction("onMarkerAdded", actionArguments)
    },
    _fireMarkerRemovedAction(actionArguments) {
        this._fireAction("onMarkerRemoved", actionArguments)
    },
    _fireRouteAddedAction(actionArguments) {
        this._fireAction("onRouteAdded", actionArguments)
    },
    _fireRouteRemovedAction(actionArguments) {
        this._fireAction("onRouteRemoved", actionArguments)
    }
});
export default Provider;
