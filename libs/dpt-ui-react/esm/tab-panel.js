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
import dxTabPanel from "dpt-ui/ui/tab_panel";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const TabPanel = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["items", "selectedIndex", "selectedItem"]), []);
    const independentEvents = useMemo(() => (["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemHold", "onItemRendered", "onTitleClick", "onTitleHold", "onTitleRendered"]), []);
    const defaults = useMemo(() => ({
        defaultItems: "items",
        defaultSelectedIndex: "selectedIndex",
        defaultSelectedItem: "selectedItem",
    }), []);
    const expectedChildren = useMemo(() => ({
        item: { optionName: "items", isCollectionItem: true }
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        },
        {
            tmplOption: "itemTitleTemplate",
            render: "itemTitleRender",
            component: "itemTitleComponent"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxTabPanel,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
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
        }],
});
export default TabPanel;
export { TabPanel, Item };
