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
import dxCalendar from "dpt-ui/ui/calendar";
import { Component as BaseComponent } from "./core/component";
const Calendar = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["value", "zoomLevel"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onInitialized", "onValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultValue: "value",
        defaultZoomLevel: "zoomLevel",
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "cellTemplate",
            render: "cellRender",
            component: "cellComponent"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxCalendar,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        templateProps,
        ...props,
    }));
}));
export default Calendar;
export { Calendar };
