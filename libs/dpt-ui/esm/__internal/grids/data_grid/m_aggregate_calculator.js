/**
 * DevExtreme (esm/__internal/grids/data_grid/m_aggregate_calculator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    compileGetter
} from "../../../core/utils/data";
import {
    isFunction
} from "../../../core/utils/type";
import {
    errors
} from "../../../data/errors";
import {
    aggregators
} from "../../../data/utils";

function depthFirstSearch(i, depth, root, callback) {
    let j = 0;
    if (i < depth) {
        for (; j < root.items.length; j++) {
            depthFirstSearch(i + 1, depth, root.items[j], callback)
        }
    }
    if (i === depth) {
        callback(root)
    }
}

function map(array, callback) {
    let i;
    if ("map" in array) {
        return array.map(callback)
    }
    const result = new Array(array.length);
    for (i in array) {
        result[i] = callback(array[i], i)
    }
    return result
}

function isEmpty(x) {
    return x !== x || "" === x || null === x || void 0 === x
}

function isCount(aggregator) {
    return aggregator === aggregators.count
}

function normalizeAggregate(aggregate) {
    const selector = compileGetter(aggregate.selector);
    const skipEmptyValues = "skipEmptyValues" in aggregate ? aggregate.skipEmptyValues : true;
    let {
        aggregator: aggregator
    } = aggregate;
    if ("string" === typeof aggregator) {
        aggregator = aggregators[aggregator];
        if (!aggregator) {
            throw errors.Error("E4001", aggregate.aggregator)
        }
    }
    return {
        selector: selector,
        aggregator: aggregator,
        skipEmptyValues: skipEmptyValues
    }
}
export default class AggregateCalculator {
    constructor(options) {
        this._data = options.data;
        this._groupLevel = options.groupLevel || 0;
        this._totalAggregates = map(options.totalAggregates || [], normalizeAggregate);
        this._groupAggregates = map(options.groupAggregates || [], normalizeAggregate);
        this._totals = []
    }
    calculate() {
        if (this._totalAggregates.length) {
            this._calculateTotals(0, {
                items: this._data
            })
        }
        if (this._groupAggregates.length && this._groupLevel > 0) {
            this._calculateGroups({
                items: this._data
            })
        }
    }
    totalAggregates() {
        return this._totals
    }
    _aggregate(aggregates, data, container) {
        const length = data.items ? data.items.length : 0;
        for (let i = 0; i < aggregates.length; i++) {
            if (isCount(aggregates[i].aggregator)) {
                container[i] = (container[i] || 0) + length;
                continue
            }
            for (let j = 0; j < length; j++) {
                this._accumulate(i, aggregates[i], container, data.items[j])
            }
        }
    }
    _calculateTotals(level, data) {
        if (0 === level) {
            this._totals = this._seed(this._totalAggregates)
        }
        if (level === this._groupLevel) {
            this._aggregate(this._totalAggregates, data, this._totals)
        } else {
            for (let i = 0; i < data.items.length; i++) {
                this._calculateTotals(level + 1, data.items[i])
            }
        }
        if (0 === level) {
            this._totals = this._finalize(this._totalAggregates, this._totals)
        }
    }
    _calculateGroups(root) {
        const maxLevel = this._groupLevel;
        let currentLevel = maxLevel + 1;
        const seedFn = this._seed.bind(this, this._groupAggregates);
        const stepFn = this._aggregate.bind(this, this._groupAggregates);
        const finalizeFn = this._finalize.bind(this, this._groupAggregates);

        function aggregator(node) {
            node.aggregates = seedFn(currentLevel - 1);
            if (currentLevel === maxLevel) {
                stepFn(node, node.aggregates)
            } else {
                depthFirstSearch(currentLevel, maxLevel, node, (innerNode => {
                    stepFn(innerNode, node.aggregates)
                }))
            }
            node.aggregates = finalizeFn(node.aggregates)
        }
        while (--currentLevel > 0) {
            depthFirstSearch(0, currentLevel, root, aggregator)
        }
    }
    _seed(aggregates, groupIndex) {
        return map(aggregates, (aggregate => {
            const {
                aggregator: aggregator
            } = aggregate;
            const seed = "seed" in aggregator ? isFunction(aggregator.seed) ? aggregator.seed(groupIndex) : aggregator.seed : NaN;
            return seed
        }))
    }
    _accumulate(aggregateIndex, aggregate, results, item) {
        const value = aggregate.selector(item);
        const {
            aggregator: aggregator
        } = aggregate;
        const {
            skipEmptyValues: skipEmptyValues
        } = aggregate;
        if (skipEmptyValues && isEmpty(value)) {
            return
        }
        if (results[aggregateIndex] !== results[aggregateIndex]) {
            results[aggregateIndex] = value
        } else {
            results[aggregateIndex] = aggregator.step(results[aggregateIndex], value)
        }
    }
    _finalize(aggregates, results) {
        return map(aggregates, ((aggregate, index) => {
            const fin = aggregate.aggregator.finalize;
            return fin ? fin(results[index]) : results[index]
        }))
    }
}
