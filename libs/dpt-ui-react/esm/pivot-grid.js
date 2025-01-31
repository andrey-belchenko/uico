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
import dxPivotGrid from "dpt-ui/ui/pivot_grid";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const PivotGrid = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = useMemo(() => (["onCellClick", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDisposing", "onExporting", "onInitialized"]), []);
    const expectedChildren = useMemo(() => ({
        export: { optionName: "export", isCollectionItem: false },
        fieldChooser: { optionName: "fieldChooser", isCollectionItem: false },
        fieldPanel: { optionName: "fieldPanel", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        loadPanel: { optionName: "loadPanel", isCollectionItem: false },
        pivotGridTexts: { optionName: "texts", isCollectionItem: false },
        scrolling: { optionName: "scrolling", isCollectionItem: false },
        stateStoring: { optionName: "stateStoring", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxPivotGrid,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        ...props,
    }));
}));
const _componentExport = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
});
const _componentFieldChooser = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FieldChooser = Object.assign(_componentFieldChooser, {
    OptionName: "fieldChooser",
    ExpectedChildren: {
        fieldChooserTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentFieldChooserTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FieldChooserTexts = Object.assign(_componentFieldChooserTexts, {
    OptionName: "texts",
});
const _componentFieldPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FieldPanel = Object.assign(_componentFieldPanel, {
    OptionName: "fieldPanel",
    ExpectedChildren: {
        fieldPanelTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentFieldPanelTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FieldPanelTexts = Object.assign(_componentFieldPanelTexts, {
    OptionName: "texts",
});
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
const _componentLoadPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LoadPanel = Object.assign(_componentLoadPanel, {
    OptionName: "loadPanel",
});
const _componentPivotGridTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PivotGridTexts = Object.assign(_componentPivotGridTexts, {
    OptionName: "texts",
});
const _componentScrolling = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Scrolling = Object.assign(_componentScrolling, {
    OptionName: "scrolling",
});
const _componentSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
const _componentStateStoring = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StateStoring = Object.assign(_componentStateStoring, {
    OptionName: "stateStoring",
});
const _componentTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
export default PivotGrid;
export { PivotGrid, Export, FieldChooser, FieldChooserTexts, FieldPanel, FieldPanelTexts, HeaderFilter, HeaderFilterTexts, LoadPanel, PivotGridTexts, Scrolling, Search, StateStoring, Texts };
