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

function getAnonymousTemplate(props, templateMeta, hasTranscludedContent) {
    if (templateMeta.tmplOption === 'template' && hasTranscludedContent) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'children',
            content: props.children,
        };
    }
    if (props[templateMeta.render]) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'render',
            content: props[templateMeta.render],
        };
    }
    if (props[templateMeta.component]) {
        return {
            optionName: templateMeta.tmplOption,
            isAnonymous: true,
            type: 'component',
            content: props[templateMeta.component],
        };
    }
    return null;
}
function getNamedTemplate(props) {
    if (!props.name) {
        return null;
    }
    if (props.component) {
        return {
            optionName: props.name,
            isAnonymous: false,
            type: 'component',
            content: props.component,
        };
    }
    if (props.render) {
        return {
            optionName: props.name,
            isAnonymous: false,
            type: 'render',
            content: props.render,
        };
    }
    return {
        optionName: props.name,
        isAnonymous: false,
        type: 'children',
        content: props.children,
    };
}
export { getAnonymousTemplate, getNamedTemplate, };
