/**
 * DevExtreme (esm/__internal/core/license/sha1.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    bytesToWords,
    leftRotate,
    stringToBytes,
    wordsToBytes
} from "./byte_utils";
export function preprocess(text) {
    const bytes = new Uint8Array(text.length + 1);
    bytes.set(stringToBytes(text));
    bytes[bytes.length - 1] = 128;
    const words = bytesToWords(new Uint8Array(bytes));
    const result = new Uint32Array(16 * Math.ceil((words.length + 2) / 16));
    result.set(words, 0);
    result[result.length - 1] = 8 * (bytes.length - 1);
    return result
}
export function sha1(text) {
    const message = preprocess(text);
    const h = new Uint32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    for (let i = 0; i < message.length; i += 16) {
        const w = new Uint32Array(80);
        for (let j = 0; j < 16; j += 1) {
            w[j] = message[i + j]
        }
        for (let j = 16; j < 80; j += 1) {
            const n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
            w[j] = n << 1 | n >>> 31
        }
        let a = h[0];
        let b = h[1];
        let c = h[2];
        let d = h[3];
        let e = h[4];
        for (let j = 0; j < 80; j += 1) {
            const [f, k] = j < 20 ? [b & c | ~b & d, 1518500249] : j < 40 ? [b ^ c ^ d, 1859775393] : j < 60 ? [b & c | b & d | c & d, 2400959708] : [b ^ c ^ d, 3395469782];
            const temp = leftRotate(a, 5) + f + e + k + w[j];
            e = d;
            d = c;
            c = leftRotate(b, 30);
            b = a;
            a = temp
        }
        h[0] += a;
        h[1] += b;
        h[2] += c;
        h[3] += d;
        h[4] += e
    }
    return wordsToBytes(h)
}
