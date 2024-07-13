/**
 * DevExtreme (cjs/file_management/file_system_item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../core/utils/type");
var _utils = require("./utils");
class FileSystemItem {
    constructor() {
        const ctor = (0, _type.isString)(arguments[0]) ? this._publicCtor : this._internalCtor;
        ctor.apply(this, arguments)
    }
    _internalCtor(pathInfo, name, isDirectory, key) {
        this.name = name || "";
        this.pathInfo = pathInfo && [...pathInfo] || [];
        this.parentPath = this._getPathByPathInfo(this.pathInfo);
        this.relativeName = (0, _utils.pathCombine)(this.parentPath, name);
        this.key = key || this._getPathByPathInfo(this.getFullPathInfo(), true);
        this.path = (0, _utils.pathCombine)(this.parentPath, name);
        this.pathKeys = this.pathInfo.map((_ref => {
            let {
                key: key
            } = _ref;
            return key
        }));
        if (!this.isRoot()) {
            this.pathKeys.push(this.key)
        }
        this._initialize(isDirectory)
    }
    _publicCtor(path, isDirectory, pathKeys) {
        this.path = path || "";
        this.pathKeys = pathKeys || [];
        const pathInfo = [];
        const parts = (0, _utils.getPathParts)(path, true);
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            const pathInfoPart = {
                key: this.pathKeys[i] || part,
                name: (0, _utils.getName)(part)
            };
            pathInfo.push(pathInfoPart)
        }
        this.pathInfo = pathInfo;
        this.relativeName = path;
        this.name = (0, _utils.getName)(path);
        this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : path;
        this.parentPath = parts.length > 1 ? parts[parts.length - 2] : "";
        this._initialize(isDirectory)
    }
    _initialize(isDirectory) {
        this.isDirectory = !!isDirectory;
        this.size = 0;
        this.dateModified = new Date;
        this.thumbnail = "";
        this.tooltipText = ""
    }
    getFullPathInfo() {
        const pathInfo = [...this.pathInfo];
        if (!this.isRoot()) {
            pathInfo.push({
                key: this.key,
                name: this.name
            })
        }
        return pathInfo
    }
    isRoot() {
        return "" === this.path
    }
    getFileExtension() {
        return this.isDirectory ? "" : (0, _utils.getFileExtension)(this.name)
    }
    equals(item) {
        return item && this.key === item.key
    }
    createClone() {
        const result = new FileSystemItem(this.pathInfo, this.name, this.isDirectory, this.key);
        result.key = this.key;
        result.size = this.size;
        result.dateModified = this.dateModified;
        result.thumbnail = this.thumbnail;
        result.tooltipText = this.tooltipText;
        result.hasSubDirectories = this.hasSubDirectories;
        result.dataItem = this.dataItem;
        return result
    }
    _getPathByPathInfo(pathInfo, escape) {
        return pathInfo.map((info => escape ? (0, _utils.getEscapedFileName)(info.name) : info.name)).join(_utils.PATH_SEPARATOR)
    }
}
var _default = exports.default = FileSystemItem;
module.exports = exports.default;
module.exports.default = exports.default;
