/**
 * DevExtreme (cjs/ui/diagram/diagram.options_update.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _diagram = _interopRequireDefault(require("./diagram.bar"));
var _diagram2 = require("./diagram.importer");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class DiagramOptionsUpdateBar extends _diagram.default {
    constructor(owner) {
        super(owner);
        const {
            DiagramCommand: DiagramCommand
        } = (0, _diagram2.getDiagram)();
        this.commandOptions = {};
        this.commandOptions[DiagramCommand.Fullscreen] = "fullScreen";
        this.commandOptions[DiagramCommand.ZoomLevel] = function(value) {
            if ("object" === typeof this._getOption("zoomLevel")) {
                this._setOption("zoomLevel.value", value)
            } else {
                this._setOption("zoomLevel", value)
            }
        };
        this.commandOptions[DiagramCommand.SwitchAutoZoom] = function(value) {
            const {
                AutoZoomMode: AutoZoomMode
            } = (0, _diagram2.getDiagram)();
            switch (value) {
                case AutoZoomMode.FitContent:
                    this._setOption("autoZoomMode", "fitContent");
                    break;
                case AutoZoomMode.FitToWidth:
                    this._setOption("autoZoomMode", "fitWidth");
                    break;
                case AutoZoomMode.Disabled:
                    this._setOption("autoZoomMode", "disabled")
            }
        };
        this.commandOptions[DiagramCommand.ToggleSimpleView] = "simpleView";
        this.commandOptions[DiagramCommand.ShowGrid] = "showGrid";
        this.commandOptions[DiagramCommand.SnapToGrid] = "snapToGrid";
        this.commandOptions[DiagramCommand.GridSize] = function(value) {
            if ("object" === typeof this._getOption("gridSize")) {
                this._setOption("gridSize.value", value)
            } else {
                this._setOption("gridSize", value)
            }
        };
        this.commandOptions[DiagramCommand.ViewUnits] = "viewUnits";
        this.commandOptions[DiagramCommand.PageSize] = function(value) {
            const pageSize = this._getOption("pageSize");
            if (void 0 === pageSize || pageSize.width !== value.width || pageSize.height !== value.height) {
                this._setOption("pageSize", value)
            }
        };
        this.commandOptions[DiagramCommand.PageLandscape] = function(value) {
            this._setOption("pageOrientation", value ? "landscape" : "portrait")
        };
        this.commandOptions[DiagramCommand.ViewUnits] = function(value) {
            const {
                DiagramUnit: DiagramUnit
            } = (0, _diagram2.getDiagram)();
            switch (value) {
                case DiagramUnit.In:
                    this._setOption("viewUnits", "in");
                    break;
                case DiagramUnit.Cm:
                    this._setOption("viewUnits", "cm");
                    break;
                case DiagramUnit.Px:
                    this._setOption("viewUnits", "px")
            }
        };
        this.commandOptions[DiagramCommand.PageColor] = "pageColor";
        this._updateLock = 0
    }
    getCommandKeys() {
        return Object.keys(this.commandOptions).map((function(key) {
            return parseInt(key)
        }))
    }
    setItemValue(key, value) {
        if (this.isUpdateLocked()) {
            return
        }
        this.beginUpdate();
        try {
            if ("function" === typeof this.commandOptions[key]) {
                this.commandOptions[key].call(this, value)
            } else {
                this._setOption(this.commandOptions[key], value)
            }
        } finally {
            this.endUpdate()
        }
    }
    beginUpdate() {
        this._updateLock++
    }
    endUpdate() {
        this._updateLock--
    }
    isUpdateLocked() {
        return this._updateLock > 0
    }
    _getOption(name) {
        return this._owner.option(name)
    }
    _setOption(name, value) {
        this._owner.option(name, value)
    }
}
var _default = exports.default = DiagramOptionsUpdateBar;
module.exports = exports.default;
module.exports.default = exports.default;
