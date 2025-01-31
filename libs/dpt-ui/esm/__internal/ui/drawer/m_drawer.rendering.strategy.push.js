/**
 * DevExtreme (esm/__internal/ui/drawer/m_drawer.rendering.strategy.push.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    move
} from "../../../animation/translator";
import $ from "../../../core/renderer";
import {
    animation
} from "./m_drawer.animation";
import DrawerStrategy from "./m_drawer.rendering.strategy";
class PushStrategy extends DrawerStrategy {
    _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
        const drawer = this.getDrawerInstance();
        const openedPanelSize = this._getPanelSize(true);
        const contentPosition = this._getPanelSize(drawer.option("opened")) * drawer._getPositionCorrection();
        $(drawer.content()).css(drawer.isHorizontalDirection() ? "width" : "height", openedPanelSize);
        if (drawer.getMinSize()) {
            let paddingCssPropertyName = "padding";
            switch (drawer.calcTargetPosition()) {
                case "left":
                    paddingCssPropertyName += "Right";
                    break;
                case "right":
                    paddingCssPropertyName += "Left";
                    break;
                case "top":
                    paddingCssPropertyName += "Bottom";
                    break;
                case "bottom":
                    paddingCssPropertyName += "Top"
            }
            $(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize())
        }
        if (changePositionUsingFxAnimation) {
            animation.moveTo({
                $element: $(drawer.viewContent()),
                position: contentPosition,
                direction: drawer.calcTargetPosition(),
                duration: drawer.option("animationDuration"),
                complete: () => {
                    whenAnimationCompleted.resolve()
                }
            })
        } else if (drawer.isHorizontalDirection()) {
            move($(drawer.viewContent()), {
                left: contentPosition
            })
        } else {
            move($(drawer.viewContent()), {
                top: contentPosition
            })
        }
    }
    onPanelContentRendered() {
        $(this.getDrawerInstance().viewContent()).addClass("dx-theme-background-color")
    }
}
export default PushStrategy;
