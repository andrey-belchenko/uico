/**
 * DevExtreme (esm/ui/diagram/diagram.bar.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getDiagram
} from "./diagram.importer";
class DiagramBar {
    constructor(owner) {
        const {
            EventDispatcher: EventDispatcher
        } = getDiagram();
        this.onChanged = new EventDispatcher;
        this._owner = owner
    }
    raiseBarCommandExecuted(key, parameter) {
        this.onChanged.raise("notifyBarCommandExecuted", parseInt(key), parameter)
    }
    getCommandKeys() {
        throw "Not Implemented"
    }
    setItemValue(key, value) {}
    setItemEnabled(key, enabled) {}
    setItemVisible(key, enabled) {}
    setEnabled(enabled) {}
    setItemSubItems(key, items) {}
    isVisible() {
        return true
    }
    _getKeys(items) {
        const keys = items.reduce(((commands, item) => {
            if (void 0 !== item.command) {
                commands.push(item.command)
            }
            if (item.items) {
                commands = commands.concat(this._getKeys(item.items))
            }
            return commands
        }), []);
        return keys
    }
}
export default DiagramBar;
