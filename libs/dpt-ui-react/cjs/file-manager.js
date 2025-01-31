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
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = exports.ToolbarItem = exports.Toolbar = exports.Permissions = exports.Notifications = exports.ItemView = exports.Item = exports.FileSelectionItem = exports.Details = exports.ContextMenuItem = exports.ContextMenu = exports.Column = exports.FileManager = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const file_manager_1 = __importDefault(require("dpt-ui/ui/file_manager"));
const component_1 = require("./core/component");
const nested_option_1 = __importDefault(require("./core/nested-option"));
const FileManager = (0, react_1.memo)((0, react_1.forwardRef)((props, ref) => {
    const baseRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        instance() {
            return baseRef.current?.getInstance();
        }
    }), [baseRef.current]);
    const independentEvents = (0, react_1.useMemo)(() => (["onContentReady", "onContextMenuItemClick", "onContextMenuShowing", "onDirectoryCreated", "onDirectoryCreating", "onDisposing", "onErrorOccurred", "onFileUploaded", "onFileUploading", "onInitialized", "onItemCopied", "onItemCopying", "onItemDeleted", "onItemDeleting", "onItemDownloading", "onItemMoved", "onItemMoving", "onItemRenamed", "onItemRenaming", "onSelectedFileOpened", "onToolbarItemClick"]), []);
    const expectedChildren = (0, react_1.useMemo)(() => ({
        contextMenu: { optionName: "contextMenu", isCollectionItem: false },
        itemView: { optionName: "itemView", isCollectionItem: false },
        notifications: { optionName: "notifications", isCollectionItem: false },
        permissions: { optionName: "permissions", isCollectionItem: false },
        toolbar: { optionName: "toolbar", isCollectionItem: false },
        upload: { optionName: "upload", isCollectionItem: false }
    }), []);
    return (React.createElement((component_1.Component), {
        WidgetClass: file_manager_1.default,
        ref: baseRef,
        independentEvents,
        expectedChildren,
        ...props,
    }));
}));
exports.FileManager = FileManager;
const _componentColumn = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Column = Object.assign(_componentColumn, {
    OptionName: "columns",
    IsCollectionItem: true,
});
exports.Column = Column;
const _componentContextMenu = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ContextMenu = Object.assign(_componentContextMenu, {
    OptionName: "contextMenu",
    ExpectedChildren: {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    },
});
exports.ContextMenu = ContextMenu;
const _componentContextMenuItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ContextMenuItem = Object.assign(_componentContextMenuItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.ContextMenuItem = ContextMenuItem;
const _componentDetails = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Details = Object.assign(_componentDetails, {
    OptionName: "details",
    ExpectedChildren: {
        column: { optionName: "columns", isCollectionItem: true }
    },
});
exports.Details = Details;
const _componentFileSelectionItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const FileSelectionItem = Object.assign(_componentFileSelectionItem, {
    OptionName: "fileSelectionItems",
    IsCollectionItem: true,
});
exports.FileSelectionItem = FileSelectionItem;
const _componentItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Item = Object.assign(_componentItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.Item = Item;
const _componentItemView = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ItemView = Object.assign(_componentItemView, {
    OptionName: "itemView",
    ExpectedChildren: {
        details: { optionName: "details", isCollectionItem: false }
    },
});
exports.ItemView = ItemView;
const _componentNotifications = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Notifications = Object.assign(_componentNotifications, {
    OptionName: "notifications",
});
exports.Notifications = Notifications;
const _componentPermissions = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Permissions = Object.assign(_componentPermissions, {
    OptionName: "permissions",
});
exports.Permissions = Permissions;
const _componentToolbar = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Toolbar = Object.assign(_componentToolbar, {
    OptionName: "toolbar",
    ExpectedChildren: {
        fileSelectionItem: { optionName: "fileSelectionItems", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    },
});
exports.Toolbar = Toolbar;
const _componentToolbarItem = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const ToolbarItem = Object.assign(_componentToolbarItem, {
    OptionName: "items",
    IsCollectionItem: true,
});
exports.ToolbarItem = ToolbarItem;
const _componentUpload = (0, react_1.memo)((props) => {
    return React.createElement((nested_option_1.default), { ...props });
});
const Upload = Object.assign(_componentUpload, {
    OptionName: "upload",
});
exports.Upload = Upload;
exports.default = FileManager;
