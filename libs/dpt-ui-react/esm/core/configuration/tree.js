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

import { mergeNameParts, parseOptionName } from './utils';
function buildTemplates(node, optionsAccum, templatesAccum) {
    node.templates.forEach((template) => {
        if (template.isAnonymous) {
            const templateName = mergeNameParts(node.fullName, template.optionName);
            optionsAccum[template.optionName] = templateName;
            templatesAccum[templateName] = template;
        }
        else {
            templatesAccum[template.optionName] = template;
        }
    });
}
function buildNode(node, templatesAccum, ignoreInitialValues) {
    const result = {};
    Object.keys(node.predefinedOptions).forEach((key) => {
        result[key] = node.predefinedOptions[key];
    });
    Object.keys(node.configs).forEach((key) => {
        result[key] = buildNode(node.configs[key], templatesAccum, ignoreInitialValues);
    });
    Object.keys(node.configCollections).forEach((key) => {
        result[key] = node.configCollections[key].map((item) => buildNode(item, templatesAccum, ignoreInitialValues));
    });
    if (!ignoreInitialValues) {
        Object.keys(node.initialOptions).forEach((key) => {
            result[key] = node.initialOptions[key];
        });
    }
    Object.keys(node.options).forEach((key) => {
        result[key] = node.options[key];
    });
    buildTemplates(node, result, templatesAccum);
    return result;
}
function buildConfig(root, ignoreInitialValues) {
    const templatesAccum = {};
    const options = buildNode(root, templatesAccum, ignoreInitialValues);
    return {
        templates: templatesAccum,
        options,
    };
}
var ValueType;
(function (ValueType) {
    ValueType[ValueType["Simple"] = 0] = "Simple";
    ValueType[ValueType["Complex"] = 1] = "Complex";
    ValueType[ValueType["Array"] = 2] = "Array";
})(ValueType || (ValueType = {}));
function findValueInObject(obj, path) {
    const key = path.shift();
    if (!key) {
        return {
            value: obj,
            type: ValueType.Simple,
        };
    }
    if (obj instanceof Object && Object.keys(obj).includes(key)) {
        return findValueInObject(obj[key], path);
    }
    return undefined;
}
function findValue(node, path) {
    const name = path.shift();
    if (!name) {
        return {
            value: buildConfig(node, true).options,
            type: ValueType.Complex,
        };
    }
    const optionInfo = parseOptionName(name);
    if (optionInfo.name in node.options) {
        const options = optionInfo.isCollectionItem
            ? node.options[optionInfo.name][optionInfo.index]
            : node.options[optionInfo.name];
        return findValueInObject(options, path);
    }
    if (optionInfo.isCollectionItem) {
        const collection = node.configCollections[optionInfo.name];
        if (!collection) {
            return undefined;
        }
        const item = collection[optionInfo.index];
        if (!item) {
            return undefined;
        }
        return findValue(item, path);
    }
    const child = node.configs[optionInfo.name];
    if (child) {
        return findValue(child, path);
    }
    const childCollection = node.configCollections[optionInfo.name];
    if (childCollection) {
        if (path.length !== 0) {
            return undefined;
        }
        return {
            value: childCollection.map((item) => buildNode(item, {}, true)),
            type: ValueType.Array,
        };
    }
    return undefined;
}
export { ValueType, buildConfig, buildNode, buildTemplates, findValue, findValueInObject, };
