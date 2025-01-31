/**
 * DevExtreme (esm/core/utils/template_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import config from "../config";
import devices from "../devices";
import {
    getPublicElement
} from "../element";
import Errors from "../errors";
import $ from "../renderer";
import {
    ChildDefaultTemplate
} from "../templates/child_default_template";
import {
    EmptyTemplate
} from "../templates/empty_template";
import {
    Template
} from "../templates/template";
import {
    TemplateBase
} from "../templates/template_base";
import {
    groupBy
} from "./array";
import {
    findBestMatches
} from "./common";
import {
    normalizeTemplateElement
} from "./dom";
import {
    extend
} from "./extend";
import {
    isFunction,
    isRenderer
} from "./type";
export const findTemplates = (element, name) => {
    const templates = $(element).contents().filter(`[data-options*="${name}"]`);
    return [].slice.call(templates).map((element => {
        const optionsString = $(element).attr("data-options") || "";
        return {
            element: element,
            options: config().optionsParser(optionsString)[name]
        }
    })).filter((template => !!template.options))
};
export const suitableTemplatesByName = rawTemplates => {
    const templatesMap = groupBy(rawTemplates, (template => template.options.name));
    if (templatesMap[void 0]) {
        throw Errors.Error("E0023")
    }
    const result = {};
    Object.keys(templatesMap).forEach((name => {
        var _findBestMatches$;
        const suitableTemplate = null === (_findBestMatches$ = findBestMatches(devices.current(), templatesMap[name], (template => template.options))[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
        if (suitableTemplate) {
            result[name] = suitableTemplate
        }
    }));
    return result
};
export const addOneRenderedCall = template => {
    const render = template.render.bind(template);
    return extend({}, template, {
        render(options) {
            const templateResult = render(options);
            options && options.onRendered && options.onRendered();
            return templateResult
        }
    })
};
export const addPublicElementNormalization = template => {
    const render = template.render.bind(template);
    return extend({}, template, {
        render(options) {
            const $container = $(options.container);
            return render(_extends({}, options, {
                container: getPublicElement($container)
            }))
        }
    })
};
export const getNormalizedTemplateArgs = options => {
    const args = [];
    if ("model" in options) {
        args.push(options.model)
    }
    if ("index" in options) {
        args.push(options.index)
    }
    args.push(options.container);
    return args
};
export const validateTemplateSource = templateSource => "string" === typeof templateSource ? normalizeTemplateElement(templateSource) : templateSource;
export const templateKey = templateSource => isRenderer(templateSource) && templateSource[0] || templateSource;
export const defaultCreateElement = element => new Template(element);
export const acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
    let integrationTemplate = null;
    if (!skipTemplates || -1 === skipTemplates.indexOf(templateSource)) {
        integrationTemplate = templates[templateSource];
        if (integrationTemplate && !(integrationTemplate instanceof TemplateBase)) {
            if (isFunction(integrationTemplate.render)) {
                integrationTemplate = addPublicElementNormalization(integrationTemplate)
            }
            if (!isAsyncTemplate) {
                integrationTemplate = addOneRenderedCall(integrationTemplate)
            }
        }
    }
    return integrationTemplate
};
export const acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
    if (null == templateSource) {
        return new EmptyTemplate
    }
    if (templateSource instanceof ChildDefaultTemplate) {
        return defaultTemplates[templateSource.name]
    }
    if (templateSource instanceof TemplateBase) {
        return templateSource
    }
    if (isFunction(templateSource.render) && !isRenderer(templateSource)) {
        return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource)
    }
    if (templateSource.nodeType || isRenderer(templateSource)) {
        return createTemplate($(templateSource))
    }
    return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource)
};
