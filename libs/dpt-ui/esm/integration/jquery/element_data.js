/**
 * DevExtreme (esm/integration/jquery/element_data.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import jQuery from "jquery";
import {
    setDataStrategy
} from "../../core/element_data";
import useJQueryFn from "./use_jquery";
const useJQuery = useJQueryFn();
if (useJQuery) {
    setDataStrategy(jQuery)
}
