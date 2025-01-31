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
import dxPivotGridFieldChooser from "dpt-ui/ui/pivot_grid_field_chooser";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const PivotGridFieldChooser = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = useMemo(() => (["onContentReady", "onContextMenuPreparing", "onDisposing", "onInitialized"]), []);
    const expectedChildren = useMemo(() => ({
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        pivotGridFieldChooserTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxPivotGridFieldChooser,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        ...props,
    }));
}));
const _componentHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        headerFilterTexts: { optionName: "texts", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentHeaderFilterTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HeaderFilterTexts = Object.assign(_componentHeaderFilterTexts, {
    OptionName: "texts",
});
const _componentPivotGridFieldChooserTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PivotGridFieldChooserTexts = Object.assign(_componentPivotGridFieldChooserTexts, {
    OptionName: "texts",
});
const _componentSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
const _componentTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
export default PivotGridFieldChooser;
export { PivotGridFieldChooser, HeaderFilter, HeaderFilterTexts, PivotGridFieldChooserTexts, Search, Texts };
