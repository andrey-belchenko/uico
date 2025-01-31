/**
 * DevExtreme (cjs/renovation/ui/editors/common/editor_state_props.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.EditorStateProps = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const EditorStateProps = exports.EditorStateProps = {
    hoverStateEnabled: true,
    activeStateEnabled: true,
    get focusStateEnabled() {
        return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
    }
};
