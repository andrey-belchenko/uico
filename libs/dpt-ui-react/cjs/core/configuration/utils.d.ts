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

export declare function mergeNameParts(...args: string[]): string;
export declare function parseOptionName(name: string): IOptionInfo | ICollectionOptionInfo;
interface IOptionInfo {
    isCollectionItem: false;
    name: string;
}
interface ICollectionOptionInfo {
    isCollectionItem: true;
    name: string;
    index: number;
}
export declare const isIE: () => boolean;
export declare const shallowEquals: (first: Record<string, unknown>, second: Record<string, unknown>) => boolean;
export {};
