/**
 * DevExtreme (esm/__internal/ui/m_resizable.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    locate,
    move
} from "../../animation/translator";
import registerComponent from "../../core/component_registrator";
import DOMComponent from "../../core/dom_component";
import $ from "../../core/renderer";
import {
    pairToObject
} from "../../core/utils/common";
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import {
    fitIntoRange,
    inRange
} from "../../core/utils/math";
import {
    getHeight,
    getInnerHeight,
    getInnerWidth,
    getOuterHeight,
    getOuterWidth,
    getWidth
} from "../../core/utils/size";
import {
    isFunction,
    isPlainObject,
    isWindow
} from "../../core/utils/type";
import {
    hasWindow
} from "../../core/utils/window";
import eventsEngine from "../../events/core/events_engine";
import {
    end as dragEventEnd,
    move as dragEventMove,
    start as dragEventStart
} from "../../events/drag";
import {
    addNamespace
} from "../../events/utils/index";
import {
    triggerResizeEvent
} from "../../events/visibility_change";
const RESIZABLE = "dxResizable";
const RESIZABLE_CLASS = "dx-resizable";
const RESIZABLE_RESIZING_CLASS = "dx-resizable-resizing";
const RESIZABLE_HANDLE_CLASS = "dx-resizable-handle";
const RESIZABLE_HANDLE_TOP_CLASS = "dx-resizable-handle-top";
const RESIZABLE_HANDLE_BOTTOM_CLASS = "dx-resizable-handle-bottom";
const RESIZABLE_HANDLE_LEFT_CLASS = "dx-resizable-handle-left";
const RESIZABLE_HANDLE_RIGHT_CLASS = "dx-resizable-handle-right";
const RESIZABLE_HANDLE_CORNER_CLASS = "dx-resizable-handle-corner";
const DRAGSTART_START_EVENT_NAME = addNamespace(dragEventStart, RESIZABLE);
const DRAGSTART_EVENT_NAME = addNamespace(dragEventMove, RESIZABLE);
const DRAGSTART_END_EVENT_NAME = addNamespace(dragEventEnd, RESIZABLE);
const SIDE_BORDER_WIDTH_STYLES = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};
const Resizable = DOMComponent.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            handles: "all",
            step: "1",
            stepPrecision: "simple",
            area: void 0,
            minWidth: 30,
            maxWidth: 1 / 0,
            minHeight: 30,
            maxHeight: 1 / 0,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            roundStepValue: true,
            keepAspectRatio: true
        })
    },
    _init() {
        this.callBase();
        this.$element().addClass("dx-resizable")
    },
    _initMarkup() {
        this.callBase();
        this._renderHandles()
    },
    _render() {
        this.callBase();
        this._renderActions()
    },
    _renderActions() {
        this._resizeStartAction = this._createActionByOption("onResizeStart");
        this._resizeEndAction = this._createActionByOption("onResizeEnd");
        this._resizeAction = this._createActionByOption("onResize")
    },
    _renderHandles() {
        this._handles = [];
        const handles = this.option("handles");
        if ("none" === handles || !handles) {
            return
        }
        const directions = "all" === handles ? ["top", "bottom", "left", "right"] : handles.split(" ");
        const activeHandlesMap = {};
        each(directions, ((index, handleName) => {
            activeHandlesMap[handleName] = true;
            this._renderHandle(handleName)
        }));
        activeHandlesMap.bottom && activeHandlesMap.right && this._renderHandle("corner-bottom-right");
        activeHandlesMap.bottom && activeHandlesMap.left && this._renderHandle("corner-bottom-left");
        activeHandlesMap.top && activeHandlesMap.right && this._renderHandle("corner-top-right");
        activeHandlesMap.top && activeHandlesMap.left && this._renderHandle("corner-top-left");
        this._attachEventHandlers()
    },
    _renderHandle(handleName) {
        const $handle = $("<div>").addClass("dx-resizable-handle").addClass(`dx-resizable-handle-${handleName}`).appendTo(this.$element());
        this._handles.push($handle)
    },
    _attachEventHandlers() {
        if (this.option("disabled")) {
            return
        }
        const handlers = {};
        handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
        handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
        handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
        this._handles.forEach((handleElement => {
            eventsEngine.on(handleElement, handlers, {
                direction: "both",
                immediate: true
            })
        }))
    },
    _detachEventHandlers() {
        this._handles.forEach((handleElement => {
            eventsEngine.off(handleElement)
        }))
    },
    _toggleEventHandlers(shouldAttachEvents) {
        shouldAttachEvents ? this._attachEventHandlers() : this._detachEventHandlers()
    },
    _getElementSize() {
        const $element = this.$element();
        return "border-box" === $element.css("boxSizing") ? {
            width: getOuterWidth($element),
            height: getOuterHeight($element)
        } : {
            width: getWidth($element),
            height: getHeight($element)
        }
    },
    _dragStartHandler(e) {
        const $element = this.$element();
        if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
            e.cancel = true;
            return
        }
        this._toggleResizingClass(true);
        this._movingSides = this._getMovingSides(e);
        this._elementLocation = locate($element);
        this._elementSize = this._getElementSize();
        this._renderDragOffsets(e);
        this._resizeStartAction({
            event: e,
            width: this._elementSize.width,
            height: this._elementSize.height,
            handles: this._movingSides
        });
        e.targetElements = null
    },
    _toggleResizingClass(value) {
        this.$element().toggleClass("dx-resizable-resizing", value)
    },
    _renderDragOffsets(e) {
        const area = this._getArea();
        if (!area) {
            return
        }
        const $handle = $(e.target).closest(".dx-resizable-handle");
        const handleWidth = getOuterWidth($handle);
        const handleHeight = getOuterHeight($handle);
        const handleOffset = $handle.offset();
        const areaOffset = area.offset;
        const scrollOffset = this._getAreaScrollOffset();
        e.maxLeftOffset = this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
        e.maxRightOffset = this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
        e.maxTopOffset = this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
        e.maxBottomOffset = this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY
    },
    _getBorderWidth($element, direction) {
        if (isWindow($element.get(0))) {
            return 0
        }
        const borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
        return parseInt(borderWidth) || 0
    },
    _proportionate(direction, value) {
        const size = this._elementSize;
        const factor = "x" === direction ? size.width / size.height : size.height / size.width;
        return value * factor
    },
    _getProportionalDelta(_ref) {
        let {
            x: x,
            y: y
        } = _ref;
        const proportionalY = this._proportionate("y", x);
        if (proportionalY >= y) {
            return {
                x: x,
                y: proportionalY
            }
        }
        const proportionalX = this._proportionate("x", y);
        if (proportionalX >= x) {
            return {
                x: proportionalX,
                y: y
            }
        }
        return {
            x: 0,
            y: 0
        }
    },
    _getDirectionName(axis) {
        const sides = this._movingSides;
        if ("x" === axis) {
            return sides.left ? "left" : "right"
        }
        return sides.top ? "top" : "bottom"
    },
    _fitIntoArea(axis, value) {
        const directionName = this._getDirectionName(axis);
        return Math.min(value, this[`_${directionName}MaxOffset`] ?? 1 / 0)
    },
    _fitDeltaProportionally(delta) {
        let fittedDelta = _extends({}, delta);
        const size = this._elementSize;
        const {
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight
        } = this.option();
        const getWidth = () => size.width + fittedDelta.x;
        const getHeight = () => size.height + fittedDelta.y;
        const isInArea = axis => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
        const isFittedX = () => inRange(getWidth(), minWidth, maxWidth) && isInArea("x");
        const isFittedY = () => inRange(getHeight(), minHeight, maxHeight) && isInArea("y");
        if (!isFittedX()) {
            const x = this._fitIntoArea("x", fitIntoRange(getWidth(), minWidth, maxWidth) - size.width);
            fittedDelta = {
                x: x,
                y: this._proportionate("y", x)
            }
        }
        if (!isFittedY()) {
            const y = this._fitIntoArea("y", fitIntoRange(getHeight(), minHeight, maxHeight) - size.height);
            fittedDelta = {
                x: this._proportionate("x", y),
                y: y
            }
        }
        return isFittedX() && isFittedY() ? fittedDelta : {
            x: 0,
            y: 0
        }
    },
    _fitDelta(_ref2) {
        let {
            x: x,
            y: y
        } = _ref2;
        const size = this._elementSize;
        const {
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight
        } = this.option();
        return {
            x: fitIntoRange(size.width + x, minWidth, maxWidth) - size.width,
            y: fitIntoRange(size.height + y, minHeight, maxHeight) - size.height
        }
    },
    _getDeltaByOffset(offset) {
        const sides = this._movingSides;
        const shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option("keepAspectRatio");
        let delta = {
            x: offset.x * (sides.left ? -1 : 1),
            y: offset.y * (sides.top ? -1 : 1)
        };
        if (shouldKeepAspectRatio) {
            const proportionalDelta = this._getProportionalDelta(delta);
            const fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
            delta = fittedProportionalDelta
        } else {
            const fittedDelta = this._fitDelta(delta);
            const roundedFittedDelta = this._roundByStep(fittedDelta);
            delta = roundedFittedDelta
        }
        return delta
    },
    _updatePosition(delta, _ref3) {
        let {
            width: width,
            height: height
        } = _ref3;
        const location = this._elementLocation;
        const sides = this._movingSides;
        const $element = this.$element();
        const elementRect = this._getElementSize();
        const offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
        const offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
        move($element, {
            top: location.top + (sides.top ? offsetTop : 0),
            left: location.left + (sides.left ? offsetLeft : 0)
        })
    },
    _dragHandler(e) {
        const offset = this._getOffset(e);
        const delta = this._getDeltaByOffset(offset);
        const dimensions = this._updateDimensions(delta);
        this._updatePosition(delta, dimensions);
        this._triggerResizeAction(e, dimensions)
    },
    _updateDimensions(delta) {
        const isAbsoluteSize = size => "px" === size.substring(size.length - 2);
        const isStepPrecisionStrict = "strict" === this.option("stepPrecision");
        const size = this._elementSize;
        const width = size.width + delta.x;
        const height = size.height + delta.y;
        const elementStyle = this.$element().get(0).style;
        const shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
        const shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
        if (shouldRenderWidth) {
            this.option({
                width: width
            })
        }
        if (shouldRenderHeight) {
            this.option({
                height: height
            })
        }
        return {
            width: shouldRenderWidth ? width : size.width,
            height: shouldRenderHeight ? height : size.height
        }
    },
    _triggerResizeAction(e, _ref4) {
        let {
            width: width,
            height: height
        } = _ref4;
        this._resizeAction({
            event: e,
            width: this.option("width") || width,
            height: this.option("height") || height,
            handles: this._movingSides
        });
        triggerResizeEvent(this.$element())
    },
    _isCornerHandler: sides => 0 === Object.values(sides).reduce(((xor, value) => xor ^ value), 0),
    _getOffset(e) {
        const {
            offset: offset
        } = e;
        const sides = this._movingSides;
        if (!sides.left && !sides.right) {
            offset.x = 0
        }
        if (!sides.top && !sides.bottom) {
            offset.y = 0
        }
        return offset
    },
    _roundByStep(delta) {
        return "strict" === this.option("stepPrecision") ? this._roundStrict(delta) : this._roundNotStrict(delta)
    },
    _getSteps() {
        return pairToObject(this.option("step"), !this.option("roundStepValue"))
    },
    _roundNotStrict(delta) {
        const steps = this._getSteps();
        return {
            x: delta.x - delta.x % steps.h,
            y: delta.y - delta.y % steps.v
        }
    },
    _roundStrict(delta) {
        const sides = this._movingSides;
        const offset = {
            x: delta.x * (sides.left ? -1 : 1),
            y: delta.y * (sides.top ? -1 : 1)
        };
        const steps = this._getSteps();
        const location = this._elementLocation;
        const size = this._elementSize;
        const xPos = sides.left ? location.left : location.left + size.width;
        const yPos = sides.top ? location.top : location.top + size.height;
        const newXShift = (xPos + offset.x) % steps.h;
        const newYShift = (yPos + offset.y) % steps.v;
        const sign = Math.sign || (x => {
            x = +x;
            if (0 === x || isNaN(x)) {
                return x
            }
            return x > 0 ? 1 : -1
        });
        const separatorOffset = (steps, offset) => (1 + .2 * sign(offset)) % 1 * steps;
        const isSmallOffset = (offset, steps) => Math.abs(offset) < .2 * steps;
        let newOffsetX = offset.x - newXShift;
        let newOffsetY = offset.y - newYShift;
        if (newXShift > separatorOffset(steps.h, offset.x)) {
            newOffsetX += steps.h
        }
        if (newYShift > separatorOffset(steps.v, offset.y)) {
            newOffsetY += steps.v
        }
        const roundedOffset_x = (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
            roundedOffset_y = (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0;
        return {
            x: roundedOffset_x * (sides.left ? -1 : 1),
            y: roundedOffset_y * (sides.top ? -1 : 1)
        }
    },
    _getMovingSides(e) {
        const $target = $(e.target);
        const hasCornerTopLeftClass = $target.hasClass("dx-resizable-handle-corner-top-left");
        const hasCornerTopRightClass = $target.hasClass("dx-resizable-handle-corner-top-right");
        const hasCornerBottomLeftClass = $target.hasClass("dx-resizable-handle-corner-bottom-left");
        const hasCornerBottomRightClass = $target.hasClass("dx-resizable-handle-corner-bottom-right");
        return {
            top: $target.hasClass("dx-resizable-handle-top") || hasCornerTopLeftClass || hasCornerTopRightClass,
            left: $target.hasClass("dx-resizable-handle-left") || hasCornerTopLeftClass || hasCornerBottomLeftClass,
            bottom: $target.hasClass("dx-resizable-handle-bottom") || hasCornerBottomLeftClass || hasCornerBottomRightClass,
            right: $target.hasClass("dx-resizable-handle-right") || hasCornerTopRightClass || hasCornerBottomRightClass
        }
    },
    _getArea() {
        let area = this.option("area");
        if (isFunction(area)) {
            area = area.call(this)
        }
        if (isPlainObject(area)) {
            return this._getAreaFromObject(area)
        }
        return this._getAreaFromElement(area)
    },
    _getAreaScrollOffset() {
        const area = this.option("area");
        const isElement = !isFunction(area) && !isPlainObject(area);
        const scrollOffset = {
            scrollY: 0,
            scrollX: 0
        };
        if (isElement) {
            const areaElement = $(area)[0];
            if (isWindow(areaElement)) {
                scrollOffset.scrollX = areaElement.pageXOffset;
                scrollOffset.scrollY = areaElement.pageYOffset
            }
        }
        return scrollOffset
    },
    _getAreaFromObject(area) {
        const result = {
            width: area.right - area.left,
            height: area.bottom - area.top,
            offset: {
                left: area.left,
                top: area.top
            }
        };
        this._correctAreaGeometry(result);
        return result
    },
    _getAreaFromElement(area) {
        const $area = $(area);
        let result;
        if ($area.length) {
            result = {
                width: getInnerWidth($area),
                height: getInnerHeight($area),
                offset: extend({
                    top: 0,
                    left: 0
                }, isWindow($area[0]) ? {} : $area.offset())
            };
            this._correctAreaGeometry(result, $area)
        }
        return result
    },
    _correctAreaGeometry(result, $area) {
        const areaBorderLeft = $area ? this._getBorderWidth($area, "left") : 0;
        const areaBorderTop = $area ? this._getBorderWidth($area, "top") : 0;
        result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), "left");
        result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), "top");
        result.width -= getOuterWidth(this.$element()) - getInnerWidth(this.$element());
        result.height -= getOuterHeight(this.$element()) - getInnerHeight(this.$element())
    },
    _dragEndHandler(e) {
        const $element = this.$element();
        this._resizeEndAction({
            event: e,
            width: getOuterWidth($element),
            height: getOuterHeight($element),
            handles: this._movingSides
        });
        this._toggleResizingClass(false)
    },
    _renderWidth(width) {
        this.option("width", fitIntoRange(width, this.option("minWidth"), this.option("maxWidth")))
    },
    _renderHeight(height) {
        this.option("height", fitIntoRange(height, this.option("minHeight"), this.option("maxHeight")))
    },
    _optionChanged(args) {
        switch (args.name) {
            case "disabled":
                this._toggleEventHandlers(!args.value);
                this.callBase(args);
                break;
            case "handles":
                this._invalidate();
                break;
            case "minWidth":
            case "maxWidth":
                hasWindow() && this._renderWidth(getOuterWidth(this.$element()));
                break;
            case "minHeight":
            case "maxHeight":
                hasWindow() && this._renderHeight(getOuterHeight(this.$element()));
                break;
            case "onResize":
            case "onResizeStart":
            case "onResizeEnd":
                this._renderActions();
                break;
            case "area":
            case "stepPrecision":
            case "step":
            case "roundStepValue":
            case "keepAspectRatio":
                break;
            default:
                this.callBase(args)
        }
    },
    _clean() {
        this.$element().find(".dx-resizable-handle").remove()
    },
    _useTemplates: () => false
});
registerComponent(RESIZABLE, Resizable);
export default Resizable;
