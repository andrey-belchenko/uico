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
exports.Variables = exports.ToolbarItem = exports.Toolbar = exports.TableResizing = exports.TableContextMenuItem = exports.TableContextMenu = exports.Tab = exports.Mention = exports.MediaResizing = exports.Item = exports.ImageUpload = exports.FileUploaderOptions = exports.HtmlEditor = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const html_editor_1 = __importDefault(require("dpt-ui/ui/html_editor"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const HtmlEditor = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onDisposing", "onFocusIn", "onFocusOut", "onInitialized", "onValueChanged"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultValue: "value",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        imageUpload: { optionName: "imageUpload", isCollectionItem: false },
        mediaResizing: { optionName: "mediaResizing", isCollectionItem: false },
        mention: { optionName: "mentions", isCollectionItem: true },
        tableContextMenu: { optionName: "tableContextMenu", isCollectionItem: false },
        tableResizing: { optionName: "tableResizing", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        variables: { optionName: "variables", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: html_editor_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
exports.HtmlEditor = HtmlEditor;
const _componentFileUploaderOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FileUploaderOptions = Object.assign(_componentFileUploaderOptions, {
    OptionName: "fileUploaderOptions",
    DefaultsProps: {
        defaultValue: "value"
    },
});
exports.FileUploaderOptions = FileUploaderOptions;
const _componentImageUpload = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ImageUpload = Object.assign(_componentImageUpload, {
    OptionName: "imageUpload",
    ExpectedChildren: {
        fileUploaderOptions: { optionName: "fileUploaderOptions", isCollectionItem: false },
        tab: { optionName: "tabs", isCollectionItem: true }
    },
});
exports.ImageUpload = ImageUpload;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }, {
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent"
        }],
});
exports.Item = Item;
const _componentMediaResizing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MediaResizing = Object.assign(_componentMediaResizing, {
    OptionName: "mediaResizing",
});
exports.MediaResizing = MediaResizing;
const _componentMention = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Mention = Object.assign(_componentMention, {
    OptionName: "mentions",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.Mention = Mention;
const _componentTab = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tab = Object.assign(_componentTab, {
    OptionName: "tabs",
    IsCollectionItem: true,
});
exports.Tab = Tab;
const _componentTableContextMenu = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TableContextMenu = Object.assign(_componentTableContextMenu, {
    OptionName: "tableContextMenu",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        tableContextMenuItem: { optionName: "items", isCollectionItem: true }
    },
});
exports.TableContextMenu = TableContextMenu;
const _componentTableContextMenuItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TableContextMenuItem = Object.assign(_componentTableContextMenuItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.TableContextMenuItem = TableContextMenuItem;
const _componentTableResizing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TableResizing = Object.assign(_componentTableResizing, {
    OptionName: "tableResizing",
});
exports.TableResizing = TableResizing;
const _componentToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    },
});
exports.Toolbar = Toolbar;
const _componentToolbarItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ToolbarItem = Object.assign(_componentToolbarItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.ToolbarItem = ToolbarItem;
const _componentVariables = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Variables = Object.assign(_componentVariables, {
    OptionName: "variables",
});
exports.Variables = Variables;
exports.default = HtmlEditor;
