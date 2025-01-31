/**
 * DevExtreme (cjs/ui/diagram/ui.diagram.scroll_view.js)
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
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _m_widget_utils = require("../../__internal/grids/pivot_grid/m_widget_utils");
var _diagram = require("./diagram.importer");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
class DiagramScrollView extends _ui.default {
    _init() {
        super._init();
        const {
            EventDispatcher: EventDispatcher
        } = (0, _diagram.getDiagram)();
        this.onScroll = new EventDispatcher;
        this._createOnCreateDiagramAction()
    }
    _initMarkup() {
        super._initMarkup();
        const $scrollViewWrapper = (0, _renderer.default)("<div>").appendTo(this.$element());
        const options = {
            direction: "both",
            bounceEnabled: false,
            scrollByContent: false,
            onScroll: _ref => {
                let {
                    scrollOffset: scrollOffset
                } = _ref;
                this._raiseOnScroll(scrollOffset.left, scrollOffset.top)
            }
        };
        const useNativeScrolling = this.option("useNativeScrolling");
        if (void 0 !== useNativeScrolling) {
            options.useNative = useNativeScrolling
        }
        this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default, options);
        this._onCreateDiagramAction({
            $parent: (0, _renderer.default)(this._scrollView.content()),
            scrollView: this
        })
    }
    setScroll(left, top) {
        this._scrollView.scrollTo({
            left: left,
            top: top
        });
        this._raiseOnScrollWithoutPoint()
    }
    offsetScroll(left, top) {
        this._scrollView.scrollBy({
            left: left,
            top: top
        });
        this._raiseOnScrollWithoutPoint()
    }
    getSize() {
        const {
            Size: Size
        } = (0, _diagram.getDiagram)();
        const $element = this._scrollView.$element();
        return new Size(Math.floor((0, _size.getWidth)($element)), Math.floor((0, _size.getHeight)($element)))
    }
    getScrollContainer() {
        return this._scrollView.$element()[0]
    }
    getScrollBarWidth() {
        return this.option("useNativeScrolling") ? (0, _m_widget_utils.calculateScrollbarWidth)() : 0
    }
    detachEvents() {}
    _raiseOnScroll(left, top) {
        const {
            Point: Point
        } = (0, _diagram.getDiagram)();
        this.onScroll.raise("notifyScrollChanged", (() => new Point(left, top)))
    }
    _raiseOnScrollWithoutPoint() {
        const {
            Point: Point
        } = (0, _diagram.getDiagram)();
        this.onScroll.raise("notifyScrollChanged", (() => new Point(this._scrollView.scrollLeft(), this._scrollView.scrollTop())))
    }
    _createOnCreateDiagramAction() {
        this._onCreateDiagramAction = this._createActionByOption("onCreateDiagram")
    }
    _optionChanged(args) {
        switch (args.name) {
            case "onCreateDiagram":
                this._createOnCreateDiagramAction();
                break;
            case "useNativeScrolling":
                break;
            default:
                super._optionChanged(args)
        }
    }
}
var _default = exports.default = DiagramScrollView;
module.exports = exports.default;
module.exports.default = exports.default;
