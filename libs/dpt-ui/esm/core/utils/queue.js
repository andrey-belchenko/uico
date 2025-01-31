/**
 * DevExtreme (esm/core/utils/queue.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import errors from "../errors";
import {
    when
} from "../../core/utils/deferred";

function createQueue(discardPendingTasks) {
    let _tasks = [];
    let _busy = false;

    function exec() {
        while (_tasks.length) {
            _busy = true;
            const task = _tasks.shift();
            const result = task();
            if (void 0 === result) {
                continue
            }
            if (result.then) {
                when(result).always(exec);
                return
            }
            throw errors.Error("E0015")
        }
        _busy = false
    }
    return {
        add: function(task, removeTaskCallback) {
            if (!discardPendingTasks) {
                _tasks.push(task)
            } else {
                if (_tasks[0] && removeTaskCallback) {
                    removeTaskCallback(_tasks[0])
                }
                _tasks = [task]
            }
            if (!_busy) {
                exec()
            }
        },
        busy: function() {
            return _busy
        }
    }
}
export {
    createQueue as create
};
export const enqueue = createQueue().add;
