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
exports.buildConfigTree = exports.processChildren = void 0;
const React = __importStar(require("react"));
const widget_config_1 = require("../../widget-config");
const element_1 = require("./element");
const utils_1 = require("../utils");
const templates_1 = require("./templates");
function processChildren(parentElement, parentFullName) {
    const templates = [];
    const configCollections = {};
    const configs = {};
    let hasTranscludedContent = false;
    React.Children.map(parentElement.props.children, (child) => {
        const element = (0, element_1.getElementInfo)(child, parentElement.descriptor.expectedChildren);
        if (element.type === element_1.ElementType.Unknown) {
            if (child !== null && child !== undefined && child !== false) {
                hasTranscludedContent = true;
            }
            return;
        }
        if (element.type === element_1.ElementType.Template) {
            const template = (0, templates_1.getNamedTemplate)(element.props);
            if (template) {
                templates.push(template);
            }
            return;
        }
        if (element.descriptor.isCollection) {
            let collection = configCollections[element.descriptor.name];
            if (!collection) {
                collection = [];
                configCollections[element.descriptor.name] = collection;
            }
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const collectionItem = createConfigNode(element, `${(0, utils_1.mergeNameParts)(parentFullName, element.descriptor.name)}[${collection.length}]`);
            collection.push(collectionItem);
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const configNode = createConfigNode(element, parentFullName);
        configs[element.descriptor.name] = configNode;
    });
    return {
        configs,
        configCollections,
        templates,
        hasTranscludedContent,
    };
}
exports.processChildren = processChildren;
function createConfigNode(element, path) {
    const fullName = element.descriptor.isCollection
        ? path
        : (0, utils_1.mergeNameParts)(path, element.descriptor.name);
    const separatedValues = (0, widget_config_1.separateProps)(element.props, element.descriptor.initialValuesProps, element.descriptor.templates);
    const childrenData = processChildren(element, fullName);
    element.descriptor.templates.forEach((templateMeta) => {
        const template = (0, templates_1.getAnonymousTemplate)(element.props, templateMeta, path.length > 0 ? childrenData.hasTranscludedContent : false);
        if (template) {
            childrenData.templates.push(template);
        }
    });
    return {
        fullName,
        predefinedOptions: element.descriptor.predefinedValuesProps,
        initialOptions: separatedValues.defaults,
        options: separatedValues.options,
        templates: childrenData.templates,
        configCollections: childrenData.configCollections,
        configs: childrenData.configs,
    };
}
function buildConfigTree(widgetDescriptor, props) {
    return createConfigNode({
        type: element_1.ElementType.Option,
        descriptor: {
            name: '',
            isCollection: false,
            ...widgetDescriptor,
        },
        props,
    }, '');
}
exports.buildConfigTree = buildConfigTree;
