/**
 * DevExtreme (esm/__internal/core/license/rsa_bigint.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
export function compareSignatures(args) {
    try {
        const zero = BigInt(0);
        const one = BigInt(1);
        const eight = BigInt(8);
        const modExp = (base, exponent, modulus) => {
            let result = one;
            let b = base;
            let e = exponent;
            while (e) {
                if (e & one) {
                    result = result * b % modulus
                }
                b = b * b % modulus;
                e >>= one
            }
            return result
        };
        const bigIntFromBytes = bytes => bytes.reduce(((acc, cur) => (acc << eight) + BigInt(cur)), zero);
        const actual = bigIntFromBytes(args.actual);
        const signature = bigIntFromBytes(args.signature);
        const exponent = BigInt(args.key.e);
        const modulus = bigIntFromBytes(args.key.n);
        const expected = modExp(signature, exponent, modulus);
        return expected === actual
    } catch {
        return true
    }
}
