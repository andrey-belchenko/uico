/**
 * DevExtreme (esm/core/utils/ajax_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extendFromObject
} from "./extend";
import {
    getWindow,
    hasWindow
} from "./window";
import domAdapter from "../dom_adapter";
const window = getWindow();
const createScript = function(options) {
    const script = domAdapter.createElement("script");
    for (const name in options) {
        script[name] = options[name]
    }
    return script
};
const appendToHead = function(element) {
    return domAdapter.getHead().appendChild(element)
};
const removeScript = function(scriptNode) {
    scriptNode.parentNode.removeChild(scriptNode)
};
const evalScript = function(code) {
    const script = createScript({
        text: code
    });
    appendToHead(script);
    removeScript(script)
};
const evalCrossDomainScript = function(url) {
    const script = createScript({
        src: url
    });
    return new Promise((function(resolve, reject) {
        const events = {
            load: resolve,
            error: reject
        };
        const loadHandler = function(e) {
            events[e.type]();
            removeScript(script)
        };
        for (const event in events) {
            domAdapter.listen(script, event, loadHandler)
        }
        appendToHead(script)
    }))
};

function getMethod(options) {
    return (options.method || "GET").toUpperCase()
}
const paramsConvert = function(params) {
    const result = [];
    for (const name in params) {
        let value = params[name];
        if (void 0 === value) {
            continue
        }
        if (null === value) {
            value = ""
        }
        if ("function" === typeof value) {
            value = value()
        }
        result.push(encodeURIComponent(name) + "=" + encodeURIComponent(value))
    }
    return result.join("&")
};
const getContentTypeHeader = function(options) {
    let defaultContentType;
    if (options.data && !options.upload && "GET" !== getMethod(options)) {
        defaultContentType = "application/x-www-form-urlencoded;charset=utf-8"
    }
    return options.contentType || defaultContentType
};
const getAcceptHeader = function(options) {
    const dataType = options.dataType || "*";
    const scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
    const accepts = {
        "*": "*/*",
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
        jsonp: scriptAccept,
        script: scriptAccept
    };
    extendFromObject(accepts, options.accepts, true);
    return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"]
};
const getRequestHeaders = function(options) {
    const headers = options.headers || {};
    headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
    headers.Accept = headers.Accept || getAcceptHeader(options);
    if (!options.crossDomain && !headers["X-Requested-With"]) {
        headers["X-Requested-With"] = "XMLHttpRequest"
    }
    return headers
};
const getJsonpOptions = function(options) {
    if ("jsonp" === options.dataType) {
        const random = Math.random().toString().replace(/\D/g, "");
        const callbackName = options.jsonpCallback || "dxCallback" + Date.now() + "_" + random;
        const callbackParameter = options.jsonp || "callback";
        options.data = options.data || {};
        options.data[callbackParameter] = callbackName;
        return callbackName
    }
};
const getRequestOptions = function(options, headers) {
    let params = options.data;
    const paramsAlreadyString = "string" === typeof params;
    let url = options.url || window.location.href;
    if (!paramsAlreadyString && !options.cache) {
        params = params || {};
        params._ = Date.now()
    }
    if (params && !options.upload) {
        if (!paramsAlreadyString) {
            params = paramsConvert(params)
        }
        if ("GET" === getMethod(options)) {
            if ("" !== params) {
                url += (url.indexOf("?") > -1 ? "&" : "?") + params
            }
            params = null
        } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
            params = params.replace(/%20/g, "+")
        }
    }
    return {
        url: url,
        parameters: params
    }
};
const isCrossDomain = function(url) {
    if (!hasWindow()) {
        return true
    }
    let crossDomain = false;
    const originAnchor = domAdapter.createElement("a");
    const urlAnchor = domAdapter.createElement("a");
    originAnchor.href = window.location.href;
    try {
        urlAnchor.href = url;
        urlAnchor.href = urlAnchor.href;
        crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
    } catch (e) {
        crossDomain = true
    }
    return crossDomain
};
export {
    isCrossDomain,
    getJsonpOptions as getJsonpCallbackName,
    getRequestHeaders,
    getRequestOptions,
    getAcceptHeader,
    evalScript,
    evalCrossDomainScript,
    getMethod
};
