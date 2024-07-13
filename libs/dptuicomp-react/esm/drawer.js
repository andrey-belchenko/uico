/*!
 * dptuicomp-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dptuicomp-react
 */

"use client";
import * as React from "react";
import { memo, forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import dxDrawer from "dptuicomp/ui/drawer";
import { Component as BaseComponent } from "./core/component";
const Drawer = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["opened"]), []);
    const independentEvents = useMemo(() => (["onDisposing", "onInitialized"]), []);
    const defaults = useMemo(() => ({
        defaultOpened: "opened",
    }), []);
    const templateProps = useMemo(() => ([
        {
            tmplOption: "template",
            render: "render",
            component: "component"
        },
    ]), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxDrawer,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        templateProps,
        ...props,
    }));
}));
export default Drawer;
export { Drawer };
