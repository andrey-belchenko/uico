/**
 * DevExtreme (esm/__internal/scheduler/options_validator/validator_rules.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    divisibleBy,
    greaterThan,
    lessThan
} from "./common/index";
import {
    createValidatorRule
} from "./core/index";
export const endDayHourMustBeGreaterThanStartDayHour = createValidatorRule("endDayHourGreaterThanStartDayHour", (_ref => {
    let {
        startDayHour: startDayHour,
        endDayHour: endDayHour
    } = _ref;
    return greaterThan(endDayHour, startDayHour) || `endDayHour: ${endDayHour} must be greater that startDayHour: ${startDayHour}.`
}));
export const visibleIntervalMustBeDivisibleByCellDuration = createValidatorRule("visibleIntervalMustBeDivisibleByCellDuration", (_ref2 => {
    let {
        cellDuration: cellDuration,
        startDayHour: startDayHour,
        endDayHour: endDayHour
    } = _ref2;
    const visibleInterval = 60 * (endDayHour - startDayHour);
    return divisibleBy(visibleInterval, cellDuration) || `endDayHour - startDayHour: ${visibleInterval} (minutes), must be divisible by cellDuration: ${cellDuration} (minutes).`
}));
export const cellDurationMustBeLessThanVisibleInterval = createValidatorRule("cellDurationMustBeLessThanVisibleInterval", (_ref3 => {
    let {
        cellDuration: cellDuration,
        startDayHour: startDayHour,
        endDayHour: endDayHour
    } = _ref3;
    const visibleInterval = 60 * (endDayHour - startDayHour);
    return lessThan(cellDuration, visibleInterval, false) || `endDayHour - startDayHour: ${visibleInterval} (minutes), must be greater or equal the cellDuration: ${cellDuration} (minutes).`
}));
