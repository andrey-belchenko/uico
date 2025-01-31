/**
 * DevExtreme (esm/renovation/ui/scroll_view/common/base_scrollable_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    touch
} from "../../../../core/utils/support";
import {
    getDefaultBounceEnabled,
    isDesktop
} from "../utils/get_default_option_value";
import {
    current,
    isMaterial
} from "../../../../ui/themes";
import messageLocalization from "../../../../localization/message";
export const BaseScrollableProps = {
    aria: Object.freeze({}),
    addWidgetClass: false,
    disabled: false,
    visible: true,
    classes: "",
    direction: "vertical",
    get bounceEnabled() {
        return getDefaultBounceEnabled()
    },
    get scrollByContent() {
        return isDesktop() ? touch : true
    },
    pullDownEnabled: false,
    reachBottomEnabled: false,
    forceGeneratePockets: false,
    needScrollViewContentWrapper: false,
    needRenderScrollbars: true,
    refreshStrategy: "simulated",
    get pullingDownText() {
        return isMaterial(current()) ? "" : messageLocalization.format("dxScrollView-pullingDownText")
    },
    get pulledDownText() {
        return isMaterial(current()) ? "" : messageLocalization.format("dxScrollView-pulledDownText")
    },
    get refreshingText() {
        return isMaterial(current()) ? "" : messageLocalization.format("dxScrollView-refreshingText")
    },
    get reachBottomText() {
        return isMaterial(current()) ? "" : messageLocalization.format("dxScrollView-reachBottomText")
    }
};
