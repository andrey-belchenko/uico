/**
 * DevExtreme (renovation/ui/pager/common/pager_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.PagerProps = exports.InternalPagerProps = void 0;
var _base_pager_props = require("./base_pager_props");
const PagerProps = exports.PagerProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_base_pager_props.BasePagerProps), Object.getOwnPropertyDescriptors({
    defaultPageSize: 5,
    pageSizeChange: () => {},
    defaultPageIndex: 1,
    pageIndexChange: () => {}
})));
const InternalPagerProps = exports.InternalPagerProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(_base_pager_props.BasePagerProps), Object.getOwnPropertyDescriptors({
    pageSize: 5,
    pageIndex: 1
})));
