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
import dxFilterBuilder, { Properties } from "dpt-ui/ui/filter_builder";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, EditorPreparedEvent, EditorPreparingEvent, InitializedEvent, ValueChangedEvent, dxFilterBuilderField } from "dpt-ui/ui/filter_builder";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type * as LocalizationTypes from "dpt-ui/localization";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IFilterBuilderOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEditorPrepared?: ((e: EditorPreparedEvent) => void);
    onEditorPreparing?: ((e: EditorPreparingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IFilterBuilderOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IFilterBuilderOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: Array<any> | (() => any) | string;
    onValueChange?: (value: Array<any> | (() => any) | string) => void;
}>;
interface FilterBuilderRef {
    instance: () => dxFilterBuilder;
}
declare const FilterBuilder: (props: React.PropsWithChildren<IFilterBuilderOptions> & {
    ref?: Ref<FilterBuilderRef>;
}) => ReactElement | null;
type ICustomOperationProps = React.PropsWithChildren<{
    calculateFilterExpression?: ((filterValue: any, field: dxFilterBuilderField) => string | (() => any) | Array<any>);
    caption?: string;
    customizeText?: ((fieldInfo: {
        field: dxFilterBuilderField;
        value: string | number | Date;
        valueText: string;
    }) => string);
    dataTypes?: Array<"string" | "number" | "date" | "boolean" | "object" | "datetime">;
    editorTemplate?: ((conditionInfo: {
        field: dxFilterBuilderField;
        setValue: (() => void);
        value: string | number | Date;
    }, container: any) => string | any) | template;
    hasValue?: boolean;
    icon?: string;
    name?: string;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
}>;
declare const _componentCustomOperation: React.MemoExoticComponent<(props: ICustomOperationProps) => React.FunctionComponentElement<ICustomOperationProps>>;
declare const CustomOperation: typeof _componentCustomOperation & IElementDescriptor;
type IFieldProps = React.PropsWithChildren<{
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string) => string | (() => any) | Array<any>);
    caption?: string;
    customizeText?: ((fieldInfo: {
        value: string | number | Date;
        valueText: string;
    }) => string);
    dataField?: string;
    dataType?: "string" | "number" | "date" | "boolean" | "object" | "datetime";
    editorOptions?: any;
    editorTemplate?: ((conditionInfo: {
        field: dxFilterBuilderField;
        filterOperation: string;
        setValue: (() => void);
        value: string | number | Date;
    }, container: any) => string | any) | template;
    falseText?: string;
    filterOperations?: Array<"=" | "<>" | "<" | "<=" | ">" | ">=" | "contains" | "endswith" | "isblank" | "isnotblank" | "notcontains" | "startswith" | "between" | string>;
    format?: LocalizationTypes.Format;
    lookup?: Record<string, any> | {
        allowClearing?: boolean;
        dataSource?: Array<any> | DataSourceOptions | Store;
        displayExpr?: ((data: any) => string) | string;
        valueExpr?: ((data: any) => string | number | boolean) | string;
    };
    name?: string;
    trueText?: string;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
}>;
declare const _componentField: React.MemoExoticComponent<(props: IFieldProps) => React.FunctionComponentElement<IFieldProps>>;
declare const Field: typeof _componentField & IElementDescriptor;
type IFilterOperationDescriptionsProps = React.PropsWithChildren<{
    between?: string;
    contains?: string;
    endsWith?: string;
    equal?: string;
    greaterThan?: string;
    greaterThanOrEqual?: string;
    isBlank?: string;
    isNotBlank?: string;
    lessThan?: string;
    lessThanOrEqual?: string;
    notContains?: string;
    notEqual?: string;
    startsWith?: string;
}>;
declare const _componentFilterOperationDescriptions: React.MemoExoticComponent<(props: IFilterOperationDescriptionsProps) => React.FunctionComponentElement<IFilterOperationDescriptionsProps>>;
declare const FilterOperationDescriptions: typeof _componentFilterOperationDescriptions & IElementDescriptor;
type IFormatProps = React.PropsWithChildren<{
    currency?: string;
    formatter?: ((value: number | Date) => string);
    parser?: ((value: string) => number | Date);
    precision?: number;
    type?: "billions" | "currency" | "day" | "decimal" | "exponential" | "fixedPoint" | "largeNumber" | "longDate" | "longTime" | "millions" | "millisecond" | "month" | "monthAndDay" | "monthAndYear" | "percent" | "quarter" | "quarterAndYear" | "shortDate" | "shortTime" | "thousands" | "trillions" | "year" | "dayOfWeek" | "hour" | "longDateLongTime" | "minute" | "second" | "shortDateShortTime";
    useCurrencyAccountingStyle?: boolean;
}>;
declare const _componentFormat: React.MemoExoticComponent<(props: IFormatProps) => React.FunctionComponentElement<IFormatProps>>;
declare const Format: typeof _componentFormat & IElementDescriptor;
type IGroupOperationDescriptionsProps = React.PropsWithChildren<{
    and?: string;
    notAnd?: string;
    notOr?: string;
    or?: string;
}>;
declare const _componentGroupOperationDescriptions: React.MemoExoticComponent<(props: IGroupOperationDescriptionsProps) => React.FunctionComponentElement<IGroupOperationDescriptionsProps>>;
declare const GroupOperationDescriptions: typeof _componentGroupOperationDescriptions & IElementDescriptor;
type ILookupProps = React.PropsWithChildren<{
    allowClearing?: boolean;
    dataSource?: Array<any> | DataSourceOptions | Store;
    displayExpr?: ((data: any) => string) | string;
    valueExpr?: ((data: any) => string | number | boolean) | string;
}>;
declare const _componentLookup: React.MemoExoticComponent<(props: ILookupProps) => React.FunctionComponentElement<ILookupProps>>;
declare const Lookup: typeof _componentLookup & IElementDescriptor;
export default FilterBuilder;
export { FilterBuilder, IFilterBuilderOptions, FilterBuilderRef, CustomOperation, ICustomOperationProps, Field, IFieldProps, FilterOperationDescriptions, IFilterOperationDescriptionsProps, Format, IFormatProps, GroupOperationDescriptions, IGroupOperationDescriptionsProps, Lookup, ILookupProps };
import type * as FilterBuilderTypes from 'dpt-ui/ui/filter_builder_types';
export { FilterBuilderTypes };
