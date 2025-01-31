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
import dxForm from "dpt-ui/ui/form";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Form = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["formData"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onEditorEnterKey", "onInitialized"]), []);
    const defaults = useMemo(() => ({
        defaultFormData: "formData",
    }), []);
    const expectedChildren = useMemo(() => ({
        ButtonItem: { optionName: "items", isCollectionItem: true },
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false },
        EmptyItem: { optionName: "items", isCollectionItem: true },
        GroupItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        SimpleItem: { optionName: "items", isCollectionItem: true },
        TabbedItem: { optionName: "items", isCollectionItem: true }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxForm,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentAsyncRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AsyncRule = Object.assign(_componentAsyncRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "async"
    },
});
const _componentButtonItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ButtonItem = Object.assign(_componentButtonItem, {
    OptionName: "items",
    IsCollectionItem: true,
    ExpectedChildren: {
        buttonOptions: { optionName: "buttonOptions", isCollectionItem: false }
    },
    PredefinedProps: {
        itemType: "button"
    },
});
const _componentButtonOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ButtonOptions = Object.assign(_componentButtonOptions, {
    OptionName: "buttonOptions",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentColCountByScreen = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColCountByScreen = Object.assign(_componentColCountByScreen, {
    OptionName: "colCountByScreen",
});
const _componentCompareRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CompareRule = Object.assign(_componentCompareRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "compare"
    },
});
const _componentCustomRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CustomRule = Object.assign(_componentCustomRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "custom"
    },
});
const _componentEmailRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const EmailRule = Object.assign(_componentEmailRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "email"
    },
});
const _componentEmptyItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const EmptyItem = Object.assign(_componentEmptyItem, {
    OptionName: "items",
    IsCollectionItem: true,
    PredefinedProps: {
        itemType: "empty"
    },
});
const _componentGroupItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GroupItem = Object.assign(_componentGroupItem, {
    OptionName: "items",
    IsCollectionItem: true,
    ExpectedChildren: {
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "captionTemplate",
            render: "captionRender",
            component: "captionComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
    PredefinedProps: {
        itemType: "group"
    },
});
const _componentItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "captionTemplate",
            render: "captionRender",
            component: "captionComponent"
        }],
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentNumericRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const NumericRule = Object.assign(_componentNumericRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "numeric"
    },
});
const _componentPatternRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PatternRule = Object.assign(_componentPatternRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "pattern"
    },
});
const _componentRangeRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RangeRule = Object.assign(_componentRangeRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "range"
    },
});
const _componentRequiredRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RequiredRule = Object.assign(_componentRequiredRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
const _componentSimpleItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SimpleItem = Object.assign(_componentSimpleItem, {
    OptionName: "items",
    IsCollectionItem: true,
    ExpectedChildren: {
        AsyncRule: { optionName: "validationRules", isCollectionItem: true },
        CompareRule: { optionName: "validationRules", isCollectionItem: true },
        CustomRule: { optionName: "validationRules", isCollectionItem: true },
        EmailRule: { optionName: "validationRules", isCollectionItem: true },
        label: { optionName: "label", isCollectionItem: false },
        NumericRule: { optionName: "validationRules", isCollectionItem: true },
        PatternRule: { optionName: "validationRules", isCollectionItem: true },
        RangeRule: { optionName: "validationRules", isCollectionItem: true },
        RequiredRule: { optionName: "validationRules", isCollectionItem: true },
        StringLengthRule: { optionName: "validationRules", isCollectionItem: true },
        validationRule: { optionName: "validationRules", isCollectionItem: true }
    },
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
    PredefinedProps: {
        itemType: "simple"
    },
});
const _componentStringLengthRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StringLengthRule = Object.assign(_componentStringLengthRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "stringLength"
    },
});
const _componentTab = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tab = Object.assign(_componentTab, {
    OptionName: "tabs",
    IsCollectionItem: true,
    ExpectedChildren: {
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentTabbedItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TabbedItem = Object.assign(_componentTabbedItem, {
    OptionName: "items",
    IsCollectionItem: true,
    ExpectedChildren: {
        tab: { optionName: "tabs", isCollectionItem: true },
        tabPanelOptions: { optionName: "tabPanelOptions", isCollectionItem: false }
    },
    PredefinedProps: {
        itemType: "tabbed"
    },
});
const _componentTabPanelOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TabPanelOptions = Object.assign(_componentTabPanelOptions, {
    OptionName: "tabPanelOptions",
    DefaultsProps: {
        defaultItems: "items",
        defaultSelectedIndex: "selectedIndex",
        defaultSelectedItem: "selectedItem"
    },
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        tabPanelOptionsItem: { optionName: "items", isCollectionItem: true }
    },
    TemplateProps: [{
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        }, {
            tmplOption: "itemTitleTemplate",
            render: "itemTitleRender",
            component: "itemTitleComponent"
        }],
});
const _componentTabPanelOptionsItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TabPanelOptionsItem = Object.assign(_componentTabPanelOptionsItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentValidationRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValidationRule = Object.assign(_componentValidationRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
export default Form;
export { Form, AsyncRule, ButtonItem, ButtonOptions, ColCountByScreen, CompareRule, CustomRule, EmailRule, EmptyItem, GroupItem, Item, Label, NumericRule, PatternRule, RangeRule, RequiredRule, SimpleItem, StringLengthRule, Tab, TabbedItem, TabPanelOptions, TabPanelOptionsItem, ValidationRule };
