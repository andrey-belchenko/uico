/**
 * DevExtreme (esm/localization/currency.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../core/utils/extend";
export default {
    _formatNumberCore: function(value, format, formatConfig) {
        if ("currency" === format) {
            formatConfig.precision = formatConfig.precision || 0;
            let result = this.format(value, extend({}, formatConfig, {
                type: "fixedpoint"
            }));
            const currencyPart = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
            result = result.replace(/^(\D*)(\d.*)/, "$1" + currencyPart + "$2");
            return result
        }
        return this.callBase.apply(this, arguments)
    },
    getCurrencySymbol: function() {
        return {
            symbol: "$"
        }
    },
    getOpenXmlCurrencyFormat: function() {
        return "$#,##0{0}_);\\($#,##0{0}\\)"
    }
};
