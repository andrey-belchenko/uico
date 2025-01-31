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

import { ITemplateMeta, ITemplateProps } from 'src/core/template';
import { ITemplate } from '../config-node';
declare function getAnonymousTemplate(props: Record<string, any>, templateMeta: ITemplateMeta, hasTranscludedContent: boolean): ITemplate | null;
declare function getNamedTemplate(props: ITemplateProps): ITemplate | null;
export { getAnonymousTemplate, getNamedTemplate, };
