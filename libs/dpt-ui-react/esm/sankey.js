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
import dxSankey from "dpt-ui/viz/sankey";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Sankey = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLinkClick", "onNodeClick"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = useMemo(() => ({
        adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        link: { optionName: "link", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        node: { optionName: "node", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxSankey,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAdaptiveLayout = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AdaptiveLayout = Object.assign(_componentAdaptiveLayout, {
    OptionName: "adaptiveLayout",
});
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
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
const _componentHatching = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Hatching = Object.assign(_componentHatching, {
    OptionName: "hatching",
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
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false }
    },
});
const _componentLink = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Link = Object.assign(_componentLink, {
    OptionName: "link",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false }
    },
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
const _componentNode = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Node = Object.assign(_componentNode, {
    OptionName: "node",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false }
    },
});
const _componentSankeyborder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Sankeyborder = Object.assign(_componentSankeyborder, {
    OptionName: "border",
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
            tmplOption: "linkTooltipTemplate",
            render: "linkTooltipRender",
            component: "linkTooltipComponent"
        }, {
            tmplOption: "nodeTooltipTemplate",
            render: "nodeTooltipRender",
            component: "nodeTooltipComponent"
        }],
});
const _componentTooltipBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TooltipBorder = Object.assign(_componentTooltipBorder, {
    OptionName: "border",
});
export default Sankey;
export { Sankey, AdaptiveLayout, Border, Export, Font, Format, Hatching, HoverStyle, Label, Link, LoadingIndicator, Margin, Node, Sankeyborder, Shadow, Size, Subtitle, Title, Tooltip, TooltipBorder };
