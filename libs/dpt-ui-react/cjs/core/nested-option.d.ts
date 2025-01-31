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
interface INestedOptionMeta {
    optionName: string;
    registerNestedOption: (component: React.ReactElement) => any;
    updateFunc: (newProps: any, prevProps: any) => void;
    makeDirty: () => void;
}
declare const NestedOption: <P>(props: P) => React.ReactElement | null;
export default NestedOption;
export { INestedOptionMeta, };
