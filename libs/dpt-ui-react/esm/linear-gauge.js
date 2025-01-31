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
import dxLinearGauge from "dpt-ui/viz/linear_gauge";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const LinearGauge = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show", "subvalues", "value"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onTooltipHidden", "onTooltipShown"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultSubvalues: "subvalues",
        defaultValue: "value",
    }), []);
    const expectedChildren = useMemo(() => ({
        animation: { optionName: "animation", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        geometry: { optionName: "geometry", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        rangeContainer: { optionName: "rangeContainer", isCollectionItem: false },
        scale: { optionName: "scale", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        subvalueIndicator: { optionName: "subvalueIndicator", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false },
        valueIndicator: { optionName: "valueIndicator", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxLinearGauge,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAnimation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
});
const _componentBackgroundColor = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BackgroundColor = Object.assign(_componentBackgroundColor, {
    OptionName: "backgroundColor",
});
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
const _componentColor = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Color = Object.assign(_componentColor, {
    OptionName: "color",
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
const _componentGeometry = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Geometry = Object.assign(_componentGeometry, {
    OptionName: "geometry",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
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
const _componentMinorTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MinorTick = Object.assign(_componentMinorTick, {
    OptionName: "minorTick",
});
const _componentRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Range = Object.assign(_componentRange, {
    OptionName: "ranges",
    IsCollectionItem: true,
    ExpectedChildren: {
        color: { optionName: "color", isCollectionItem: false }
    },
});
const _componentRangeContainer = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RangeContainer = Object.assign(_componentRangeContainer, {
    OptionName: "rangeContainer",
    ExpectedChildren: {
        backgroundColor: { optionName: "backgroundColor", isCollectionItem: false },
        range: { optionName: "ranges", isCollectionItem: true },
        width: { optionName: "width", isCollectionItem: false }
    },
});
const _componentScale = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Scale = Object.assign(_componentScale, {
    OptionName: "scale",
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false }
    },
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
const _componentSubvalueIndicator = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SubvalueIndicator = Object.assign(_componentSubvalueIndicator, {
    OptionName: "subvalueIndicator",
    ExpectedChildren: {
        color: { optionName: "color", isCollectionItem: false },
        text: { optionName: "text", isCollectionItem: false }
    },
});
const _componentText = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Text = Object.assign(_componentText, {
    OptionName: "text",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    },
});
const _componentTick = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tick = Object.assign(_componentTick, {
    OptionName: "tick",
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
        shadow: { optionName: "shadow", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }],
});
const _componentValueIndicator = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValueIndicator = Object.assign(_componentValueIndicator, {
    OptionName: "valueIndicator",
});
const _componentWidth = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Width = Object.assign(_componentWidth, {
    OptionName: "width",
});
export default LinearGauge;
export { LinearGauge, Animation, BackgroundColor, Border, Color, Export, Font, Format, Geometry, Label, LoadingIndicator, Margin, MinorTick, Range, RangeContainer, Scale, Shadow, Size, Subtitle, SubvalueIndicator, Text, Tick, Title, Tooltip, ValueIndicator, Width };
