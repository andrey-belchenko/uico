/**
 * DevExtreme (cjs/localization/core.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dependency_injector = _interopRequireDefault(require("../core/utils/dependency_injector"));
var _parent_locales = _interopRequireDefault(require("./cldr-data/parent_locales"));
var _parentLocale = _interopRequireDefault(require("./parentLocale"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DEFAULT_LOCALE = "en";
var _default = exports.default = (0, _dependency_injector.default)({
    locale: (() => {
        let currentLocale = "en";
        return locale => {
            if (!locale) {
                return currentLocale
            }
            currentLocale = locale
        }
    })(),
    getValueByClosestLocale: function(getter) {
        let locale = this.locale();
        let value = getter(locale);
        let isRootLocale;
        while (!value && !isRootLocale) {
            locale = (0, _parentLocale.default)(_parent_locales.default, locale);
            if (locale) {
                value = getter(locale)
            } else {
                isRootLocale = true
            }
        }
        if (void 0 === value && "en" !== locale) {
            return getter("en")
        }
        return value
    }
});
module.exports = exports.default;
module.exports.default = exports.default;
