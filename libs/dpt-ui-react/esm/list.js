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
import dxList from "dpt-ui/ui/list";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const List = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["items", "selectedItemKeys", "selectedItems"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onGroupRendered", "onInitialized", "onItemClick", "onItemContextMenu", "onItemDeleted", "onItemDeleting", "onItemHold", "onItemRendered", "onItemReordered", "onItemSwipe", "onPageLoading", "onPullRefresh", "onScroll", "onSelectAllValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultItems: "items",
        defaultSelectedItemKeys: "selectedItemKeys",
        defaultSelectedItems: "selectedItems",
    }), []);
    const expectedChildren = useMemo(() => ({
        item: { optionName: "items", isCollectionItem: true },
        itemDragging: { optionName: "itemDragging", isCollectionItem: false },
        menuItem: { optionName: "menuItems", isCollectionItem: true },
        searchEditorOptions: { optionName: "searchEditorOptions", isCollectionItem: false }
    }), []);
    const templateProps = useMemo(() => ([
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
    return (React.createElement((BaseComponent), {
        WidgetClass: dxList,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
const _componentButton = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Button = Object.assign(_componentButton, {
    OptionName: "buttons",
    IsCollectionItem: true,
    ExpectedChildren: {
        options: { optionName: "options", isCollectionItem: false }
    },
});
const _componentCursorOffset = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CursorOffset = Object.assign(_componentCursorOffset, {
    OptionName: "cursorOffset",
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
        }],
});
const _componentItemDragging = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentMenuItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const MenuItem = Object.assign(_componentMenuItem, {
    OptionName: "menuItems",
    IsCollectionItem: true,
});
const _componentOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Options = Object.assign(_componentOptions, {
    OptionName: "options",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentSearchEditorOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
export default List;
export { List, Button, CursorOffset, Item, ItemDragging, MenuItem, Options, SearchEditorOptions };
