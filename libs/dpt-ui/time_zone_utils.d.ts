/**
* DevExtreme (time_zone_utils.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * A time zone object.
 */
export interface dxSchedulerTimeZone {
    /**
     * A time zone text string from the IANA database.
     */
    id: string;
    /**
     * A GMT offset.
     */
    offset: number;
    /**
     * A time zone in the following format: `(GMT ±[hh]:[mm]) [id]`.
     */
    title: string;
}

/**
 * Gets the list of IANA time zone objects.
 */
export function getTimeZones(date?: Date): Array<dxSchedulerTimeZone>;
