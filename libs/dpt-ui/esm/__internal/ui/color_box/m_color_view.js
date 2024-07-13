/**
 * DevExtreme (esm/__internal/ui/color_box/m_color_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    locate,
    move
} from "../../../animation/translator";
import Color from "../../../color";
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import Guid from "../../../core/guid";
import $ from "../../../core/renderer";
import {
    extend
} from "../../../core/utils/extend";
import {
    getHeight,
    getOuterHeight,
    getWidth
} from "../../../core/utils/size";
import {
    name as clickEventName
} from "../../../events/click";
import eventsEngine from "../../../events/core/events_engine";
import {
    isCommandKeyPressed
} from "../../../events/utils/index";
import messageLocalization from "../../../localization/message";
import Draggable from "../../../ui/draggable";
import Editor from "../../../ui/editor/editor";
import NumberBox from "../../../ui/number_box";
import TextBox from "../../../ui/text_box";
const COLOR_VIEW_CLASS = "dx-colorview";
const COLOR_VIEW_CONTAINER_CLASS = "dx-colorview-container";
const COLOR_VIEW_ROW_CLASS = "dx-colorview-container-row";
const COLOR_VIEW_CELL_CLASS = "dx-colorview-container-cell";
const COLOR_VIEW_PALETTE_CLASS = "dx-colorview-palette";
const COLOR_VIEW_PALETTE_CELL_CLASS = "dx-colorview-palette-cell";
const COLOR_VIEW_PALETTE_HANDLE_CLASS = "dx-colorview-palette-handle";
const COLOR_VIEW_PALETTE_GRADIENT_CLASS = "dx-colorview-palette-gradient";
const COLOR_VIEW_PALETTE_GRADIENT_WHITE_CLASS = "dx-colorview-palette-gradient-white";
const COLOR_VIEW_PALETTE_GRADIENT_BLACK_CLASS = "dx-colorview-palette-gradient-black";
const COLOR_VIEW_HUE_SCALE_CLASS = "dx-colorview-hue-scale";
const COLOR_VIEW_HUE_SCALE_CELL_CLASS = "dx-colorview-hue-scale-cell";
const COLOR_VIEW_HUE_SCALE_HANDLE_CLASS = "dx-colorview-hue-scale-handle";
const COLOR_VIEW_HUE_SCALE_WRAPPER_CLASS = "dx-colorview-hue-scale-wrapper";
const COLOR_VIEW_CONTROLS_CONTAINER_CLASS = "dx-colorview-controls-container";
const COLOR_VIEW_RED_LABEL_CLASS = "dx-colorview-label-red";
const COLOR_VIEW_GREEN_LABEL_CLASS = "dx-colorview-label-green";
const COLOR_VIEW_BLUE_LABEL_CLASS = "dx-colorview-label-blue";
const COLOR_VIEW_HEX_LABEL_CLASS = "dx-colorview-label-hex";
const COLOR_VIEW_ALPHA_CHANNEL_SCALE_CLASS = "dx-colorview-alpha-channel-scale";
const COLOR_VIEW_APLHA_CHANNEL_ROW_CLASS = "dx-colorview-alpha-channel-row";
const COLOR_VIEW_ALPHA_CHANNEL_SCALE_WRAPPER_CLASS = "dx-colorview-alpha-channel-wrapper";
const COLOR_VIEW_ALPHA_CHANNEL_LABEL_CLASS = "dx-colorview-alpha-channel-label";
const COLOR_VIEW_ALPHA_CHANNEL_HANDLE_CLASS = "dx-colorview-alpha-channel-handle";
const COLOR_VIEW_ALPHA_CHANNEL_CELL_CLASS = "dx-colorview-alpha-channel-cell";
const COLOR_VIEW_ALPHA_CHANNEL_BORDER_CLASS = "dx-colorview-alpha-channel-border";
const COLOR_VIEW_COLOR_PREVIEW = "dx-colorview-color-preview";
const COLOR_VIEW_COLOR_PREVIEW_CONTAINER_CLASS = "dx-colorview-color-preview-container";
const COLOR_VIEW_COLOR_PREVIEW_CONTAINER_INNER_CLASS = "dx-colorview-color-preview-container-inner";
const COLOR_VIEW_COLOR_PREVIEW_COLOR_CURRENT = "dx-colorview-color-preview-color-current";
const COLOR_VIEW_COLOR_PREVIEW_COLOR_NEW = "dx-colorview-color-preview-color-new";
const TEXT_EDITOR_INPUT = "dx-texteditor-input";
const BLACK_COLOR = "#000000";
const ColorView = Editor.inherit({
    _supportedKeys() {
        const isRTL = this.option("rtlEnabled");
        const that = this;
        const getHorizontalPaletteStep = function(e) {
            let step = 100 / that._paletteWidth;
            if (e.shiftKey) {
                step *= that.option("keyStep")
            }
            step = step > 1 ? step : 1;
            return Math.round(step)
        };
        const updateHorizontalPaletteValue = function(step) {
            let value = that._currentColor.hsv.s + step;
            if (value > 100) {
                value = 100
            } else if (value < 0) {
                value = 0
            }
            that._currentColor.hsv.s = value;
            updatePaletteValue()
        };
        const getVerticalPaletteStep = function(e) {
            let step = 100 / that._paletteHeight;
            if (e.shiftKey) {
                step *= that.option("keyStep")
            }
            step = step > 1 ? step : 1;
            return Math.round(step)
        };
        const updateVerticalPaletteValue = function(step) {
            let value = that._currentColor.hsv.v + step;
            if (value > 100) {
                value = 100
            } else if (value < 0) {
                value = 0
            }
            that._currentColor.hsv.v = value;
            updatePaletteValue()
        };

        function updatePaletteValue() {
            that._placePaletteHandle();
            that._updateColorFromHsv(that._currentColor.hsv.h, that._currentColor.hsv.s, that._currentColor.hsv.v)
        }
        const getHueScaleStep = function(e) {
            let step = 360 / (that._hueScaleWrapperHeight - that._hueScaleHandleHeight);
            if (e.shiftKey) {
                step *= that.option("keyStep")
            }
            step = step > 1 ? step : 1;
            return step
        };
        const updateHueScaleValue = function(step) {
            that._currentColor.hsv.h += step;
            that._placeHueScaleHandle();
            const handleLocation = locate(that._$hueScaleHandle);
            that._updateColorHue(handleLocation.top + that._hueScaleHandleHeight / 2)
        };
        const getAlphaScaleStep = function(e) {
            let step = 1 / that._alphaChannelScaleWorkWidth;
            if (e.shiftKey) {
                step *= that.option("keyStep")
            }
            step = step > .01 ? step : .01;
            step = isRTL ? -step : step;
            return step
        };
        const updateAlphaScaleValue = function(step) {
            that._currentColor.a += step;
            that._placeAlphaChannelHandle();
            const handleLocation = locate(that._$alphaChannelHandle);
            that._calculateColorTransparencyByScaleWidth(handleLocation.left + that._alphaChannelHandleWidth / 2)
        };
        return extend(this.callBase(), {
            upArrow(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isCommandKeyPressed(e)) {
                    if (this._currentColor.hsv.h <= 360 && !this._isTopColorHue) {
                        this._saveValueChangeEvent(e);
                        updateHueScaleValue(getHueScaleStep(e))
                    }
                } else if (this._currentColor.hsv.v < 100) {
                    this._saveValueChangeEvent(e);
                    updateVerticalPaletteValue(getVerticalPaletteStep(e))
                }
            },
            downArrow(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isCommandKeyPressed(e)) {
                    if (this._currentColor.hsv.h >= 0) {
                        if (this._isTopColorHue) {
                            this._currentColor.hsv.h = 360
                        }
                        this._saveValueChangeEvent(e);
                        updateHueScaleValue(-getHueScaleStep(e))
                    }
                } else if (this._currentColor.hsv.v > 0) {
                    this._saveValueChangeEvent(e);
                    updateVerticalPaletteValue(-getVerticalPaletteStep(e))
                }
            },
            rightArrow(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isCommandKeyPressed(e)) {
                    if (isRTL ? this._currentColor.a < 1 : this._currentColor.a > 0 && this.option("editAlphaChannel")) {
                        this._saveValueChangeEvent(e);
                        updateAlphaScaleValue(-getAlphaScaleStep(e))
                    }
                } else if (this._currentColor.hsv.s < 100) {
                    this._saveValueChangeEvent(e);
                    updateHorizontalPaletteValue(getHorizontalPaletteStep(e))
                }
            },
            leftArrow(e) {
                e.preventDefault();
                e.stopPropagation();
                if (isCommandKeyPressed(e)) {
                    if (isRTL ? this._currentColor.a > 0 : this._currentColor.a < 1 && this.option("editAlphaChannel")) {
                        this._saveValueChangeEvent(e);
                        updateAlphaScaleValue(getAlphaScaleStep(e))
                    }
                } else if (this._currentColor.hsv.s > 0) {
                    this._saveValueChangeEvent(e);
                    updateHorizontalPaletteValue(-getHorizontalPaletteStep(e))
                }
            },
            enter(e) {
                this._fireEnterKeyPressed(e)
            }
        })
    },
    _getDefaultOptions() {
        return extend(this.callBase(), {
            value: null,
            matchValue: null,
            onEnterKeyPressed: void 0,
            editAlphaChannel: false,
            keyStep: 1,
            stylingMode: void 0
        })
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _init() {
        this.callBase();
        this._initColorAndOpacity();
        this._initEnterKeyPressedAction()
    },
    _initEnterKeyPressedAction() {
        this._onEnterKeyPressedAction = this._createActionByOption("onEnterKeyPressed")
    },
    _fireEnterKeyPressed(e) {
        if (!this._onEnterKeyPressedAction) {
            return
        }
        this._onEnterKeyPressedAction({
            event: e
        })
    },
    _initColorAndOpacity() {
        this._setCurrentColor(this.option("value"))
    },
    _setCurrentColor(value) {
        value = value || "#000000";
        const newColor = new Color(value);
        if (!newColor.colorIsInvalid) {
            if (!this._currentColor || this._makeRgba(this._currentColor) !== this._makeRgba(newColor)) {
                this._currentColor = newColor;
                if (this._$currentColor) {
                    this._makeTransparentBackground(this._$currentColor, newColor)
                }
            }
        } else {
            if (!this._currentColor) {
                this._currentColor = new Color("#000000")
            }
            this.option("value", this._currentColor.baseColor)
        }
    },
    _setBaseColor(value) {
        const color = value || "#000000";
        const newColor = new Color(color);
        if (!newColor.colorIsInvalid) {
            const isBaseColorChanged = this._makeRgba(this.option("matchValue") !== this._makeRgba(newColor));
            if (isBaseColorChanged) {
                if (this._$baseColor) {
                    this._makeTransparentBackground(this._$baseColor, newColor)
                }
            }
        }
    },
    _initMarkup() {
        this.callBase();
        this.$element().addClass("dx-colorview");
        this._renderColorPickerContainer()
    },
    _render() {
        this.callBase();
        this._renderPalette();
        this._renderHueScale();
        this._renderControlsContainer();
        this._renderControls();
        this._renderAlphaChannelElements()
    },
    _makeTransparentBackground($el, color) {
        if (!(color instanceof Color)) {
            color = new Color(color)
        }
        $el.css("backgroundColor", this._makeRgba(color))
    },
    _makeRgba(color) {
        if (!(color instanceof Color)) {
            color = new Color(color)
        }
        return `rgba(${[color.r,color.g,color.b,color.a].join(", ")})`
    },
    _renderValue() {
        this.callBase(this.option("editAlphaChannel") ? this._makeRgba(this._currentColor) : this.option("value"))
    },
    _renderColorPickerContainer() {
        const $parent = this.$element();
        this._$colorPickerContainer = $("<div>").addClass("dx-colorview-container").appendTo($parent);
        this._renderHtmlRows()
    },
    _renderHtmlRows(updatedOption) {
        const $renderedRows = this._$colorPickerContainer.find(`.${COLOR_VIEW_ROW_CLASS}`);
        const renderedRowsCount = $renderedRows.length;
        const rowCount = this.option("editAlphaChannel") ? 2 : 1;
        let delta = renderedRowsCount - rowCount;
        if (delta > 0) {
            $renderedRows.eq(-1).remove()
        }
        if (delta < 0) {
            delta = Math.abs(delta);
            const rows = [];
            let i;
            for (i = 0; i < delta; i++) {
                rows.push($("<div>").addClass(COLOR_VIEW_ROW_CLASS))
            }
            if (renderedRowsCount) {
                for (i = 0; i < rows.length; i++) {
                    $renderedRows.eq(0).after(rows[i])
                }
            } else {
                this._$colorPickerContainer.append(rows)
            }
        }
    },
    _renderHtmlCellInsideRow: (index, $rowParent, additionalClass) => $("<div>").addClass(COLOR_VIEW_CELL_CLASS).addClass(additionalClass).appendTo($rowParent.find(`.${COLOR_VIEW_ROW_CLASS}`).eq(index)),
    _renderPalette() {
        const $paletteCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, "dx-colorview-palette-cell");
        const $paletteGradientWhite = $("<div>").addClass([COLOR_VIEW_PALETTE_GRADIENT_CLASS, COLOR_VIEW_PALETTE_GRADIENT_WHITE_CLASS].join(" "));
        const $paletteGradientBlack = $("<div>").addClass([COLOR_VIEW_PALETTE_GRADIENT_CLASS, COLOR_VIEW_PALETTE_GRADIENT_BLACK_CLASS].join(" "));
        this._$palette = $("<div>").addClass("dx-colorview-palette").css("backgroundColor", this._currentColor.getPureColor().toHex()).appendTo($paletteCell);
        this._paletteHeight = getHeight(this._$palette);
        this._paletteWidth = getWidth(this._$palette);
        this._renderPaletteHandle();
        this._$palette.append([$paletteGradientWhite, $paletteGradientBlack])
    },
    _renderPaletteHandle() {
        this._$paletteHandle = $("<div>").addClass("dx-colorview-palette-handle").appendTo(this._$palette);
        const ariaId = `dx-${new Guid}`;
        const handleAria = {
            id: ariaId,
            role: "application"
        };
        this.setAria(handleAria, this._$paletteHandle);
        this.setAria("activedescendant", ariaId, this.option("target"));
        this._createComponent(this._$paletteHandle, Draggable, {
            contentTemplate: null,
            boundary: this._$palette,
            allowMoveByClick: true,
            boundOffset: function() {
                return -this._paletteHandleHeight / 2
            }.bind(this),
            onDragMove: _ref => {
                let {
                    event: event
                } = _ref;
                const paletteHandlePosition = locate(this._$paletteHandle);
                this._updateByDrag = true;
                this._saveValueChangeEvent(event);
                this._updateColorFromHsv(this._currentColor.hsv.h, this._calculateColorSaturation(paletteHandlePosition), this._calculateColorValue(paletteHandlePosition))
            }
        });
        this._paletteHandleWidth = getWidth(this._$paletteHandle);
        this._paletteHandleHeight = getHeight(this._$paletteHandle);
        this._placePaletteHandle()
    },
    _placePaletteHandle() {
        move(this._$paletteHandle, {
            left: Math.round(this._paletteWidth * this._currentColor.hsv.s / 100 - this._paletteHandleWidth / 2),
            top: Math.round(this._paletteHeight - this._paletteHeight * this._currentColor.hsv.v / 100 - this._paletteHandleHeight / 2)
        })
    },
    _calculateColorValue(paletteHandlePosition) {
        const value = Math.floor(paletteHandlePosition.top + this._paletteHandleHeight / 2);
        return 100 - Math.round(100 * value / this._paletteHeight)
    },
    _calculateColorSaturation(paletteHandlePosition) {
        const saturation = Math.floor(paletteHandlePosition.left + this._paletteHandleWidth / 2);
        return Math.round(100 * saturation / this._paletteWidth)
    },
    _updateColorFromHsv(hue, saturation, value) {
        const {
            a: a
        } = this._currentColor;
        this._currentColor = new Color(`hsv(${[hue,saturation,value].join(",")})`);
        this._currentColor.a = a;
        this._updateColorParamsAndColorPreview();
        this.applyColor()
    },
    _renderHueScale() {
        const $hueScaleCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, "dx-colorview-hue-scale-cell");
        this._$hueScaleWrapper = $("<div>").addClass("dx-colorview-hue-scale-wrapper").appendTo($hueScaleCell);
        this._$hueScale = $("<div>").addClass("dx-colorview-hue-scale").appendTo(this._$hueScaleWrapper);
        this._hueScaleHeight = getHeight(this._$hueScale);
        this._hueScaleWrapperHeight = getOuterHeight(this._$hueScaleWrapper);
        this._renderHueScaleHandle()
    },
    _renderHueScaleHandle() {
        this._$hueScaleHandle = $("<div>").addClass("dx-colorview-hue-scale-handle").appendTo(this._$hueScaleWrapper);
        this._createComponent(this._$hueScaleHandle, Draggable, {
            contentTemplate: null,
            boundary: this._$hueScaleWrapper,
            allowMoveByClick: true,
            dragDirection: "vertical",
            onDragMove: _ref2 => {
                let {
                    event: event
                } = _ref2;
                this._updateByDrag = true;
                this._saveValueChangeEvent(event);
                this._updateColorHue(locate(this._$hueScaleHandle).top + this._hueScaleHandleHeight / 2)
            }
        });
        this._hueScaleHandleHeight = getHeight(this._$hueScaleHandle);
        this._placeHueScaleHandle()
    },
    _placeHueScaleHandle() {
        const hueScaleHeight = this._hueScaleWrapperHeight;
        const handleHeight = this._hueScaleHandleHeight;
        let top = (hueScaleHeight - handleHeight) * (360 - this._currentColor.hsv.h) / 360;
        if (hueScaleHeight < top + handleHeight) {
            top = hueScaleHeight - handleHeight
        }
        if (top < 0) {
            top = 0
        }
        move(this._$hueScaleHandle, {
            top: Math.round(top)
        })
    },
    _updateColorHue(handlePosition) {
        let hue = 360 - Math.round(360 * (handlePosition - this._hueScaleHandleHeight / 2) / (this._hueScaleWrapperHeight - this._hueScaleHandleHeight));
        const saturation = this._currentColor.hsv.s;
        const value = this._currentColor.hsv.v;
        this._isTopColorHue = false;
        hue = hue < 0 ? 0 : hue;
        if (hue >= 360) {
            this._isTopColorHue = true;
            hue = 0
        }
        this._updateColorFromHsv(hue, saturation, value);
        this._$palette.css("backgroundColor", this._currentColor.getPureColor().toHex())
    },
    _renderControlsContainer() {
        const $controlsContainerCell = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer);
        this._$controlsContainer = $("<div>").addClass("dx-colorview-controls-container").appendTo($controlsContainerCell)
    },
    _renderControls() {
        this._renderColorsPreview();
        this._renderRgbInputs();
        this._renderHexInput()
    },
    _renderColorsPreview() {
        const $colorsPreviewContainer = $("<div>").addClass("dx-colorview-color-preview-container").appendTo(this._$controlsContainer);
        const $colorsPreviewContainerInner = $("<div>").addClass("dx-colorview-color-preview-container-inner").appendTo($colorsPreviewContainer);
        this._$currentColor = $("<div>").addClass([COLOR_VIEW_COLOR_PREVIEW, COLOR_VIEW_COLOR_PREVIEW_COLOR_NEW].join(" "));
        this._$baseColor = $("<div>").addClass([COLOR_VIEW_COLOR_PREVIEW, COLOR_VIEW_COLOR_PREVIEW_COLOR_CURRENT].join(" "));
        this._makeTransparentBackground(this._$baseColor, this.option("matchValue"));
        this._makeTransparentBackground(this._$currentColor, this._currentColor);
        $colorsPreviewContainerInner.append([this._$baseColor, this._$currentColor])
    },
    _renderAlphaChannelElements() {
        if (this.option("editAlphaChannel")) {
            this._$colorPickerContainer.find(`.${COLOR_VIEW_ROW_CLASS}`).eq(1).addClass("dx-colorview-alpha-channel-row");
            this._renderAlphaChannelScale();
            this._renderAlphaChannelInput()
        }
    },
    _renderRgbInputs() {
        this._rgbInputsWithLabels = [this._renderEditorWithLabel({
            editorType: NumberBox,
            value: this._currentColor.r,
            onValueChanged: this._updateColor.bind(this, false),
            labelText: "R",
            labelAriaText: messageLocalization.format("dxColorView-ariaRed"),
            labelClass: "dx-colorview-label-red"
        }), this._renderEditorWithLabel({
            editorType: NumberBox,
            value: this._currentColor.g,
            onValueChanged: this._updateColor.bind(this, false),
            labelText: "G",
            labelAriaText: messageLocalization.format("dxColorView-ariaGreen"),
            labelClass: "dx-colorview-label-green"
        }), this._renderEditorWithLabel({
            editorType: NumberBox,
            value: this._currentColor.b,
            onValueChanged: this._updateColor.bind(this, false),
            labelText: "B",
            labelAriaText: messageLocalization.format("dxColorView-ariaBlue"),
            labelClass: "dx-colorview-label-blue"
        })];
        this._$controlsContainer.append(this._rgbInputsWithLabels);
        this._rgbInputs = [this._rgbInputsWithLabels[0].find(".dx-numberbox").dxNumberBox("instance"), this._rgbInputsWithLabels[1].find(".dx-numberbox").dxNumberBox("instance"), this._rgbInputsWithLabels[2].find(".dx-numberbox").dxNumberBox("instance")]
    },
    _renderEditorWithLabel(options) {
        const $editor = $("<div>");
        const $label = $("<label>").addClass(options.labelClass).text(`${options.labelText}:`).append($editor);
        eventsEngine.off($label, clickEventName);
        eventsEngine.on($label, clickEventName, (e => {
            e.preventDefault()
        }));
        const {
            editorType: editorType
        } = options;
        const editorOptions = extend({
            value: options.value,
            onValueChanged: options.onValueChanged,
            onKeyboardHandled: opts => this._keyboardHandler(opts)
        }, {
            stylingMode: this.option("stylingMode")
        });
        if (editorType === NumberBox) {
            editorOptions.min = options.min || 0;
            editorOptions.max = options.max || 255;
            editorOptions.step = options.step || 1
        }
        const editor = new editorType($editor, editorOptions);
        editor.registerKeyHandler("enter", (e => {
            this._fireEnterKeyPressed(e)
        }));
        this.setAria("label", options.labelAriaText, $editor);
        return $label
    },
    hexInputOptions() {
        return {
            editorType: TextBox,
            value: this._currentColor.toHex().replace("#", ""),
            onValueChanged: this._updateColor.bind(this, true),
            labelClass: "dx-colorview-label-hex",
            labelText: "#",
            labelAriaText: messageLocalization.format("dxColorView-ariaHex")
        }
    },
    _renderHexInput() {
        this._hexInput = TextBox.getInstance(this._renderEditorWithLabel(this.hexInputOptions()).appendTo(this._$controlsContainer).find(".dx-textbox"));
        const inputId = `dx-${new Guid}`;
        const $hexInput = this._$controlsContainer.find(".dx-colorview-label-hex").find(`.${TEXT_EDITOR_INPUT}`);
        this.setAria("id", inputId, $hexInput);
        this.setAria("labelledby", inputId, this._$paletteHandle)
    },
    _renderAlphaChannelScale() {
        const $alphaChannelScaleCell = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer, "dx-colorview-alpha-channel-cell");
        const $alphaChannelBorder = $("<div>").addClass("dx-colorview-alpha-channel-border").appendTo($alphaChannelScaleCell);
        const $alphaChannelScaleWrapper = $("<div>").addClass("dx-colorview-alpha-channel-wrapper").appendTo($alphaChannelBorder);
        this._$alphaChannelScale = $("<div>").addClass("dx-colorview-alpha-channel-scale").appendTo($alphaChannelScaleWrapper);
        this._makeCSSLinearGradient(this._$alphaChannelScale);
        this._renderAlphaChannelHandle($alphaChannelScaleCell)
    },
    _makeCSSLinearGradient($el) {
        const color = this._currentColor;
        const colorAsRgb = `${color.r},${color.g},${color.b}`;
        const rtlEnabled = this.option("rtlEnabled");
        const startColor = `rgba(${colorAsRgb}, ${rtlEnabled?"1":"0"})`;
        const finishColor = `rgba(${colorAsRgb}, ${rtlEnabled?"0":"1"})`;
        const backgroundImage = `linear-gradient(-90deg, ${startColor}, ${finishColor})`;
        $el.css("backgroundImage", backgroundImage)
    },
    _renderAlphaChannelInput() {
        const that = this;
        const $alphaChannelInputCell = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer);
        that._alphaChannelInput = this._renderEditorWithLabel({
            editorType: NumberBox,
            value: this._currentColor.a,
            max: 1,
            step: .1,
            onValueChanged(args) {
                let {
                    value: value
                } = args;
                value = that._currentColor.isValidAlpha(value) ? value : that._currentColor.a;
                args.event && that._saveValueChangeEvent(args.event);
                that._updateColorTransparency(value);
                that._placeAlphaChannelHandle()
            },
            labelClass: "dx-colorview-alpha-channel-label",
            labelText: "Alpha",
            labelAriaText: messageLocalization.format("dxColorView-ariaAlpha")
        }).appendTo($alphaChannelInputCell).find(".dx-numberbox").dxNumberBox("instance")
    },
    _updateColorTransparency(transparency) {
        this._currentColor.a = transparency;
        this.applyColor()
    },
    _renderAlphaChannelHandle($parent) {
        this._$alphaChannelHandle = $("<div>").addClass("dx-colorview-alpha-channel-handle").appendTo($parent);
        this._createComponent(this._$alphaChannelHandle, Draggable, {
            contentTemplate: null,
            boundary: $parent,
            allowMoveByClick: true,
            dragDirection: "horizontal",
            onDragMove: _ref3 => {
                let {
                    event: event
                } = _ref3;
                this._updateByDrag = true;
                const $alphaChannelHandle = this._$alphaChannelHandle;
                const alphaChannelHandlePosition = locate($alphaChannelHandle).left + this._alphaChannelHandleWidth / 2;
                this._saveValueChangeEvent(event);
                this._calculateColorTransparencyByScaleWidth(alphaChannelHandlePosition)
            }
        });
        this._alphaChannelHandleWidth = getWidth(this._$alphaChannelHandle);
        this._alphaChannelScaleWorkWidth = getWidth($parent) - this._alphaChannelHandleWidth;
        this._placeAlphaChannelHandle()
    },
    _calculateColorTransparencyByScaleWidth(handlePosition) {
        let transparency = (handlePosition - this._alphaChannelHandleWidth / 2) / this._alphaChannelScaleWorkWidth;
        const rtlEnabled = this.option("rtlEnabled");
        transparency = rtlEnabled ? transparency : 1 - transparency;
        if (handlePosition >= this._alphaChannelScaleWorkWidth + this._alphaChannelHandleWidth / 2) {
            transparency = rtlEnabled ? 1 : 0
        } else if (transparency < 1) {
            transparency = transparency.toFixed(2)
        }
        const previousTransparency = this._alphaChannelInput.option("value");
        transparency = Math.max(transparency, 0);
        transparency = Math.min(transparency, 1);
        if (transparency === previousTransparency) {
            this._updateByDrag = false
        } else {
            this._alphaChannelInput.option("value", transparency)
        }
    },
    _placeAlphaChannelHandle() {
        let left = this._alphaChannelScaleWorkWidth * (1 - this._currentColor.a);
        if (left < 0) {
            left = 0
        }
        if (this._alphaChannelScaleWorkWidth < left) {
            left = this._alphaChannelScaleWorkWidth
        }
        move(this._$alphaChannelHandle, {
            left: this.option("rtlEnabled") ? this._alphaChannelScaleWorkWidth - left : left
        })
    },
    applyColor() {
        const previousValue = this.option("value");
        const colorValue = this.option("editAlphaChannel") ? this._makeRgba(this._currentColor) : this._currentColor.toHex();
        this._makeTransparentBackground(this._$currentColor, this._currentColor);
        if (colorValue === previousValue) {
            this._updateByDrag = false
        } else {
            this.option("value", colorValue)
        }
    },
    cancelColor() {
        this._initColorAndOpacity();
        this._refreshMarkup()
    },
    _updateColor(isHex, args) {
        let rgba;
        let newColor;
        if (isHex) {
            newColor = this._validateHex(`#${this._hexInput.option("value")}`)
        } else {
            rgba = this._validateRgb();
            if (this._alphaChannelInput) {
                rgba.push(this._alphaChannelInput.option("value"));
                newColor = `rgba(${rgba.join(", ")})`
            } else {
                newColor = `rgb(${rgba.join(", ")})`
            }
        }
        if (!this._suppressEditorsValueUpdating) {
            this._currentColor = new Color(newColor);
            this._saveValueChangeEvent(args.event);
            this.applyColor();
            this._refreshMarkup()
        }
    },
    _validateHex(hex) {
        return this._currentColor.isValidHex(hex) ? hex : this._currentColor.toHex()
    },
    _validateRgb() {
        let r = this._rgbInputs[0].option("value");
        let g = this._rgbInputs[1].option("value");
        let b = this._rgbInputs[2].option("value");
        if (!this._currentColor.isValidRGB(r, g, b)) {
            r = this._currentColor.r;
            g = this._currentColor.g;
            b = this._currentColor.b
        }
        return [r, g, b]
    },
    _refreshMarkup() {
        this._placeHueScaleHandle();
        this._placePaletteHandle();
        this._updateColorParamsAndColorPreview();
        this._$palette.css("backgroundColor", this._currentColor.getPureColor().toHex());
        if (this._$alphaChannelHandle) {
            this._updateColorTransparency(this._currentColor.a);
            this._placeAlphaChannelHandle()
        }
    },
    _updateColorParamsAndColorPreview() {
        this._suppressEditorsValueUpdating = true;
        this._hexInput.option("value", this._currentColor.toHex().replace("#", ""));
        this._rgbInputs[0].option("value", this._currentColor.r);
        this._rgbInputs[1].option("value", this._currentColor.g);
        this._rgbInputs[2].option("value", this._currentColor.b);
        this._suppressEditorsValueUpdating = false;
        if (this.option("editAlphaChannel")) {
            this._makeCSSLinearGradient.call(this, this._$alphaChannelScale);
            this._alphaChannelInput.option("value", this._currentColor.a)
        }
    },
    _optionChanged(args) {
        const {
            value: value
        } = args;
        switch (args.name) {
            case "value":
                this._setCurrentColor(value);
                if (!this._updateByDrag) {
                    this._refreshMarkup()
                }
                this._updateByDrag = false;
                this.callBase(args);
                break;
            case "matchValue":
                this._setBaseColor(value);
                break;
            case "onEnterKeyPressed":
                this._initEnterKeyPressedAction();
                break;
            case "editAlphaChannel":
                if (this._$colorPickerContainer) {
                    this._renderHtmlRows("editAlphaChannel");
                    this._renderAlphaChannelElements()
                }
                break;
            case "keyStep":
                break;
            case "stylingMode":
                this._renderControls();
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxColorView", ColorView);
export default ColorView;
