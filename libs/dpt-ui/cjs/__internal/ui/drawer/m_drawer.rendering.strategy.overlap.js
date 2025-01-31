/**
 * DevExtreme (cjs/__internal/ui/drawer/m_drawer.rendering.strategy.overlap.js)
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
var _common = require("../../../core/utils/common");
var _inflector = require("../../../core/utils/inflector");
var _size = require("../../../core/utils/size");
var _ui = _interopRequireDefault(require("../../../ui/overlay/ui.overlay"));
var _m_drawer = require("./m_drawer.animation");
var _m_drawerRendering = _interopRequireDefault(require("./m_drawer.rendering.strategy"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class OverlapStrategy extends _m_drawerRendering.default {
    renderPanelContent(whenPanelContentRendered) {
        delete this._initialPosition;
        const drawer = this.getDrawerInstance();
        const {
            opened: opened,
            minSize: minSize
        } = drawer.option();
        drawer._overlay = drawer._createComponent(drawer.content(), _ui.default, {
            shading: false,
            container: drawer.content(),
            visualContainer: drawer.getOverlayTarget(),
            position: this._getOverlayPosition(),
            width: opened ? "auto" : minSize || 0,
            height: "100%",
            templatesRenderAsynchronously: drawer.option("templatesRenderAsynchronously"),
            animation: {
                show: {
                    duration: 0
                }
            },
            onPositioned: function(e) {
                this._fixOverlayPosition(e.component.$content())
            }.bind(this),
            contentTemplate: drawer.option("template"),
            onContentReady: args => {
                whenPanelContentRendered.resolve();
                this._processOverlayZIndex(args.component.content())
            },
            visible: true,
            propagateOutsideClick: true
        })
    }
    _fixOverlayPosition($overlayContent) {
        const position = (0, _common.ensureDefined)(this._initialPosition, {
            left: 0,
            top: 0
        });
        (0, _translator.move)($overlayContent, position);
        if ("right" === this.getDrawerInstance().calcTargetPosition()) {
            $overlayContent.css("left", "auto")
        }
        if ("bottom" === this.getDrawerInstance().calcTargetPosition()) {
            $overlayContent.css("top", "auto");
            $overlayContent.css("bottom", "0px")
        }
    }
    _getOverlayPosition() {
        const drawer = this.getDrawerInstance();
        const panelPosition = drawer.calcTargetPosition();
        let result = {};
        switch (panelPosition) {
            case "left":
                result = {
                    my: "top left",
                    at: "top left"
                };
                break;
            case "right":
                result = {
                    my: drawer.option("rtlEnabled") ? "top left" : "top right",
                    at: "top right"
                };
                break;
            case "top":
            case "bottom":
                result = {
                    my: panelPosition,
                    at: panelPosition
                }
        }
        result.of = drawer.getOverlayTarget();
        return result
    }
    refreshPanelElementSize(calcFromRealPanelSize) {
        const drawer = this.getDrawerInstance();
        const overlay = drawer.getOverlay();
        if (drawer.isHorizontalDirection()) {
            overlay.option("height", "100%");
            overlay.option("width", calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(drawer.option("opened")))
        } else {
            overlay.option("width", (0, _size.getWidth)(drawer.getOverlayTarget()));
            overlay.option("height", calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(drawer.option("opened")))
        }
    }
    onPanelContentRendered() {
        this._updateViewContentStyles()
    }
    _updateViewContentStyles() {
        const drawer = this.getDrawerInstance();
        (0, _renderer.default)(drawer.viewContent()).css(`padding${(0,_inflector.camelize)(drawer.calcTargetPosition(),true)}`, drawer.option("minSize"));
        (0, _renderer.default)(drawer.viewContent()).css("transform", "inherit")
    }
    _internalRenderPosition(changePositionUsingFxAnimation, whenAnimationCompleted) {
        const drawer = this.getDrawerInstance();
        const $panel = (0, _renderer.default)(drawer.content());
        const $panelOverlayContent = drawer.getOverlay().$content();
        const revealMode = drawer.option("revealMode");
        const targetPanelPosition = drawer.calcTargetPosition();
        const panelSize = this._getPanelSize(drawer.option("opened"));
        const panelOffset = this._getPanelOffset(drawer.option("opened")) * drawer._getPositionCorrection();
        const marginTop = drawer.getRealPanelHeight() - panelSize;
        this._updateViewContentStyles();
        if (changePositionUsingFxAnimation) {
            if ("slide" === revealMode) {
                this._initialPosition = drawer.isHorizontalDirection() ? {
                    left: panelOffset
                } : {
                    top: panelOffset
                };
                _m_drawer.animation.moveTo({
                    complete: () => {
                        whenAnimationCompleted.resolve()
                    },
                    duration: drawer.option("animationDuration"),
                    direction: targetPanelPosition,
                    $element: $panel,
                    position: panelOffset
                })
            } else if ("expand" === revealMode) {
                this._initialPosition = drawer.isHorizontalDirection() ? {
                    left: 0
                } : {
                    top: 0
                };
                (0, _translator.move)($panelOverlayContent, this._initialPosition);
                _m_drawer.animation.size({
                    complete: () => {
                        whenAnimationCompleted.resolve()
                    },
                    duration: drawer.option("animationDuration"),
                    direction: targetPanelPosition,
                    $element: $panelOverlayContent,
                    size: panelSize,
                    marginTop: marginTop
                })
            }
        } else if ("slide" === revealMode) {
            this._initialPosition = drawer.isHorizontalDirection() ? {
                left: panelOffset
            } : {
                top: panelOffset
            };
            (0, _translator.move)($panel, this._initialPosition)
        } else if ("expand" === revealMode) {
            this._initialPosition = drawer.isHorizontalDirection() ? {
                left: 0
            } : {
                top: 0
            };
            (0, _translator.move)($panelOverlayContent, this._initialPosition);
            if (drawer.isHorizontalDirection()) {
                (0, _renderer.default)($panelOverlayContent).css("width", panelSize)
            } else {
                (0, _renderer.default)($panelOverlayContent).css("height", panelSize);
                if ("bottom" === targetPanelPosition) {
                    (0, _renderer.default)($panelOverlayContent).css("marginTop", marginTop)
                }
            }
        }
    }
    getPanelContent() {
        return (0, _renderer.default)(this.getDrawerInstance().getOverlay().content())
    }
    _processOverlayZIndex($element) {
        const styles = (0, _renderer.default)($element).get(0).style;
        const zIndex = styles.zIndex || 1;
        this.getDrawerInstance().setZIndex(zIndex)
    }
    isViewContentFirst(position) {
        return "right" === position || "bottom" === position
    }
}
var _default = exports.default = OverlapStrategy;
