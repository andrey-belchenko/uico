/**
 * DevExtreme (esm/renovation/utils/shallow_equals.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export const shallowEquals = (firstObject, secondObject) => {
    if (Object.keys(firstObject).length !== Object.keys(secondObject).length) {
        return false
    }
    return Object.keys(firstObject).every((key => firstObject[key] === secondObject[key]))
};
