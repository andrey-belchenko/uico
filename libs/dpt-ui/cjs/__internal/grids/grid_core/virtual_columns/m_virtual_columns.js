/**
 * DevExtreme (cjs/__internal/grids/grid_core/virtual_columns/m_virtual_columns.js)
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
exports.virtualColumnsModule = void 0;
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_virtual_columns_core = require("./m_virtual_columns_core");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DEFAULT_COLUMN_WIDTH = 50;
const rowsView = Base => class extends Base {
    _resizeCore() {
        super._resizeCore.apply(this, arguments);
        this._columnsController.resize()
    }
    _handleScroll(e) {
        const scrollable = this.getScrollable();
        let {
            left: left
        } = e.scrollOffset;
        super._handleScroll.apply(this, arguments);
        if (this.option("rtlEnabled") && scrollable) {
            left = (0, _size.getWidth)(scrollable.$content()) - (0, _size.getWidth)(scrollable.$element()) - left
        }
        this._columnsController.setScrollPosition(left)
    }
    _renderCore(e) {
        if (null !== e && void 0 !== e && e.virtualColumnsScrolling) {
            var _this$_columnsControl, _this$_scrollable;
            const $contentElement = this._findContentElement();
            const fixedColumns = null === (_this$_columnsControl = this._columnsController) || void 0 === _this$_columnsControl ? void 0 : _this$_columnsControl.getFixedColumns();
            const useNativeScrolling = null === (_this$_scrollable = this._scrollable) || void 0 === _this$_scrollable ? void 0 : _this$_scrollable.option("useNative");
            if (null !== fixedColumns && void 0 !== fixedColumns && fixedColumns.length) {
                $contentElement.css({
                    minHeight: useNativeScrolling ? (0, _size.getHeight)($contentElement) : _m_utils.default.getContentHeightLimit(_browser.default)
                });
                const resizeCompletedHandler = () => {
                    this.resizeCompleted.remove(resizeCompletedHandler);
                    $contentElement.css({
                        minHeight: ""
                    })
                };
                this.resizeCompleted.add(resizeCompletedHandler)
            }
        }
        return super._renderCore.apply(this, arguments)
    }
};
const columnHeadersView = Base => class extends Base {
    _renderCore() {
        const deferred = super._renderCore.apply(this, arguments);
        if (this._columnsController.isVirtualMode()) {
            this._updateScrollLeftPosition()
        }
        return deferred
    }
};
const getWidths = function(columns) {
    return columns.map((column => column.visibleWidth || parseFloat(column.width) || 50))
};
const columns = Base => class extends Base {
    init() {
        super.init.apply(this, arguments);
        this._resizingController = this.getController("resizing");
        this._beginPageIndex = null;
        this._endPageIndex = null;
        this._position ?? (this._position = 0);
        this._virtualVisibleColumns = {}
    }
    dispose() {
        clearTimeout(this._changedTimeout);
        super.dispose.apply(this, arguments)
    }
    resetColumnsCache() {
        super.resetColumnsCache();
        this._virtualVisibleColumns = {}
    }
    getBeginPageIndex(position) {
        const visibleColumns = this.getVisibleColumns(void 0, true);
        const widths = getWidths(visibleColumns);
        let currentPosition = 0;
        for (let index = 0; index < widths.length; index++) {
            if (currentPosition >= position) {
                return Math.floor(index / this.getColumnPageSize())
            }
            currentPosition += widths[index]
        }
        return 0
    }
    getTotalWidth() {
        const width = this.option("width");
        if ("number" === typeof width) {
            return width
        }
        return this._resizingController._lastWidth || (0, _size.getOuterWidth)(this.component.$element())
    }
    getEndPageIndex(position) {
        const visibleColumns = this.getVisibleColumns(void 0, true);
        const widths = getWidths(visibleColumns);
        let currentPosition = 0;
        position += this.getTotalWidth();
        for (let index = 0; index < widths.length; index++) {
            if (currentPosition >= position) {
                return Math.ceil(index / this.getColumnPageSize())
            }
            currentPosition += widths[index]
        }
        return Math.ceil(widths.length / this.getColumnPageSize())
    }
    getColumnPageSize() {
        return this.option("scrolling.columnPageSize")
    }
    _fireColumnsChanged() {
        const date = new Date;
        this.columnsChanged.fire({
            optionNames: {
                all: true,
                length: 1
            },
            changeTypes: {
                columns: true,
                virtualColumnsScrolling: true,
                length: 2
            }
        });
        this._renderTime = new Date - date
    }
    getScrollingTimeout() {
        const renderingThreshold = this.option("scrolling.columnRenderingThreshold");
        const renderAsync = this.option("scrolling.renderAsync");
        let scrollingTimeout = 0;
        if (!(0, _type.isDefined)(renderAsync) && this._renderTime > renderingThreshold || renderAsync) {
            scrollingTimeout = this.option("scrolling.timeout")
        }
        return scrollingTimeout
    }
    setScrollPosition(position) {
        const scrollingTimeout = this.getScrollingTimeout();
        if (scrollingTimeout > 0) {
            clearTimeout(this._changedTimeout);
            this._changedTimeout = setTimeout((() => {
                this._setScrollPositionCore(position)
            }), scrollingTimeout)
        } else {
            this._setScrollPositionCore(position)
        }
    }
    isVirtualMode() {
        return (0, _window.hasWindow)() && "virtual" === this.option("scrolling.columnRenderingMode")
    }
    resize() {
        this._setScrollPositionCore(this._position)
    }
    _setScrollPositionCore(position) {
        const that = this;
        if (that.isVirtualMode()) {
            const beginPageIndex = that.getBeginPageIndex(position);
            const endPageIndex = that.getEndPageIndex(position);
            const needColumnsChanged = position < that._position ? that._beginPageIndex > beginPageIndex : that._endPageIndex < endPageIndex;
            that._position = position;
            if (needColumnsChanged) {
                that._beginPageIndex = beginPageIndex;
                that._endPageIndex = endPageIndex;
                that._fireColumnsChanged()
            }
        }
    }
    getFixedColumns(rowIndex, isBase) {
        const fixedColumns = super.getFixedColumns(rowIndex);
        if (this.isVirtualMode() && !isBase && fixedColumns.length) {
            const transparentColumnIndex = fixedColumns.map((c => c.command)).indexOf("transparent");
            fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - super.getFixedColumns().length + 1;
            return fixedColumns
        }
        return fixedColumns
    }
    _compileVisibleColumns(rowIndex, isBase) {
        var _this$_columns;
        if (isBase || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
            return super._compileVisibleColumns(rowIndex)
        }
        if (null !== (_this$_columns = this._columns) && void 0 !== _this$_columns && _this$_columns.length && !(0, _type.isDefined)(this._beginPageIndex) && !(0, _type.isDefined)(this._endPageIndex)) {
            this._beginPageIndex = this.getBeginPageIndex(this._position);
            this._endPageIndex = this.getEndPageIndex(this._position)
        }
        const beginPageIndex = this._beginPageIndex;
        const endPageIndex = this._endPageIndex;
        const visibleColumnsHash = `${rowIndex}-${beginPageIndex}-${endPageIndex}`;
        if (this._virtualVisibleColumns[visibleColumnsHash]) {
            return this._virtualVisibleColumns[visibleColumnsHash]
        }
        let visibleColumns = super._compileVisibleColumns();
        const rowCount = this.getRowCount();
        const pageSize = this.getColumnPageSize();
        let startIndex = beginPageIndex * pageSize;
        let endIndex = endPageIndex * pageSize;
        const fixedColumns = this.getFixedColumns(void 0, true);
        const transparentColumnIndex = fixedColumns.map((c => c.command)).indexOf("transparent");
        const beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
        let beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
        const beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
        const beginWidth = getWidths(beginColumns).reduce(((a, b) => a + b), 0);
        if (!beginWidth) {
            startIndex = 0
        }
        const endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
        let endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
        const endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
        const endWidth = getWidths(endColumns).reduce(((a, b) => a + b), 0);
        if (!endWidth) {
            endIndex = visibleColumns.length
        }
        if (rowCount > 1 && "number" === typeof rowIndex) {
            const columnsInfo = [];
            for (let i = 0; i <= rowCount; i++) {
                columnsInfo.push(super._compileVisibleColumns(i))
            }
            beginFixedColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
            endFixedColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
            visibleColumns = (0, _m_virtual_columns_core.createColumnsInfo)(columnsInfo, startIndex, endIndex)[rowIndex] || []
        } else {
            visibleColumns = visibleColumns.slice(startIndex, endIndex)
        }
        if (beginWidth) {
            visibleColumns.unshift({
                command: "virtual",
                type: "virtual",
                width: beginWidth
            });
            visibleColumns = beginFixedColumns.concat(visibleColumns)
        }
        if (endWidth) {
            visibleColumns.push({
                command: "virtual",
                type: "virtual",
                width: endWidth
            });
            visibleColumns = visibleColumns.concat(endFixedColumns)
        }
        this._virtualVisibleColumns[visibleColumnsHash] = visibleColumns;
        return visibleColumns
    }
    getColumnIndexOffset() {
        let offset = 0;
        if (this._beginPageIndex > 0) {
            const fixedColumns = this.getFixedColumns();
            const transparentColumnIndex = fixedColumns.map((c => c.command)).indexOf("transparent");
            const leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
            offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1
        }
        return offset > 0 ? offset : 0
    }
};
const virtualColumnsModule = exports.virtualColumnsModule = {
    defaultOptions: () => ({
        scrolling: {
            columnRenderingMode: "standard",
            columnPageSize: 5,
            columnRenderingThreshold: 300
        }
    }),
    extenders: {
        controllers: {
            columns: columns
        },
        views: {
            columnHeadersView: columnHeadersView,
            rowsView: rowsView
        }
    }
};
