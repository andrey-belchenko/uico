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

export { ExplicitTypes } from "dpt-ui/ui/tree_list";
import * as React from "react";
import { Ref, ReactElement } from "react";
import dxTreeList, { Properties } from "dpt-ui/ui/tree_list";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { dxTreeListColumn, AdaptiveDetailRowPreparingEvent, CellClickEvent, CellDblClickEvent, CellPreparedEvent, ContentReadyEvent, ContextMenuPreparingEvent, DataErrorOccurredEvent, DisposingEvent, EditCanceledEvent, EditCancelingEvent, EditingStartEvent, EditorPreparedEvent, EditorPreparingEvent, FocusedCellChangingEvent, FocusedRowChangingEvent, InitializedEvent, InitNewRowEvent, KeyDownEvent, NodesInitializedEvent, RowClickEvent, RowCollapsedEvent, RowCollapsingEvent, RowDblClickEvent, RowExpandedEvent, RowExpandingEvent, RowInsertedEvent, RowInsertingEvent, RowPreparedEvent, RowRemovedEvent, RowRemovingEvent, RowUpdatedEvent, RowUpdatingEvent, RowValidatingEvent, SavedEvent, SavingEvent, ToolbarPreparingEvent, dxTreeListRowObject, dxTreeListColumnButton, dxTreeListToolbarItem } from "dpt-ui/ui/tree_list";
import type { DataChange, ColumnHeaderFilterSearchConfig, ColumnChooserSearchConfig, ColumnChooserSelectionConfig, GridBase, HeaderFilterSearchConfig } from "dpt-ui/common/grids";
import type { ContentReadyEvent as FilterBuilderContentReadyEvent, DisposingEvent as FilterBuilderDisposingEvent, EditorPreparedEvent as FilterBuilderEditorPreparedEvent, EditorPreparingEvent as FilterBuilderEditorPreparingEvent, InitializedEvent as FilterBuilderInitializedEvent, dxFilterBuilderField, dxFilterBuilderCustomOperation, OptionChangedEvent, ValueChangedEvent } from "dpt-ui/ui/filter_builder";
import type { ContentReadyEvent as FormContentReadyEvent, DisposingEvent as FormDisposingEvent, InitializedEvent as FormInitializedEvent, dxFormSimpleItem, dxFormOptions, OptionChangedEvent as FormOptionChangedEvent, dxFormGroupItem, dxFormTabbedItem, dxFormEmptyItem, dxFormButtonItem, EditorEnterKeyEvent, FieldDataChangedEvent } from "dpt-ui/ui/form";
import type { AnimationConfig, AnimationState } from "dpt-ui/animation/fx";
import type { event, EventInfo } from "dpt-ui/events/index";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type { PositionConfig } from "dpt-ui/animation/position";
import type { dxPopupOptions, dxPopupToolbarItem } from "dpt-ui/ui/popup";
import type { Component } from "dpt-ui/core/component";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type dxOverlay from "dpt-ui/ui/overlay";
import type DOMComponent from "dpt-ui/core/dom_component";
import type dxPopup from "dpt-ui/ui/popup";
import type dxForm from "dpt-ui/ui/form";
import type dxSortable from "dpt-ui/ui/sortable";
import type dxDraggable from "dpt-ui/ui/draggable";
import type * as LocalizationTypes from "dpt-ui/localization";
import type * as CommonTypes from "dpt-ui/common";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITreeListOptionsNarrowedEvents<TRowData = any, TKey = any> = {
    onAdaptiveDetailRowPreparing?: ((e: AdaptiveDetailRowPreparingEvent<TRowData, TKey>) => void);
    onCellClick?: ((e: CellClickEvent<TRowData, TKey>) => void);
    onCellDblClick?: ((e: CellDblClickEvent<TRowData, TKey>) => void);
    onCellPrepared?: ((e: CellPreparedEvent<TRowData, TKey>) => void);
    onContentReady?: ((e: ContentReadyEvent<TRowData, TKey>) => void);
    onContextMenuPreparing?: ((e: ContextMenuPreparingEvent<TRowData, TKey>) => void);
    onDataErrorOccurred?: ((e: DataErrorOccurredEvent<TRowData, TKey>) => void);
    onDisposing?: ((e: DisposingEvent<TRowData, TKey>) => void);
    onEditCanceled?: ((e: EditCanceledEvent<TRowData, TKey>) => void);
    onEditCanceling?: ((e: EditCancelingEvent<TRowData, TKey>) => void);
    onEditingStart?: ((e: EditingStartEvent<TRowData, TKey>) => void);
    onEditorPrepared?: ((e: EditorPreparedEvent<TRowData, TKey>) => void);
    onEditorPreparing?: ((e: EditorPreparingEvent<TRowData, TKey>) => void);
    onFocusedCellChanging?: ((e: FocusedCellChangingEvent<TRowData, TKey>) => void);
    onFocusedRowChanging?: ((e: FocusedRowChangingEvent<TRowData, TKey>) => void);
    onInitialized?: ((e: InitializedEvent<TRowData, TKey>) => void);
    onInitNewRow?: ((e: InitNewRowEvent<TRowData, TKey>) => void);
    onKeyDown?: ((e: KeyDownEvent<TRowData, TKey>) => void);
    onNodesInitialized?: ((e: NodesInitializedEvent<TRowData, TKey>) => void);
    onRowClick?: ((e: RowClickEvent<TRowData, TKey>) => void);
    onRowCollapsed?: ((e: RowCollapsedEvent<TRowData, TKey>) => void);
    onRowCollapsing?: ((e: RowCollapsingEvent<TRowData, TKey>) => void);
    onRowDblClick?: ((e: RowDblClickEvent<TRowData, TKey>) => void);
    onRowExpanded?: ((e: RowExpandedEvent<TRowData, TKey>) => void);
    onRowExpanding?: ((e: RowExpandingEvent<TRowData, TKey>) => void);
    onRowInserted?: ((e: RowInsertedEvent<TRowData, TKey>) => void);
    onRowInserting?: ((e: RowInsertingEvent<TRowData, TKey>) => void);
    onRowPrepared?: ((e: RowPreparedEvent<TRowData, TKey>) => void);
    onRowRemoved?: ((e: RowRemovedEvent<TRowData, TKey>) => void);
    onRowRemoving?: ((e: RowRemovingEvent<TRowData, TKey>) => void);
    onRowUpdated?: ((e: RowUpdatedEvent<TRowData, TKey>) => void);
    onRowUpdating?: ((e: RowUpdatingEvent<TRowData, TKey>) => void);
    onRowValidating?: ((e: RowValidatingEvent<TRowData, TKey>) => void);
    onSaved?: ((e: SavedEvent<TRowData, TKey>) => void);
    onSaving?: ((e: SavingEvent<TRowData, TKey>) => void);
    onToolbarPreparing?: ((e: ToolbarPreparingEvent<TRowData, TKey>) => void);
};
type ITreeListOptions<TRowData = any, TKey = any> = React.PropsWithChildren<ReplaceFieldTypes<Properties<TRowData, TKey>, ITreeListOptionsNarrowedEvents<TRowData, TKey>> & IHtmlOptions & {
    dataSource?: Properties<TRowData, TKey>["dataSource"];
    defaultColumns?: Array<dxTreeListColumn | string>;
    defaultEditing?: Record<string, any>;
    defaultExpandedRowKeys?: Array<any>;
    defaultFilterPanel?: Record<string, any>;
    defaultFilterValue?: Array<any> | (() => any) | string;
    defaultFocusedColumnIndex?: number;
    defaultFocusedRowIndex?: number;
    defaultFocusedRowKey?: any;
    defaultPaging?: Record<string, any>;
    defaultSearchPanel?: Record<string, any>;
    defaultSelectedRowKeys?: Array<any>;
    onColumnsChange?: (value: Array<dxTreeListColumn | string>) => void;
    onEditingChange?: (value: Record<string, any>) => void;
    onExpandedRowKeysChange?: (value: Array<any>) => void;
    onFilterPanelChange?: (value: Record<string, any>) => void;
    onFilterValueChange?: (value: Array<any> | (() => any) | string) => void;
    onFocusedColumnIndexChange?: (value: number) => void;
    onFocusedRowIndexChange?: (value: number) => void;
    onFocusedRowKeyChange?: (value: any) => void;
    onPagingChange?: (value: Record<string, any>) => void;
    onSearchPanelChange?: (value: Record<string, any>) => void;
    onSelectedRowKeysChange?: (value: Array<any>) => void;
}>;
interface TreeListRef<TRowData = any, TKey = any> {
    instance: () => dxTreeList<TRowData, TKey>;
}
declare const TreeList: <TRowData = any, TKey = any>(props: ReplaceFieldTypes<Properties<TRowData, TKey>, ITreeListOptionsNarrowedEvents<TRowData, TKey>> & IHtmlOptions & {
    dataSource?: import("../../dpt-ui/artifacts/npm/dpt-ui/data/data_source").DataSourceLike<TRowData, TKey> | null | undefined;
    defaultColumns?: (string | dxTreeListColumn<any, any>)[] | undefined;
    defaultEditing?: Record<string, any> | undefined;
    defaultExpandedRowKeys?: any[] | undefined;
    defaultFilterPanel?: Record<string, any> | undefined;
    defaultFilterValue?: string | any[] | (() => any) | undefined;
    defaultFocusedColumnIndex?: number | undefined;
    defaultFocusedRowIndex?: number | undefined;
    defaultFocusedRowKey?: any;
    defaultPaging?: Record<string, any> | undefined;
    defaultSearchPanel?: Record<string, any> | undefined;
    defaultSelectedRowKeys?: any[] | undefined;
    onColumnsChange?: ((value: Array<dxTreeListColumn | string>) => void) | undefined;
    onEditingChange?: ((value: Record<string, any>) => void) | undefined;
    onExpandedRowKeysChange?: ((value: Array<any>) => void) | undefined;
    onFilterPanelChange?: ((value: Record<string, any>) => void) | undefined;
    onFilterValueChange?: ((value: Array<any> | (() => any) | string) => void) | undefined;
    onFocusedColumnIndexChange?: ((value: number) => void) | undefined;
    onFocusedRowIndexChange?: ((value: number) => void) | undefined;
    onFocusedRowKeyChange?: ((value: any) => void) | undefined;
    onPagingChange?: ((value: Record<string, any>) => void) | undefined;
    onSearchPanelChange?: ((value: Record<string, any>) => void) | undefined;
    onSelectedRowKeysChange?: ((value: Array<any>) => void) | undefined;
} & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<TreeListRef<TRowData, TKey>> | undefined;
}) => ReactElement | null;
type IAnimationProps = React.PropsWithChildren<{
    hide?: AnimationConfig;
    show?: AnimationConfig;
}>;
declare const _componentAnimation: React.MemoExoticComponent<(props: IAnimationProps) => React.FunctionComponentElement<IAnimationProps>>;
declare const Animation: typeof _componentAnimation & IElementDescriptor;
type IAsyncRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => any);
}>;
declare const _componentAsyncRule: React.MemoExoticComponent<(props: IAsyncRuleProps) => React.FunctionComponentElement<IAsyncRuleProps>>;
declare const AsyncRule: typeof _componentAsyncRule & IElementDescriptor;
type IAtProps = React.PropsWithChildren<{
    x?: "center" | "left" | "right";
    y?: "bottom" | "center" | "top";
}>;
declare const _componentAt: React.MemoExoticComponent<(props: IAtProps) => React.FunctionComponentElement<IAtProps>>;
declare const At: typeof _componentAt & IElementDescriptor;
type IBoundaryOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentBoundaryOffset: React.MemoExoticComponent<(props: IBoundaryOffsetProps) => React.FunctionComponentElement<IBoundaryOffsetProps>>;
declare const BoundaryOffset: typeof _componentBoundaryOffset & IElementDescriptor;
type IButtonProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean | ((options: {
        column: dxTreeListColumn;
        component: dxTreeList;
        row: dxTreeListRowObject;
    }) => boolean);
    hint?: string;
    icon?: string;
    name?: "add" | "cancel" | "delete" | "edit" | "save" | "undelete";
    onClick?: ((e: {
        column: dxTreeListColumn;
        component: dxTreeList;
        element: any;
        event: event;
        model: any;
        row: dxTreeListRowObject;
    }) => void);
    template?: ((cellElement: any, cellInfo: {
        column: dxTreeListColumn;
        columnIndex: number;
        component: dxTreeList;
        data: Record<string, any>;
        key: any;
        row: dxTreeListRowObject;
        rowIndex: number;
        rowType: string;
    }) => string | any) | template;
    text?: string;
    visible?: boolean | ((options: {
        column: dxTreeListColumn;
        component: dxTreeList;
        row: dxTreeListRowObject;
    }) => boolean);
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentButton: React.MemoExoticComponent<(props: IButtonProps) => React.FunctionComponentElement<IButtonProps>>;
declare const Button: typeof _componentButton & IElementDescriptor;
type IChangeProps = React.PropsWithChildren<{
    data?: any;
    insertAfterKey?: any;
    insertBeforeKey?: any;
    key?: any;
    type?: "insert" | "update" | "remove";
}>;
declare const _componentChange: React.MemoExoticComponent<(props: IChangeProps) => React.FunctionComponentElement<IChangeProps>>;
declare const Change: typeof _componentChange & IElementDescriptor;
type IColCountByScreenProps = React.PropsWithChildren<{
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
}>;
declare const _componentColCountByScreen: React.MemoExoticComponent<(props: IColCountByScreenProps) => React.FunctionComponentElement<IColCountByScreenProps>>;
declare const ColCountByScreen: typeof _componentColCountByScreen & IElementDescriptor;
type ICollisionProps = React.PropsWithChildren<{
    x?: "fit" | "flip" | "flipfit" | "none";
    y?: "fit" | "flip" | "flipfit" | "none";
}>;
declare const _componentCollision: React.MemoExoticComponent<(props: ICollisionProps) => React.FunctionComponentElement<ICollisionProps>>;
declare const Collision: typeof _componentCollision & IElementDescriptor;
type IColumnProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    allowEditing?: boolean;
    allowFiltering?: boolean;
    allowFixing?: boolean;
    allowHeaderFiltering?: boolean;
    allowHiding?: boolean;
    allowReordering?: boolean;
    allowResizing?: boolean;
    allowSearch?: boolean;
    allowSorting?: boolean;
    buttons?: Array<dxTreeListColumnButton | "add" | "cancel" | "delete" | "edit" | "save" | "undelete">;
    calculateCellValue?: ((rowData: any) => any);
    calculateDisplayValue?: ((rowData: any) => any) | string;
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string | null, target: string) => string | (() => any) | Array<any>);
    calculateSortValue?: ((rowData: any) => any) | string;
    caption?: string;
    cellTemplate?: ((cellElement: any, cellInfo: {
        column: dxTreeListColumn;
        columnIndex: number;
        component: dxTreeList;
        data: Record<string, any>;
        displayValue: any;
        oldValue: any;
        row: dxTreeListRowObject;
        rowIndex: number;
        rowType: string;
        text: string;
        value: any;
        watch: (() => void);
    }) => any) | template;
    columns?: Array<dxTreeListColumn | string>;
    cssClass?: string;
    customizeText?: ((cellInfo: {
        groupInterval: string | number;
        target: string;
        value: any;
        valueText: string;
    }) => string);
    dataField?: string;
    dataType?: "string" | "number" | "date" | "boolean" | "object" | "datetime";
    editCellTemplate?: ((cellElement: any, cellInfo: {
        column: dxTreeListColumn;
        columnIndex: number;
        component: dxTreeList;
        data: Record<string, any>;
        displayValue: any;
        row: dxTreeListRowObject;
        rowIndex: number;
        rowType: string;
        setValue(newValue: any, newText: any): any;
        text: string;
        value: any;
        watch: (() => void);
    }) => any) | template;
    editorOptions?: any;
    encodeHtml?: boolean;
    falseText?: string;
    filterOperations?: Array<"=" | "<>" | "<" | "<=" | ">" | ">=" | "contains" | "endswith" | "isblank" | "isnotblank" | "notcontains" | "startswith" | "between" | "anyof" | "noneof" | string>;
    filterType?: "exclude" | "include";
    filterValue?: any;
    filterValues?: Array<any>;
    fixed?: boolean;
    fixedPosition?: "left" | "right";
    format?: LocalizationTypes.Format;
    formItem?: dxFormSimpleItem;
    headerCellTemplate?: ((columnHeader: any, headerInfo: {
        column: dxTreeListColumn;
        columnIndex: number;
        component: dxTreeList;
    }) => any) | template;
    headerFilter?: Record<string, any> | {
        allowSearch?: boolean;
        allowSelectAll?: boolean;
        dataSource?: Array<any> | DataSourceOptions | ((options: {
            component: Record<string, any>;
            dataSource: DataSourceOptions | null;
        }) => void) | null | Store;
        groupInterval?: number | "day" | "hour" | "minute" | "month" | "quarter" | "second" | "year";
        height?: number | string;
        search?: ColumnHeaderFilterSearchConfig;
        searchMode?: "contains" | "startswith" | "equals";
        width?: number | string;
    };
    hidingPriority?: number;
    isBand?: boolean;
    lookup?: Record<string, any> | {
        allowClearing?: boolean;
        calculateCellValue?: ((rowData: any) => any);
        dataSource?: Array<any> | DataSourceOptions | ((options: {
            data: Record<string, any>;
            key: any;
        }) => Array<any> | Store | DataSourceOptions) | null | Store;
        displayExpr?: ((data: any) => string) | string;
        valueExpr?: string;
    };
    minWidth?: number;
    name?: string;
    ownerBand?: number;
    renderAsync?: boolean;
    selectedFilterOperation?: "<" | "<=" | "<>" | "=" | ">" | ">=" | "between" | "contains" | "endswith" | "notcontains" | "startswith";
    setCellValue?: ((newData: any, value: any, currentRowData: any) => any);
    showEditorAlways?: boolean;
    showInColumnChooser?: boolean;
    sortIndex?: number;
    sortingMethod?: ((value1: any, value2: any) => number);
    sortOrder?: "asc" | "desc";
    trueText?: string;
    type?: "adaptive" | "buttons" | "drag";
    validationRules?: Array<CommonTypes.ValidationRule>;
    visible?: boolean;
    visibleIndex?: number;
    width?: number | string;
    defaultFilterValue?: any;
    onFilterValueChange?: (value: any) => void;
    defaultFilterValues?: Array<any>;
    onFilterValuesChange?: (value: Array<any>) => void;
    defaultSelectedFilterOperation?: "<" | "<=" | "<>" | "=" | ">" | ">=" | "between" | "contains" | "endswith" | "notcontains" | "startswith";
    onSelectedFilterOperationChange?: (value: "<" | "<=" | "<>" | "=" | ">" | ">=" | "between" | "contains" | "endswith" | "notcontains" | "startswith") => void;
    defaultSortIndex?: number;
    onSortIndexChange?: (value: number) => void;
    defaultSortOrder?: "asc" | "desc";
    onSortOrderChange?: (value: "asc" | "desc") => void;
    defaultVisible?: boolean;
    onVisibleChange?: (value: boolean) => void;
    defaultVisibleIndex?: number;
    onVisibleIndexChange?: (value: number) => void;
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
    editCellRender?: (...params: any) => React.ReactNode;
    editCellComponent?: React.ComponentType<any>;
    headerCellRender?: (...params: any) => React.ReactNode;
    headerCellComponent?: React.ComponentType<any>;
}>;
declare const _componentColumn: React.MemoExoticComponent<(props: IColumnProps) => React.FunctionComponentElement<IColumnProps>>;
declare const Column: typeof _componentColumn & IElementDescriptor;
type IColumnChooserProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    container?: any | string;
    emptyPanelText?: string;
    enabled?: boolean;
    height?: number | string;
    mode?: "dragAndDrop" | "select";
    position?: PositionConfig;
    search?: ColumnChooserSearchConfig;
    searchTimeout?: number;
    selection?: ColumnChooserSelectionConfig;
    sortOrder?: "asc" | "desc";
    title?: string;
    width?: number | string;
}>;
declare const _componentColumnChooser: React.MemoExoticComponent<(props: IColumnChooserProps) => React.FunctionComponentElement<IColumnChooserProps>>;
declare const ColumnChooser: typeof _componentColumnChooser & IElementDescriptor;
type IColumnChooserSearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    timeout?: number;
}>;
declare const _componentColumnChooserSearch: React.MemoExoticComponent<(props: IColumnChooserSearchProps) => React.FunctionComponentElement<IColumnChooserSearchProps>>;
declare const ColumnChooserSearch: typeof _componentColumnChooserSearch & IElementDescriptor;
type IColumnChooserSelectionProps = React.PropsWithChildren<{
    allowSelectAll?: boolean;
    recursive?: boolean;
    selectByClick?: boolean;
}>;
declare const _componentColumnChooserSelection: React.MemoExoticComponent<(props: IColumnChooserSelectionProps) => React.FunctionComponentElement<IColumnChooserSelectionProps>>;
declare const ColumnChooserSelection: typeof _componentColumnChooserSelection & IElementDescriptor;
type IColumnFixingProps = React.PropsWithChildren<{
    enabled?: boolean;
    texts?: Record<string, any> | {
        fix?: string;
        leftPosition?: string;
        rightPosition?: string;
        unfix?: string;
    };
}>;
declare const _componentColumnFixing: React.MemoExoticComponent<(props: IColumnFixingProps) => React.FunctionComponentElement<IColumnFixingProps>>;
declare const ColumnFixing: typeof _componentColumnFixing & IElementDescriptor;
type IColumnFixingTextsProps = React.PropsWithChildren<{
    fix?: string;
    leftPosition?: string;
    rightPosition?: string;
    unfix?: string;
}>;
declare const _componentColumnFixingTexts: React.MemoExoticComponent<(props: IColumnFixingTextsProps) => React.FunctionComponentElement<IColumnFixingTextsProps>>;
declare const ColumnFixingTexts: typeof _componentColumnFixingTexts & IElementDescriptor;
type IColumnHeaderFilterProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    allowSelectAll?: boolean;
    dataSource?: Array<any> | DataSourceOptions | ((options: {
        component: Record<string, any>;
        dataSource: DataSourceOptions | null;
    }) => void) | null | Store;
    groupInterval?: number | "day" | "hour" | "minute" | "month" | "quarter" | "second" | "year";
    height?: number | string;
    search?: ColumnHeaderFilterSearchConfig;
    searchMode?: "contains" | "startswith" | "equals";
    width?: number | string;
}>;
declare const _componentColumnHeaderFilter: React.MemoExoticComponent<(props: IColumnHeaderFilterProps) => React.FunctionComponentElement<IColumnHeaderFilterProps>>;
declare const ColumnHeaderFilter: typeof _componentColumnHeaderFilter & IElementDescriptor;
type IColumnHeaderFilterSearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    searchExpr?: Array<(() => any) | string> | (() => any) | string;
    timeout?: number;
}>;
declare const _componentColumnHeaderFilterSearch: React.MemoExoticComponent<(props: IColumnHeaderFilterSearchProps) => React.FunctionComponentElement<IColumnHeaderFilterSearchProps>>;
declare const ColumnHeaderFilterSearch: typeof _componentColumnHeaderFilterSearch & IElementDescriptor;
type IColumnLookupProps = React.PropsWithChildren<{
    allowClearing?: boolean;
    calculateCellValue?: ((rowData: any) => any);
    dataSource?: Array<any> | DataSourceOptions | ((options: {
        data: Record<string, any>;
        key: any;
    }) => Array<any> | Store | DataSourceOptions) | null | Store;
    displayExpr?: ((data: any) => string) | string;
    valueExpr?: string;
}>;
declare const _componentColumnLookup: React.MemoExoticComponent<(props: IColumnLookupProps) => React.FunctionComponentElement<IColumnLookupProps>>;
declare const ColumnLookup: typeof _componentColumnLookup & IElementDescriptor;
type ICompareRuleProps = React.PropsWithChildren<{
    comparisonTarget?: (() => any);
    comparisonType?: "!=" | "!==" | "<" | "<=" | "==" | "===" | ">" | ">=";
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentCompareRule: React.MemoExoticComponent<(props: ICompareRuleProps) => React.FunctionComponentElement<ICompareRuleProps>>;
declare const CompareRule: typeof _componentCompareRule & IElementDescriptor;
type ICursorOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentCursorOffset: React.MemoExoticComponent<(props: ICursorOffsetProps) => React.FunctionComponentElement<ICursorOffsetProps>>;
declare const CursorOffset: typeof _componentCursorOffset & IElementDescriptor;
type ICustomOperationProps = React.PropsWithChildren<{
    calculateFilterExpression?: ((filterValue: any, field: dxFilterBuilderField) => string | (() => any) | Array<any>);
    caption?: string;
    customizeText?: ((fieldInfo: {
        field: dxFilterBuilderField;
        value: string | number | Date;
        valueText: string;
    }) => string);
    dataTypes?: Array<"string" | "number" | "date" | "boolean" | "object" | "datetime">;
    editorTemplate?: ((conditionInfo: {
        field: dxFilterBuilderField;
        setValue: (() => void);
        value: string | number | Date;
    }, container: any) => string | any) | template;
    hasValue?: boolean;
    icon?: string;
    name?: string;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
}>;
declare const _componentCustomOperation: React.MemoExoticComponent<(props: ICustomOperationProps) => React.FunctionComponentElement<ICustomOperationProps>>;
declare const CustomOperation: typeof _componentCustomOperation & IElementDescriptor;
type ICustomRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => boolean);
}>;
declare const _componentCustomRule: React.MemoExoticComponent<(props: ICustomRuleProps) => React.FunctionComponentElement<ICustomRuleProps>>;
declare const CustomRule: typeof _componentCustomRule & IElementDescriptor;
type IEditingProps = React.PropsWithChildren<{
    allowAdding?: boolean | ((options: {
        component: dxTreeList;
        row: dxTreeListRowObject;
    }) => boolean);
    allowDeleting?: boolean | ((options: {
        component: dxTreeList;
        row: dxTreeListRowObject;
    }) => boolean);
    allowUpdating?: boolean | ((options: {
        component: dxTreeList;
        row: dxTreeListRowObject;
    }) => boolean);
    changes?: Array<DataChange>;
    confirmDelete?: boolean;
    editColumnName?: string;
    editRowKey?: any;
    form?: dxFormOptions;
    mode?: "batch" | "cell" | "row" | "form" | "popup";
    popup?: dxPopupOptions<any>;
    refreshMode?: "full" | "reshape" | "repaint";
    selectTextOnEditStart?: boolean;
    startEditAction?: "click" | "dblClick";
    texts?: Record<string, any> | {
        addRow?: string;
        addRowToNode?: string;
        cancelAllChanges?: string;
        cancelRowChanges?: string;
        confirmDeleteMessage?: string;
        confirmDeleteTitle?: string;
        deleteRow?: string;
        editRow?: string;
        saveAllChanges?: string;
        saveRowChanges?: string;
        undeleteRow?: string;
        validationCancelChanges?: string;
    };
    useIcons?: boolean;
    defaultChanges?: Array<DataChange>;
    onChangesChange?: (value: Array<DataChange>) => void;
    defaultEditColumnName?: string;
    onEditColumnNameChange?: (value: string) => void;
    defaultEditRowKey?: any;
    onEditRowKeyChange?: (value: any) => void;
}>;
declare const _componentEditing: React.MemoExoticComponent<(props: IEditingProps) => React.FunctionComponentElement<IEditingProps>>;
declare const Editing: typeof _componentEditing & IElementDescriptor;
type IEditingTextsProps = React.PropsWithChildren<{
    addRow?: string;
    addRowToNode?: string;
    cancelAllChanges?: string;
    cancelRowChanges?: string;
    confirmDeleteMessage?: string;
    confirmDeleteTitle?: string;
    deleteRow?: string;
    editRow?: string;
    saveAllChanges?: string;
    saveRowChanges?: string;
    undeleteRow?: string;
    validationCancelChanges?: string;
}>;
declare const _componentEditingTexts: React.MemoExoticComponent<(props: IEditingTextsProps) => React.FunctionComponentElement<IEditingTextsProps>>;
declare const EditingTexts: typeof _componentEditingTexts & IElementDescriptor;
type IEmailRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentEmailRule: React.MemoExoticComponent<(props: IEmailRuleProps) => React.FunctionComponentElement<IEmailRuleProps>>;
declare const EmailRule: typeof _componentEmailRule & IElementDescriptor;
type IFieldProps = React.PropsWithChildren<{
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string) => string | (() => any) | Array<any>);
    caption?: string;
    customizeText?: ((fieldInfo: {
        value: string | number | Date;
        valueText: string;
    }) => string);
    dataField?: string;
    dataType?: "string" | "number" | "date" | "boolean" | "object" | "datetime";
    editorOptions?: any;
    editorTemplate?: ((conditionInfo: {
        field: dxFilterBuilderField;
        filterOperation: string;
        setValue: (() => void);
        value: string | number | Date;
    }, container: any) => string | any) | template;
    falseText?: string;
    filterOperations?: Array<"=" | "<>" | "<" | "<=" | ">" | ">=" | "contains" | "endswith" | "isblank" | "isnotblank" | "notcontains" | "startswith" | "between" | string>;
    format?: LocalizationTypes.Format;
    lookup?: Record<string, any> | {
        allowClearing?: boolean;
        dataSource?: Array<any> | DataSourceOptions | Store;
        displayExpr?: ((data: any) => string) | string;
        valueExpr?: ((data: any) => string | number | boolean) | string;
    };
    name?: string;
    trueText?: string;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
}>;
declare const _componentField: React.MemoExoticComponent<(props: IFieldProps) => React.FunctionComponentElement<IFieldProps>>;
declare const Field: typeof _componentField & IElementDescriptor;
type IFieldLookupProps = React.PropsWithChildren<{
    allowClearing?: boolean;
    dataSource?: Array<any> | DataSourceOptions | Store;
    displayExpr?: ((data: any) => string) | string;
    valueExpr?: ((data: any) => string | number | boolean) | string;
}>;
declare const _componentFieldLookup: React.MemoExoticComponent<(props: IFieldLookupProps) => React.FunctionComponentElement<IFieldLookupProps>>;
declare const FieldLookup: typeof _componentFieldLookup & IElementDescriptor;
type IFilterBuilderProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    allowHierarchicalFields?: boolean;
    bindingOptions?: Record<string, any>;
    customOperations?: Array<dxFilterBuilderCustomOperation>;
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    fields?: Array<dxFilterBuilderField>;
    filterOperationDescriptions?: Record<string, any> | {
        between?: string;
        contains?: string;
        endsWith?: string;
        equal?: string;
        greaterThan?: string;
        greaterThanOrEqual?: string;
        isBlank?: string;
        isNotBlank?: string;
        lessThan?: string;
        lessThanOrEqual?: string;
        notContains?: string;
        notEqual?: string;
        startsWith?: string;
    };
    focusStateEnabled?: boolean;
    groupOperationDescriptions?: Record<string, any> | {
        and?: string;
        notAnd?: string;
        notOr?: string;
        or?: string;
    };
    groupOperations?: Array<"and" | "or" | "notAnd" | "notOr">;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    maxGroupLevel?: number;
    onContentReady?: ((e: FilterBuilderContentReadyEvent) => void);
    onDisposing?: ((e: FilterBuilderDisposingEvent) => void);
    onEditorPrepared?: ((e: FilterBuilderEditorPreparedEvent) => void);
    onEditorPreparing?: ((e: FilterBuilderEditorPreparingEvent) => void);
    onInitialized?: ((e: FilterBuilderInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
    rtlEnabled?: boolean;
    tabIndex?: number;
    value?: Array<any> | (() => any) | string;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    defaultValue?: Array<any> | (() => any) | string;
    onValueChange?: (value: Array<any> | (() => any) | string) => void;
}>;
declare const _componentFilterBuilder: React.MemoExoticComponent<(props: IFilterBuilderProps) => React.FunctionComponentElement<IFilterBuilderProps>>;
declare const FilterBuilder: typeof _componentFilterBuilder & IElementDescriptor;
type IFilterBuilderPopupProps = React.PropsWithChildren<{
    accessKey?: string;
    animation?: Record<string, any> | {
        hide?: AnimationConfig;
        show?: AnimationConfig;
    };
    bindingOptions?: Record<string, any>;
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    container?: any | string;
    contentTemplate?: ((contentElement: any) => string | any) | template;
    deferRendering?: boolean;
    disabled?: boolean;
    dragAndResizeArea?: any | string;
    dragEnabled?: boolean;
    dragOutsideBoundary?: boolean;
    enableBodyScroll?: boolean;
    focusStateEnabled?: boolean;
    fullScreen?: boolean;
    height?: (() => number | string) | number | string;
    hideOnOutsideClick?: boolean | ((event: event) => boolean);
    hideOnParentScroll?: boolean;
    hint?: string;
    hoverStateEnabled?: boolean;
    maxHeight?: (() => number | string) | number | string;
    maxWidth?: (() => number | string) | number | string;
    minHeight?: (() => number | string) | number | string;
    minWidth?: (() => number | string) | number | string;
    onContentReady?: ((e: EventInfo<any>) => void);
    onDisposing?: ((e: EventInfo<any>) => void);
    onHidden?: ((e: EventInfo<any>) => void);
    onHiding?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onInitialized?: ((e: {
        component: Component<any>;
        element: any;
    }) => void);
    onOptionChanged?: ((e: {
        component: DOMComponent;
        element: any;
        fullName: string;
        model: any;
        name: string;
        previousValue: any;
        value: any;
    }) => void);
    onResize?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeEnd?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeStart?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onShowing?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onShown?: ((e: EventInfo<any>) => void);
    onTitleRendered?: ((e: {
        component: dxPopup;
        element: any;
        model: any;
        titleElement: any;
    }) => void);
    position?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    resizeEnabled?: boolean;
    restorePosition?: boolean;
    rtlEnabled?: boolean;
    shading?: boolean;
    shadingColor?: string;
    showCloseButton?: boolean;
    showTitle?: boolean;
    tabIndex?: number;
    title?: string;
    titleTemplate?: ((titleElement: any) => string | any) | template;
    toolbarItems?: Array<dxPopupToolbarItem>;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    wrapperAttr?: any;
    defaultHeight?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    defaultPosition?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    onPositionChange?: (value: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top") => void;
    defaultVisible?: boolean;
    onVisibleChange?: (value: boolean) => void;
    defaultWidth?: (() => number | string) | number | string;
    onWidthChange?: (value: (() => number | string) | number | string) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
}>;
declare const _componentFilterBuilderPopup: React.MemoExoticComponent<(props: IFilterBuilderPopupProps) => React.FunctionComponentElement<IFilterBuilderPopupProps>>;
declare const FilterBuilderPopup: typeof _componentFilterBuilderPopup & IElementDescriptor;
type IFilterOperationDescriptionsProps = React.PropsWithChildren<{
    between?: string;
    contains?: string;
    endsWith?: string;
    equal?: string;
    greaterThan?: string;
    greaterThanOrEqual?: string;
    isBlank?: string;
    isNotBlank?: string;
    lessThan?: string;
    lessThanOrEqual?: string;
    notContains?: string;
    notEqual?: string;
    startsWith?: string;
}>;
declare const _componentFilterOperationDescriptions: React.MemoExoticComponent<(props: IFilterOperationDescriptionsProps) => React.FunctionComponentElement<IFilterOperationDescriptionsProps>>;
declare const FilterOperationDescriptions: typeof _componentFilterOperationDescriptions & IElementDescriptor;
type IFilterPanelProps = React.PropsWithChildren<{
    customizeText?: ((e: {
        component: GridBase;
        filterValue: Record<string, any>;
        text: string;
    }) => string);
    filterEnabled?: boolean;
    texts?: Record<string, any> | {
        clearFilter?: string;
        createFilter?: string;
        filterEnabledHint?: string;
    };
    visible?: boolean;
    defaultFilterEnabled?: boolean;
    onFilterEnabledChange?: (value: boolean) => void;
}>;
declare const _componentFilterPanel: React.MemoExoticComponent<(props: IFilterPanelProps) => React.FunctionComponentElement<IFilterPanelProps>>;
declare const FilterPanel: typeof _componentFilterPanel & IElementDescriptor;
type IFilterPanelTextsProps = React.PropsWithChildren<{
    clearFilter?: string;
    createFilter?: string;
    filterEnabledHint?: string;
}>;
declare const _componentFilterPanelTexts: React.MemoExoticComponent<(props: IFilterPanelTextsProps) => React.FunctionComponentElement<IFilterPanelTextsProps>>;
declare const FilterPanelTexts: typeof _componentFilterPanelTexts & IElementDescriptor;
type IFilterRowProps = React.PropsWithChildren<{
    applyFilter?: "auto" | "onClick";
    applyFilterText?: string;
    betweenEndText?: string;
    betweenStartText?: string;
    operationDescriptions?: Record<string, any> | {
        between?: string;
        contains?: string;
        endsWith?: string;
        equal?: string;
        greaterThan?: string;
        greaterThanOrEqual?: string;
        lessThan?: string;
        lessThanOrEqual?: string;
        notContains?: string;
        notEqual?: string;
        startsWith?: string;
    };
    resetOperationText?: string;
    showAllText?: string;
    showOperationChooser?: boolean;
    visible?: boolean;
}>;
declare const _componentFilterRow: React.MemoExoticComponent<(props: IFilterRowProps) => React.FunctionComponentElement<IFilterRowProps>>;
declare const FilterRow: typeof _componentFilterRow & IElementDescriptor;
type IFormProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    alignItemLabels?: boolean;
    alignItemLabelsInAllGroups?: boolean;
    bindingOptions?: Record<string, any>;
    colCount?: number | "auto";
    colCountByScreen?: Record<string, any> | {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
    };
    customizeItem?: ((item: dxFormSimpleItem | dxFormGroupItem | dxFormTabbedItem | dxFormEmptyItem | dxFormButtonItem) => void);
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    formData?: any;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    isDirty?: boolean;
    items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
    labelLocation?: "left" | "right" | "top";
    labelMode?: "static" | "floating" | "hidden" | "outside";
    minColWidth?: number;
    onContentReady?: ((e: FormContentReadyEvent) => void);
    onDisposing?: ((e: FormDisposingEvent) => void);
    onEditorEnterKey?: ((e: EditorEnterKeyEvent) => void);
    onFieldDataChanged?: ((e: FieldDataChangedEvent) => void);
    onInitialized?: ((e: FormInitializedEvent) => void);
    onOptionChanged?: ((e: FormOptionChangedEvent) => void);
    optionalMark?: string;
    readOnly?: boolean;
    requiredMark?: string;
    requiredMessage?: string;
    rtlEnabled?: boolean;
    screenByWidth?: (() => void);
    scrollingEnabled?: boolean;
    showColonAfterLabel?: boolean;
    showOptionalMark?: boolean;
    showRequiredMark?: boolean;
    showValidationSummary?: boolean;
    tabIndex?: number;
    validationGroup?: string;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    defaultFormData?: any;
    onFormDataChange?: (value: any) => void;
}>;
declare const _componentForm: React.MemoExoticComponent<(props: IFormProps) => React.FunctionComponentElement<IFormProps>>;
declare const Form: typeof _componentForm & IElementDescriptor;
type IFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentFormat: React.MemoExoticComponent<(props: IFormatProps) => React.FunctionComponentElement<IFormatProps>>;
declare const Format: typeof _componentFormat & IElementDescriptor;
type IFormItemProps = React.PropsWithChildren<{
    colSpan?: number;
    cssClass?: string;
    dataField?: string;
    editorOptions?: any;
    editorType?: "dxAutocomplete" | "dxCalendar" | "dxCheckBox" | "dxColorBox" | "dxDateBox" | "dxDateRangeBox" | "dxDropDownBox" | "dxHtmlEditor" | "dxLookup" | "dxNumberBox" | "dxRadioGroup" | "dxRangeSlider" | "dxSelectBox" | "dxSlider" | "dxSwitch" | "dxTagBox" | "dxTextArea" | "dxTextBox";
    helpText?: string;
    isRequired?: boolean;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    label?: Record<string, any> | {
        alignment?: "center" | "left" | "right";
        location?: "left" | "right" | "top";
        showColon?: boolean;
        template?: ((itemData: {
            component: dxForm;
            dataField: string;
            editorOptions: any;
            editorType: string;
            name: string;
            text: string;
        }, itemElement: any) => string | any) | template;
        text?: string;
        visible?: boolean;
    };
    name?: string;
    template?: ((data: {
        component: dxForm;
        dataField: string;
        editorOptions: Record<string, any>;
        editorType: string;
        name: string;
    }, itemElement: any) => string | any) | template;
    validationRules?: Array<CommonTypes.ValidationRule>;
    visible?: boolean;
    visibleIndex?: number;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentFormItem: React.MemoExoticComponent<(props: IFormItemProps) => React.FunctionComponentElement<IFormItemProps>>;
declare const FormItem: typeof _componentFormItem & IElementDescriptor;
type IFromProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentFrom: React.MemoExoticComponent<(props: IFromProps) => React.FunctionComponentElement<IFromProps>>;
declare const From: typeof _componentFrom & IElementDescriptor;
type IGroupOperationDescriptionsProps = React.PropsWithChildren<{
    and?: string;
    notAnd?: string;
    notOr?: string;
    or?: string;
}>;
declare const _componentGroupOperationDescriptions: React.MemoExoticComponent<(props: IGroupOperationDescriptionsProps) => React.FunctionComponentElement<IGroupOperationDescriptionsProps>>;
declare const GroupOperationDescriptions: typeof _componentGroupOperationDescriptions & IElementDescriptor;
type IHeaderFilterProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    allowSelectAll?: boolean;
    dataSource?: Array<any> | DataSourceOptions | ((options: {
        component: Record<string, any>;
        dataSource: DataSourceOptions | null;
    }) => void) | null | Store;
    groupInterval?: number | "day" | "hour" | "minute" | "month" | "quarter" | "second" | "year";
    height?: number | string;
    search?: ColumnHeaderFilterSearchConfig | HeaderFilterSearchConfig;
    searchMode?: "contains" | "startswith" | "equals";
    width?: number | string;
    searchTimeout?: number;
    texts?: Record<string, any> | {
        cancel?: string;
        emptyValue?: string;
        ok?: string;
    };
    visible?: boolean;
}>;
declare const _componentHeaderFilter: React.MemoExoticComponent<(props: IHeaderFilterProps) => React.FunctionComponentElement<IHeaderFilterProps>>;
declare const HeaderFilter: typeof _componentHeaderFilter & IElementDescriptor;
type IHideProps = React.PropsWithChildren<{
    complete?: (($element: any, config: AnimationConfig) => void);
    delay?: number;
    direction?: "bottom" | "left" | "right" | "top";
    duration?: number;
    easing?: string;
    from?: AnimationState;
    staggerDelay?: number;
    start?: (($element: any, config: AnimationConfig) => void);
    to?: AnimationState;
    type?: "css" | "fade" | "fadeIn" | "fadeOut" | "pop" | "slide" | "slideIn" | "slideOut";
}>;
declare const _componentHide: React.MemoExoticComponent<(props: IHideProps) => React.FunctionComponentElement<IHideProps>>;
declare const Hide: typeof _componentHide & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    name?: "addRowButton" | "applyFilterButton" | "columnChooserButton" | "revertButton" | "saveButton" | "searchPanel";
    options?: any;
    showText?: "always" | "inMenu";
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IKeyboardNavigationProps = React.PropsWithChildren<{
    editOnKeyPress?: boolean;
    enabled?: boolean;
    enterKeyAction?: "startEdit" | "moveFocus";
    enterKeyDirection?: "none" | "column" | "row";
}>;
declare const _componentKeyboardNavigation: React.MemoExoticComponent<(props: IKeyboardNavigationProps) => React.FunctionComponentElement<IKeyboardNavigationProps>>;
declare const KeyboardNavigation: typeof _componentKeyboardNavigation & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    location?: "left" | "right" | "top";
    showColon?: boolean;
    template?: ((itemData: {
        component: dxForm;
        dataField: string;
        editorOptions: any;
        editorType: string;
        name: string;
        text: string;
    }, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
type ILoadPanelProps = React.PropsWithChildren<{
    enabled?: boolean | "auto";
    height?: number | string;
    indicatorSrc?: string;
    shading?: boolean;
    shadingColor?: string;
    showIndicator?: boolean;
    showPane?: boolean;
    text?: string;
    width?: number | string;
}>;
declare const _componentLoadPanel: React.MemoExoticComponent<(props: ILoadPanelProps) => React.FunctionComponentElement<ILoadPanelProps>>;
declare const LoadPanel: typeof _componentLoadPanel & IElementDescriptor;
type ILookupProps = React.PropsWithChildren<{
    allowClearing?: boolean;
    calculateCellValue?: ((rowData: any) => any);
    dataSource?: Array<any> | DataSourceOptions | ((options: {
        data: Record<string, any>;
        key: any;
    }) => Array<any> | Store | DataSourceOptions) | null | Store;
    displayExpr?: ((data: any) => string) | string;
    valueExpr?: string | ((data: any) => string | number | boolean);
}>;
declare const _componentLookup: React.MemoExoticComponent<(props: ILookupProps) => React.FunctionComponentElement<ILookupProps>>;
declare const Lookup: typeof _componentLookup & IElementDescriptor;
type IMyProps = React.PropsWithChildren<{
    x?: "center" | "left" | "right";
    y?: "bottom" | "center" | "top";
}>;
declare const _componentMy: React.MemoExoticComponent<(props: IMyProps) => React.FunctionComponentElement<IMyProps>>;
declare const My: typeof _componentMy & IElementDescriptor;
type INumericRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentNumericRule: React.MemoExoticComponent<(props: INumericRuleProps) => React.FunctionComponentElement<INumericRuleProps>>;
declare const NumericRule: typeof _componentNumericRule & IElementDescriptor;
type IOffsetProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentOffset: React.MemoExoticComponent<(props: IOffsetProps) => React.FunctionComponentElement<IOffsetProps>>;
declare const Offset: typeof _componentOffset & IElementDescriptor;
type IOperationDescriptionsProps = React.PropsWithChildren<{
    between?: string;
    contains?: string;
    endsWith?: string;
    equal?: string;
    greaterThan?: string;
    greaterThanOrEqual?: string;
    lessThan?: string;
    lessThanOrEqual?: string;
    notContains?: string;
    notEqual?: string;
    startsWith?: string;
}>;
declare const _componentOperationDescriptions: React.MemoExoticComponent<(props: IOperationDescriptionsProps) => React.FunctionComponentElement<IOperationDescriptionsProps>>;
declare const OperationDescriptions: typeof _componentOperationDescriptions & IElementDescriptor;
type IPagerProps = React.PropsWithChildren<{
    allowedPageSizes?: Array<number | "all" | "auto"> | "auto";
    displayMode?: "adaptive" | "compact" | "full";
    infoText?: string;
    label?: string;
    showInfo?: boolean;
    showNavigationButtons?: boolean;
    showPageSizeSelector?: boolean;
    visible?: boolean | "auto";
}>;
declare const _componentPager: React.MemoExoticComponent<(props: IPagerProps) => React.FunctionComponentElement<IPagerProps>>;
declare const Pager: typeof _componentPager & IElementDescriptor;
type IPagingProps = React.PropsWithChildren<{
    enabled?: boolean;
    pageIndex?: number;
    pageSize?: number;
    defaultPageIndex?: number;
    onPageIndexChange?: (value: number) => void;
    defaultPageSize?: number;
    onPageSizeChange?: (value: number) => void;
}>;
declare const _componentPaging: React.MemoExoticComponent<(props: IPagingProps) => React.FunctionComponentElement<IPagingProps>>;
declare const Paging: typeof _componentPaging & IElementDescriptor;
type IPatternRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    pattern?: RegExp | string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentPatternRule: React.MemoExoticComponent<(props: IPatternRuleProps) => React.FunctionComponentElement<IPatternRuleProps>>;
declare const PatternRule: typeof _componentPatternRule & IElementDescriptor;
type IPopupProps = React.PropsWithChildren<{
    accessKey?: string;
    animation?: Record<string, any> | {
        hide?: AnimationConfig;
        show?: AnimationConfig;
    };
    bindingOptions?: Record<string, any>;
    closeOnOutsideClick?: boolean | ((event: event) => boolean);
    container?: any | string;
    contentTemplate?: ((contentElement: any) => string | any) | template;
    deferRendering?: boolean;
    disabled?: boolean;
    dragAndResizeArea?: any | string;
    dragEnabled?: boolean;
    dragOutsideBoundary?: boolean;
    enableBodyScroll?: boolean;
    focusStateEnabled?: boolean;
    fullScreen?: boolean;
    height?: (() => number | string) | number | string;
    hideOnOutsideClick?: boolean | ((event: event) => boolean);
    hideOnParentScroll?: boolean;
    hint?: string;
    hoverStateEnabled?: boolean;
    maxHeight?: (() => number | string) | number | string;
    maxWidth?: (() => number | string) | number | string;
    minHeight?: (() => number | string) | number | string;
    minWidth?: (() => number | string) | number | string;
    onContentReady?: ((e: EventInfo<any>) => void);
    onDisposing?: ((e: EventInfo<any>) => void);
    onHidden?: ((e: EventInfo<any>) => void);
    onHiding?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onInitialized?: ((e: {
        component: Component<any>;
        element: any;
    }) => void);
    onOptionChanged?: ((e: {
        component: DOMComponent;
        element: any;
        fullName: string;
        model: any;
        name: string;
        previousValue: any;
        value: any;
    }) => void);
    onResize?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeEnd?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onResizeStart?: ((e: {
        component: dxPopup;
        element: any;
        event: event;
        height: number;
        model: any;
        width: number;
    }) => void);
    onShowing?: ((e: {
        cancel: boolean | any;
        component: dxOverlay<any>;
        element: any;
        model: any;
    }) => void);
    onShown?: ((e: EventInfo<any>) => void);
    onTitleRendered?: ((e: {
        component: dxPopup;
        element: any;
        model: any;
        titleElement: any;
    }) => void);
    position?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    resizeEnabled?: boolean;
    restorePosition?: boolean;
    rtlEnabled?: boolean;
    shading?: boolean;
    shadingColor?: string;
    showCloseButton?: boolean;
    showTitle?: boolean;
    tabIndex?: number;
    title?: string;
    titleTemplate?: ((titleElement: any) => string | any) | template;
    toolbarItems?: Array<dxPopupToolbarItem>;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    wrapperAttr?: any;
    defaultHeight?: (() => number | string) | number | string;
    onHeightChange?: (value: (() => number | string) | number | string) => void;
    defaultPosition?: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top";
    onPositionChange?: (value: (() => void) | PositionConfig | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top") => void;
    defaultVisible?: boolean;
    onVisibleChange?: (value: boolean) => void;
    defaultWidth?: (() => number | string) | number | string;
    onWidthChange?: (value: (() => number | string) | number | string) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
}>;
declare const _componentPopup: React.MemoExoticComponent<(props: IPopupProps) => React.FunctionComponentElement<IPopupProps>>;
declare const Popup: typeof _componentPopup & IElementDescriptor;
type IPositionProps = React.PropsWithChildren<{
    at?: Record<string, any> | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top" | {
        x?: "center" | "left" | "right";
        y?: "bottom" | "center" | "top";
    };
    boundary?: any | string;
    boundaryOffset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
    collision?: Record<string, any> | "fit" | "fit flip" | "fit flipfit" | "fit none" | "flip" | "flip fit" | "flip none" | "flipfit" | "flipfit fit" | "flipfit none" | "none" | "none fit" | "none flip" | "none flipfit" | {
        x?: "fit" | "flip" | "flipfit" | "none";
        y?: "fit" | "flip" | "flipfit" | "none";
    };
    my?: Record<string, any> | "bottom" | "center" | "left" | "left bottom" | "left top" | "right" | "right bottom" | "right top" | "top" | {
        x?: "center" | "left" | "right";
        y?: "bottom" | "center" | "top";
    };
    of?: any | string;
    offset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
}>;
declare const _componentPosition: React.MemoExoticComponent<(props: IPositionProps) => React.FunctionComponentElement<IPositionProps>>;
declare const Position: typeof _componentPosition & IElementDescriptor;
type IRangeRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    max?: Date | number | string;
    message?: string;
    min?: Date | number | string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentRangeRule: React.MemoExoticComponent<(props: IRangeRuleProps) => React.FunctionComponentElement<IRangeRuleProps>>;
declare const RangeRule: typeof _componentRangeRule & IElementDescriptor;
type IRemoteOperationsProps = React.PropsWithChildren<{
    filtering?: boolean;
    grouping?: boolean;
    sorting?: boolean;
}>;
declare const _componentRemoteOperations: React.MemoExoticComponent<(props: IRemoteOperationsProps) => React.FunctionComponentElement<IRemoteOperationsProps>>;
declare const RemoteOperations: typeof _componentRemoteOperations & IElementDescriptor;
type IRequiredRuleProps = React.PropsWithChildren<{
    message?: string;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentRequiredRule: React.MemoExoticComponent<(props: IRequiredRuleProps) => React.FunctionComponentElement<IRequiredRuleProps>>;
declare const RequiredRule: typeof _componentRequiredRule & IElementDescriptor;
type IRowDraggingProps = React.PropsWithChildren<{
    allowDropInsideItem?: boolean;
    allowReordering?: boolean;
    autoScroll?: boolean;
    boundary?: any | string;
    container?: any | string;
    cursorOffset?: Record<string, any> | string | {
        x?: number;
        y?: number;
    };
    data?: any;
    dragDirection?: "both" | "horizontal" | "vertical";
    dragTemplate?: ((dragInfo: {
        itemData: any;
        itemElement: any;
    }, containerElement: any) => string | any) | template;
    dropFeedbackMode?: "push" | "indicate";
    filter?: string;
    group?: string;
    handle?: string;
    onAdd?: ((e: {
        component: GridBase;
        dropInsideItem: boolean;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    onDragChange?: ((e: {
        cancel: boolean;
        component: GridBase;
        dropInsideItem: boolean;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    onDragEnd?: ((e: {
        cancel: boolean;
        component: GridBase;
        dropInsideItem: boolean;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    onDragMove?: ((e: {
        cancel: boolean;
        component: GridBase;
        dropInsideItem: boolean;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    onDragStart?: ((e: {
        cancel: boolean;
        component: GridBase;
        event: event;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
    }) => void);
    onRemove?: ((e: {
        component: GridBase;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    onReorder?: ((e: {
        component: GridBase;
        dropInsideItem: boolean;
        event: event;
        fromComponent: dxSortable | dxDraggable;
        fromData: any;
        fromIndex: number;
        itemData: any;
        itemElement: any;
        promise: any;
        toComponent: dxSortable | dxDraggable;
        toData: any;
        toIndex: number;
    }) => void);
    scrollSensitivity?: number;
    scrollSpeed?: number;
    showDragIcons?: boolean;
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
}>;
declare const _componentRowDragging: React.MemoExoticComponent<(props: IRowDraggingProps) => React.FunctionComponentElement<IRowDraggingProps>>;
declare const RowDragging: typeof _componentRowDragging & IElementDescriptor;
type IScrollingProps = React.PropsWithChildren<{
    columnRenderingMode?: "standard" | "virtual";
    mode?: "standard" | "virtual";
    preloadEnabled?: boolean;
    renderAsync?: boolean;
    rowRenderingMode?: "standard" | "virtual";
    scrollByContent?: boolean;
    scrollByThumb?: boolean;
    showScrollbar?: "always" | "never" | "onHover" | "onScroll";
    useNative?: boolean | "auto";
}>;
declare const _componentScrolling: React.MemoExoticComponent<(props: IScrollingProps) => React.FunctionComponentElement<IScrollingProps>>;
declare const Scrolling: typeof _componentScrolling & IElementDescriptor;
type ISearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    searchExpr?: Array<(() => any) | string> | (() => any) | string;
    timeout?: number;
}>;
declare const _componentSearch: React.MemoExoticComponent<(props: ISearchProps) => React.FunctionComponentElement<ISearchProps>>;
declare const Search: typeof _componentSearch & IElementDescriptor;
type ISearchPanelProps = React.PropsWithChildren<{
    highlightCaseSensitive?: boolean;
    highlightSearchText?: boolean;
    placeholder?: string;
    searchVisibleColumnsOnly?: boolean;
    text?: string;
    visible?: boolean;
    width?: number | string;
    defaultText?: string;
    onTextChange?: (value: string) => void;
}>;
declare const _componentSearchPanel: React.MemoExoticComponent<(props: ISearchPanelProps) => React.FunctionComponentElement<ISearchPanelProps>>;
declare const SearchPanel: typeof _componentSearchPanel & IElementDescriptor;
type ISelectionProps = React.PropsWithChildren<{
    allowSelectAll?: boolean;
    mode?: "single" | "multiple" | "none";
    recursive?: boolean;
    selectByClick?: boolean;
}>;
declare const _componentSelection: React.MemoExoticComponent<(props: ISelectionProps) => React.FunctionComponentElement<ISelectionProps>>;
declare const Selection: typeof _componentSelection & IElementDescriptor;
type IShowProps = React.PropsWithChildren<{
    complete?: (($element: any, config: AnimationConfig) => void);
    delay?: number;
    direction?: "bottom" | "left" | "right" | "top";
    duration?: number;
    easing?: string;
    from?: AnimationState;
    staggerDelay?: number;
    start?: (($element: any, config: AnimationConfig) => void);
    to?: AnimationState;
    type?: "css" | "fade" | "fadeIn" | "fadeOut" | "pop" | "slide" | "slideIn" | "slideOut";
}>;
declare const _componentShow: React.MemoExoticComponent<(props: IShowProps) => React.FunctionComponentElement<IShowProps>>;
declare const Show: typeof _componentShow & IElementDescriptor;
type ISortingProps = React.PropsWithChildren<{
    ascendingText?: string;
    clearText?: string;
    descendingText?: string;
    mode?: "single" | "multiple" | "none";
    showSortIndexes?: boolean;
}>;
declare const _componentSorting: React.MemoExoticComponent<(props: ISortingProps) => React.FunctionComponentElement<ISortingProps>>;
declare const Sorting: typeof _componentSorting & IElementDescriptor;
type IStateStoringProps = React.PropsWithChildren<{
    customLoad?: (() => any);
    customSave?: ((gridState: any) => void);
    enabled?: boolean;
    savingTimeout?: number;
    storageKey?: string;
    type?: "custom" | "localStorage" | "sessionStorage";
}>;
declare const _componentStateStoring: React.MemoExoticComponent<(props: IStateStoringProps) => React.FunctionComponentElement<IStateStoringProps>>;
declare const StateStoring: typeof _componentStateStoring & IElementDescriptor;
type IStringLengthRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    max?: number;
    message?: string;
    min?: number;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentStringLengthRule: React.MemoExoticComponent<(props: IStringLengthRuleProps) => React.FunctionComponentElement<IStringLengthRuleProps>>;
declare const StringLengthRule: typeof _componentStringLengthRule & IElementDescriptor;
type ITextsProps = React.PropsWithChildren<{
    addRow?: string;
    addRowToNode?: string;
    cancelAllChanges?: string;
    cancelRowChanges?: string;
    confirmDeleteMessage?: string;
    confirmDeleteTitle?: string;
    deleteRow?: string;
    editRow?: string;
    saveAllChanges?: string;
    saveRowChanges?: string;
    undeleteRow?: string;
    validationCancelChanges?: string;
    fix?: string;
    leftPosition?: string;
    rightPosition?: string;
    unfix?: string;
    clearFilter?: string;
    createFilter?: string;
    filterEnabledHint?: string;
    cancel?: string;
    emptyValue?: string;
    ok?: string;
}>;
declare const _componentTexts: React.MemoExoticComponent<(props: ITextsProps) => React.FunctionComponentElement<ITextsProps>>;
declare const Texts: typeof _componentTexts & IElementDescriptor;
type IToProps = React.PropsWithChildren<{
    left?: number;
    opacity?: number;
    position?: PositionConfig;
    scale?: number;
    top?: number;
}>;
declare const _componentTo: React.MemoExoticComponent<(props: IToProps) => React.FunctionComponentElement<IToProps>>;
declare const To: typeof _componentTo & IElementDescriptor;
type IToolbarProps = React.PropsWithChildren<{
    disabled?: boolean;
    items?: Array<dxTreeListToolbarItem | "addRowButton" | "applyFilterButton" | "columnChooserButton" | "revertButton" | "saveButton" | "searchPanel">;
    visible?: boolean;
}>;
declare const _componentToolbar: React.MemoExoticComponent<(props: IToolbarProps) => React.FunctionComponentElement<IToolbarProps>>;
declare const Toolbar: typeof _componentToolbar & IElementDescriptor;
type IToolbarItemProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    options?: any;
    showText?: "always" | "inMenu";
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    toolbar?: "bottom" | "top";
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentToolbarItem: React.MemoExoticComponent<(props: IToolbarItemProps) => React.FunctionComponentElement<IToolbarItemProps>>;
declare const ToolbarItem: typeof _componentToolbarItem & IElementDescriptor;
type ITreeListHeaderFilterProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    allowSelectAll?: boolean;
    height?: number | string;
    search?: HeaderFilterSearchConfig;
    searchTimeout?: number;
    texts?: Record<string, any> | {
        cancel?: string;
        emptyValue?: string;
        ok?: string;
    };
    visible?: boolean;
    width?: number | string;
}>;
declare const _componentTreeListHeaderFilter: React.MemoExoticComponent<(props: ITreeListHeaderFilterProps) => React.FunctionComponentElement<ITreeListHeaderFilterProps>>;
declare const TreeListHeaderFilter: typeof _componentTreeListHeaderFilter & IElementDescriptor;
type ITreeListHeaderFilterSearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    timeout?: number;
}>;
declare const _componentTreeListHeaderFilterSearch: React.MemoExoticComponent<(props: ITreeListHeaderFilterSearchProps) => React.FunctionComponentElement<ITreeListHeaderFilterSearchProps>>;
declare const TreeListHeaderFilterSearch: typeof _componentTreeListHeaderFilterSearch & IElementDescriptor;
type ITreeListHeaderFilterTextsProps = React.PropsWithChildren<{
    cancel?: string;
    emptyValue?: string;
    ok?: string;
}>;
declare const _componentTreeListHeaderFilterTexts: React.MemoExoticComponent<(props: ITreeListHeaderFilterTextsProps) => React.FunctionComponentElement<ITreeListHeaderFilterTextsProps>>;
declare const TreeListHeaderFilterTexts: typeof _componentTreeListHeaderFilterTexts & IElementDescriptor;
type ITreeListSelectionProps = React.PropsWithChildren<{
    allowSelectAll?: boolean;
    mode?: "single" | "multiple" | "none";
    recursive?: boolean;
}>;
declare const _componentTreeListSelection: React.MemoExoticComponent<(props: ITreeListSelectionProps) => React.FunctionComponentElement<ITreeListSelectionProps>>;
declare const TreeListSelection: typeof _componentTreeListSelection & IElementDescriptor;
type IValidationRuleProps = React.PropsWithChildren<{
    message?: string;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    ignoreEmptyValue?: boolean;
    max?: Date | number | string;
    min?: Date | number | string;
    reevaluate?: boolean;
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => boolean);
    comparisonTarget?: (() => any);
    comparisonType?: "!=" | "!==" | "<" | "<=" | "==" | "===" | ">" | ">=";
    pattern?: RegExp | string;
}>;
declare const _componentValidationRule: React.MemoExoticComponent<(props: IValidationRuleProps) => React.FunctionComponentElement<IValidationRuleProps>>;
declare const ValidationRule: typeof _componentValidationRule & IElementDescriptor;
export default TreeList;
export { TreeList, ITreeListOptions, TreeListRef, Animation, IAnimationProps, AsyncRule, IAsyncRuleProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Button, IButtonProps, Change, IChangeProps, ColCountByScreen, IColCountByScreenProps, Collision, ICollisionProps, Column, IColumnProps, ColumnChooser, IColumnChooserProps, ColumnChooserSearch, IColumnChooserSearchProps, ColumnChooserSelection, IColumnChooserSelectionProps, ColumnFixing, IColumnFixingProps, ColumnFixingTexts, IColumnFixingTextsProps, ColumnHeaderFilter, IColumnHeaderFilterProps, ColumnHeaderFilterSearch, IColumnHeaderFilterSearchProps, ColumnLookup, IColumnLookupProps, CompareRule, ICompareRuleProps, CursorOffset, ICursorOffsetProps, CustomOperation, ICustomOperationProps, CustomRule, ICustomRuleProps, Editing, IEditingProps, EditingTexts, IEditingTextsProps, EmailRule, IEmailRuleProps, Field, IFieldProps, FieldLookup, IFieldLookupProps, FilterBuilder, IFilterBuilderProps, FilterBuilderPopup, IFilterBuilderPopupProps, FilterOperationDescriptions, IFilterOperationDescriptionsProps, FilterPanel, IFilterPanelProps, FilterPanelTexts, IFilterPanelTextsProps, FilterRow, IFilterRowProps, Form, IFormProps, Format, IFormatProps, FormItem, IFormItemProps, From, IFromProps, GroupOperationDescriptions, IGroupOperationDescriptionsProps, HeaderFilter, IHeaderFilterProps, Hide, IHideProps, Item, IItemProps, KeyboardNavigation, IKeyboardNavigationProps, Label, ILabelProps, LoadPanel, ILoadPanelProps, Lookup, ILookupProps, My, IMyProps, NumericRule, INumericRuleProps, Offset, IOffsetProps, OperationDescriptions, IOperationDescriptionsProps, Pager, IPagerProps, Paging, IPagingProps, PatternRule, IPatternRuleProps, Popup, IPopupProps, Position, IPositionProps, RangeRule, IRangeRuleProps, RemoteOperations, IRemoteOperationsProps, RequiredRule, IRequiredRuleProps, RowDragging, IRowDraggingProps, Scrolling, IScrollingProps, Search, ISearchProps, SearchPanel, ISearchPanelProps, Selection, ISelectionProps, Show, IShowProps, Sorting, ISortingProps, StateStoring, IStateStoringProps, StringLengthRule, IStringLengthRuleProps, Texts, ITextsProps, To, IToProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, TreeListHeaderFilter, ITreeListHeaderFilterProps, TreeListHeaderFilterSearch, ITreeListHeaderFilterSearchProps, TreeListHeaderFilterTexts, ITreeListHeaderFilterTextsProps, TreeListSelection, ITreeListSelectionProps, ValidationRule, IValidationRuleProps };
import type * as TreeListTypes from 'dpt-ui/ui/tree_list_types';
export { TreeListTypes };
