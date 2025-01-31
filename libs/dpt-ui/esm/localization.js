/**
 * DevExtreme (esm/localization.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import core from "./localization/core";
import message from "./localization/message";
import number from "./localization/number";
import date from "./localization/date";
import "./localization/currency";
export const locale = core.locale.bind(core);
export const loadMessages = message.load.bind(message);
export const formatMessage = message.format.bind(message);
export const formatNumber = number.format.bind(number);
export const parseNumber = number.parse.bind(number);
export const formatDate = date.format.bind(date);
export const parseDate = date.parse.bind(date);
export {
    message,
    number,
    date
};
export function disableIntl() {
    if ("intl" === number.engine()) {
        number.resetInjection()
    }
    if ("intl" === date.engine()) {
        date.resetInjection()
    }
}
