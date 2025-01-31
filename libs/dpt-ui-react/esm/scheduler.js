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
import dxScheduler from "dpt-ui/ui/scheduler";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const Scheduler = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["currentDate", "currentView"]), []);
    const independentEvents = useMemo(() => (["onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentTooltipShowing", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "onContentReady", "onDisposing", "onInitialized"]), []);
    const defaults = useMemo(() => ({
        defaultCurrentDate: "currentDate",
        defaultCurrentView: "currentView",
    }), []);
    const expectedChildren = useMemo(() => ({
        appointmentDragging: { optionName: "appointmentDragging", isCollectionItem: false },
        editing: { optionName: "editing", isCollectionItem: false },
        resource: { optionName: "resources", isCollectionItem: true },
        scrolling: { optionName: "scrolling", isCollectionItem: false },
        view: { optionName: "views", isCollectionItem: true }
    }), []);
    const templateProps = useMemo(() => ([
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
    return (React.createElement((BaseComponent), {
        WidgetClass: dxScheduler,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
const _componentAppointmentDragging = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const AppointmentDragging = Object.assign(_componentAppointmentDragging, {
    OptionName: "appointmentDragging",
});
const _componentEditing = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Editing = Object.assign(_componentEditing, {
    OptionName: "editing",
});
const _componentResource = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Resource = Object.assign(_componentResource, {
    OptionName: "resources",
    IsCollectionItem: true,
});
const _componentScrolling = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Scrolling = Object.assign(_componentScrolling, {
    OptionName: "scrolling",
});
const _componentView = memo((props) => {
    return React.createElement((NestedOption), { ...props });
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
export default Scheduler;
export { Scheduler, AppointmentDragging, Editing, Resource, Scrolling, View };
