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

/* eslint-disable max-classes-per-file, no-restricted-syntax */
import { createContext } from 'react';
export const RemovalLockerContext = createContext(undefined);
// eslint-disable-next-line @typescript-eslint/no-extra-parens
export const RestoreTreeContext = createContext(undefined);
export function generateID() {
    return Math.random().toString(36).substring(2);
}
export class DoubleKeyMap {
    constructor() {
        this._map = new Map();
    }
    set({ key1, key2 }, value) {
        let innerMap = this._map.get(key1);
        if (!innerMap) {
            innerMap = new Map();
            this._map.set(key1, innerMap);
        }
        innerMap.set(key2, value);
    }
    get({ key1, key2 }) {
        const innerMap = this._map.get(key1);
        return innerMap ? innerMap.get(key2) : undefined;
    }
    delete({ key1, key2 }) {
        const innerMap = this._map.get(key1);
        if (!innerMap) {
            return;
        }
        innerMap.delete(key2);
        if (innerMap.size === 0) {
            this._map.delete(key1);
        }
    }
    get empty() {
        return this._map.size === 0;
    }
    shallowCopy() {
        const copy = new DoubleKeyMap();
        copy._map = this._map;
        return copy;
    }
    *[Symbol.iterator]() {
        for (const [key1, innerMap] of this._map) {
            for (const [key2, value] of innerMap) {
                yield [{ key1, key2 }, value];
            }
        }
    }
}
export class TemplateInstantiationModels extends DoubleKeyMap {
}
export function capitalizeFirstLetter(text) {
    if (text.length) {
        return `${text[0].toUpperCase()}${text.substr(1)}`;
    }
    return '';
}
