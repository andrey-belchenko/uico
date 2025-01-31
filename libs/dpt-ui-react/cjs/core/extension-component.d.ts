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
import { ReactElement } from 'react';
import { IHtmlOptions, ComponentBaseRef } from './component-base';
import { ComponentProps } from './component';
type NestedOptionElement = ReactElement<any, React.JSXElementConstructor<any> & {
    isExtensionComponent: boolean;
}>;
declare function elementIsExtension(el: NestedOptionElement): boolean;
declare const ExtensionComponent: <P extends IHtmlOptions>(props: P & ComponentProps & {
    ref?: React.Ref<ComponentBaseRef> | undefined;
}) => ReactElement | null;
export { ExtensionComponent, elementIsExtension, };
