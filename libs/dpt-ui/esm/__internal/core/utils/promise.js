/**
 * DevExtreme (esm/__internal/core/utils/promise.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise(((res, rej) => {
        resolve = res;
        reject = rej
    }));
    return {
        promise: promise,
        resolve: resolve,
        reject: reject
    }
}
