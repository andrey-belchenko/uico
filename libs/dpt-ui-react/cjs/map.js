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
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = exports.Route = exports.Marker = exports.Location = exports.Center = exports.ApiKey = exports.Map = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const map_1 = __importDefault(require("dpt-ui/ui/map"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Map = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["center", "markers", "routes", "zoom"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onClick", "onDisposing", "onInitialized", "onMarkerAdded", "onMarkerRemoved", "onReady", "onRouteAdded", "onRouteRemoved"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultCenter: "center",
        defaultMarkers: "markers",
        defaultRoutes: "routes",
        defaultZoom: "zoom",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        apiKey: { optionName: "apiKey", isCollectionItem: false },
        center: { optionName: "center", isCollectionItem: false },
        marker: { optionName: "markers", isCollectionItem: true },
        route: { optionName: "routes", isCollectionItem: true }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: map_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.Map = Map;
const _componentApiKey = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ApiKey = Object.assign(_componentApiKey, {
    OptionName: "apiKey",
});
exports.ApiKey = ApiKey;
const _componentCenter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Center = Object.assign(_componentCenter, {
    OptionName: "center",
});
exports.Center = Center;
const _componentLocation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Location = Object.assign(_componentLocation, {
    OptionName: "location",
});
exports.Location = Location;
const _componentMarker = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Marker = Object.assign(_componentMarker, {
    OptionName: "markers",
    IsCollectionItem: true,
    ExpectedChildren: {
        location: { optionName: "location", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    },
});
exports.Marker = Marker;
const _componentRoute = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Route = Object.assign(_componentRoute, {
    OptionName: "routes",
    IsCollectionItem: true,
    ExpectedChildren: {
        location: { optionName: "locations", isCollectionItem: true }
    },
});
exports.Route = Route;
const _componentTooltip = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tooltip = Object.assign(_componentTooltip, {
    OptionName: "tooltip",
});
exports.Tooltip = Tooltip;
exports.default = Map;
