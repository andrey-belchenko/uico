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

import { buildNode, buildTemplates } from './tree';
import { mergeNameParts } from './utils';
function compareTemplates(current, prev, changesAccum) {
    const currentTemplatesOptions = {};
    const currentTemplates = {};
    const prevTemplatesOptions = {};
    const prevTemplates = {};
    buildTemplates(current, currentTemplatesOptions, currentTemplates);
    buildTemplates(prev, prevTemplatesOptions, prevTemplates);
    changesAccum.addRemovedValues(currentTemplatesOptions, prevTemplatesOptions, current.fullName);
    // TODO: support switching to default templates
    // appendRemovedValues(currentTemplates, prevTemplates, "", changesAccum.templates);
    Object.keys(currentTemplatesOptions).forEach((key) => {
        if (currentTemplatesOptions[key] === prevTemplatesOptions[key]) {
            return;
        }
        changesAccum.options[mergeNameParts(current.fullName, key)] = currentTemplatesOptions[key];
    });
    Object.keys(currentTemplates).forEach((key) => {
        const currentTemplate = currentTemplates[key];
        const prevTemplate = prevTemplates[key];
        if (prevTemplate && currentTemplate.content === prevTemplate.content) {
            return;
        }
        changesAccum.templates[key] = currentTemplate;
    });
}
function compare(current, prev, changesAccum) {
    if (!prev) {
        changesAccum.options[current.fullName] = buildNode(current, changesAccum.templates, true);
        return;
    }
    changesAccum.addRemovedValues(current.options, prev.options, current.fullName);
    changesAccum.addRemovedValues(current.configCollections, prev.configCollections, current.fullName);
    changesAccum.addRemovedValues(current.configs, prev.configs, current.fullName);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    compareCollections(current, prev, changesAccum);
    Object.keys(current.configs).forEach((key) => {
        compare(current.configs[key], prev.configs[key], changesAccum);
    });
    Object.keys(current.options).forEach((key) => {
        if (current.options[key] === prev.options[key]) {
            return;
        }
        changesAccum.options[mergeNameParts(current.fullName, key)] = current.options[key];
    });
    compareTemplates(current, prev, changesAccum);
}
function appendRemovedValues(current, prev, path, changesAccum) {
    const removedKeys = Object.keys(prev).filter((key) => !Object.keys(current).includes(key));
    removedKeys.forEach((key) => {
        changesAccum.push(mergeNameParts(path, key));
    });
}
function getChanges(current, prev) {
    const changesAccum = {
        options: {},
        removedOptions: [],
        templates: {},
        addRemovedValues(currentOptions, prevOptions, path) {
            appendRemovedValues(currentOptions, prevOptions, path, this.removedOptions);
        },
    };
    compare(current, prev, changesAccum);
    return changesAccum;
}
function compareCollections(current, prev, changesAccum) {
    Object.keys(current.configCollections).forEach((key) => {
        const currentCollection = current.configCollections[key];
        const prevCollection = prev.configCollections[key] || [];
        if (!currentCollection || currentCollection.length !== prevCollection.length) {
            const updatedCollection = [];
            currentCollection.forEach((item) => {
                const config = buildNode(item, changesAccum.templates, true);
                updatedCollection.push(config);
            });
            changesAccum.options[mergeNameParts(current.fullName, key)] = updatedCollection;
            return;
        }
        for (let i = 0; i < currentCollection.length; i += 1) {
            compare(currentCollection[i], prevCollection[i], changesAccum);
        }
    });
}
export { getChanges, };
