/**
 * DevExtreme (cjs/core/templates/template.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.Template = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _template_base = require("./template_base");
var _dom = require("../utils/dom");
var _template_engine_registry = require("./template_engine_registry");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}(0, _template_engine_registry.registerTemplateEngine)("default", {
    compile: element => (0, _dom.normalizeTemplateElement)(element),
    render: (template, model, index) => template.clone()
});
(0, _template_engine_registry.setTemplateEngine)("default");
class Template extends _template_base.TemplateBase {
    constructor(element) {
        super();
        this._element = element
    }
    _renderCore(options) {
        const transclude = options.transclude;
        if (!transclude && !this._compiledTemplate) {
            this._compiledTemplate = (0, _template_engine_registry.getCurrentTemplateEngine)().compile(this._element)
        }
        return (0, _renderer.default)("<div>").append(transclude ? this._element : (0, _template_engine_registry.getCurrentTemplateEngine)().render(this._compiledTemplate, options.model, options.index)).contents()
    }
    source() {
        return (0, _renderer.default)(this._element).clone()
    }
}
exports.Template = Template;
