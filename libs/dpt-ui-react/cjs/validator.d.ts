/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxValidator, { Properties } from "dpt-ui/ui/validator";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
type IValidatorOptions = React.PropsWithChildren<Properties & IHtmlOptions>;
interface ValidatorRef {
    instance: () => dxValidator;
}
declare const _componentValidator: (props: React.PropsWithChildren<IValidatorOptions> & {
    ref?: Ref<ValidatorRef>;
}) => ReactElement | null;
declare const Validator: typeof _componentValidator & {
    isExtensionComponent: boolean;
};
type IAdapterProps = React.PropsWithChildren<{
    applyValidationResults?: (() => void);
    bypass?: (() => void);
    focus?: (() => void);
    getValue?: (() => void);
    reset?: (() => void);
    validationRequestsCallbacks?: Array<(() => void)>;
}>;
declare const _componentAdapter: React.MemoExoticComponent<(props: IAdapterProps) => React.FunctionComponentElement<IAdapterProps>>;
declare const Adapter: typeof _componentAdapter & IElementDescriptor;
type IAsyncRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => any);
}>;
declare const _componentAsyncRule: React.MemoExoticComponent<(props: IAsyncRuleProps) => React.FunctionComponentElement<IAsyncRuleProps>>;
declare const AsyncRule: typeof _componentAsyncRule & IElementDescriptor;
type ICompareRuleProps = React.PropsWithChildren<{
    comparisonTarget?: (() => any);
    comparisonType?: "!=" | "!==" | "<" | "<=" | "==" | "===" | ">" | ">=";
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentCompareRule: React.MemoExoticComponent<(props: ICompareRuleProps) => React.FunctionComponentElement<ICompareRuleProps>>;
declare const CompareRule: typeof _componentCompareRule & IElementDescriptor;
type ICustomRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => boolean);
}>;
declare const _componentCustomRule: React.MemoExoticComponent<(props: ICustomRuleProps) => React.FunctionComponentElement<ICustomRuleProps>>;
declare const CustomRule: typeof _componentCustomRule & IElementDescriptor;
type IEmailRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentEmailRule: React.MemoExoticComponent<(props: IEmailRuleProps) => React.FunctionComponentElement<IEmailRuleProps>>;
declare const EmailRule: typeof _componentEmailRule & IElementDescriptor;
type INumericRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentNumericRule: React.MemoExoticComponent<(props: INumericRuleProps) => React.FunctionComponentElement<INumericRuleProps>>;
declare const NumericRule: typeof _componentNumericRule & IElementDescriptor;
type IPatternRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    message?: string;
    pattern?: RegExp | string;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentPatternRule: React.MemoExoticComponent<(props: IPatternRuleProps) => React.FunctionComponentElement<IPatternRuleProps>>;
declare const PatternRule: typeof _componentPatternRule & IElementDescriptor;
type IRangeRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    max?: Date | number | string;
    message?: string;
    min?: Date | number | string;
    reevaluate?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentRangeRule: React.MemoExoticComponent<(props: IRangeRuleProps) => React.FunctionComponentElement<IRangeRuleProps>>;
declare const RangeRule: typeof _componentRangeRule & IElementDescriptor;
type IRequiredRuleProps = React.PropsWithChildren<{
    message?: string;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentRequiredRule: React.MemoExoticComponent<(props: IRequiredRuleProps) => React.FunctionComponentElement<IRequiredRuleProps>>;
declare const RequiredRule: typeof _componentRequiredRule & IElementDescriptor;
type IStringLengthRuleProps = React.PropsWithChildren<{
    ignoreEmptyValue?: boolean;
    max?: number;
    message?: string;
    min?: number;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
}>;
declare const _componentStringLengthRule: React.MemoExoticComponent<(props: IStringLengthRuleProps) => React.FunctionComponentElement<IStringLengthRuleProps>>;
declare const StringLengthRule: typeof _componentStringLengthRule & IElementDescriptor;
type IValidationRuleProps = React.PropsWithChildren<{
    message?: string;
    trim?: boolean;
    type?: "required" | "numeric" | "range" | "stringLength" | "custom" | "compare" | "pattern" | "email" | "async";
    ignoreEmptyValue?: boolean;
    max?: Date | number | string;
    min?: Date | number | string;
    reevaluate?: boolean;
    validationCallback?: ((options: {
        column: Record<string, any>;
        data: Record<string, any>;
        formItem: Record<string, any>;
        rule: Record<string, any>;
        validator: Record<string, any>;
        value: string | number;
    }) => boolean);
    comparisonTarget?: (() => any);
    comparisonType?: "!=" | "!==" | "<" | "<=" | "==" | "===" | ">" | ">=";
    pattern?: RegExp | string;
}>;
declare const _componentValidationRule: React.MemoExoticComponent<(props: IValidationRuleProps) => React.FunctionComponentElement<IValidationRuleProps>>;
declare const ValidationRule: typeof _componentValidationRule & IElementDescriptor;
export default Validator;
export { Validator, IValidatorOptions, ValidatorRef, Adapter, IAdapterProps, AsyncRule, IAsyncRuleProps, CompareRule, ICompareRuleProps, CustomRule, ICustomRuleProps, EmailRule, IEmailRuleProps, NumericRule, INumericRuleProps, PatternRule, IPatternRuleProps, RangeRule, IRangeRuleProps, RequiredRule, IRequiredRuleProps, StringLengthRule, IStringLengthRuleProps, ValidationRule, IValidationRuleProps };
import type * as ValidatorTypes from 'dpt-ui/ui/validator_types';
export { ValidatorTypes };
