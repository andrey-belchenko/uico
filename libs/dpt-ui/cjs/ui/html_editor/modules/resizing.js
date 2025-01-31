/**
 * DevExtreme (cjs/ui/html_editor/modules/resizing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _click = require("../../../events/click");
var _index = require("../../../events/utils/index");
var _translator = require("../../../animation/translator");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _resizable = _interopRequireDefault(require("../../resizable"));
var _position = require("../../../core/utils/position");
var _dpt-uiQuill = _interopRequireDefault(require("dpt-ui-quill"));
var _base = _interopRequireDefault(require("./base"));
var _size = require("../../../core/utils/size");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DX_RESIZE_FRAME_CLASS = "dx-resize-frame";
const DX_TOUCH_DEVICE_CLASS = "dx-touch-device";
const MODULE_NAMESPACE = "dxHtmlResizingModule";
const KEYDOWN_EVENT = (0, _index.addNamespace)("keydown", MODULE_NAMESPACE);
const SCROLL_EVENT = (0, _index.addNamespace)("scroll", MODULE_NAMESPACE);
const MOUSEDOWN_EVENT = (0, _index.addNamespace)("mousedown", MODULE_NAMESPACE);
const FRAME_PADDING = 1;
class ResizingModule extends _base.default {
    constructor(quill, options) {
        super(quill, options);
        this.allowedTargets = options.allowedTargets || ["image"];
        this.enabled = !!options.enabled;
        this._hideFrameWithContext = this.hideFrame.bind(this);
        this._framePositionChangedHandler = this._prepareFramePositionChangedHandler();
        if (this.enabled) {
            this._attachEvents();
            this._createResizeFrame()
        }
    }
    _attachEvents() {
        _events_engine.default.on(this.quill.root, (0, _index.addNamespace)(_click.name, MODULE_NAMESPACE), this._clickHandler.bind(this));
        _events_engine.default.on(this.quill.root, SCROLL_EVENT, this._framePositionChangedHandler);
        this.editorInstance.on("focusOut", this._hideFrameWithContext);
        this.quill.on("text-change", this._framePositionChangedHandler)
    }
    _detachEvents() {
        _events_engine.default.off(this.quill.root, MODULE_NAMESPACE);
        this.editorInstance.off("focusOut", this._hideFrameWithContext);
        this.quill.off("text-change", this._framePositionChangedHandler)
    }
    _clickHandler(e) {
        if (this._isAllowedTarget(e.target)) {
            if (this._$target === e.target) {
                return
            }
            this._$target = e.target;
            const $target = (0, _renderer.default)(this._$target);
            const minWidth = Math.max((0, _size.getOuterWidth)($target) - (0, _size.getWidth)($target), this.resizable.option("minWidth"));
            const minHeight = Math.max((0, _size.getOuterHeight)($target) - (0, _size.getHeight)($target), this.resizable.option("minHeight"));
            this.resizable.option({
                minWidth: minWidth,
                minHeight: minHeight
            });
            this.updateFramePosition();
            this.showFrame();
            this._adjustSelection()
        } else if (this._$target) {
            this.hideFrame()
        }
    }
    _prepareFramePositionChangedHandler(e) {
        return () => {
            if (this._$target) {
                this.updateFramePosition()
            }
        }
    }
    _adjustSelection() {
        if (!this.quill.getSelection()) {
            this.quill.setSelection(0, 0)
        }
    }
    _isAllowedTarget(targetElement) {
        return this._isImage(targetElement)
    }
    _isImage(targetElement) {
        return -1 !== this.allowedTargets.indexOf("image") && "IMG" === targetElement.tagName.toUpperCase()
    }
    showFrame() {
        this._$resizeFrame.show();
        _events_engine.default.on(this.quill.root, KEYDOWN_EVENT, this._handleFrameKeyDown.bind(this))
    }
    _handleFrameKeyDown(e) {
        const keyName = (0, _index.normalizeKeyName)(e);
        if ("del" === keyName || "backspace" === keyName) {
            this._deleteImage()
        }
        this.hideFrame()
    }
    hideFrame() {
        this._$target = null;
        this._$resizeFrame.hide();
        _events_engine.default.off(this.quill.root, KEYDOWN_EVENT)
    }
    updateFramePosition() {
        const {
            height: height,
            width: width,
            top: targetTop,
            left: targetLeft
        } = (0, _position.getBoundingRect)(this._$target);
        const {
            top: containerTop,
            left: containerLeft
        } = (0, _position.getBoundingRect)(this.quill.root);
        const borderWidth = this._getBorderWidth();
        this._$resizeFrame.css({
            height: height,
            width: width,
            padding: 1,
            top: targetTop - containerTop - borderWidth - 1,
            left: targetLeft - containerLeft - borderWidth - 1
        });
        (0, _translator.move)(this._$resizeFrame, {
            left: 0,
            top: 0
        })
    }
    _getBorderWidth() {
        return parseInt(this._$resizeFrame.css("borderTopWidth"))
    }
    _createResizeFrame() {
        if (this._$resizeFrame) {
            return
        }
        const {
            deviceType: deviceType
        } = _devices.default.current();
        this._$resizeFrame = (0, _renderer.default)("<div>").addClass("dx-resize-frame").toggleClass("dx-touch-device", "desktop" !== deviceType).appendTo(this.editorInstance._getQuillContainer()).hide();
        _events_engine.default.on(this._$resizeFrame, MOUSEDOWN_EVENT, (e => {
            e.preventDefault()
        }));
        this.resizable = this.editorInstance._createComponent(this._$resizeFrame, _resizable.default, {
            onResize: e => {
                if (!this._$target) {
                    return
                }(0, _renderer.default)(this._$target).attr({
                    height: e.height,
                    width: e.width
                });
                this.updateFramePosition()
            }
        })
    }
    _deleteImage() {
        if (this._isAllowedTarget(this._$target)) {
            var _Quill$find;
            null === (_Quill$find = _dpt-uiQuill.default.find(this._$target)) || void 0 === _Quill$find || _Quill$find.deleteAt(0)
        }
    }
    option(option, value) {
        if ("mediaResizing" === option) {
            this.handleOptionChangeValue(value);
            return
        }
        if ("enabled" === option) {
            this.enabled = value;
            value ? this._attachEvents() : this._detachEvents()
        } else if ("allowedTargets" === option && Array.isArray(value)) {
            this.allowedTargets = value
        }
    }
    clean() {
        this._detachEvents();
        this._$resizeFrame.remove();
        this._$resizeFrame = void 0
    }
}
exports.default = ResizingModule;
module.exports = exports.default;
module.exports.default = exports.default;
