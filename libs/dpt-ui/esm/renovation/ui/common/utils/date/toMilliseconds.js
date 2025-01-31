/**
 * DevExtreme (esm/renovation/ui/common/utils/date/toMilliseconds.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const timeIntervals = {
    millisecond: 1,
    second: 1e3,
    minute: 6e4,
    hour: 36e5,
    day: 864e5,
    week: 6048e5,
    month: 2592e6,
    quarter: 7776e6,
    year: 31536e6
};
export function toMilliseconds(value) {
    return timeIntervals[value]
}
