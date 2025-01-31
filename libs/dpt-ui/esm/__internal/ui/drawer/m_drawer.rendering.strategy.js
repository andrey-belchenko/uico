/**
 * DevExtreme (esm/__internal/ui/drawer/m_drawer.rendering.strategy.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import {
    Deferred,
    when
} from "../../../core/utils/deferred";
import {
    setHeight,
    setWidth
} from "../../../core/utils/size";
import {
    animation
} from "./m_drawer.animation";
class DrawerStrategy {
    constructor(drawer) {
        this._drawer = drawer
    }
    getDrawerInstance() {
        return this._drawer
    }
    renderPanelContent(whenPanelContentRendered) {
        const drawer = this.getDrawerInstance();
        const template = drawer._getTemplate(drawer.option("template"));
        if (template) {
            template.render({
                container: drawer.content(),
                onRendered: () => {
                    whenPanelContentRendered.resolve()
                }
            })
        }
    }
    renderPosition(changePositionUsingFxAnimation, animationDuration) {
        const whenPositionAnimationCompleted = Deferred();
        const whenShaderAnimationCompleted = Deferred();
        const drawer = this.getDrawerInstance();
        if (changePositionUsingFxAnimation) {
            when.apply($, [whenPositionAnimationCompleted, whenShaderAnimationCompleted]).done((() => {
                drawer._animationCompleteHandler()
            }))
        }
        this._internalRenderPosition(changePositionUsingFxAnimation, whenPositionAnimationCompleted);
        if (!changePositionUsingFxAnimation) {
            drawer.resizeViewContent()
        }
        this.renderShaderVisibility(changePositionUsingFxAnimation, animationDuration, whenShaderAnimationCompleted)
    }
    _getPanelOffset(isDrawerOpened) {
        const drawer = this.getDrawerInstance();
        const size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();
        if (isDrawerOpened) {
            return -(size - drawer.getMaxSize())
        }
        return -(size - drawer.getMinSize())
    }
    _getPanelSize(isDrawerOpened) {
        return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize()
    }
    renderShaderVisibility(changePositionUsingFxAnimation, duration, whenAnimationCompleted) {
        const drawer = this.getDrawerInstance();
        const isShaderVisible = drawer.option("opened");
        const fadeConfig = isShaderVisible ? {
            from: 0,
            to: 1
        } : {
            from: 1,
            to: 0
        };
        if (changePositionUsingFxAnimation) {
            animation.fade($(drawer._$shader), fadeConfig, duration, (() => {
                this._drawer._toggleShaderVisibility(isShaderVisible);
                whenAnimationCompleted.resolve()
            }))
        } else {
            drawer._toggleShaderVisibility(isShaderVisible);
            drawer._$shader.css("opacity", fadeConfig.to)
        }
    }
    getPanelContent() {
        return $(this.getDrawerInstance().content())
    }
    setPanelSize(calcFromRealPanelSize) {
        this.refreshPanelElementSize(calcFromRealPanelSize)
    }
    refreshPanelElementSize(calcFromRealPanelSize) {
        const drawer = this.getDrawerInstance();
        const panelSize = this._getPanelSize(drawer.option("opened"));
        if (drawer.isHorizontalDirection()) {
            setWidth($(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize)
        } else {
            setHeight($(drawer.content()), calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize)
        }
    }
    isViewContentFirst() {
        return false
    }
    onPanelContentRendered() {}
}
export default DrawerStrategy;
