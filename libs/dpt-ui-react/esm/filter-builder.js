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
import dxFilterBuilder from "dpt-ui/ui/filter_builder";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const FilterBuilder = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["value"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onEditorPrepared", "onEditorPreparing", "onInitialized", "onValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultValue: "value",
    }), []);
    const expectedChildren = useMemo(() => ({
        customOperation: { optionName: "customOperations", isCollectionItem: true },
        field: { optionName: "fields", isCollectionItem: true },
        filterOperationDescriptions: { optionName: "filterOperationDescriptions", isCollectionItem: false },
        groupOperationDescriptions: { optionName: "groupOperationDescriptions", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxFilterBuilder,
        ref: baseRef,
        useRequestAnimationFrameFlag: true,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentCustomOperation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CustomOperation = Object.assign(_componentCustomOperation, {
    OptionName: "customOperations",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent"
        }],
});
const _componentField = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Field = Object.assign(_componentField, {
    OptionName: "fields",
    IsCollectionItem: true,
    ExpectedChildren: {
        format: { optionName: "format", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent"
        }],
});
const _componentFilterOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterOperationDescriptions = Object.assign(_componentFilterOperationDescriptions, {
    OptionName: "filterOperationDescriptions",
});
const _componentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
const _componentGroupOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GroupOperationDescriptions = Object.assign(_componentGroupOperationDescriptions, {
    OptionName: "groupOperationDescriptions",
});
const _componentLookup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Lookup = Object.assign(_componentLookup, {
    OptionName: "lookup",
});
export default FilterBuilder;
export { FilterBuilder, CustomOperation, Field, FilterOperationDescriptions, Format, GroupOperationDescriptions, Lookup };
