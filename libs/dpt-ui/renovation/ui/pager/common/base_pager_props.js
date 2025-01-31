/**
 * DevExtreme (renovation/ui/pager/common/base_pager_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.BasePagerProps = void 0;
var _message = _interopRequireDefault(require("../../../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const BasePagerProps = exports.BasePagerProps = {
    gridCompatibility: true,
    showInfo: false,
    displayMode: "adaptive",
    maxPagesCount: 10,
    pageCount: 10,
    visible: true,
    hasKnownLastPage: true,
    pagesNavigatorVisible: "auto",
    showPageSizes: true,
    pageSizes: Object.freeze([5, 10]),
    showNavigationButtons: false,
    totalCount: 0,
    get label() {
        return _message.default.format("dxPager-ariaLabel")
    }
};
