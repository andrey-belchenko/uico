/**
 * DevExtreme (esm/ui/validation_message.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getOuterWidth
} from "../core/utils/size";
import $ from "../core/renderer";
import registerComponent from "../core/component_registrator";
import Overlay from "./overlay/ui.overlay";
import {
    extend
} from "../core/utils/extend";
import {
    encodeHtml
} from "../core/utils/string";
import {
    getDefaultAlignment
} from "../core/utils/position";
const INVALID_MESSAGE = "dx-invalid-message";
const INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
const INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
const INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
const VALIDATION_MESSAGE_MIN_WIDTH = 100;
const ValidationMessage = Overlay.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            integrationOptions: {},
            templatesRenderAsynchronously: false,
            shading: false,
            width: "auto",
            height: "auto",
            hideOnOutsideClick: false,
            animation: null,
            visible: true,
            propagateOutsideClick: true,
            _checkParentVisibility: false,
            rtlEnabled: false,
            contentTemplate: this._renderInnerHtml,
            maxWidth: "100%",
            container: this.$element(),
            target: void 0,
            mode: "auto",
            validationErrors: void 0,
            preventScrollEvents: false,
            positionSide: "top",
            boundary: void 0,
            offset: {
                h: 0,
                v: 0
            },
            contentId: void 0
        })
    },
    _init() {
        this.callBase();
        this.updateMaxWidth();
        this._updatePosition()
    },
    _initMarkup() {
        this.callBase();
        this._ensureMessageNotEmpty();
        this._updatePositionByTarget();
        this._toggleModeClass();
        this._updateContentId()
    },
    _updatePositionByTarget: function() {
        const {
            target: target
        } = this.option();
        this.option("position.of", target)
    },
    _ensureMessageNotEmpty: function() {
        this._textMarkup = this._getTextMarkup();
        const shouldShowMessage = this.option("visible") && this._textMarkup;
        this._toggleVisibilityClasses(shouldShowMessage)
    },
    _toggleVisibilityClasses: function(visible) {
        if (visible) {
            this.$element().addClass(INVALID_MESSAGE);
            this.$wrapper().addClass(INVALID_MESSAGE)
        } else {
            this.$element().removeClass(INVALID_MESSAGE);
            this.$wrapper().removeClass(INVALID_MESSAGE)
        }
    },
    _updateContentId() {
        const {
            container: container,
            contentId: contentId
        } = this.option();
        const id = contentId ?? $(container).attr("aria-describedby");
        this.$content().addClass(INVALID_MESSAGE_CONTENT).attr("id", id)
    },
    _renderInnerHtml(element) {
        const $element = element && $(element);
        null === $element || void 0 === $element || $element.html(this._textMarkup)
    },
    _getTextMarkup() {
        const validationErrors = this.option("validationErrors") ?? [];
        let validationErrorMessage = "";
        validationErrors.forEach((err => {
            const separator = validationErrorMessage ? "<br />" : "";
            validationErrorMessage += separator + encodeHtml((null === err || void 0 === err ? void 0 : err.message) ?? "")
        }));
        return validationErrorMessage
    },
    _toggleModeClass() {
        const mode = this.option("mode");
        this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode)
    },
    updateMaxWidth() {
        const target = this.option("target");
        const targetWidth = getOuterWidth(target);
        let maxWidth = "100%";
        if (targetWidth) {
            maxWidth = Math.max(targetWidth, 100)
        }
        this.option({
            maxWidth: maxWidth
        })
    },
    _getPositionsArray: function(positionSide, rtlSide) {
        switch (positionSide) {
            case "top":
                return [`${rtlSide} bottom`, `${rtlSide} top`];
            case "left":
                return ["right", "left"];
            case "right":
                return ["left", "right"];
            default:
                return [`${rtlSide} top`, `${rtlSide} bottom`]
        }
    },
    _updatePosition: function() {
        const {
            positionSide: positionSide,
            rtlEnabled: rtlEnabled,
            offset: componentOffset,
            boundary: boundary
        } = this.option();
        const rtlSide = getDefaultAlignment(rtlEnabled);
        const positions = this._getPositionsArray(positionSide, rtlSide);
        const offset = Object.assign({}, componentOffset);
        this.$element().addClass(`dx-invalid-message-${positionSide}`);
        if (rtlEnabled && "left" !== positionSide && "right" !== positionSide) {
            offset.h = -offset.h
        }
        if ("top" === positionSide) {
            offset.v = -offset.v
        }
        if ("left" === positionSide) {
            offset.h = -offset.h
        }
        this.option("position", {
            offset: offset,
            boundary: boundary,
            my: positions[0],
            at: positions[1],
            collision: "none flip"
        })
    },
    _optionChanged(args) {
        const {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "target":
                this._updatePositionByTarget();
                this.updateMaxWidth();
                this.callBase(args);
                break;
            case "boundary":
                this.option("position.boundary", value);
                break;
            case "mode":
                this._toggleModeClass(value);
                break;
            case "rtlEnabled":
            case "offset":
            case "positionSide":
                this.$element().removeClass(`dx-invalid-message-${previousValue}`);
                this._updatePosition();
                break;
            case "container":
                this._updateContentId();
                this.callBase(args);
                break;
            case "contentId":
                this._updateContentId();
                break;
            case "validationErrors":
                this._ensureMessageNotEmpty();
                this._renderInnerHtml(this.$content());
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxValidationMessage", ValidationMessage);
export default ValidationMessage;
