/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

export function mergeNameParts(...args) {
    return args.filter((value) => value).join('.');
}
export function parseOptionName(name) {
    const parts = name.split('[');
    if (parts.length === 1) {
        return {
            isCollectionItem: false,
            name,
        };
    }
    return {
        isCollectionItem: true,
        name: parts[0],
        index: Number(parts[1].slice(0, -1)),
    };
}
export const isIE = () => {
    const ua = window?.navigator?.userAgent ?? ''; // Check the userAgent property of the window.navigator object
    const msie = ua.indexOf('MSIE'); // IE 10 or older
    const trident = ua.indexOf('Trident/'); // IE 11
    return msie > 0 || trident > 0;
};
export const shallowEquals = (first, second) => {
    if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
    }
    return Object.keys(first).every((key) => first[key] === second[key]);
};
