/**
 * DevExtreme (esm/__internal/grids/grid_core/keyboard_navigation/m_keyboard_navigation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    noop
} from "../../../../core/utils/common";
import domAdapter from "../../../../core/dom_adapter";
import {
    getPublicElement
} from "../../../../core/element";
import $ from "../../../../core/renderer";
import browser from "../../../../core/utils/browser";
import {
    Deferred,
    when
} from "../../../../core/utils/deferred";
import {
    getHeight,
    getOuterHeight,
    getOuterWidth,
    getWidth
} from "../../../../core/utils/size";
import {
    isDeferred,
    isDefined,
    isEmptyObject
} from "../../../../core/utils/type";
import {
    name as clickEventName
} from "../../../../events/click";
import eventsEngine from "../../../../events/core/events_engine";
import pointerEvents from "../../../../events/pointer";
import {
    keyboard
} from "../../../../events/short";
import {
    addNamespace,
    createEvent,
    isCommandKeyPressed
} from "../../../../events/utils/index";
import * as accessibility from "../../../../ui/shared/accessibility";
import {
    focused
} from "../../../../ui/widget/selectors";
import {
    memoize
} from "../../../utils/memoize";
import {
    EDIT_FORM_CLASS,
    EDIT_MODE_BATCH,
    EDIT_MODE_CELL,
    EDIT_MODE_FORM,
    EDIT_MODE_ROW,
    EDITOR_CELL_CLASS,
    FOCUSABLE_ELEMENT_SELECTOR,
    ROW_CLASS
} from "../editing/const";
import modules from "../m_modules";
import gridCoreUtils from "../m_utils";
import {
    ADAPTIVE_COLUMN_NAME_CLASS,
    CELL_FOCUS_DISABLED_CLASS,
    COLUMN_HEADERS_VIEW,
    COMMAND_CELL_SELECTOR,
    COMMAND_EDIT_CLASS,
    COMMAND_EXPAND_CLASS,
    COMMAND_SELECT_CLASS,
    DATA_ROW_CLASS,
    DATEBOX_WIDGET_NAME,
    DROPDOWN_EDITOR_OVERLAY_CLASS,
    EDIT_FORM_ITEM_CLASS,
    FAST_EDITING_DELETE_KEY,
    FOCUS_STATE_CLASS,
    FOCUS_TYPE_CELL,
    FOCUS_TYPE_ROW,
    FOCUSED_CLASS,
    FREESPACE_ROW_CLASS,
    FUNCTIONAL_KEYS,
    INTERACTIVE_ELEMENTS_SELECTOR,
    MASTER_DETAIL_CELL_CLASS,
    NON_FOCUSABLE_ELEMENTS_SELECTOR,
    REVERT_BUTTON_CLASS,
    ROWS_VIEW_CLASS,
    WIDGET_CLASS
} from "./const";
import {
    GridCoreKeyboardNavigationDom
} from "./dom";
import {
    isCellInHeaderRow,
    isDataRow,
    isDetailRow,
    isEditForm,
    isEditorCell,
    isElementDefined,
    isFixedColumnIndexOffsetRequired,
    isGroupFooterRow,
    isGroupRow,
    isMobile,
    isNotFocusedRow,
    shouldPreventScroll
} from "./m_keyboard_navigation_utils";
import {
    keyboardNavigationScrollableA11yExtender
} from "./scrollable_a11y";
export class KeyboardNavigationController extends modules.ViewController {
    init() {
        this._dataController = this.getController("data");
        this._selectionController = this.getController("selection");
        this._editingController = this.getController("editing");
        this._headerPanel = this.getView("headerPanel");
        this._rowsView = this.getView("rowsView");
        this._columnsController = this.getController("columns");
        this._editorFactory = this.getController("editorFactory");
        this._focusController = this.getController("focus");
        this._adaptiveColumnsController = this.getController("adaptiveColumns");
        this._columnResizerController = this.getController("columnsResizer");
        this._memoFireFocusedCellChanged = memoize(this._memoFireFocusedCellChanged.bind(this), {
            compareType: "value"
        });
        this._memoFireFocusedRowChanged = memoize(this._memoFireFocusedRowChanged.bind(this), {
            compareType: "value"
        });
        this.focusedHandlerWithContext = this.focusedHandlerWithContext || this.focusedHandler.bind(this);
        this.renderCompletedWithContext = this.renderCompletedWithContext || this.renderCompleted.bind(this);
        this.rowsViewFocusHandlerContext = this.rowsViewFocusHandlerContext || this.rowsViewFocusHandler.bind(this);
        this.rowsViewFocusOutHandlerContext = this.rowsViewFocusOutHandlerContext ?? this.rowsViewFocusOutHandler.bind(this);
        this._updateFocusTimeout = null;
        this._fastEditingStarted = false;
        this._focusedCellPosition = {};
        this._canceledCellPosition = null;
        if (this.isKeyboardEnabled()) {
            var _this$_editorFactory;
            accessibility.subscribeVisibilityChange();
            null === (_this$_editorFactory = this._editorFactory) || void 0 === _this$_editorFactory || _this$_editorFactory.focused.add(this.focusedHandlerWithContext);
            this.createAction("onKeyDown")
        } else {
            var _this$_editorFactory2;
            accessibility.unsubscribeVisibilityChange();
            null === (_this$_editorFactory2 = this._editorFactory) || void 0 === _this$_editorFactory2 || _this$_editorFactory2.focused.remove(this.focusedHandlerWithContext)
        }
        this.initViewHandlers();
        this.initDocumentHandlers()
    }
    dispose() {
        super.dispose();
        this._resetFocusedView();
        keyboard.off(this._keyDownListener);
        eventsEngine.off(domAdapter.getDocument(), addNamespace(pointerEvents.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler);
        clearTimeout(this._updateFocusTimeout);
        accessibility.unsubscribeVisibilityChange()
    }
    focusedHandler($element) {
        this.setupFocusedView();
        if (this._isNeedScroll) {
            if ($element.is(":visible") && this._focusedView && this._focusedView.getScrollable()) {
                this._focusedView._scrollToElement($element);
                this._isNeedScroll = false
            }
        }
    }
    rowsViewFocusHandler(event) {
        const $element = $(event.target);
        const isRelatedTargetInRowsView = $(event.relatedTarget).closest(this._rowsView.element()).length;
        const isLink = $element.is("a");
        if (event.relatedTarget && isLink && !isRelatedTargetInRowsView && this._isEventInCurrentGrid(event)) {
            let $focusedCell = this._getFocusedCell();
            $focusedCell = !isElementDefined($focusedCell) ? this._rowsView.getCellElements(0).filter("[tabindex]").eq(0) : $focusedCell;
            if (!$element.closest($focusedCell).length) {
                event.preventDefault();
                eventsEngine.trigger($focusedCell, "focus")
            }
        }
        const isCell = $element.is("td");
        const needSetFocusPosition = (this.option("focusedRowIndex") ?? -1) < 0;
        if (isCell && needSetFocusPosition) {
            this._updateFocusedCellPosition($element)
        }
    }
    rowsViewFocusOutHandler() {
        this._toggleInertAttr(false)
    }
    subscribeToRowsViewFocusEvent() {
        var _this$_rowsView;
        const $rowsView = null === (_this$_rowsView = this._rowsView) || void 0 === _this$_rowsView ? void 0 : _this$_rowsView.element();
        eventsEngine.on($rowsView, "focusin", this.rowsViewFocusHandlerContext);
        eventsEngine.on($rowsView, "focusout", this.rowsViewFocusOutHandlerContext)
    }
    unsubscribeFromRowsViewFocusEvent() {
        var _this$_rowsView2;
        const $rowsView = null === (_this$_rowsView2 = this._rowsView) || void 0 === _this$_rowsView2 ? void 0 : _this$_rowsView2.element();
        eventsEngine.off($rowsView, "focusin", this.rowsViewFocusHandlerContext);
        eventsEngine.off($rowsView, "focusout", this.rowsViewFocusOutHandlerContext)
    }
    renderCompleted(e) {
        const $rowsView = this._rowsView.element();
        const isFullUpdate = !e || "refresh" === e.changeType;
        const isFocusedViewCorrect = this._focusedView && this._focusedView.name === this._rowsView.name;
        let needUpdateFocus = false;
        const isAppend = e && ("append" === e.changeType || "prepend" === e.changeType);
        const root = $(domAdapter.getRootNode($rowsView.get && $rowsView.get(0)));
        const $focusedElement = root.find(":focus");
        const isFocusedElementCorrect = !$focusedElement.length || $focusedElement.closest($rowsView).length;
        this.unsubscribeFromRowsViewFocusEvent();
        this.subscribeToRowsViewFocusEvent();
        this.initPointerEventHandler();
        this.initKeyDownHandler();
        this._setRowsViewAttributes();
        if (isFocusedViewCorrect && isFocusedElementCorrect) {
            needUpdateFocus = this._isNeedFocus ? !isAppend : this._isHiddenFocus && isFullUpdate && !(null !== e && void 0 !== e && e.virtualColumnsScrolling);
            needUpdateFocus && this._updateFocus(true)
        }
    }
    initViewHandlers() {
        var _this$_rowsView3;
        this.unsubscribeFromRowsViewFocusEvent();
        this.unsubscribeFromPointerEvent();
        this.unsubscribeFromKeyDownEvent();
        null === (_this$_rowsView3 = this._rowsView) || void 0 === _this$_rowsView3 || null === (_this$_rowsView3 = _this$_rowsView3.renderCompleted) || void 0 === _this$_rowsView3 || _this$_rowsView3.remove(this.renderCompletedWithContext);
        if (this.isKeyboardEnabled()) {
            this._rowsView.renderCompleted.add(this.renderCompletedWithContext)
        }
    }
    initDocumentHandlers() {
        const document = domAdapter.getDocument();
        this._documentClickHandler = this._documentClickHandler || this.createAction((e => {
            const $target = $(e.event.target);
            const isCurrentRowsViewClick = this._isEventInCurrentGrid(e.event) && $target.closest(`.${this.addWidgetPrefix(ROWS_VIEW_CLASS)}`).length;
            const isEditorOverlay = $target.closest(`.${DROPDOWN_EDITOR_OVERLAY_CLASS}`).length;
            const isColumnResizing = !!this._columnResizerController && this._columnResizerController.isResizing();
            if (!isCurrentRowsViewClick && !isEditorOverlay && !isColumnResizing) {
                const targetInsideFocusedView = this._focusedView ? $target.parents().filter(this._focusedView.element()).length > 0 : false;
                !targetInsideFocusedView && this._resetFocusedCell(true);
                this._resetFocusedView()
            }
        }));
        eventsEngine.off(document, addNamespace(pointerEvents.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler);
        if (this.isKeyboardEnabled()) {
            eventsEngine.on(document, addNamespace(pointerEvents.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler)
        }
    }
    _setRowsViewAttributes() {
        const $rowsView = this._getRowsViewElement();
        const isGridEmpty = !this._dataController.getVisibleRows().length;
        if (isGridEmpty) {
            this._applyTabIndexToElement($rowsView)
        }
    }
    unsubscribeFromPointerEvent() {
        const pointerEventName = !isMobile() ? pointerEvents.down : clickEventName;
        const $rowsView = this._getRowsViewElement();
        this._pointerEventAction && eventsEngine.off($rowsView, addNamespace(pointerEventName, "dxDataGridKeyboardNavigation"), this._pointerEventAction)
    }
    subscribeToPointerEvent() {
        const pointerEventName = !isMobile() ? pointerEvents.down : clickEventName;
        const $rowsView = this._getRowsViewElement();
        const clickSelector = `.${ROW_CLASS} > td, .${ROW_CLASS}`;
        eventsEngine.on($rowsView, addNamespace(pointerEventName, "dxDataGridKeyboardNavigation"), clickSelector, this._pointerEventAction)
    }
    initPointerEventHandler() {
        this._pointerEventAction = this._pointerEventAction || this.createAction(this._pointerEventHandler);
        this.unsubscribeFromPointerEvent();
        this.subscribeToPointerEvent()
    }
    unsubscribeFromKeyDownEvent() {
        keyboard.off(this._keyDownListener)
    }
    subscribeToKeyDownEvent() {
        const $rowsView = this._getRowsViewElement();
        this._keyDownListener = keyboard.on($rowsView, null, (e => this._keyDownHandler(e)))
    }
    initKeyDownHandler() {
        this._keyDownListener && this.unsubscribeFromKeyDownEvent();
        this.subscribeToKeyDownEvent()
    }
    optionChanged(args) {
        switch (args.name) {
            case "keyboardNavigation":
                if ("keyboardNavigation.enabled" === args.fullName) {
                    this.init()
                }
                args.handled = true;
                break;
            case "useLegacyKeyboardNavigation":
                this.init();
                args.handled = true;
                break;
            default:
                super.optionChanged(args)
        }
    }
    isRowFocusType() {
        return this.focusType === FOCUS_TYPE_ROW
    }
    isCellFocusType() {
        return this.focusType === FOCUS_TYPE_CELL
    }
    setRowFocusType() {
        if (this.option("focusedRowEnabled")) {
            this.focusType = FOCUS_TYPE_ROW
        }
    }
    setCellFocusType() {
        this.focusType = FOCUS_TYPE_CELL
    }
    _keyDownHandler(e) {
        var _this$_editingControl;
        let needStopPropagation = true;
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        let isHandled = this._processOnKeyDown(e);
        const isEditing = null === (_this$_editingControl = this._editingController) || void 0 === _this$_editingControl ? void 0 : _this$_editingControl.isEditing();
        const {
            originalEvent: originalEvent
        } = e;
        if (originalEvent.isDefaultPrevented()) {
            this._isNeedFocus = false;
            this._isNeedScroll = false;
            return
        }!FUNCTIONAL_KEYS.includes(e.keyName) && this._updateFocusedCellPositionByTarget(originalEvent.target);
        if (!isHandled) {
            switch (e.keyName) {
                case "leftArrow":
                case "rightArrow":
                    this._leftRightKeysHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "upArrow":
                case "downArrow":
                    if (e.ctrl) {
                        accessibility.selectView("rowsView", this, originalEvent)
                    } else {
                        this._upDownKeysHandler(e, isEditing)
                    }
                    isHandled = true;
                    break;
                case "pageUp":
                case "pageDown":
                    this._pageUpDownKeyHandler(e);
                    isHandled = true;
                    break;
                case "space":
                    isHandled = this._spaceKeyHandler(e, isEditing);
                    break;
                case "A":
                    if (isCommandKeyPressed(e.originalEvent)) {
                        this._ctrlAKeyHandler(e, isEditing);
                        isHandled = true
                    } else {
                        isHandled = this._beginFastEditing(e.originalEvent)
                    }
                    break;
                case "tab":
                    this._tabKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "enter":
                    this._enterKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "escape":
                    isHandled = this._escapeKeyHandler(e, isEditing);
                    break;
                case "F":
                    if (isCommandKeyPressed(e.originalEvent)) {
                        this._ctrlFKeyHandler(e);
                        isHandled = true
                    } else {
                        isHandled = this._beginFastEditing(e.originalEvent)
                    }
                    break;
                case "F2":
                    this._f2KeyHandler();
                    isHandled = true;
                    break;
                case "del":
                case "backspace":
                    if (this._isFastEditingAllowed() && !this._isFastEditingStarted()) {
                        isHandled = this._beginFastEditing(originalEvent, true)
                    }
            }
            if (!isHandled && !this._beginFastEditing(originalEvent)) {
                this._isNeedFocus = false;
                this._isNeedScroll = false;
                needStopPropagation = false
            }
            if (needStopPropagation) {
                originalEvent.stopPropagation()
            }
        }
    }
    _processOnKeyDown(eventArgs) {
        const {
            originalEvent: originalEvent
        } = eventArgs;
        const args = {
            handled: false,
            event: originalEvent
        };
        this.executeAction("onKeyDown", args);
        eventArgs.ctrl = originalEvent.ctrlKey;
        eventArgs.alt = originalEvent.altKey;
        eventArgs.shift = originalEvent.shiftKey;
        return !!args.handled
    }
    _closeEditCell() {
        setTimeout((() => {
            this._editingController.closeEditCell()
        }))
    }
    _leftRightKeysHandler(eventArgs, isEditing) {
        const rowIndex = this.getVisibleRowIndex();
        const $event = eventArgs.originalEvent;
        const $row = this._focusedView && this._focusedView.getRow(rowIndex);
        const directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
        const isEditingNavigationMode = this._isFastEditingStarted();
        const allowNavigate = (!isEditing || isEditingNavigationMode) && isDataRow($row);
        if (allowNavigate) {
            this.setCellFocusType();
            isEditingNavigationMode && this._closeEditCell();
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(directionCode)
            }
            const $cell = this._getNextCell(directionCode);
            if (isElementDefined($cell)) {
                this._arrowKeysHandlerFocusCell($event, $cell, directionCode)
            }
            $event && $event.preventDefault()
        }
    }
    isInsideMasterDetail($target) {
        const $masterDetail = $target.closest(`.${MASTER_DETAIL_CELL_CLASS}`);
        return !!$masterDetail.get(0) && this.elementIsInsideGrid($masterDetail) && !$target.is($masterDetail)
    }
    _upDownKeysHandler(eventArgs, isEditing) {
        var _this$_editingControl2, _this$_editingControl3;
        const visibleRowIndex = this.getVisibleRowIndex();
        const $row = this._focusedView && this._focusedView.getRow(visibleRowIndex);
        const $event = eventArgs.originalEvent;
        const isUpArrow = "upArrow" === eventArgs.keyName;
        const dataSource = this._dataController.dataSource();
        const isRowEditingInCurrentRow = null === (_this$_editingControl2 = this._editingController) || void 0 === _this$_editingControl2 || null === (_this$_editingControl3 = _this$_editingControl2.isEditRowByIndex) || void 0 === _this$_editingControl3 ? void 0 : _this$_editingControl3.call(_this$_editingControl2, visibleRowIndex);
        const isEditingNavigationMode = this._isFastEditingStarted();
        const isInsideMasterDetail = this.isInsideMasterDetail($(null === $event || void 0 === $event ? void 0 : $event.target));
        const allowNavigate = (!isRowEditingInCurrentRow || !isEditing || isEditingNavigationMode) && $row && !isEditForm($row) && !isInsideMasterDetail;
        if (allowNavigate) {
            isEditingNavigationMode && this._closeEditCell();
            if (!this._navigateNextCell($event, eventArgs.keyName)) {
                if (this._isVirtualRowRender() && isUpArrow && dataSource && !dataSource.isLoading()) {
                    const rowHeight = getOuterHeight($row);
                    const rowIndex = this._focusedCellPosition.rowIndex - 1;
                    this._scrollBy(0, -rowHeight, rowIndex, $event)
                }
            }
            $event && $event.preventDefault()
        }
    }
    _pageUpDownKeyHandler(eventArgs) {
        const pageIndex = this._dataController.pageIndex();
        const pageCount = this._dataController.pageCount();
        const pagingEnabled = this.option("paging.enabled");
        const isPageUp = "pageUp" === eventArgs.keyName;
        const pageStep = isPageUp ? -1 : 1;
        const scrollable = this._rowsView.getScrollable();
        if (pagingEnabled && !this._isVirtualScrolling()) {
            if ((isPageUp ? pageIndex > 0 : pageIndex < pageCount - 1) && !this._isVirtualScrolling()) {
                this._dataController.pageIndex(pageIndex + pageStep);
                eventArgs.originalEvent.preventDefault()
            }
        } else if (scrollable && getHeight(scrollable.container()) < getHeight(scrollable.$content())) {
            this._scrollBy(0, getHeight(scrollable.container()) * pageStep);
            eventArgs.originalEvent.preventDefault()
        }
    }
    _spaceKeyHandler(eventArgs, isEditing) {
        const rowIndex = this.getVisibleRowIndex();
        const $target = $(eventArgs.originalEvent && eventArgs.originalEvent.target);
        if (this.option("selection") && "none" !== this.option("selection").mode && !isEditing) {
            const isFocusedRowElement = "row" === this._getElementType($target) && this.isRowFocusType() && isDataRow($target);
            const isFocusedSelectionCell = $target.hasClass(COMMAND_SELECT_CLASS);
            if (isFocusedSelectionCell && "onClick" === this.option("selection.showCheckBoxesMode")) {
                this._selectionController.startSelectionWithCheckboxes()
            }
            if (isFocusedRowElement || $target.parent().hasClass(DATA_ROW_CLASS) || $target.hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
                this._selectionController.changeItemSelection(rowIndex, {
                    shift: eventArgs.shift,
                    control: eventArgs.ctrl
                });
                eventArgs.originalEvent.preventDefault();
                return true
            }
            return false
        }
        return this._beginFastEditing(eventArgs.originalEvent)
    }
    _ctrlAKeyHandler(eventArgs, isEditing) {
        if (!isEditing && !eventArgs.alt && "multiple" === this.option("selection.mode") && this.option("selection.allowSelectAll")) {
            this._selectionController.selectAll();
            eventArgs.originalEvent.preventDefault()
        }
    }
    _toggleInertAttr(value) {}
    _tabKeyHandler(eventArgs, isEditing) {
        const editingOptions = this.option("editing");
        const direction = eventArgs.shift ? "previous" : "next";
        const isCellPositionDefined = isDefined(this._focusedCellPosition) && !isEmptyObject(this._focusedCellPosition);
        const isFirstValidCell = eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
        const isLastValidCell = !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition);
        let isOriginalHandlerRequired = !isCellPositionDefined || isFirstValidCell || isLastValidCell;
        const eventTarget = eventArgs.originalEvent.target;
        const focusedViewElement = this._focusedView && this._focusedView.element();
        if (this._handleTabKeyOnMasterDetailCell(eventTarget, direction)) {
            return
        }
        $(focusedViewElement).addClass(FOCUS_STATE_CLASS);
        if (editingOptions && eventTarget && !isOriginalHandlerRequired) {
            if ($(eventTarget).hasClass(this.addWidgetPrefix(ROWS_VIEW_CLASS))) {
                this._resetFocusedCell()
            }
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(direction)
            }
            if (isEditing) {
                if (!this._editingCellTabHandler(eventArgs, direction)) {
                    return
                }
            } else if (this._targetCellTabHandler(eventArgs, direction)) {
                isOriginalHandlerRequired = true
            }
        }
        if (isOriginalHandlerRequired) {
            if (isLastValidCell) {
                this._toggleInertAttr(true)
            }
            this._editorFactory.loseFocus();
            if (this._editingController.isEditing() && !this._isRowEditMode()) {
                this._resetFocusedCell(true);
                this._resetFocusedView();
                this._closeEditCell()
            }
        } else {
            eventArgs.originalEvent.preventDefault()
        }
    }
    _getMaxHorizontalOffset() {
        const scrollable = this.component.getScrollable();
        return scrollable ? scrollable.scrollWidth() - getWidth(this._rowsView.element()) : 0
    }
    _isColumnRendered(columnIndex) {
        const allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        const renderedVisibleColumns = this._columnsController.getVisibleColumns();
        const column = allVisibleColumns[columnIndex];
        let result = false;
        if (column) {
            result = renderedVisibleColumns.indexOf(column) >= 0
        }
        return result
    }
    _isFixedColumn(columnIndex) {
        const allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        const column = allVisibleColumns[columnIndex];
        return !!column && !!column.fixed
    }
    _isColumnVirtual(columnIndex) {
        const localColumnIndex = columnIndex - this._columnsController.getColumnIndexOffset();
        const visibleColumns = this._columnsController.getVisibleColumns();
        const column = visibleColumns[localColumnIndex];
        return !!column && "virtual" === column.command
    }
    _processVirtualHorizontalPosition(direction) {
        const scrollable = this.component.getScrollable();
        const columnIndex = this.getColumnIndex();
        let nextColumnIndex;
        let horizontalScrollPosition = 0;
        let needToScroll = false;
        switch (direction) {
            case "next":
            case "nextInRow": {
                const columnsCount = this._getVisibleColumnCount();
                nextColumnIndex = columnIndex + 1;
                horizontalScrollPosition = this.option("rtlEnabled") ? this._getMaxHorizontalOffset() : 0;
                if ("next" === direction) {
                    needToScroll = columnsCount === nextColumnIndex || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                } else {
                    needToScroll = columnsCount > nextColumnIndex && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                }
                break
            }
            case "previous":
            case "previousInRow":
                nextColumnIndex = columnIndex - 1;
                horizontalScrollPosition = this.option("rtlEnabled") ? 0 : this._getMaxHorizontalOffset();
                if ("previous" === direction) {
                    const columnIndexOffset = this._columnsController.getColumnIndexOffset();
                    const leftEdgePosition = nextColumnIndex < 0 && 0 === columnIndexOffset;
                    needToScroll = leftEdgePosition || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                } else {
                    needToScroll = nextColumnIndex >= 0 && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                }
        }
        if (needToScroll) {
            scrollable.scrollTo({
                left: horizontalScrollPosition
            })
        } else if (isDefined(nextColumnIndex) && isDefined(direction) && this._isColumnVirtual(nextColumnIndex)) {
            horizontalScrollPosition = this._getHorizontalScrollPositionOffset(direction);
            0 !== horizontalScrollPosition && scrollable.scrollBy({
                left: horizontalScrollPosition,
                top: 0
            })
        }
    }
    _getHorizontalScrollPositionOffset(direction) {
        let positionOffset = 0;
        const $currentCell = this._getCell(this._focusedCellPosition);
        const currentCellWidth = $currentCell && getOuterWidth($currentCell);
        if (currentCellWidth > 0) {
            const rtlMultiplier = this.option("rtlEnabled") ? -1 : 1;
            positionOffset = "nextInRow" === direction || "next" === direction ? currentCellWidth * rtlMultiplier : currentCellWidth * rtlMultiplier * -1
        }
        return positionOffset
    }
    _editingCellTabHandler(eventArgs, direction) {
        const eventTarget = eventArgs.originalEvent.target;
        let $cell = this._getCellElementFromTarget(eventTarget);
        let isEditingAllowed;
        const $event = eventArgs.originalEvent;
        const elementType = this._getElementType(eventTarget);
        if ($cell.is(COMMAND_CELL_SELECTOR)) {
            return !this._targetCellTabHandler(eventArgs, direction)
        }
        this._updateFocusedCellPosition($cell);
        const nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
        $cell = nextCellInfo.$cell;
        if (!$cell || this._handleTabKeyOnMasterDetailCell($cell, direction)) {
            return false
        }
        const column = this._getColumnByCellElement($cell);
        const $row = $cell.parent();
        const rowIndex = this._getRowIndex($row);
        const row = this._dataController.items()[rowIndex];
        const editingController = this._editingController;
        if (column && column.allowEditing) {
            const isDataRow = !row || "data" === row.rowType;
            isEditingAllowed = editingController.allowUpdating({
                row: row
            }) ? isDataRow : row && row.isNewRow
        }
        if (!isEditingAllowed) {
            this._closeEditCell()
        }
        if (this._focusCell($cell, !nextCellInfo.isHighlighted)) {
            if (!this._isRowEditMode() && isEditingAllowed) {
                this._editFocusedCell()
            } else {
                this._focusInteractiveElement($cell, eventArgs.shift)
            }
        }
        return true
    }
    _targetCellTabHandler(eventArgs, direction) {
        const $event = eventArgs.originalEvent;
        let eventTarget = $event.target;
        let elementType = this._getElementType(eventTarget);
        let $cell = this._getCellElementFromTarget(eventTarget);
        const $lastInteractiveElement = "cell" === elementType && this._getInteractiveElement($cell, !eventArgs.shift);
        let isOriginalHandlerRequired = false;
        if (!isEditorCell(this, $cell) && null !== $lastInteractiveElement && void 0 !== $lastInteractiveElement && $lastInteractiveElement.length && eventTarget !== $lastInteractiveElement.get(0)) {
            isOriginalHandlerRequired = true
        } else {
            if (void 0 === this._focusedCellPosition.rowIndex && $(eventTarget).hasClass(ROW_CLASS)) {
                this._updateFocusedCellPosition($cell)
            }
            elementType = this._getElementType(eventTarget);
            if (this.isRowFocusType()) {
                this.setCellFocusType();
                if ("row" === elementType && isDataRow($(eventTarget))) {
                    eventTarget = this.getFirstValidCellInRow($(eventTarget));
                    elementType = this._getElementType(eventTarget)
                }
            }
            const nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
            $cell = nextCellInfo.$cell;
            if (!$cell) {
                return false
            }
            $cell = this._checkNewLineTransition($event, $cell);
            if (!$cell) {
                return false
            }
            this._focusCell($cell, !nextCellInfo.isHighlighted);
            if (!isEditorCell(this, $cell)) {
                this._focusInteractiveElement($cell, eventArgs.shift)
            }
        }
        return isOriginalHandlerRequired
    }
    _getNextCellByTabKey($event, direction, elementType) {
        let $cell = this._getNextCell(direction, elementType);
        const args = $cell && this._fireFocusedCellChanging($event, $cell, true);
        if (!args || args.cancel) {
            return {}
        }
        if (args.$newCellElement) {
            $cell = args.$newCellElement
        }
        return {
            $cell: $cell,
            isHighlighted: args.isHighlighted
        }
    }
    _checkNewLineTransition($event, $cell) {
        const rowIndex = this.getVisibleRowIndex();
        const $row = $cell.parent();
        if (rowIndex !== this._getRowIndex($row)) {
            const cellPosition = this._getCellPosition($cell);
            const args = this._fireFocusedRowChanging($event, $row);
            if (args.cancel) {
                return
            }
            if (args.rowIndexChanged && cellPosition) {
                this.setFocusedColumnIndex(cellPosition.columnIndex);
                $cell = this._getFocusedCell()
            }
        }
        return $cell
    }
    _enterKeyHandler(eventArgs, isEditing) {
        var _this$_focusedView, _this$getMasterDetail;
        const rowIndex = this.getVisibleRowIndex();
        const key = this._dataController.getKeyByRowIndex(rowIndex);
        const $row = null === (_this$_focusedView = this._focusedView) || void 0 === _this$_focusedView ? void 0 : _this$_focusedView.getRow(rowIndex);
        const $cell = this._getFocusedCell();
        const needExpandGroupRow = this.option("grouping.allowCollapsing") && isGroupRow($row);
        const needExpandMasterDetailRow = this.option("masterDetail.enabled") && (null === $cell || void 0 === $cell ? void 0 : $cell.hasClass(COMMAND_EXPAND_CLASS));
        const needExpandAdaptiveRow = null === $cell || void 0 === $cell ? void 0 : $cell.hasClass(ADAPTIVE_COLUMN_NAME_CLASS);
        if (needExpandGroupRow || needExpandMasterDetailRow) {
            const item = this._dataController.items()[rowIndex];
            const isNotContinuation = (null === item || void 0 === item ? void 0 : item.data) && !item.data.isContinuation;
            if (isDefined(key) && isNotContinuation) {
                this._dataController.changeRowExpand(key)
            }
        } else if (needExpandAdaptiveRow) {
            this._adaptiveColumnsController.toggleExpandAdaptiveDetailRow(key);
            this._updateFocusedCellPosition($cell)
        } else if (null !== (_this$getMasterDetail = this.getMasterDetailCell($cell)) && void 0 !== _this$getMasterDetail && _this$getMasterDetail.is($cell)) {
            this.focusFirstInteractiveElementInside($cell)
        } else if (!(null !== $cell && void 0 !== $cell && $cell.hasClass(COMMAND_EDIT_CLASS))) {
            this._processEnterKeyForDataCell(eventArgs, isEditing)
        }
    }
    focusFirstInteractiveElementInside($el) {
        $el.find(INTERACTIVE_ELEMENTS_SELECTOR).get(0).focus()
    }
    _processEnterKeyForDataCell(eventArgs, isEditing) {
        const direction = this._getEnterKeyDirection(eventArgs);
        const allowEditingOnEnterKey = this._allowEditingOnEnterKey();
        if (isEditing || !allowEditingOnEnterKey && direction) {
            this._handleEnterKeyEditingCell(eventArgs.originalEvent);
            if ("next" === direction || "previous" === direction) {
                this._targetCellTabHandler(eventArgs, direction)
            } else if ("upArrow" === direction || "downArrow" === direction) {
                this._navigateNextCell(eventArgs.originalEvent, direction)
            }
        } else if (allowEditingOnEnterKey) {
            this._startEditing(eventArgs)
        }
    }
    _getEnterKeyDirection(eventArgs) {
        const enterKeyDirection = this.option("keyboardNavigation.enterKeyDirection");
        const isShift = eventArgs.shift;
        if ("column" === enterKeyDirection) {
            return isShift ? "upArrow" : "downArrow"
        }
        if ("row" === enterKeyDirection) {
            return isShift ? "previous" : "next"
        }
        return
    }
    _handleEnterKeyEditingCell(event) {
        const {
            target: target
        } = event;
        const $cell = this._getCellElementFromTarget(target);
        const isRowEditMode = this._isRowEditMode();
        this._updateFocusedCellPosition($cell);
        if (isRowEditMode) {
            this._focusEditFormCell($cell);
            setTimeout(this._editingController.saveEditData.bind(this._editingController))
        } else {
            eventsEngine.trigger($(target), "change");
            this._closeEditCell();
            event.preventDefault()
        }
    }
    _escapeKeyHandler(eventArgs, isEditing) {
        const $cell = this._getCellElementFromTarget(eventArgs.originalEvent.target);
        if (isEditing) {
            this._updateFocusedCellPosition($cell);
            if (!this._isRowEditMode()) {
                if ("cell" === this._editingController.getEditMode()) {
                    this._editingController.cancelEditData()
                } else {
                    this._closeEditCell()
                }
            } else {
                this._focusEditFormCell($cell);
                this._editingController.cancelEditData();
                if (0 === this._dataController.items().length) {
                    this._resetFocusedCell();
                    this._editorFactory.loseFocus()
                }
            }
            eventArgs.originalEvent.preventDefault();
            return true
        }
        const masterDetailCell = this.getMasterDetailCell($cell);
        if (masterDetailCell) {
            this._focusCell(masterDetailCell);
            return true
        }
        return false
    }
    _ctrlFKeyHandler(eventArgs) {
        if (this.option("searchPanel.visible")) {
            const searchTextEditor = this._headerPanel.getSearchTextEditor();
            if (searchTextEditor) {
                searchTextEditor.focus();
                eventArgs.originalEvent.preventDefault()
            }
        }
    }
    _f2KeyHandler() {
        const isEditing = this._editingController.isEditing();
        const rowIndex = this.getVisibleRowIndex();
        const $row = this._focusedView && this._focusedView.getRow(rowIndex);
        if (!isEditing && isDataRow($row)) {
            this._startEditing()
        }
    }
    _navigateNextCell($event, keyCode) {
        const $cell = this._getNextCell(keyCode);
        const directionCode = this._getDirectionCodeByKey(keyCode);
        const isCellValid = $cell && this._isCellValid($cell);
        const result = isCellValid ? this._arrowKeysHandlerFocusCell($event, $cell, directionCode) : false;
        return result
    }
    _arrowKeysHandlerFocusCell($event, $nextCell, direction) {
        const isVerticalDirection = "prevRow" === direction || "nextRow" === direction;
        const args = this._fireFocusChangingEvents($event, $nextCell, isVerticalDirection, true);
        $nextCell = args.$newCellElement;
        if (!args.cancel && this._isCellValid($nextCell)) {
            this._focus($nextCell, !args.isHighlighted);
            return true
        }
        return false
    }
    _beginFastEditing(originalEvent, isDeleting) {
        if (!this._isFastEditingAllowed() || originalEvent.altKey || originalEvent.ctrlKey || this._editingController.isEditing()) {
            return false
        }
        if (isDeleting) {
            this._startEditing(originalEvent, FAST_EDITING_DELETE_KEY)
        } else {
            const {
                key: key
            } = originalEvent;
            const keyCode = originalEvent.keyCode || originalEvent.which;
            const fastEditingKey = key || keyCode && String.fromCharCode(keyCode);
            if (fastEditingKey && (1 === fastEditingKey.length || fastEditingKey === FAST_EDITING_DELETE_KEY)) {
                this._startEditing(originalEvent, fastEditingKey)
            }
        }
        return true
    }
    _pointerEventHandler(e) {
        var _this$_rowsView4;
        const event = e.event || e;
        let $target = $(event.currentTarget);
        const focusedViewElement = null === (_this$_rowsView4 = this._rowsView) || void 0 === _this$_rowsView4 ? void 0 : _this$_rowsView4.element();
        const $parent = $target.parent();
        const isInteractiveElement = $(event.target).is(INTERACTIVE_ELEMENTS_SELECTOR);
        const isRevertButton = !!$(event.target).closest(`.${REVERT_BUTTON_CLASS}`).length;
        const isExpandCommandCell = $target.hasClass(COMMAND_EXPAND_CLASS);
        if (!this._isEventInCurrentGrid(event)) {
            return
        }
        if (!isRevertButton && (this._isCellValid($target, !isInteractiveElement) || isExpandCommandCell)) {
            $target = this._isInsideEditForm($target) ? $(event.target) : $target;
            this._focusView();
            $(focusedViewElement).removeClass(FOCUS_STATE_CLASS);
            if ($parent.hasClass(FREESPACE_ROW_CLASS)) {
                this._updateFocusedCellPosition($target);
                this._applyTabIndexToElement(this._focusedView.element());
                this._focusedView.focus(true)
            } else if (!this.getMasterDetailCell($target)) {
                this._clickTargetCellHandler(event, $target)
            } else {
                this._updateFocusedCellPosition($target)
            }
        } else if ($target.is("td")) {
            this._resetFocusedCell()
        }
    }
    _clickTargetCellHandler(event, $cell) {
        const column = this._getColumnByCellElement($cell);
        const isCellEditMode = this._isCellEditMode();
        this.setCellFocusType();
        const args = this._fireFocusChangingEvents(event, $cell, true);
        $cell = args.$newCellElement;
        if (!args.cancel) {
            if (args.resetFocusedRow) {
                this._focusController._resetFocusedRow();
                return
            }
            if (args.rowIndexChanged) {
                $cell = this._getFocusedCell()
            }
            if (!args.isHighlighted && !isCellEditMode) {
                this.setRowFocusType()
            }
            this._updateFocusedCellPosition($cell);
            if (this._allowRowUpdating() && isCellEditMode && column && column.allowEditing) {
                this._isNeedFocus = false;
                this._isHiddenFocus = false
            } else {
                $cell = this._getFocusedCell();
                const $target = event && $(event.target).closest(`${NON_FOCUSABLE_ELEMENTS_SELECTOR}, td`);
                const skipFocusEvent = $target && $target.not($cell).is(NON_FOCUSABLE_ELEMENTS_SELECTOR);
                const isEditor = !!column && !column.command && $cell.hasClass(EDITOR_CELL_CLASS);
                const isDisabled = !isEditor && (!args.isHighlighted || skipFocusEvent);
                this._focus($cell, isDisabled, skipFocusEvent)
            }
        } else {
            this.setRowFocusType();
            this.setFocusedRowIndex(args.prevRowIndex);
            if (this._editingController.isEditing() && isCellEditMode) {
                this._closeEditCell()
            }
        }
    }
    _allowRowUpdating() {
        const rowIndex = this.getVisibleRowIndex();
        const row = this._dataController.items()[rowIndex];
        return this._editingController.allowUpdating({
            row: row
        }, "click")
    }
    focus(element) {
        let activeElementSelector;
        const focusedRowEnabled = this.option("focusedRowEnabled");
        const isHighlighted = this._isCellElement($(element));
        if (!element) {
            activeElementSelector = ".dx-datagrid-rowsview .dx-row[tabindex]";
            if (!focusedRowEnabled) {
                activeElementSelector += ", .dx-datagrid-rowsview .dx-row > td[tabindex]"
            }
            element = this.component.$element().find(activeElementSelector).first()
        }
        element && this._focusElement($(element), isHighlighted)
    }
    getFocusedView() {
        return this._focusedView
    }
    setupFocusedView() {
        if (this.isKeyboardEnabled() && !isDefined(this._focusedView)) {
            this._focusView()
        }
    }
    _focusElement($element, isHighlighted) {
        const rowsViewElement = $(this._getRowsViewElement());
        const $focusedView = $element.closest(rowsViewElement);
        const isRowFocusType = this.isRowFocusType();
        let args = {};
        if (!$focusedView.length || this._isCellElement($element) && !this._isCellValid($element)) {
            return
        }
        this._focusView();
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        if (this._isCellElement($element) || isGroupRow($element)) {
            this.setCellFocusType();
            args = this._fireFocusChangingEvents(null, $element, true, isHighlighted);
            $element = args.$newCellElement;
            if (isRowFocusType && !args.isHighlighted) {
                this.setRowFocusType()
            }
        }
        if (!args.cancel) {
            this._focus($element, !args.isHighlighted);
            this._focusInteractiveElement($element)
        }
    }
    _getFocusedViewByElement($element) {
        const view = this.getFocusedView();
        const $view = view && $(view.element());
        return $element && 0 !== $element.closest($view).length
    }
    _focusView() {
        this._focusedView = this._rowsView
    }
    _resetFocusedView() {
        this.setRowFocusType();
        this._focusedView = null
    }
    _focusInteractiveElement($cell, isLast) {
        if (!$cell) {
            return
        }
        const $focusedElement = this._getInteractiveElement($cell, isLast);
        gridCoreUtils.focusAndSelectElement(this, $focusedElement)
    }
    _focus($cell, disableFocus, skipFocusEvent) {
        const $row = $cell && !$cell.hasClass(ROW_CLASS) ? $cell.closest(`.${ROW_CLASS}`) : $cell;
        if ($row && isNotFocusedRow($row)) {
            return
        }
        const focusedView = this._focusedView;
        const $focusViewElement = focusedView && focusedView.element();
        let $focusElement;
        this._isHiddenFocus = disableFocus;
        const isRowFocus = isGroupRow($row) || isGroupFooterRow($row) || this.isRowFocusType();
        if (isRowFocus) {
            $focusElement = $row;
            if (focusedView) {
                this.setFocusedRowIndex(this._getRowIndex($row))
            }
        } else if (this._isCellElement($cell)) {
            $focusElement = $cell;
            this._updateFocusedCellPosition($cell)
        }
        if ($focusElement) {
            if ($focusViewElement) {
                $focusViewElement.find(".dx-row[tabindex], .dx-row > td[tabindex]").filter(((i, node) => gridCoreUtils.isElementInCurrentGrid(this, $(node)))).not($focusElement).removeClass(CELL_FOCUS_DISABLED_CLASS).removeClass(FOCUSED_CLASS).removeAttr("tabindex")
            }
            eventsEngine.one($focusElement, "blur", (e => {
                if (e.relatedTarget) {
                    $focusElement.removeClass(CELL_FOCUS_DISABLED_CLASS).removeClass(FOCUSED_CLASS)
                }
            }));
            if (!skipFocusEvent) {
                this._applyTabIndexToElement($focusElement);
                eventsEngine.trigger($focusElement, "focus")
            }
            if (disableFocus) {
                $focusElement.addClass(CELL_FOCUS_DISABLED_CLASS);
                if (isRowFocus) {
                    $cell.addClass(CELL_FOCUS_DISABLED_CLASS)
                }
            } else {
                this._editorFactory.focus($focusElement)
            }
        }
    }
    _updateFocus(isRenderView) {
        this._updateFocusTimeout = setTimeout((() => {
            if (this._needFocusEditingCell()) {
                this._editingController._focusEditingCell();
                return
            }
            let $cell = this._getFocusedCell();
            const isEditing = this._editingController.isEditing();
            if (!this.getMasterDetailCell($cell) || this._isRowEditMode()) {
                if (this._hasSkipRow($cell.parent())) {
                    const direction = this._focusedCellPosition && this._focusedCellPosition.rowIndex > 0 ? "upArrow" : "downArrow";
                    $cell = this._getNextCell(direction)
                }
                if (isElementDefined($cell)) {
                    if ($cell.is("td") || $cell.hasClass(this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS))) {
                        const isCommandCell = $cell.is(COMMAND_CELL_SELECTOR);
                        const $focusedElementInsideCell = $cell.find(":focus");
                        const isFocusedElementDefined = isElementDefined($focusedElementInsideCell);
                        const column = this._getColumnByCellElement($cell);
                        if ((isRenderView || !isCommandCell) && this._editorFactory.focus()) {
                            if (isCommandCell && isFocusedElementDefined) {
                                gridCoreUtils.focusAndSelectElement(this, $focusedElementInsideCell);
                                return
                            }!isFocusedElementDefined && this._focus($cell)
                        } else if (!isFocusedElementDefined && (this._isNeedFocus || this._isHiddenFocus)) {
                            this._focus($cell, this._isHiddenFocus)
                        }
                        if (isEditing && !(null !== column && void 0 !== column && column.showEditorAlways)) {
                            this._focusInteractiveElement.bind(this)($cell)
                        }
                    } else {
                        eventsEngine.trigger($cell, "focus")
                    }
                }
            }
        }))
    }
    _getColumnByCellElement($cell) {
        const cellIndex = this._rowsView.getCellIndex($cell);
        const columnIndex = cellIndex + this._columnsController.getColumnIndexOffset();
        return this._columnsController.getVisibleColumns(null, true)[columnIndex]
    }
    _needFocusEditingCell() {
        const isCellEditMode = this._editingController.getEditMode() === EDIT_MODE_CELL;
        const isBatchEditMode = this._editingController.getEditMode() === EDIT_MODE_BATCH;
        const cellEditModeHasChanges = isCellEditMode && this._editingController.hasChanges();
        const isNewRowBatchEditMode = isBatchEditMode && this._editingController.isNewRowInEditMode();
        const $cell = this._getFocusedCell();
        return (0 === $cell.children().length || $cell.find(FOCUSABLE_ELEMENT_SELECTOR).length > 0) && (cellEditModeHasChanges || isNewRowBatchEditMode)
    }
    _getFocusedCell() {
        return $(this._getCell(this._focusedCellPosition))
    }
    _updateFocusedCellPositionByTarget(target) {
        var _this$_focusedCellPos;
        const elementType = this._getElementType(target);
        if ("row" === elementType && isDefined(null === (_this$_focusedCellPos = this._focusedCellPosition) || void 0 === _this$_focusedCellPos ? void 0 : _this$_focusedCellPos.columnIndex)) {
            const $row = $(target);
            this._focusedView && isGroupRow($row) && this.setFocusedRowIndex(this._getRowIndex($row))
        } else {
            this._updateFocusedCellPosition(this._getCellElementFromTarget(target))
        }
    }
    _updateFocusedCellPosition($cell, direction) {
        const position = this._getCellPosition($cell, direction);
        if (position) {
            if (!$cell.length || position.rowIndex >= 0 && position.columnIndex >= 0) {
                this.setFocusedCellPosition(position.rowIndex, position.columnIndex)
            }
        }
        return position
    }
    _getFocusedColumnIndexOffset(columnIndex) {
        let offset = 0;
        const column = this._columnsController.getVisibleColumns()[columnIndex];
        if (column && column.fixed) {
            offset = this._getFixedColumnIndexOffset(column)
        } else if (columnIndex >= 0) {
            offset = this._columnsController.getColumnIndexOffset()
        }
        return offset
    }
    _getFixedColumnIndexOffset(column) {
        const offset = isFixedColumnIndexOffsetRequired(this, column) ? this._getVisibleColumnCount() - this._columnsController.getVisibleColumns().length : 0;
        return offset
    }
    _getCellPosition($cell, direction) {
        let columnIndex;
        const $row = isElementDefined($cell) && $cell.closest("tr");
        if (isElementDefined($row)) {
            const rowIndex = this._getRowIndex($row);
            columnIndex = this._rowsView.getCellIndex($cell, rowIndex);
            columnIndex += this._getFocusedColumnIndexOffset(columnIndex);
            if (direction) {
                columnIndex = "previous" === direction ? columnIndex - 1 : columnIndex + 1;
                columnIndex = this._applyColumnIndexBoundaries(columnIndex)
            }
            return {
                rowIndex: rowIndex,
                columnIndex: columnIndex
            }
        }
        return
    }
    _focusCell($cell, isDisabled) {
        if (this._isCellValid($cell)) {
            this._focus($cell, isDisabled);
            return true
        }
        return
    }
    _focusEditFormCell($cell) {
        if ($cell.hasClass(MASTER_DETAIL_CELL_CLASS)) {
            this._editorFactory.focus($cell, true)
        }
    }
    _resetFocusedCell(preventScroll) {
        var _this$_focusedView2;
        const $cell = this._getFocusedCell();
        isElementDefined($cell) && $cell.removeAttr("tabindex");
        this._isNeedFocus = false;
        this._isNeedScroll = false;
        this._focusedCellPosition = {};
        clearTimeout(this._updateFocusTimeout);
        null === (_this$_focusedView2 = this._focusedView) || void 0 === _this$_focusedView2 || _this$_focusedView2.renderFocusState({
            preventScroll: preventScroll
        })
    }
    restoreFocusableElement(rowIndex, $event) {
        const that = this;
        let args;
        let $rowElement;
        const isUpArrow = isDefined(rowIndex);
        const $rowsViewElement = this._rowsView.element();
        const {
            columnIndex: columnIndex
        } = that._focusedCellPosition;
        const rowIndexOffset = that._dataController.getRowIndexOffset();
        rowIndex = isUpArrow ? rowIndex : this._rowsView.getTopVisibleItemIndex() + rowIndexOffset;
        if (!isUpArrow) {
            that._editorFactory.loseFocus();
            that._applyTabIndexToElement($rowsViewElement);
            eventsEngine.trigger($rowsViewElement, "focus")
        } else {
            $rowElement = this._rowsView.getRow(rowIndex - rowIndexOffset);
            args = that._fireFocusedRowChanging($event, $rowElement);
            if (!args.cancel && args.rowIndexChanged) {
                rowIndex = args.newRowIndex
            }
        }
        if (!isUpArrow || !args.cancel) {
            that.setFocusedCellPosition(rowIndex, columnIndex)
        }
        isUpArrow && that._updateFocus()
    }
    _getNewPositionByCode(cellPosition, elementType, code) {
        let {
            columnIndex: columnIndex
        } = cellPosition;
        let {
            rowIndex: rowIndex
        } = cellPosition;
        let visibleColumnsCount;
        if (void 0 === cellPosition.rowIndex && "next" === code) {
            return {
                columnIndex: 0,
                rowIndex: 0
            }
        }
        switch (code) {
            case "nextInRow":
            case "next":
                visibleColumnsCount = this._getVisibleColumnCount();
                if (columnIndex < visibleColumnsCount - 1 && "row" !== elementType && this._hasValidCellAfterPosition({
                        columnIndex: columnIndex,
                        rowIndex: rowIndex
                    })) {
                    columnIndex++
                } else if (!this._isLastRow(rowIndex) && "next" === code) {
                    columnIndex = 0;
                    rowIndex++
                }
                break;
            case "previousInRow":
            case "previous":
                if (columnIndex > 0 && "row" !== elementType && this._hasValidCellBeforePosition({
                        columnIndex: columnIndex,
                        rowIndex: rowIndex
                    })) {
                    columnIndex--
                } else if (rowIndex > 0 && "previous" === code) {
                    rowIndex--;
                    visibleColumnsCount = this._getVisibleColumnCount();
                    columnIndex = visibleColumnsCount - 1
                }
                break;
            case "upArrow":
                rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
                break;
            case "downArrow":
                rowIndex = !this._isLastRow(rowIndex) ? rowIndex + 1 : rowIndex
        }
        return {
            columnIndex: columnIndex,
            rowIndex: rowIndex
        }
    }
    setFocusedCellPosition(rowIndex, columnIndex) {
        this.setFocusedRowIndex(rowIndex);
        this.setFocusedColumnIndex(columnIndex)
    }
    setFocusedRowIndex(rowIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {}
        }
        this._focusedCellPosition.rowIndex = rowIndex
    }
    setFocusedColumnIndex(columnIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {}
        }
        this._focusedCellPosition.columnIndex = columnIndex
    }
    getRowIndex() {
        return this._focusedCellPosition ? this._focusedCellPosition.rowIndex : -1
    }
    getColumnIndex() {
        return this._focusedCellPosition ? this._focusedCellPosition.columnIndex : -1
    }
    getVisibleRowIndex() {
        var _this$_focusedCellPos2;
        const rowIndex = null === (_this$_focusedCellPos2 = this._focusedCellPosition) || void 0 === _this$_focusedCellPos2 ? void 0 : _this$_focusedCellPos2.rowIndex;
        return !isDefined(rowIndex) || rowIndex < 0 ? -1 : rowIndex - this._dataController.getRowIndexOffset()
    }
    getVisibleColumnIndex() {
        var _this$_focusedCellPos3;
        const columnIndex = null === (_this$_focusedCellPos3 = this._focusedCellPosition) || void 0 === _this$_focusedCellPos3 ? void 0 : _this$_focusedCellPos3.columnIndex;
        return !isDefined(columnIndex) ? -1 : columnIndex - this._columnsController.getColumnIndexOffset()
    }
    _applyColumnIndexBoundaries(columnIndex) {
        const visibleColumnsCount = this._getVisibleColumnCount();
        if (columnIndex < 0) {
            columnIndex = 0
        } else if (columnIndex >= visibleColumnsCount) {
            columnIndex = visibleColumnsCount - 1
        }
        return columnIndex
    }
    _isCellByPositionValid(cellPosition) {
        const $cell = $(this._getCell(cellPosition));
        return this._isCellValid($cell)
    }
    _isLastRow(rowIndex) {
        const dataController = this._dataController;
        if (this._isVirtualRowRender()) {
            return rowIndex >= dataController.getMaxRowIndex()
        }
        const lastVisibleIndex = Math.max(...dataController.items().map(((item, index) => false !== item.visible ? index : -1)));
        return rowIndex === lastVisibleIndex
    }
    _isFirstValidCell(cellPosition) {
        let isFirstValidCell = false;
        if (0 === cellPosition.rowIndex && cellPosition.columnIndex >= 0) {
            isFirstValidCell = isFirstValidCell || !this._hasValidCellBeforePosition(cellPosition)
        }
        return isFirstValidCell
    }
    _hasValidCellBeforePosition(cellPosition) {
        let {
            columnIndex: columnIndex
        } = cellPosition;
        let hasValidCells = false;
        while (columnIndex > 0 && !hasValidCells) {
            const checkingPosition = {
                columnIndex: --columnIndex,
                rowIndex: cellPosition.rowIndex
            };
            hasValidCells = this._isCellByPositionValid(checkingPosition)
        }
        return hasValidCells
    }
    _hasValidCellAfterPosition(cellPosition) {
        let {
            columnIndex: columnIndex
        } = cellPosition;
        let hasValidCells = false;
        const visibleColumnCount = this._getVisibleColumnCount();
        while (columnIndex < visibleColumnCount - 1 && !hasValidCells) {
            const checkingPosition = {
                columnIndex: ++columnIndex,
                rowIndex: cellPosition.rowIndex
            };
            hasValidCells = this._isCellByPositionValid(checkingPosition)
        }
        return hasValidCells
    }
    _isLastValidCell(cellPosition) {
        const nextColumnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex + 1 : 0;
        const {
            rowIndex: rowIndex
        } = cellPosition;
        const checkingPosition = {
            columnIndex: nextColumnIndex,
            rowIndex: rowIndex
        };
        const visibleRows = this._dataController.getVisibleRows();
        const row = visibleRows && visibleRows[rowIndex];
        const isLastRow = this._isLastRow(rowIndex);
        if (!isLastRow) {
            return false
        }
        const isFullRowFocus = "group" === (null === row || void 0 === row ? void 0 : row.rowType) || "groupFooter" === (null === row || void 0 === row ? void 0 : row.rowType);
        if (isFullRowFocus && cellPosition.columnIndex > 0) {
            return true
        }
        if (cellPosition.columnIndex === this._getVisibleColumnCount() - 1) {
            return true
        }
        if (this._isCellByPositionValid(checkingPosition)) {
            return false
        }
        return this._isLastValidCell(checkingPosition)
    }
    _isCellValid($cell, isClick) {
        if (isElementDefined($cell)) {
            const $row = $cell.parent();
            const columnIndex = this._rowsView.getCellIndex($cell) + this._columnsController.getColumnIndexOffset();
            const column = this._getColumnByCellElement($cell);
            const visibleColumnCount = this._getVisibleColumnCount();
            const editingController = this._editingController;
            const isMasterDetailRow = isDetailRow($row);
            const isShowWhenGrouped = column && column.showWhenGrouped;
            const isDataCell = column && !$cell.hasClass(COMMAND_EXPAND_CLASS) && isDataRow($row);
            const isValidGroupSpaceColumn = function() {
                return !isMasterDetailRow && column && (!isDefined(column.groupIndex) || isShowWhenGrouped && isDataCell) || parseInt($cell.attr("colspan"), 10) > 1
            };
            const isDragCell = GridCoreKeyboardNavigationDom.isDragCell($cell);
            if (isDragCell) {
                return false
            }
            if (this.getMasterDetailCell($cell)) {
                return true
            }
            if (visibleColumnCount > columnIndex && isValidGroupSpaceColumn()) {
                const rowItems = this._dataController.items();
                const visibleRowIndex = this._rowsView.getRowIndex($row);
                const row = rowItems[visibleRowIndex];
                const isCellEditing = editingController && this._isCellEditMode() && editingController.isEditing();
                const isRowEditingInCurrentRow = editingController && editingController.isEditRow(visibleRowIndex);
                const isEditing = isRowEditingInCurrentRow || isCellEditing;
                if (column.command) {
                    if (this._isLegacyNavigation()) {
                        return !isEditing && "expand" === column.command
                    }
                    if (isCellEditing) {
                        return false
                    }
                    if (isRowEditingInCurrentRow) {
                        return "select" !== column.command
                    }
                    return !isEditing
                }
                if (isCellEditing && row && "data" !== row.rowType) {
                    return false
                }
                return !isEditing || column.allowEditing || isClick
            }
        }
    }
    getFirstValidCellInRow($row, columnIndex) {
        const that = this;
        const $cells = $row.find("> td");
        let $cell;
        let $result;
        columnIndex = columnIndex || 0;
        for (let i = columnIndex; i < $cells.length; ++i) {
            $cell = $cells.eq(i);
            if (that._isCellValid($cell)) {
                $result = $cell;
                break
            }
        }
        return $result
    }
    _getNextCell(keyCode, elementType, cellPosition) {
        const focusedCellPosition = cellPosition || this._focusedCellPosition;
        const isRowFocusType = this.isRowFocusType();
        const includeCommandCells = isRowFocusType || ["next", "previous"].includes(keyCode);
        let $cell;
        let $row;
        if (this._focusedView && focusedCellPosition) {
            const newFocusedCellPosition = this._getNewPositionByCode(focusedCellPosition, elementType, keyCode);
            $cell = $(this._getCell(newFocusedCellPosition));
            const isLastCellOnDirection = "previous" === keyCode ? this._isFirstValidCell(newFocusedCellPosition) : this._isLastValidCell(newFocusedCellPosition);
            if (isElementDefined($cell) && !this._isCellValid($cell) && this._isCellInRow(newFocusedCellPosition, includeCommandCells) && !isLastCellOnDirection) {
                if (isRowFocusType) {
                    $cell = this.getFirstValidCellInRow($cell.parent(), newFocusedCellPosition.columnIndex)
                } else {
                    $cell = this._getNextCell(keyCode, "cell", newFocusedCellPosition)
                }
            }
            $row = isElementDefined($cell) && $cell.parent();
            if (this._hasSkipRow($row)) {
                const rowIndex = this._getRowIndex($row);
                if (!this._isLastRow(rowIndex)) {
                    $cell = this._getNextCell(keyCode, "row", {
                        columnIndex: focusedCellPosition.columnIndex,
                        rowIndex: rowIndex
                    })
                } else {
                    return null
                }
            }
            return isElementDefined($cell) ? $cell : null
        }
        return null
    }
    _startEditing(eventArgs, fastEditingKey) {
        const focusedCellPosition = this._focusedCellPosition;
        const visibleRowIndex = this.getVisibleRowIndex();
        const visibleColumnIndex = this.getVisibleColumnIndex();
        const row = this._dataController.items()[visibleRowIndex];
        const column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
        if (this._isAllowEditing(row, column)) {
            if (this._isRowEditMode()) {
                this._editingController.editRow(visibleRowIndex)
            } else if (focusedCellPosition) {
                this._startEditCell(eventArgs, fastEditingKey)
            }
        }
    }
    _isAllowEditing(row, column) {
        return this._editingController.allowUpdating({
            row: row
        }) && column && column.allowEditing
    }
    _editFocusedCell() {
        const rowIndex = this.getVisibleRowIndex();
        const colIndex = this.getVisibleColumnIndex();
        return this._editingController.editCell(rowIndex, colIndex)
    }
    _startEditCell(eventArgs, fastEditingKey) {
        this._fastEditingStarted = isDefined(fastEditingKey);
        const editResult = this._editFocusedCell();
        const isEditResultDeferred = isDeferred(editResult);
        const isFastEditingStarted = this._isFastEditingStarted();
        if (!isFastEditingStarted || !isEditResultDeferred && !editResult) {
            return
        }
        const editorValue = isEditResultDeferred && fastEditingKey === FAST_EDITING_DELETE_KEY ? "" : fastEditingKey;
        const editResultDeferred = isEditResultDeferred ? editResult : Deferred().resolve();
        const waitTemplatesDeferred = this._rowsView.waitAsyncTemplates(true);
        when(editResultDeferred, waitTemplatesDeferred).done((() => {
            this._editingCellHandler(eventArgs, editorValue)
        }))
    }
    _editingCellHandler(eventArgs, editorValue) {
        var _$inputElement$select;
        const $input = this._getFocusedCell().find(INTERACTIVE_ELEMENTS_SELECTOR).eq(0);
        const $inputElement = $input.get(0);
        if (!$inputElement) {
            return
        }
        const keyDownEvent = createEvent(eventArgs, {
            type: "keydown",
            target: $inputElement
        });
        const keyPressEvent = createEvent(eventArgs, {
            type: "keypress",
            target: $inputElement
        });
        const inputEvent = createEvent(eventArgs, {
            type: "input",
            target: $inputElement
        });
        if (inputEvent.originalEvent) {
            inputEvent.originalEvent = createEvent(inputEvent.originalEvent, {
                data: editorValue
            })
        }
        null === (_$inputElement$select = $inputElement.select) || void 0 === _$inputElement$select || _$inputElement$select.call($inputElement);
        eventsEngine.trigger($input, keyDownEvent);
        if (!keyDownEvent.isDefaultPrevented()) {
            eventsEngine.trigger($input, keyPressEvent);
            if (!keyPressEvent.isDefaultPrevented()) {
                const timeout = browser.mozilla ? 25 : 0;
                setTimeout((() => {
                    const inputValue = this._getKeyPressInputValue($input, editorValue);
                    $input.val(inputValue);
                    const $widgetContainer = $input.closest(`.${WIDGET_CLASS}`);
                    eventsEngine.off($widgetContainer, "focusout");
                    eventsEngine.one($widgetContainer, "focusout", (() => {
                        eventsEngine.trigger($input, "change")
                    }));
                    eventsEngine.trigger($input, inputEvent)
                }), timeout)
            }
        }
    }
    _getKeyPressInputValue($input, editorValue) {
        const inputCurrentValue = $input.val();
        return "-" === editorValue && "-0" === inputCurrentValue ? "-0" : editorValue
    }
    _fireFocusChangingEvents($event, $cell, fireRowEvent, isHighlighted) {
        let args = {};
        const cellPosition = this._getCellPosition($cell) ?? {};
        if (this.isCellFocusType()) {
            args = this._fireFocusedCellChanging($event, $cell, isHighlighted);
            if (!args.cancel) {
                cellPosition.columnIndex = args.newColumnIndex;
                cellPosition.rowIndex = args.newRowIndex;
                isHighlighted = args.isHighlighted;
                $cell = $(this._getCell(cellPosition))
            }
        }
        if (!args.cancel && fireRowEvent && $cell) {
            args = this._fireFocusedRowChanging($event, $cell.parent());
            if (!args.cancel) {
                cellPosition.rowIndex = args.newRowIndex;
                args.isHighlighted = isHighlighted
            }
        }
        args.$newCellElement = $(this._getCell(cellPosition));
        if (!args.$newCellElement.length) {
            args.$newCellElement = $cell
        }
        return args
    }
    _fireFocusedCellChanging($event, $cellElement, isHighlighted) {
        const prevColumnIndex = this.option("focusedColumnIndex");
        const prevRowIndex = this.option("focusedRowIndex");
        const cellPosition = this._getCellPosition($cellElement);
        const columnIndex = cellPosition ? cellPosition.columnIndex : -1;
        const rowIndex = cellPosition ? cellPosition.rowIndex : -1;
        const visibleRows = this._dataController.getVisibleRows();
        const visibleColumns = this._columnsController.getVisibleColumns();
        const args = {
            cellElement: $cellElement,
            prevColumnIndex: prevColumnIndex,
            prevRowIndex: prevRowIndex,
            newColumnIndex: columnIndex,
            newRowIndex: rowIndex,
            rows: visibleRows,
            columns: visibleColumns,
            event: $event,
            isHighlighted: isHighlighted || false,
            cancel: false
        };
        this._canceledCellPosition = null;
        this.executeAction("onFocusedCellChanging", args);
        if (args.newColumnIndex !== columnIndex || args.newRowIndex !== rowIndex) {
            args.$newCellElement = $(this._getCell({
                columnIndex: args.newColumnIndex,
                rowIndex: args.newRowIndex
            }))
        }
        if (args.cancel) {
            this._canceledCellPosition = {
                rowIndex: rowIndex,
                columnIndex: columnIndex
            }
        }
        return args
    }
    _fireFocusedCellChanged($cell) {
        const columnIndex = this._rowsView.getCellIndex($cell);
        const rowOptions = null === $cell || void 0 === $cell ? void 0 : $cell.parent().data("options");
        const focusedRowKey = null === rowOptions || void 0 === rowOptions ? void 0 : rowOptions.key;
        this._memoFireFocusedCellChanged(focusedRowKey, columnIndex)
    }
    _memoFireFocusedCellChanged(rowKey, columnIndex) {
        const $cell = this._getFocusedCell();
        const rowIndex = this._getRowIndex(null === $cell || void 0 === $cell ? void 0 : $cell.parent());
        const localRowIndex = Math.min(rowIndex - this._dataController.getRowIndexOffset(), this._dataController.items().length - 1);
        const isEditingCell = this._editingController.isEditCell(localRowIndex, columnIndex);
        if (isEditingCell) {
            return
        }
        const row = this._dataController.items()[localRowIndex];
        const column = this._columnsController.getVisibleColumns()[columnIndex];
        this.executeAction("onFocusedCellChanged", {
            cellElement: $cell ? getPublicElement($cell) : void 0,
            columnIndex: columnIndex,
            rowIndex: rowIndex,
            row: row,
            column: column
        })
    }
    _fireFocusedRowChanging(eventArgs, $newFocusedRow) {
        const newRowIndex = this._getRowIndex($newFocusedRow);
        const prevFocusedRowIndex = this.option("focusedRowIndex");
        const loadingOperationTypes = this._dataController.loadingOperationTypes();
        const args = {
            rowElement: $newFocusedRow,
            prevRowIndex: prevFocusedRowIndex,
            newRowIndex: newRowIndex,
            event: eventArgs,
            rows: this._dataController.getVisibleRows(),
            cancel: false
        };
        const loadingOperations = loadingOperationTypes.sorting || loadingOperationTypes.grouping || loadingOperationTypes.filtering || loadingOperationTypes.paging;
        if (!this._dataController || this._dataController.isLoading() && loadingOperations) {
            args.cancel = true;
            return args
        }
        if (this.option("focusedRowEnabled")) {
            this.executeAction("onFocusedRowChanging", args);
            if (!args.cancel && args.newRowIndex !== newRowIndex) {
                args.resetFocusedRow = args.newRowIndex < 0;
                if (!args.resetFocusedRow) {
                    this.setFocusedRowIndex(args.newRowIndex)
                }
                args.rowIndexChanged = true
            }
        }
        return args
    }
    _fireFocusedRowChanged() {
        var _this$_focusControlle;
        const focusedRowEnabled = this.option("focusedRowEnabled");
        const focusedRowKey = this.option("focusedRowKey");
        const focusedRowIndex = null === (_this$_focusControlle = this._focusController) || void 0 === _this$_focusControlle ? void 0 : _this$_focusControlle.getFocusedRowIndexByKey(focusedRowKey);
        if (!focusedRowEnabled || isDefined(focusedRowKey) && focusedRowIndex < 0) {
            return
        }
        this._memoFireFocusedRowChanged(focusedRowKey, focusedRowIndex)
    }
    _memoFireFocusedRowChanged(focusedRowKey, focusedRowIndex) {
        const localRowIndex = focusedRowIndex - this._dataController.getRowIndexOffset();
        this.executeAction("onFocusedRowChanged", {
            rowElement: focusedRowIndex < 0 ? void 0 : this._rowsView.getRowElement(localRowIndex),
            rowIndex: focusedRowIndex,
            row: focusedRowIndex < 0 ? void 0 : this._dataController.getVisibleRows()[localRowIndex]
        })
    }
    _isEventInCurrentGrid(event) {
        return gridCoreUtils.isElementInCurrentGrid(this, $(event.target))
    }
    _isRowEditMode() {
        const editMode = this._editingController.getEditMode();
        return editMode === EDIT_MODE_ROW || editMode === EDIT_MODE_FORM
    }
    _isCellEditMode() {
        const editMode = this._editingController.getEditMode();
        return editMode === EDIT_MODE_CELL || editMode === EDIT_MODE_BATCH
    }
    _isFastEditingAllowed() {
        return this._isCellEditMode() && this.option("keyboardNavigation.editOnKeyPress")
    }
    _getInteractiveElement($cell, isLast) {
        const $focusedElement = $cell.find(INTERACTIVE_ELEMENTS_SELECTOR).filter(":visible");
        return isLast ? $focusedElement.last() : $focusedElement.first()
    }
    _applyTabIndexToElement($element) {
        const tabIndex = this.option("tabIndex") ?? 0;
        $element.attr("tabindex", tabIndex)
    }
    _getCell(cellPosition) {
        if (this._focusedView && cellPosition) {
            const rowIndexOffset = this._dataController.getRowIndexOffset();
            const column = this._columnsController.getVisibleColumns(null, true)[cellPosition.columnIndex];
            const columnIndexOffset = column && column.fixed ? this._getFixedColumnIndexOffset(column) : this._columnsController.getColumnIndexOffset();
            const rowIndex = cellPosition.rowIndex >= 0 ? cellPosition.rowIndex - rowIndexOffset : -1;
            const columnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex - columnIndexOffset : -1;
            return this._focusedView.getCell({
                rowIndex: rowIndex,
                columnIndex: columnIndex
            })
        }
    }
    _getRowIndex($row) {
        let rowIndex = this._rowsView.getRowIndex($row);
        if (rowIndex >= 0) {
            rowIndex += this._dataController.getRowIndexOffset()
        }
        return rowIndex
    }
    _hasSkipRow($row) {
        const row = $row && $row.get(0);
        return row && "none" === row.style.display
    }
    _allowEditingOnEnterKey() {
        return "startEdit" === this.option("keyboardNavigation.enterKeyAction")
    }
    _isLegacyNavigation() {
        return this.option("useLegacyKeyboardNavigation")
    }
    _getDirectionCodeByKey(key) {
        let directionCode;
        switch (key) {
            case "upArrow":
                directionCode = "prevRow";
                break;
            case "downArrow":
                directionCode = "nextRow";
                break;
            case "leftArrow":
                directionCode = this.option("rtlEnabled") ? "nextInRow" : "previousInRow";
                break;
            case "rightArrow":
                directionCode = this.option("rtlEnabled") ? "previousInRow" : "nextInRow"
        }
        return directionCode
    }
    _isVirtualScrolling() {
        const scrollingMode = this.option("scrolling.mode");
        return "virtual" === scrollingMode || "infinite" === scrollingMode
    }
    _isVirtualRowRender() {
        return this._isVirtualScrolling() || gridCoreUtils.isVirtualRowRendering(this)
    }
    _isVirtualColumnRender() {
        return "virtual" === this.option("scrolling.columnRenderingMode")
    }
    _scrollBy(left, top, rowIndex, $event) {
        const that = this;
        const scrollable = this._rowsView.getScrollable();
        if (that._focusedCellPosition) {
            const scrollHandler = function() {
                scrollable.off("scroll", scrollHandler);
                setTimeout(that.restoreFocusableElement.bind(that, rowIndex, $event))
            };
            scrollable.on("scroll", scrollHandler)
        }
        return scrollable.scrollBy({
            left: left,
            top: top
        })
    }
    _isInsideEditForm(element) {
        const $editForm = $(element).closest(`.${this.addWidgetPrefix(EDIT_FORM_CLASS)}`);
        return $editForm.length && this.elementIsInsideGrid($editForm)
    }
    getMasterDetailCell(element) {
        const $masterDetailCell = $(element).closest(`.${MASTER_DETAIL_CELL_CLASS}`);
        if ($masterDetailCell.length && this.elementIsInsideGrid($masterDetailCell)) {
            return $masterDetailCell
        }
        return null
    }
    _processNextCellInMasterDetail($nextCell, _$cell) {
        if (!this._isInsideEditForm($nextCell) && $nextCell) {
            this._applyTabIndexToElement($nextCell)
        }
    }
    _handleTabKeyOnMasterDetailCell(target, direction) {
        if (this.getMasterDetailCell(target)) {
            this._updateFocusedCellPosition($(target), direction);
            const $nextCell = this._getNextCell(direction, "row");
            this._processNextCellInMasterDetail($nextCell, $(target));
            return true
        }
        return false
    }
    _getElementType(target) {
        return $(target).is("tr") ? "row" : "cell"
    }
    _isFastEditingStarted() {
        return this._isFastEditingAllowed() && this._fastEditingStarted
    }
    _getVisibleColumnCount() {
        return this._columnsController.getVisibleColumns(null, true).length
    }
    _isCellInRow(cellPosition, includeCommandCells) {
        const {
            columnIndex: columnIndex
        } = cellPosition;
        const visibleColumnsCount = this._getVisibleColumnCount();
        return includeCommandCells ? columnIndex >= 0 && columnIndex <= visibleColumnsCount - 1 : columnIndex > 0 && columnIndex < visibleColumnsCount - 1
    }
    _isCellElement($element) {
        return $element.length && "TD" === $element[0].tagName
    }
    _getCellElementFromTarget(target) {
        const elementType = this._getElementType(target);
        const $targetElement = $(target);
        let $cell;
        if ("cell" === elementType) {
            $cell = $targetElement.closest(`.${ROW_CLASS} > td`)
        } else {
            $cell = $targetElement.children().not(`.${COMMAND_EXPAND_CLASS}`).first()
        }
        return $cell
    }
    _getRowsViewElement() {
        var _this$_rowsView5;
        return null === (_this$_rowsView5 = this._rowsView) || void 0 === _this$_rowsView5 ? void 0 : _this$_rowsView5.element()
    }
    isKeyboardEnabled() {
        return this.option("keyboardNavigation.enabled")
    }
    _processCanceledEditCellPosition(rowIndex, columnIndex) {
        if (this._canceledCellPosition) {
            const isCanceled = this._canceledCellPosition.rowIndex === rowIndex && this._canceledCellPosition.columnIndex === columnIndex;
            this._canceledCellPosition = null;
            return isCanceled
        }
        return
    }
    updateFocusedRowIndex() {
        const dataController = this._dataController;
        const visibleRowIndex = this.getVisibleRowIndex();
        const visibleItems = dataController.items();
        const lastVisibleIndex = visibleItems.length ? visibleItems.length - 1 : -1;
        const rowIndexOffset = dataController.getRowIndexOffset();
        if (lastVisibleIndex >= 0 && visibleRowIndex > lastVisibleIndex) {
            this.setFocusedRowIndex(lastVisibleIndex + rowIndexOffset)
        }
    }
}
const rowsView = Base => class extends Base {
    _rowClick(e) {
        const editRowIndex = this._editingController.getEditRowIndex();
        const isKeyboardEnabled = this._keyboardNavigationController.isKeyboardEnabled();
        if (editRowIndex === e.rowIndex) {
            this._keyboardNavigationController.setCellFocusType()
        }
        const needTriggerPointerEventHandler = (isMobile() || !isKeyboardEnabled) && this.option("focusedRowEnabled");
        if (needTriggerPointerEventHandler) {
            this._triggerPointerDownEventHandler(e, !isKeyboardEnabled)
        }
        super._rowClick.apply(this, arguments)
    }
    _triggerPointerDownEventHandler(e, force) {
        const {
            originalEvent: originalEvent
        } = e.event;
        if (originalEvent) {
            const $cell = $(originalEvent.target);
            const columnIndex = this.getCellIndex($cell);
            const column = this._columnsController.getVisibleColumns()[columnIndex];
            const row = this._dataController.items()[e.rowIndex];
            if (this._keyboardNavigationController._isAllowEditing(row, column) || force) {
                const eventArgs = createEvent(originalEvent, {
                    currentTarget: originalEvent.target
                });
                this._keyboardNavigationController._pointerEventHandler(eventArgs)
            }
        }
    }
    renderFocusState(params) {
        const {
            preventScroll: preventScroll,
            pageSizeChanged: pageSizeChanged
        } = params ?? {};
        const $rowsViewElement = this.element();
        if ($rowsViewElement && !focused($rowsViewElement)) {
            $rowsViewElement.attr("tabindex", null)
        }
        pageSizeChanged && this._keyboardNavigationController.updateFocusedRowIndex();
        let rowIndex = this._keyboardNavigationController.getVisibleRowIndex();
        if (!isDefined(rowIndex) || rowIndex < 0) {
            rowIndex = 0
        }
        const cellElements = this.getCellElements(rowIndex);
        if (this._keyboardNavigationController.isKeyboardEnabled() && null !== cellElements && void 0 !== cellElements && cellElements.length) {
            this.updateFocusElementTabIndex(cellElements, preventScroll)
        }
    }
    updateFocusElementTabIndex(cellElements, preventScroll) {
        const $row = cellElements.eq(0).parent();
        if (isGroupRow($row)) {
            this._keyboardNavigationController._applyTabIndexToElement($row)
        } else {
            let columnIndex = this._keyboardNavigationController.getColumnIndex();
            if (!isDefined(columnIndex) || columnIndex < 0) {
                columnIndex = 0
            }
            this._updateFocusedCellTabIndex(cellElements, columnIndex)
        }
    }
    _updateFocusedCellTabIndex(cellElements, columnIndex) {
        const keyboardController = this._keyboardNavigationController;
        const cellElementsLength = cellElements ? cellElements.length : -1;
        const updateCellTabIndex = function($cell) {
            const isMasterDetailCell = !!keyboardController.getMasterDetailCell($cell);
            const isValidCell = keyboardController._isCellValid($cell);
            if (!isMasterDetailCell && isValidCell && keyboardController._isCellElement($cell)) {
                keyboardController._applyTabIndexToElement($cell);
                keyboardController.setCellFocusType();
                return true
            }
            return
        };
        const $cell = GridCoreKeyboardNavigationDom.getCellToFocus(cellElements, columnIndex);
        if ($cell.length) {
            updateCellTabIndex($cell)
        } else {
            if (cellElementsLength <= columnIndex) {
                columnIndex = cellElementsLength - 1
            }
            for (let i = columnIndex; i < cellElementsLength; ++i) {
                if (updateCellTabIndex($(cellElements[i]))) {
                    break
                }
            }
        }
    }
    renderDelayedTemplates(change) {
        super.renderDelayedTemplates.apply(this, arguments);
        this.waitAsyncTemplates().done((() => {
            this._renderFocusByChange(change)
        }))
    }
    _renderFocusByChange(change) {
        var _change$changeTypes;
        const {
            operationTypes: operationTypes,
            repaintChangesOnly: repaintChangesOnly
        } = change ?? {};
        const {
            fullReload: fullReload,
            pageSize: pageSize
        } = operationTypes ?? {};
        const hasInsertsOrRemoves = !!(null !== change && void 0 !== change && null !== (_change$changeTypes = change.changeTypes) && void 0 !== _change$changeTypes && _change$changeTypes.find((changeType => "insert" === changeType || "remove" === changeType)));
        if (!change || !repaintChangesOnly || fullReload || pageSize || hasInsertsOrRemoves) {
            const preventScroll = shouldPreventScroll(this);
            this.renderFocusState({
                preventScroll: preventScroll,
                pageSizeChanged: pageSize
            })
        }
    }
    _renderCore(change) {
        const deferred = super._renderCore.apply(this, arguments);
        this._renderFocusByChange(change);
        return deferred
    }
    _editCellPrepared($cell) {
        var _this$_keyboardNaviga;
        const editorInstance = this._getEditorInstance($cell);
        const isEditingNavigationMode = null === (_this$_keyboardNaviga = this._keyboardNavigationController) || void 0 === _this$_keyboardNaviga ? void 0 : _this$_keyboardNaviga._isFastEditingStarted();
        if (editorInstance && isEditingNavigationMode) {
            this._handleEditingNavigationMode(editorInstance)
        }
        super._editCellPrepared.apply(this, arguments)
    }
    _handleEditingNavigationMode(editorInstance) {
        ["downArrow", "upArrow"].forEach((keyName => {
            const originalKeyHandler = editorInstance._supportedKeys()[keyName];
            editorInstance.registerKeyHandler(keyName, (e => {
                const isDropDownOpened = "true" === editorInstance._input().attr("aria-expanded");
                if (isDropDownOpened) {
                    return originalKeyHandler && originalKeyHandler.call(editorInstance, e)
                }
            }))
        }));
        editorInstance.registerKeyHandler("leftArrow", noop);
        editorInstance.registerKeyHandler("rightArrow", noop);
        const isDateBoxWithMask = editorInstance.NAME === DATEBOX_WIDGET_NAME && editorInstance.option("useMaskBehavior");
        if (isDateBoxWithMask) {
            editorInstance.registerKeyHandler("enter", noop)
        }
    }
    _getEditorInstance($cell) {
        const $editor = $cell.find(".dx-texteditor").eq(0);
        return gridCoreUtils.getWidgetInstance($editor)
    }
};
const editing = Base => class extends Base {
    editCell(rowIndex, columnIndex) {
        if (this._keyboardNavigationController._processCanceledEditCellPosition(rowIndex, columnIndex)) {
            return false
        }
        const isCellEditing = super.editCell(rowIndex, columnIndex);
        if (isCellEditing) {
            this._keyboardNavigationController.setupFocusedView()
        }
        return isCellEditing
    }
    editRow(rowIndex) {
        const visibleColumnIndex = this._keyboardNavigationController.getVisibleColumnIndex();
        const column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
        if (column && column.type || this.option("editing.mode") === EDIT_MODE_FORM) {
            this._keyboardNavigationController._resetFocusedCell()
        }
        super.editRow(rowIndex);
        return
    }
    addRow(parentKey) {
        this._keyboardNavigationController.setupFocusedView();
        this._keyboardNavigationController.setCellFocusType();
        return super.addRow.apply(this, arguments)
    }
    getFocusedCellInRow(rowIndex) {
        let $cell = super.getFocusedCellInRow(rowIndex);
        const rowIndexOffset = this._dataController.getRowIndexOffset();
        const focusedRowIndex = this._keyboardNavigationController._focusedCellPosition.rowIndex - rowIndexOffset;
        if (this._keyboardNavigationController.isKeyboardEnabled() && focusedRowIndex === rowIndex) {
            const $focusedCell = this._keyboardNavigationController._getFocusedCell();
            if (isElementDefined($focusedCell) && !$focusedCell.hasClass(COMMAND_EDIT_CLASS)) {
                $cell = $focusedCell
            }
        }
        return $cell
    }
    _processCanceledEditingCell() {
        this.closeEditCell().done((() => {
            this._keyboardNavigationController._updateFocus()
        }))
    }
    closeEditCell() {
        const keyboardNavigation = this._keyboardNavigationController;
        keyboardNavigation._fastEditingStarted = false;
        const result = super.closeEditCell.apply(this, arguments);
        keyboardNavigation._updateFocus();
        return result
    }
    _delayedInputFocus() {
        this._keyboardNavigationController._isNeedScroll = true;
        super._delayedInputFocus.apply(this, arguments)
    }
    _isEditingStart() {
        const cancel = super._isEditingStart.apply(this, arguments);
        if (cancel && !this._keyboardNavigationController._isNeedFocus) {
            const $cell = this._keyboardNavigationController._getFocusedCell();
            this._keyboardNavigationController._focus($cell, true)
        }
        return cancel
    }
};
const data = Base => class extends Base {
    _correctRowIndices(getRowIndexCorrection) {
        const focusedCellPosition = this._keyboardNavigationController._focusedCellPosition;
        super._correctRowIndices.apply(this, arguments);
        if (focusedCellPosition && focusedCellPosition.rowIndex >= 0) {
            const focusedRowIndexCorrection = getRowIndexCorrection(focusedCellPosition.rowIndex);
            if (focusedRowIndexCorrection) {
                focusedCellPosition.rowIndex += focusedRowIndexCorrection;
                this._editorFactoryController.refocus()
            }
        }
    }
    getMaxRowIndex() {
        let result = this.items().length - 1;
        const virtualItemsCount = this.virtualItemsCount();
        if (virtualItemsCount) {
            const rowIndexOffset = this.getRowIndexOffset();
            result += rowIndexOffset + virtualItemsCount.end
        }
        return result
    }
};
const adaptiveColumns = Base => class extends Base {
    _showHiddenCellsInView(_ref) {
        let {
            viewName: viewName,
            $cells: $cells,
            isCommandColumn: isCommandColumn
        } = _ref;
        super._showHiddenCellsInView.apply(this, arguments);
        viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && $cells.each(((_, cellElement) => {
            const $cell = $(cellElement);
            isCellInHeaderRow($cell) && $cell.attr("tabindex", 0)
        }))
    }
    _hideVisibleCellInView(_ref2) {
        let {
            viewName: viewName,
            $cell: $cell,
            isCommandColumn: isCommandColumn
        } = _ref2;
        super._hideVisibleCellInView.apply(this, arguments);
        if (viewName === COLUMN_HEADERS_VIEW && !isCommandColumn && isCellInHeaderRow($cell)) {
            $cell.removeAttr("tabindex")
        }
    }
};
export const keyboardNavigationModule = {
    defaultOptions: () => ({
        useLegacyKeyboardNavigation: false,
        keyboardNavigation: {
            enabled: true,
            enterKeyAction: "startEdit",
            enterKeyDirection: "none",
            editOnKeyPress: false
        }
    }),
    controllers: {
        keyboardNavigation: KeyboardNavigationController
    },
    extenders: {
        views: {
            rowsView: rowsView
        },
        controllers: {
            editing: editing,
            data: data,
            adaptiveColumns: adaptiveColumns,
            keyboardNavigation: keyboardNavigationScrollableA11yExtender
        }
    }
};
