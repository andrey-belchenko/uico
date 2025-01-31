/**
* DevExtreme (core/options.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
import {
    Device,
} from './devices';

import {
    DeepPartial,
} from './index';

/**
 * Specifies the device-dependent default configuration properties for a component.
 */
export type DefaultOptionsRule<T> = {
    device?: Device | Device[] | ((device: Device) => boolean);
    options: DeepPartial<T>;
};
