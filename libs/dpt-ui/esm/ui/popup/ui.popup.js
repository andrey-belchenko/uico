/**
 * DevExtreme (esm/ui/popup/ui.popup.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import devices from "../../core/devices";
import {
    getPublicElement
} from "../../core/element";
import $ from "../../core/renderer";
import {
    EmptyTemplate
} from "../../core/templates/empty_template";
import browser from "../../core/utils/browser";
import {
    noop
} from "../../core/utils/common";
import {
    extend
} from "../../core/utils/extend";
import {
    camelize
} from "../../core/utils/inflector";
import {
    each
} from "../../core/utils/iterator";
import {
    getVisibleHeight,
    addOffsetToMaxHeight,
    addOffsetToMinHeight,
    getVerticalOffsets,
    getOuterWidth,
    getWidth,
    getHeight
} from "../../core/utils/size";
import {
    getBoundingRect
} from "../../core/utils/position";
import {
    isDefined,
    isObject
} from "../../core/utils/type";
import {
    compare as compareVersions
} from "../../core/utils/version";
import {
    getWindow,
    hasWindow
} from "../../core/utils/window";
import {
    triggerResizeEvent
} from "../../events/visibility_change";
import messageLocalization from "../../localization/message";
import PopupDrag from "./popup_drag";
import Resizable from "../resizable";
import Button from "../button";
import Overlay from "../overlay/ui.overlay";
import {
    isMaterialBased,
    isMaterial,
    isFluent
} from "../themes";
import "../toolbar/ui.toolbar.base";
import resizeObserverSingleton from "../../core/resize_observer";
import * as zIndexPool from "../overlay/z_index";
import {
    PopupPositionController
} from "./popup_position_controller";
import {
    createBodyOverflowManager
} from "./popup_overflow_manager";
import Guid from "../../core/guid";
const window = getWindow();
const POPUP_CLASS = "dx-popup";
const POPUP_WRAPPER_CLASS = "dx-popup-wrapper";
const POPUP_FULL_SCREEN_CLASS = "dx-popup-fullscreen";
const POPUP_FULL_SCREEN_WIDTH_CLASS = "dx-popup-fullscreen-width";
const POPUP_NORMAL_CLASS = "dx-popup-normal";
const POPUP_CONTENT_CLASS = "dx-popup-content";
const POPUP_CONTENT_SCROLLABLE_CLASS = "dx-popup-content-scrollable";
const DISABLED_STATE_CLASS = "dx-state-disabled";
const POPUP_DRAGGABLE_CLASS = "dx-popup-draggable";
const POPUP_TITLE_CLASS = "dx-popup-title";
const POPUP_TITLE_CLOSEBUTTON_CLASS = "dx-closebutton";
const POPUP_BOTTOM_CLASS = "dx-popup-bottom";
const POPUP_HAS_CLOSE_BUTTON_CLASS = "dx-has-close-button";
const TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
const POPUP_CONTENT_FLEX_HEIGHT_CLASS = "dx-popup-flex-height";
const POPUP_CONTENT_INHERIT_HEIGHT_CLASS = "dx-popup-inherit-height";
const TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
const ALLOWED_TOOLBAR_ITEM_ALIASES = ["cancel", "clear", "done"];
const BUTTON_DEFAULT_TYPE = "default";
const BUTTON_NORMAL_TYPE = "normal";
const BUTTON_TEXT_MODE = "text";
const BUTTON_CONTAINED_MODE = "contained";
const BUTTON_OUTLINED_MODE = "outlined";
const IS_OLD_SAFARI = browser.safari && compareVersions(browser.version, [11]) < 0;
const HEIGHT_STRATEGIES = {
    static: "",
    inherit: "dx-popup-inherit-height",
    flex: "dx-popup-flex-height"
};
const getButtonPlace = name => {
    const device = devices.current();
    const platform = device.platform;
    let toolbar = "bottom";
    let location = "before";
    if ("ios" === platform) {
        switch (name) {
            case "cancel":
                toolbar = "top";
                break;
            case "clear":
                toolbar = "top";
                location = "after";
                break;
            case "done":
                location = "after"
        }
    } else if ("android" === platform) {
        switch (name) {
            case "cancel":
            case "done":
                location = "after"
        }
    }
    return {
        toolbar: toolbar,
        location: location
    }
};
const Popup = Overlay.inherit({
    _supportedKeys: function() {
        return extend(this.callBase(), {
            upArrow: e => {
                var _this$_drag;
                null === (_this$_drag = this._drag) || void 0 === _this$_drag || _this$_drag.moveUp(e)
            },
            downArrow: e => {
                var _this$_drag2;
                null === (_this$_drag2 = this._drag) || void 0 === _this$_drag2 || _this$_drag2.moveDown(e)
            },
            leftArrow: e => {
                var _this$_drag3;
                null === (_this$_drag3 = this._drag) || void 0 === _this$_drag3 || _this$_drag3.moveLeft(e)
            },
            rightArrow: e => {
                var _this$_drag4;
                null === (_this$_drag4 = this._drag) || void 0 === _this$_drag4 || _this$_drag4.moveRight(e)
            }
        })
    },
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            fullScreen: false,
            title: "",
            showTitle: true,
            titleTemplate: "title",
            onTitleRendered: null,
            dragOutsideBoundary: false,
            dragEnabled: false,
            dragAndResizeArea: void 0,
            enableBodyScroll: true,
            outsideDragFactor: 0,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            resizeEnabled: false,
            toolbarItems: [],
            showCloseButton: false,
            bottomTemplate: "bottom",
            useDefaultToolbarButtons: false,
            useFlatToolbarButtons: false,
            autoResizeEnabled: true
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                animation: this._iosAnimation
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                animation: this._androidAnimation
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                showCloseButton: true
            }
        }, {
            device: function(device) {
                return "desktop" === devices.real().deviceType && "generic" === device.platform
            },
            options: {
                dragEnabled: true
            }
        }, {
            device: function() {
                return "desktop" === devices.real().deviceType && !devices.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return isMaterialBased()
            },
            options: {
                useFlatToolbarButtons: true
            }
        }, {
            device: function() {
                return isMaterial()
            },
            options: {
                useDefaultToolbarButtons: true,
                showCloseButton: false
            }
        }])
    },
    _iosAnimation: {
        show: {
            type: "slide",
            duration: 400,
            from: {
                position: {
                    my: "top",
                    at: "bottom"
                }
            },
            to: {
                position: {
                    my: "center",
                    at: "center"
                }
            }
        },
        hide: {
            type: "slide",
            duration: 400,
            from: {
                opacity: 1,
                position: {
                    my: "center",
                    at: "center"
                }
            },
            to: {
                opacity: 1,
                position: {
                    my: "top",
                    at: "bottom"
                }
            }
        }
    },
    _androidAnimation: function() {
        return this.option("fullScreen") ? {
            show: {
                type: "slide",
                duration: 300,
                from: {
                    top: "30%",
                    opacity: 0
                },
                to: {
                    top: 0,
                    opacity: 1
                }
            },
            hide: {
                type: "slide",
                duration: 300,
                from: {
                    top: 0,
                    opacity: 1
                },
                to: {
                    top: "30%",
                    opacity: 0
                }
            }
        } : {
            show: {
                type: "fade",
                duration: 400,
                from: 0,
                to: 1
            },
            hide: {
                type: "fade",
                duration: 400,
                from: 1,
                to: 0
            }
        }
    },
    _init: function() {
        const popupWrapperClassExternal = this.option("_wrapperClassExternal");
        const popupWrapperClasses = popupWrapperClassExternal ? `dx-popup-wrapper ${popupWrapperClassExternal}` : "dx-popup-wrapper";
        this.callBase();
        this._createBodyOverflowManager();
        this._updateResizeCallbackSkipCondition();
        this.$element().addClass("dx-popup");
        this.$wrapper().addClass(popupWrapperClasses);
        this._$popupContent = this._$content.wrapInner($("<div>").addClass("dx-popup-content")).children().eq(0);
        this._toggleContentScrollClass();
        this.$overlayContent().attr("role", "dialog")
    },
    _render: function() {
        const isFullscreen = this.option("fullScreen");
        this._toggleFullScreenClass(isFullscreen);
        this.callBase()
    },
    _createBodyOverflowManager: function() {
        this._bodyOverflowManager = createBodyOverflowManager()
    },
    _toggleFullScreenClass: function(value) {
        this.$overlayContent().toggleClass("dx-popup-fullscreen", value).toggleClass("dx-popup-normal", !value)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new EmptyTemplate,
            bottom: new EmptyTemplate
        })
    },
    _getActionsList: function() {
        return this.callBase().concat(["onResizeStart", "onResize", "onResizeEnd"])
    },
    _contentResizeHandler: function(entry) {
        if (!this._shouldSkipContentResize(entry)) {
            this._renderGeometry({
                shouldOnlyReposition: true
            })
        }
    },
    _doesShowAnimationChangeDimensions: function() {
        const animation = this.option("animation");
        return ["to", "from"].some((prop => {
            var _animation$show;
            const config = null === animation || void 0 === animation || null === (_animation$show = animation.show) || void 0 === _animation$show ? void 0 : _animation$show[prop];
            return isObject(config) && ("width" in config || "height" in config)
        }))
    },
    _updateResizeCallbackSkipCondition() {
        const doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
        this._shouldSkipContentResize = entry => doesShowAnimationChangeDimensions && this._showAnimationProcessing || this._areContentDimensionsRendered(entry)
    },
    _observeContentResize: function(shouldObserve) {
        if (!this.option("useResizeObserver")) {
            return
        }
        const contentElement = this._$content.get(0);
        if (shouldObserve) {
            resizeObserverSingleton.observe(contentElement, (entry => {
                this._contentResizeHandler(entry)
            }))
        } else {
            resizeObserverSingleton.unobserve(contentElement)
        }
    },
    _areContentDimensionsRendered: function(entry) {
        var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
        const contentBox = null === (_entry$contentBoxSize = entry.contentBoxSize) || void 0 === _entry$contentBoxSize ? void 0 : _entry$contentBoxSize[0];
        if (contentBox) {
            var _this$_renderedDimens, _this$_renderedDimens2;
            return parseInt(contentBox.inlineSize, 10) === (null === (_this$_renderedDimens = this._renderedDimensions) || void 0 === _this$_renderedDimens ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === (null === (_this$_renderedDimens2 = this._renderedDimensions) || void 0 === _this$_renderedDimens2 ? void 0 : _this$_renderedDimens2.height)
        }
        const contentRect = entry.contentRect;
        return parseInt(contentRect.width, 10) === (null === (_this$_renderedDimens3 = this._renderedDimensions) || void 0 === _this$_renderedDimens3 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === (null === (_this$_renderedDimens4 = this._renderedDimensions) || void 0 === _this$_renderedDimens4 ? void 0 : _this$_renderedDimens4.height)
    },
    _renderContent() {
        this.callBase();
        this._observeContentResize(true)
    },
    _renderContentImpl: function() {
        this._renderTitle();
        this.callBase();
        this._renderResize();
        this._renderBottom()
    },
    _renderTitle: function() {
        const items = this._getToolbarItems("top");
        const {
            title: title,
            showTitle: showTitle
        } = this.option();
        if (showTitle && !!title) {
            items.unshift({
                location: devices.current().ios ? "center" : "before",
                text: title
            })
        }
        if (showTitle || items.length > 0) {
            this._$title && this._$title.remove();
            const $title = $("<div>").addClass("dx-popup-title").insertBefore(this.$content());
            this._$title = this._renderTemplateByType("titleTemplate", items, $title).addClass("dx-popup-title");
            this._renderDrag();
            this._executeTitleRenderAction(this._$title);
            this._$title.toggleClass("dx-has-close-button", this._hasCloseButton())
        } else if (this._$title) {
            this._$title.detach()
        }
        this._toggleAriaLabel()
    },
    _toggleAriaLabel() {
        var _this$_$title;
        const {
            title: title,
            showTitle: showTitle
        } = this.option();
        const shouldSetAriaLabel = showTitle && !!title;
        const titleId = shouldSetAriaLabel ? new Guid : null;
        null === (_this$_$title = this._$title) || void 0 === _this$_$title || _this$_$title.find(".dx-toolbar-label").eq(0).attr("id", titleId);
        this.$overlayContent().attr("aria-labelledby", titleId)
    },
    _renderTemplateByType: function(optionName, data, $container, additionalToolbarOptions) {
        const {
            rtlEnabled: rtlEnabled,
            useDefaultToolbarButtons: useDefaultToolbarButtons,
            useFlatToolbarButtons: useFlatToolbarButtons,
            disabled: disabled
        } = this.option();
        const template = this._getTemplateByOption(optionName);
        const toolbarTemplate = template instanceof EmptyTemplate;
        if (toolbarTemplate) {
            const integrationOptions = extend({}, this.option("integrationOptions"), {
                skipTemplates: ["content", "title"]
            });
            const toolbarOptions = extend(additionalToolbarOptions, {
                items: data,
                rtlEnabled: rtlEnabled,
                useDefaultButtons: useDefaultToolbarButtons,
                useFlatButtons: useFlatToolbarButtons,
                disabled: disabled,
                integrationOptions: integrationOptions
            });
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: {
                    widget: this._getToolbarName(),
                    options: toolbarOptions
                }
            });
            const $toolbar = $container.children("div");
            $container.replaceWith($toolbar);
            return $toolbar
        } else {
            const $result = $(template.render({
                container: getPublicElement($container)
            }));
            if ($result.hasClass("dx-template-wrapper")) {
                $container.replaceWith($result);
                $container = $result
            }
            return $container
        }
    },
    _getToolbarName: function() {
        return "dxToolbarBase"
    },
    _renderVisibilityAnimate: function(visible) {
        return this.callBase(visible)
    },
    _hide() {
        this._observeContentResize(false);
        return this.callBase()
    },
    _executeTitleRenderAction: function($titleElement) {
        this._getTitleRenderAction()({
            titleElement: getPublicElement($titleElement)
        })
    },
    _getTitleRenderAction: function() {
        return this._titleRenderAction || this._createTitleRenderAction()
    },
    _createTitleRenderAction: function() {
        return this._titleRenderAction = this._createActionByOption("onTitleRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _getCloseButton: function() {
        return {
            toolbar: "top",
            location: "after",
            template: this._getCloseButtonRenderer()
        }
    },
    _getCloseButtonRenderer: function() {
        return (_, __, container) => {
            const $button = $("<div>").addClass("dx-closebutton");
            this._createComponent($button, Button, {
                icon: "close",
                onClick: this._createToolbarItemAction(void 0),
                stylingMode: "text",
                integrationOptions: {}
            });
            $(container).append($button)
        }
    },
    _getToolbarItems: function(toolbar) {
        const toolbarItems = this.option("toolbarItems");
        const toolbarsItems = [];
        this._toolbarItemClasses = [];
        const currentPlatform = devices.current().platform;
        let index = 0;
        each(toolbarItems, ((_, data) => {
            const isShortcut = isDefined(data.shortcut);
            const item = isShortcut ? getButtonPlace(data.shortcut) : data;
            if (isShortcut && "ios" === currentPlatform && index < 2) {
                item.toolbar = "top";
                index++
            }
            item.toolbar = data.toolbar || item.toolbar || "top";
            if (item && item.toolbar === toolbar) {
                if (isShortcut) {
                    extend(item, {
                        location: data.location
                    }, this._getToolbarItemByAlias(data))
                }
                const isLTROrder = "generic" === currentPlatform;
                if ("done" === data.shortcut && isLTROrder || "cancel" === data.shortcut && !isLTROrder) {
                    toolbarsItems.unshift(item)
                } else {
                    toolbarsItems.push(item)
                }
            }
        }));
        if ("top" === toolbar && this._hasCloseButton()) {
            toolbarsItems.push(this._getCloseButton())
        }
        return toolbarsItems
    },
    _hasCloseButton() {
        return this.option("showCloseButton") && this.option("showTitle")
    },
    _getLocalizationKey: itemType => "done" === itemType.toLowerCase() ? "OK" : camelize(itemType, true),
    _getToolbarButtonStylingMode: function(shortcut) {
        if (isFluent()) {
            return "done" === shortcut ? "contained" : "outlined"
        }
        return this.option("useFlatToolbarButtons") ? "text" : "contained"
    },
    _getToolbarButtonType: function(shortcut) {
        if (isFluent() && "done" === shortcut || this.option("useDefaultToolbarButtons")) {
            return "default"
        }
        return "normal"
    },
    _getToolbarItemByAlias: function(data) {
        const that = this;
        const itemType = data.shortcut;
        if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
            return false
        }
        const itemConfig = extend({
            text: messageLocalization.format(this._getLocalizationKey(itemType)),
            onClick: this._createToolbarItemAction(data.onClick),
            integrationOptions: {},
            type: this._getToolbarButtonType(itemType),
            stylingMode: this._getToolbarButtonStylingMode(itemType)
        }, data.options || {});
        const itemClass = "dx-popup-" + itemType;
        this._toolbarItemClasses.push(itemClass);
        return {
            template: function(_, __, container) {
                const $toolbarItem = $("<div>").addClass(itemClass).appendTo(container);
                that._createComponent($toolbarItem, Button, itemConfig)
            }
        }
    },
    _createToolbarItemAction: function(clickAction) {
        return this._createAction(clickAction, {
            afterExecute: function(e) {
                e.component.hide()
            }
        })
    },
    _renderBottom: function() {
        const items = this._getToolbarItems("bottom");
        if (items.length) {
            this._$bottom && this._$bottom.remove();
            const $bottom = $("<div>").addClass("dx-popup-bottom").insertAfter(this.$content());
            this._$bottom = this._renderTemplateByType("bottomTemplate", items, $bottom, {
                compactMode: true
            }).addClass("dx-popup-bottom");
            this._toggleClasses()
        } else {
            this._$bottom && this._$bottom.detach()
        }
    },
    _toggleDisabledState: function(value) {
        this.callBase(...arguments);
        this.$content().toggleClass("dx-state-disabled", Boolean(value))
    },
    _toggleClasses: function() {
        const aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
        each(aliases, ((_, alias) => {
            const className = "dx-popup-" + alias;
            if (this._toolbarItemClasses.includes(className)) {
                this.$wrapper().addClass(className + "-visible");
                this._$bottom.addClass(className)
            } else {
                this.$wrapper().removeClass(className + "-visible");
                this._$bottom.removeClass(className)
            }
        }))
    },
    _toggleFocusClass(isFocused, $element) {
        this.callBase(isFocused, $element);
        if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
            const zIndex = zIndexPool.create(this._zIndexInitValue());
            zIndexPool.remove(this._zIndex);
            this._zIndex = zIndex;
            this._$wrapper.css("zIndex", zIndex);
            this._$content.css("zIndex", zIndex)
        }
    },
    _toggleContentScrollClass() {
        const isNativeScrollingEnabled = !this.option("preventScrollEvents");
        this.$content().toggleClass("dx-popup-content-scrollable", isNativeScrollingEnabled)
    },
    _getPositionControllerConfig() {
        const {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings,
            dragOutsideBoundary: dragOutsideBoundary,
            dragAndResizeArea: dragAndResizeArea,
            outsideDragFactor: outsideDragFactor
        } = this.option();
        return extend({}, this.callBase(), {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings,
            dragOutsideBoundary: dragOutsideBoundary,
            dragAndResizeArea: dragAndResizeArea,
            outsideDragFactor: outsideDragFactor
        })
    },
    _initPositionController() {
        this._positionController = new PopupPositionController(this._getPositionControllerConfig())
    },
    _getDragTarget: function() {
        return this.topToolbar()
    },
    _renderGeometry: function(options) {
        const {
            visible: visible,
            useResizeObserver: useResizeObserver
        } = this.option();
        if (visible && hasWindow()) {
            const isAnimated = this._showAnimationProcessing;
            const shouldRepeatAnimation = isAnimated && !(null !== options && void 0 !== options && options.forceStopAnimation) && useResizeObserver;
            this._isAnimationPaused = shouldRepeatAnimation || void 0;
            this._stopAnimation();
            if (null !== options && void 0 !== options && options.shouldOnlyReposition) {
                this._renderPosition(false)
            } else {
                this._renderGeometryImpl(null === options || void 0 === options ? void 0 : options.isDimensionChange)
            }
            if (shouldRepeatAnimation) {
                this._animateShowing();
                this._isAnimationPaused = void 0
            }
        }
    },
    _cacheDimensions: function() {
        if (!this.option("useResizeObserver")) {
            return
        }
        this._renderedDimensions = {
            width: parseInt(getWidth(this._$content), 10),
            height: parseInt(getHeight(this._$content), 10)
        }
    },
    _renderGeometryImpl: function() {
        let isDimensionChange = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        if (!isDimensionChange) {
            this._resetContentHeight()
        }
        this.callBase();
        this._cacheDimensions();
        this._setContentHeight()
    },
    _resetContentHeight: function() {
        const height = this._getOptionValue("height");
        if ("auto" === height) {
            this.$content().css({
                height: "auto",
                maxHeight: "none"
            })
        }
    },
    _renderDrag: function() {
        const $dragTarget = this._getDragTarget();
        const dragEnabled = this.option("dragEnabled");
        if (!$dragTarget) {
            return
        }
        const config = {
            dragEnabled: dragEnabled,
            handle: $dragTarget.get(0),
            draggableElement: this._$content.get(0),
            positionController: this._positionController
        };
        if (this._drag) {
            this._drag.init(config)
        } else {
            this._drag = new PopupDrag(config)
        }
        this.$overlayContent().toggleClass("dx-popup-draggable", dragEnabled)
    },
    _renderResize: function() {
        this._resizable = this._createComponent(this._$content, Resizable, {
            handles: this.option("resizeEnabled") ? "all" : "none",
            onResizeEnd: e => {
                this._resizeEndHandler(e);
                this._observeContentResize(true)
            },
            onResize: e => {
                this._setContentHeight();
                this._actions.onResize(e)
            },
            onResizeStart: e => {
                this._observeContentResize(false);
                this._actions.onResizeStart(e)
            },
            minHeight: 100,
            minWidth: 100,
            area: this._positionController.$dragResizeContainer,
            keepAspectRatio: false
        })
    },
    _resizeEndHandler: function(e) {
        const width = this._resizable.option("width");
        const height = this._resizable.option("height");
        width && this._setOptionWithoutOptionChange("width", width);
        height && this._setOptionWithoutOptionChange("height", height);
        this._cacheDimensions();
        this._positionController.resizeHandled();
        this._positionController.detectVisualPositionChange(e.event);
        this._actions.onResizeEnd(e)
    },
    _setContentHeight: function() {
        (this.option("forceApplyBindings") || noop)();
        const overlayContent = this.$overlayContent().get(0);
        const currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
        this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
        this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass)
    },
    _heightStrategyChangeOffset: function(currentHeightStrategyClass, popupVerticalPaddings) {
        return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0
    },
    _chooseHeightStrategy: function(overlayContent) {
        const isAutoWidth = "auto" === overlayContent.style.width || "" === overlayContent.style.width;
        let currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
        if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
            if (isAutoWidth || IS_OLD_SAFARI) {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit
            } else {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.flex
            }
        }
        return currentHeightStrategyClass
    },
    _getHeightCssStyles: function(currentHeightStrategyClass, overlayContent) {
        let cssStyles = {};
        const contentMaxHeight = this._getOptionValue("maxHeight", overlayContent);
        const contentMinHeight = this._getOptionValue("minHeight", overlayContent);
        const popupHeightParts = this._splitPopupHeight();
        const toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
        if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
            if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
                const overlayHeight = this.option("fullScreen") ? Math.min(getBoundingRect(overlayContent).height, getWindow().innerHeight) : getBoundingRect(overlayContent).height;
                const contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
                cssStyles = {
                    height: Math.max(0, contentHeight),
                    minHeight: "auto",
                    maxHeight: "auto"
                }
            }
        } else {
            const container = $(this._positionController.$visualContainer).get(0);
            const maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
            const minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
            cssStyles = {
                height: "auto",
                minHeight: minHeightValue,
                maxHeight: maxHeightValue
            }
        }
        return cssStyles
    },
    _setHeightClasses: function($container, currentClass) {
        let excessClasses = "";
        for (const name in HEIGHT_STRATEGIES) {
            if (HEIGHT_STRATEGIES[name] !== currentClass) {
                excessClasses += " " + HEIGHT_STRATEGIES[name]
            }
        }
        $container.removeClass(excessClasses).addClass(currentClass)
    },
    _isAutoHeight: function() {
        return "auto" === this.$overlayContent().get(0).style.height
    },
    _splitPopupHeight: function() {
        const topToolbar = this.topToolbar();
        const bottomToolbar = this.bottomToolbar();
        return {
            header: getVisibleHeight(topToolbar && topToolbar.get(0)),
            footer: getVisibleHeight(bottomToolbar && bottomToolbar.get(0)),
            contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
            popupVerticalOffsets: getVerticalOffsets(this.$content().get(0), true),
            popupVerticalPaddings: getVerticalOffsets(this.$content().get(0), false)
        }
    },
    _isAllWindowCovered: function() {
        return this.callBase() || this.option("fullScreen")
    },
    _renderDimensions: function() {
        if (this.option("fullScreen")) {
            this.$overlayContent().css({
                width: "100%",
                height: "100%",
                minWidth: "",
                maxWidth: "",
                minHeight: "",
                maxHeight: ""
            })
        } else {
            this.callBase()
        }
        if (hasWindow()) {
            this._renderFullscreenWidthClass()
        }
    },
    _dimensionChanged: function() {
        this._renderGeometry({
            isDimensionChange: true
        })
    },
    _clean: function() {
        this.callBase();
        this._observeContentResize(false)
    },
    _dispose: function() {
        this.callBase();
        this._toggleBodyScroll(true)
    },
    _renderFullscreenWidthClass: function() {
        this.$overlayContent().toggleClass("dx-popup-fullscreen-width", getOuterWidth(this.$overlayContent()) === getWidth(window))
    },
    _toggleSafariScrolling() {
        if (!this.option("enableBodyScroll")) {
            return
        }
        this.callBase()
    },
    _toggleBodyScroll: function(enabled) {
        if (!this._bodyOverflowManager) {
            return
        }
        const {
            setOverflow: setOverflow,
            restoreOverflow: restoreOverflow
        } = this._bodyOverflowManager;
        if (enabled) {
            restoreOverflow()
        } else {
            setOverflow()
        }
    },
    refreshPosition: function() {
        this._renderPosition()
    },
    _optionChanged: function(args) {
        var _this$_resizable2;
        const {
            value: value,
            name: name
        } = args;
        switch (name) {
            case "disabled":
                this.callBase(args);
                this._renderTitle();
                this._renderBottom();
                break;
            case "animation":
                this._updateResizeCallbackSkipCondition();
                break;
            case "enableBodyScroll":
                if (this.option("visible")) {
                    this._toggleBodyScroll(value)
                }
                break;
            case "showTitle":
            case "title":
            case "titleTemplate":
                this._renderTitle();
                this._renderGeometry();
                triggerResizeEvent(this.$overlayContent());
                break;
            case "bottomTemplate":
                this._renderBottom();
                this._renderGeometry();
                triggerResizeEvent(this.$overlayContent());
                break;
            case "container":
                this.callBase(args);
                if (this.option("resizeEnabled")) {
                    var _this$_resizable;
                    null === (_this$_resizable = this._resizable) || void 0 === _this$_resizable || _this$_resizable.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "width":
            case "height":
                this.callBase(args);
                null === (_this$_resizable2 = this._resizable) || void 0 === _this$_resizable2 || _this$_resizable2.option(name, value);
                break;
            case "onTitleRendered":
                this._createTitleRenderAction(value);
                break;
            case "toolbarItems":
            case "useDefaultToolbarButtons":
            case "useFlatToolbarButtons": {
                const shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
                this._renderTitle();
                this._renderBottom();
                if (shouldRenderGeometry) {
                    this._renderGeometry();
                    triggerResizeEvent(this.$overlayContent())
                }
                break
            }
            case "dragEnabled":
                this._renderDrag();
                break;
            case "dragAndResizeArea":
                this._positionController.dragAndResizeArea = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                this._positionController.positionContent();
                break;
            case "dragOutsideBoundary":
                this._positionController.dragOutsideBoundary = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "outsideDragFactor":
                this._positionController.outsideDragFactor = value;
                break;
            case "resizeEnabled":
                this._renderResize();
                this._renderGeometry();
                break;
            case "autoResizeEnabled":
                this._renderGeometry();
                triggerResizeEvent(this.$overlayContent());
                break;
            case "fullScreen":
                this._positionController.fullScreen = value;
                this._toggleFullScreenClass(value);
                this._toggleSafariScrolling();
                this._renderGeometry();
                triggerResizeEvent(this.$overlayContent());
                break;
            case "showCloseButton":
                this._renderTitle();
                break;
            case "preventScrollEvents":
                this.callBase(args);
                this._toggleContentScrollClass();
                break;
            default:
                this.callBase(args)
        }
    },
    bottomToolbar: function() {
        return this._$bottom
    },
    topToolbar: function() {
        return this._$title
    },
    $content: function() {
        return this._$popupContent
    },
    content: function() {
        return getPublicElement(this.$content())
    },
    $overlayContent: function() {
        return this._$content
    },
    getFocusableElements: function() {
        return this.$wrapper().find("[tabindex]").filter(((index, item) => item.getAttribute("tabindex") >= 0))
    }
});
registerComponent("dxPopup", Popup);
export default Popup;
