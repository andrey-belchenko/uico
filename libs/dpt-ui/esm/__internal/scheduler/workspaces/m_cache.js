/**
 * DevExtreme (esm/__internal/scheduler/workspaces/m_cache.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../../core/utils/type";
export class Cache {
    constructor() {
        this._cache = new Map
    }
    get size() {
        return this._cache.size
    }
    clear() {
        this._cache.clear()
    }
    get(name, callback) {
        if (!this._cache.has(name) && callback) {
            this.set(name, callback())
        }
        return this._cache.get(name)
    }
    set(name, value) {
        isDefined(value) && this._cache.set(name, value)
    }
}
