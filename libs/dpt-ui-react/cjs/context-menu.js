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
exports.To = exports.ShowSubmenuMode = exports.ShowEvent = exports.Show = exports.Position = exports.Offset = exports.My = exports.Item = exports.Hide = exports.From = exports.Delay = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.ContextMenu = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const context_menu_1 = __importDefault(require("dpt-ui/ui/context_menu"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const ContextMenu = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const subscribableOptions = (0, react_1.useMemo)(() => (["items", "selectedItem", "visible"]), []);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onItemClick", "onItemContextMenu", "onItemRendered", "onPositioning", "onShowing", "onShown"]), []);
    const defaults = (0, react_1.useMemo)(() => ({
        defaultItems: "items",
        defaultSelectedItem: "selectedItem",
        defaultVisible: "visible",
    }), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        animation: { optionName: "animation", isCollectionItem: false },
        item: { optionName: "items", isCollectionItem: true },
        position: { optionName: "position", isCollectionItem: false },
        showEvent: { optionName: "showEvent", isCollectionItem: false },
        showSubmenuMode: { optionName: "showSubmenuMode", isCollectionItem: false }
    }), []);
    const templateProps = (0, react_1.useMemo)(() => ([
        {
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent"
        },
    ]), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: context_menu_1.default,
        ref: baseRef,
        subscribableOptions,
        independentEvents,
        defaults,
        expectedChildren,
        templateProps,
        ...props,
    }));
}));
exports.ContextMenu = ContextMenu;
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
const _componentCollision = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Collision = Object.assign(_componentCollision, {
    OptionName: "collision",
});
exports.Collision = Collision;
const _componentDelay = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Delay = Object.assign(_componentDelay, {
    OptionName: "delay",
});
exports.Delay = Delay;
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
        }],
});
exports.Item = Item;
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
const _componentShowEvent = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ShowEvent = Object.assign(_componentShowEvent, {
    OptionName: "showEvent",
});
exports.ShowEvent = ShowEvent;
const _componentShowSubmenuMode = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ShowSubmenuMode = Object.assign(_componentShowSubmenuMode, {
    OptionName: "showSubmenuMode",
    ExpectedChildren: {
        delay: { optionName: "delay", isCollectionItem: false }
    },
});
exports.ShowSubmenuMode = ShowSubmenuMode;
const _componentTo = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const To = Object.assign(_componentTo, {
    OptionName: "to",
});
exports.To = To;
exports.default = ContextMenu;
