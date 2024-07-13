/**
 * DevExtreme (cjs/__internal/scheduler/options_validator/core/options_validator_error_handler.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OptionsValidatorErrorHandler = void 0;
class OptionsValidatorErrorHandler {
    constructor(validatorNameToErrorCodeMap, globalErrorHandler) {
        this.validatorNameToErrorCodeMap = validatorNameToErrorCodeMap;
        this.globalErrorHandler = globalErrorHandler
    }
    handleValidationResult(optionsValidatorResult) {
        if (true === optionsValidatorResult) {
            return
        }
        const uniqErrorCodes = Object.keys(optionsValidatorResult).reduce(((set, validatorName) => {
            const errorCode = this.validatorNameToErrorCodeMap[validatorName];
            if (errorCode) {
                set.add(errorCode)
            }
            return set
        }), new Set);
        const errorCodeArray = [...uniqErrorCodes];
        errorCodeArray.forEach(((errorCode, idx) => {
            const isLastErrorCode = idx === errorCodeArray.length - 1;
            if (!isLastErrorCode) {
                this.globalErrorHandler.logError(errorCode)
            } else {
                this.globalErrorHandler.throwError(errorCode)
            }
        }))
    }
}
exports.OptionsValidatorErrorHandler = OptionsValidatorErrorHandler;
