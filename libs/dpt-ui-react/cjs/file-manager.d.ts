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
import dxFileManager, { Properties } from "dpt-ui/ui/file_manager";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, ContextMenuItemClickEvent, ContextMenuShowingEvent, DirectoryCreatedEvent, DirectoryCreatingEvent, DisposingEvent, ErrorOccurredEvent, FileUploadedEvent, FileUploadingEvent, InitializedEvent, ItemCopiedEvent, ItemCopyingEvent, ItemDeletedEvent, ItemDeletingEvent, ItemDownloadingEvent, ItemMovedEvent, ItemMovingEvent, ItemRenamedEvent, ItemRenamingEvent, SelectedFileOpenedEvent, ToolbarItemClickEvent, dxFileManagerContextMenuItem, dxFileManagerDetailsColumn, dxFileManagerToolbarItem } from "dpt-ui/ui/file_manager";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IFileManagerOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onContextMenuItemClick?: ((e: ContextMenuItemClickEvent) => void);
    onContextMenuShowing?: ((e: ContextMenuShowingEvent) => void);
    onDirectoryCreated?: ((e: DirectoryCreatedEvent) => void);
    onDirectoryCreating?: ((e: DirectoryCreatingEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onErrorOccurred?: ((e: ErrorOccurredEvent) => void);
    onFileUploaded?: ((e: FileUploadedEvent) => void);
    onFileUploading?: ((e: FileUploadingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onItemCopied?: ((e: ItemCopiedEvent) => void);
    onItemCopying?: ((e: ItemCopyingEvent) => void);
    onItemDeleted?: ((e: ItemDeletedEvent) => void);
    onItemDeleting?: ((e: ItemDeletingEvent) => void);
    onItemDownloading?: ((e: ItemDownloadingEvent) => void);
    onItemMoved?: ((e: ItemMovedEvent) => void);
    onItemMoving?: ((e: ItemMovingEvent) => void);
    onItemRenamed?: ((e: ItemRenamedEvent) => void);
    onItemRenaming?: ((e: ItemRenamingEvent) => void);
    onSelectedFileOpened?: ((e: SelectedFileOpenedEvent) => void);
    onToolbarItemClick?: ((e: ToolbarItemClickEvent) => void);
};
type IFileManagerOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IFileManagerOptionsNarrowedEvents> & IHtmlOptions>;
interface FileManagerRef {
    instance: () => dxFileManager;
}
declare const FileManager: (props: React.PropsWithChildren<IFileManagerOptions> & {
    ref?: Ref<FileManagerRef>;
}) => ReactElement | null;
type IColumnProps = React.PropsWithChildren<{
    alignment?: "center" | "left" | "right";
    caption?: string;
    cssClass?: string;
    dataField?: string;
    dataType?: "string" | "number" | "date" | "boolean" | "object" | "datetime";
    hidingPriority?: number;
    sortIndex?: number;
    sortOrder?: "asc" | "desc";
    visible?: boolean;
    visibleIndex?: number;
    width?: number | string;
}>;
declare const _componentColumn: React.MemoExoticComponent<(props: IColumnProps) => React.FunctionComponentElement<IColumnProps>>;
declare const Column: typeof _componentColumn & IElementDescriptor;
type IContextMenuProps = React.PropsWithChildren<{
    items?: Array<dxFileManagerContextMenuItem | "create" | "upload" | "refresh" | "download" | "move" | "copy" | "rename" | "delete">;
}>;
declare const _componentContextMenu: React.MemoExoticComponent<(props: IContextMenuProps) => React.FunctionComponentElement<IContextMenuProps>>;
declare const ContextMenu: typeof _componentContextMenu & IElementDescriptor;
type IContextMenuItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxFileManagerContextMenuItem>;
    name?: "create" | "upload" | "refresh" | "download" | "move" | "copy" | "rename" | "delete";
    selectable?: boolean;
    selected?: boolean;
    text?: string;
    visible?: boolean;
}>;
declare const _componentContextMenuItem: React.MemoExoticComponent<(props: IContextMenuItemProps) => React.FunctionComponentElement<IContextMenuItemProps>>;
declare const ContextMenuItem: typeof _componentContextMenuItem & IElementDescriptor;
type IDetailsProps = React.PropsWithChildren<{
    columns?: Array<dxFileManagerDetailsColumn | string>;
}>;
declare const _componentDetails: React.MemoExoticComponent<(props: IDetailsProps) => React.FunctionComponentElement<IDetailsProps>>;
declare const Details: typeof _componentDetails & IElementDescriptor;
type IFileSelectionItemProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean;
    icon?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    name?: "showNavPane" | "create" | "upload" | "refresh" | "switchView" | "download" | "move" | "copy" | "rename" | "delete" | "clearSelection" | "separator";
    options?: any;
    showText?: "always" | "inMenu";
    text?: string;
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
}>;
declare const _componentFileSelectionItem: React.MemoExoticComponent<(props: IFileSelectionItemProps) => React.FunctionComponentElement<IFileSelectionItemProps>>;
declare const FileSelectionItem: typeof _componentFileSelectionItem & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    beginGroup?: boolean;
    closeMenuOnClick?: boolean;
    disabled?: boolean;
    icon?: string;
    items?: Array<dxFileManagerContextMenuItem>;
    name?: "create" | "upload" | "refresh" | "download" | "move" | "copy" | "rename" | "delete" | "showNavPane" | "switchView" | "clearSelection" | "separator";
    selectable?: boolean;
    selected?: boolean;
    text?: string;
    visible?: boolean;
    cssClass?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    options?: any;
    showText?: "always" | "inMenu";
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IItemViewProps = React.PropsWithChildren<{
    details?: Record<string, any> | {
        columns?: Array<dxFileManagerDetailsColumn | string>;
    };
    mode?: "details" | "thumbnails";
    showFolders?: boolean;
    showParentFolder?: boolean;
}>;
declare const _componentItemView: React.MemoExoticComponent<(props: IItemViewProps) => React.FunctionComponentElement<IItemViewProps>>;
declare const ItemView: typeof _componentItemView & IElementDescriptor;
type INotificationsProps = React.PropsWithChildren<{
    showPanel?: boolean;
    showPopup?: boolean;
}>;
declare const _componentNotifications: React.MemoExoticComponent<(props: INotificationsProps) => React.FunctionComponentElement<INotificationsProps>>;
declare const Notifications: typeof _componentNotifications & IElementDescriptor;
type IPermissionsProps = React.PropsWithChildren<{
    copy?: boolean;
    create?: boolean;
    delete?: boolean;
    download?: boolean;
    move?: boolean;
    rename?: boolean;
    upload?: boolean;
}>;
declare const _componentPermissions: React.MemoExoticComponent<(props: IPermissionsProps) => React.FunctionComponentElement<IPermissionsProps>>;
declare const Permissions: typeof _componentPermissions & IElementDescriptor;
type IToolbarProps = React.PropsWithChildren<{
    fileSelectionItems?: Array<dxFileManagerToolbarItem | "showNavPane" | "create" | "upload" | "refresh" | "switchView" | "download" | "move" | "copy" | "rename" | "delete" | "clearSelection" | "separator">;
    items?: Array<dxFileManagerToolbarItem | "showNavPane" | "create" | "upload" | "refresh" | "switchView" | "download" | "move" | "copy" | "rename" | "delete" | "clearSelection" | "separator">;
}>;
declare const _componentToolbar: React.MemoExoticComponent<(props: IToolbarProps) => React.FunctionComponentElement<IToolbarProps>>;
declare const Toolbar: typeof _componentToolbar & IElementDescriptor;
type IToolbarItemProps = React.PropsWithChildren<{
    cssClass?: string;
    disabled?: boolean;
    icon?: string;
    locateInMenu?: "always" | "auto" | "never";
    location?: "after" | "before" | "center";
    name?: "showNavPane" | "create" | "upload" | "refresh" | "switchView" | "download" | "move" | "copy" | "rename" | "delete" | "clearSelection" | "separator";
    options?: any;
    showText?: "always" | "inMenu";
    text?: string;
    visible?: boolean;
    widget?: "dxAutocomplete" | "dxButton" | "dxButtonGroup" | "dxCheckBox" | "dxDateBox" | "dxDropDownButton" | "dxMenu" | "dxSelectBox" | "dxSwitch" | "dxTabs" | "dxTextBox";
}>;
declare const _componentToolbarItem: React.MemoExoticComponent<(props: IToolbarItemProps) => React.FunctionComponentElement<IToolbarItemProps>>;
declare const ToolbarItem: typeof _componentToolbarItem & IElementDescriptor;
type IUploadProps = React.PropsWithChildren<{
    chunkSize?: number;
    maxFileSize?: number;
}>;
declare const _componentUpload: React.MemoExoticComponent<(props: IUploadProps) => React.FunctionComponentElement<IUploadProps>>;
declare const Upload: typeof _componentUpload & IElementDescriptor;
export default FileManager;
export { FileManager, IFileManagerOptions, FileManagerRef, Column, IColumnProps, ContextMenu, IContextMenuProps, ContextMenuItem, IContextMenuItemProps, Details, IDetailsProps, FileSelectionItem, IFileSelectionItemProps, Item, IItemProps, ItemView, IItemViewProps, Notifications, INotificationsProps, Permissions, IPermissionsProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, Upload, IUploadProps };
import type * as FileManagerTypes from 'dpt-ui/ui/file_manager_types';
export { FileManagerTypes };
