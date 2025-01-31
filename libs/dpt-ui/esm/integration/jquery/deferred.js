/**
 * DevExtreme (esm/integration/jquery/deferred.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import jQuery from "jquery";
import {
    setStrategy
} from "../../core/utils/deferred";
import {
    compare as compareVersion
} from "../../core/utils/version";
import useJQueryFn from "./use_jquery";
const useJQuery = useJQueryFn();
if (useJQuery) {
    const Deferred = jQuery.Deferred;
    const strategy = {
        Deferred: Deferred
    };
    strategy.when = compareVersion(jQuery.fn.jquery, [3]) < 0 ? jQuery.when : function(singleArg) {
        if (0 === arguments.length) {
            return (new Deferred).resolve()
        } else if (1 === arguments.length) {
            return singleArg && singleArg.then ? singleArg : (new Deferred).resolve(singleArg)
        } else {
            return jQuery.when.apply(jQuery, arguments)
        }
    };
    setStrategy(strategy)
}
