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

import { IConfigNode, ITemplate } from './config-node';
interface IConfig {
    options: Record<string, unknown>;
    templates: Record<string, ITemplate>;
}
declare function buildTemplates(node: IConfigNode, optionsAccum: Record<string, unknown>, templatesAccum: Record<string, ITemplate>): void;
declare function buildNode(node: IConfigNode, templatesAccum: Record<string, ITemplate>, ignoreInitialValues: boolean): Record<string, unknown>;
declare function buildConfig(root: IConfigNode, ignoreInitialValues: boolean): IConfig;
interface IValueDescriptor {
    value: unknown;
    type: ValueType;
}
declare enum ValueType {
    Simple = 0,
    Complex = 1,
    Array = 2
}
declare function findValueInObject(obj: unknown, path: string[]): undefined | IValueDescriptor;
declare function findValue(node: IConfigNode, path: string[]): undefined | IValueDescriptor;
export { ValueType, buildConfig, buildNode, buildTemplates, findValue, findValueInObject, };
