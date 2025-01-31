/**
* DevExtreme (core/guid.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * The Guid is an object used to generate and contain a GUID.
 */
export default class Guid {
    constructor();
    constructor(value: string);
    /**
     * Gets the GUID. Works identically to the valueOf() method.
     */
    toString(): string;
    /**
     * Gets the GUID. Works identically to the toString() method.
     */
    valueOf(): string;
}
