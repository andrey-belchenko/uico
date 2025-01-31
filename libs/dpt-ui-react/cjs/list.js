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
exports.SearchEditorOptions = exports.Options = exports.MenuItem = exports.ItemDragging = exports.Item = exports.CursorOffset = exports.Button = exports.List = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const list_1 = __importDefault(require("dpt-ui/ui/list"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const List = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["items", "selectedItemKeys", "selectedItems"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onDisposing", "onGroupRendered", "onInitialized", "onItemClick", "onItemContextMenu", "onItemDeleted", "onItemDeleting", "onItemHold", "onItemRendered", "onItemReordered", "onItemSwipe", "onPageLoading", "onPullRefresh", "onScroll", "onSelectAllValueChanged"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultItems: "items",
        defaultSelectedItemKeys: "selectedItemKeys",
        defaultSelectedItems: "selectedItems",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        item: { optionName: "items", isCollectionItem: true },
        itemDragging: { optionName: "itemDragging", isCollectionItem: false },
        menuItem: { optionName: "menuItems", isCollectionItem: true },
        searchEditorOptions: { optionName: "searchEditorOptions", isCollectionItem: false }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "groupTemplate",
            render: "groupRender",
            component: "groupComponent"
        },
        {
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: list_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.List = List;
const _componentButton = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Button = Object.assign(_componentButton, {
    OptionName: "buttons",
    IsCollectionItem: true,
    ExpectedChildren: {
        options: { optionName: "options", isCollectionItem: false }
    },
});
exports.Button = Button;
const _componentCursorOffset = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CursorOffset = Object.assign(_componentCursorOffset, {
    OptionName: "cursorOffset",
});
exports.CursorOffset = CursorOffset;
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
        }],
});
exports.Item = Item;
const _componentItemDragging = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ItemDragging = Object.assign(_componentItemDragging, {
    OptionName: "itemDragging",
    ExpectedChildren: {
        cursorOffset: { optionName: "cursorOffset", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "dragTemplate",
            render: "dragRender",
            component: "dragComponent"
        }],
});
exports.ItemDragging = ItemDragging;
const _componentMenuItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MenuItem = Object.assign(_componentMenuItem, {
    OptionName: "menuItems",
    IsCollectionItem: true,
});
exports.MenuItem = MenuItem;
const _componentOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Options = Object.assign(_componentOptions, {
    OptionName: "options",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.Options = Options;
const _componentSearchEditorOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SearchEditorOptions = Object.assign(_componentSearchEditorOptions, {
    OptionName: "searchEditorOptions",
    DefaultsProps: {
        defaultValue: "value"
    },
    ExpectedChildren: {
        button: { optionName: "buttons", isCollectionItem: true }
    },
});
exports.SearchEditorOptions = SearchEditorOptions;
exports.default = List;
