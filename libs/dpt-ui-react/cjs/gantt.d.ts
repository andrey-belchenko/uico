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

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxGantt, { Properties } from "dpt-ui/ui/gantt";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, ContextMenuPreparingEvent, CustomCommandEvent, DependencyDeletedEvent, DependencyDeletingEvent, DependencyInsertedEvent, DependencyInsertingEvent, DisposingEvent, InitializedEvent, ResourceAssignedEvent, ResourceAssigningEvent, ResourceDeletedEvent, ResourceDeletingEvent, ResourceInsertedEvent, ResourceInsertingEvent, ResourceManagerDialogShowingEvent, ResourceUnassignedEvent, ResourceUnassigningEvent, ScaleCellPreparedEvent, TaskClickEvent, TaskDblClickEvent, TaskDeletedEvent, TaskDeletingEvent, TaskEditDialogShowingEvent, TaskInsertedEvent, TaskInsertingEvent, TaskMovingEvent, TaskUpdatedEvent, TaskUpdatingEvent, dxGanttContextMenuItem, dxGanttFilterRowOperationDescriptions, dxGanttHeaderFilterTexts, dxGanttToolbarItem } from "dpt-ui/ui/gantt";
import type { dxTreeListColumn, dxTreeListRowObject } from "dpt-ui/ui/tree_list";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type { ColumnHeaderFilterSearchConfig, HeaderFilterSearchConfig } from "dpt-ui/common/grids";
import type { dxContextMenuItem } from "dpt-ui/ui/context_menu";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type dxTreeList from "dpt-ui/ui/tree_list";
import type DataSource from "dpt-ui/data/data_source";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IGanttOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onContextMenuPreparing?: ((e: ContextMenuPreparingEvent) => void);
    onCustomCommand?: ((e: CustomCommandEvent) => void);
    onDependencyDeleted?: ((e: DependencyDeletedEvent) => void);
    onDependencyDeleting?: ((e: DependencyDeletingEvent) => void);
    onDependencyInserted?: ((e: DependencyInsertedEvent) => void);
    onDependencyInserting?: ((e: DependencyInsertingEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onResourceAssigned?: ((e: ResourceAssignedEvent) => void);
    onResourceAssigning?: ((e: ResourceAssigningEvent) => void);
    onResourceDeleted?: ((e: ResourceDeletedEvent) => void);
    onResourceDeleting?: ((e: ResourceDeletingEvent) => void);
    onResourceInserted?: ((e: ResourceInsertedEvent) => void);
    onResourceInserting?: ((e: ResourceInsertingEvent) => void);
    onResourceManagerDialogShowing?: ((e: ResourceManagerDialogShowingEvent) => void);
    onResourceUnassigned?: ((e: ResourceUnassignedEvent) => void);
    onResourceUnassigning?: ((e: ResourceUnassigningEvent) => void);
    onScaleCellPrepared?: ((e: ScaleCellPreparedEvent) => void);
    onTaskClick?: ((e: TaskClickEvent) => void);
    onTaskDblClick?: ((e: TaskDblClickEvent) => void);
    onTaskDeleted?: ((e: TaskDeletedEvent) => void);
    onTaskDeleting?: ((e: TaskDeletingEvent) => void);
    onTaskEditDialogShowing?: ((e: TaskEditDialogShowingEvent) => void);
    onTaskInserted?: ((e: TaskInsertedEvent) => void);
    onTaskInserting?: ((e: TaskInsertingEvent) => void);
    onTaskMoving?: ((e: TaskMovingEvent) => void);
    onTaskUpdated?: ((e: TaskUpdatedEvent) => void);
    onTaskUpdating?: ((e: TaskUpdatingEvent) => void);
};
type IGanttOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IGanttOptionsNarrowedEvents> & IHtmlOptions & {
    taskContentRender?: (...params: any) => React.ReactNode;
    taskContentComponent?: React.ComponentType<any>;
    taskProgressTooltipContentRender?: (...params: any) => React.ReactNode;
    taskProgressTooltipContentComponent?: React.ComponentType<any>;
    taskTimeTooltipContentRender?: (...params: any) => React.ReactNode;
    taskTimeTooltipContentComponent?: React.ComponentType<any>;
    taskTooltipContentRender?: (...params: any) => React.ReactNode;
    taskTooltipContentComponent?: React.ComponentType<any>;
}>;
interface GanttRef {
    instance: () => dxGantt;
}
declare const Gantt: (props: React.PropsWithChildren<IGanttOptions> & {
    ref?: Ref<GanttRef>;
}) => ReactElement | null;
type IColumnProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    allowFiltering?: boolean;
    allowHeaderFiltering?: boolean;
    allowSorting?: boolean;
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
    cssClass?: string;
    customizeText?: ((cellInfo: {
        groupInterval: string | number;
        target: string;
        value: any;
        valueText: string;
    }) => string);
    dataField?: string;
    dataType?: "string" | "number" | "date" | "boolean" | "object" | "datetime";
    encodeHtml?: boolean;
    falseText?: string;
    filterOperations?: Array<"=" | "<>" | "<" | "<=" | ">" | ">=" | "contains" | "endswith" | "isblank" | "isnotblank" | "notcontains" | "startswith" | "between" | "anyof" | "noneof" | string>;
    filterType?: "exclude" | "include";
    filterValue?: any;
    filterValues?: Array<any>;
    format?: LocalizationTypes.Format;
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
    minWidth?: number;
    selectedFilterOperation?: "<" | "<=" | "<>" | "=" | ">" | ">=" | "between" | "contains" | "endswith" | "notcontains" | "startswith";
    sortIndex?: number;
    sortingMethod?: ((value1: any, value2: any) => number);
    sortOrder?: "asc" | "desc";
    trueText?: string;
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
    headerCellRender?: (...params: any) => React.ReactNode;
    headerCellComponent?: React.ComponentType<any>;
}>;
declare const _componentColumn: React.MemoExoticComponent<(props: IColumnProps) => React.FunctionComponentElement<IColumnProps>>;
declare const Column: typeof _componentColumn & IElementDescriptor;
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
type IContextMenuProps = React.PropsWithChildren<{
    enabled?: boolean;
    items?: Array<dxGanttContextMenuItem | "undo" | "redo" | "expandAll" | "collapseAll" | "addTask" | "deleteTask" | "zoomIn" | "zoomOut" | "deleteDependency" | "taskDetails" | "resourceManager">;
}>;
declare const _componentContextMenu: React.MemoExoticComponent<(props: IContextMenuProps) => React.FunctionComponentElement<IContextMenuProps>>;
declare const ContextMenu: typeof _componentContextMenu & IElementDescriptor;
type IContextMenuItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxContextMenuItem>;
    name?: "undo" | "redo" | "expandAll" | "collapseAll" | "addTask" | "deleteTask" | "zoomIn" | "zoomOut" | "deleteDependency" | "taskDetails" | "resourceManager";
    selectable?: boolean;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentContextMenuItem: React.MemoExoticComponent<(props: IContextMenuItemProps) => React.FunctionComponentElement<IContextMenuItemProps>>;
declare const ContextMenuItem: typeof _componentContextMenuItem & IElementDescriptor;
type IDependenciesProps = React.PropsWithChildren<{
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    keyExpr?: (() => void) | string;
    predecessorIdExpr?: (() => void) | string;
    successorIdExpr?: (() => void) | string;
    typeExpr?: (() => void) | string;
}>;
declare const _componentDependencies: React.MemoExoticComponent<(props: IDependenciesProps) => React.FunctionComponentElement<IDependenciesProps>>;
declare const Dependencies: typeof _componentDependencies & IElementDescriptor;
type IEditingProps = React.PropsWithChildren<{
    allowDependencyAdding?: boolean;
    allowDependencyDeleting?: boolean;
    allowResourceAdding?: boolean;
    allowResourceDeleting?: boolean;
    allowResourceUpdating?: boolean;
    allowTaskAdding?: boolean;
    allowTaskDeleting?: boolean;
    allowTaskResourceUpdating?: boolean;
    allowTaskUpdating?: boolean;
    enabled?: boolean;
}>;
declare const _componentEditing: React.MemoExoticComponent<(props: IEditingProps) => React.FunctionComponentElement<IEditingProps>>;
declare const Editing: typeof _componentEditing & IElementDescriptor;
type IFilterRowProps = React.PropsWithChildren<{
    betweenEndText?: string;
    betweenStartText?: string;
    operationDescriptions?: dxGanttFilterRowOperationDescriptions;
    resetOperationText?: string;
    showAllText?: string;
    showOperationChooser?: boolean;
    visible?: boolean;
}>;
declare const _componentFilterRow: React.MemoExoticComponent<(props: IFilterRowProps) => React.FunctionComponentElement<IFilterRowProps>>;
declare const FilterRow: typeof _componentFilterRow & IElementDescriptor;
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
type IGanttHeaderFilterProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    allowSelectAll?: boolean;
    height?: number;
    search?: HeaderFilterSearchConfig;
    searchTimeout?: number;
    texts?: dxGanttHeaderFilterTexts;
    visible?: boolean;
    width?: number;
}>;
declare const _componentGanttHeaderFilter: React.MemoExoticComponent<(props: IGanttHeaderFilterProps) => React.FunctionComponentElement<IGanttHeaderFilterProps>>;
declare const GanttHeaderFilter: typeof _componentGanttHeaderFilter & IElementDescriptor;
type IGanttHeaderFilterSearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    timeout?: number;
}>;
declare const _componentGanttHeaderFilterSearch: React.MemoExoticComponent<(props: IGanttHeaderFilterSearchProps) => React.FunctionComponentElement<IGanttHeaderFilterSearchProps>>;
declare const GanttHeaderFilterSearch: typeof _componentGanttHeaderFilterSearch & IElementDescriptor;
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
    texts?: dxGanttHeaderFilterTexts;
    visible?: boolean;
}>;
declare const _componentHeaderFilter: React.MemoExoticComponent<(props: IHeaderFilterProps) => React.FunctionComponentElement<IHeaderFilterProps>>;
declare const HeaderFilter: typeof _componentHeaderFilter & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxContextMenuItem>;
    name?: "undo" | "redo" | "expandAll" | "collapseAll" | "addTask" | "deleteTask" | "zoomIn" | "zoomOut" | "deleteDependency" | "taskDetails" | "resourceManager" | "separator" | "fullScreen" | "showResources" | "showDependencies";
    selectable?: boolean;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    cssClass?: string;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    options?: any;
    showText?: "always" | "inMenu";
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
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
type IResourceAssignmentsProps = React.PropsWithChildren<{
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    keyExpr?: (() => void) | string;
    resourceIdExpr?: (() => void) | string;
    taskIdExpr?: (() => void) | string;
}>;
declare const _componentResourceAssignments: React.MemoExoticComponent<(props: IResourceAssignmentsProps) => React.FunctionComponentElement<IResourceAssignmentsProps>>;
declare const ResourceAssignments: typeof _componentResourceAssignments & IElementDescriptor;
type IResourcesProps = React.PropsWithChildren<{
    colorExpr?: (() => void) | string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    keyExpr?: (() => void) | string;
    textExpr?: (() => void) | string;
}>;
declare const _componentResources: React.MemoExoticComponent<(props: IResourcesProps) => React.FunctionComponentElement<IResourcesProps>>;
declare const Resources: typeof _componentResources & IElementDescriptor;
type IScaleTypeRangeProps = React.PropsWithChildren<{
    max?: "auto" | "minutes" | "hours" | "sixHours" | "days" | "weeks" | "months" | "quarters" | "years";
    min?: "auto" | "minutes" | "hours" | "sixHours" | "days" | "weeks" | "months" | "quarters" | "years";
}>;
declare const _componentScaleTypeRange: React.MemoExoticComponent<(props: IScaleTypeRangeProps) => React.FunctionComponentElement<IScaleTypeRangeProps>>;
declare const ScaleTypeRange: typeof _componentScaleTypeRange & IElementDescriptor;
type ISearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    searchExpr?: Array<(() => any) | string> | (() => any) | string;
    timeout?: number;
}>;
declare const _componentSearch: React.MemoExoticComponent<(props: ISearchProps) => React.FunctionComponentElement<ISearchProps>>;
declare const Search: typeof _componentSearch & IElementDescriptor;
type ISortingProps = React.PropsWithChildren<{
    ascendingText?: string;
    clearText?: string;
    descendingText?: string;
    mode?: "single" | "multiple" | "none";
    showSortIndexes?: boolean;
}>;
declare const _componentSorting: React.MemoExoticComponent<(props: ISortingProps) => React.FunctionComponentElement<ISortingProps>>;
declare const Sorting: typeof _componentSorting & IElementDescriptor;
type IStripLineProps = React.PropsWithChildren<{
    cssClass?: string;
    end?: Date | (() => Date | number | string) | number | string;
    start?: Date | (() => Date | number | string) | number | string;
    title?: string;
}>;
declare const _componentStripLine: React.MemoExoticComponent<(props: IStripLineProps) => React.FunctionComponentElement<IStripLineProps>>;
declare const StripLine: typeof _componentStripLine & IElementDescriptor;
type ITasksProps = React.PropsWithChildren<{
    colorExpr?: (() => void) | string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    endExpr?: (() => void) | string;
    keyExpr?: (() => void) | string;
    parentIdExpr?: (() => void) | string;
    progressExpr?: (() => void) | string;
    startExpr?: (() => void) | string;
    titleExpr?: (() => void) | string;
}>;
declare const _componentTasks: React.MemoExoticComponent<(props: ITasksProps) => React.FunctionComponentElement<ITasksProps>>;
declare const Tasks: typeof _componentTasks & IElementDescriptor;
type ITextsProps = React.PropsWithChildren<{
    cancel?: string;
    emptyValue?: string;
    ok?: string;
}>;
declare const _componentTexts: React.MemoExoticComponent<(props: ITextsProps) => React.FunctionComponentElement<ITextsProps>>;
declare const Texts: typeof _componentTexts & IElementDescriptor;
type IToolbarProps = React.PropsWithChildren<{
    items?: Array<dxGanttToolbarItem | "separator" | "undo" | "redo" | "expandAll" | "collapseAll" | "addTask" | "deleteTask" | "zoomIn" | "zoomOut" | "taskDetails" | "fullScreen" | "resourceManager" | "showResources" | "showDependencies">;
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
    name?: "separator" | "undo" | "redo" | "expandAll" | "collapseAll" | "addTask" | "deleteTask" | "zoomIn" | "zoomOut" | "taskDetails" | "fullScreen" | "resourceManager" | "showResources" | "showDependencies";
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
declare const _componentToolbarItem: React.MemoExoticComponent<(props: IToolbarItemProps) => React.FunctionComponentElement<IToolbarItemProps>>;
declare const ToolbarItem: typeof _componentToolbarItem & IElementDescriptor;
type IValidationProps = React.PropsWithChildren<{
    autoUpdateParentTasks?: boolean;
    enablePredecessorGap?: boolean;
    validateDependencies?: boolean;
}>;
declare const _componentValidation: React.MemoExoticComponent<(props: IValidationProps) => React.FunctionComponentElement<IValidationProps>>;
declare const Validation: typeof _componentValidation & IElementDescriptor;
export default Gantt;
export { Gantt, IGanttOptions, GanttRef, Column, IColumnProps, ColumnHeaderFilter, IColumnHeaderFilterProps, ColumnHeaderFilterSearch, IColumnHeaderFilterSearchProps, ContextMenu, IContextMenuProps, ContextMenuItem, IContextMenuItemProps, Dependencies, IDependenciesProps, Editing, IEditingProps, FilterRow, IFilterRowProps, Format, IFormatProps, GanttHeaderFilter, IGanttHeaderFilterProps, GanttHeaderFilterSearch, IGanttHeaderFilterSearchProps, HeaderFilter, IHeaderFilterProps, Item, IItemProps, OperationDescriptions, IOperationDescriptionsProps, ResourceAssignments, IResourceAssignmentsProps, Resources, IResourcesProps, ScaleTypeRange, IScaleTypeRangeProps, Search, ISearchProps, Sorting, ISortingProps, StripLine, IStripLineProps, Tasks, ITasksProps, Texts, ITextsProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, Validation, IValidationProps };
import type * as GanttTypes from 'dpt-ui/ui/gantt_types';
export { GanttTypes };
