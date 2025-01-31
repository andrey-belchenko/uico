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
import dxHtmlEditor, { Properties } from "dpt-ui/ui/html_editor";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, FocusInEvent, FocusOutEvent, InitializedEvent, ValueChangedEvent, dxHtmlEditorImageUploadTabItem, dxHtmlEditorTableContextMenuItem, dxHtmlEditorToolbarItem } from "dpt-ui/ui/html_editor";
import type { ContentReadyEvent as FileUploaderContentReadyEvent, DisposingEvent as FileUploaderDisposingEvent, InitializedEvent as FileUploaderInitializedEvent, ValueChangedEvent as FileUploaderValueChangedEvent, BeforeSendEvent, DropZoneEnterEvent, DropZoneLeaveEvent, FilesUploadedEvent, OptionChangedEvent, ProgressEvent, UploadAbortedEvent, UploadedEvent, UploadErrorEvent, UploadStartedEvent, dxFileUploaderOptions } from "dpt-ui/ui/file_uploader";
import type { CollectionWidgetItem } from "dpt-ui/ui/collection/ui.collection_widget.base";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type UploadInfo from "dpt-ui/file_management/upload_info";
import type DataSource from "dpt-ui/data/data_source";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IHtmlEditorOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IHtmlEditorOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IHtmlEditorOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}>;
interface HtmlEditorRef {
    instance: () => dxHtmlEditor;
}
declare const HtmlEditor: (props: React.PropsWithChildren<IHtmlEditorOptions> & {
    ref?: Ref<HtmlEditorRef>;
}) => ReactElement | null;
type IFileUploaderOptionsProps = React.PropsWithChildren<{
    abortUpload?: ((file: any, uploadInfo?: UploadInfo) => any);
    accept?: string;
    accessKey?: string;
    activeStateEnabled?: boolean;
    allowCanceling?: boolean;
    allowedFileExtensions?: Array<string>;
    bindingOptions?: Record<string, any>;
    chunkSize?: number;
    dialogTrigger?: any | string;
    disabled?: boolean;
    dropZone?: any | string;
    elementAttr?: Record<string, any>;
    focusStateEnabled?: boolean;
    height?: (() => number | string) | number | string;
    hint?: string;
    hoverStateEnabled?: boolean;
    inputAttr?: any;
    invalidFileExtensionMessage?: string;
    invalidMaxFileSizeMessage?: string;
    invalidMinFileSizeMessage?: string;
    isDirty?: boolean;
    isValid?: boolean;
    labelText?: string;
    maxFileSize?: number;
    minFileSize?: number;
    multiple?: boolean;
    name?: string;
    onBeforeSend?: ((e: BeforeSendEvent) => void);
    onContentReady?: ((e: FileUploaderContentReadyEvent) => void);
    onDisposing?: ((e: FileUploaderDisposingEvent) => void);
    onDropZoneEnter?: ((e: DropZoneEnterEvent) => void);
    onDropZoneLeave?: ((e: DropZoneLeaveEvent) => void);
    onFilesUploaded?: ((e: FilesUploadedEvent) => void);
    onInitialized?: ((e: FileUploaderInitializedEvent) => void);
    onOptionChanged?: ((e: OptionChangedEvent) => void);
    onProgress?: ((e: ProgressEvent) => void);
    onUploadAborted?: ((e: UploadAbortedEvent) => void);
    onUploaded?: ((e: UploadedEvent) => void);
    onUploadError?: ((e: UploadErrorEvent) => void);
    onUploadStarted?: ((e: UploadStartedEvent) => void);
    onValueChanged?: ((e: FileUploaderValueChangedEvent) => void);
    progress?: number;
    readOnly?: boolean;
    readyToUploadMessage?: string;
    rtlEnabled?: boolean;
    selectButtonText?: string;
    showFileList?: boolean;
    tabIndex?: number;
    uploadAbortedMessage?: string;
    uploadButtonText?: string;
    uploadChunk?: ((file: any, uploadInfo: UploadInfo) => any);
    uploadCustomData?: any;
    uploadedMessage?: string;
    uploadFailedMessage?: string;
    uploadFile?: ((file: any, progressCallback: (() => void)) => any);
    uploadHeaders?: any;
    uploadMethod?: "POST" | "PUT";
    uploadMode?: "instantly" | "useButtons" | "useForm";
    uploadUrl?: string;
    validationError?: any;
    validationErrors?: Array<any>;
    validationStatus?: "valid" | "invalid" | "pending";
    value?: Array<any>;
    visible?: boolean;
    width?: (() => number | string) | number | string;
    defaultValue?: Array<any>;
    onValueChange?: (value: Array<any>) => void;
}>;
declare const _componentFileUploaderOptions: React.MemoExoticComponent<(props: IFileUploaderOptionsProps) => React.FunctionComponentElement<IFileUploaderOptionsProps>>;
declare const FileUploaderOptions: typeof _componentFileUploaderOptions & IElementDescriptor;
type IImageUploadProps = React.PropsWithChildren<{
    fileUploaderOptions?: dxFileUploaderOptions;
    fileUploadMode?: "base64" | "server" | "both";
    tabs?: Array<dxHtmlEditorImageUploadTabItem | "url" | "file">;
    uploadDirectory?: string;
    uploadUrl?: string;
}>;
declare const _componentImageUpload: React.MemoExoticComponent<(props: IImageUploadProps) => React.FunctionComponentElement<IImageUploadProps>>;
declare const ImageUpload: typeof _componentImageUpload & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxHtmlEditorTableContextMenuItem | "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "undo" | "redo" | "clear" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable" | "cellProperties" | "tableProperties">;
    name?: "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "undo" | "redo" | "clear" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable" | "cellProperties" | "tableProperties" | "size" | "header" | "separator";
    selectable?: boolean;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    acceptedValues?: Array<boolean | number | string>;
    cssClass?: string;
    formatName?: "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "size" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "header" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "separator" | "undo" | "redo" | "clear" | "cellProperties" | "tableProperties" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable";
    formatValues?: Array<boolean | number | string>;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    options?: any;
    showText?: "always" | "inMenu";
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IMediaResizingProps = React.PropsWithChildren<{
    allowedTargets?: Array<string>;
    enabled?: boolean;
}>;
declare const _componentMediaResizing: React.MemoExoticComponent<(props: IMediaResizingProps) => React.FunctionComponentElement<IMediaResizingProps>>;
declare const MediaResizing: typeof _componentMediaResizing & IElementDescriptor;
type IMentionProps = React.PropsWithChildren<{
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    displayExpr?: ((item: any) => string) | string;
    itemTemplate?: ((itemData: any, itemIndex: number, itemElement: any) => string | any) | template;
    marker?: string;
    minSearchLength?: number;
    searchExpr?: Array<(() => any) | string> | (() => any) | string;
    searchTimeout?: number;
    template?: ((mentionData: {
        id: string | number;
        marker: string;
        value: any;
    }, contentElement: any) => string | any) | template;
    valueExpr?: (() => void) | string;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentMention: React.MemoExoticComponent<(props: IMentionProps) => React.FunctionComponentElement<IMentionProps>>;
declare const Mention: typeof _componentMention & IElementDescriptor;
type ITabProps = React.PropsWithChildren<{
    name?: "url" | "file";
}>;
declare const _componentTab: React.MemoExoticComponent<(props: ITabProps) => React.FunctionComponentElement<ITabProps>>;
declare const Tab: typeof _componentTab & IElementDescriptor;
type ITableContextMenuProps = React.PropsWithChildren<{
    enabled?: boolean;
    items?: Array<dxHtmlEditorTableContextMenuItem | "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "undo" | "redo" | "clear" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable" | "cellProperties" | "tableProperties">;
}>;
declare const _componentTableContextMenu: React.MemoExoticComponent<(props: ITableContextMenuProps) => React.FunctionComponentElement<ITableContextMenuProps>>;
declare const TableContextMenu: typeof _componentTableContextMenu & IElementDescriptor;
type ITableContextMenuItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxHtmlEditorTableContextMenuItem | "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "undo" | "redo" | "clear" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable" | "cellProperties" | "tableProperties">;
    name?: "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "undo" | "redo" | "clear" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable" | "cellProperties" | "tableProperties";
    selectable?: boolean;
    selected?: boolean;
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentTableContextMenuItem: React.MemoExoticComponent<(props: ITableContextMenuItemProps) => React.FunctionComponentElement<ITableContextMenuItemProps>>;
declare const TableContextMenuItem: typeof _componentTableContextMenuItem & IElementDescriptor;
type ITableResizingProps = React.PropsWithChildren<{
    enabled?: boolean;
    minColumnWidth?: number;
    minRowHeight?: number;
}>;
declare const _componentTableResizing: React.MemoExoticComponent<(props: ITableResizingProps) => React.FunctionComponentElement<ITableResizingProps>>;
declare const TableResizing: typeof _componentTableResizing & IElementDescriptor;
type IToolbarProps = React.PropsWithChildren<{
    container?: any | string;
    items?: Array<dxHtmlEditorToolbarItem | "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "size" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "header" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "separator" | "undo" | "redo" | "clear" | "cellProperties" | "tableProperties" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable">;
    multiline?: boolean;
}>;
declare const _componentToolbar: React.MemoExoticComponent<(props: IToolbarProps) => React.FunctionComponentElement<IToolbarProps>>;
declare const Toolbar: typeof _componentToolbar & IElementDescriptor;
type IToolbarItemProps = React.PropsWithChildren<{
    acceptedValues?: Array<boolean | number | string>;
    cssClass?: string;
    disabled?: boolean;
    formatName?: "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "size" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "header" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "separator" | "undo" | "redo" | "clear" | "cellProperties" | "tableProperties" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable";
    formatValues?: Array<boolean | number | string>;
    html?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    menuItemTemplate?: (() => string | any) | template;
    name?: "background" | "bold" | "color" | "font" | "italic" | "link" | "image" | "size" | "strike" | "subscript" | "superscript" | "underline" | "blockquote" | "header" | "increaseIndent" | "decreaseIndent" | "orderedList" | "bulletList" | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify" | "codeBlock" | "variable" | "separator" | "undo" | "redo" | "clear" | "cellProperties" | "tableProperties" | "insertTable" | "insertHeaderRow" | "insertRowAbove" | "insertRowBelow" | "insertColumnLeft" | "insertColumnRight" | "deleteColumn" | "deleteRow" | "deleteTable";
    options?: any;
    showText?: "always" | "inMenu";
    template?: ((itemData: CollectionWidgetItem, itemIndex: number, itemElement: any) => string | any) | template;
    text?: string;
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
declare const _componentToolbarItem: React.MemoExoticComponent<(props: IToolbarItemProps) => React.FunctionComponentElement<IToolbarItemProps>>;
declare const ToolbarItem: typeof _componentToolbarItem & IElementDescriptor;
type IVariablesProps = React.PropsWithChildren<{
    dataSource?: Array<string> | DataSource | DataSourceOptions | null | Store | string;
    escapeChar?: Array<string> | string;
}>;
declare const _componentVariables: React.MemoExoticComponent<(props: IVariablesProps) => React.FunctionComponentElement<IVariablesProps>>;
declare const Variables: typeof _componentVariables & IElementDescriptor;
export default HtmlEditor;
export { HtmlEditor, IHtmlEditorOptions, HtmlEditorRef, FileUploaderOptions, IFileUploaderOptionsProps, ImageUpload, IImageUploadProps, Item, IItemProps, MediaResizing, IMediaResizingProps, Mention, IMentionProps, Tab, ITabProps, TableContextMenu, ITableContextMenuProps, TableContextMenuItem, ITableContextMenuItemProps, TableResizing, ITableResizingProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, Variables, IVariablesProps };
import type * as HtmlEditorTypes from 'dpt-ui/ui/html_editor_types';
export { HtmlEditorTypes };
