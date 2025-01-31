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
import { ElementType, getElementInfo } from './configuration/react/element';
const NestedOption = (props) => {
    // @ts-expect-error TS2339
    const { children: stateChildren } = props;
    const children = React.Children.map(stateChildren, (child) => {
        const childElementInfo = getElementInfo(child);
        return childElementInfo.type === ElementType.Option ? child : null;
    });
    return React.createElement(React.Fragment, {}, children);
};
export default NestedOption;
