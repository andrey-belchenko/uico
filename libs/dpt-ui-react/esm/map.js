/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

"use client";
import * as React from "react";
import { memo, forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import dxMap from "dpt-ui/ui/map";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Map = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["center", "markers", "routes", "zoom"]), []);
    const independentEvents = useMemo(() => (["onClick", "onDisposing", "onInitialized", "onMarkerAdded", "onMarkerRemoved", "onReady", "onRouteAdded", "onRouteRemoved"]), []);
    const defaults = useMemo(() => ({
        defaultCenter: "center",
        defaultMarkers: "markers",
        defaultRoutes: "routes",
        defaultZoom: "zoom",
    }), []);
    const expectedChildren = useMemo(() => ({
        apiKey: { optionName: "apiKey", isCollectionItem: false },
        center: { optionName: "center", isCollectionItem: false },
        marker: { optionName: "markers", isCollectionItem: true },
        route: { optionName: "routes", isCollectionItem: true }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxMap,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentApiKey = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ApiKey = Object.assign(_componentApiKey, {
    OptionName: "apiKey",
});
const _componentCenter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Center = Object.assign(_componentCenter, {
    OptionName: "center",
});
const _componentLocation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Location = Object.assign(_componentLocation, {
    OptionName: "location",
});
const _componentMarker = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Marker = Object.assign(_componentMarker, {
    OptionName: "markers",
    IsCollectionItem: true,
    ExpectedChildren: {
        location: { optionName: "location", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    },
});
const _componentRoute = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Route = Object.assign(_componentRoute, {
    OptionName: "routes",
    IsCollectionItem: true,
    ExpectedChildren: {
        location: { optionName: "locations", isCollectionItem: true }
    },
});
const _componentTooltip = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tooltip = Object.assign(_componentTooltip, {
    OptionName: "tooltip",
});
export default Map;
export { Map, ApiKey, Center, Location, Marker, Route, Tooltip };
