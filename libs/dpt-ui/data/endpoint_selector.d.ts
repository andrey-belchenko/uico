/**
* DevExtreme (data/endpoint_selector.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
/**
 * The EndpointSelector is an object for managing OData endpoints in your application.
 */
export default class EndpointSelector {
    constructor(options: any);
    /**
     * Gets an endpoint with a specific key.
     */
    urlFor(key: string): string;
}
