/*!
 * dptuicomp-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dptuicomp-react
 */

import { IConfigNode, ITemplate } from './config-node';
interface IConfigChanges {
    options: Record<string, any>;
    removedOptions: string[];
    templates: Record<string, ITemplate>;
    addRemovedValues: (currentOptions: Record<string, any>, prevOptions: Record<string, any>, path: string) => void;
}
declare function getChanges(current: IConfigNode, prev: IConfigNode): IConfigChanges;
export { getChanges, };
