/**
 * DevExtreme (esm/ui/popover/ui.popover.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWidth,
    setWidth,
    getHeight,
    setHeight
} from "../../core/utils/size";
import $ from "../../core/renderer";
import {
    hasWindow
} from "../../core/utils/window";
import {
    getPublicElement
} from "../../core/element";
import domAdapter from "../../core/dom_adapter";
import eventsEngine from "../../events/core/events_engine";
import registerComponent from "../../core/component_registrator";
import {
    extend
} from "../../core/utils/extend";
import {
    move
} from "../../animation/translator";
import positionUtils from "../../animation/position";
import {
    isObject,
    isString
} from "../../core/utils/type";
import {
    fitIntoRange
} from "../../core/utils/math";
import {
    addNamespace
} from "../../events/utils/index";
import errors from "../widget/ui.errors";
import Popup from "../popup/ui.popup";
import {
    getBoundingRect
} from "../../core/utils/position";
import {
    isMaterialBased,
    isMaterial
} from "../themes";
import {
    PopoverPositionController,
    POPOVER_POSITION_ALIASES
} from "./popover_position_controller";
const POPOVER_CLASS = "dx-popover";
const POPOVER_WRAPPER_CLASS = "dx-popover-wrapper";
const POPOVER_ARROW_CLASS = "dx-popover-arrow";
const POPOVER_WITHOUT_TITLE_CLASS = "dx-popover-without-title";
const POSITION_FLIP_MAP = {
    left: "right",
    top: "bottom",
    right: "left",
    bottom: "top",
    center: "center"
};
const getEventNameByOption = function(optionValue) {
    return isObject(optionValue) ? optionValue.name : optionValue
};
const getEventName = function(that, optionName) {
    const optionValue = that.option(optionName);
    return getEventNameByOption(optionValue)
};
const getEventDelay = function(that, optionName) {
    const optionValue = that.option(optionName);
    return isObject(optionValue) && optionValue.delay
};
const attachEvent = function(that, name) {
    const {
        target: target,
        shading: shading,
        disabled: disabled,
        hideEvent: hideEvent
    } = that.option();
    const isSelector = isString(target);
    const shouldIgnoreHideEvent = shading && "hide" === name;
    const event = shouldIgnoreHideEvent ? null : getEventName(that, `${name}Event`);
    if (shouldIgnoreHideEvent && hideEvent) {
        errors.log("W1020")
    }
    if (!event || disabled) {
        return
    }
    const eventName = addNamespace(event, that.NAME);
    const action = that._createAction(function() {
        const delay = getEventDelay(that, name + "Event");
        this._clearEventsTimeouts();
        if (delay) {
            this._timeouts[name] = setTimeout((function() {
                that[name]()
            }), delay)
        } else {
            that[name]()
        }
    }.bind(that), {
        validatingTargetName: "target"
    });
    const handler = function(e) {
        action({
            event: e,
            target: $(e.currentTarget)
        })
    };
    const EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (isSelector) {
        that[EVENT_HANDLER_NAME] = handler;
        eventsEngine.on(domAdapter.getDocument(), eventName, target, handler)
    } else {
        const targetElement = getPublicElement($(target));
        that[EVENT_HANDLER_NAME] = void 0;
        eventsEngine.on(targetElement, eventName, handler)
    }
};
const detachEvent = function(that, target, name, event) {
    let eventName = event || getEventName(that, name + "Event");
    if (!eventName) {
        return
    }
    eventName = addNamespace(eventName, that.NAME);
    const EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (that[EVENT_HANDLER_NAME]) {
        eventsEngine.off(domAdapter.getDocument(), eventName, target, that[EVENT_HANDLER_NAME])
    } else {
        eventsEngine.off(getPublicElement($(target)), eventName)
    }
};
const Popover = Popup.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            target: void 0,
            shading: false,
            position: extend({}, POPOVER_POSITION_ALIASES.bottom),
            hideOnOutsideClick: true,
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    from: 1,
                    to: 0
                }
            },
            showTitle: false,
            width: "auto",
            height: "auto",
            dragEnabled: false,
            resizeEnabled: false,
            fullScreen: false,
            hideOnParentScroll: true,
            arrowPosition: "",
            arrowOffset: 0,
            _fixWrapperPosition: true
        })
    },
    _defaultOptionsRules: function() {
        return [{
            device: {
                platform: "ios"
            },
            options: {
                arrowPosition: {
                    boundaryOffset: {
                        h: 20,
                        v: -10
                    },
                    collision: "fit"
                }
            }
        }, {
            device: function() {
                return !hasWindow()
            },
            options: {
                animation: null
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
        }]
    },
    _init: function() {
        var _this$option;
        this.callBase();
        this._renderArrow();
        this._timeouts = {};
        this.$element().addClass("dx-popover");
        this.$wrapper().addClass("dx-popover-wrapper");
        const isInteractive = null === (_this$option = this.option("toolbarItems")) || void 0 === _this$option ? void 0 : _this$option.length;
        this.setAria("role", isInteractive ? "dialog" : "tooltip")
    },
    _render: function() {
        this.callBase.apply(this, arguments);
        this._detachEvents(this.option("target"));
        this._attachEvents()
    },
    _detachEvents: function(target) {
        detachEvent(this, target, "show");
        detachEvent(this, target, "hide")
    },
    _attachEvents: function() {
        attachEvent(this, "show");
        attachEvent(this, "hide")
    },
    _renderArrow: function() {
        this._$arrow = $("<div>").addClass("dx-popover-arrow").prependTo(this.$overlayContent())
    },
    _documentDownHandler: function(e) {
        if (this._isOutsideClick(e)) {
            return this.callBase(e)
        }
        return true
    },
    _isOutsideClick: function(e) {
        return !$(e.target).closest(this.option("target")).length
    },
    _animate: function(animation) {
        if (animation && animation.to && "object" === typeof animation.to) {
            extend(animation.to, {
                position: this._getContainerPosition()
            })
        }
        this.callBase.apply(this, arguments)
    },
    _stopAnimation: function() {
        this.callBase.apply(this, arguments)
    },
    _renderTitle: function() {
        this.$wrapper().toggleClass("dx-popover-without-title", !this.option("showTitle"));
        this.callBase()
    },
    _renderPosition: function() {
        let shouldUpdateDimensions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : true;
        this.callBase();
        this._renderOverlayPosition(shouldUpdateDimensions);
        this._actions.onPositioned()
    },
    _renderOverlayPosition: function(shouldUpdateDimensions) {
        this._resetOverlayPosition(shouldUpdateDimensions);
        this._updateContentSize(shouldUpdateDimensions);
        const contentPosition = this._getContainerPosition();
        const resultLocation = positionUtils.setup(this.$overlayContent(), contentPosition);
        const positionSide = this._getSideByLocation(resultLocation);
        this._togglePositionClass("dx-position-" + positionSide);
        this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
        const isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
        if (isArrowVisible) {
            this._renderArrowPosition(positionSide)
        }
    },
    _resetOverlayPosition: function(shouldUpdateDimensions) {
        this._setContentHeight(shouldUpdateDimensions);
        this._togglePositionClass("dx-position-" + this._positionController._positionSide);
        move(this.$overlayContent(), {
            left: 0,
            top: 0
        });
        this._$arrow.css({
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        })
    },
    _updateContentSize: function(shouldUpdateDimensions) {
        if (!this.$content() || !shouldUpdateDimensions) {
            return
        }
        const containerLocation = positionUtils.calculate(this.$overlayContent(), this._getContainerPosition());
        if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
            const newContainerWidth = getWidth(this.$overlayContent()) - containerLocation.h.oversize;
            setWidth(this.$overlayContent(), newContainerWidth)
        }
        if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
            const newOverlayContentHeight = getHeight(this.$overlayContent()) - containerLocation.v.oversize;
            const newPopupContentHeight = getHeight(this.$content()) - containerLocation.v.oversize;
            setHeight(this.$overlayContent(), newOverlayContentHeight);
            setHeight(this.$content(), newPopupContentHeight)
        }
    },
    _getContainerPosition: function() {
        return this._positionController._getContainerPosition()
    },
    _getHideOnParentScrollTarget: function() {
        return $(this._positionController._position.of || this.callBase())
    },
    _getSideByLocation: function(location) {
        const isFlippedByVertical = location.v.flip;
        const isFlippedByHorizontal = location.h.flip;
        return this._isVerticalSide() && isFlippedByVertical || this._isHorizontalSide() && isFlippedByHorizontal || this._isPopoverInside() ? POSITION_FLIP_MAP[this._positionController._positionSide] : this._positionController._positionSide
    },
    _togglePositionClass: function(positionClass) {
        this.$wrapper().removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(positionClass)
    },
    _toggleFlippedClass: function(isFlippedHorizontal, isFlippedVertical) {
        this.$wrapper().toggleClass("dx-popover-flipped-horizontal", isFlippedHorizontal).toggleClass("dx-popover-flipped-vertical", isFlippedVertical)
    },
    _renderArrowPosition: function(side) {
        const arrowRect = getBoundingRect(this._$arrow.get(0));
        const arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
        this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
        const axis = this._isVerticalSide(side) ? "left" : "top";
        const sizeProperty = this._isVerticalSide(side) ? "width" : "height";
        const $target = $(this._positionController._position.of);
        const targetOffset = positionUtils.offset($target) || {
            top: 0,
            left: 0
        };
        const contentOffset = positionUtils.offset(this.$overlayContent());
        const arrowSize = arrowRect[sizeProperty];
        const contentLocation = contentOffset[axis];
        const contentSize = getBoundingRect(this.$overlayContent().get(0))[sizeProperty];
        const targetLocation = targetOffset[axis];
        const targetElement = $target.get(0);
        const targetSize = targetElement && !targetElement.preventDefault ? getBoundingRect(targetElement)[sizeProperty] : 0;
        const min = Math.max(contentLocation, targetLocation);
        const max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
        let arrowLocation;
        if ("start" === this.option("arrowPosition")) {
            arrowLocation = min - contentLocation
        } else if ("end" === this.option("arrowPosition")) {
            arrowLocation = max - contentLocation - arrowSize
        } else {
            arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2
        }
        const borderWidth = this._positionController._getContentBorderWidth(side);
        const finalArrowLocation = fitIntoRange(arrowLocation - borderWidth + this.option("arrowOffset"), borderWidth, contentSize - arrowSize - 2 * borderWidth);
        this._$arrow.css(axis, finalArrowLocation)
    },
    _isPopoverInside: function() {
        return this._positionController._isPopoverInside()
    },
    _setContentHeight: function(fullUpdate) {
        if (fullUpdate) {
            this.callBase()
        }
    },
    _getPositionControllerConfig() {
        const {
            shading: shading,
            target: target
        } = this.option();
        return extend({}, this.callBase(), {
            target: target,
            shading: shading,
            $arrow: this._$arrow
        })
    },
    _initPositionController() {
        this._positionController = new PopoverPositionController(this._getPositionControllerConfig())
    },
    _renderWrapperDimensions: function() {
        if (this.option("shading")) {
            this.$wrapper().css({
                width: "100%",
                height: "100%"
            })
        }
    },
    _isVerticalSide: function(side) {
        return this._positionController._isVerticalSide(side)
    },
    _isHorizontalSide: function(side) {
        return this._positionController._isHorizontalSide(side)
    },
    _clearEventTimeout: function(name) {
        clearTimeout(this._timeouts[name])
    },
    _clearEventsTimeouts: function() {
        this._clearEventTimeout("show");
        this._clearEventTimeout("hide")
    },
    _clean: function() {
        this._detachEvents(this.option("target"));
        this.callBase.apply(this, arguments)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "arrowPosition":
            case "arrowOffset":
                this._renderGeometry();
                break;
            case "fullScreen":
                if (args.value) {
                    this.option("fullScreen", false)
                }
                break;
            case "target":
                args.previousValue && this._detachEvents(args.previousValue);
                this._positionController.updateTarget(args.value);
                this._invalidate();
                break;
            case "showEvent":
            case "hideEvent": {
                const name = args.name.substring(0, 4);
                const event = getEventNameByOption(args.previousValue);
                this.hide();
                detachEvent(this, this.option("target"), name, event);
                attachEvent(this, name);
                break
            }
            case "visible":
                this._clearEventTimeout(args.value ? "show" : "hide");
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    show: function(target) {
        if (target) {
            this.option("target", target)
        }
        return this.callBase()
    }
});
registerComponent("dxPopover", Popover);
export default Popover;
