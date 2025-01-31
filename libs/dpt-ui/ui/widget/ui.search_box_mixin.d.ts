/**
* DevExtreme (ui/widget/ui.search_box_mixin.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
import {
    Properties as TextBoxProperties,
} from '../text_box';

import {
    SearchMode,
} from '../../common';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface SearchBoxMixinOptions {
    /**
     * Configures the search panel.
     */
    searchEditorOptions?: TextBoxProperties;
    /**
     * Specifies whether the search panel is visible.
     */
    searchEnabled?: boolean;
    /**
     * Specifies a data object&apos;s field name or an expression whose value is compared to the search string.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * Specifies a comparison operation used to search UI component items.
     */
    searchMode?: SearchMode;
    /**
     * Specifies a delay in milliseconds between when a user finishes typing, and the search is executed.
     */
    searchTimeout?: number;
    /**
     * Specifies the current search string.
     */
    searchValue?: string;
}
/**
                                                                    * 
                                                                    * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
                                                                    */
                                                                   export default class SearchBoxMixin {
    constructor(options?: SearchBoxMixinOptions);
}
