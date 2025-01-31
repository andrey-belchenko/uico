/**
 * DevExtreme (cjs/ui/html_editor/modules/base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dpt-uiQuill = _interopRequireDefault(require("dpt-ui-quill"));
var _empty = _interopRequireDefault(require("./empty"));
var _type = require("../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
let BaseModule = _empty.default;
if (_dpt-uiQuill.default) {
    const BaseQuillModule = _dpt-uiQuill.default.import("core/module");
    BaseModule = class extends BaseQuillModule {
        constructor(quill, options) {
            super(quill, options);
            this.editorInstance = options.editorInstance
        }
        saveValueChangeEvent(event) {
            this.editorInstance._saveValueChangeEvent(event)
        }
        addCleanCallback(callback) {
            this.editorInstance.addCleanCallback(callback)
        }
        handleOptionChangeValue(changes) {
            if ((0, _type.isObject)(changes)) {
                Object.entries(changes).forEach((_ref => {
                    let [name, value] = _ref;
                    return this.option(name, value)
                }))
            } else if (!(0, _type.isDefined)(changes)) {
                null === this || void 0 === this || this.clean()
            }
        }
    }
}
var _default = exports.default = BaseModule;
module.exports = exports.default;
module.exports.default = exports.default;
