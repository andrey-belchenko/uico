/**
 * DevExtreme (esm/__internal/core/license/pkcs1.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    concatBytes,
    hexToBytes
} from "./byte_utils";
import {
    PUBLIC_KEY
} from "./key";
const ASN1_SHA1 = "3021300906052b0e03021a05000414";
export function pad(hash) {
    const dataLength = (8 * PUBLIC_KEY.n.length + 6) / 8;
    const data = concatBytes(hexToBytes(ASN1_SHA1), hash);
    if (data.length + 10 > dataLength) {
        throw Error("Key is too short for SHA1 signing algorithm")
    }
    const padding = new Uint8Array(dataLength - data.length);
    padding.fill(255, 0, padding.length - 1);
    padding[0] = 0;
    padding[1] = 1;
    padding[padding.length - 1] = 0;
    return concatBytes(padding, data)
}
