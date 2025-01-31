/**
 * DevExtreme (esm/__internal/ui/toast/m_hide_toasts.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
const TOAST_CLASS = "dx-toast";

function hideAllToasts(container) {
    const toasts = $(".dx-toast").toArray();
    if (!arguments.length) {
        toasts.forEach((toast => {
            $(toast).dxToast("hide")
        }));
        return
    }
    const containerElement = $(container).get(0);
    toasts.map((toast => $(toast).dxToast("instance"))).filter((instance => {
        const toastContainerElement = $(instance.option("container")).get(0);
        return containerElement === toastContainerElement && containerElement
    })).forEach((instance => {
        instance.hide()
    }))
}
export default hideAllToasts;
