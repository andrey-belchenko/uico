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

"use client";
import * as React from "react";
import { memo, forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import dxFileManager from "dpt-ui/ui/file_manager";
import { Component as BaseComponent } from "./core/component";
import NestedOption from "./core/nested-option";
const FileManager = memo(forwardRef((props, ref) => {
    const baseRef = useRef(null);
    useImperativeHandle(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = useMemo(() => (["onContentReady", "onContextMenuItemClick", "onContextMenuShowing", "onDirectoryCreated", "onDirectoryCreating", "onDisposing", "onErrorOccurred", "onFileUploaded", "onFileUploading", "onInitialized", "onItemCopied", "onItemCopying", "onItemDeleted", "onItemDeleting", "onItemDownloading", "onItemMoved", "onItemMoving", "onItemRenamed", "onItemRenaming", "onSelectedFileOpened", "onToolbarItemClick"]), []);
    const expectedChildren = useMemo(() => ({
        contextMenu: { optionName: "contextMenu", isCollectionItem: false },
        itemView: { optionName: "itemView", isCollectionItem: false },
        notifications: { optionName: "notifications", isCollectionItem: false },
        permissions: { optionName: "permissions", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        upload: { optionName: "upload", isCollectionItem: false }
    }), []);
    return (React.createElement((BaseComponent), {
        WidgetClass: dxFileManager,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        ...props,
    }));
}));
const _componentColumn = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Column = Object.assign(_componentColumn, {
    OptionName: "columns",
    IsCollectionItem: true,
});
const _componentContextMenu = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    },
});
const _componentContextMenuItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ContextMenuItem = Object.assign(_componentContextMenuItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentDetails = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Details = Object.assign(_componentDetails, {
    OptionName: "details",
    ExpectedChildren: {
        column: { optionName: "columns", isCollectionItem: true }
    },
});
const _componentFileSelectionItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const FileSelectionItem = Object.assign(_componentFileSelectionItem, {
    OptionName: "fileSelectionItems",
    IsCollectionItem: true,
});
const _componentItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentItemView = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ItemView = Object.assign(_componentItemView, {
    OptionName: "itemView",
    ExpectedChildren: {
        details: { optionName: "details", isCollectionItem: false }
    },
});
const _componentNotifications = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Notifications = Object.assign(_componentNotifications, {
    OptionName: "notifications",
});
const _componentPermissions = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Permissions = Object.assign(_componentPermissions, {
    OptionName: "permissions",
});
const _componentToolbar = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        fileSelectionItem: { optionName: "fileSelectionItems", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    },
});
const _componentToolbarItem = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const ToolbarItem = Object.assign(_componentToolbarItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
const _componentUpload = memo((props) => {
    return React.createElement((NestedOption), { ...props });
});
const Upload = Object.assign(_componentUpload, {
    OptionName: "upload",
});
export default FileManager;
export { FileManager, Column, ContextMenu, ContextMenuItem, Details, FileSelectionItem, Item, ItemView, Notifications, Permissions, Toolbar, ToolbarItem, Upload };
