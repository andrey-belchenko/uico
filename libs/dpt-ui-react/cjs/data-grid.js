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
exports.Hide = exports.HeaderFilter = exports.GroupPanel = exports.GroupOperationDescriptions = exports.GroupItem = exports.GroupingTexts = exports.Grouping = exports.From = exports.FormItem = exports.Format = exports.Form = exports.FilterRow = exports.FilterPanelTexts = exports.FilterPanel = exports.FilterOperationDescriptions = exports.FilterBuilderPopup = exports.FilterBuilder = exports.FieldLookup = exports.Field = exports.ExportTexts = exports.Export = exports.EmailRule = exports.EditingTexts = exports.Editing = exports.DataGridSelection = exports.DataGridHeaderFilterTexts = exports.DataGridHeaderFilterSearch = exports.DataGridHeaderFilter = exports.CustomRule = exports.CustomOperation = exports.CursorOffset = exports.CompareRule = exports.ColumnLookup = exports.ColumnHeaderFilterSearch = exports.ColumnHeaderFilter = exports.ColumnFixingTexts = exports.ColumnFixing = exports.ColumnChooserSelection = exports.ColumnChooserSearch = exports.ColumnChooser = exports.Column = exports.Collision = exports.ColCountByScreen = exports.Change = exports.Button = exports.BoundaryOffset = exports.At = exports.AsyncRule = exports.Animation = exports.DataGrid = void 0;
exports.ValueFormat = exports.ValidationRule = exports.TotalItem = exports.ToolbarItem = exports.Toolbar = exports.To = exports.Texts = exports.SummaryTexts = exports.Summary = exports.StringLengthRule = exports.StateStoring = exports.Sorting = exports.SortByGroupSummaryInfo = exports.Show = exports.Selection = exports.SearchPanel = exports.Search = exports.Scrolling = exports.RowDragging = exports.RequiredRule = exports.RemoteOperations = exports.RangeRule = exports.Position = exports.Popup = exports.PatternRule = exports.Paging = exports.Pager = exports.OperationDescriptions = exports.Offset = exports.NumericRule = exports.My = exports.MasterDetail = exports.Lookup = exports.LoadPanel = exports.Label = exports.KeyboardNavigation = exports.Item = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const data_grid_1 = __importDefault(require("dpt-ui/ui/data_grid"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const DataGrid = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["columns", "editing", "editing.changes", "editing.editColumnName", "editing.editRowKey", "filterPanel", "filterPanel.filterEnabled", "filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "groupPanel", "groupPanel.visible", "paging", "paging.pageIndex", "paging.pageSize", "searchPanel", "searchPanel.text", "selectedRowKeys", "selectionFilter"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExporting", "onFocusedCellChanging", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onToolbarPreparing"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultColumns: "columns",
        defaultEditing: "editing",
        defaultFilterPanel: "filterPanel",
        defaultFilterValue: "filterValue",
        defaultFocusedColumnIndex: "focusedColumnIndex",
        defaultFocusedRowIndex: "focusedRowIndex",
        defaultFocusedRowKey: "focusedRowKey",
        defaultGroupPanel: "groupPanel",
        defaultPaging: "paging",
        defaultSearchPanel: "searchPanel",
        defaultSelectedRowKeys: "selectedRowKeys",
        defaultSelectionFilter: "selectionFilter",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        column: { optionName: "columns", isCollectionItem: true },
        columnChooser: { optionName: "columnChooser", isCollectionItem: false },
        columnFixing: { optionName: "columnFixing", isCollectionItem: false },
        dataGridHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        dataGridSelection: { optionName: "selection", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        export: { optionName: "export", isCollectionItem: false },
        filterBuilder: { optionName: "filterBuilder", isCollectionItem: false },
        filterBuilderPopup: { optionName: "filterBuilderPopup", isCollectionItem: false },
        filterPanel: { optionName: "filterPanel", isCollectionItem: false },
        filterRow: { optionName: "filterRow", isCollectionItem: false },
        grouping: { optionName: "grouping", isCollectionItem: false },
        groupPanel: { optionName: "groupPanel", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        keyboardNavigation: { optionName: "keyboardNavigation", isCollectionItem: false },
        loadPanel: { optionName: "loadPanel", isCollectionItem: false },
        masterDetail: { optionName: "masterDetail", isCollectionItem: false },
        pager: { optionName: "pager", isCollectionItem: false },
        paging: { optionName: "paging", isCollectionItem: false },
        remoteOperations: { optionName: "remoteOperations", isCollectionItem: false },
        rowDragging: { optionName: "rowDragging", isCollectionItem: false },
        scrolling: { optionName: "scrolling", isCollectionItem: false },
        searchPanel: { optionName: "searchPanel", isCollectionItem: false },
        selection: { optionName: "selection", isCollectionItem: false },
        sortByGroupSummaryInfo: { optionName: "sortByGroupSummaryInfo", isCollectionItem: true },
        sorting: { optionName: "sorting", isCollectionItem: false },
        stateStoring: { optionName: "stateStoring", isCollectionItem: false },
        summary: { optionName: "summary", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "dataRowTemplate",
            render: "dataRowRender",
            component: "dataRowComponent"
        },
        {
            tmplOption: "rowTemplate",
            render: "rowRender",
            component: "rowComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: data_grid_1.default,
        ref: baseRef,
        useRequestAnimationFrameFlag: true,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.DataGrid = DataGrid;
const _componentAnimation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Animation = Object.assign(_componentAnimation, {
    OptionName: "animation",
    ExpectedChildren: {
        hide: { optionName: "hide", isCollectionItem: false },
        show: { optionName: "show", isCollectionItem: false }
    },
});
exports.Animation = Animation;
const _componentAsyncRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AsyncRule = Object.assign(_componentAsyncRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "async"
    },
});
exports.AsyncRule = AsyncRule;
const _componentAt = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const At = Object.assign(_componentAt, {
    OptionName: "at",
});
exports.At = At;
const _componentBoundaryOffset = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const BoundaryOffset = Object.assign(_componentBoundaryOffset, {
    OptionName: "boundaryOffset",
});
exports.BoundaryOffset = BoundaryOffset;
const _componentButton = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Button = Button;
const _componentChange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Change = Object.assign(_componentChange, {
    OptionName: "changes",
    IsCollectionItem: true,
});
exports.Change = Change;
const _componentColCountByScreen = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColCountByScreen = Object.assign(_componentColCountByScreen, {
    OptionName: "colCountByScreen",
});
exports.ColCountByScreen = ColCountByScreen;
const _componentCollision = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Collision = Object.assign(_componentCollision, {
    OptionName: "collision",
});
exports.Collision = Collision;
const _componentColumn = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Column = Object.assign(_componentColumn, {
    OptionName: "columns",
    IsCollectionItem: true,
    DefaultsProps: {
        defaultFilterValue: "filterValue",
        defaultFilterValues: "filterValues",
        defaultGroupIndex: "groupIndex",
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
            tmplOption: "groupCellTemplate",
            render: "groupCellRender",
            component: "groupCellComponent"
        }, {
            tmplOption: "headerCellTemplate",
            render: "headerCellRender",
            component: "headerCellComponent"
        }],
});
exports.Column = Column;
const _componentColumnChooser = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.ColumnChooser = ColumnChooser;
const _componentColumnChooserSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnChooserSearch = Object.assign(_componentColumnChooserSearch, {
    OptionName: "search",
});
exports.ColumnChooserSearch = ColumnChooserSearch;
const _componentColumnChooserSelection = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnChooserSelection = Object.assign(_componentColumnChooserSelection, {
    OptionName: "selection",
});
exports.ColumnChooserSelection = ColumnChooserSelection;
const _componentColumnFixing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnFixing = Object.assign(_componentColumnFixing, {
    OptionName: "columnFixing",
    ExpectedChildren: {
        columnFixingTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.ColumnFixing = ColumnFixing;
const _componentColumnFixingTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnFixingTexts = Object.assign(_componentColumnFixingTexts, {
    OptionName: "texts",
});
exports.ColumnFixingTexts = ColumnFixingTexts;
const _componentColumnHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnHeaderFilter = Object.assign(_componentColumnHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        columnHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false }
    },
});
exports.ColumnHeaderFilter = ColumnHeaderFilter;
const _componentColumnHeaderFilterSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnHeaderFilterSearch = Object.assign(_componentColumnHeaderFilterSearch, {
    OptionName: "search",
});
exports.ColumnHeaderFilterSearch = ColumnHeaderFilterSearch;
const _componentColumnLookup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ColumnLookup = Object.assign(_componentColumnLookup, {
    OptionName: "lookup",
});
exports.ColumnLookup = ColumnLookup;
const _componentCompareRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CompareRule = Object.assign(_componentCompareRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "compare"
    },
});
exports.CompareRule = CompareRule;
const _componentCursorOffset = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CursorOffset = Object.assign(_componentCursorOffset, {
    OptionName: "cursorOffset",
});
exports.CursorOffset = CursorOffset;
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
const _componentCustomRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const CustomRule = Object.assign(_componentCustomRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "custom"
    },
});
exports.CustomRule = CustomRule;
const _componentDataGridHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DataGridHeaderFilter = Object.assign(_componentDataGridHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        dataGridHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        dataGridHeaderFilterTexts: { optionName: "texts", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.DataGridHeaderFilter = DataGridHeaderFilter;
const _componentDataGridHeaderFilterSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DataGridHeaderFilterSearch = Object.assign(_componentDataGridHeaderFilterSearch, {
    OptionName: "search",
});
exports.DataGridHeaderFilterSearch = DataGridHeaderFilterSearch;
const _componentDataGridHeaderFilterTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DataGridHeaderFilterTexts = Object.assign(_componentDataGridHeaderFilterTexts, {
    OptionName: "texts",
});
exports.DataGridHeaderFilterTexts = DataGridHeaderFilterTexts;
const _componentDataGridSelection = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DataGridSelection = Object.assign(_componentDataGridSelection, {
    OptionName: "selection",
});
exports.DataGridSelection = DataGridSelection;
const _componentEditing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Editing = Editing;
const _componentEditingTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const EditingTexts = Object.assign(_componentEditingTexts, {
    OptionName: "texts",
});
exports.EditingTexts = EditingTexts;
const _componentEmailRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const EmailRule = Object.assign(_componentEmailRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "email"
    },
});
exports.EmailRule = EmailRule;
const _componentExport = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Export = Object.assign(_componentExport, {
    OptionName: "export",
    ExpectedChildren: {
        exportTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.Export = Export;
const _componentExportTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ExportTexts = Object.assign(_componentExportTexts, {
    OptionName: "texts",
});
exports.ExportTexts = ExportTexts;
const _componentField = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Field = Field;
const _componentFieldLookup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FieldLookup = Object.assign(_componentFieldLookup, {
    OptionName: "lookup",
});
exports.FieldLookup = FieldLookup;
const _componentFilterBuilder = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.FilterBuilder = FilterBuilder;
const _componentFilterBuilderPopup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.FilterBuilderPopup = FilterBuilderPopup;
const _componentFilterOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FilterOperationDescriptions = Object.assign(_componentFilterOperationDescriptions, {
    OptionName: "filterOperationDescriptions",
});
exports.FilterOperationDescriptions = FilterOperationDescriptions;
const _componentFilterPanel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.FilterPanel = FilterPanel;
const _componentFilterPanelTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FilterPanelTexts = Object.assign(_componentFilterPanelTexts, {
    OptionName: "texts",
});
exports.FilterPanelTexts = FilterPanelTexts;
const _componentFilterRow = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FilterRow = Object.assign(_componentFilterRow, {
    OptionName: "filterRow",
    ExpectedChildren: {
        operationDescriptions: { optionName: "operationDescriptions", isCollectionItem: false }
    },
});
exports.FilterRow = FilterRow;
const _componentForm = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Form = Form;
const _componentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
exports.Format = Format;
const _componentFormItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.FormItem = FormItem;
const _componentFrom = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const From = Object.assign(_componentFrom, {
    OptionName: "from",
    ExpectedChildren: {
        position: { optionName: "position", isCollectionItem: false }
    },
});
exports.From = From;
const _componentGrouping = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Grouping = Object.assign(_componentGrouping, {
    OptionName: "grouping",
    ExpectedChildren: {
        groupingTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.Grouping = Grouping;
const _componentGroupingTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupingTexts = Object.assign(_componentGroupingTexts, {
    OptionName: "texts",
});
exports.GroupingTexts = GroupingTexts;
const _componentGroupItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupItem = Object.assign(_componentGroupItem, {
    OptionName: "groupItems",
    IsCollectionItem: true,
    ExpectedChildren: {
        valueFormat: { optionName: "valueFormat", isCollectionItem: false }
    },
});
exports.GroupItem = GroupItem;
const _componentGroupOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupOperationDescriptions = Object.assign(_componentGroupOperationDescriptions, {
    OptionName: "groupOperationDescriptions",
});
exports.GroupOperationDescriptions = GroupOperationDescriptions;
const _componentGroupPanel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GroupPanel = Object.assign(_componentGroupPanel, {
    OptionName: "groupPanel",
    DefaultsProps: {
        defaultVisible: "visible"
    },
});
exports.GroupPanel = GroupPanel;
const _componentHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
});
exports.HeaderFilter = HeaderFilter;
const _componentHide = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Hide = Object.assign(_componentHide, {
    OptionName: "hide",
    ExpectedChildren: {
        from: { optionName: "from", isCollectionItem: false },
        to: { optionName: "to", isCollectionItem: false }
    },
});
exports.Hide = Hide;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Item = Item;
const _componentKeyboardNavigation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const KeyboardNavigation = Object.assign(_componentKeyboardNavigation, {
    OptionName: "keyboardNavigation",
});
exports.KeyboardNavigation = KeyboardNavigation;
const _componentLabel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Label = Object.assign(_componentLabel, {
    OptionName: "label",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.Label = Label;
const _componentLoadPanel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const LoadPanel = Object.assign(_componentLoadPanel, {
    OptionName: "loadPanel",
});
exports.LoadPanel = LoadPanel;
const _componentLookup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Lookup = Object.assign(_componentLookup, {
    OptionName: "lookup",
});
exports.Lookup = Lookup;
const _componentMasterDetail = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const MasterDetail = Object.assign(_componentMasterDetail, {
    OptionName: "masterDetail",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.MasterDetail = MasterDetail;
const _componentMy = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const My = Object.assign(_componentMy, {
    OptionName: "my",
});
exports.My = My;
const _componentNumericRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const NumericRule = Object.assign(_componentNumericRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "numeric"
    },
});
exports.NumericRule = NumericRule;
const _componentOffset = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Offset = Object.assign(_componentOffset, {
    OptionName: "offset",
});
exports.Offset = Offset;
const _componentOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const OperationDescriptions = Object.assign(_componentOperationDescriptions, {
    OptionName: "operationDescriptions",
});
exports.OperationDescriptions = OperationDescriptions;
const _componentPager = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Pager = Object.assign(_componentPager, {
    OptionName: "pager",
});
exports.Pager = Pager;
const _componentPaging = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Paging = Object.assign(_componentPaging, {
    OptionName: "paging",
    DefaultsProps: {
        defaultPageIndex: "pageIndex",
        defaultPageSize: "pageSize"
    },
});
exports.Paging = Paging;
const _componentPatternRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PatternRule = Object.assign(_componentPatternRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "pattern"
    },
});
exports.PatternRule = PatternRule;
const _componentPopup = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Popup = Popup;
const _componentPosition = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Position = Object.assign(_componentPosition, {
    OptionName: "position",
});
exports.Position = Position;
const _componentRangeRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RangeRule = Object.assign(_componentRangeRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "range"
    },
});
exports.RangeRule = RangeRule;
const _componentRemoteOperations = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RemoteOperations = Object.assign(_componentRemoteOperations, {
    OptionName: "remoteOperations",
});
exports.RemoteOperations = RemoteOperations;
const _componentRequiredRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const RequiredRule = Object.assign(_componentRequiredRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
exports.RequiredRule = RequiredRule;
const _componentRowDragging = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.RowDragging = RowDragging;
const _componentScrolling = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Scrolling = Object.assign(_componentScrolling, {
    OptionName: "scrolling",
});
exports.Scrolling = Scrolling;
const _componentSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
exports.Search = Search;
const _componentSearchPanel = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SearchPanel = Object.assign(_componentSearchPanel, {
    OptionName: "searchPanel",
    DefaultsProps: {
        defaultText: "text"
    },
});
exports.SearchPanel = SearchPanel;
const _componentSelection = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Selection = Object.assign(_componentSelection, {
    OptionName: "selection",
});
exports.Selection = Selection;
const _componentShow = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Show = Object.assign(_componentShow, {
    OptionName: "show",
});
exports.Show = Show;
const _componentSortByGroupSummaryInfo = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SortByGroupSummaryInfo = Object.assign(_componentSortByGroupSummaryInfo, {
    OptionName: "sortByGroupSummaryInfo",
    IsCollectionItem: true,
});
exports.SortByGroupSummaryInfo = SortByGroupSummaryInfo;
const _componentSorting = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Sorting = Object.assign(_componentSorting, {
    OptionName: "sorting",
});
exports.Sorting = Sorting;
const _componentStateStoring = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StateStoring = Object.assign(_componentStateStoring, {
    OptionName: "stateStoring",
});
exports.StateStoring = StateStoring;
const _componentStringLengthRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StringLengthRule = Object.assign(_componentStringLengthRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "stringLength"
    },
});
exports.StringLengthRule = StringLengthRule;
const _componentSummary = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Summary = Object.assign(_componentSummary, {
    OptionName: "summary",
    ExpectedChildren: {
        groupItem: { optionName: "groupItems", isCollectionItem: true },
        summaryTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false },
        totalItem: { optionName: "totalItems", isCollectionItem: true }
    },
});
exports.Summary = Summary;
const _componentSummaryTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const SummaryTexts = Object.assign(_componentSummaryTexts, {
    OptionName: "texts",
});
exports.SummaryTexts = SummaryTexts;
const _componentTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
exports.Texts = Texts;
const _componentTo = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const To = Object.assign(_componentTo, {
    OptionName: "to",
});
exports.To = To;
const _componentToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true }
    },
});
exports.Toolbar = Toolbar;
const _componentToolbarItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.ToolbarItem = ToolbarItem;
const _componentTotalItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const TotalItem = Object.assign(_componentTotalItem, {
    OptionName: "totalItems",
    IsCollectionItem: true,
    ExpectedChildren: {
        valueFormat: { optionName: "valueFormat", isCollectionItem: false }
    },
});
exports.TotalItem = TotalItem;
const _componentValidationRule = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValidationRule = Object.assign(_componentValidationRule, {
    OptionName: "validationRules",
    IsCollectionItem: true,
    PredefinedProps: {
        type: "required"
    },
});
exports.ValidationRule = ValidationRule;
const _componentValueFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ValueFormat = Object.assign(_componentValueFormat, {
    OptionName: "valueFormat",
});
exports.ValueFormat = ValueFormat;
exports.default = DataGrid;
