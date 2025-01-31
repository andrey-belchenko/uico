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
import dxTreeMap from "dpt-ui/viz/tree_map";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const TreeMap = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = useMemo(() => (["onClick", "onDisposing", "onDrawn", "onDrill", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onNodesInitialized", "onNodesRendering"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = useMemo(() => ({
        colorizer: { optionName: "colorizer", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        group: { optionName: "group", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        tile: { optionName: "tile", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxTreeMap,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
const _componentColorizer = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Colorizer = Object.assign(_componentColorizer, {
    OptionName: "colorizer",
});
const _componentExport = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
const _componentFont = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Font = Object.assign(_componentFont, {
    OptionName: "font",
});
const _componentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
const _componentGroup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentGroupLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GroupLabel = Object.assign(_componentGroupLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentHoverStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HoverStyle = Object.assign(_componentHoverStyle, {
    OptionName: "hoverStyle",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
});
const _componentLoadingIndicator = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentMargin = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Margin = Object.assign(_componentMargin, {
    OptionName: "margin",
});
const _componentSelectionStyle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SelectionStyle = Object.assign(_componentSelectionStyle, {
    OptionName: "selectionStyle",
});
const _componentShadow = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Shadow = Object.assign(_componentShadow, {
    OptionName: "shadow",
});
const _componentSize = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Size = Object.assign(_componentSize, {
    OptionName: "size",
});
const _componentSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Subtitle = Object.assign(_componentSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentTile = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTileLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TileLabel = Object.assign(_componentTileLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
const _componentTooltip = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTooltipBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TooltipBorder = Object.assign(_componentTooltipBorder, {
    OptionName: "border",
});
const _componentTreeMapborder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TreeMapborder = Object.assign(_componentTreeMapborder, {
    OptionName: "border",
});
export default TreeMap;
export { TreeMap, Border, Colorizer, Export, Font, Format, Group, GroupLabel, HoverStyle, Label, LoadingIndicator, Margin, SelectionStyle, Shadow, Size, Subtitle, Tile, TileLabel, Title, Tooltip, TooltipBorder, TreeMapborder };
