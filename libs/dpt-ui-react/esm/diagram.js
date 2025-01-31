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
import dxDiagram from "dpt-ui/ui/diagram";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Diagram = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["gridSize", "gridSize.value", "pageSize", "pageSize.height", "pageSize.width", "zoomLevel", "zoomLevel.value"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onCustomCommand", "onDisposing", "onInitialized", "onItemClick", "onItemDblClick", "onRequestEditOperation", "onRequestLayoutUpdate"]), []);
    const defaults = useMemo(() => ({
        defaultGridSize: "gridSize",
        defaultPageSize: "pageSize",
        defaultZoomLevel: "zoomLevel",
    }), []);
    const expectedChildren = useMemo(() => ({
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
    const templateProps = useMemo(() => ([
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
    return (React.createElement((BaseComponent), {
        WidgetClass: dxDiagram,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
const _componentAutoLayout = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AutoLayout = Object.assign(_componentAutoLayout, {
    OptionName: "autoLayout",
});
const _componentCommand = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Command = Object.assign(_componentCommand, {
    OptionName: "commands",
    IsCollectionItem: true,
});
const _componentCommandItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CommandItem = Object.assign(_componentCommandItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentConnectionPoint = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ConnectionPoint = Object.assign(_componentConnectionPoint, {
    OptionName: "connectionPoints",
    IsCollectionItem: true,
});
const _componentContextMenu = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
const _componentContextToolbox = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextToolbox = Object.assign(_componentContextToolbox, {
    OptionName: "contextToolbox",
});
const _componentCustomShape = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentDefaultItemProperties = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const DefaultItemProperties = Object.assign(_componentDefaultItemProperties, {
    OptionName: "defaultItemProperties",
});
const _componentEdges = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Edges = Object.assign(_componentEdges, {
    OptionName: "edges",
});
const _componentEditing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
});
const _componentExport = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
const _componentGridSize = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GridSize = Object.assign(_componentGridSize, {
    OptionName: "gridSize",
    DefaultsProps: {
        defaultValue: "value"
    },
});
const _componentGroup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Group = Object.assign(_componentGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
});
const _componentHistoryToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HistoryToolbar = Object.assign(_componentHistoryToolbar, {
    OptionName: "historyToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
const _componentItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentMainToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MainToolbar = Object.assign(_componentMainToolbar, {
    OptionName: "mainToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
const _componentNodes = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Nodes = Object.assign(_componentNodes, {
    OptionName: "nodes",
    ExpectedChildren: {
        autoLayout: { optionName: "autoLayout", isCollectionItem: false }
    },
});
const _componentPageSize = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentPageSizeItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PageSizeItem = Object.assign(_componentPageSizeItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentPropertiesPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PropertiesPanel = Object.assign(_componentPropertiesPanel, {
    OptionName: "propertiesPanel",
    ExpectedChildren: {
        tab: { optionName: "tabs", isCollectionItem: true }
    },
});
const _componentTab = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTabGroup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TabGroup = Object.assign(_componentTabGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
const _componentToolbox = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Toolbox = Object.assign(_componentToolbox, {
    OptionName: "toolbox",
    ExpectedChildren: {
        group: { optionName: "groups", isCollectionItem: true },
        toolboxGroup: { optionName: "groups", isCollectionItem: true }
    },
});
const _componentToolboxGroup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ToolboxGroup = Object.assign(_componentToolboxGroup, {
    OptionName: "groups",
    IsCollectionItem: true,
});
const _componentViewToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ViewToolbar = Object.assign(_componentViewToolbar, {
    OptionName: "viewToolbar",
    ExpectedChildren: {
        command: { optionName: "commands", isCollectionItem: true }
    },
});
const _componentZoomLevel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ZoomLevel = Object.assign(_componentZoomLevel, {
    OptionName: "zoomLevel",
    DefaultsProps: {
        defaultValue: "value"
    },
});
export default Diagram;
export { Diagram, AutoLayout, Command, CommandItem, ConnectionPoint, ContextMenu, ContextToolbox, CustomShape, DefaultItemProperties, Edges, Editing, Export, GridSize, Group, HistoryToolbar, Item, MainToolbar, Nodes, PageSize, PageSizeItem, PropertiesPanel, Tab, TabGroup, Toolbox, ToolboxGroup, ViewToolbar, ZoomLevel };
