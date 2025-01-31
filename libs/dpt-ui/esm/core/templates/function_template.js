/**
 * DevExtreme (esm/core/templates/function_template.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    TemplateBase
} from "./template_base";
import {
    normalizeTemplateElement
} from "../utils/dom";
export class FunctionTemplate extends TemplateBase {
    constructor(render) {
        super();
        this._render = render
    }
    _renderCore(options) {
        return normalizeTemplateElement(this._render(options))
    }
}
