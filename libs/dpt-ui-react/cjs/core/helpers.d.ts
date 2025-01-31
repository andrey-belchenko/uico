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

import { TemplateInstantiationModel, UpdateLocker } from './types';
export declare const RemovalLockerContext: import("react").Context<UpdateLocker | undefined>;
export declare const RestoreTreeContext: import("react").Context<(() => void) | undefined>;
export declare function generateID(): string;
export declare class DoubleKeyMap<TKey1, TKey2, TValue> {
    private _map;
    set({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }, value: TValue): void;
    get({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }): TValue | undefined;
    delete({ key1, key2 }: {
        key1: TKey1;
        key2: TKey2;
    }): void;
    get empty(): boolean;
    shallowCopy(): DoubleKeyMap<TKey1, TKey2, TValue>;
    [Symbol.iterator](): Generator<[{
        key1: TKey1;
        key2: TKey2;
    }, TValue]>;
}
export declare class TemplateInstantiationModels extends DoubleKeyMap<any, HTMLElement, TemplateInstantiationModel> {
}
export declare function capitalizeFirstLetter(text: string): string;
