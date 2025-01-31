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
Object.defineProperty(exports, "__esModule", { value: true });
exports.separateProps = exports.getClassName = exports.elementPropNames = void 0;
const elementPropNames = ['style', 'id'];
exports.elementPropNames = elementPropNames;
const classNamePropName = 'className';
const refPropName = ['dropZone', 'dialogTrigger'];
const internalProps = {
    WidgetClass: {},
    isPortalComponent: false,
    defaults: {},
    templateProps: [],
    expectedChildren: {},
    subscribableOptions: [],
    independentEvents: [],
    useRequestAnimationFrameFlag: false,
    clearExtensions: () => undefined,
    renderChildren: () => undefined,
    beforeCreateWidget: () => undefined,
    afterCreateWidget: () => undefined,
};
function isIgnoredProp(name) {
    return name === 'children'
        || name === classNamePropName
        || elementPropNames.includes(name)
        || Object.prototype.hasOwnProperty.call(internalProps, name);
}
function getRefElement(value) {
    if (value?.current) {
        if (value.current.instance?.().element()) {
            return value.current.instance().element();
        }
        return value.current;
    }
    return value;
}
function separateProps(props, defaultsProps, templateProps) {
    templateProps = templateProps || [];
    const defaults = {};
    const options = {};
    const templates = {};
    const knownTemplates = {};
    templateProps.forEach((value) => {
        knownTemplates[value.component] = true;
        knownTemplates[value.render] = true;
    });
    Object.keys(props).forEach((key) => {
        const defaultOptionName = defaultsProps ? defaultsProps[key] : null;
        const value = props[key];
        if (isIgnoredProp(key)) {
            return;
        }
        if (defaultOptionName) {
            defaults[defaultOptionName] = value;
            return;
        }
        if (knownTemplates[key]) {
            templates[key] = value;
            return;
        }
        if (refPropName.includes(key)) {
            options[key] = getRefElement(value);
            return;
        }
        options[key] = props[key];
    });
    return { options, defaults, templates };
}
exports.separateProps = separateProps;
function getClassName(props) {
    return props[classNamePropName];
}
exports.getClassName = getClassName;
