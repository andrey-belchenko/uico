/**
 * DevExtreme (cjs/__internal/scheduler/workspaces/m_virtual_scrolling.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualScrollingRenderer = exports.VirtualScrollingDispatcher = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
const DEFAULT_CELL_HEIGHT = 50;
const MIN_CELL_WIDTH = 1;
const MIN_SCROLL_OFFSET = 10;
const VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT = 15;
const DOCUMENT_SCROLL_EVENT_NAMESPACE = (0, _index.addNamespace)("scroll", "dxSchedulerVirtualScrolling");
const MAX_CELLS_PER_VIRTUAL_CELL_COUNT = 1e3;
const scrollingOrientations = {
    vertical: "vertical",
    horizontal: "horizontal",
    both: "both",
    none: "none"
};
const DefaultScrollingOrientation = scrollingOrientations.both;
class VirtualScrollingDispatcher {
    constructor(options) {
        this.options = options;
        if (options) {
            this._rowHeight = this.getCellHeight();
            this._cellWidth = this.getCellWidth();
            this._createVirtualScrollingBase()
        }
    }
    get isRTL() {
        return this.options.isRTL()
    }
    get verticalVirtualScrolling() {
        return this._verticalVirtualScrolling
    }
    set verticalVirtualScrolling(value) {
        this._verticalVirtualScrolling = value
    }
    get horizontalVirtualScrolling() {
        return this._horizontalVirtualScrolling
    }
    set horizontalVirtualScrolling(value) {
        this._horizontalVirtualScrolling = value
    }
    get document() {
        return _dom_adapter.default.getDocument()
    }
    get height() {
        return this.options.getSchedulerHeight()
    }
    get width() {
        return this.options.getSchedulerWidth()
    }
    get rowHeight() {
        return this._rowHeight
    }
    set rowHeight(value) {
        this._rowHeight = value
    }
    get outlineCount() {
        return this.options.getScrolling().outlineCount
    }
    get cellWidth() {
        return this._cellWidth
    }
    set cellWidth(value) {
        this._cellWidth = value
    }
    get viewportWidth() {
        const width = this.width && this.options.getViewWidth();
        return width > 0 ? width : this.options.getWindowWidth()
    }
    get viewportHeight() {
        const height = this.height && this.options.getViewHeight();
        return height > 0 ? height : this.options.getWindowHeight()
    }
    get cellCountInsideTopVirtualRow() {
        var _this$verticalScrolli;
        return (null === (_this$verticalScrolli = this.verticalScrollingState) || void 0 === _this$verticalScrolli ? void 0 : _this$verticalScrolli.virtualItemCountBefore) || 0
    }
    get cellCountInsideLeftVirtualCell() {
        var _this$horizontalScrol;
        return (null === (_this$horizontalScrol = this.horizontalScrollingState) || void 0 === _this$horizontalScrol ? void 0 : _this$horizontalScrol.virtualItemCountBefore) || 0
    }
    get cellCountInsideRightVirtualCell() {
        var _this$horizontalScrol2;
        return (null === (_this$horizontalScrol2 = this.horizontalScrollingState) || void 0 === _this$horizontalScrol2 ? void 0 : _this$horizontalScrol2.virtualItemCountAfter) || 0
    }
    get topVirtualRowsCount() {
        return this.cellCountInsideTopVirtualRow > 0 ? 1 : 0
    }
    get leftVirtualCellsCount() {
        const virtualItemsCount = !this.isRTL ? this.cellCountInsideLeftVirtualCell : this.cellCountInsideRightVirtualCell;
        return Math.ceil(virtualItemsCount / 1e3)
    }
    get virtualRowOffset() {
        var _this$verticalScrolli2;
        return (null === (_this$verticalScrolli2 = this.verticalScrollingState) || void 0 === _this$verticalScrolli2 ? void 0 : _this$verticalScrolli2.virtualItemSizeBefore) || 0
    }
    get virtualCellOffset() {
        var _this$horizontalScrol3;
        return (null === (_this$horizontalScrol3 = this.horizontalScrollingState) || void 0 === _this$horizontalScrol3 ? void 0 : _this$horizontalScrol3.virtualItemSizeBefore) || 0
    }
    get scrollingState() {
        var _this$verticalVirtual, _this$horizontalVirtu;
        return {
            vertical: null === (_this$verticalVirtual = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual ? void 0 : _this$verticalVirtual.state,
            horizontal: null === (_this$horizontalVirtu = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu ? void 0 : _this$horizontalVirtu.state
        }
    }
    get verticalScrollingState() {
        return this.scrollingState.vertical
    }
    get horizontalScrollingState() {
        return this.scrollingState.horizontal
    }
    get scrollingOrientation() {
        const scrolling = this.options.getScrolling();
        if ("standard" === scrolling.mode) {
            return scrollingOrientations.none
        }
        return scrolling.orientation || DefaultScrollingOrientation
    }
    get verticalScrollingAllowed() {
        return this.scrollingOrientation === scrollingOrientations.vertical || this.scrollingOrientation === scrollingOrientations.both
    }
    get horizontalScrollingAllowed() {
        return this.scrollingOrientation === scrollingOrientations.horizontal || this.scrollingOrientation === scrollingOrientations.both
    }
    setViewOptions(options) {
        this.options = options;
        if (this.verticalVirtualScrolling) {
            this.verticalVirtualScrolling.options = options;
            this.verticalVirtualScrolling.itemSize = this.rowHeight;
            this.verticalVirtualScrolling.viewportSize = this.viewportHeight
        }
        if (this.horizontalVirtualScrolling) {
            this.horizontalVirtualScrolling.options = options;
            this.verticalVirtualScrolling.itemSize = this.cellWidth;
            this.verticalVirtualScrolling.viewportSize = this.viewportWidth
        }
    }
    getRenderState() {
        var _this$verticalVirtual2, _this$horizontalVirtu2;
        const verticalRenderState = (null === (_this$verticalVirtual2 = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual2 ? void 0 : _this$verticalVirtual2.getRenderState()) || {};
        const horizontalRenderState = (null === (_this$horizontalVirtu2 = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu2 ? void 0 : _this$horizontalVirtu2.getRenderState()) || {};
        return _extends({}, verticalRenderState, horizontalRenderState)
    }
    getCellHeight() {
        const cellHeight = this.options.getCellHeight();
        const result = cellHeight > 0 ? cellHeight : 50;
        return Math.floor(result)
    }
    getCellWidth() {
        let cellWidth = this.options.getCellWidth();
        const minCellWidth = this.options.getCellMinWidth();
        if (!cellWidth || cellWidth < minCellWidth) {
            cellWidth = minCellWidth
        }
        const result = cellWidth > 0 ? cellWidth : 1;
        return Math.floor(result)
    }
    calculateCoordinatesByDataAndPosition(cellData, position, date, isCalculateTime, isVerticalDirectionView) {
        const {
            rowIndex: rowIndex,
            columnIndex: columnIndex
        } = position;
        const {
            startDate: startDate,
            endDate: endDate,
            allDay: allDay
        } = cellData;
        const timeToScroll = date.getTime();
        const cellStartTime = startDate.getTime();
        const cellEndTime = endDate.getTime();
        const scrollInCell = allDay || !isCalculateTime ? 0 : (timeToScroll - cellStartTime) / (cellEndTime - cellStartTime);
        const cellWidth = this.getCellWidth();
        const rowHeight = this.getCellHeight();
        const top = isVerticalDirectionView ? (rowIndex + scrollInCell) * rowHeight : rowIndex * rowHeight;
        let left = isVerticalDirectionView ? columnIndex * cellWidth : (columnIndex + scrollInCell) * cellWidth;
        if (this.isRTL) {
            left = this.options.getScrollableOuterWidth() - left
        }
        return {
            top: top,
            left: left
        }
    }
    dispose() {
        if (this._onScrollHandler) {
            _events_engine.default.off(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler)
        }
    }
    createVirtualScrolling() {
        const isVerticalVirtualScrollingCreated = !!this.verticalVirtualScrolling;
        const isHorizontalVirtualScrollingCreated = !!this.horizontalVirtualScrolling;
        if (this.verticalScrollingAllowed !== isVerticalVirtualScrollingCreated || this.horizontalScrollingAllowed !== isHorizontalVirtualScrollingCreated) {
            this._rowHeight = this.getCellHeight();
            this._cellWidth = this.getCellWidth();
            this._createVirtualScrollingBase()
        }
    }
    _createVirtualScrollingBase() {
        if (this.verticalScrollingAllowed) {
            this.verticalVirtualScrolling = new VerticalVirtualScrolling(_extends({}, this.options, {
                viewportHeight: this.viewportHeight,
                rowHeight: this.rowHeight,
                outlineCount: this.outlineCount
            }))
        }
        if (this.horizontalScrollingAllowed) {
            this.horizontalVirtualScrolling = new HorizontalVirtualScrolling(_extends({}, this.options, {
                viewportWidth: this.viewportWidth,
                cellWidth: this.cellWidth,
                outlineCount: this.outlineCount
            }))
        }
    }
    isAttachWindowScrollEvent() {
        return (this.horizontalScrollingAllowed || this.verticalScrollingAllowed) && !this.height
    }
    attachScrollableEvents() {
        if (this.isAttachWindowScrollEvent()) {
            this._attachWindowScroll()
        }
    }
    _attachWindowScroll() {
        const window = (0, _window.getWindow)();
        this._onScrollHandler = this.options.createAction((() => {
            const {
                scrollX: scrollX,
                scrollY: scrollY
            } = window;
            if (scrollX >= 10 || scrollY >= 10) {
                this.handleOnScrollEvent({
                    left: scrollX,
                    top: scrollY
                })
            }
        }));
        _events_engine.default.on(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler)
    }
    handleOnScrollEvent(scrollPosition) {
        if (scrollPosition) {
            var _this$verticalVirtual3, _this$horizontalVirtu3;
            const {
                left: left,
                top: top
            } = scrollPosition;
            const verticalStateChanged = (0, _type.isDefined)(top) && (null === (_this$verticalVirtual3 = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual3 ? void 0 : _this$verticalVirtual3.updateState(top));
            const horizontalStateChanged = (0, _type.isDefined)(left) && (null === (_this$horizontalVirtu3 = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu3 ? void 0 : _this$horizontalVirtu3.updateState(left));
            if (verticalStateChanged || horizontalStateChanged) {
                var _this$options$updateR, _this$options;
                null === (_this$options$updateR = (_this$options = this.options).updateRender) || void 0 === _this$options$updateR || _this$options$updateR.call(_this$options)
            }
        }
    }
    updateDimensions(isForce) {
        const cellHeight = this.getCellHeight();
        const needUpdateVertical = this.verticalScrollingAllowed && cellHeight !== this.rowHeight;
        if ((needUpdateVertical || isForce) && this.verticalVirtualScrolling) {
            this.rowHeight = cellHeight;
            this.verticalVirtualScrolling.viewportSize = this.viewportHeight;
            this.verticalVirtualScrolling.reinitState(cellHeight, isForce)
        }
        const cellWidth = this.getCellWidth();
        const needUpdateHorizontal = this.horizontalScrollingAllowed && cellWidth !== this.cellWidth;
        if ((needUpdateHorizontal || isForce) && this.horizontalVirtualScrolling) {
            this.cellWidth = cellWidth;
            this.horizontalVirtualScrolling.viewportSize = this.viewportWidth;
            this.horizontalVirtualScrolling.reinitState(cellWidth, isForce)
        }
        if (needUpdateVertical || needUpdateHorizontal) {
            var _this$options$updateG, _this$options2;
            null === (_this$options$updateG = (_this$options2 = this.options).updateGrid) || void 0 === _this$options$updateG || _this$options$updateG.call(_this$options2)
        }
    }
}
exports.VirtualScrollingDispatcher = VirtualScrollingDispatcher;
class VirtualScrollingBase {
    constructor(options) {
        this.options = options;
        this._state = this.defaultState;
        this.viewportSize = this.options.viewportSize;
        this._itemSize = this.options.itemSize;
        this._position = -1;
        this._itemSizeChanged = false;
        this.updateState(0)
    }
    get itemSize() {
        return this._itemSize
    }
    set itemSize(value) {
        this._itemSizeChanged = this._itemSize !== value;
        this._itemSize = value
    }
    get state() {
        return this._state
    }
    set state(value) {
        this._state = value
    }
    get startIndex() {
        return this.state.startIndex
    }
    get pageSize() {
        return Math.ceil(this.viewportSize / this.itemSize)
    }
    get outlineCount() {
        return (0, _type.isDefined)(this.options.outlineCount) ? this.options.outlineCount : Math.floor(this.pageSize / 2)
    }
    get groupCount() {
        return this.options.getGroupCount()
    }
    get isVerticalGrouping() {
        return this.options.isVerticalGrouping()
    }
    get defaultState() {
        return {
            prevPosition: 0,
            startIndex: -1,
            itemCount: 0,
            virtualItemCountBefore: 0,
            virtualItemCountAfter: 0,
            outlineCountBefore: 0,
            outlineCountAfter: 0,
            virtualItemSizeBefore: 0,
            virtualItemSizeAfter: 0,
            outlineSizeBefore: 0,
            outlineSizeAfter: 0
        }
    }
    get maxScrollPosition() {
        return this.getTotalItemCount() * this.itemSize - this.viewportSize
    }
    get position() {
        return this._position
    }
    set position(value) {
        this._position = value
    }
    needUpdateState(position) {
        const {
            prevPosition: prevPosition,
            startIndex: startIndex
        } = this.state;
        const isFirstInitialization = startIndex < 0;
        if (isFirstInitialization) {
            return true
        }
        let isStartIndexChanged = false;
        if (this._validateAndSavePosition(position)) {
            if (0 === position || position === this.maxScrollPosition) {
                return true
            }
            const currentPosition = prevPosition;
            const currentItemsCount = Math.floor(currentPosition / this.itemSize);
            const itemsCount = Math.floor(position / this.itemSize);
            isStartIndexChanged = Math.abs(currentItemsCount - itemsCount) >= this.outlineCount
        }
        return isStartIndexChanged
    }
    _validateAndSavePosition(position) {
        if (!(0, _type.isDefined)(position)) {
            return false
        }
        const result = this.position !== position;
        this.position = position;
        return result
    }
    _correctPosition(position) {
        return position >= 0 ? Math.min(position, this.maxScrollPosition) : -1
    }
    updateState(position, isForce) {
        position = this._correctPosition(position);
        if (!this.needUpdateState(position) && !isForce) {
            return false
        }
        const itemsInfoBefore = this._calcItemInfoBefore(position);
        const itemsDeltaBefore = this._calcItemDeltaBefore(itemsInfoBefore);
        const {
            outlineCountAfter: outlineCountAfter,
            virtualItemCountAfter: virtualItemCountAfter,
            itemCountWithAfter: itemCountWithAfter
        } = this._calcItemInfoAfter(itemsDeltaBefore);
        const {
            virtualItemCountBefore: virtualItemCountBefore,
            outlineCountBefore: outlineCountBefore
        } = itemsInfoBefore;
        const itemCount = outlineCountBefore + itemCountWithAfter + outlineCountAfter;
        const itemCountBefore = Math.floor(position / this.itemSize);
        this.state.prevPosition = itemCountBefore * this.itemSize;
        this.state.startIndex = itemCountBefore - outlineCountBefore;
        this.state.virtualItemCountBefore = virtualItemCountBefore;
        this.state.outlineCountBefore = outlineCountBefore;
        this.state.itemCount = itemCount;
        this.state.outlineCountAfter = outlineCountAfter;
        this.state.virtualItemCountAfter = virtualItemCountAfter;
        this._updateStateCore();
        return true
    }
    reinitState(itemSize, isForceUpdate) {
        const {
            position: position
        } = this;
        this.itemSize = itemSize;
        this.updateState(0, isForceUpdate);
        if (position > 0) {
            this.updateState(position, isForceUpdate)
        }
    }
    _calcItemInfoBefore(position) {
        let virtualItemCountBefore = Math.floor(position / this.itemSize);
        const outlineCountBefore = Math.min(virtualItemCountBefore, this.outlineCount);
        virtualItemCountBefore -= outlineCountBefore;
        return {
            virtualItemCountBefore: virtualItemCountBefore,
            outlineCountBefore: outlineCountBefore
        }
    }
    _calcItemDeltaBefore(itemInfoBefore) {
        const {
            virtualItemCountBefore: virtualItemCountBefore,
            outlineCountBefore: outlineCountBefore
        } = itemInfoBefore;
        const totalItemCount = this.getTotalItemCount();
        return totalItemCount - virtualItemCountBefore - outlineCountBefore
    }
    getTotalItemCount() {
        throw "getTotalItemCount method should be implemented"
    }
    getRenderState() {
        throw "getRenderState method should be implemented"
    }
    _calcItemInfoAfter(itemsDeltaBefore) {
        const itemCountWithAfter = itemsDeltaBefore >= this.pageSize ? this.pageSize : itemsDeltaBefore;
        let virtualItemCountAfter = itemsDeltaBefore - itemCountWithAfter;
        const outlineCountAfter = virtualItemCountAfter > 0 ? Math.min(virtualItemCountAfter, this.outlineCount) : 0;
        if (virtualItemCountAfter > 0) {
            virtualItemCountAfter -= outlineCountAfter
        }
        return {
            virtualItemCountAfter: virtualItemCountAfter,
            outlineCountAfter: outlineCountAfter,
            itemCountWithAfter: itemCountWithAfter
        }
    }
    _updateStateCore() {
        const {
            state: state
        } = this;
        const {
            virtualItemCountBefore: virtualItemCountBefore
        } = state;
        const {
            virtualItemCountAfter: virtualItemCountAfter
        } = state;
        const {
            outlineCountBefore: outlineCountBefore
        } = state;
        const {
            outlineCountAfter: outlineCountAfter
        } = state;
        const prevVirtualItemSizeBefore = state.virtualItemSizeBefore;
        const prevVirtualItemSizeAfter = state.virtualItemSizeAfter;
        const prevOutlineSizeBefore = state.outlineSizeBefore;
        const prevOutlineSizeAfter = state.outlineSizeAfter;
        const virtualItemSizeBefore = this.itemSize * virtualItemCountBefore;
        const virtualItemSizeAfter = this.itemSize * virtualItemCountAfter;
        const outlineSizeBefore = this.itemSize * outlineCountBefore;
        const outlineSizeAfter = this.itemSize * outlineCountAfter;
        const prevVirtualSizeBefore = prevVirtualItemSizeBefore + prevOutlineSizeBefore;
        const virtualSizeBefore = virtualItemSizeBefore + outlineSizeBefore;
        const prevVirtualSizeAfter = prevVirtualItemSizeAfter + prevOutlineSizeAfter;
        const virtualSizeAfter = virtualItemSizeAfter + outlineSizeAfter;
        const isAppend = prevVirtualSizeBefore < virtualSizeBefore;
        const isPrepend = prevVirtualSizeAfter < virtualSizeAfter;
        const needAddItems = this._itemSizeChanged || isAppend || isPrepend;
        if (needAddItems) {
            this._updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter)
        }
    }
    _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
        const {
            state: state
        } = this;
        state.virtualItemSizeBefore = virtualItemSizeBefore;
        state.virtualItemSizeAfter = virtualItemSizeAfter
    }
}
class VerticalVirtualScrolling extends VirtualScrollingBase {
    constructor(options) {
        super(_extends({}, options, {
            itemSize: options.rowHeight,
            viewportSize: options.viewportHeight
        }))
    }
    get prevTopPosition() {
        return this.state.prevPosition
    }
    get rowCount() {
        return this.state.itemCount
    }
    get topVirtualRowCount() {
        return this.state.virtualItemCountBefore
    }
    get bottomVirtualRowCount() {
        return this.state.virtualItemCountAfter
    }
    getTotalItemCount() {
        return this.options.getTotalRowCount(this.groupCount, this.isVerticalGrouping)
    }
    getRenderState() {
        return {
            topVirtualRowHeight: this.state.virtualItemSizeBefore,
            bottomVirtualRowHeight: this.state.virtualItemSizeAfter,
            startRowIndex: this.state.startIndex,
            rowCount: this.state.itemCount,
            startIndex: this.state.startIndex
        }
    }
}
class HorizontalVirtualScrolling extends VirtualScrollingBase {
    constructor(options) {
        super(_extends({}, options, {
            itemSize: options.cellWidth,
            viewportSize: options.viewportWidth
        }))
    }
    get isRTL() {
        return this.options.isRTL()
    }
    getTotalItemCount() {
        return this.options.getTotalCellCount(this.groupCount, this.isVerticalGrouping)
    }
    getRenderState() {
        return {
            leftVirtualCellWidth: this.state.virtualItemSizeBefore,
            rightVirtualCellWidth: this.state.virtualItemSizeAfter,
            startCellIndex: this.state.startIndex,
            cellCount: this.state.itemCount,
            cellWidth: this.itemSize
        }
    }
    _updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter) {
        if (!this.isRTL) {
            super._updateStateVirtualItems(virtualItemSizeBefore, virtualItemSizeAfter)
        } else {
            const {
                state: state
            } = this;
            state.virtualItemSizeAfter = virtualItemSizeBefore;
            state.virtualItemSizeBefore = virtualItemSizeAfter;
            state.startIndex = this.getTotalItemCount() - this.startIndex - this.state.itemCount
        }
    }
}
class VirtualScrollingRenderer {
    constructor(_workspace) {
        this._workspace = _workspace;
        this._renderAppointmentTimeoutID = null
    }
    getRenderTimeout() {
        return 15
    }
    get workspace() {
        return this._workspace
    }
    updateRender() {
        this._renderGrid();
        this._renderAppointments()
    }
    _renderGrid() {
        this.workspace.renderWorkSpace(false)
    }
    _renderAppointments() {
        const renderTimeout = this.getRenderTimeout();
        if (renderTimeout >= 0) {
            clearTimeout(this._renderAppointmentTimeoutID);
            this._renderAppointmentTimeoutID = setTimeout((() => this.workspace.updateAppointments()), renderTimeout)
        } else {
            this.workspace.updateAppointments()
        }
    }
}
exports.VirtualScrollingRenderer = VirtualScrollingRenderer;
