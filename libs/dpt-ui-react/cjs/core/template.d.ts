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

import * as React from 'react';
interface ITemplateMeta {
    tmplOption: string;
    component: string;
    render: string;
}
interface ITemplateProps {
    name: string;
    component?: any;
    render?: any;
    children?: any;
}
interface ITemplateArgs {
    data: any;
    index?: number;
}
declare const Template: React.FC<ITemplateProps>;
declare function findProps(child: React.ReactElement): ITemplateProps | undefined;
export { ITemplateMeta, ITemplateProps, ITemplateArgs, Template, findProps, };
