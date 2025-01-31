/**
 * DevExtreme (esm/core/templates/template_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../renderer";
import domAdapter from "../dom_adapter";
import Callbacks from "../utils/callbacks";
import {
    contains
} from "../utils/dom";
import {
    triggerShownEvent
} from "../../events/visibility_change";
import errors from "../errors";
export const renderedCallbacks = Callbacks({
    syncStrategy: true
});
export class TemplateBase {
    render(options) {
        options = options || {};
        const onRendered = options.onRendered;
        delete options.onRendered;
        let $result;
        if (options.renovated && options.transclude && this._element) {
            $result = $("<div>").append(this._element).contents()
        } else {
            $result = this._renderCore(options)
        }
        this._ensureResultInContainer($result, options.container);
        renderedCallbacks.fire($result, options.container);
        onRendered && onRendered();
        return $result
    }
    _ensureResultInContainer($result, container) {
        if (!container) {
            return
        }
        const $container = $(container);
        const resultInContainer = contains($container.get(0), $result.get(0));
        $container.append($result);
        if (resultInContainer) {
            return
        }
        const resultInBody = contains(domAdapter.getBody(), $container.get(0));
        if (!resultInBody) {
            return
        }
        triggerShownEvent($result)
    }
    _renderCore() {
        throw errors.Error("E0001")
    }
}
