/**
 * DevExtreme (cjs/ui/menu/ui.submenu.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _element = require("../../core/element");
var _position = _interopRequireDefault(require("../../animation/position"));
var _extend = require("../../core/utils/extend");
var _context_menu = _interopRequireDefault(require("../context_menu"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = "dx-context-menu-content-delimiter";
const DX_SUBMENU_CLASS = "dx-submenu";
class Submenu extends _context_menu.default {
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            orientation: "horizontal",
            tabIndex: null,
            onHoverStart: _common.noop
        })
    }
    _initDataAdapter() {
        this._dataAdapter = this.option("_dataAdapter");
        if (!this._dataAdapter) {
            super._initDataAdapter()
        }
    }
    _renderContentImpl() {
        this._renderContextMenuOverlay();
        super._renderContentImpl();
        const node = this._dataAdapter.getNodeByKey(this.option("_parentKey"));
        node && this._renderItems(this._getChildNodes(node));
        this._renderDelimiter()
    }
    _renderDelimiter() {
        this.$contentDelimiter = (0, _renderer.default)("<div>").appendTo(this._itemContainer()).addClass("dx-context-menu-content-delimiter")
    }
    _getOverlayOptions() {
        return (0, _extend.extend)(true, super._getOverlayOptions(), {
            onPositioned: this._overlayPositionedActionHandler.bind(this),
            position: {
                precise: true
            }
        })
    }
    _overlayPositionedActionHandler(arg) {
        this._showDelimiter(arg)
    }
    _hoverEndHandler(e) {
        super._hoverEndHandler(e);
        this._toggleFocusClass(false, e.currentTarget)
    }
    _isMenuHorizontal() {
        return "horizontal" === this.option("orientation")
    }
    _hoverStartHandler(e) {
        const hoverStartAction = this.option("onHoverStart");
        hoverStartAction(e);
        super._hoverStartHandler(e);
        this._toggleFocusClass(true, e.currentTarget)
    }
    _drawSubmenu($rootItem) {
        this._actions.onShowing({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        });
        super._drawSubmenu($rootItem);
        this._actions.onShown({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        })
    }
    _hideSubmenu($rootItem) {
        this._actions.onHiding({
            cancel: true,
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        });
        super._hideSubmenu($rootItem);
        this._actions.onHidden({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        })
    }
    _showDelimiter(arg) {
        if (!this.$contentDelimiter) {
            return
        }
        const $submenu = this._itemContainer().children(".dx-submenu").eq(0);
        const $rootItem = this.option("position").of.find(".dx-context-menu-container-border");
        const position = {
            of: $submenu,
            precise: true
        };
        const containerOffset = arg.position;
        const vLocation = containerOffset.v.location;
        const hLocation = containerOffset.h.location;
        const rootOffset = $rootItem.offset();
        const offsetLeft = Math.round(rootOffset.left);
        const offsetTop = Math.round(rootOffset.top);
        const rootWidth = (0, _size.getWidth)($rootItem);
        const rootHeight = (0, _size.getHeight)($rootItem);
        const submenuWidth = (0, _size.getWidth)($submenu);
        const submenuHeight = (0, _size.getHeight)($submenu);
        this.$contentDelimiter.css("display", "block");
        (0, _size.setWidth)(this.$contentDelimiter, this._isMenuHorizontal() ? rootWidth < submenuWidth ? rootWidth : submenuWidth : 3);
        (0, _size.setHeight)(this.$contentDelimiter, this._isMenuHorizontal() ? 3 : rootHeight < submenuHeight ? rootHeight : submenuHeight);
        if (this._isMenuHorizontal()) {
            if (vLocation > offsetTop) {
                if (Math.round(hLocation) === offsetLeft) {
                    position.offset = "0 -2.5";
                    position.at = position.my = "left top"
                } else {
                    position.offset = "0 -2.5";
                    position.at = position.my = "right top"
                }
            } else {
                (0, _size.setHeight)(this.$contentDelimiter, 5);
                if (Math.round(hLocation) === offsetLeft) {
                    position.offset = "0 5";
                    position.at = position.my = "left bottom"
                } else {
                    position.offset = "0 5";
                    position.at = position.my = "right bottom"
                }
            }
        } else if (hLocation > offsetLeft) {
            if (Math.round(vLocation) === offsetTop) {
                position.offset = "-2.5 0";
                position.at = position.my = "left top"
            } else {
                position.offset = "-2.5 0";
                position.at = position.my = "left bottom"
            }
        } else if (Math.round(vLocation) === offsetTop) {
            position.offset = "2.5 0";
            position.at = position.my = "right top"
        } else {
            position.offset = "2.5 0";
            position.at = position.my = "right bottom"
        }
        _position.default.setup(this.$contentDelimiter, position)
    }
    _getContextMenuPosition() {
        return this.option("position")
    }
    isOverlayVisible() {
        return this._overlay.option("visible")
    }
    getOverlayContent() {
        return this._overlay.$content()
    }
}
var _default = exports.default = Submenu;
module.exports = exports.default;
module.exports.default = exports.default;
