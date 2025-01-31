/**
 * DevExtreme (esm/__internal/ui/map/m_provider.dynamic.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../../core/utils/extend";
import {
    each,
    map
} from "../../../core/utils/iterator";
import Provider from "./m_provider";
const {
    abstract: abstract
} = Provider;
const DynamicProvider = Provider.inherit({
    _geocodeLocation(location) {
        return new Promise((resolve => {
            const cache = this._geocodedLocations;
            const cachedLocation = cache[location];
            if (cachedLocation) {
                resolve(cachedLocation)
            } else {
                this._geocodeLocationImpl(location).then((geocodedLocation => {
                    cache[location] = geocodedLocation;
                    resolve(geocodedLocation)
                }))
            }
        }))
    },
    _renderImpl() {
        return this._load().then((() => this._init())).then((() => Promise.all([this.updateMapType(), this._areBoundsSet() ? this.updateBounds() : this.updateCenter()]))).then((() => {
            this._attachHandlers();
            return new Promise((resolve => {
                const timeout = setTimeout((() => {
                    clearTimeout(timeout);
                    resolve()
                }))
            }))
        }))
    },
    _load() {
        if (!this._mapsLoader) {
            this._mapsLoader = this._loadImpl()
        }
        this._markers = [];
        this._routes = [];
        return this._mapsLoader
    },
    _loadImpl: abstract,
    _init: abstract,
    _attachHandlers: abstract,
    addMarkers(options) {
        return Promise.all(map(options, (options => this._addMarker(options)))).then((markerObjects => {
            this._fitBounds();
            return [false, map(markerObjects, (markerObject => markerObject.marker))]
        }))
    },
    _addMarker(options) {
        return this._renderMarker(options).then((markerObject => {
            this._markers.push(extend({
                options: options
            }, markerObject));
            this._fireMarkerAddedAction({
                options: options,
                originalMarker: markerObject.marker
            });
            return markerObject
        }))
    },
    _renderMarker: abstract,
    removeMarkers(markersOptionsToRemove) {
        const that = this;
        each(markersOptionsToRemove, ((_, markerOptionToRemove) => {
            that._removeMarker(markerOptionToRemove)
        }));
        return Promise.resolve()
    },
    _removeMarker(markersOptionToRemove) {
        const that = this;
        each(this._markers, ((markerIndex, markerObject) => {
            if (markerObject.options !== markersOptionToRemove) {
                return true
            }
            that._destroyMarker(markerObject);
            that._markers.splice(markerIndex, 1);
            that._fireMarkerRemovedAction({
                options: markerObject.options
            });
            return false
        }))
    },
    _destroyMarker: abstract,
    _clearMarkers() {
        while (this._markers.length > 0) {
            this._removeMarker(this._markers[0].options)
        }
    },
    addRoutes(options) {
        return Promise.all(map(options, (options => this._addRoute(options)))).then((routeObjects => {
            this._fitBounds();
            return [false, map(routeObjects, (routeObject => routeObject.instance))]
        }))
    },
    _addRoute(options) {
        return this._renderRoute(options).then((routeObject => {
            this._routes.push(extend({
                options: options
            }, routeObject));
            this._fireRouteAddedAction({
                options: options,
                originalRoute: routeObject.instance
            });
            return routeObject
        }))
    },
    _renderRoute: abstract,
    removeRoutes(options) {
        const that = this;
        each(options, ((routeIndex, options) => {
            that._removeRoute(options)
        }));
        return Promise.resolve()
    },
    _removeRoute(options) {
        const that = this;
        each(this._routes, ((routeIndex, routeObject) => {
            if (routeObject.options !== options) {
                return true
            }
            that._destroyRoute(routeObject);
            that._routes.splice(routeIndex, 1);
            that._fireRouteRemovedAction({
                options: options
            });
            return false
        }))
    },
    _destroyRoute: abstract,
    _clearRoutes() {
        while (this._routes.length > 0) {
            this._removeRoute(this._routes[0].options)
        }
    },
    adjustViewport() {
        return this._fitBounds()
    },
    isEventsCanceled: () => true,
    _fitBounds: abstract,
    _updateBounds() {
        const that = this;
        this._clearBounds();
        if (!this._option("autoAdjust")) {
            return
        }
        each(this._markers, ((_, markerObject) => {
            that._extendBounds(markerObject.location)
        }));
        each(this._routes, ((_, routeObject) => {
            routeObject.northEast && that._extendBounds(routeObject.northEast);
            routeObject.southWest && that._extendBounds(routeObject.southWest)
        }))
    },
    _clearBounds() {
        this._bounds = null
    },
    _extendBounds: abstract
});
export default DynamicProvider;
