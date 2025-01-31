/**
 * DevExtreme (cjs/ui/diagram/ui.diagram.context_toolbox.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _ui2 = _interopRequireDefault(require("../popover/ui.popover"));
var _diagram = require("./diagram.importer");
var _window = require("../../core/utils/window");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS = "dx-diagram-context-toolbox-target";
const DIAGRAM_CONTEXT_TOOLBOX_CLASS = "dx-diagram-context-toolbox";
const DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS = "dx-diagram-touch-context-toolbox";
const DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS = "dx-diagram-context-toolbox-content";
const DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT = 150;
class DiagramContextToolbox extends _ui.default {
    _init() {
        super._init();
        this._onShownAction = this._createActionByOption("onShown");
        const window = (0, _window.getWindow)();
        this._popoverPositionData = [{
            my: {
                x: "center",
                y: "top"
            },
            at: {
                x: "center",
                y: "bottom"
            },
            offset: {
                x: 0,
                y: 5
            },
            calcMaxHeight: rect => Math.max(150, window.innerHeight - rect.bottom - 6)
        }, {
            my: {
                x: "right",
                y: "center"
            },
            at: {
                x: "left",
                y: "center"
            },
            offset: {
                x: -5,
                y: 0
            },
            calcMaxHeight: rect => Math.max(150, 2 * Math.min(rect.top, window.innerHeight - rect.bottom) - 2)
        }, {
            my: {
                x: "center",
                y: "bottom"
            },
            at: {
                x: "center",
                y: "top"
            },
            offset: {
                x: 0,
                y: -5
            },
            calcMaxHeight: rect => Math.max(150, rect.top - 6)
        }, {
            my: {
                x: "left",
                y: "center"
            },
            at: {
                x: "right",
                y: "center"
            },
            offset: {
                x: 5,
                y: 0
            },
            calcMaxHeight: rect => Math.max(150, 2 * Math.min(rect.top, window.innerHeight - rect.bottom) - 2)
        }]
    }
    _initMarkup() {
        super._initMarkup();
        this._$popoverTargetElement = (0, _renderer.default)("<div>").addClass("dx-diagram-context-toolbox-target").appendTo(this.$element());
        const $popoverElement = (0, _renderer.default)("<div>").addClass("dx-diagram-context-toolbox").appendTo(this.$element());
        if (this._isTouchMode()) {
            $popoverElement.addClass("dx-diagram-touch-context-toolbox")
        }
        this._popoverInstance = this._createComponent($popoverElement, _ui2.default, {
            hideOnOutsideClick: false,
            container: this.$element()
        })
    }
    _isTouchMode() {
        const {
            Browser: Browser
        } = (0, _diagram.getDiagram)();
        return Browser.TouchUI
    }
    _show(x, y, side, category, callback) {
        this._popoverInstance.hide();
        this._$popoverTargetElement.css({
            left: x + this._popoverPositionData[side].offset.x,
            top: y + this._popoverPositionData[side].offset.y
        }).show();
        const window = (0, _window.getWindow)();
        const targetDiv = this._$popoverTargetElement.get(0);
        this._$popoverTargetElement.css({
            left: targetDiv.offsetLeft - (targetDiv.getBoundingClientRect().left + window.scrollX - targetDiv.offsetLeft),
            top: targetDiv.offsetTop - (targetDiv.getBoundingClientRect().top + window.scrollY - targetDiv.offsetTop)
        });
        const posRect = targetDiv.getBoundingClientRect();
        this._popoverInstance.option({
            maxHeight: this._popoverPositionData[side].calcMaxHeight(posRect),
            width: void 0 !== this.option("toolboxWidth") ? this.option("toolboxWidth") : void 0,
            position: {
                my: this._popoverPositionData[side].my,
                at: this._popoverPositionData[side].at,
                of: this._$popoverTargetElement
            },
            contentTemplate: () => (0, _renderer.default)("<div>").append((0, _renderer.default)("<div>").addClass("dx-diagram-context-toolbox-content")).dxScrollView({
                width: "100%",
                height: "100%"
            }),
            onContentReady: () => {
                const $element = this.$element().find(".dx-diagram-context-toolbox-content");
                this._onShownAction({
                    category: category,
                    callback: callback,
                    $element: $element,
                    hide: () => this._popoverInstance.hide()
                })
            }
        });
        this._popoverInstance.show()
    }
    _hide() {
        this._$popoverTargetElement.hide();
        this._popoverInstance.hide()
    }
}
var _default = exports.default = DiagramContextToolbox;
module.exports = exports.default;
module.exports.default = exports.default;
