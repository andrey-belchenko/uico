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
import dxTextBox from "dpt-ui/ui/text_box";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const TextBox = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = useMemo(() => (["value"]), []);
    const independentEvents = useMemo(() => (["onChange", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onPaste", "onValueChanged"]), []);
    const defaults = useMemo(() => ({
        defaultValue: "value",
    }), []);
    const expectedChildren = useMemo(() => ({
        button: { optionName: "buttons", isCollectionItem: true }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxTextBox,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        ...props,
    }));
}));
const _componentButton = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Button = Object.assign(_componentButton, {
    OptionName: "buttons",
    IsCollectionItem: true,
    ExpectedChildren: {
        options: { optionName: "options", isCollectionItem: false }
    },
});
const _componentOptions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Options = Object.assign(_componentOptions, {
    OptionName: "options",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
export default TextBox;
export { TextBox, Button, Options };
