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
import dxForm, { Properties } from "dpt-ui/ui/form";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, EditorEnterKeyEvent, InitializedEvent, dxFormButtonItem, dxFormEmptyItem, dxFormGroupItem, dxFormSimpleItem, dxFormTabbedItem } from "dpt-ui/ui/form";
import type { ContentReadyEvent as ButtonContentReadyEvent, DisposingEvent as ButtonDisposingEvent, InitializedEvent as ButtonInitializedEvent, dxButtonOptions, ClickEvent, OptionChangedEvent } from "dpt-ui/ui/button";
import type { ContentReadyEvent as TabPanelContentReadyEvent, DisposingEvent as TabPanelDisposingEvent, InitializedEvent as TabPanelInitializedEvent, OptionChangedEvent as TabPanelOptionChangedEvent, dxTabPanelOptions, dxTabPanelItem, ItemClickEvent, ItemContextMenuEvent, ItemHoldEvent, ItemRenderedEvent, SelectionChangedEvent, TitleClickEvent, TitleHoldEvent, TitleRenderedEvent } from "dpt-ui/ui/tab_panel";
import type { template } from "dpt-ui/core/templates/template";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type DataSource from "dpt-ui/data/data_source";
import type * as CommonTypes from "dpt-ui/common";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IFormOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEditorEnterKey?: ((e: EditorEnterKeyEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IFormOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IFormOptionsNarrowedEvents> & IHtmlOptions & {
    defaultFormData?: any;
    onFormDataChange?: (value: any) => void;
}>;
interface FormRef {
    instance: () => dxForm;
}
declare const Form: (props: React.PropsWithChildren<IFormOptions> & {
    ref?: Ref<FormRef>;
}) => ReactElement | null;
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
type IButtonItemProps = React.PropsWithChildren<{
    buttonOptions?: dxButtonOptions;
    colSpan?: number;
    cssClass?: string;
    horizontalAlignment?: "center" | "left" | "right";
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    name?: string;
    verticalAlignment?: "bottom" | "center" | "top";
    visible?: boolean;
    visibleIndex?: number;
}>;
declare const _componentButtonItem: React.MemoExoticComponent<(props: IButtonItemProps) => React.FunctionComponentElement<IButtonItemProps>>;
declare const ButtonItem: typeof _componentButtonItem & IElementDescriptor;
type IButtonOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    bindingOptions?: Record<string, any>;
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    icon?: string;
    onClick?: ((e: ClickEvent) => void);
    onContentReady?: ((e: ButtonContentReadyEvent) => void);
    onDisposing?: ((e: ButtonDisposingEvent) => void);
    onInitialized?: ((e: ButtonInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    rtlEnabled?: boolean;
    stylingMode?: "text" | "outlined" | "contained";
    tabIndex?: number;
    template?: ((buttonData: {
        icon: string;
        text: string;
    }, contentElement: any) => string | any) | template;
    text?: string;
    type?: "danger" | "default" | "normal" | "success";
    useSubmitBehavior?: boolean;
    validationGroup?: string;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentButtonOptions: React.MemoExoticComponent<(props: IButtonOptionsProps) => React.FunctionComponentElement<IButtonOptionsProps>>;
declare const ButtonOptions: typeof _componentButtonOptions & IElementDescriptor;
type IColCountByScreenProps = React.PropsWithChildren<{
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
}>;
declare const _componentColCountByScreen: React.MemoExoticComponent<(props: IColCountByScreenProps) => React.FunctionComponentElement<IColCountByScreenProps>>;
declare const ColCountByScreen: typeof _componentColCountByScreen & IElementDescriptor;
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
type IEmptyItemProps = React.PropsWithChildren<{
    colSpan?: number;
    cssClass?: string;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    name?: string;
    visible?: boolean;
    visibleIndex?: number;
}>;
declare const _componentEmptyItem: React.MemoExoticComponent<(props: IEmptyItemProps) => React.FunctionComponentElement<IEmptyItemProps>>;
declare const EmptyItem: typeof _componentEmptyItem & IElementDescriptor;
type IGroupItemProps = React.PropsWithChildren<{
    alignItemLabels?: boolean;
    caption?: string;
    captionTemplate?: ((data: {
        caption: string;
        component: dxForm;
        name: string;
    }, itemElement: any) => string | any) | template;
    colCount?: number;
    colCountByScreen?: Record<string, any> | {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
    };
    colSpan?: number;
    cssClass?: string;
    items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    name?: string;
    template?: ((data: {
        component: dxForm;
        formData: Record<string, any>;
    }, itemElement: any) => string | any) | template;
    visible?: boolean;
    visibleIndex?: number;
    captionRender?: (...params: any) => React.ReactNode;
    captionComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentGroupItem: React.MemoExoticComponent<(props: IGroupItemProps) => React.FunctionComponentElement<IGroupItemProps>>;
declare const GroupItem: typeof _componentGroupItem & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    badge?: string;
    disabled?: boolean;
    html?: string;
    icon?: string;
    tabTemplate?: (() => string | any) | template;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    title?: string;
    colSpan?: number;
    cssClass?: string;
    dataField?: string;
    editorOptions?: any;
    editorType?: "dxAutocomplete" | "dxCalendar" | "dxCheckBox" | "dxColorBox" | "dxDateBox" | "dxDateRangeBox" | "dxDropDownBox" | "dxHtmlEditor" | "dxLookup" | "dxNumberBox" | "dxRadioGroup" | "dxRangeSlider" | "dxSelectBox" | "dxSlider" | "dxSwitch" | "dxTagBox" | "dxTextArea" | "dxTextBox";
    helpText?: string;
    isRequired?: boolean;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    label?: Record<string, any> | {
        alignment?: "center" | "left" | "right";
        location?: "left" | "right" | "top";
        showColon?: boolean;
        template?: ((itemData: {
            component: dxForm;
            dataField: string;
            editorOptions: any;
            editorType: string;
            name: string;
            text: string;
        }, itemElement: any) => string | any) | template;
        text?: string;
        visible?: boolean;
    };
    name?: string;
    validationRules?: Array<CommonTypes.ValidationRule>;
    visible?: boolean;
    visibleIndex?: number;
    alignItemLabels?: boolean;
    caption?: string;
    captionTemplate?: ((data: {
        caption: string;
        component: dxForm;
        name: string;
    }, itemElement: any) => string | any) | template;
    colCount?: number;
    colCountByScreen?: Record<string, any> | {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
    };
    items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
    tabPanelOptions?: dxTabPanelOptions;
    tabs?: Array<Record<string, any>> | {
        alignItemLabels?: boolean;
        badge?: string;
        colCount?: number;
        colCountByScreen?: Record<string, any> | {
            lg?: number;
            md?: number;
            sm?: number;
            xs?: number;
        };
        disabled?: boolean;
        icon?: string;
        items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
        tabTemplate?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
        template?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
        title?: string;
    }[];
    buttonOptions?: dxButtonOptions;
    horizontalAlignment?: "center" | "left" | "right";
    verticalAlignment?: "bottom" | "center" | "top";
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    captionRender?: (...params: any) => React.ReactNode;
    captionComponent?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type ILabelProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    location?: "left" | "right" | "top";
    showColon?: boolean;
    template?: ((itemData: {
        component: dxForm;
        dataField: string;
        editorOptions: any;
        editorType: string;
        name: string;
        text: string;
    }, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentLabel: React.MemoExoticComponent<(props: ILabelProps) => React.FunctionComponentElement<ILabelProps>>;
declare const Label: typeof _componentLabel & IElementDescriptor;
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
type ISimpleItemProps = React.PropsWithChildren<{
    colSpan?: number;
    cssClass?: string;
    dataField?: string;
    editorOptions?: any;
    editorType?: "dxAutocomplete" | "dxCalendar" | "dxCheckBox" | "dxColorBox" | "dxDateBox" | "dxDateRangeBox" | "dxDropDownBox" | "dxHtmlEditor" | "dxLookup" | "dxNumberBox" | "dxRadioGroup" | "dxRangeSlider" | "dxSelectBox" | "dxSlider" | "dxSwitch" | "dxTagBox" | "dxTextArea" | "dxTextBox";
    helpText?: string;
    isRequired?: boolean;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    label?: Record<string, any> | {
        alignment?: "center" | "left" | "right";
        location?: "left" | "right" | "top";
        showColon?: boolean;
        template?: ((itemData: {
            component: dxForm;
            dataField: string;
            editorOptions: any;
            editorType: string;
            name: string;
            text: string;
        }, itemElement: any) => string | any) | template;
        text?: string;
        visible?: boolean;
    };
    name?: string;
    template?: ((data: {
        component: dxForm;
        dataField: string;
        editorOptions: Record<string, any>;
        editorType: string;
        name: string;
    }, itemElement: any) => string | any) | template;
    validationRules?: Array<CommonTypes.ValidationRule>;
    visible?: boolean;
    visibleIndex?: number;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentSimpleItem: React.MemoExoticComponent<(props: ISimpleItemProps) => React.FunctionComponentElement<ISimpleItemProps>>;
declare const SimpleItem: typeof _componentSimpleItem & IElementDescriptor;
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
type ITabProps = React.PropsWithChildren<{
    alignItemLabels?: boolean;
    badge?: string;
    colCount?: number;
    colCountByScreen?: Record<string, any> | {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
    };
    disabled?: boolean;
    icon?: string;
    items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
    tabTemplate?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
    template?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
    title?: string;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentTab: React.MemoExoticComponent<(props: ITabProps) => React.FunctionComponentElement<ITabProps>>;
declare const Tab: typeof _componentTab & IElementDescriptor;
type ITabbedItemProps = React.PropsWithChildren<{
    colSpan?: number;
    cssClass?: string;
    itemType?: "empty" | "group" | "simple" | "tabbed" | "button";
    name?: string;
    tabPanelOptions?: dxTabPanelOptions;
    tabs?: Array<Record<string, any>> | {
        alignItemLabels?: boolean;
        badge?: string;
        colCount?: number;
        colCountByScreen?: Record<string, any> | {
            lg?: number;
            md?: number;
            sm?: number;
            xs?: number;
        };
        disabled?: boolean;
        icon?: string;
        items?: Array<dxFormButtonItem | dxFormEmptyItem | dxFormGroupItem | dxFormSimpleItem | dxFormTabbedItem>;
        tabTemplate?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
        template?: ((tabData: any, tabIndex: number, tabElement: any) => any) | template;
        title?: string;
    }[];
    visible?: boolean;
    visibleIndex?: number;
}>;
declare const _componentTabbedItem: React.MemoExoticComponent<(props: ITabbedItemProps) => React.FunctionComponentElement<ITabbedItemProps>>;
declare const TabbedItem: typeof _componentTabbedItem & IElementDescriptor;
type ITabPanelOptionsProps = React.PropsWithChildren<{
    accessKey?: string;
    activeStateEnabled?: boolean;
    animationEnabled?: boolean;
    bindingOptions?: Record<string, any>;
    dataSource?: Array<any | dxTabPanelItem | string> | DataSource | DataSourceOptions | null | Store | string;
    deferRendering?: boolean;
    disabled?: boolean;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    iconPosition?: "top" | "end" | "bottom" | "start";
    itemHoldTimeout?: number;
    items?: Array<any | dxTabPanelItem | string>;
    itemTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    itemTitleTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    loop?: boolean;
    noDataText?: string;
    onContentReady?: ((e: TabPanelContentReadyEvent) => void);
    onDisposing?: ((e: TabPanelDisposingEvent) => void);
    onInitialized?: ((e: TabPanelInitializedEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
    onItemContextMenu?: ((e: ItemContextMenuEvent) => void);
    onItemHold?: ((e: ItemHoldEvent) => void);
    onItemRendered?: ((e: ItemRenderedEvent) => void);
    onOptionChanged?: ((e: TabPanelOptionChangedEvent) => void);
    onSelectionChanged?: ((e: SelectionChangedEvent) => void);
    onTitleClick?: ((e: TitleClickEvent) => void);
    onTitleHold?: ((e: TitleHoldEvent) => void);
    onTitleRendered?: ((e: TitleRenderedEvent) => void);
    repaintChangesOnly?: boolean;
    rtlEnabled?: boolean;
    scrollByContent?: boolean;
    scrollingEnabled?: boolean;
    selectedIndex?: number;
    selectedItem?: any;
    showNavButtons?: boolean;
    stylingMode?: "primary" | "secondary";
    swipeEnabled?: boolean;
    tabIndex?: number;
    tabsPosition?: "bottom" | "left" | "right" | "top";
    visible?: boolean;
    width?: (() => number | string) | number | string;
    defaultItems?: Array<any | dxTabPanelItem | string>;
    onItemsChange?: (value: Array<any | dxTabPanelItem | string>) => void;
    defaultSelectedIndex?: number;
    onSelectedIndexChange?: (value: number) => void;
    defaultSelectedItem?: any;
    onSelectedItemChange?: (value: any) => void;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemTitleRender?: (...params: any) => React.ReactNode;
    itemTitleComponent?: React.ComponentType<any>;
}>;
declare const _componentTabPanelOptions: React.MemoExoticComponent<(props: ITabPanelOptionsProps) => React.FunctionComponentElement<ITabPanelOptionsProps>>;
declare const TabPanelOptions: typeof _componentTabPanelOptions & IElementDescriptor;
type ITabPanelOptionsItemProps = React.PropsWithChildren<{
    badge?: string;
    disabled?: boolean;
    html?: string;
    icon?: string;
    tabTemplate?: (() => string | any) | template;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    title?: string;
    tabRender?: (...params: any) => React.ReactNode;
    tabComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentTabPanelOptionsItem: React.MemoExoticComponent<(props: ITabPanelOptionsItemProps) => React.FunctionComponentElement<ITabPanelOptionsItemProps>>;
declare const TabPanelOptionsItem: typeof _componentTabPanelOptionsItem & IElementDescriptor;
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
export default Form;
export { Form, IFormOptions, FormRef, AsyncRule, IAsyncRuleProps, ButtonItem, IButtonItemProps, ButtonOptions, IButtonOptionsProps, ColCountByScreen, IColCountByScreenProps, CompareRule, ICompareRuleProps, CustomRule, ICustomRuleProps, EmailRule, IEmailRuleProps, EmptyItem, IEmptyItemProps, GroupItem, IGroupItemProps, Item, IItemProps, Label, ILabelProps, NumericRule, INumericRuleProps, PatternRule, IPatternRuleProps, RangeRule, IRangeRuleProps, RequiredRule, IRequiredRuleProps, SimpleItem, ISimpleItemProps, StringLengthRule, IStringLengthRuleProps, Tab, ITabProps, TabbedItem, ITabbedItemProps, TabPanelOptions, ITabPanelOptionsProps, TabPanelOptionsItem, ITabPanelOptionsItemProps, ValidationRule, IValidationRuleProps };
import type * as FormTypes from 'dpt-ui/ui/form_types';
export { FormTypes };
