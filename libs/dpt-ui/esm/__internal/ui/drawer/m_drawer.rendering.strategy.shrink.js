/**
 * DevExtreme (esm/__internal/ui/drawer/m_drawer.rendering.strategy.shrink.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import {
    camelize
} from "../../../core/utils/inflector";
import {
    animation
} from "./m_drawer.animation";
import DrawerStrategy from "./m_drawer.rendering.strategy";
class ShrinkStrategy extends DrawerStrategy {
    _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
        const drawer = this.getDrawerInstance();
        const direction = drawer.calcTargetPosition();
        const $panel = $(drawer.content());
        const panelSize = this._getPanelSize(drawer.option("opened"));
        const panelOffset = this._getPanelOffset(drawer.option("opened"));
        const revealMode = drawer.option("revealMode");
        if (changePositionUsingFxAnimation) {
            if ("slide" === revealMode) {
                animation.margin({
                    complete: () => {
                        whenAnimationCompleted.resolve()
                    },
                    $element: $panel,
                    duration: drawer.option("animationDuration"),
                    direction: direction,
                    margin: panelOffset
                })
            } else if ("expand" === revealMode) {
                animation.size({
                    complete: () => {
                        whenAnimationCompleted.resolve()
                    },
                    $element: $panel,
                    duration: drawer.option("animationDuration"),
                    direction: direction,
                    size: panelSize
                })
            }
        } else if ("slide" === revealMode) {
            $panel.css(`margin${camelize(direction,true)}`, panelOffset)
        } else if ("expand" === revealMode) {
            $panel.css(drawer.isHorizontalDirection() ? "width" : "height", panelSize)
        }
    }
    isViewContentFirst(position, isRtl) {
        return (isRtl ? "left" === position : "right" === position) || "bottom" === position
    }
}
export default ShrinkStrategy;
