/**
 * DevExtreme (cjs/__internal/scheduler/appointments/data_provider/m_appointment_data_source.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppointmentDataSource = void 0;
var _deferred = require("../../../../core/utils/deferred");
const STORE_EVENTS = {
    updating: "updating",
    push: "push"
};
class AppointmentDataSource {
    constructor(dataSource) {
        this.setDataSource(dataSource);
        this._updatedAppointmentKeys = []
    }
    get keyName() {
        const store = this._dataSource.store();
        return store.key()
    }
    get isDataSourceInit() {
        return !!this._dataSource
    }
    _getStoreKey(target) {
        const store = this._dataSource.store();
        return store.keyOf(target)
    }
    setDataSource(dataSource) {
        this._dataSource = dataSource;
        this.cleanState();
        this._initStoreChangeHandlers()
    }
    _initStoreChangeHandlers() {
        const dataSource = this._dataSource;
        const store = null === dataSource || void 0 === dataSource ? void 0 : dataSource.store();
        if (store) {
            store.on(STORE_EVENTS.updating, (key => {
                const keyName = store.key();
                if (keyName) {
                    this._updatedAppointmentKeys.push({
                        key: keyName,
                        value: key
                    })
                } else {
                    this._updatedAppointment = key
                }
            }));
            store.on(STORE_EVENTS.push, (pushItems => {
                const items = dataSource.items();
                const keyName = store.key();
                pushItems.forEach((pushItem => {
                    const itemExists = 0 !== items.filter((item => item[keyName] === pushItem.key)).length;
                    if (itemExists) {
                        this._updatedAppointmentKeys.push({
                            key: keyName,
                            value: pushItem.key
                        })
                    } else {
                        const {
                            data: data
                        } = pushItem;
                        data && items.push(data)
                    }
                }));
                dataSource.load()
            }))
        }
    }
    getUpdatedAppointment() {
        return this._updatedAppointment
    }
    getUpdatedAppointmentKeys() {
        return this._updatedAppointmentKeys
    }
    cleanState() {
        this._updatedAppointment = null;
        this._updatedAppointmentKeys = []
    }
    add(rawAppointment) {
        return this._dataSource.store().insert(rawAppointment).done((() => this._dataSource.load()))
    }
    update(target, data) {
        const key = this._getStoreKey(target);
        const d = new _deferred.Deferred;
        this._dataSource.store().update(key, data).done((result => this._dataSource.load().done((() => d.resolve(result))).fail(d.reject))).fail(d.reject);
        return d.promise()
    }
    remove(rawAppointment) {
        const key = this._getStoreKey(rawAppointment);
        return this._dataSource.store().remove(key).done((() => this._dataSource.load()))
    }
    destroy() {
        var _this$_dataSource;
        const store = null === (_this$_dataSource = this._dataSource) || void 0 === _this$_dataSource ? void 0 : _this$_dataSource.store();
        if (store) {
            store.off(STORE_EVENTS.updating);
            store.off(STORE_EVENTS.push)
        }
    }
}
exports.AppointmentDataSource = AppointmentDataSource;
