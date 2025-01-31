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
exports.Lookup = exports.GroupOperationDescriptions = exports.Format = exports.FilterOperationDescriptions = exports.Field = exports.CustomOperation = exports.FilterBuilder = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const filter_builder_1 = __importDefault(require("dpt-ui/ui/filter_builder"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const FilterBuilder = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onDisposing", "onEditorPrepared", "onEditorPreparing", "onInitialized", "onValueChanged"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultValue: "value",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        customOperation: { optionName: "customOperations", isCollectionItem: true },
        field: { optionName: "fields", isCollectionItem: true },
        filterOperationDescriptions: { optionName: "filterOperationDescriptions", isCollectionItem: false },
        groupOperationDescriptions: { optionName: "groupOperationDescriptions", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: filter_builder_1.default,
        ref: baseRef,
        useRequestAnimationFrameFlag: true,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.FilterBuilder = FilterBuilder;
const _componentCustomOperation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.CustomOperation = CustomOperation;
const _componentField = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Field = Field;
const _componentFilterOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FilterOperationDescriptions = Object.assign(_componentFilterOperationDescriptions, {
    OptionName: "filterOperationDescriptions",
});
exports.FilterOperationDescriptions = FilterOperationDescriptions;
const _componentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
exports.Format = Format;
const _componentGroupOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupOperationDescriptions = Object.assign(_componentGroupOperationDescriptions, {
    OptionName: "groupOperationDescriptions",
});
exports.GroupOperationDescriptions = GroupOperationDescriptions;
const _componentLookup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Lookup = Object.assign(_componentLookup, {
    OptionName: "lookup",
});
exports.Lookup = Lookup;
exports.default = FilterBuilder;
