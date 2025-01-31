/**
 * DevExtreme (esm/__internal/ui/drawer/m_drawer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import fx from "../../../animation/fx";
import registerComponent from "../../../core/component_registrator";
import {
    getPublicElement
} from "../../../core/element";
import $ from "../../../core/renderer";
import {
    EmptyTemplate
} from "../../../core/templates/empty_template";
import {
    Deferred,
    when
} from "../../../core/utils/deferred";
import {
    extend
} from "../../../core/utils/extend";
import {
    getBoundingRect
} from "../../../core/utils/position";
import {
    isDefined,
    isFunction
} from "../../../core/utils/type";
import {
    hasWindow
} from "../../../core/utils/window";
import {
    name as CLICK_EVENT_NAME
} from "../../../events/click";
import eventsEngine from "../../../events/core/events_engine";
import {
    triggerResizeEvent
} from "../../../events/visibility_change";
import Widget from "../../../ui/widget/ui.widget";
import {
    animation
} from "./m_drawer.animation";
import OverlapStrategy from "./m_drawer.rendering.strategy.overlap";
import PushStrategy from "./m_drawer.rendering.strategy.push";
import ShrinkStrategy from "./m_drawer.rendering.strategy.shrink";
const DRAWER_CLASS = "dx-drawer";
const DRAWER_WRAPPER_CLASS = "dx-drawer-wrapper";
const DRAWER_PANEL_CONTENT_CLASS = "dx-drawer-panel-content";
const DRAWER_PANEL_CONTENT_HIDDEN_CLASS = "dx-drawer-panel-content-hidden";
const DRAWER_VIEW_CONTENT_CLASS = "dx-drawer-content";
const DRAWER_SHADER_CLASS = "dx-drawer-shader";
const INVISIBLE_STATE_CLASS = "dx-state-invisible";
const OPENED_STATE_CLASS = "dx-drawer-opened";
const ANONYMOUS_TEMPLATE_NAME = "content";
const PANEL_TEMPLATE_NAME = "panel";
const Drawer = Widget.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            position: "left",
            opened: false,
            minSize: null,
            maxSize: null,
            shading: false,
            template: "panel",
            openedStateMode: "shrink",
            revealMode: "slide",
            animationEnabled: true,
            animationDuration: 400,
            closeOnOutsideClick: false,
            contentTemplate: "content"
        })
    },
    _init() {
        this.callBase();
        this._initStrategy();
        this.$element().addClass("dx-drawer");
        this._whenAnimationCompleted = void 0;
        this._whenPanelContentRendered = void 0;
        this._whenPanelContentRefreshed = void 0;
        this._$wrapper = $("<div>").addClass("dx-drawer-wrapper");
        this._$viewContentWrapper = $("<div>").addClass("dx-drawer-content");
        this._$wrapper.append(this._$viewContentWrapper);
        this.$element().append(this._$wrapper)
    },
    _initStrategy() {
        switch (this.option("openedStateMode")) {
            case "push":
            default:
                this._strategy = new PushStrategy(this);
                break;
            case "shrink":
                this._strategy = new ShrinkStrategy(this);
                break;
            case "overlap":
                this._strategy = new OverlapStrategy(this)
        }
    },
    _getAnonymousTemplateName: () => "content",
    _initTemplates() {
        const defaultTemplates = {};
        defaultTemplates.panel = new EmptyTemplate;
        defaultTemplates.content = new EmptyTemplate;
        this._templateManager.addDefaultTemplates(defaultTemplates);
        this.callBase()
    },
    _viewContentWrapperClickHandler(e) {
        let closeOnOutsideClick = this.option("closeOnOutsideClick");
        if (isFunction(closeOnOutsideClick)) {
            closeOnOutsideClick = closeOnOutsideClick(e)
        }
        if (closeOnOutsideClick && this.option("opened")) {
            this.stopAnimations();
            if (this.option("shading")) {
                e.preventDefault()
            }
            this.hide()
        }
    },
    _initMarkup() {
        this.callBase();
        this._toggleOpenedStateClass(this.option("opened"));
        this._renderPanelContentWrapper();
        this._refreshOpenedStateModeClass();
        this._refreshRevealModeClass();
        this._renderShader();
        this._refreshPositionClass();
        this._whenPanelContentRendered = Deferred();
        this._strategy.renderPanelContent(this._whenPanelContentRendered);
        this._strategy.onPanelContentRendered();
        this._renderViewContent();
        eventsEngine.off(this._$viewContentWrapper, CLICK_EVENT_NAME);
        eventsEngine.on(this._$viewContentWrapper, CLICK_EVENT_NAME, this._viewContentWrapperClickHandler.bind(this));
        this._refreshWrapperChildrenOrder()
    },
    _render() {
        this._initMinMaxSize();
        this.callBase();
        this._whenPanelContentRendered.always((() => {
            this._initMinMaxSize();
            this._strategy.refreshPanelElementSize("slide" === this.option("revealMode"));
            this._renderPosition(this.option("opened"), true);
            this._removePanelManualPosition()
        }))
    },
    _removePanelManualPosition() {
        if (this._$panelContentWrapper.attr("manualposition")) {
            this._$panelContentWrapper.removeAttr("manualPosition");
            this._$panelContentWrapper.css({
                position: "",
                top: "",
                left: "",
                right: "",
                bottom: ""
            })
        }
    },
    _togglePanelContentHiddenClass() {
        const callback = () => {
            const {
                minSize: minSize,
                opened: opened
            } = this.option();
            const shouldBeSet = minSize ? false : !opened;
            this._$panelContentWrapper.toggleClass("dx-drawer-panel-content-hidden", shouldBeSet)
        };
        if (this._whenAnimationCompleted) {
            when(this._whenAnimationCompleted).done(callback)
        } else {
            callback()
        }
    },
    _renderPanelContentWrapper() {
        const {
            openedStateMode: openedStateMode,
            opened: opened,
            minSize: minSize
        } = this.option();
        this._$panelContentWrapper = $("<div>").addClass("dx-drawer-panel-content");
        this._togglePanelContentHiddenClass();
        const position = this.calcTargetPosition();
        if ("push" === openedStateMode && ["top", "bottom"].includes(position)) {
            this._$panelContentWrapper.addClass("dx-drawer-panel-content-push-top-or-bottom")
        }
        if ("overlap" !== openedStateMode && !opened && !minSize) {
            this._$panelContentWrapper.attr("manualposition", true);
            this._$panelContentWrapper.css({
                position: "absolute",
                top: "-10000px",
                left: "-10000px",
                right: "auto",
                bottom: "auto"
            })
        }
        this._$wrapper.append(this._$panelContentWrapper)
    },
    _refreshOpenedStateModeClass(prevOpenedStateMode) {
        if (prevOpenedStateMode) {
            this.$element().removeClass(`dx-drawer-${prevOpenedStateMode}`)
        }
        this.$element().addClass(`dx-drawer-${this.option("openedStateMode")}`)
    },
    _refreshPositionClass(prevPosition) {
        if (prevPosition) {
            this.$element().removeClass(`dx-drawer-${prevPosition}`)
        }
        this.$element().addClass(`dx-drawer-${this.calcTargetPosition()}`)
    },
    _refreshWrapperChildrenOrder() {
        const position = this.calcTargetPosition();
        if (this._strategy.isViewContentFirst(position, this.option("rtlEnabled"))) {
            this._$wrapper.prepend(this._$viewContentWrapper)
        } else {
            this._$wrapper.prepend(this._$panelContentWrapper)
        }
    },
    _refreshRevealModeClass(prevRevealMode) {
        if (prevRevealMode) {
            this.$element().removeClass(`dx-drawer-${prevRevealMode}`)
        }
        this.$element().addClass(`dx-drawer-${this.option("revealMode")}`)
    },
    _renderViewContent() {
        const contentTemplateOption = this.option("contentTemplate");
        const contentTemplate = this._getTemplate(contentTemplateOption);
        if (contentTemplate) {
            const $viewTemplate = contentTemplate.render({
                container: this.viewContent(),
                noModel: true,
                transclude: this._templateManager.anonymousTemplateName === contentTemplateOption
            });
            if ($viewTemplate.hasClass("ng-scope")) {
                $(this._$viewContentWrapper).children().not(".dx-drawer-shader").replaceWith($viewTemplate)
            }
        }
    },
    _renderShader() {
        this._$shader = this._$shader || $("<div>").addClass("dx-drawer-shader");
        this._$shader.appendTo(this.viewContent());
        this._toggleShaderVisibility(this.option("opened"))
    },
    _initSize() {
        this._initMinMaxSize()
    },
    _initMinMaxSize() {
        const realPanelSize = this.isHorizontalDirection() ? this.getRealPanelWidth() : this.getRealPanelHeight();
        this._maxSize = this.option("maxSize") || realPanelSize;
        this._minSize = this.option("minSize") || 0
    },
    calcTargetPosition() {
        const position = this.option("position");
        const rtl = this.option("rtlEnabled");
        let result = position;
        if ("before" === position) {
            result = rtl ? "right" : "left"
        } else if ("after" === position) {
            result = rtl ? "left" : "right"
        }
        return result
    },
    getOverlayTarget() {
        return this._$wrapper
    },
    getOverlay() {
        return this._overlay
    },
    getMaxSize() {
        return this._maxSize
    },
    getMinSize() {
        return this._minSize
    },
    getRealPanelWidth() {
        if (hasWindow()) {
            if (isDefined(this.option("templateSize"))) {
                return this.option("templateSize")
            }
            return getBoundingRect(this._getPanelTemplateElement()).width
        }
        return 0
    },
    getRealPanelHeight() {
        if (hasWindow()) {
            if (isDefined(this.option("templateSize"))) {
                return this.option("templateSize")
            }
            return getBoundingRect(this._getPanelTemplateElement()).height
        }
        return 0
    },
    _getPanelTemplateElement() {
        const $panelContent = this._strategy.getPanelContent();
        let $result = $panelContent;
        if ($panelContent.children().length) {
            $result = $panelContent.children().eq(0);
            if ($panelContent.hasClass("dx-overlay-content") && $result.hasClass("dx-template-wrapper") && $result.children().length) {
                $result = $result.children().eq(0)
            }
        }
        return $result.get(0)
    },
    getElementHeight($element) {
        const $children = $element.children();
        return $children.length ? getBoundingRect($children.eq(0).get(0)).height : getBoundingRect($element.get(0)).height
    },
    isHorizontalDirection() {
        const position = this.calcTargetPosition();
        return "left" === position || "right" === position
    },
    stopAnimations(jumpToEnd) {
        fx.stop(this._$shader, jumpToEnd);
        fx.stop($(this.content()), jumpToEnd);
        fx.stop($(this.viewContent()), jumpToEnd);
        const overlay = this.getOverlay();
        if (overlay) {
            fx.stop($(overlay.$content()), jumpToEnd)
        }
    },
    setZIndex(zIndex) {
        this._$shader.css("zIndex", zIndex - 1);
        this._$panelContentWrapper.css("zIndex", zIndex)
    },
    resizeContent() {
        this.resizeViewContent
    },
    resizeViewContent() {
        triggerResizeEvent(this.viewContent())
    },
    _isInvertedPosition() {
        const position = this.calcTargetPosition();
        return "right" === position || "bottom" === position
    },
    _renderPosition(isDrawerOpened, disableAnimation, jumpToEnd) {
        this.stopAnimations(jumpToEnd);
        if (!hasWindow()) {
            return
        }
        $(this.viewContent()).css("paddingLeft", 0);
        $(this.viewContent()).css("paddingRight", 0);
        $(this.viewContent()).css("paddingTop", 0);
        $(this.viewContent()).css("paddingBottom", 0);
        let animationEnabled = this.option("animationEnabled");
        if (true === disableAnimation) {
            animationEnabled = false
        }
        if (isDrawerOpened) {
            this._toggleShaderVisibility(isDrawerOpened)
        }
        this._strategy.renderPosition(animationEnabled, this.option("animationDuration"))
    },
    _animationCompleteHandler() {
        this.resizeViewContent();
        if (this._whenAnimationCompleted) {
            this._whenAnimationCompleted.resolve()
        }
    },
    _getPositionCorrection() {
        return this._isInvertedPosition() ? -1 : 1
    },
    _dispose() {
        animation.complete($(this.viewContent()));
        this.callBase()
    },
    _visibilityChanged(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged() {
        this._initMinMaxSize();
        this._strategy.refreshPanelElementSize("slide" === this.option("revealMode"));
        this._renderPosition(this.option("opened"), true)
    },
    _toggleShaderVisibility(visible) {
        if (this.option("shading")) {
            this._$shader.toggleClass("dx-state-invisible", !visible);
            this._$shader.css("visibility", visible ? "visible" : "hidden")
        } else {
            this._$shader.toggleClass("dx-state-invisible", true)
        }
    },
    _toggleOpenedStateClass(opened) {
        this.$element().toggleClass("dx-drawer-opened", opened)
    },
    _refreshPanel() {
        $(this.viewContent()).css("left", 0);
        $(this.viewContent()).css("transform", "translate(0px, 0px)");
        $(this.viewContent()).removeClass("dx-theme-background-color");
        this._removePanelContentWrapper();
        this._removeOverlay();
        this._renderPanelContentWrapper();
        this._refreshWrapperChildrenOrder();
        this._whenPanelContentRefreshed = Deferred();
        this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
        this._strategy.onPanelContentRendered();
        if (hasWindow()) {
            this._whenPanelContentRefreshed.always((() => {
                this._strategy.refreshPanelElementSize("slide" === this.option("revealMode"));
                this._renderPosition(this.option("opened"), true, true);
                this._removePanelManualPosition()
            }))
        }
    },
    _clean() {
        this._cleanFocusState();
        this._removePanelContentWrapper();
        this._removeOverlay()
    },
    _removePanelContentWrapper() {
        if (this._$panelContentWrapper) {
            this._$panelContentWrapper.remove()
        }
    },
    _removeOverlay() {
        if (this._overlay) {
            this._overlay.dispose();
            delete this._overlay;
            delete this._$panelContentWrapper
        }
    },
    _optionChanged(args) {
        switch (args.name) {
            case "width":
                this.callBase(args);
                this._dimensionChanged();
                break;
            case "opened":
                this._renderPosition(this.option("opened"));
                this._toggleOpenedStateClass(args.value);
                this._togglePanelContentHiddenClass();
                break;
            case "position":
                this._refreshPositionClass(args.previousValue);
                this._refreshWrapperChildrenOrder();
                this._invalidate();
                break;
            case "contentTemplate":
            case "template":
                this._invalidate();
                break;
            case "openedStateMode":
                this._initStrategy();
                this._refreshOpenedStateModeClass(args.previousValue);
                this._refreshPanel();
                break;
            case "minSize":
                this._initMinMaxSize();
                this._renderPosition(this.option("opened"), true);
                this._togglePanelContentHiddenClass();
                break;
            case "maxSize":
                this._initMinMaxSize();
                this._renderPosition(this.option("opened"), true);
                break;
            case "revealMode":
                this._refreshRevealModeClass(args.previousValue);
                this._refreshPanel();
                break;
            case "shading":
                this._toggleShaderVisibility(this.option("opened"));
                break;
            case "animationEnabled":
            case "animationDuration":
            case "closeOnOutsideClick":
                break;
            default:
                this.callBase(args)
        }
    },
    content() {
        return getPublicElement(this._$panelContentWrapper)
    },
    viewContent() {
        return getPublicElement(this._$viewContentWrapper)
    },
    show() {
        return this.toggle(true)
    },
    hide() {
        return this.toggle(false)
    },
    toggle(opened) {
        const targetOpened = void 0 === opened ? !this.option("opened") : opened;
        this._whenAnimationCompleted = Deferred();
        this.option("opened", targetOpened);
        return this._whenAnimationCompleted.promise()
    }
});
registerComponent("dxDrawer", Drawer);
export default Drawer;
