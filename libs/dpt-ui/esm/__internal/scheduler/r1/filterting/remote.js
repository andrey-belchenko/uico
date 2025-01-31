/**
 * DevExtreme (esm/__internal/scheduler/r1/filterting/remote.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    equalByValue
} from "../../../../core/utils/common";
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    extend
} from "../../../../core/utils/extend";
import {
    isDefined,
    isString
} from "../../../../core/utils/type";
import {
    getDatesWithoutTime
} from "../utils/index";
const FilterPosition = {
    dateFilter: 0,
    userFilter: 1
};
class RemoteFilterCombiner {
    constructor(options) {
        this.options = options
    }
    get dataAccessors() {
        return this.options.dataAccessors
    }
    get dataSourceFilter() {
        return this.options.dataSourceFilter
    }
    get dateSerializationFormat() {
        return this.options.dateSerializationFormat
    }
    get forceIsoDateParsing() {
        return isDefined(this.options.forceIsoDateParsing) ? this.options.forceIsoDateParsing : true
    }
    makeDateFilter(min, max) {
        const {
            startDateExpr: startDateExpr,
            endDateExpr: endDateExpr,
            recurrenceRuleExpr: recurrenceRuleExpr
        } = this.dataAccessors.expr;
        const dateFilter = [
            [
                [endDateExpr, ">=", min],
                [startDateExpr, "<", max]
            ], "or", [recurrenceRuleExpr, "startswith", "freq"], "or", [
                [endDateExpr, min],
                [startDateExpr, min]
            ]
        ];
        if (!recurrenceRuleExpr) {
            dateFilter.splice(1, 2)
        }
        return dateFilter
    }
    combineFilters(dateFilter, userFilter) {
        const combinedFilter = [];
        if (dateFilter) {
            combinedFilter.push(dateFilter)
        }
        if (userFilter) {
            combinedFilter.push(userFilter)
        }
        return this.serializeRemoteFilter(combinedFilter)
    }
    serializeRemoteFilter(combinedFilter) {
        if (!Array.isArray(combinedFilter)) {
            return combinedFilter
        }
        const {
            startDateExpr: startDateExpr,
            endDateExpr: endDateExpr
        } = this.dataAccessors.expr;
        const filter = extend([], combinedFilter);
        if (isString(filter[0])) {
            if (this.forceIsoDateParsing && filter.length > 1) {
                if (filter[0] === startDateExpr || filter[0] === endDateExpr) {
                    const lastFilterValue = filter[filter.length - 1];
                    filter[filter.length - 1] = dateSerialization.serializeDate(new Date(lastFilterValue), this.dateSerializationFormat)
                }
            }
        }
        for (let i = 0; i < filter.length; i += 1) {
            filter[i] = this.serializeRemoteFilter(filter[i])
        }
        return filter
    }
    getUserFilter(dateFilter) {
        if (!this.dataSourceFilter || equalByValue(this.dataSourceFilter, dateFilter)) {
            return
        }
        const containsDateFilter = this.dataSourceFilter.length > 0 && equalByValue(this.dataSourceFilter[FilterPosition.dateFilter], dateFilter);
        const userFilter = containsDateFilter ? this.dataSourceFilter[FilterPosition.userFilter] : this.dataSourceFilter;
        return userFilter
    }
    combine(min, max) {
        const [trimMin, trimMax] = getDatesWithoutTime(min, max);
        const dateFilter = this.makeDateFilter(trimMin, trimMax);
        const userFilter = this.getUserFilter(dateFilter);
        const combinedFilter = this.combineFilters(dateFilter, userFilter);
        return combinedFilter
    }
}
export const combineRemoteFilter = options => new RemoteFilterCombiner(options).combine(options.min, options.max);
