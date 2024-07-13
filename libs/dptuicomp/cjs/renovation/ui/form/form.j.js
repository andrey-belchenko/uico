/**
 * DevExtreme (cjs/renovation/ui/form/form.j.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _component = _interopRequireDefault(require("../../component_wrapper/common/component"));
var _form = require("./form");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class Form extends _component.default {
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: [],
            props: ["scrollingEnabled", "useNativeScrolling", "screenByWidth"]
        }
    }
    get _viewComponent() {
        return _form.Form
    }
}
exports.default = Form;
(0, _component_registrator.default)("dxForm", Form);
module.exports = exports.default;
module.exports.default = exports.default;
