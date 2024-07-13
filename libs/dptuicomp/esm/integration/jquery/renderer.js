/**
 * DevExtreme (esm/integration/jquery/renderer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import jQuery from "jquery";
import rendererBase from "../../core/renderer_base";
import useJQueryFn from "./use_jquery";
const useJQuery = useJQueryFn();
if (useJQuery) {
    rendererBase.set(jQuery)
}
