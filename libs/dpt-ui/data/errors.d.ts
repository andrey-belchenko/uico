/**
* DevExtreme (data/errors.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * Specifies the function that is executed when a data layer object throws an error.
 * @deprecated Use setErrorHandler instead.
 */
export function errorHandler(e: Error): void;

/**
 * A method that specifies a function to be executed when a Data Layer component throws an error.
 */
export function setErrorHandler(handler: (e: Error) => void): void;
