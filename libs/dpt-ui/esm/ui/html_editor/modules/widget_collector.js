/**
 * DevExtreme (esm/ui/html_editor/modules/widget_collector.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    each
} from "../../../core/utils/iterator";
export default class WidgetCollector {
    constructor() {
        this._collection = []
    }
    clear() {
        this._collection = []
    }
    add(name, instance) {
        this._collection.push({
            name: name,
            instance: instance
        })
    }
    remove(name) {
        this._collection = this._collection.filter((item => item.name !== name))
    }
    getByName(widgetName) {
        let widget = null;
        each(this._collection, ((index, _ref) => {
            let {
                name: name,
                instance: instance
            } = _ref;
            if (name === widgetName) {
                widget = instance;
                return false
            }
        }));
        return widget
    }
    each(handler) {
        this._collection.forEach((_ref2 => {
            let {
                name: name,
                instance: instance
            } = _ref2;
            return instance && handler(name, instance)
        }))
    }
}
