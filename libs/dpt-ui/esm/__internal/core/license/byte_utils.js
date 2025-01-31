/**
 * DevExtreme (esm/__internal/core/license/byte_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function base64ToBytes(base64) {
    return new Uint8Array(atob(base64).split("").map((s => s.charCodeAt(0))))
}
export function hexToBytes(string) {
    var _string$match;
    return new Uint8Array((null === (_string$match = string.match(/.{1,2}/g)) || void 0 === _string$match ? void 0 : _string$match.map((byte => parseInt(byte, 16)))) ?? [])
}
export function stringToBytes(string) {
    const bytes = new Uint8Array(string.length);
    for (let k = 0; k < string.length; k += 1) {
        bytes[k] = 255 & string.charCodeAt(k)
    }
    return bytes
}
export function wordsToBytes(words) {
    const bytes = new Uint8Array(4 * words.length);
    for (let k = 0; k < bytes.length; k += 1) {
        bytes[k] = words[k >> 2] >>> 8 * (3 - k % 4)
    }
    return bytes
}
export function bytesToWords(bytes) {
    const words = new Uint32Array(1 + (bytes.length - 1 >> 2));
    for (let k = 0; k < bytes.length; k += 1) {
        words[k >> 2] |= bytes[k] << 8 * (3 - k % 4)
    }
    return words
}
export function wordsToHex(words) {
    return [...words].map((w => w.toString(16).padStart(8, "0"))).join("")
}
export function bytesToHex(bytes) {
    return [...bytes].map((b => b.toString(16).padStart(2, "0"))).join("")
}
export function leftRotate(x, n) {
    return (x << n | x >>> 32 - n) >>> 0
}
export function concatBytes(a, b) {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result
}
