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
exports.Validation = exports.ToolbarItem = exports.Toolbar = exports.Texts = exports.Tasks = exports.StripLine = exports.Sorting = exports.Search = exports.ScaleTypeRange = exports.Resources = exports.ResourceAssignments = exports.OperationDescriptions = exports.Item = exports.HeaderFilter = exports.GanttHeaderFilterSearch = exports.GanttHeaderFilter = exports.Format = exports.FilterRow = exports.Editing = exports.Dependencies = exports.ContextMenuItem = exports.ContextMenu = exports.ColumnHeaderFilterSearch = exports.ColumnHeaderFilter = exports.Column = exports.Gantt = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const gantt_1 = __importDefault(require("dpt-ui/ui/gantt"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Gantt = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onContextMenuPreparing", "onCustomCommand", "onDependencyDeleted", "onDependencyDeleting", "onDependencyInserted", "onDependencyInserting", "onDisposing", "onInitialized", "onResourceAssigned", "onResourceAssigning", "onResourceDeleted", "onResourceDeleting", "onResourceInserted", "onResourceInserting", "onResourceManagerDialogShowing", "onResourceUnassigned", "onResourceUnassigning", "onScaleCellPrepared", "onTaskClick", "onTaskDblClick", "onTaskDeleted", "onTaskDeleting", "onTaskEditDialogShowing", "onTaskInserted", "onTaskInserting", "onTaskMoving", "onTaskUpdated", "onTaskUpdating"]), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
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
    const templateProps = (0, react_1.useMemo)(() => ([
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
    return (React.createElement((component_1.Component), {
        WidgetClass: gantt_1.default,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.Gantt = Gantt;
const _componentColumn = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Column = Column;
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
const _componentContextMenu = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    },
});
exports.ContextMenu = ContextMenu;
const _componentContextMenuItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.ContextMenuItem = ContextMenuItem;
const _componentDependencies = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Dependencies = Object.assign(_componentDependencies, {
    OptionName: "dependencies",
});
exports.Dependencies = Dependencies;
const _componentEditing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
});
exports.Editing = Editing;
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
const _componentFormat = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Format = Object.assign(_componentFormat, {
    OptionName: "format",
});
exports.Format = Format;
const _componentGanttHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GanttHeaderFilter = Object.assign(_componentGanttHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        ganttHeaderFilterSearch: { optionName: "search", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.GanttHeaderFilter = GanttHeaderFilter;
const _componentGanttHeaderFilterSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const GanttHeaderFilterSearch = Object.assign(_componentGanttHeaderFilterSearch, {
    OptionName: "search",
});
exports.GanttHeaderFilterSearch = GanttHeaderFilterSearch;
const _componentHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
});
exports.HeaderFilter = HeaderFilter;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.Item = Item;
const _componentOperationDescriptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const OperationDescriptions = Object.assign(_componentOperationDescriptions, {
    OptionName: "operationDescriptions",
});
exports.OperationDescriptions = OperationDescriptions;
const _componentResourceAssignments = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ResourceAssignments = Object.assign(_componentResourceAssignments, {
    OptionName: "resourceAssignments",
});
exports.ResourceAssignments = ResourceAssignments;
const _componentResources = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Resources = Object.assign(_componentResources, {
    OptionName: "resources",
});
exports.Resources = Resources;
const _componentScaleTypeRange = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ScaleTypeRange = Object.assign(_componentScaleTypeRange, {
    OptionName: "scaleTypeRange",
});
exports.ScaleTypeRange = ScaleTypeRange;
const _componentSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
exports.Search = Search;
const _componentSorting = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Sorting = Object.assign(_componentSorting, {
    OptionName: "sorting",
});
exports.Sorting = Sorting;
const _componentStripLine = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const StripLine = Object.assign(_componentStripLine, {
    OptionName: "stripLines",
    IsCollectionItem: true,
});
exports.StripLine = StripLine;
const _componentTasks = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Tasks = Object.assign(_componentTasks, {
    OptionName: "tasks",
});
exports.Tasks = Tasks;
const _componentTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
exports.Texts = Texts;
const _componentToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    },
});
exports.Toolbar = Toolbar;
const _componentToolbarItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
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
exports.ToolbarItem = ToolbarItem;
const _componentValidation = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Validation = Object.assign(_componentValidation, {
    OptionName: "validation",
});
exports.Validation = Validation;
exports.default = Gantt;
