/**
 * DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/scrollable_a11y.js)
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
exports.keyboardNavigationScrollableA11yExtender = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _type = require("../../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const keyboardNavigationScrollableA11yExtender = Base => class extends Base {
    rowsViewFocusHandler(event) {
        const $target = (0, _renderer.default)(event.target);
        this.translateFocusIfNeed(event, $target);
        super.rowsViewFocusHandler(event)
    }
    rowsViewFocusOutHandler() {
        super.rowsViewFocusOutHandler();
        this.makeScrollableFocusableIfNeed()
    }
    translateFocusIfNeed(event, $target) {
        const needTranslateFocus = this.isScrollableNeedFocusable();
        const isFirstCellFixed = this._isFixedColumn(0);
        if (!needTranslateFocus || !isFirstCellFixed) {
            return
        }
        const $firstCell = this._rowsView.getCell({
            rowIndex: 0,
            columnIndex: 0
        });
        const firstCellHasTabIndex = !!$firstCell.attr("tabindex");
        const notFixedCellIsTarget = $target.is(this._$firstNotFixedCell);
        if (firstCellHasTabIndex && notFixedCellIsTarget) {
            event.preventDefault();
            this._focus($firstCell)
        }
    }
    renderCompleted(e) {
        this._$firstNotFixedCell = this.getFirstNotFixedCell();
        this.makeScrollableFocusableIfNeed();
        super.renderCompleted(e)
    }
    _focus($cell, disableFocus, skipFocusEvent) {
        super._focus($cell, disableFocus, skipFocusEvent);
        this.makeScrollableFocusableIfNeed()
    }
    _tabKeyHandler(eventArgs, isEditing) {
        const isCellPositionDefined = (0, _type.isDefined)(this._focusedCellPosition) && !(0, _type.isEmptyObject)(this._focusedCellPosition);
        const isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
        const isNeedFocusable = this.isScrollableNeedFocusable();
        if (isOriginalHandlerRequired && isNeedFocusable) {
            var _this$_$firstNotFixed;
            null === (_this$_$firstNotFixed = this._$firstNotFixedCell) || void 0 === _this$_$firstNotFixed || _this$_$firstNotFixed.removeAttr("tabIndex")
        }
        super._tabKeyHandler(eventArgs, isEditing)
    }
    getFirstNotFixedCell() {
        const columns = this._columnsController.getVisibleColumns();
        const columnIndex = columns.findIndex((_ref => {
            let {
                fixed: fixed
            } = _ref;
            return !fixed
        }));
        return -1 === columnIndex ? void 0 : this._rowsView._getCellElement(0, columnIndex)
    }
    isScrollableNeedFocusable() {
        var _this$_rowsView$_fixe, _this$_rowsView$getCe;
        const hasScrollable = !!this._rowsView.getScrollable();
        const hasFixedTable = !!(null !== (_this$_rowsView$_fixe = this._rowsView._fixedTableElement) && void 0 !== _this$_rowsView$_fixe && _this$_rowsView$_fixe.length);
        const isCellsRendered = !!(null !== (_this$_rowsView$getCe = this._rowsView.getCellElements(0)) && void 0 !== _this$_rowsView$getCe && _this$_rowsView$getCe.length);
        return hasScrollable && hasFixedTable && isCellsRendered
    }
    makeScrollableFocusableIfNeed() {
        const needFocusable = this.isScrollableNeedFocusable();
        if (!needFocusable || !this._$firstNotFixedCell) {
            return
        }
        this._applyTabIndexToElement(this._$firstNotFixedCell)
    }
};
exports.keyboardNavigationScrollableA11yExtender = keyboardNavigationScrollableA11yExtender;
