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
import dxBarGauge from "dpt-ui/viz/bar_gauge";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const BarGauge = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show", "values"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onTooltipHidden", "onTooltipShown"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
        defaultValues: "values",
    }), []);
    const expectedChildren = useMemo(() => ({
        animation: { optionName: "animation", isCollectionItem: false },
        barGaugeTitle: { optionName: "title", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        geometry: { optionName: "geometry", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        legend: { optionName: "legend", isCollectionItem: false },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "centerTemplate",
            render: "centerRender",
            component: "centerComponent"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxBarGauge,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
const _componentAnimation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
});
const _componentBarGaugeTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BarGaugeTitle = Object.assign(_componentBarGaugeTitle, {
    OptionName: "title",
    ExpectedChildren: {
        barGaugeTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
const _componentBarGaugeTitleSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BarGaugeTitleSubtitle = Object.assign(_componentBarGaugeTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
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
const _componentGeometry = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Geometry = Object.assign(_componentGeometry, {
    OptionName: "geometry",
});
const _componentItemTextFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ItemTextFormat = Object.assign(_componentItemTextFormat, {
    OptionName: "itemTextFormat",
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
const _componentLegend = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Legend = Object.assign(_componentLegend, {
    OptionName: "legend",
    ExpectedChildren: {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        itemTextFormat: { optionName: "itemTextFormat", isCollectionItem: false },
        legendBorder: { optionName: "border", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "markerTemplate",
            render: "markerRender",
            component: "markerComponent"
        }],
});
const _componentLegendBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LegendBorder = Object.assign(_componentLegendBorder, {
    OptionName: "border",
});
const _componentLegendTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LegendTitle = Object.assign(_componentLegendTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        legendTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
const _componentLegendTitleSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LegendTitleSubtitle = Object.assign(_componentLegendTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
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
});
const _componentTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Title = Object.assign(_componentTitle, {
    OptionName: "title",
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
export default BarGauge;
export { BarGauge, Animation, BarGaugeTitle, BarGaugeTitleSubtitle, Border, Export, Font, Format, Geometry, ItemTextFormat, Label, Legend, LegendBorder, LegendTitle, LegendTitleSubtitle, LoadingIndicator, Margin, Shadow, Size, Subtitle, Title, Tooltip, TooltipBorder };
