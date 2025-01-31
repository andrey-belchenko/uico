/**
* DevExtreme (core/config.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
import { GlobalConfig } from '../common';

export type FloatingActionButtonDirection = 'auto' | 'up' | 'down';

/**
 * Gets the current global configuration.
 */
declare function config(): GlobalConfig;

/**
                                                          * Configures your application before its launch.
                                                          */
                                                         declare function config(config: GlobalConfig): void;

/**
 * @deprecated Use GlobalConfig instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type globalConfig = GlobalConfig;

export default config;
