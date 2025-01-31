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
exports.ValidationRule = exports.TabPanelOptionsItem = exports.TabPanelOptions = exports.TabbedItem = exports.Tab = exports.StringLengthRule = exports.SimpleItem = exports.RequiredRule = exports.RangeRule = exports.PatternRule = exports.NumericRule = exports.Label = exports.Item = exports.GroupItem = exports.EmptyItem = exports.EmailRule = exports.CustomRule = exports.CompareRule = exports.ColCountByScreen = exports.ButtonOptions = exports.ButtonItem = exports.AsyncRule = exports.Form = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const form_1 = __importDefault(require("dpt-ui/ui/form"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Form = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["formData"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onDisposing", "onEditorEnterKey", "onInitialized"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultFormData: "formData",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        ButtonItem: { optionName: "items", isCollectionItem: true },
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false },
        EmptyItem: { optionName: "items", isCollectionItem: true },
        GroupItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        SimpleItem: { optionName: "items", isCollectionItem: true },
        TabbedItem: { optionName: "items", isCollectionItem: true }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: form_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.Form = Form;
const _componentAsyncRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AsyncRule = Object.assign(_componentAsyncRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "async"
    },
});
exports.AsyncRule = AsyncRule;
const _componentButtonItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.ButtonItem = ButtonItem;
const _componentButtonOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ButtonOptions = Object.assign(_componentButtonOptions, {
    OptionName: "buttonOptions",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.ButtonOptions = ButtonOptions;
const _componentColCountByScreen = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColCountByScreen = Object.assign(_componentColCountByScreen, {
    OptionName: "colCountByScreen",
});
exports.ColCountByScreen = ColCountByScreen;
const _componentCompareRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CompareRule = Object.assign(_componentCompareRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "compare"
    },
});
exports.CompareRule = CompareRule;
const _componentCustomRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CustomRule = Object.assign(_componentCustomRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "custom"
    },
});
exports.CustomRule = CustomRule;
const _componentEmailRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const EmailRule = Object.assign(_componentEmailRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "email"
    },
});
exports.EmailRule = EmailRule;
const _componentEmptyItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const EmptyItem = Object.assign(_componentEmptyItem, {
    OptionName: "items",
    IsCollectionItem: true,
    PredefinedProps: {
        itemType: "empty"
    },
});
exports.EmptyItem = EmptyItem;
const _componentGroupItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.GroupItem = GroupItem;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Item = Item;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.Label = Label;
const _componentNumericRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const NumericRule = Object.assign(_componentNumericRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "numeric"
    },
});
exports.NumericRule = NumericRule;
const _componentPatternRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PatternRule = Object.assign(_componentPatternRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "pattern"
    },
});
exports.PatternRule = PatternRule;
const _componentRangeRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RangeRule = Object.assign(_componentRangeRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "range"
    },
});
exports.RangeRule = RangeRule;
const _componentRequiredRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RequiredRule = Object.assign(_componentRequiredRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
exports.RequiredRule = RequiredRule;
const _componentSimpleItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.SimpleItem = SimpleItem;
const _componentStringLengthRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StringLengthRule = Object.assign(_componentStringLengthRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "stringLength"
    },
});
exports.StringLengthRule = StringLengthRule;
const _componentTab = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Tab = Tab;
const _componentTabbedItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.TabbedItem = TabbedItem;
const _componentTabPanelOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.TabPanelOptions = TabPanelOptions;
const _componentTabPanelOptionsItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.TabPanelOptionsItem = TabPanelOptionsItem;
const _componentValidationRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValidationRule = Object.assign(_componentValidationRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
exports.ValidationRule = ValidationRule;
exports.default = Form;
