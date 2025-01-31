/**
 * DevExtreme (cjs/core/templates/empty_template.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.EmptyTemplate = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _template_base = require("./template_base");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class EmptyTemplate extends _template_base.TemplateBase {
    _renderCore() {
        return (0, _renderer.default)()
    }
}
exports.EmptyTemplate = EmptyTemplate;
