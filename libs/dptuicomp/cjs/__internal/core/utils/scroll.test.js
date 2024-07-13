/**
 * DevExtreme (cjs/__internal/core/utils/scroll.test.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
var _scroll = require("./scroll");
describe("Scroll memoize scrollTo", (() => {
    let scrollableMock = {
        scrollTo: jest.fn()
    };
    beforeEach((() => {
        scrollableMock = {
            scrollTo: jest.fn()
        }
    }));
    it("should call origin scrollTo first time", (() => {
        const scrollParams = {
            top: 10
        };
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo(scrollParams);
        expect(scrollableMock.scrollTo).toHaveBeenCalledWith(scrollParams)
    }));
    it("should call origin scrollTo with scrollable context", (() => {
        let done = () => {};
        const donePromise = new Promise((resolve => {
            done = resolve
        }));
        scrollableMock.scrollTo = jest.fn().mockImplementation((function() {
            expect(this).toEqual(scrollableMock);
            done()
        }));
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo({
            top: 10
        });
        return donePromise
    }));
    it("should call origin scrollTo if params changed", (() => {
        const scrollParams = [{
            top: 10
        }, {
            top: 10,
            left: 10
        }];
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo(scrollParams[0]);
        cachedScrollTo(scrollParams[1]);
        expect(scrollableMock.scrollTo).toBeCalledTimes(2);
        expect(scrollableMock.scrollTo).toHaveBeenCalledWith(scrollParams[1])
    }));
    it("shouldn't call origin scrollTo if params wasn't change", (() => {
        const scrollParams = [{
            left: 10
        }, {
            left: 10
        }];
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo(scrollParams[0]);
        cachedScrollTo(scrollParams[1]);
        expect(scrollableMock.scrollTo).toBeCalledTimes(1)
    }));
    it("shouldn't call origin scrollTo if the integer part of params wasn't change", (() => {
        const scrollParams = [{
            left: 10.2
        }, {
            left: 10.3
        }, {
            left: 10.4
        }];
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo(scrollParams[0]);
        cachedScrollTo(scrollParams[1]);
        cachedScrollTo(scrollParams[2]);
        expect(scrollableMock.scrollTo).toBeCalledTimes(1)
    }));
    it("should call origin scroll to if params wasn't change and force flag is true", (() => {
        const scrollParams = {
            left: 10
        };
        const cachedScrollTo = (0, _scroll.getMemoizeScrollTo)((() => scrollableMock));
        cachedScrollTo(scrollParams, true);
        cachedScrollTo(scrollParams, true);
        cachedScrollTo(scrollParams, true);
        expect(scrollableMock.scrollTo).toBeCalledTimes(3)
    }))
}));
