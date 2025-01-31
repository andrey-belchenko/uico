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
exports.Texts = exports.Search = exports.PivotGridFieldChooserTexts = exports.HeaderFilterTexts = exports.HeaderFilter = exports.PivotGridFieldChooser = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const pivot_grid_field_chooser_1 = __importDefault(require("dpt-ui/ui/pivot_grid_field_chooser"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const PivotGridFieldChooser = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onContextMenuPreparing", "onDisposing", "onInitialized"]), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        pivotGridFieldChooserTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: pivot_grid_field_chooser_1.default,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        ...props,
    }));
}));
exports.PivotGridFieldChooser = PivotGridFieldChooser;
const _componentHeaderFilter = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HeaderFilter = Object.assign(_componentHeaderFilter, {
    OptionName: "headerFilter",
    ExpectedChildren: {
        headerFilterTexts: { optionName: "texts", isCollectionItem: false },
        search: { optionName: "search", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    },
});
exports.HeaderFilter = HeaderFilter;
const _componentHeaderFilterTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const HeaderFilterTexts = Object.assign(_componentHeaderFilterTexts, {
    OptionName: "texts",
});
exports.HeaderFilterTexts = HeaderFilterTexts;
const _componentPivotGridFieldChooserTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const PivotGridFieldChooserTexts = Object.assign(_componentPivotGridFieldChooserTexts, {
    OptionName: "texts",
});
exports.PivotGridFieldChooserTexts = PivotGridFieldChooserTexts;
const _componentSearch = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Search = Object.assign(_componentSearch, {
    OptionName: "search",
});
exports.Search = Search;
const _componentTexts = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Texts = Object.assign(_componentTexts, {
    OptionName: "texts",
});
exports.Texts = Texts;
exports.default = PivotGridFieldChooser;
