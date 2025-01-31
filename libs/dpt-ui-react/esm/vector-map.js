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
import dxVectorMap from "dpt-ui/viz/vector_map";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const VectorMap = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["loadingIndicator", "loadingIndicator.show"]), []);
    const independentEvents = useMemo(() => (["onClick", "onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onTooltipHidden", "onTooltipShown"]), []);
    const defaults = useMemo(() => ({
        defaultLoadingIndicator: "loadingIndicator",
    }), []);
    const expectedChildren = useMemo(() => ({
        annotation: { optionName: "annotations", isCollectionItem: true },
        background: { optionName: "background", isCollectionItem: false },
        commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
        controlBar: { optionName: "controlBar", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        layer: { optionName: "layers", isCollectionItem: true },
        legend: { optionName: "legends", isCollectionItem: true },
        loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
        projection: { optionName: "projection", isCollectionItem: false },
        size: { optionName: "size", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false },
        vectorMapTitle: { optionName: "title", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxVectorMap,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAnnotation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Annotation = Object.assign(_componentAnnotation, {
    OptionName: "annotations",
    IsCollectionItem: true,
    ExpectedChildren: {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent"
        }],
});
const _componentAnnotationBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AnnotationBorder = Object.assign(_componentAnnotationBorder, {
    OptionName: "border",
});
const _componentBackground = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Background = Object.assign(_componentBackground, {
    OptionName: "background",
});
const _componentBorder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Border = Object.assign(_componentBorder, {
    OptionName: "border",
});
const _componentCommonAnnotationSettings = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CommonAnnotationSettings = Object.assign(_componentCommonAnnotationSettings, {
    OptionName: "commonAnnotationSettings",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent"
        }],
});
const _componentControlBar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ControlBar = Object.assign(_componentControlBar, {
    OptionName: "controlBar",
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
const _componentImage = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Image = Object.assign(_componentImage, {
    OptionName: "image",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
const _componentLayer = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Layer = Object.assign(_componentLayer, {
    OptionName: "layers",
    IsCollectionItem: true,
    ExpectedChildren: {
        label: { optionName: "label", isCollectionItem: false }
    },
});
const _componentLegend = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Legend = Object.assign(_componentLegend, {
    OptionName: "legends",
    IsCollectionItem: true,
    ExpectedChildren: {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        source: { optionName: "source", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "markerTemplate",
            render: "markerRender",
            component: "markerComponent"
        }],
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
const _componentProjection = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Projection = Object.assign(_componentProjection, {
    OptionName: "projection",
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
const _componentSource = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Source = Object.assign(_componentSource, {
    OptionName: "source",
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
const _componentVectorMapTitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const VectorMapTitle = Object.assign(_componentVectorMapTitle, {
    OptionName: "title",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false },
        vectorMapTitleSubtitle: { optionName: "subtitle", isCollectionItem: false }
    },
});
const _componentVectorMapTitleSubtitle = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const VectorMapTitleSubtitle = Object.assign(_componentVectorMapTitleSubtitle, {
    OptionName: "subtitle",
    ExpectedChildren: {
        font: { optionName: "font", isCollectionItem: false }
    },
});
export default VectorMap;
export { VectorMap, Annotation, AnnotationBorder, Background, Border, CommonAnnotationSettings, ControlBar, Export, Font, Image, Label, Layer, Legend, LegendTitle, LegendTitleSubtitle, LoadingIndicator, Margin, Projection, Shadow, Size, Source, Subtitle, Title, Tooltip, TooltipBorder, VectorMapTitle, VectorMapTitleSubtitle };
