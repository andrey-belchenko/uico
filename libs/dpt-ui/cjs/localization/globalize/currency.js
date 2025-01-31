/**
 * DevExtreme (cjs/localization/globalize/currency.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
var _open_xml_currency_format = _interopRequireDefault(require("../open_xml_currency_format"));
require("./core");
require("./number");
require("../currency");
require("globalize/currency");
var _globalize = _interopRequireDefault(require("globalize"));
var _config = _interopRequireDefault(require("../../core/config"));
var _number2 = _interopRequireDefault(require("../number"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const CURRENCY_STYLES = ["symbol", "accounting"];
if (_globalize.default && _globalize.default.formatCurrency) {
    if ("en" === _globalize.default.locale().locale) {
        _globalize.default.locale("en")
    }
    const formattersCache = {};
    const getFormatter = (currency, format) => {
        let formatter;
        let formatCacheKey;
        if ("object" === typeof format) {
            formatCacheKey = _globalize.default.locale().locale + ":" + currency + ":" + JSON.stringify(format)
        } else {
            formatCacheKey = _globalize.default.locale().locale + ":" + currency + ":" + format
        }
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
            formatter = formattersCache[formatCacheKey] = _globalize.default.currencyFormatter(currency, format)
        }
        return formatter
    };
    const globalizeCurrencyLocalization = {
        _formatNumberCore: function(value, format, formatConfig) {
            if ("currency" === format) {
                const currency = formatConfig && formatConfig.currency || (0, _config.default)().defaultCurrency;
                return getFormatter(currency, this._normalizeFormatConfig(format, formatConfig, value))(value)
            }
            return this.callBase.apply(this, arguments)
        },
        _normalizeFormatConfig: function(format, formatConfig, value) {
            const normalizedConfig = this.callBase(format, formatConfig, value);
            if ("currency" === format) {
                const useAccountingStyle = formatConfig.useCurrencyAccountingStyle ?? (0, _config.default)().defaultUseCurrencyAccountingStyle;
                normalizedConfig.style = CURRENCY_STYLES[+useAccountingStyle]
            }
            return normalizedConfig
        },
        format: function(value, format) {
            if ("number" !== typeof value) {
                return value
            }
            format = this._normalizeFormat(format);
            if (format) {
                if ("default" === format.currency) {
                    format.currency = (0, _config.default)().defaultCurrency
                }
                if ("currency" === format.type) {
                    return this._formatNumber(value, this._parseNumberFormatString("currency"), format)
                } else if (!format.type && format.currency) {
                    return getFormatter(format.currency, format)(value)
                }
            }
            return this.callBase.apply(this, arguments)
        },
        getCurrencySymbol: function(currency) {
            if (!currency) {
                currency = (0, _config.default)().defaultCurrency
            }
            return _globalize.default.cldr.main("numbers/currencies/" + currency)
        },
        getOpenXmlCurrencyFormat: function(currency) {
            const currencySymbol = this.getCurrencySymbol(currency).symbol;
            const accountingFormat = _globalize.default.cldr.main("numbers/currencyFormats-numberSystem-latn").accounting;
            return (0, _open_xml_currency_format.default)(currencySymbol, accountingFormat)
        }
    };
    _number2.default.inject(globalizeCurrencyLocalization)
}
