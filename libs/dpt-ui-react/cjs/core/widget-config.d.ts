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

import { ITemplateMeta } from './template';
declare const elementPropNames: string[];
declare function separateProps(props: Record<string, any>, defaultsProps: Record<string, string>, templateProps: ITemplateMeta[]): {
    options: Record<string, any>;
    defaults: Record<string, any>;
    templates: Record<string, any>;
};
declare function getClassName(props: Record<string, any>): string | undefined;
export { elementPropNames, getClassName, separateProps, };
