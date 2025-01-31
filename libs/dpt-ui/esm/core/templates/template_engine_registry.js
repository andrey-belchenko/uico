/**
 * DevExtreme (esm/core/templates/template_engine_registry.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isString
} from "../utils/type";
import errors from "../errors";
const templateEngines = {};
let currentTemplateEngine;
export function registerTemplateEngine(name, templateEngine) {
    templateEngines[name] = templateEngine
}
export function setTemplateEngine(templateEngine) {
    if (isString(templateEngine)) {
        currentTemplateEngine = templateEngines[templateEngine];
        if (!currentTemplateEngine) {
            throw errors.Error("E0020", templateEngine)
        }
    } else {
        currentTemplateEngine = templateEngine
    }
}
export function getCurrentTemplateEngine() {
    return currentTemplateEngine
}
