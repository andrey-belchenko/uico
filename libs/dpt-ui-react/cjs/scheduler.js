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
exports.View = exports.Scrolling = exports.Resource = exports.Editing = exports.AppointmentDragging = exports.Scheduler = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const scheduler_1 = __importDefault(require("dpt-ui/ui/scheduler"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const Scheduler = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["currentDate", "currentView"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentTooltipShowing", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onContentReady", "onDisposing", "onInitialized"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultCurrentDate: "currentDate",
        defaultCurrentView: "currentView",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        appointmentDragging: { optionName: "appointmentDragging", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        resource: { optionName: "resources", isCollectionItem: true },
        scrolling: { optionName: "scrolling", isCollectionItem: false },
        view: { optionName: "views", isCollectionItem: true }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "appointmentCollectorTemplate",
            render: "appointmentCollectorRender",
            component: "appointmentCollectorComponent"
        },
        {
            tmplOption: "appointmentTemplate",
            render: "appointmentRender",
            component: "appointmentComponent"
        },
        {
            tmplOption: "appointmentTooltipTemplate",
            render: "appointmentTooltipRender",
            component: "appointmentTooltipComponent"
        },
        {
            tmplOption: "dataCellTemplate",
            render: "dataCellRender",
            component: "dataCellComponent"
        },
        {
            tmplOption: "dateCellTemplate",
            render: "dateCellRender",
            component: "dateCellComponent"
        },
        {
            tmplOption: "dropDownAppointmentTemplate",
            render: "dropDownAppointmentRender",
            component: "dropDownAppointmentComponent"
        },
        {
            tmplOption: "resourceCellTemplate",
            render: "resourceCellRender",
            component: "resourceCellComponent"
        },
        {
            tmplOption: "timeCellTemplate",
            render: "timeCellRender",
            component: "timeCellComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: scheduler_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.Scheduler = Scheduler;
const _componentAppointmentDragging = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const AppointmentDragging = Object.assign(_componentAppointmentDragging, {
    OptionName: "appointmentDragging",
});
exports.AppointmentDragging = AppointmentDragging;
const _componentEditing = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
});
exports.Editing = Editing;
const _componentResource = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Resource = Object.assign(_componentResource, {
    OptionName: "resources",
    IsCollectionItem: true,
});
exports.Resource = Resource;
const _componentScrolling = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Scrolling = Object.assign(_componentScrolling, {
    OptionName: "scrolling",
});
exports.Scrolling = Scrolling;
const _componentView = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const View = Object.assign(_componentView, {
    OptionName: "views",
    IsCollectionItem: true,
    ExpectedChildren: {
        scrolling: { optionName: "scrolling", isCollectionItem: false }
    },
    TemplateProps: [{
            tmplOption: "appointmentCollectorTemplate",
            render: "appointmentCollectorRender",
            component: "appointmentCollectorComponent"
        }, {
            tmplOption: "appointmentTemplate",
            render: "appointmentRender",
            component: "appointmentComponent"
        }, {
            tmplOption: "appointmentTooltipTemplate",
            render: "appointmentTooltipRender",
            component: "appointmentTooltipComponent"
        }, {
            tmplOption: "dataCellTemplate",
            render: "dataCellRender",
            component: "dataCellComponent"
        }, {
            tmplOption: "dateCellTemplate",
            render: "dateCellRender",
            component: "dateCellComponent"
        }, {
            tmplOption: "dropDownAppointmentTemplate",
            render: "dropDownAppointmentRender",
            component: "dropDownAppointmentComponent"
        }, {
            tmplOption: "resourceCellTemplate",
            render: "resourceCellRender",
            component: "resourceCellComponent"
        }, {
            tmplOption: "timeCellTemplate",
            render: "timeCellRender",
            component: "timeCellComponent"
        }],
});
exports.View = View;
exports.default = Scheduler;
