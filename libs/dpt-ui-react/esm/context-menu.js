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
import dxContextMenu from "dpt-ui/ui/context_menu";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const ContextMenu = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["items", "selectedItem", "visible"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onItemClick", "onItemContextMenu", "onItemRendered", "onPositioning", "onShowing", "onShown"]), []);
    const defaults = useMemo(() => ({
        defaultItems: "items",
        defaultSelectedItem: "selectedItem",
        defaultVisible: "visible",
    }), []);
    const expectedChildren = useMemo(() => ({
        animation: { optionName: "animation", isCollectionItem: false },
        item: { optionName: "items", isCollectionItem: true },
        position: { optionName: "position", isCollectionItem: false },
        showEvent: { optionName: "showEvent", isCollectionItem: false },
        showSubmenuMode: { optionName: "showSubmenuMode", isCollectionItem: false }
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxContextMenu,
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
    ExpectedChildren: {
        hide: { optionName: "hide", isCollectionItem: false },
        show: { optionName: "show", isCollectionItem: false }
    },
});
const _componentAt = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const At = Object.assign(_componentAt, {
    OptionName: "at",
});
const _componentBoundaryOffset = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const BoundaryOffset = Object.assign(_componentBoundaryOffset, {
    OptionName: "boundaryOffset",
});
const _componentCollision = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Collision = Object.assign(_componentCollision, {
    OptionName: "collision",
});
const _componentDelay = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Delay = Object.assign(_componentDelay, {
    OptionName: "delay",
});
const _componentFrom = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const From = Object.assign(_componentFrom, {
    OptionName: "from",
    ExpectedChildren: {
        position: { optionName: "position", isCollectionItem: false }
    },
});
const _componentHide = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Hide = Object.assign(_componentHide, {
    OptionName: "hide",
    ExpectedChildren: {
        from: { optionName: "from", isCollectionItem: false },
        to: { optionName: "to", isCollectionItem: false }
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
        }],
});
const _componentMy = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const My = Object.assign(_componentMy, {
    OptionName: "my",
});
const _componentOffset = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Offset = Object.assign(_componentOffset, {
    OptionName: "offset",
});
const _componentPosition = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Position = Object.assign(_componentPosition, {
    OptionName: "position",
});
const _componentShow = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Show = Object.assign(_componentShow, {
    OptionName: "show",
});
const _componentShowEvent = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ShowEvent = Object.assign(_componentShowEvent, {
    OptionName: "showEvent",
});
const _componentShowSubmenuMode = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ShowSubmenuMode = Object.assign(_componentShowSubmenuMode, {
    OptionName: "showSubmenuMode",
    ExpectedChildren: {
        delay: { optionName: "delay", isCollectionItem: false }
    },
});
const _componentTo = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const To = Object.assign(_componentTo, {
    OptionName: "to",
});
export default ContextMenu;
export { ContextMenu, Animation, At, BoundaryOffset, Collision, Delay, From, Hide, Item, My, Offset, Position, Show, ShowEvent, ShowSubmenuMode, To };
