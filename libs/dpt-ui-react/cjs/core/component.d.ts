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
import { IElementDescriptor, IExpectedChild } from './configuration/react/element';
import { ITemplateMeta } from './template';
interface ComponentProps {
    WidgetClass?: any;
    isPortalComponent?: boolean;
    defaults?: Record<string, string>;
    templateProps?: ITemplateMeta[];
    expectedChildren?: Record<string, IExpectedChild>;
    subscribableOptions?: string[];
    independentEvents?: string[];
    useRequestAnimationFrameFlag?: boolean;
    clearExtensions?: () => void;
    beforeCreateWidget?: (element?: Element) => void;
    afterCreateWidget?: (element?: Element) => void;
}
type ComponentRef = ComponentBaseRef & {
    clearExtensions: () => void;
};
declare const Component: <P extends IHtmlOptions>(props: P & ComponentProps & {
    ref?: React.Ref<ComponentRef> | undefined;
}) => ReactElement | null;
export { Component, ComponentProps, IHtmlOptions, IElementDescriptor, ComponentRef, };
