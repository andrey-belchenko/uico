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
exports.TreeMapborder = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.TileLabel = exports.Tile = exports.Subtitle = exports.Size = exports.Shadow = exports.SelectionStyle = exports.Margin = exports.LoadingIndicator = exports.Label = exports.HoverStyle = exports.GroupLabel = exports.Group = exports.Format = exports.Font = exports.Export = exports.Colorizer = exports.Border = exports.TreeMap = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const tree_map_1 = __importDefault(require("dpt-ui/viz/tree_map"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const TreeMap = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onClick", "onDisposing", "onDrawn", "onDrill", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onNodesInitialized", "onNodesRendering"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        colorizer: { optionName: "colorizer", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        group: { optionName: "group", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        tile: { optionName: "tile", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: tree_map_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.TreeMap = TreeMap;
const _componentBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
exports.Border = Border;
const _componentColorizer = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Colorizer = Object.assign(_componentColorizer, {
    OptionName: "colorizer",
});
exports.Colorizer = Colorizer;
const _componentExport = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
exports.Export = Export;
const _componentFont = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Font = Object.assign(_componentFont, {
    OptionName: "font",
});
exports.Font = Font;
const _componentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
exports.Format = Format;
const _componentGroup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Group = Object.assign(_componentGroup, {
    OptionName: "group",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        groupLabel: { optionName: "label", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        treeMapborder: { optionName: "border", isCollectionItem: false }
    },
});
exports.Group = Group;
const _componentGroupLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupLabel = Object.assign(_componentGroupLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.GroupLabel = GroupLabel;
const _componentHoverStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HoverStyle = Object.assign(_componentHoverStyle, {
    OptionName: "hoverStyle",
});
exports.HoverStyle = HoverStyle;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
});
exports.Label = Label;
const _componentLoadingIndicator = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LoadingIndicator = Object.assign(_componentLoadingIndicator, {
    OptionName: "loadingIndicator",
    DefaultsProps: {
        defaultShow: "show"
    },
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.LoadingIndicator = LoadingIndicator;
const _componentMargin = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Margin = Object.assign(_componentMargin, {
    OptionName: "margin",
});
exports.Margin = Margin;
const _componentSelectionStyle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SelectionStyle = Object.assign(_componentSelectionStyle, {
    OptionName: "selectionStyle",
});
exports.SelectionStyle = SelectionStyle;
const _componentShadow = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Shadow = Object.assign(_componentShadow, {
    OptionName: "shadow",
});
exports.Shadow = Shadow;
const _componentSize = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
exports.Size = Size;
const _componentSubtitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.Subtitle = Subtitle;
const _componentTile = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tile = Object.assign(_componentTile, {
    OptionName: "tile",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        tileLabel: { optionName: "label", isCollectionItem: false },
        treeMapborder: { optionName: "border", isCollectionItem: false }
    },
});
exports.Tile = Tile;
const _componentTileLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TileLabel = Object.assign(_componentTileLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
exports.TileLabel = TileLabel;
const _componentTitle = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
exports.Title = Title;
const _componentTooltip = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tooltip = Object.assign(_componentTooltip, {
    OptionName: "tooltip",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false },
        tooltipBorder: { optionName: "border", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }],
});
exports.Tooltip = Tooltip;
const _componentTooltipBorder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TooltipBorder = Object.assign(_componentTooltipBorder, {
    OptionName: "border",
});
exports.TooltipBorder = TooltipBorder;
const _componentTreeMapborder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TreeMapborder = Object.assign(_componentTreeMapborder, {
    OptionName: "border",
});
exports.TreeMapborder = TreeMapborder;
exports.default = TreeMap;
