/**
 * DevExtreme (esm/__internal/core/utils/scroll.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function getMemoizeScrollTo(getScrollableInstance) {
    const instance = getScrollableInstance();
    let lastParams = {};
    return function(params) {
        let force = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
        const normalizedParams = {
            top: void 0 !== params.top ? Math.ceil(params.top) : void 0,
            left: void 0 !== params.left ? Math.ceil(params.left) : void 0
        };
        const isSameParams = normalizedParams.top === lastParams.top && normalizedParams.left === lastParams.left;
        if (!force && isSameParams) {
            return
        }
        lastParams = normalizedParams;
        instance.scrollTo(params)
    }
}
