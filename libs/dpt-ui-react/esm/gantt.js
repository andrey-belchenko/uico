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
import dxGantt from "dpt-ui/ui/gantt";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Gantt = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = useMemo(() => (["onContentReady", "onContextMenuPreparing", "onCustomCommand", "onDependencyDeleted", "onDependencyDeleting", "onDependencyInserted", "onDependencyInserting", "onDisposing", "onInitialized", "onResourceAssigned", "onResourceAssigning", "onResourceDeleted", "onResourceDeleting", "onResourceInserted", "onResourceInserting", "onResourceManagerDialogShowing", "onResourceUnassigned", "onResourceUnassigning", "onScaleCellPrepared", "onTaskClick", "onTaskDblClick", "onTaskDeleted", "onTaskDeleting", "onTaskEditDialogShowing", "onTaskInserted", "onTaskInserting", "onTaskMoving", "onTaskUpdated", "onTaskUpdating"]), []);
    const expectedChildren = useMemo(() => ({
        column: { optionName: "columns", isCollectionItem: true },
        contextMenu: { optionName: "contextMenu", isCollectionItem: false },
        dependencies: { optionName: "dependencies", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        filterRow: { optionName: "filterRow", isCollectionItem: false },
        ganttHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        resourceAssignments: { optionName: "resourceAssignments", isCollectionItem: false },
        resources: { optionName: "resources", isCollectionItem: false },
        scaleTypeRange: { optionName: "scaleTypeRange", isCollectionItem: false },
        sorting: { optionName: "sorting", isCollectionItem: false },
        stripLine: { optionName: "stripLines", isCollectionItem: true },
        tasks: { optionName: "tasks", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        validation: { optionName: "validation", isCollectionItem: false }
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "taskContentTemplate",
            render: "taskContentRender",
            component: "taskContentComponent"
        },
        {
            tmplOption: "taskProgressTooltipContentTemplate",
            render: "taskProgressTooltipContentRender",
            component: "taskProgressTooltipContentComponent"
        },
        {
            tmplOption: "taskTimeTooltipContentTemplate",
            render: "taskTimeTooltipContentRender",
            component: "taskTimeTooltipContentComponent"
        },
        {
            tmplOption: "taskTooltipContentTemplate",
            render: "taskTooltipContentRender",
            component: "taskTooltipContentComponent"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxGantt,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
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
        columnHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "cellTemplate",
            render: "cellRender",
            component: "cellComponent"
        }, {
            tmplOption: "headerCellTemplate",
            render: "headerCellRender",
            component: "headerCellComponent"
        }],
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
const _componentContextMenu = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    },
});
const _componentContextMenuItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextMenuItem = Object.assign(_componentContextMenuItem, {
    OptionName: "items",
    IsCollectionItem: true,
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
const _componentDependencies = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Dependencies = Object.assign(_componentDependencies, {
    OptionName: "dependencies",
});
const _componentEditing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
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
const _componentFormat = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
const _componentGanttHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GanttHeaderFilter = Object.assign(_componentGanttHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        ganttHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
const _componentGanttHeaderFilterSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const GanttHeaderFilterSearch = Object.assign(_componentGanttHeaderFilterSearch, {
    OptionName: "search",
});
const _componentHeaderFilter = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
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
const _componentOperationDescriptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const OperationDescriptions = Object.assign(_componentOperationDescriptions, {
    OptionName: "operationDescriptions",
});
const _componentResourceAssignments = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ResourceAssignments = Object.assign(_componentResourceAssignments, {
    OptionName: "resourceAssignments",
});
const _componentResources = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Resources = Object.assign(_componentResources, {
    OptionName: "resources",
});
const _componentScaleTypeRange = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ScaleTypeRange = Object.assign(_componentScaleTypeRange, {
    OptionName: "scaleTypeRange",
});
const _componentSearch = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
const _componentSorting = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Sorting = Object.assign(_componentSorting, {
    OptionName: "sorting",
});
const _componentStripLine = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const StripLine = Object.assign(_componentStripLine, {
    OptionName: "stripLines",
    IsCollectionItem: true,
});
const _componentTasks = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Tasks = Object.assign(_componentTasks, {
    OptionName: "tasks",
});
const _componentTexts = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
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
const _componentValidation = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Validation = Object.assign(_componentValidation, {
    OptionName: "validation",
});
export default Gantt;
export { Gantt, Column, ColumnHeaderFilter, ColumnHeaderFilterSearch, ContextMenu, ContextMenuItem, Dependencies, Editing, FilterRow, Format, GanttHeaderFilter, GanttHeaderFilterSearch, HeaderFilter, Item, OperationDescriptions, ResourceAssignments, Resources, ScaleTypeRange, Search, Sorting, StripLine, Tasks, Texts, Toolbar, ToolbarItem, Validation };
