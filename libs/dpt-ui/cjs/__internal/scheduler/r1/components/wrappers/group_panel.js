/**
 * DevExtreme (cjs/__internal/scheduler/r1/components/wrappers/group_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupPanelComponent = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../core/component_registrator"));
var _index = require("../../../../core/r1/index");
var _group_panel = require("../base/group_panel");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
class GroupPanelComponent extends _index.ComponentWrapper {
    _setOptionsByReference() {
        super._setOptionsByReference();
        this._optionsByReference = _extends({}, this._optionsByReference, {
            resourceCellTemplate: true
        })
    }
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: [],
            templates: ["resourceCellTemplate"],
            props: ["viewContext", "groups", "groupOrientation", "groupPanelData", "groupByDate", "height", "className", "resourceCellTemplate"]
        }
    }
    get _viewComponent() {
        return _group_panel.GroupPanel
    }
}
exports.GroupPanelComponent = GroupPanelComponent;
(0, _component_registrator.default)("dxGroupPanel", GroupPanelComponent);
