/**
 * DevExtreme (cjs/ui/popup/popup_drag.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _translator = require("../../animation/translator");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _size = require("../../core/utils/size");
var _math = require("../../core/utils/math");
var _type = require("../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _drag = require("../../events/drag");
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const KEYBOARD_DRAG_STEP = 5;
class PopupDrag {
    constructor(config) {
        this.init(config)
    }
    init(_ref) {
        let {
            dragEnabled: dragEnabled,
            handle: handle,
            draggableElement: draggableElement,
            positionController: positionController
        } = _ref;
        this._positionController = positionController;
        this._draggableElement = draggableElement;
        this._handle = handle;
        this._dragEnabled = dragEnabled;
        this.unsubscribe();
        if (!dragEnabled) {
            return
        }
        this.subscribe()
    }
    moveDown(e) {
        this._moveTo(5, 0, e)
    }
    moveUp(e) {
        this._moveTo(-5, 0, e)
    }
    moveLeft(e) {
        this._moveTo(0, -5, e)
    }
    moveRight(e) {
        this._moveTo(0, 5, e)
    }
    subscribe() {
        const eventNames = this._getEventNames();
        _events_engine.default.on(this._handle, eventNames.startEventName, (e => {
            this._dragStartHandler(e)
        }));
        _events_engine.default.on(this._handle, eventNames.updateEventName, (e => {
            this._dragUpdateHandler(e)
        }));
        _events_engine.default.on(this._handle, eventNames.endEventName, (e => {
            this._dragEndHandler(e)
        }))
    }
    unsubscribe() {
        const eventNames = this._getEventNames();
        _events_engine.default.off(this._handle, eventNames.startEventName);
        _events_engine.default.off(this._handle, eventNames.updateEventName);
        _events_engine.default.off(this._handle, eventNames.endEventName)
    }
    _getEventNames() {
        const startEventName = (0, _index.addNamespace)(_drag.start, "overlayDrag");
        const updateEventName = (0, _index.addNamespace)(_drag.move, "overlayDrag");
        const endEventName = (0, _index.addNamespace)(_drag.end, "overlayDrag");
        return {
            startEventName: startEventName,
            updateEventName: updateEventName,
            endEventName: endEventName
        }
    }
    _dragStartHandler(e) {
        const allowedOffsets = this._getAllowedOffsets();
        this._prevOffset = {
            x: 0,
            y: 0
        };
        e.targetElements = [];
        e.maxTopOffset = allowedOffsets.top;
        e.maxBottomOffset = allowedOffsets.bottom;
        e.maxLeftOffset = allowedOffsets.left;
        e.maxRightOffset = allowedOffsets.right
    }
    _dragUpdateHandler(e) {
        const targetOffset = {
            top: e.offset.y - this._prevOffset.y,
            left: e.offset.x - this._prevOffset.x
        };
        this._moveByOffset(targetOffset);
        this._prevOffset = e.offset
    }
    _dragEndHandler(event) {
        this._positionController.dragHandled();
        this._positionController.detectVisualPositionChange(event)
    }
    _moveTo(top, left, e) {
        if (!this._dragEnabled) {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        const offset = this._fitOffsetIntoAllowedRange(top, left);
        this._moveByOffset(offset);
        this._dragEndHandler(e)
    }
    _fitOffsetIntoAllowedRange(top, left) {
        const allowedOffsets = this._getAllowedOffsets();
        return {
            top: (0, _math.fitIntoRange)(top, -allowedOffsets.top, allowedOffsets.bottom),
            left: (0, _math.fitIntoRange)(left, -allowedOffsets.left, allowedOffsets.right)
        }
    }
    _getContainerDimensions() {
        const document = _dom_adapter.default.getDocument();
        const container = this._positionController.$dragResizeContainer.get(0);
        let containerWidth = (0, _size.getOuterWidth)(container);
        let containerHeight = (0, _size.getOuterHeight)(container);
        if ((0, _type.isWindow)(container)) {
            containerHeight = Math.max(document.body.clientHeight, containerHeight);
            containerWidth = Math.max(document.body.clientWidth, containerWidth)
        }
        return {
            width: containerWidth,
            height: containerHeight
        }
    }
    _getContainerPosition() {
        const container = this._positionController.$dragResizeContainer.get(0);
        return (0, _type.isWindow)(container) ? {
            top: 0,
            left: 0
        } : (0, _size.getOffset)(container)
    }
    _getElementPosition() {
        return (0, _size.getOffset)(this._draggableElement)
    }
    _getInnerDelta() {
        const containerDimensions = this._getContainerDimensions();
        const elementDimensions = this._getElementDimensions();
        return {
            x: containerDimensions.width - elementDimensions.width,
            y: containerDimensions.height - elementDimensions.height
        }
    }
    _getOuterDelta() {
        const {
            width: width,
            height: height
        } = this._getElementDimensions();
        const outsideDragFactor = this._positionController.outsideDragFactor;
        return {
            x: width * outsideDragFactor,
            y: height * outsideDragFactor
        }
    }
    _getFullDelta() {
        const fullDelta = this._getInnerDelta();
        const outerDelta = this._getOuterDelta();
        return {
            x: fullDelta.x + outerDelta.x,
            y: fullDelta.y + outerDelta.y
        }
    }
    _getElementDimensions() {
        return {
            width: this._draggableElement.offsetWidth,
            height: this._draggableElement.offsetHeight
        }
    }
    _getAllowedOffsets() {
        const fullDelta = this._getFullDelta();
        const isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
        if (!isDragAllowed) {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
        const elementPosition = this._getElementPosition();
        const containerPosition = this._getContainerPosition();
        const outerDelta = this._getOuterDelta();
        return {
            top: elementPosition.top - containerPosition.top + outerDelta.y,
            bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
            left: elementPosition.left - containerPosition.left + outerDelta.x,
            right: -elementPosition.left + containerPosition.left + fullDelta.x
        }
    }
    _moveByOffset(offset) {
        const currentPosition = (0, _translator.locate)(this._draggableElement);
        const newPosition = {
            left: currentPosition.left + offset.left,
            top: currentPosition.top + offset.top
        };
        (0, _translator.move)(this._draggableElement, newPosition)
    }
}
var _default = exports.default = PopupDrag;
module.exports = exports.default;
module.exports.default = exports.default;
