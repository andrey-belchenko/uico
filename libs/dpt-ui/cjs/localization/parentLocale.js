/**
 * DevExtreme (cjs/localization/parentLocale.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
const PARENT_LOCALE_SEPARATOR = "-";
var _default = (parentLocales, locale) => {
    const parentLocale = parentLocales[locale];
    if (parentLocale) {
        return "root" !== parentLocale && parentLocale
    }
    return locale.substr(0, locale.lastIndexOf("-"))
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
