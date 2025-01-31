/**
 * DevExtreme (cjs/localization/intl/number.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _config = _interopRequireDefault(require("../../core/config"));
var _core = _interopRequireDefault(require("../core"));
var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
var _accounting_formats = _interopRequireDefault(require("../cldr-data/accounting_formats"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const CURRENCY_STYLES = ["standard", "accounting"];
const MAX_FRACTION_DIGITS = 20;
const detectCurrencySymbolRegex = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
const formattersCache = {};
const getFormatter = format => {
    const key = _core.default.locale() + "/" + JSON.stringify(format);
    if (!formattersCache[key]) {
        formattersCache[key] = new Intl.NumberFormat(_core.default.locale(), format).format
    }
    return formattersCache[key]
};
const getCurrencyFormatter = currency => new Intl.NumberFormat(_core.default.locale(), {
    style: "currency",
    currency: currency
});
var _default = exports.default = {
    engine: function() {
        return "intl"
    },
    _formatNumberCore: function(value, format, formatConfig) {
        if ("exponential" === format) {
            return this.callBase.apply(this, arguments)
        }
        return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value)
    },
    _normalizeFormatConfig: function(format, formatConfig, value) {
        let config;
        if ("decimal" === format) {
            const fractionDigits = String(value).split(".")[1];
            config = {
                minimumIntegerDigits: formatConfig.precision || void 0,
                useGrouping: false,
                maximumFractionDigits: fractionDigits && fractionDigits.length,
                round: value < 0 ? "ceil" : "floor"
            }
        } else {
            config = this._getPrecisionConfig(formatConfig.precision)
        }
        if ("percent" === format) {
            config.style = "percent"
        } else if ("currency" === format) {
            const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? (0, _config.default)().defaultUseCurrencyAccountingStyle;
            config.style = "currency";
            config.currency = formatConfig.currency || (0, _config.default)().defaultCurrency;
            config.currencySign = CURRENCY_STYLES[+useAccountingStyle]
        }
        return config
    },
    _getPrecisionConfig: function(precision) {
        let config;
        if (null === precision) {
            config = {
                minimumFractionDigits: 0,
                maximumFractionDigits: 20
            }
        } else {
            config = {
                minimumFractionDigits: precision || 0,
                maximumFractionDigits: precision || 0
            }
        }
        return config
    },
    format: function(value, format) {
        if ("number" !== typeof value) {
            return value
        }
        format = this._normalizeFormat(format);
        if ("default" === format.currency) {
            format.currency = (0, _config.default)().defaultCurrency
        }
        if (!format || "function" !== typeof format && !format.type && !format.formatter) {
            return getFormatter(format)(value)
        }
        return this.callBase.apply(this, arguments)
    },
    _getCurrencySymbolInfo: function(currency) {
        const formatter = getCurrencyFormatter(currency);
        return this._extractCurrencySymbolInfo(formatter.format(0))
    },
    _extractCurrencySymbolInfo: function(currencyValueString) {
        const match = detectCurrencySymbolRegex.exec(currencyValueString) || [];
        const position = match[1] ? "before" : "after";
        const symbol = match[1] || match[4] || "";
        const delimiter = match[2] || match[3] || "";
        return {
            position: position,
            symbol: symbol,
            delimiter: delimiter
        }
    },
    getCurrencySymbol: function(currency) {
        if (!currency) {
            currency = (0, _config.default)().defaultCurrency
        }
        const symbolInfo = this._getCurrencySymbolInfo(currency);
        return {
            symbol: symbolInfo.symbol
        }
    },
    getOpenXmlCurrencyFormat: function(currency) {
        const targetCurrency = currency || (0, _config.default)().defaultCurrency;
        const currencySymbol = this._getCurrencySymbolInfo(targetCurrency).symbol;
        const closestAccountingFormat = _core.default.getValueByClosestLocale((locale => _accounting_formats.default[locale]));
        return (0, _open_xml_currency_format.default)(currencySymbol, closestAccountingFormat)
    }
};
module.exports = exports.default;
module.exports.default = exports.default;
