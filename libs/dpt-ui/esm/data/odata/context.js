/**
 * DevExtreme (esm/data/odata/context.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "../../core/class";
import {
    extend
} from "../../core/utils/extend";
import {
    isDefined,
    isPlainObject
} from "../../core/utils/type";
import {
    each
} from "../../core/utils/iterator";
import {
    errors,
    handleError
} from "../errors";
import ODataStore from "./store";
import RequestDispatcher from "./request_dispatcher";
import {
    escapeServiceOperationParams,
    formatFunctionInvocationUrl
} from "./utils";
import {
    when,
    Deferred
} from "../../core/utils/deferred";
import "./query_adapter";
const ODataContext = Class.inherit({
    ctor(options) {
        this._requestDispatcher = new RequestDispatcher(options);
        this._errorHandler = options.errorHandler;
        each(options.entities || [], ((entityAlias, entityOptions) => {
            this[entityAlias] = new ODataStore(extend({}, options, {
                url: `${this._requestDispatcher.url}/${encodeURIComponent(entityOptions.name||entityAlias)}`
            }, entityOptions))
        }))
    },
    get(operationName, params) {
        return this.invoke(operationName, params, "GET")
    },
    invoke(operationName) {
        let params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        let httpMethod = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
        httpMethod = httpMethod.toLowerCase();
        const d = new Deferred;
        let url = `${this._requestDispatcher.url}/${encodeURIComponent(operationName)}`;
        let payload;
        if (4 === this.version()) {
            if ("get" === httpMethod) {
                url = formatFunctionInvocationUrl(url, escapeServiceOperationParams(params, this.version()));
                params = null
            } else if ("post" === httpMethod) {
                payload = params;
                params = null
            }
        }
        when(this._requestDispatcher.sendRequest(url, httpMethod, escapeServiceOperationParams(params, this.version()), payload)).done((r => {
            if (isPlainObject(r) && operationName in r) {
                r = r[operationName]
            }
            d.resolve(r)
        })).fail(this._errorHandler).fail(handleError).fail(d.reject);
        return d.promise()
    },
    objectLink(entityAlias, key) {
        const store = this[entityAlias];
        if (!store) {
            throw errors.Error("E4015", entityAlias)
        }
        if (!isDefined(key)) {
            return null
        }
        return {
            __metadata: {
                uri: store._byKeyUrl(key)
            }
        }
    },
    version() {
        return this._requestDispatcher.version
    }
});
export default ODataContext;
