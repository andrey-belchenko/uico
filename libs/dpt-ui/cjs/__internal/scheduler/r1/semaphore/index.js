/**
 * DevExtreme (cjs/__internal/scheduler/r1/semaphore/index.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Semaphore = void 0;
class Semaphore {
    constructor() {
        this.counter = 0
    }
    isFree() {
        return 0 === this.counter
    }
    take() {
        this.counter += 1
    }
    release() {
        this.counter -= 1;
        if (this.counter < 0) {
            this.counter = 0
        }
    }
}
exports.Semaphore = Semaphore;
