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
import dxTreeList from "dpt-ui/ui/tree_list";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const TreeList = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["columns", "editing", "editing.changes", "editing.editColumnName", "editing.editRowKey", "expandedRowKeys", "filterPanel", "filterPanel.filterEnabled", "filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "paging", "paging.pageIndex", "paging.pageSize", "searchPanel", "searchPanel.text", "selectedRowKeys"]), []);
    const independentEvents = useMemo(() => (["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanging", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onToolbarPreparing"]), []);
    const defaults = useMemo(() => ({
        defaultColumns: "columns",
        defaultEditing: "editing",
        defaultExpandedRowKeys: "expandedRowKeys",
        defaultFilterPanel: "filterPanel",
        defaultFilterValue: "filterValue",
        defaultFocusedColumnIndex: "focusedColumnIndex",
        defaultFocusedRowIndex: "focusedRowIndex",
        defaultFocusedRowKey: "focusedRowKey",
        defaultPaging: "paging",
        defaultSearchPanel: "searchPanel",
        defaultSelectedRowKeys: "selectedRowKeys",
    }), []);
    const expectedChildren = useMemo(() => ({
        column: { optionName: "columns", isCollectionItem: true },
        columnChooser: { optionName: "columnChooser", isCollectionItem: false },
        columnFixing: { optionName: "columnFixing", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        filterBuilder: { optionName: "filterBuilder", isCollectionItem: false },
        filterBuilderPopup: { optionName: "filterBuilderPopup", isCollectionItem: false },
        filterPanel: { optionName: "filterPanel", isCollectionItem: false },
        filterRow: { optionName: "filterRow", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        keyboardNavigation: { optionName: "keyboardNavigation", isCollectionItem: false },
        loadPanel: { optionName: "loadPanel", isCollectionItem: false },
        pager: { optionName: "pager", isCollectionItem: false },
        paging: { optionName: "paging", isCollectionItem: false },
        remoteOperations: { optionName: "remoteOperations", isCollectionItem: false },
        rowDragging: { optionName: "rowDragging", isCollectionItem: false },
        scrolling: { optionName: "scrolling", isCollectionItem: false },
        searchPanel: { optionName: "searchPanel", isCollectionItem: false },
        selection: { optionName: "selection", isCollectionItem: false },
        sorting: { optionName: "sorting", isCollectionItem: false },
        stateStoring: { optionName: "stateStoring", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        treeListHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        treeListSelection: { optionName: "selection", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxTreeList,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
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
const _componentAsyncRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AsyncRule = Object.assign(_componentAsyncRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "async"
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
const _componentButton = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Button = Object.assign(_componentButton, {
    OptionName: "buttons",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentChange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Change = Object.assign(_componentChange, {
    OptionName: "changes",
    IsCollectionItem: true,
});
const _componentColCountByScreen = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColCountByScreen = Object.assign(_componentColCountByScreen, {
    OptionName: "colCountByScreen",
});
const _componentCollision = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Collision = Object.assign(_componentCollision, {
    OptionName: "collision",
});
const _componentColumn = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Column = Object.assign(_componentColumn, {
    OptionName: "columns",
    IsCollectionItem: true,
    DefaultsProps: {
        defaultFilterValue: "filterValue",
        defaultFilterValues: "filterValues",
        defaultSelectedFilterOperation: "selectedFilterOperation",
        defaultSortIndex: "sortIndex",
        defaultSortOrder: "sortOrder",
        defaultVisible: "visible",
        defaultVisibleIndex: "visibleIndex"
    },
    ExpectedChildren: {
        AsyncRule: { optionName: "validationRules", isCollectionItem: true },
        button: { optionName: "buttons", isCollectionItem: true },
        columnHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        columnLookup: { optionName: "lookup", isCollectionItem: false },
        CompareRule: { optionName: "validationRules", isCollectionItem: true },
        CustomRule: { optionName: "validationRules", isCollectionItem: true },
        EmailRule: { optionName: "validationRules", isCollectionItem: true },
        format: { optionName: "format", isCollectionItem: false },
        formItem: { optionName: "formItem", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false },
        NumericRule: { optionName: "validationRules", isCollectionItem: true },
        PatternRule: { optionName: "validationRules", isCollectionItem: true },
        RangeRule: { optionName: "validationRules", isCollectionItem: true },
        RequiredRule: { optionName: "validationRules", isCollectionItem: true },
        StringLengthRule: { optionName: "validationRules", isCollectionItem: true },
        validationRule: { optionName: "validationRules", isCollectionItem: true }
    },
    TemplateProps: [{
            tmplOption: "cellTemplate",
            render: "cellRender",
            component: "cellComponent"
        }, {
            tmplOption: "editCellTemplate",
            render: "editCellRender",
            component: "editCellComponent"
        }, {
            tmplOption: "headerCellTemplate",
            render: "headerCellRender",
            component: "headerCellComponent"
        }],
});
const _componentColumnChooser = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnChooser = Object.assign(_componentColumnChooser, {
    OptionName: "columnChooser",
    ExpectedChildren: {
        columnChooserSearch: { optionName: "search", isCollectionItem: false },
        columnChooserSelection: { optionName: "selection", isCollectionItem: false },
        position: { optionName: "position", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        selection: { optionName: "selection", isCollectionItem: false }
    },
});
const _componentColumnChooserSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnChooserSearch = Object.assign(_componentColumnChooserSearch, {
    OptionName: "search",
});
const _componentColumnChooserSelection = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnChooserSelection = Object.assign(_componentColumnChooserSelection, {
    OptionName: "selection",
});
const _componentColumnFixing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnFixing = Object.assign(_componentColumnFixing, {
    OptionName: "columnFixing",
    ExpectedChildren: {
        columnFixingTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentColumnFixingTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnFixingTexts = Object.assign(_componentColumnFixingTexts, {
    OptionName: "texts",
});
const _componentColumnHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnHeaderFilter = Object.assign(_componentColumnHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        columnHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false }
    },
});
const _componentColumnHeaderFilterSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnHeaderFilterSearch = Object.assign(_componentColumnHeaderFilterSearch, {
    OptionName: "search",
});
const _componentColumnLookup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ColumnLookup = Object.assign(_componentColumnLookup, {
    OptionName: "lookup",
});
const _componentCompareRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CompareRule = Object.assign(_componentCompareRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "compare"
    },
});
const _componentCursorOffset = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CursorOffset = Object.assign(_componentCursorOffset, {
    OptionName: "cursorOffset",
});
const _componentCustomOperation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
const _componentCustomRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const CustomRule = Object.assign(_componentCustomRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "custom"
    },
});
const _componentEditing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
    DefaultsProps: {
        defaultChanges: "changes",
        defaultEditColumnName: "editColumnName",
        defaultEditRowKey: "editRowKey"
    },
    ExpectedChildren: {
        change: { optionName: "changes", isCollectionItem: true },
        editingTexts: { optionName: "texts", isCollectionItem: false },
        form: { optionName: "form", isCollectionItem: false },
        popup: { optionName: "popup", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentEditingTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const EditingTexts = Object.assign(_componentEditingTexts, {
    OptionName: "texts",
});
const _componentEmailRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const EmailRule = Object.assign(_componentEmailRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "email"
    },
});
const _componentField = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Field = Object.assign(_componentField, {
    OptionName: "fields",
    IsCollectionItem: true,
    ExpectedChildren: {
        fieldLookup: { optionName: "lookup", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent"
        }],
});
const _componentFieldLookup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FieldLookup = Object.assign(_componentFieldLookup, {
    OptionName: "lookup",
});
const _componentFilterBuilder = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterBuilder = Object.assign(_componentFilterBuilder, {
    OptionName: "filterBuilder",
    DefaultsProps: {
        defaultValue: "value"
    },
    ExpectedChildren: {
        customOperation: { optionName: "customOperations", isCollectionItem: true },
        field: { optionName: "fields", isCollectionItem: true },
        filterOperationDescriptions: { optionName: "filterOperationDescriptions", isCollectionItem: false },
        groupOperationDescriptions: { optionName: "groupOperationDescriptions", isCollectionItem: false }
    },
});
const _componentFilterBuilderPopup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterBuilderPopup = Object.assign(_componentFilterBuilderPopup, {
    OptionName: "filterBuilderPopup",
    DefaultsProps: {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }, {
            tmplOption: "titleTemplate",
            render: "titleRender",
            component: "titleComponent"
        }],
});
const _componentFilterOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterOperationDescriptions = Object.assign(_componentFilterOperationDescriptions, {
    OptionName: "filterOperationDescriptions",
});
const _componentFilterPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterPanel = Object.assign(_componentFilterPanel, {
    OptionName: "filterPanel",
    DefaultsProps: {
        defaultFilterEnabled: "filterEnabled"
    },
    ExpectedChildren: {
        filterPanelTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentFilterPanelTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterPanelTexts = Object.assign(_componentFilterPanelTexts, {
    OptionName: "texts",
});
const _componentFilterRow = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FilterRow = Object.assign(_componentFilterRow, {
    OptionName: "filterRow",
    ExpectedChildren: {
        operationDescriptions: { optionName: "operationDescriptions", isCollectionItem: false }
    },
});
const _componentForm = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Form = Object.assign(_componentForm, {
    OptionName: "form",
    DefaultsProps: {
        defaultFormData: "formData"
    },
    ExpectedChildren: {
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false }
    },
});
const _componentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
const _componentFormItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FormItem = Object.assign(_componentFormItem, {
    OptionName: "formItem",
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
const _componentGroupOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GroupOperationDescriptions = Object.assign(_componentGroupOperationDescriptions, {
    OptionName: "groupOperationDescriptions",
});
const _componentHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
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
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentKeyboardNavigation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const KeyboardNavigation = Object.assign(_componentKeyboardNavigation, {
    OptionName: "keyboardNavigation",
});
const _componentLabel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentLoadPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const LoadPanel = Object.assign(_componentLoadPanel, {
    OptionName: "loadPanel",
});
const _componentLookup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Lookup = Object.assign(_componentLookup, {
    OptionName: "lookup",
});
const _componentMy = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const My = Object.assign(_componentMy, {
    OptionName: "my",
});
const _componentNumericRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const NumericRule = Object.assign(_componentNumericRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "numeric"
    },
});
const _componentOffset = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Offset = Object.assign(_componentOffset, {
    OptionName: "offset",
});
const _componentOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const OperationDescriptions = Object.assign(_componentOperationDescriptions, {
    OptionName: "operationDescriptions",
});
const _componentPager = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Pager = Object.assign(_componentPager, {
    OptionName: "pager",
});
const _componentPaging = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Paging = Object.assign(_componentPaging, {
    OptionName: "paging",
    DefaultsProps: {
        defaultPageIndex: "pageIndex",
        defaultPageSize: "pageSize"
    },
});
const _componentPatternRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const PatternRule = Object.assign(_componentPatternRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "pattern"
    },
});
const _componentPopup = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Popup = Object.assign(_componentPopup, {
    OptionName: "popup",
    DefaultsProps: {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    },
    ExpectedChildren: {
        animation: { optionName: "animation", isCollectionItem: false },
        position: { optionName: "position", isCollectionItem: false },
        toolbarItem: { optionName: "toolbarItems", isCollectionItem: true }
    },
    TemplateProps: [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent"
        }, {
            tmplOption: "titleTemplate",
            render: "titleRender",
            component: "titleComponent"
        }],
});
const _componentPosition = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Position = Object.assign(_componentPosition, {
    OptionName: "position",
});
const _componentRangeRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RangeRule = Object.assign(_componentRangeRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "range"
    },
});
const _componentRemoteOperations = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RemoteOperations = Object.assign(_componentRemoteOperations, {
    OptionName: "remoteOperations",
});
const _componentRequiredRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RequiredRule = Object.assign(_componentRequiredRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
const _componentRowDragging = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const RowDragging = Object.assign(_componentRowDragging, {
    OptionName: "rowDragging",
    ExpectedChildren: {
        cursorOffset: { optionName: "cursorOffset", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "dragTemplate",
            render: "dragRender",
            component: "dragComponent"
        }],
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
const _componentSearchPanel = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const SearchPanel = Object.assign(_componentSearchPanel, {
    OptionName: "searchPanel",
    DefaultsProps: {
        defaultText: "text"
    },
});
const _componentSelection = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Selection = Object.assign(_componentSelection, {
    OptionName: "selection",
});
const _componentShow = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Show = Object.assign(_componentShow, {
    OptionName: "show",
});
const _componentSorting = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Sorting = Object.assign(_componentSorting, {
    OptionName: "sorting",
});
const _componentStateStoring = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StateStoring = Object.assign(_componentStateStoring, {
    OptionName: "stateStoring",
});
const _componentStringLengthRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StringLengthRule = Object.assign(_componentStringLengthRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "stringLength"
    },
});
const _componentTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
const _componentTo = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const To = Object.assign(_componentTo, {
    OptionName: "to",
});
const _componentToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true }
    },
});
const _componentToolbarItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ToolbarItem = Object.assign(_componentToolbarItem, {
    OptionName: "toolbarItems",
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
const _componentTreeListHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TreeListHeaderFilter = Object.assign(_componentTreeListHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false },
        treeListHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        treeListHeaderFilterTexts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentTreeListHeaderFilterSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TreeListHeaderFilterSearch = Object.assign(_componentTreeListHeaderFilterSearch, {
    OptionName: "search",
});
const _componentTreeListHeaderFilterTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TreeListHeaderFilterTexts = Object.assign(_componentTreeListHeaderFilterTexts, {
    OptionName: "texts",
});
const _componentTreeListSelection = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const TreeListSelection = Object.assign(_componentTreeListSelection, {
    OptionName: "selection",
});
const _componentValidationRule = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ValidationRule = Object.assign(_componentValidationRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
export default TreeList;
export { TreeList, Animation, AsyncRule, At, BoundaryOffset, Button, Change, ColCountByScreen, Collision, Column, ColumnChooser, ColumnChooserSearch, ColumnChooserSelection, ColumnFixing, ColumnFixingTexts, ColumnHeaderFilter, ColumnHeaderFilterSearch, ColumnLookup, CompareRule, CursorOffset, CustomOperation, CustomRule, Editing, EditingTexts, EmailRule, Field, FieldLookup, FilterBuilder, FilterBuilderPopup, FilterOperationDescriptions, FilterPanel, FilterPanelTexts, FilterRow, Form, Format, FormItem, From, GroupOperationDescriptions, HeaderFilter, Hide, Item, KeyboardNavigation, Label, LoadPanel, Lookup, My, NumericRule, Offset, OperationDescriptions, Pager, Paging, PatternRule, Popup, Position, RangeRule, RemoteOperations, RequiredRule, RowDragging, Scrolling, Search, SearchPanel, Selection, Show, Sorting, StateStoring, StringLengthRule, Texts, To, Toolbar, ToolbarItem, TreeListHeaderFilter, TreeListHeaderFilterSearch, TreeListHeaderFilterTexts, TreeListSelection, ValidationRule };
