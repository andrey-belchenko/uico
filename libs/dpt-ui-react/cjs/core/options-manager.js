/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsManager = exports.scheduleGuards = exports.unscheduleGuards = void 0;
/* eslint-disable no-restricted-globals */
const comparer_1 = require("./configuration/comparer");
const tree_1 = require("./configuration/tree");
const utils_1 = require("./configuration/utils");
const helpers_1 = require("./helpers");
const optionsManagers = new Set();
let guardTimeoutHandler = -1;
let innerGuardTimeoutHandler = -1;
function unscheduleGuards() {
    clearTimeout(guardTimeoutHandler);
    clearTimeout(innerGuardTimeoutHandler);
}
exports.unscheduleGuards = unscheduleGuards;
function scheduleGuards() {
    unscheduleGuards();
    guardTimeoutHandler = window.setTimeout(() => {
        innerGuardTimeoutHandler = window.setTimeout(() => {
            optionsManagers.forEach((optionManager) => optionManager.execGuards());
        });
    });
}
exports.scheduleGuards = scheduleGuards;
class OptionsManager {
    constructor() {
        this.guards = {};
        this.isUpdating = false;
        this.onOptionChanged = this.onOptionChanged.bind(this);
        this.wrapOptionValue = this.wrapOptionValue.bind(this);
    }
    setInstance(instance, config, subscribableOptions, independentEvents) {
        this.instance = instance;
        this.currentConfig = config;
        this.subscribableOptions = new Set(subscribableOptions);
        this.independentEvents = new Set(independentEvents);
        optionsManagers.add(this);
    }
    getInitialOptions(rootNode) {
        const config = (0, tree_1.buildConfig)(rootNode, false);
        const options = {};
        Object.keys(config.options).forEach((key) => {
            options[key] = this.wrapOptionValue(key, config.options[key]);
        });
        return options;
    }
    getTemplateOptions(rootNode) {
        const config = (0, tree_1.buildConfig)(rootNode, false);
        return config.templates;
    }
    update(config, dxtemplates) {
        const changedOptions = [];
        const optionChangedHandler = ({ value, fullName }) => {
            changedOptions.push([fullName, value]);
        };
        this.instance.on('optionChanged', optionChangedHandler);
        const changes = (0, comparer_1.getChanges)(config, this.currentConfig);
        if (!changes.options && !changes.templates && !changes.removedOptions.length) {
            return;
        }
        this.instance.beginUpdate();
        this.isUpdating = true;
        changes.removedOptions.forEach((optionName) => {
            this.resetOption(optionName);
        });
        if (Object.keys(dxtemplates).length > 0) {
            this.setValue('integrationOptions', {
                templates: dxtemplates,
            });
        }
        Object.keys(changes.options).forEach((key) => {
            this.setValue(key, changes.options[key]);
        });
        this.isUpdating = false;
        this.instance.off('optionChanged', optionChangedHandler);
        this.currentConfig = config;
        changedOptions.forEach(([name, value]) => {
            const currentPropValue = config.options[name];
            if (Object.prototype.hasOwnProperty.call(config.options, name)
                && currentPropValue !== value) {
                this.setValue(name, currentPropValue);
            }
        });
        this.instance.endUpdate();
    }
    onOptionChanged(e) {
        if (this.isUpdating) {
            return;
        }
        let valueDescriptor = (0, tree_1.findValue)(this.currentConfig, e.fullName.split('.'));
        if (!valueDescriptor || valueDescriptor.value !== e.value) {
            this.callOptionChangeHandler(e.fullName, e.value);
        }
        valueDescriptor = (0, tree_1.findValue)(this.currentConfig, e.fullName.split('.'));
        if (!valueDescriptor) {
            return;
        }
        const { value, type } = valueDescriptor;
        if (value instanceof Array && type === tree_1.ValueType.Array) {
            for (let i = 0; i < value.length; i += 1) {
                if (value[i] !== e.value?.[i]) {
                    this.addGuard(e.fullName, value);
                    return;
                }
            }
        }
        else if (type === tree_1.ValueType.Complex && value instanceof Object) {
            Object.keys(value).forEach((key) => {
                if (value[key] === e.value?.[key]) {
                    return;
                }
                this.addGuard((0, utils_1.mergeNameParts)(e.fullName, key), value[key]);
            });
        }
        else {
            const valuesAreEqual = value === e.value;
            const valuesAreEqualObjects = !valuesAreEqual
                && value instanceof Object
                && e.value instanceof Object
                && (0, utils_1.shallowEquals)(value, e.value);
            if (valuesAreEqual || valuesAreEqualObjects || this.instance.skipOptionsRollBack) {
                return;
            }
            this.addGuard(e.fullName, value);
        }
    }
    get isInstanceSet() {
        return !!this.instance;
    }
    dispose() {
        optionsManagers.delete(this);
        Object.keys(this.guards).forEach((optionName) => {
            delete this.guards[optionName];
        });
        this.instance = null;
    }
    isOptionSubscribable(optionName) {
        return this.subscribableOptions.has(optionName);
    }
    isIndependentEvent(optionName) {
        return this.independentEvents.has(optionName);
    }
    callOptionChangeHandler(optionName, optionValue) {
        if (!this.isOptionSubscribable(optionName)) {
            return;
        }
        const parts = optionName.split('.');
        const propName = parts[parts.length - 1];
        if (propName.startsWith('on')) {
            return;
        }
        const eventName = `on${(0, helpers_1.capitalizeFirstLetter)(propName)}Change`;
        parts[parts.length - 1] = eventName;
        const changeEvent = (0, tree_1.findValue)(this.currentConfig, parts);
        if (!changeEvent) {
            return;
        }
        if (typeof changeEvent.value !== 'function') {
            throw new Error(`Invalid value for the ${eventName} property.
                ${eventName} must be a function.`);
        }
        changeEvent.value(optionValue);
    }
    wrapOptionValue(name, value) {
        if (name.substr(0, 2) === 'on' && typeof value === 'function') {
            return (...args) => {
                if (!this.isUpdating || this.isIndependentEvent(name)) {
                    value(...args);
                }
            };
        }
        return value;
    }
    addGuard(optionName, optionValue) {
        if (this.guards[optionName] !== undefined) {
            return;
        }
        const handler = () => {
            this.setValue(optionName, optionValue);
            delete this.guards[optionName];
        };
        this.guards[optionName] = handler;
        scheduleGuards();
    }
    execGuards() {
        Object.values(this.guards)
            .forEach((handler) => handler());
    }
    resetOption(name) {
        this.instance.resetOption(name);
    }
    setValue(name, value) {
        if (this.guards[name]) {
            delete this.guards[name];
        }
        this.instance.option(name, this.wrapOptionValue(name, value));
    }
}
exports.OptionsManager = OptionsManager;
