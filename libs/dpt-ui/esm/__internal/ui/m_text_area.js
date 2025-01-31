/**
 * DevExtreme (esm/__internal/ui/m_text_area.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../core/component_registrator";
import $ from "../../core/renderer";
import {
    ensureDefined,
    noop
} from "../../core/utils/common";
import {
    extend
} from "../../core/utils/extend";
import {
    getElementBoxParams,
    getOuterHeight,
    getVerticalOffsets,
    parseHeight
} from "../../core/utils/size";
import {
    isDefined
} from "../../core/utils/type";
import {
    getWindow,
    hasWindow
} from "../../core/utils/window";
import eventsEngine from "../../events/core/events_engine";
import scrollEvents from "../../events/gesture/emitter.gesture.scroll";
import pointerEvents from "../../events/pointer";
import {
    addNamespace,
    eventData
} from "../../events/utils/index";
import TextBox from "../../ui/text_box";
import {
    allowScroll,
    prepareScrollData
} from "../../ui/text_box/utils.scroll";
const TEXTAREA_CLASS = "dx-textarea";
const TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE = "dx-texteditor-input-auto-resize";
const TextArea = TextBox.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            spellcheck: true,
            minHeight: void 0,
            maxHeight: void 0,
            autoResizeEnabled: false
        })
    },
    _initMarkup() {
        this.$element().addClass("dx-textarea");
        this.callBase();
        this.setAria("multiline", "true")
    },
    _renderContentImpl() {
        this._updateInputHeight();
        this.callBase()
    },
    _renderInput() {
        this.callBase();
        this._renderScrollHandler()
    },
    _createInput() {
        const $input = $("<textarea>");
        this._applyInputAttributes($input, this.option("inputAttr"));
        this._updateInputAutoResizeAppearance($input);
        return $input
    },
    _setInputMinHeight: noop,
    _renderScrollHandler() {
        this._eventY = 0;
        const $input = this._input();
        const initScrollData = prepareScrollData($input, true);
        eventsEngine.on($input, addNamespace(scrollEvents.init, this.NAME), initScrollData, noop);
        eventsEngine.on($input, addNamespace(pointerEvents.down, this.NAME), this._pointerDownHandler.bind(this));
        eventsEngine.on($input, addNamespace(pointerEvents.move, this.NAME), this._pointerMoveHandler.bind(this))
    },
    _pointerDownHandler(e) {
        this._eventY = eventData(e).y
    },
    _pointerMoveHandler(e) {
        const currentEventY = eventData(e).y;
        const delta = this._eventY - currentEventY;
        if (allowScroll(this._input(), delta)) {
            e.isScrollingEvent = true;
            e.stopPropagation()
        }
        this._eventY = currentEventY
    },
    _renderDimensions() {
        const $element = this.$element();
        const element = $element.get(0);
        const width = this._getOptionValue("width", element);
        const height = this._getOptionValue("height", element);
        const minHeight = this.option("minHeight");
        const maxHeight = this.option("maxHeight");
        $element.css({
            minHeight: void 0 !== minHeight ? minHeight : "",
            maxHeight: void 0 !== maxHeight ? maxHeight : "",
            width: width,
            height: height
        })
    },
    _resetDimensions() {
        this.$element().css({
            height: "",
            minHeight: "",
            maxHeight: ""
        })
    },
    _renderEvents() {
        if (this.option("autoResizeEnabled")) {
            eventsEngine.on(this._input(), addNamespace("input paste", this.NAME), this._updateInputHeight.bind(this))
        }
        this.callBase()
    },
    _refreshEvents() {
        eventsEngine.off(this._input(), addNamespace("input paste", this.NAME));
        this.callBase()
    },
    _getHeightDifference($input) {
        return getVerticalOffsets(this._$element.get(0), false) + getVerticalOffsets(this._$textEditorContainer.get(0), false) + getVerticalOffsets(this._$textEditorInputContainer.get(0), true) + getElementBoxParams("height", getWindow().getComputedStyle($input.get(0))).margin
    },
    _updateInputHeight() {
        if (!hasWindow()) {
            return
        }
        const $input = this._input();
        const height = this.option("height");
        const autoHeightResizing = void 0 === height && this.option("autoResizeEnabled");
        const shouldCalculateInputHeight = autoHeightResizing || void 0 === height && this.option("minHeight");
        if (!shouldCalculateInputHeight) {
            $input.css("height", "");
            return
        }
        this._resetDimensions();
        this._$element.css("height", getOuterHeight(this._$element));
        $input.css("height", 0);
        const heightDifference = this._getHeightDifference($input);
        this._renderDimensions();
        const minHeight = this._getBoundaryHeight("minHeight");
        const maxHeight = this._getBoundaryHeight("maxHeight");
        let inputHeight = $input[0].scrollHeight;
        if (void 0 !== minHeight) {
            inputHeight = Math.max(inputHeight, minHeight - heightDifference)
        }
        if (void 0 !== maxHeight) {
            const adjustedMaxHeight = maxHeight - heightDifference;
            const needScroll = inputHeight > adjustedMaxHeight;
            inputHeight = Math.min(inputHeight, adjustedMaxHeight);
            this._updateInputAutoResizeAppearance($input, !needScroll)
        }
        $input.css("height", inputHeight);
        if (autoHeightResizing) {
            this._$element.css("height", "auto")
        }
    },
    _getBoundaryHeight(optionName) {
        const boundaryValue = this.option(optionName);
        if (isDefined(boundaryValue)) {
            return "number" === typeof boundaryValue ? boundaryValue : parseHeight(boundaryValue, this.$element().get(0).parentElement, this._$element.get(0))
        }
    },
    _renderInputType: noop,
    _visibilityChanged(visible) {
        if (visible) {
            this._updateInputHeight()
        }
    },
    _updateInputAutoResizeAppearance($input, isAutoResizeEnabled) {
        if ($input) {
            const autoResizeEnabled = ensureDefined(isAutoResizeEnabled, this.option("autoResizeEnabled"));
            $input.toggleClass("dx-texteditor-input-auto-resize", autoResizeEnabled)
        }
    },
    _dimensionChanged() {
        if (this.option("visible")) {
            this._updateInputHeight()
        }
    },
    _optionChanged(args) {
        switch (args.name) {
            case "autoResizeEnabled":
                this._updateInputAutoResizeAppearance(this._input(), args.value);
                this._refreshEvents();
                this._updateInputHeight();
                break;
            case "value":
            case "height":
                this.callBase(args);
                this._updateInputHeight();
                break;
            case "minHeight":
            case "maxHeight":
                this._renderDimensions();
                this._updateInputHeight();
                break;
            case "visible":
                this.callBase(args);
                args.value && this._updateInputHeight();
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxTextArea", TextArea);
export default TextArea;
