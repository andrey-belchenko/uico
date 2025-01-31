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
import dxPivotGrid, { Properties } from "dpt-ui/ui/pivot_grid";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { CellClickEvent, CellPreparedEvent, ContentReadyEvent, ContextMenuPreparingEvent, DisposingEvent, ExportingEvent, InitializedEvent } from "dpt-ui/ui/pivot_grid";
import type { HeaderFilterSearchConfig } from "dpt-ui/common/grids";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IPivotGridOptionsNarrowedEvents = {
    onCellClick?: ((e: CellClickEvent) => void);
    onCellPrepared?: ((e: CellPreparedEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onContextMenuPreparing?: ((e: ContextMenuPreparingEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onExporting?: ((e: ExportingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IPivotGridOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IPivotGridOptionsNarrowedEvents> & IHtmlOptions>;
interface PivotGridRef {
    instance: () => dxPivotGrid;
}
declare const PivotGrid: (props: React.PropsWithChildren<IPivotGridOptions> & {
    ref?: Ref<PivotGridRef>;
}) => ReactElement | null;
type IExportProps = React.PropsWithChildren<{
    enabled?: boolean;
}>;
declare const _componentExport: React.MemoExoticComponent<(props: IExportProps) => React.FunctionComponentElement<IExportProps>>;
declare const Export: typeof _componentExport & IElementDescriptor;
type IFieldChooserProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    applyChangesMode?: "instantly" | "onDemand";
    enabled?: boolean;
    height?: number;
    layout?: 0 | 1 | 2;
    searchTimeout?: number;
    texts?: Record<string, any> | {
        allFields?: string;
        columnFields?: string;
        dataFields?: string;
        filterFields?: string;
        rowFields?: string;
    };
    title?: string;
    width?: number;
}>;
declare const _componentFieldChooser: React.MemoExoticComponent<(props: IFieldChooserProps) => React.FunctionComponentElement<IFieldChooserProps>>;
declare const FieldChooser: typeof _componentFieldChooser & IElementDescriptor;
type IFieldChooserTextsProps = React.PropsWithChildren<{
    allFields?: string;
    columnFields?: string;
    dataFields?: string;
    filterFields?: string;
    rowFields?: string;
}>;
declare const _componentFieldChooserTexts: React.MemoExoticComponent<(props: IFieldChooserTextsProps) => React.FunctionComponentElement<IFieldChooserTextsProps>>;
declare const FieldChooserTexts: typeof _componentFieldChooserTexts & IElementDescriptor;
type IFieldPanelProps = React.PropsWithChildren<{
    allowFieldDragging?: boolean;
    showColumnFields?: boolean;
    showDataFields?: boolean;
    showFilterFields?: boolean;
    showRowFields?: boolean;
    texts?: Record<string, any> | {
        columnFieldArea?: string;
        dataFieldArea?: string;
        filterFieldArea?: string;
        rowFieldArea?: string;
    };
    visible?: boolean;
}>;
declare const _componentFieldPanel: React.MemoExoticComponent<(props: IFieldPanelProps) => React.FunctionComponentElement<IFieldPanelProps>>;
declare const FieldPanel: typeof _componentFieldPanel & IElementDescriptor;
type IFieldPanelTextsProps = React.PropsWithChildren<{
    columnFieldArea?: string;
    dataFieldArea?: string;
    filterFieldArea?: string;
    rowFieldArea?: string;
}>;
declare const _componentFieldPanelTexts: React.MemoExoticComponent<(props: IFieldPanelTextsProps) => React.FunctionComponentElement<IFieldPanelTextsProps>>;
declare const FieldPanelTexts: typeof _componentFieldPanelTexts & IElementDescriptor;
type IHeaderFilterProps = React.PropsWithChildren<{
    allowSearch?: boolean;
    allowSelectAll?: boolean;
    height?: number;
    search?: HeaderFilterSearchConfig;
    searchTimeout?: number;
    showRelevantValues?: boolean;
    texts?: Record<string, any> | {
        cancel?: string;
        emptyValue?: string;
        ok?: string;
    };
    width?: number;
}>;
declare const _componentHeaderFilter: React.MemoExoticComponent<(props: IHeaderFilterProps) => React.FunctionComponentElement<IHeaderFilterProps>>;
declare const HeaderFilter: typeof _componentHeaderFilter & IElementDescriptor;
type IHeaderFilterTextsProps = React.PropsWithChildren<{
    cancel?: string;
    emptyValue?: string;
    ok?: string;
}>;
declare const _componentHeaderFilterTexts: React.MemoExoticComponent<(props: IHeaderFilterTextsProps) => React.FunctionComponentElement<IHeaderFilterTextsProps>>;
declare const HeaderFilterTexts: typeof _componentHeaderFilterTexts & IElementDescriptor;
type ILoadPanelProps = React.PropsWithChildren<{
    enabled?: boolean;
    height?: number;
    indicatorSrc?: string;
    shading?: boolean;
    shadingColor?: string;
    showIndicator?: boolean;
    showPane?: boolean;
    text?: string;
    width?: number;
}>;
declare const _componentLoadPanel: React.MemoExoticComponent<(props: ILoadPanelProps) => React.FunctionComponentElement<ILoadPanelProps>>;
declare const LoadPanel: typeof _componentLoadPanel & IElementDescriptor;
type IPivotGridTextsProps = React.PropsWithChildren<{
    collapseAll?: string;
    dataNotAvailable?: string;
    expandAll?: string;
    exportToExcel?: string;
    grandTotal?: string;
    noData?: string;
    removeAllSorting?: string;
    showFieldChooser?: string;
    sortColumnBySummary?: string;
    sortRowBySummary?: string;
    total?: string;
}>;
declare const _componentPivotGridTexts: React.MemoExoticComponent<(props: IPivotGridTextsProps) => React.FunctionComponentElement<IPivotGridTextsProps>>;
declare const PivotGridTexts: typeof _componentPivotGridTexts & IElementDescriptor;
type IScrollingProps = React.PropsWithChildren<{
    mode?: "standard" | "virtual";
    useNative?: boolean | "auto";
}>;
declare const _componentScrolling: React.MemoExoticComponent<(props: IScrollingProps) => React.FunctionComponentElement<IScrollingProps>>;
declare const Scrolling: typeof _componentScrolling & IElementDescriptor;
type ISearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    timeout?: number;
}>;
declare const _componentSearch: React.MemoExoticComponent<(props: ISearchProps) => React.FunctionComponentElement<ISearchProps>>;
declare const Search: typeof _componentSearch & IElementDescriptor;
type IStateStoringProps = React.PropsWithChildren<{
    customLoad?: (() => any);
    customSave?: ((state: any) => void);
    enabled?: boolean;
    savingTimeout?: number;
    storageKey?: string;
    type?: "custom" | "localStorage" | "sessionStorage";
}>;
declare const _componentStateStoring: React.MemoExoticComponent<(props: IStateStoringProps) => React.FunctionComponentElement<IStateStoringProps>>;
declare const StateStoring: typeof _componentStateStoring & IElementDescriptor;
type ITextsProps = React.PropsWithChildren<{
    allFields?: string;
    columnFields?: string;
    dataFields?: string;
    filterFields?: string;
    rowFields?: string;
    columnFieldArea?: string;
    dataFieldArea?: string;
    filterFieldArea?: string;
    rowFieldArea?: string;
    cancel?: string;
    emptyValue?: string;
    ok?: string;
    collapseAll?: string;
    dataNotAvailable?: string;
    expandAll?: string;
    exportToExcel?: string;
    grandTotal?: string;
    noData?: string;
    removeAllSorting?: string;
    showFieldChooser?: string;
    sortColumnBySummary?: string;
    sortRowBySummary?: string;
    total?: string;
}>;
declare const _componentTexts: React.MemoExoticComponent<(props: ITextsProps) => React.FunctionComponentElement<ITextsProps>>;
declare const Texts: typeof _componentTexts & IElementDescriptor;
export default PivotGrid;
export { PivotGrid, IPivotGridOptions, PivotGridRef, Export, IExportProps, FieldChooser, IFieldChooserProps, FieldChooserTexts, IFieldChooserTextsProps, FieldPanel, IFieldPanelProps, FieldPanelTexts, IFieldPanelTextsProps, HeaderFilter, IHeaderFilterProps, HeaderFilterTexts, IHeaderFilterTextsProps, LoadPanel, ILoadPanelProps, PivotGridTexts, IPivotGridTextsProps, Scrolling, IScrollingProps, Search, ISearchProps, StateStoring, IStateStoringProps, Texts, ITextsProps };
import type * as PivotGridTypes from 'dpt-ui/ui/pivot_grid_types';
export { PivotGridTypes };
