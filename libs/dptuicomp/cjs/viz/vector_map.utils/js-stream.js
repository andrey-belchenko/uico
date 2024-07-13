/**
 * DevExtreme (cjs/viz/vector_map.utils/js-stream.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";

function wrapBuffer(arrayBuffer) {
    return new DataView(arrayBuffer)
}

function ui8(stream, position) {
    return stream.getUint8(position)
}

function ui16LE(stream, position) {
    return stream.getUint16(position, true)
}

function ui32LE(stream, position) {
    return stream.getUint32(position, true)
}

function ui32BE(stream, position) {
    return stream.getUint32(position, false)
}

function f64LE(stream, position) {
    return stream.getFloat64(position, true)
}

function sendRequest(url, callback) {
    var request = new XMLHttpRequest;
    request.addEventListener("load", (function() {
        callback(this.response ? null : this.statusText, this.response)
    }));
    request.open("GET", url);
    request.responseType = "arraybuffer";
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.send(null)
}
