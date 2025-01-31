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
exports.ZoomLevel = exports.ViewToolbar = exports.ToolboxGroup = exports.Toolbox = exports.TabGroup = exports.Tab = exports.PropertiesPanel = exports.PageSizeItem = exports.PageSize = exports.Nodes = exports.MainToolbar = exports.Item = exports.HistoryToolbar = exports.Group = exports.GridSize = exports.Export = exports.Editing = exports.Edges = exports.DefaultItemProperties = exports.CustomShape = exports.ContextToolbox = exports.ContextMenu = exports.ConnectionPoint = exports.CommandItem = exports.Command = exports.AutoLayout = exports.Diagram = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const diagram_1 = __importDefault(require("dpt-ui/ui/diagram"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Diagram = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["gridSize", "gridSize.value", "pageSize", "pageSize.height", "pageSize.width", "zoomLevel", "zoomLevel.value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onCustomCommand", "onDisposing", "onInitialized", "onItemClick", "onItemDblClick", "onRequestEditOperation", "onRequestLayoutUpdate"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultGridSize: "gridSize",
        defaultPageSize: "pageSize",
        defaultZoomLevel: "zoomLevel",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        contextMenu: { optionName: "contextMenu", isCollectionItem: false },
        contextToolbox: { optionName: "contextToolbox", isCollectionItem: false },
        customShape: { optionName: "customShapes", isCollectionItem: true },
        defaultItemProperties: { optionName: "defaultItemProperties", isCollectionItem: false },
        edges: { optionName: "edges", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        gridSize: { optionName: "gridSize", isCollectionItem: false },
        historyToolbar: { optionName: "historyToolbar", isCollectionItem: false },
        mainToolbar: { optionName: "mainToolbar", isCollectionItem: false },
        nodes: { optionName: "nodes", isCollectionItem: false },
        pageSize: { optionName: "pageSize", isCollectionItem: false },
        propertiesPanel: { optionName: "propertiesPanel", isCollectionItem: false },
        toolbox: { optionName: "toolbox", isCollectionItem: false },
        viewToolbar: { optionName: "viewToolbar", isCollectionItem: false },
        zoomLevel: { optionName: "zoomLevel", isCollectionItem: false }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "customShapeTemplate",
            render: "customShapeRender",
            component: "customShapeComponent"
        },
        {
            tmplOption: "customShapeToolboxTemplate",
            render: "customShapeToolboxRender",
            component: "customShapeToolboxComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: diagram_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.Diagram = Diagram;
const _componentAutoLayout = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AutoLayout = Object.assign(_componentAutoLayout, {
    OptionName: "autoLayout",
});
exports.AutoLayout = AutoLayout;
const _componentCommand = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Command = Object.assign(_componentCommand, {
    OptionName: "commands",
    IsCollectionItem: true,
});
exports.Command = Command;
const _componentCommandItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CommandItem = Object.assign(_componentCommandItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.CommandItem = CommandItem;
const _componentConnectionPoint = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ConnectionPoint = Object.assign(_componentConnectionPoint, {
    OptionName: "connectionPoints",
    IsCollectionItem: true,
});
exports.ConnectionPoint = ConnectionPoint;
const _componentContextMenu = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
exports.ContextMenu = ContextMenu;
const _componentContextToolbox = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ContextToolbox = Object.assign(_componentContextToolbox, {
    OptionName: "contextToolbox",
});
exports.ContextToolbox = ContextToolbox;
const _componentCustomShape = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CustomShape = Object.assign(_componentCustomShape, {
    OptionName: "customShapes",
    IsCollectionItem: true,
    ExpectedChildren: {
        connectionPoint: { optionName: "connectionPoints", isCollectionItem: true }
    },
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "toolboxTemplate",
            render: "toolboxRender",
            component: "toolboxComponent"
        }],
});
exports.CustomShape = CustomShape;
const _componentDefaultItemProperties = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DefaultItemProperties = Object.assign(_componentDefaultItemProperties, {
    OptionName: "defaultItemProperties",
});
exports.DefaultItemProperties = DefaultItemProperties;
const _componentEdges = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Edges = Object.assign(_componentEdges, {
    OptionName: "edges",
});
exports.Edges = Edges;
const _componentEditing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
});
exports.Editing = Editing;
const _componentExport = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
exports.Export = Export;
const _componentGridSize = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GridSize = Object.assign(_componentGridSize, {
    OptionName: "gridSize",
    DefaultsProps: {
        defaultValue: "value"
    },
});
exports.GridSize = GridSize;
const _componentGroup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Group = Object.assign(_componentGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
});
exports.Group = Group;
const _componentHistoryToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HistoryToolbar = Object.assign(_componentHistoryToolbar, {
    OptionName: "historyToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
exports.HistoryToolbar = HistoryToolbar;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.Item = Item;
const _componentMainToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MainToolbar = Object.assign(_componentMainToolbar, {
    OptionName: "mainToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
exports.MainToolbar = MainToolbar;
const _componentNodes = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Nodes = Object.assign(_componentNodes, {
    OptionName: "nodes",
    ExpectedChildren: {
        autoLayout: { optionName: "autoLayout", isCollectionItem: false }
    },
});
exports.Nodes = Nodes;
const _componentPageSize = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PageSize = Object.assign(_componentPageSize, {
    OptionName: "pageSize",
    DefaultsProps: {
        defaultHeight: "height",
        defaultWidth: "width"
    },
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        pageSizeItem: { optionName: "items", isCollectionItem: true }
    },
});
exports.PageSize = PageSize;
const _componentPageSizeItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PageSizeItem = Object.assign(_componentPageSizeItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.PageSizeItem = PageSizeItem;
const _componentPropertiesPanel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PropertiesPanel = Object.assign(_componentPropertiesPanel, {
    OptionName: "propertiesPanel",
    ExpectedChildren: {
        tab: { optionName: "tabs", isCollectionItem: true }
    },
});
exports.PropertiesPanel = PropertiesPanel;
const _componentTab = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tab = Object.assign(_componentTab, {
    OptionName: "tabs",
    IsCollectionItem: true,
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true },
        group: { optionName: "groups", isCollectionItem: true },
        tabGroup: { optionName: "groups", isCollectionItem: true }
    },
});
exports.Tab = Tab;
const _componentTabGroup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TabGroup = Object.assign(_componentTabGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
exports.TabGroup = TabGroup;
const _componentToolbox = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Toolbox = Object.assign(_componentToolbox, {
    OptionName: "toolbox",
    ExpectedChildren: {
        group: { optionName: "groups", isCollectionItem: true },
        toolboxGroup: { optionName: "groups", isCollectionItem: true }
    },
});
exports.Toolbox = Toolbox;
const _componentToolboxGroup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ToolboxGroup = Object.assign(_componentToolboxGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
});
exports.ToolboxGroup = ToolboxGroup;
const _componentViewToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ViewToolbar = Object.assign(_componentViewToolbar, {
    OptionName: "viewToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
exports.ViewToolbar = ViewToolbar;
const _componentZoomLevel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ZoomLevel = Object.assign(_componentZoomLevel, {
    OptionName: "zoomLevel",
    DefaultsProps: {
        defaultValue: "value"
    },
});
exports.ZoomLevel = ZoomLevel;
exports.default = Diagram;
