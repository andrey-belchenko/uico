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
import dxPivotGridFieldChooser, { Properties } from "dpt-ui/ui/pivot_grid_field_chooser";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, ContextMenuPreparingEvent, DisposingEvent, InitializedEvent } from "dpt-ui/ui/pivot_grid_field_chooser";
import type { HeaderFilterSearchConfig } from "dpt-ui/common/grids";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IPivotGridFieldChooserOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onContextMenuPreparing?: ((e: ContextMenuPreparingEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IPivotGridFieldChooserOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IPivotGridFieldChooserOptionsNarrowedEvents> & IHtmlOptions>;
interface PivotGridFieldChooserRef {
    instance: () => dxPivotGridFieldChooser;
}
declare const PivotGridFieldChooser: (props: React.PropsWithChildren<IPivotGridFieldChooserOptions> & {
    ref?: Ref<PivotGridFieldChooserRef>;
}) => ReactElement | null;
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
type IPivotGridFieldChooserTextsProps = React.PropsWithChildren<{
    allFields?: string;
    columnFields?: string;
    dataFields?: string;
    filterFields?: string;
    rowFields?: string;
}>;
declare const _componentPivotGridFieldChooserTexts: React.MemoExoticComponent<(props: IPivotGridFieldChooserTextsProps) => React.FunctionComponentElement<IPivotGridFieldChooserTextsProps>>;
declare const PivotGridFieldChooserTexts: typeof _componentPivotGridFieldChooserTexts & IElementDescriptor;
type ISearchProps = React.PropsWithChildren<{
    editorOptions?: any;
    enabled?: boolean;
    mode?: "contains" | "startswith" | "equals";
    timeout?: number;
}>;
declare const _componentSearch: React.MemoExoticComponent<(props: ISearchProps) => React.FunctionComponentElement<ISearchProps>>;
declare const Search: typeof _componentSearch & IElementDescriptor;
type ITextsProps = React.PropsWithChildren<{
    cancel?: string;
    emptyValue?: string;
    ok?: string;
    allFields?: string;
    columnFields?: string;
    dataFields?: string;
    filterFields?: string;
    rowFields?: string;
}>;
declare const _componentTexts: React.MemoExoticComponent<(props: ITextsProps) => React.FunctionComponentElement<ITextsProps>>;
declare const Texts: typeof _componentTexts & IElementDescriptor;
export default PivotGridFieldChooser;
export { PivotGridFieldChooser, IPivotGridFieldChooserOptions, PivotGridFieldChooserRef, HeaderFilter, IHeaderFilterProps, HeaderFilterTexts, IHeaderFilterTextsProps, PivotGridFieldChooserTexts, IPivotGridFieldChooserTextsProps, Search, ISearchProps, Texts, ITextsProps };
import type * as PivotGridFieldChooserTypes from 'dpt-ui/ui/pivot_grid_field_chooser_types';
export { PivotGridFieldChooserTypes };
