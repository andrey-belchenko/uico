/**
 * DevExtreme (esm/__internal/grids/grid_core/views/utils/update_views_borders.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["rowsView"];
import {
    isDefined
} from "../../../../../core/utils/type";
const CLASSES = {
    borderedTop: "dx-bordered-top-view",
    borderedBottom: "dx-bordered-bottom-view"
};
const getFirstVisibleViewElement = _ref => {
    let {
        columnHeadersView: columnHeadersView,
        rowsView: rowsView
    } = _ref;
    if (null !== columnHeadersView && void 0 !== columnHeadersView && columnHeadersView.isVisible()) {
        return columnHeadersView.element()
    }
    return rowsView.element()
};
const getLastVisibleViewElement = _ref2 => {
    let {
        filterPanelView: filterPanelView,
        footerView: footerView,
        rowsView: rowsView
    } = _ref2;
    if (null !== filterPanelView && void 0 !== filterPanelView && filterPanelView.isVisible()) {
        return filterPanelView.element()
    }
    if (null !== footerView && void 0 !== footerView && footerView.isVisible()) {
        return footerView.element()
    }
    return rowsView.element()
};
const getViewElementWithClass = (viewsWithBorder, className) => {
    const borderedView = Object.values(viewsWithBorder).find((view => {
        var _view$element;
        return null === view || void 0 === view || null === (_view$element = view.element()) || void 0 === _view$element ? void 0 : _view$element.hasClass(className)
    }));
    return (null === borderedView || void 0 === borderedView ? void 0 : borderedView.element()) ?? null
};
const shouldUpdateBorders = (viewName, viewsWithBorder) => {
    var _rowsView$element;
    if (!Object.keys(viewsWithBorder).includes(viewName)) {
        return false
    }
    const {
        rowsView: rowsView
    } = viewsWithBorder, otherViews = _objectWithoutPropertiesLoose(viewsWithBorder, _excluded);
    if (!isDefined(null === rowsView || void 0 === rowsView || null === (_rowsView$element = rowsView.element) || void 0 === _rowsView$element ? void 0 : _rowsView$element.call(rowsView))) {
        return false
    }
    return Object.values(otherViews).filter((view => {
        var _view$isVisible;
        return null === view || void 0 === view || null === (_view$isVisible = view.isVisible) || void 0 === _view$isVisible ? void 0 : _view$isVisible.call(view)
    })).every((view => isDefined(null === view || void 0 === view ? void 0 : view.element())))
};
export const updateViewsBorders = (viewName, viewsWithBorder) => {
    if (!shouldUpdateBorders(viewName, viewsWithBorder)) {
        return
    }
    const $oldFirst = getViewElementWithClass(viewsWithBorder, CLASSES.borderedTop);
    const $oldLast = getViewElementWithClass(viewsWithBorder, CLASSES.borderedBottom);
    const $newFirst = getFirstVisibleViewElement(viewsWithBorder);
    const $newLast = getLastVisibleViewElement(viewsWithBorder);
    if ($oldFirst && !$oldFirst.is($newFirst)) {
        $oldFirst.removeClass(CLASSES.borderedTop)
    }
    if ($oldLast && !$oldLast.is($newLast)) {
        $oldLast.removeClass(CLASSES.borderedBottom)
    }
    if (!$newFirst.hasClass(CLASSES.borderedTop)) {
        $newFirst.addClass(CLASSES.borderedTop)
    }
    if (!$newLast.hasClass(CLASSES.borderedBottom)) {
        $newLast.addClass(CLASSES.borderedBottom)
    }
};
