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
exports.ToolbarItem = exports.To = exports.Show = exports.Position = exports.Options = exports.Offset = exports.My = exports.Hide = exports.From = exports.DropDownOptions = exports.Collision = exports.Button = exports.BoundaryOffset = exports.At = exports.Animation = exports.ColorBox = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const color_box_1 = __importDefault(require("dpt-ui/ui/color_box"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const ColorBox = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["opened", "value"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onChange", "onClosed", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOpened", "onPaste", "onValueChanged"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultOpened: "opened",
        defaultValue: "value",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        button: { optionName: "buttons", isCollectionItem: true },
        dropDownOptions: { optionName: "dropDownOptions", isCollectionItem: false }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "dropDownButtonTemplate",
            render: "dropDownButtonRender",
            component: "dropDownButtonComponent"
        },
        {
            tmplOption: "fieldTemplate",
            render: "fieldRender",
            component: "fieldComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: color_box_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.ColorBox = ColorBox;
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
    ExpectedChildren: {
        options: { optionName: "options", isCollectionItem: false }
    },
});
exports.Button = Button;
const _componentCollision = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Collision = Object.assign(_componentCollision, {
    OptionName: "collision",
});
exports.Collision = Collision;
const _componentDropDownOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const DropDownOptions = Object.assign(_componentDropDownOptions, {
    OptionName: "dropDownOptions",
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
exports.DropDownOptions = DropDownOptions;
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
const _componentMy = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const My = Object.assign(_componentMy, {
    OptionName: "my",
});
exports.My = My;
const _componentOffset = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Offset = Object.assign(_componentOffset, {
    OptionName: "offset",
});
exports.Offset = Offset;
const _componentOptions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Options = Object.assign(_componentOptions, {
    OptionName: "options",
    TemplateProps: [{
            tmplOption: "template",
            render: "render",
            component: "component"
        }],
});
exports.Options = Options;
const _componentPosition = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Position = Object.assign(_componentPosition, {
    OptionName: "position",
});
exports.Position = Position;
const _componentShow = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Show = Object.assign(_componentShow, {
    OptionName: "show",
});
exports.Show = Show;
const _componentTo = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const To = Object.assign(_componentTo, {
    OptionName: "to",
});
exports.To = To;
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
exports.default = ColorBox;
