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

import { ITemplateMeta } from '../../template';
import { IExpectedChild, IOptionElement } from './element';
import { IConfigNode, ITemplate } from '../config-node';
interface IWidgetDescriptor {
    templates: ITemplateMeta[];
    initialValuesProps: Record<string, string>;
    predefinedValuesProps: Record<string, any>;
    expectedChildren: Record<string, IExpectedChild>;
}
export declare function processChildren(parentElement: IOptionElement, parentFullName: string): {
    configs: Record<string, IConfigNode>;
    configCollections: Record<string, IConfigNode[]>;
    templates: ITemplate[];
    hasTranscludedContent: boolean;
};
declare function buildConfigTree(widgetDescriptor: IWidgetDescriptor, props: Record<string, any>): IConfigNode;
export { buildConfigTree, };
