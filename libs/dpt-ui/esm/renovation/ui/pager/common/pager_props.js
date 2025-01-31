/**
 * DevExtreme (esm/renovation/ui/pager/common/pager_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    BasePagerProps
} from "./base_pager_props";
export const PagerProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BasePagerProps), Object.getOwnPropertyDescriptors({
    defaultPageSize: 5,
    pageSizeChange: () => {},
    defaultPageIndex: 1,
    pageIndexChange: () => {}
})));
export const InternalPagerProps = Object.create(Object.prototype, Object.assign(Object.getOwnPropertyDescriptors(BasePagerProps), Object.getOwnPropertyDescriptors({
    pageSize: 5,
    pageIndex: 1
})));
