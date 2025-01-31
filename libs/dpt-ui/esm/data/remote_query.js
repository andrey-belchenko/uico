/**
 * DevExtreme (esm/data/remote_query.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import queryAdapters from "./query_adapters";
import {
    errors,
    handleError
} from "./errors";
import {
    each
} from "../core/utils/iterator";
import {
    isFunction
} from "../core/utils/type";
import {
    Deferred
} from "../core/utils/deferred";
import arrayQueryImpl from "./array_query";
const remoteQueryImpl = function(url, queryOptions, tasks) {
    tasks = tasks || [];
    queryOptions = queryOptions || {};
    const createTask = function(name, args) {
        return {
            name: name,
            args: args
        }
    };
    const exec = function(executorTask) {
        const d = new Deferred;
        let _adapterFactory;
        let _adapter;
        let _taskQueue;
        let _currentTask;
        let _mergedSortArgs;
        const rejectWithNotify = function(error) {
            const handler = queryOptions.errorHandler;
            if (handler) {
                handler(error)
            }
            handleError(error);
            d.reject(error)
        };

        function mergeSortTask(task) {
            switch (task.name) {
                case "sortBy":
                    _mergedSortArgs = [task.args];
                    return true;
                case "thenBy":
                    if (!_mergedSortArgs) {
                        throw errors.Error("E4004")
                    }
                    _mergedSortArgs.push(task.args);
                    return true
            }
            return false
        }
        try {
            _adapterFactory = queryOptions.adapter;
            if (!isFunction(_adapterFactory)) {
                _adapterFactory = queryAdapters[_adapterFactory]
            }
            _adapter = _adapterFactory(queryOptions);
            _taskQueue = [].concat(tasks).concat(executorTask);
            const optimize = _adapter.optimize;
            if (optimize) {
                optimize(_taskQueue)
            }
            while (_taskQueue.length) {
                _currentTask = _taskQueue[0];
                if (!mergeSortTask(_currentTask)) {
                    if (_mergedSortArgs) {
                        _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
                        _mergedSortArgs = null;
                        continue
                    }
                    if ("enumerate" !== String(_currentTask.name)) {
                        if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
                            break
                        }
                    }
                }
                _taskQueue.shift()
            }! function() {
                const head = _taskQueue[0];
                const unmergedTasks = [];
                if (head && "multiSort" === head.name) {
                    _taskQueue.shift();
                    each(head.args[0], (function() {
                        unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this))
                    }))
                }
                _taskQueue = unmergedTasks.concat(_taskQueue)
            }();
            _adapter.exec(url).done((function(result, extra) {
                if (!_taskQueue.length) {
                    d.resolve(result, extra)
                } else {
                    let clientChain = arrayQueryImpl(result, {
                        errorHandler: queryOptions.errorHandler
                    });
                    each(_taskQueue, (function() {
                        clientChain = clientChain[this.name].apply(clientChain, this.args)
                    }));
                    clientChain.done(d.resolve).fail(d.reject)
                }
            })).fail(rejectWithNotify)
        } catch (x) {
            rejectWithNotify(x)
        }
        return d.promise()
    };
    const query = {};
    each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], (function() {
        const name = String(this);
        query[name] = function() {
            return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name, arguments)))
        }
    }));
    each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], (function() {
        const name = String(this);
        query[name] = function() {
            return exec.call(this, createTask(name, arguments))
        }
    }));
    return query
};
export default remoteQueryImpl;
