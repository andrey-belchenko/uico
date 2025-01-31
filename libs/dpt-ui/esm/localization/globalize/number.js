/**
 * DevExtreme (esm/localization/globalize/number.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import "./core";
import Globalize from "globalize";
import numberLocalization from "../number";
import errors from "../../core/errors";
import "globalize/number";
const MAX_FRACTION_DIGITS = 20;
if (Globalize && Globalize.formatNumber) {
    if ("en" === Globalize.locale().locale) {
        Globalize.locale("en")
    }
    const formattersCache = {};
    const getFormatter = format => {
        let formatter;
        let formatCacheKey;
        if ("object" === typeof format) {
            formatCacheKey = Globalize.locale().locale + ":" + JSON.stringify(format)
        } else {
            formatCacheKey = Globalize.locale().locale + ":" + format
        }
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
            formatter = formattersCache[formatCacheKey] = Globalize.numberFormatter(format)
        }
        return formatter
    };
    const globalizeNumberLocalization = {
        engine: function() {
            return "globalize"
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
                config = {
                    minimumIntegerDigits: formatConfig.precision || 1,
                    useGrouping: false,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 20,
                    round: value < 0 ? "ceil" : "floor"
                }
            } else {
                config = this._getPrecisionConfig(formatConfig.precision)
            }
            if ("percent" === format) {
                config.style = "percent"
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
            if (!format || "function" !== typeof format && !format.type && !format.formatter) {
                return getFormatter(format)(value)
            }
            return this.callBase.apply(this, arguments)
        },
        parse: function(text, format) {
            if (!text) {
                return
            }
            if (format && (format.parser || "string" === typeof format)) {
                return this.callBase.apply(this, arguments)
            }
            if (format) {
                errors.log("W0011")
            }
            let result = Globalize.parseNumber(text);
            if (isNaN(result)) {
                result = this.callBase.apply(this, arguments)
            }
            return result
        }
    };
    numberLocalization.resetInjection();
    numberLocalization.inject(globalizeNumberLocalization)
}
