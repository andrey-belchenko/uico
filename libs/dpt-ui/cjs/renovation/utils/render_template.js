/**
 * DevExtreme (cjs/renovation/utils/render_template.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.renderTemplate = renderTemplate;
var _inferno = require("inferno");
var _infernoCreateElement = require("inferno-create-element");

function renderTemplate(template, props, container) {
    setTimeout((() => {
        (0, _inferno.render)((0, _infernoCreateElement.createElement)(template, props), null === container || void 0 === container ? void 0 : container.get(0))
    }), 0)
}
