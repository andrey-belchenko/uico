/**
 * DevExtreme (esm/viz/translators/range.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined,
    isDate,
    isFunction
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
const _isDefined = isDefined;
const _isDate = isDate;
const _isFunction = isFunction;
import {
    unique
} from "../core/utils";
const minSelector = "min";
const maxSelector = "max";
const minVisibleSelector = "minVisible";
const maxVisibleSelector = "maxVisible";
const baseSelector = "base";
const axisTypeSelector = "axisType";

function otherLessThan(thisValue, otherValue) {
    return otherValue < thisValue
}

function otherGreaterThan(thisValue, otherValue) {
    return otherValue > thisValue
}

function compareAndReplace(thisValue, otherValue, setValue, compare) {
    const otherValueDefined = _isDefined(otherValue);
    if (_isDefined(thisValue)) {
        if (otherValueDefined && compare(thisValue, otherValue)) {
            setValue(otherValue)
        }
    } else if (otherValueDefined) {
        setValue(otherValue)
    }
}
export const Range = function(range) {
    range && extend(this, range)
};
const _Range = Range;
_Range.prototype = {
    constructor: _Range,
    addRange: function(otherRange) {
        const that = this;
        const categories = that.categories;
        const otherCategories = otherRange.categories;
        const isDiscrete = "discrete" === that.axisType;
        const compareAndReplaceByField = function(field, compare) {
            compareAndReplace(that[field], otherRange[field], (function(value) {
                that[field] = value
            }), compare)
        };
        const controlValuesByVisibleBounds = function(valueField, visibleValueField, compare) {
            compareAndReplace(that[valueField], that[visibleValueField], (function(value) {
                _isDefined(that[valueField]) && (that[valueField] = value)
            }), compare)
        };
        const checkField = function(field) {
            that[field] = that[field] || otherRange[field]
        };
        checkField("invert");
        checkField("containsConstantLine");
        checkField("axisType");
        checkField("dataType");
        checkField("isSpacedMargin");
        if ("logarithmic" === that.axisType) {
            checkField("base")
        } else {
            that.base = void 0
        }
        compareAndReplaceByField("min", otherLessThan);
        compareAndReplaceByField("max", otherGreaterThan);
        if (isDiscrete) {
            checkField("minVisible");
            checkField("maxVisible")
        } else {
            compareAndReplaceByField("minVisible", otherLessThan);
            compareAndReplaceByField("maxVisible", otherGreaterThan)
        }
        compareAndReplaceByField("interval", otherLessThan);
        if (!isDiscrete) {
            controlValuesByVisibleBounds("min", "minVisible", otherLessThan);
            controlValuesByVisibleBounds("min", "maxVisible", otherLessThan);
            controlValuesByVisibleBounds("max", "maxVisible", otherGreaterThan);
            controlValuesByVisibleBounds("max", "minVisible", otherGreaterThan)
        }
        if (void 0 === categories) {
            that.categories = otherCategories
        } else {
            that.categories = otherCategories ? unique(categories.concat(otherCategories)) : categories
        }
        if ("logarithmic" === that.axisType) {
            checkField("allowNegatives");
            compareAndReplaceByField("linearThreshold", otherLessThan)
        }
        return that
    },
    isEmpty: function() {
        return (!_isDefined(this.min) || !_isDefined(this.max)) && (!this.categories || 0 === this.categories.length)
    },
    correctValueZeroLevel: function() {
        const that = this;
        if (_isDate(that.max) || _isDate(that.min)) {
            return that
        }

        function setZeroLevel(min, max) {
            that[min] < 0 && that[max] < 0 && (that[max] = 0);
            that[min] > 0 && that[max] > 0 && (that[min] = 0)
        }
        setZeroLevel("min", "max");
        setZeroLevel("minVisible", "maxVisible");
        return that
    },
    sortCategories(sort) {
        if (false === sort || !this.categories) {
            return
        }
        if (Array.isArray(sort)) {
            const sortValues = sort.map((item => item.valueOf()));
            const filteredSeriesCategories = this.categories.filter((item => -1 === sortValues.indexOf(item.valueOf())));
            this.categories = sort.concat(filteredSeriesCategories)
        } else {
            const notAFunction = !_isFunction(sort);
            if (notAFunction && "string" !== this.dataType) {
                sort = (a, b) => a.valueOf() - b.valueOf()
            } else if (notAFunction) {
                sort = false
            }
            sort && this.categories.sort(sort)
        }
    }
};
