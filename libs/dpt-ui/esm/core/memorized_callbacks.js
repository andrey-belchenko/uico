/**
 * DevExtreme (esm/core/memorized_callbacks.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    each
} from "../core/utils/iterator";
import Callbacks from "./utils/callbacks";
export default class MemorizedCallbacks {
    constructor() {
        this.memory = [];
        this.callbacks = Callbacks()
    }
    add(fn) {
        each(this.memory, ((_, item) => fn.apply(fn, item)));
        this.callbacks.add(fn)
    }
    remove(fn) {
        this.callbacks.remove(fn)
    }
    fire() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        this.memory.push(args);
        this.callbacks.fire.apply(this.callbacks, args)
    }
}
