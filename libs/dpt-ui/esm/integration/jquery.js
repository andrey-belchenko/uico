/**
 * DevExtreme (esm/integration/jquery.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import jQuery from "jquery";
import {
    compare as compareVersions
} from "../core/utils/version";
import errors from "../core/utils/error";
import useJQueryMethod from "./jquery/use_jquery";
const useJQuery = useJQueryMethod();
if (useJQuery && compareVersions(jQuery.fn.jquery, [1, 10]) < 0) {
    throw errors.Error("E0012")
}
import "./jquery/renderer";
import "./jquery/hooks";
import "./jquery/deferred";
import "./jquery/hold_ready";
import "./jquery/events";
import "./jquery/easing";
import "./jquery/element_data";
import "./jquery/element";
import "./jquery/component_registrator";
import "./jquery/ajax";
