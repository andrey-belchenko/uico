/**
* DevExtreme (utils.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * Compiles a getter function from a getter expression.
 */
export function compileGetter(expr: string | Array<string>): Function;

/**
 * Compiles a setter function from a setter expression.
 */
export function compileSetter(expr: string | Array<string>): Function;
