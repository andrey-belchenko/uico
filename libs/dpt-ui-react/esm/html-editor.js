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
import dxHtmlEditor from "dpt-ui/ui/html_editor";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const HtmlEditor = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["value"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onFocusIn", "onFocusOut", "onInitialized", "onValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultValue: "value",
    }), []);
    const expectedChildren = useMemo(() => ({
        imageUpload: { optionName: "imageUpload", isCollectionItem: false },
        mediaResizing: { optionName: "mediaResizing", isCollectionItem: false },
        mention: { optionName: "mentions", isCollectionItem: true },
        tableContextMenu: { optionName: "tableContextMenu", isCollectionItem: false },
        tableResizing: { optionName: "tableResizing", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        variables: { optionName: "variables", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxHtmlEditor,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentFileUploaderOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FileUploaderOptions = Object.assign(_componentFileUploaderOptions, {
    OptionName: "fileUploaderOptions",
    DefaultsProps: {
        defaultValue: "value"
    },
});
const _componentImageUpload = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ImageUpload = Object.assign(_componentImageUpload, {
    OptionName: "imageUpload",
    ExpectedChildren: {
        fileUploaderOptions: { optionName: "fileUploaderOptions", isCollectionItem: false },
        tab: { optionName: "tabs", isCollectionItem: true }
    },
});
const _componentItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentMediaResizing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MediaResizing = Object.assign(_componentMediaResizing, {
    OptionName: "mediaResizing",
});
const _componentMention = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTab = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tab = Object.assign(_componentTab, {
    OptionName: "tabs",
    IsCollectionItem: true,
});
const _componentTableContextMenu = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TableContextMenu = Object.assign(_componentTableContextMenu, {
    OptionName: "tableContextMenu",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        tableContextMenuItem: { optionName: "items", isCollectionItem: true }
    },
});
const _componentTableContextMenuItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentTableResizing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TableResizing = Object.assign(_componentTableResizing, {
    OptionName: "tableResizing",
});
const _componentToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    },
});
const _componentToolbarItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentVariables = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Variables = Object.assign(_componentVariables, {
    OptionName: "variables",
});
export default HtmlEditor;
export { HtmlEditor, FileUploaderOptions, ImageUpload, Item, MediaResizing, Mention, Tab, TableContextMenu, TableContextMenuItem, TableResizing, Toolbar, ToolbarItem, Variables };
