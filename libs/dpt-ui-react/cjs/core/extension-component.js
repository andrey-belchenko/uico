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
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementIsExtension = exports.ExtensionComponent = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const component_base_1 = require("./component-base");
function elementIsExtension(el) {
    return !!el.type?.isExtensionComponent;
}
exports.elementIsExtension = elementIsExtension;
const ExtensionComponent = (0, react_1.forwardRef)((props, ref) => {
    const componentBaseRef = (0, react_1.useRef)(null);
    const createWidget = (0, react_1.useCallback)((el) => {
        componentBaseRef.current?.createWidget(el);
    }, [componentBaseRef.current]);
    (0, react_1.useLayoutEffect)(() => {
        const { onMounted } = props;
        if (onMounted) {
            onMounted(createWidget);
        }
        else {
            createWidget();
        }
    }, []);
    (0, react_1.useImperativeHandle)(ref, () => ({
        getInstance() {
            return componentBaseRef.current?.getInstance();
        },
        getElement() {
            return componentBaseRef.current?.getElement();
        },
        createWidget(el) {
            createWidget(el);
        },
    }), [componentBaseRef.current, createWidget]);
    return (React.createElement(component_base_1.ComponentBase, { ref: componentBaseRef, ...props }));
});
exports.ExtensionComponent = ExtensionComponent;
