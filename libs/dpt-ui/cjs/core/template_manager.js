/**
 * DevExtreme (cjs/core/template_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.TemplateManager = void 0;
var _renderer = _interopRequireDefault(require("./renderer"));
var _type = require("./utils/type");
var _common = require("./utils/common");
var _extend = require("./utils/extend");
var _function_template = require("./templates/function_template");
var _empty_template = require("./templates/empty_template");
var _template_manager = require("./utils/template_manager");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const TEXT_NODE = 3;
const ANONYMOUS_TEMPLATE_NAME = "template";
const TEMPLATE_OPTIONS_NAME = "dxTemplate";
const TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
const DX_POLYMORPH_WIDGET_TEMPLATE = new _function_template.FunctionTemplate((_ref => {
    let {
        model: model,
        parent: parent
    } = _ref;
    const widgetName = model.widget;
    if (!widgetName) {
        return (0, _renderer.default)()
    }
    const widgetElement = (0, _renderer.default)("<div>");
    const widgetOptions = model.options || {};
    if (parent) {
        parent._createComponent(widgetElement, widgetName, widgetOptions)
    } else {
        widgetElement[widgetName](widgetOptions)
    }
    return widgetElement
}));
class TemplateManager {
    constructor(createElement, anonymousTemplateName) {
        this._tempTemplates = [];
        this._defaultTemplates = {};
        this._anonymousTemplateName = anonymousTemplateName || "template";
        this._createElement = createElement || _template_manager.defaultCreateElement;
        this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this)
    }
    static createDefaultOptions() {
        return {
            integrationOptions: {
                watchMethod: function(fn, callback) {
                    let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (!options.skipImmediate) {
                        callback(fn())
                    }
                    return _common.noop
                },
                templates: {
                    "dx-polymorph-widget": DX_POLYMORPH_WIDGET_TEMPLATE
                },
                useDeferUpdateForTemplates: true
            }
        }
    }
    get anonymousTemplateName() {
        return this._anonymousTemplateName
    }
    addDefaultTemplates(templates) {
        this._defaultTemplates = (0, _extend.extend)({}, this._defaultTemplates, templates)
    }
    dispose() {
        this._tempTemplates.forEach((tempTemplate => {
            tempTemplate.template.dispose && tempTemplate.template.dispose()
        }));
        this._tempTemplates = []
    }
    extractTemplates($el) {
        const templates = this._extractTemplates($el);
        const anonymousTemplateMeta = this._extractAnonymousTemplate($el);
        return {
            templates: templates,
            anonymousTemplateMeta: anonymousTemplateMeta
        }
    }
    _extractTemplates($el) {
        const templates = (0, _template_manager.findTemplates)($el, "dxTemplate");
        const suitableTemplates = (0, _template_manager.suitableTemplatesByName)(templates);
        templates.forEach((_ref2 => {
            let {
                element: element,
                options: {
                    name: name
                }
            } = _ref2;
            if (element === suitableTemplates[name]) {
                (0, _renderer.default)(element).addClass("dx-template-wrapper").detach()
            } else {
                (0, _renderer.default)(element).remove()
            }
        }));
        return Object.keys(suitableTemplates).map((name => ({
            name: name,
            template: this._createTemplate(suitableTemplates[name])
        })))
    }
    _extractAnonymousTemplate($el) {
        const $anonymousTemplate = $el.contents().detach();
        const $notJunkTemplateContent = $anonymousTemplate.filter(((_, element) => {
            const isTextNode = 3 === element.nodeType;
            const isEmptyText = (0, _renderer.default)(element).text().trim().length < 1;
            return !(isTextNode && isEmptyText)
        }));
        return $notJunkTemplateContent.length > 0 ? {
            template: this._createTemplate($anonymousTemplate),
            name: this._anonymousTemplateName
        } : {}
    }
    _createTemplateIfNeeded(templateSource) {
        const cachedTemplate = this._tempTemplates.filter((tempTemplate => tempTemplate.source === (0, _template_manager.templateKey)(templateSource)))[0];
        if (cachedTemplate) {
            return cachedTemplate.template
        }
        const template = this._createTemplate(templateSource);
        this._tempTemplates.push({
            template: template,
            source: (0, _template_manager.templateKey)(templateSource)
        });
        return template
    }
    _createTemplate(templateSource) {
        return this._createElement((0, _template_manager.validateTemplateSource)(templateSource))
    }
    getTemplate(templateSource, templates, _ref3, context) {
        let {
            isAsyncTemplate: isAsyncTemplate,
            skipTemplates: skipTemplates
        } = _ref3;
        if (!(0, _type.isFunction)(templateSource)) {
            return (0, _template_manager.acquireTemplate)(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates)
        }
        return new _function_template.FunctionTemplate((options => {
            const templateSourceResult = templateSource.apply(context, (0, _template_manager.getNormalizedTemplateArgs)(options));
            if (!(0, _type.isDefined)(templateSourceResult)) {
                return new _empty_template.EmptyTemplate
            }
            let dispose = false;
            const template = (0, _template_manager.acquireTemplate)(templateSourceResult, (templateSource => {
                if (templateSource.nodeType || (0, _type.isRenderer)(templateSource) && !(0, _renderer.default)(templateSource).is("script")) {
                    return new _function_template.FunctionTemplate((() => templateSource))
                }
                dispose = true;
                return this._createTemplate(templateSource)
            }), templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
            const result = template.render(options);
            dispose && template.dispose && template.dispose();
            return result
        }))
    }
}
exports.TemplateManager = TemplateManager;
