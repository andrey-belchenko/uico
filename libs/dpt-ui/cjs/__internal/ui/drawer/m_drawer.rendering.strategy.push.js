/**
 * DevExtreme (cjs/__internal/ui/drawer/m_drawer.rendering.strategy.push.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _translator = require("../../../animation/translator");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_drawer = require("./m_drawer.animation");
var _m_drawerRendering = _interopRequireDefault(require("./m_drawer.rendering.strategy"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class PushStrategy extends _m_drawerRendering.default {
    _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
        const drawer = this.getDrawerInstance();
        const openedPanelSize = this._getPanelSize(true);
        const contentPosition = this._getPanelSize(drawer.option("opened")) * drawer._getPositionCorrection();
        (0, _renderer.default)(drawer.content()).css(drawer.isHorizontalDirection() ? "width" : "height", openedPanelSize);
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
            }(0, _renderer.default)(drawer.viewContent()).css(paddingCssPropertyName, drawer.getMinSize())
        }
        if (changePositionUsingFxAnimation) {
            _m_drawer.animation.moveTo({
                $element: (0, _renderer.default)(drawer.viewContent()),
                position: contentPosition,
                direction: drawer.calcTargetPosition(),
                duration: drawer.option("animationDuration"),
                complete: () => {
                    whenAnimationCompleted.resolve()
                }
            })
        } else if (drawer.isHorizontalDirection()) {
            (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
                left: contentPosition
            })
        } else {
            (0, _translator.move)((0, _renderer.default)(drawer.viewContent()), {
                top: contentPosition
            })
        }
    }
    onPanelContentRendered() {
        (0, _renderer.default)(this.getDrawerInstance().viewContent()).addClass("dx-theme-background-color")
    }
}
var _default = exports.default = PushStrategy;
