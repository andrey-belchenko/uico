/**
 * DevExtreme (cjs/ui/html_editor/modules/tableResizing.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _type = require("../../../core/utils/type");
var _index = require("../../../events/utils/index");
var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));
var _translator = require("../../../animation/translator");
var _position = require("../../../core/utils/position");
var _base = _interopRequireDefault(require("./base"));
var _draggable = _interopRequireDefault(require("../../draggable"));
var _iterator = require("../../../core/utils/iterator");
var _window = require("../../../core/utils/window");
var _extend = require("../../../core/utils/extend");
var _table_helper = require("../utils/table_helper");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DX_COLUMN_RESIZE_FRAME_CLASS = "dx-table-resize-frame";
const DX_COLUMN_RESIZER_CLASS = "dx-htmleditor-column-resizer";
const DX_ROW_RESIZER_CLASS = "dx-htmleditor-row-resizer";
const DEFAULTS = {
    minColumnWidth: 40,
    minRowHeight: 24
};
const DRAGGABLE_ELEMENT_OFFSET = 2;
const ROUGH_OFFSET = 3;
const MODULE_NAMESPACE = "dxHtmlTableResizingModule";
const POINTERDOWN_EVENT = (0, _index.addNamespace)("dxpointerdown", MODULE_NAMESPACE);
const SCROLL_EVENT = (0, _index.addNamespace)("scroll", MODULE_NAMESPACE);
class TableResizingModule extends _base.default {
    constructor(quill, options) {
        super(quill, options);
        this.enabled = !!options.enabled;
        this._tableResizeFrames = [];
        this._minColumnWidth = this._minSizeLimit("minColumnWidth", options.minColumnWidth);
        this._minRowHeight = this._minSizeLimit("minRowHeight", options.minRowHeight);
        this._quillContainer = this.editorInstance._getQuillContainer();
        this._tableData = [];
        if (this.enabled) {
            this._applyResizing()
        }
    }
    _applyResizing(forcedStart) {
        if (forcedStart) {
            this._applyResizingImpl()
        } else {
            this.editorInstance.addContentInitializedCallback(this._applyResizingImpl.bind(this))
        }
        this.addCleanCallback(this.clean.bind(this));
        this._resizeHandlerWithContext = _resize_callbacks.default.add(this._resizeHandler.bind(this))
    }
    _minSizeLimit(propertyName, newValue) {
        return (0, _type.isDefined)(newValue) ? Math.max(newValue, 0) : DEFAULTS[propertyName]
    }
    _applyResizingImpl() {
        const $tables = this._findTables();
        if ($tables.length) {
            this._fixTablesWidths($tables);
            this._createResizeFrames($tables);
            this._updateFramesPositions();
            this._updateFramesSeparators()
        }
        this._attachEvents()
    }
    _attachEvents() {
        _events_engine.default.on(this.editorInstance._getContent(), SCROLL_EVENT, this._updateFramesPositions.bind(this));
        this.quill.on("text-change", this._getQuillTextChangeHandler())
    }
    _detachEvents() {
        _events_engine.default.off(this.editorInstance._getContent(), MODULE_NAMESPACE);
        this.quill.off("text-change", this._quillTextChangeHandler)
    }
    _getQuillTextChangeHandler(delta, oldContent, source) {
        return (delta, oldContent, source) => {
            if (this._isTableChanging()) {
                const $tables = this._findTables();
                this._removeResizeFrames();
                if ("api" === source) {
                    this._fixTablesWidths($tables)
                }
                this._updateTablesColumnsWidth($tables);
                this._createResizeFrames($tables);
                this._updateFramesPositions();
                this._updateFramesSeparators()
            } else {
                this._updateFramesPositions();
                if (!this._isDragging) {
                    this._updateFramesSeparators()
                }
            }
        }
    }
    _getFrameForTable($table) {
        var _this$_framesForTable;
        return null === (_this$_framesForTable = this._framesForTables) || void 0 === _this$_framesForTable ? void 0 : _this$_framesForTable.get($table.get(0))
    }
    _resizeHandler() {
        this._windowResizeTimeout = setTimeout((() => {
            const $tables = this._findTables();
            (0, _iterator.each)($tables, ((index, table) => {
                const $table = (0, _renderer.default)(table);
                const frame = this._tableResizeFrames[index];
                const actualTableWidth = (0, _size.getOuterWidth)($table);
                const lastTableWidth = this._tableLastWidth(frame);
                if (Math.abs(actualTableWidth - lastTableWidth) > 1) {
                    this._tableLastWidth(frame, actualTableWidth);
                    this._updateColumnsWidth($table, index)
                }
            }));
            this._updateFramesPositions();
            this._updateFramesSeparators()
        }))
    }
    _findTables() {
        return (0, _renderer.default)(this._quillContainer).find("table")
    }
    _getWidthStyleValue($element) {
        const styleValue = $element[0].style.width;
        return "" !== styleValue ? parseInt(styleValue) : void 0
    }
    _tableLastWidth(frame, newValue) {
        if ((0, _type.isDefined)(newValue)) {
            frame.lastWidth = newValue
        } else {
            return null === frame || void 0 === frame ? void 0 : frame.lastWidth
        }
    }
    _fixTablesWidths($tables) {
        (0, _iterator.each)($tables, ((index, table) => {
            const $table = (0, _renderer.default)(table);
            const $columnElements = this._getTableDeterminantElements($table, "horizontal");
            if (!this._tableResizeFrames[index]) {
                this._tableResizeFrames[index] = {
                    lastWidth: void 0
                }
            }
            const frame = this._getFrameForTable($table);
            if (!frame) {
                this._tableResizeFrames.push({
                    $table: $table
                })
            }
            if (0 === (0, _table_helper.getAutoSizedElements)($table).length) {
                const {
                    columnsSum: columnsSum
                } = this._getColumnElementsSum($columnElements);
                (0, _table_helper.unfixTableWidth)($table, {
                    quill: this.quill
                });
                const tableWidth = this._tableLastWidth(frame) ?? (0, _size.getOuterWidth)($table);
                if (frame) {
                    this._tableLastWidth(frame, Math.max(columnsSum, tableWidth))
                }
            }
        }))
    }
    _createResizeFrames($tables) {
        this._framesForTables = new Map;
        $tables.each(((index, table) => {
            var _this$_tableResizeFra;
            const $table = (0, _renderer.default)(table);
            const $lastTable = null === (_this$_tableResizeFra = this._tableResizeFrames[index]) || void 0 === _this$_tableResizeFra ? void 0 : _this$_tableResizeFra.$table;
            const $tableLastWidth = this._tableResizeFrames[index].lastWidth;
            this._tableResizeFrames[index] = {
                $frame: this._createTableResizeFrame(table),
                $table: $table,
                index: index,
                lastWidth: $lastTable && table === $lastTable.get(0) ? $tableLastWidth : void 0,
                columnsCount: this._getTableDeterminantElements($table, "horizontal").length,
                rowsCount: this._getTableDeterminantElements($table, "vertical").length
            };
            this._framesForTables.set(table, this._tableResizeFrames[index])
        }));
        this._tableResizeFrames.length = $tables.length
    }
    _isTableChanging() {
        const $tables = this._findTables();
        let result = false;
        if ($tables.length !== this._tableResizeFrames.length) {
            result = true
        } else {
            (0, _iterator.each)($tables, ((index, table) => {
                const $table = (0, _renderer.default)(table);
                const frame = this._tableResizeFrames[index];
                const isColumnsCountChanged = (null === frame || void 0 === frame ? void 0 : frame.columnsCount) !== this._getTableDeterminantElements($table, "horizontal").length;
                const isRowCountChanged = (null === frame || void 0 === frame ? void 0 : frame.rowsCount) !== this._getTableDeterminantElements($table, "vertical").length;
                if (isColumnsCountChanged || isRowCountChanged) {
                    result = true;
                    return false
                }
            }))
        }
        return result
    }
    _removeResizeFrames(clearArray) {
        var _this$_framesForTable2;
        (0, _iterator.each)(this._tableResizeFrames, ((index, resizeFrame) => {
            if (resizeFrame.$frame) {
                var _resizeFrame$$frame;
                const resizerElementsSelector = `.${DX_COLUMN_RESIZER_CLASS}, .${DX_ROW_RESIZER_CLASS}`;
                this._detachSeparatorEvents(null === (_resizeFrame$$frame = resizeFrame.$frame) || void 0 === _resizeFrame$$frame ? void 0 : _resizeFrame$$frame.find(resizerElementsSelector));
                resizeFrame.$frame.remove()
            }
        }));
        null === (_this$_framesForTable2 = this._framesForTables) || void 0 === _this$_framesForTable2 || _this$_framesForTable2.clear();
        if (clearArray) {
            this._tableResizeFrames = []
        }
    }
    _detachSeparatorEvents($lineSeparators) {
        $lineSeparators.each(((i, $lineSeparator) => {
            _events_engine.default.off($lineSeparator, POINTERDOWN_EVENT)
        }))
    }
    _createTableResizeFrame() {
        return (0, _renderer.default)("<div>").addClass("dx-table-resize-frame").appendTo(this._quillContainer)
    }
    _updateFramesPositions() {
        (0, _iterator.each)(this._tableResizeFrames, ((index, tableResizeFrame) => {
            this._updateFramePosition(tableResizeFrame.$table, tableResizeFrame.$frame)
        }))
    }
    _updateFramePosition($table, $frame) {
        const {
            height: height,
            width: width,
            top: targetTop,
            left: targetLeft
        } = (0, _position.getBoundingRect)($table.get(0));
        const {
            top: containerTop,
            left: containerLeft
        } = (0, _position.getBoundingRect)(this.quill.root);
        $frame.css({
            height: height,
            width: width,
            top: targetTop - containerTop,
            left: targetLeft - containerLeft
        });
        (0, _translator.move)($frame, {
            left: 0,
            top: 0
        })
    }
    _updateFramesSeparators(direction) {
        (0, _iterator.each)(this._tableResizeFrames, ((index, frame) => {
            if (direction) {
                this._updateFrameSeparators(frame, direction)
            } else {
                this._updateFrameSeparators(frame, "vertical");
                this._updateFrameSeparators(frame, "horizontal")
            }
        }))
    }
    _isDraggable($element) {
        return $element.hasClass("dx-draggable") && $element.is(":visible")
    }
    _removeDraggable($currentLineSeparator, lineResizerClass) {
        if (this._isDraggable($currentLineSeparator)) {
            const draggable = (0, _renderer.default)($currentLineSeparator).dxDraggable("instance");
            draggable.dispose();
            (0, _renderer.default)($currentLineSeparator).addClass(lineResizerClass)
        }
    }
    _getDirectionInfo(direction) {
        if ("vertical" === direction) {
            return {
                lineResizerClass: DX_ROW_RESIZER_CLASS,
                sizeFunction: x => (0, _size.getOuterHeight)(x),
                positionCoordinate: "top",
                positionStyleProperty: "height",
                positionCoordinateName: "y"
            }
        } else {
            return {
                lineResizerClass: DX_COLUMN_RESIZER_CLASS,
                sizeFunction: x => (0, _size.getOuterWidth)(x),
                positionCoordinate: this.editorInstance.option("rtlEnabled") ? "right" : "left",
                positionStyleProperty: "width",
                positionCoordinateName: "x"
            }
        }
    }
    _getSize($element, directionInfo) {
        return directionInfo.sizeFunction($element)
    }
    _updateFrameSeparators(frame, direction) {
        const $determinantElements = this._getTableDeterminantElements(frame.$table, direction);
        const determinantElementsCount = $determinantElements.length;
        const determinantElementsSeparatorsCount = determinantElementsCount - 1;
        const directionInfo = this._getDirectionInfo(direction);
        const lineSeparators = frame.$frame.find(`.${directionInfo.lineResizerClass}`);
        const styleOptions = {
            transform: "none"
        };
        let currentPosition = 0;
        for (let i = 0; i <= determinantElementsSeparatorsCount; i++) {
            currentPosition += this._getSize($determinantElements.eq(i), directionInfo);
            if (!(0, _type.isDefined)(lineSeparators[i])) {
                lineSeparators[i] = (0, _renderer.default)("<div>").addClass(directionInfo.lineResizerClass).appendTo(frame.$frame).get(0)
            }
            const $currentLineSeparator = (0, _renderer.default)(lineSeparators[i]);
            this._removeDraggable($currentLineSeparator, directionInfo.lineResizerClass);
            styleOptions[directionInfo.positionCoordinate] = currentPosition - 2;
            (0, _renderer.default)($currentLineSeparator).css(styleOptions);
            const attachSeparatorData = {
                lineSeparator: lineSeparators[i],
                index: i,
                $determinantElements: $determinantElements,
                frame: frame,
                direction: direction
            };
            this._attachColumnSeparatorEvents(attachSeparatorData)
        }
    }
    _getTableDeterminantElements($table, direction) {
        if ("vertical" === direction) {
            return $table.find("th:first-child, td:first-child")
        } else {
            return (0, _table_helper.getColumnElements)($table)
        }
    }
    _attachColumnSeparatorEvents(options) {
        _events_engine.default.on(options.lineSeparator, POINTERDOWN_EVENT, (() => {
            this._createDraggableElement(options)
        }))
    }
    _dragStartHandler(_ref) {
        let {
            $determinantElements: $determinantElements,
            index: index,
            frame: frame,
            direction: direction,
            lineSeparator: lineSeparator
        } = _ref;
        const directionInfo = this._getDirectionInfo(direction);
        this._isDragging = true;
        this._fixColumnsWidth(frame.$table);
        this._startLineSize = parseInt(this._getSize((0, _renderer.default)($determinantElements[index]), directionInfo));
        this._startTableWidth = (0, _size.getOuterWidth)(frame.$table);
        this._startLineSeparatorPosition = parseInt((0, _renderer.default)(lineSeparator).css(directionInfo.positionCoordinate));
        this._nextLineSize = 0;
        if ($determinantElements[index + 1]) {
            this._nextLineSize = parseInt(this._getSize((0, _renderer.default)($determinantElements[index + 1]), directionInfo))
        } else if ("horizontal" === direction) {
            (0, _table_helper.unfixTableWidth)(frame.$table, {
                quill: this.quill
            })
        }
    }
    _shouldRevertOffset(direction) {
        return "horizontal" === direction && this.editorInstance.option("rtlEnabled")
    }
    _isNextColumnWidthEnough(nextColumnNewSize, $nextColumnElement, eventOffset) {
        if (!this._nextLineSize) {
            return true
        } else if (nextColumnNewSize >= this._minColumnWidth) {
            const isWidthIncreased = this._nextColumnOffsetLimit ? eventOffset < this._nextColumnOffsetLimit : eventOffset < 0;
            const isWidthLimited = Math.abs(this._getWidthStyleValue($nextColumnElement) - (0, _size.getOuterWidth)($nextColumnElement)) > 3;
            return isWidthIncreased || !isWidthLimited
        }
        return false
    }
    _shouldSetNextColumnWidth(nextColumnNewSize) {
        return this._nextLineSize && nextColumnNewSize > 0
    }
    _horizontalDragHandler(_ref2) {
        let {
            currentLineNewSize: currentLineNewSize,
            directionInfo: directionInfo,
            eventOffset: eventOffset,
            $determinantElements: $determinantElements,
            index: index,
            frame: frame
        } = _ref2;
        let nextColumnNewSize = this._nextLineSize && this._nextLineSize - eventOffset;
        const isCurrentColumnWidthEnough = currentLineNewSize >= this._minColumnWidth;
        const $lineElements = (0, _table_helper.getLineElements)(frame.$table, index);
        const $nextLineElements = (0, _table_helper.getLineElements)(frame.$table, index + 1);
        const realWidthDiff = (0, _size.getOuterWidth)($lineElements.eq(0)) - currentLineNewSize;
        if (isCurrentColumnWidthEnough) {
            if (this._isNextColumnWidthEnough(nextColumnNewSize, $determinantElements.eq(index + 1), eventOffset)) {
                (0, _table_helper.setLineElementsFormat)(this, {
                    elements: $lineElements,
                    property: directionInfo.positionStyleProperty,
                    value: currentLineNewSize
                });
                if (this._shouldSetNextColumnWidth(nextColumnNewSize)) {
                    (0, _table_helper.setLineElementsFormat)(this, {
                        elements: $nextLineElements,
                        property: directionInfo.positionStyleProperty,
                        value: nextColumnNewSize
                    })
                }
                const isTableWidthChanged = Math.abs(this._startTableWidth - (0, _size.getOuterWidth)(frame.$table)) < 3;
                const shouldRevertNewValue = Math.abs(realWidthDiff) > 3 || !this._nextLineSize && isTableWidthChanged;
                if (shouldRevertNewValue) {
                    (0, _table_helper.setLineElementsFormat)(this, {
                        elements: $lineElements,
                        property: directionInfo.positionStyleProperty,
                        value: (0, _size.getOuterWidth)($lineElements.eq(0))
                    });
                    nextColumnNewSize += currentLineNewSize - (0, _size.getOuterWidth)($lineElements.eq(0));
                    if (this._shouldSetNextColumnWidth(nextColumnNewSize)) {
                        (0, _table_helper.setLineElementsFormat)(this, {
                            elements: $nextLineElements,
                            property: directionInfo.positionStyleProperty,
                            value: nextColumnNewSize
                        })
                    }
                }
            } else {
                this._nextColumnOffsetLimit = this._nextColumnOffsetLimit || eventOffset
            }
        }
        this._$highlightedElement.css(directionInfo.positionCoordinate, this._startLineSeparatorPosition + eventOffset + realWidthDiff + "px")
    }
    _verticalDragHandler(_ref3) {
        let {
            currentLineNewSize: currentLineNewSize,
            directionInfo: directionInfo,
            eventOffset: eventOffset,
            $determinantElements: $determinantElements,
            index: index,
            frame: frame
        } = _ref3;
        const newHeight = Math.max(currentLineNewSize, this._minRowHeight);
        const $lineElements = (0, _table_helper.getLineElements)(frame.$table, index, "vertical");
        (0, _table_helper.setLineElementsFormat)(this, {
            elements: $lineElements,
            property: directionInfo.positionStyleProperty,
            value: newHeight
        });
        const rowHeightDiff = (0, _size.getOuterHeight)($determinantElements.eq(index)) - currentLineNewSize;
        this._$highlightedElement.css(directionInfo.positionCoordinate, this._startLineSeparatorPosition + eventOffset + rowHeightDiff + "px")
    }
    _dragMoveHandler(event, _ref4) {
        let {
            $determinantElements: $determinantElements,
            index: index,
            frame: frame,
            direction: direction
        } = _ref4;
        const directionInfo = this._getDirectionInfo(direction);
        let eventOffset = event.offset[directionInfo.positionCoordinateName];
        this.editorInstance._saveValueChangeEvent(event);
        if (this._shouldRevertOffset(direction)) {
            eventOffset = -eventOffset
        }
        const currentLineNewSize = this._startLineSize + eventOffset;
        if ("horizontal" === direction) {
            this._horizontalDragHandler({
                currentLineNewSize: currentLineNewSize,
                directionInfo: directionInfo,
                eventOffset: eventOffset,
                $determinantElements: $determinantElements,
                index: index,
                frame: frame
            })
        } else {
            this._verticalDragHandler({
                currentLineNewSize: currentLineNewSize,
                directionInfo: directionInfo,
                eventOffset: eventOffset,
                $determinantElements: $determinantElements,
                index: index,
                frame: frame
            })
        }
        this._updateFramePosition(frame.$table, frame.$frame)
    }
    _dragEndHandler(options) {
        var _this$_$highlightedEl;
        null === (_this$_$highlightedEl = this._$highlightedElement) || void 0 === _this$_$highlightedEl || _this$_$highlightedEl.remove();
        this._isDragging = void 0;
        this._nextColumnOffsetLimit = void 0;
        this._tableLastWidth(options.frame, (0, _size.getOuterWidth)(options.frame.$table));
        this._updateFramesPositions();
        this._updateFramesSeparators()
    }
    _isLastColumnResizing(_ref5) {
        let {
            $determinantElements: $determinantElements,
            index: index
        } = _ref5;
        return !(0, _type.isDefined)($determinantElements[index + 1])
    }
    _getBoundaryConfig(options) {
        const result = {};
        if ("vertical" === options.direction) {
            result.boundary = options.frame.$table;
            result.boundOffset = {
                bottom: (0, _window.hasWindow)() ? -(0, _size.getHeight)((0, _window.getWindow)()) : -(0, _size.getOuterHeight)(this._quillContainer),
                top: 0,
                left: 0,
                right: 0
            }
        } else if (!this._isLastColumnResizing(options)) {
            result.boundary = options.frame.$table
        } else {
            const $content = this.editorInstance._getContent();
            result.boundary = $content;
            result.boundOffset = {
                bottom: 0,
                top: 0,
                left: $content.css("paddingLeft"),
                right: $content.css("paddingRight")
            }
        }
        return result
    }
    _createDraggableElement(options) {
        var _this$_$highlightedEl2;
        const boundaryConfig = this._getBoundaryConfig(options);
        const directionClass = "vertical" === options.direction ? "dx-htmleditor-highlighted-row" : "dx-htmleditor-highlighted-column";
        null === (_this$_$highlightedEl2 = this._$highlightedElement) || void 0 === _this$_$highlightedEl2 || _this$_$highlightedEl2.remove();
        this._$highlightedElement = (0, _renderer.default)("<div>").addClass(`${directionClass}`).insertAfter((0, _renderer.default)(options.lineSeparator));
        const config = {
            contentTemplate: null,
            allowMoveByClick: false,
            dragDirection: options.direction,
            onDragMove: _ref6 => {
                let {
                    component: component,
                    event: event
                } = _ref6;
                this._dragMoveHandler(event, options)
            },
            onDragStart: () => {
                this._dragStartHandler(options)
            },
            onDragEnd: () => {
                this._dragEndHandler(options)
            }
        };
        (0, _extend.extend)(config, boundaryConfig);
        this._currentDraggableElement = this.editorInstance._createComponent(options.lineSeparator, _draggable.default, config)
    }
    _fixColumnsWidth($table) {
        const determinantElements = this._getTableDeterminantElements($table);
        (0, _iterator.each)(determinantElements, ((index, element) => {
            const columnWidth = (0, _size.getOuterWidth)(element);
            const $lineElements = (0, _table_helper.getLineElements)($table, index);
            (0, _table_helper.setLineElementsFormat)(this, {
                elements: $lineElements,
                property: "width",
                value: Math.max(columnWidth, this._minColumnWidth)
            })
        }))
    }
    _getColumnElementsSum(columnElements) {
        const columnsWidths = [];
        let columnsSum = 0;
        (0, _iterator.each)(columnElements, ((index, element) => {
            const $element = (0, _renderer.default)(element);
            const columnWidth = this._getWidthStyleValue($element) || (0, _size.getOuterWidth)($element);
            columnsWidths[index] = Math.max(columnWidth, this._minColumnWidth);
            columnsSum += columnsWidths[index]
        }));
        return {
            columnsWidths: columnsWidths,
            columnsSum: columnsSum
        }
    }
    _setColumnsRatioWidth(columnElements, ratio, columnsWidths, $table) {
        (0, _iterator.each)(columnElements, (index => {
            const $lineElements = (0, _table_helper.getLineElements)($table, index);
            let resultWidth;
            if (ratio > 0) {
                resultWidth = this._minColumnWidth + Math.round((columnsWidths[index] - this._minColumnWidth) * ratio)
            } else {
                resultWidth = this._minColumnWidth
            }(0, _table_helper.setLineElementsFormat)(this, {
                elements: $lineElements,
                property: "width",
                value: resultWidth
            })
        }))
    }
    _updateColumnsWidth($table, frameIndex) {
        const determinantElements = this._getTableDeterminantElements($table);
        let frame = this._tableResizeFrames[frameIndex];
        if (!frame) {
            this._tableResizeFrames[frameIndex] = {}
        }
        frame = this._tableResizeFrames[frameIndex];
        const tableWidth = this._tableLastWidth(frame) || (0, _size.getOuterWidth)($table);
        let ratio;
        const {
            columnsWidths: columnsWidths,
            columnsSum: columnsSum
        } = this._getColumnElementsSum(determinantElements);
        const minWidthForColumns = determinantElements.length * this._minColumnWidth;
        if (columnsSum > minWidthForColumns) {
            ratio = (tableWidth - minWidthForColumns) / (columnsSum - minWidthForColumns)
        } else {
            ratio = -1
        }
        this._tableLastWidth(frame, ratio > 0 ? tableWidth : minWidthForColumns);
        this._setColumnsRatioWidth(determinantElements, ratio, columnsWidths, $table)
    }
    _updateTablesColumnsWidth($tables) {
        (0, _iterator.each)($tables, ((index, table) => {
            this._updateColumnsWidth((0, _renderer.default)(table), index)
        }))
    }
    option(option, value) {
        if ("tableResizing" === option) {
            this.handleOptionChangeValue(value);
            return
        }
        if ("enabled" === option) {
            this.enabled = value;
            value ? this._applyResizing(true) : this.clean()
        } else if (["minColumnWidth", "minRowHeight"].includes(option)) {
            this[`_${option}`] = this._minSizeLimit(option, value)
        }
    }
    clean() {
        this._removeResizeFrames(true);
        this._detachEvents();
        _resize_callbacks.default.remove(this._resizeHandlerWithContext);
        clearTimeout(this._windowResizeTimeout);
        this._resizeHandlerWithContext = void 0;
        this._isDragging = void 0;
        this._startTableWidth = void 0;
        clearTimeout(this._attachResizerTimeout)
    }
}
exports.default = TableResizingModule;
module.exports = exports.default;
module.exports.default = exports.default;
