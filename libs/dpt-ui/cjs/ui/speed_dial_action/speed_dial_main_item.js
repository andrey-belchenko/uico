/**
 * DevExtreme (cjs/ui/speed_dial_action/speed_dial_main_item.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.disposeAction = disposeAction;
exports.initAction = initAction;
exports.repaint = repaint;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _config = _interopRequireDefault(require("../../core/config"));
var _extend = require("../../core/utils/extend");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _swatch_container = _interopRequireDefault(require("../widget/swatch_container"));
var _speed_dial_item = _interopRequireDefault(require("./speed_dial_item"));
var _themes = require("../themes");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const {
    getSwatchContainer: getSwatchContainer
} = _swatch_container.default;
const FAB_MAIN_CLASS = "dx-fa-button-main";
const FAB_MAIN_CLASS_WITH_LABEL = "dx-fa-button-with-label";
const FAB_MAIN_CLASS_WITHOUT_ICON = "dx-fa-button-without-icon";
const FAB_CLOSE_ICON_CLASS = "dx-fa-button-icon-close";
const INVISIBLE_STATE_CLASS = "dx-state-invisible";
let speedDialMainItem = null;
const modifyActionOptions = action => {
    const {
        animation: animation,
        actionComponent: actionComponent,
        actionVisible: actionVisible,
        actions: actions,
        activeStateEnabled: activeStateEnabled,
        direction: direction,
        elementAttr: elementAttr,
        hint: hint,
        hoverStateEnabled: hoverStateEnabled,
        icon: icon,
        id: id,
        index: index,
        label: label,
        onClick: onClick,
        onContentReady: onContentReady,
        parentPosition: parentPosition,
        position: position,
        visible: visible,
        zIndex: zIndex
    } = action.option();
    return (0, _extend.extend)({}, {
        animation: animation,
        actionComponent: actionComponent,
        actionVisible: actionVisible,
        actions: actions,
        activeStateEnabled: activeStateEnabled,
        direction: direction,
        elementAttr: elementAttr,
        hint: hint,
        hoverStateEnabled: hoverStateEnabled,
        icon: icon,
        id: id,
        index: index,
        label: label,
        onClick: onClick,
        onContentReady: onContentReady,
        parentPosition: parentPosition,
        position: position,
        visible: visible,
        zIndex: zIndex
    }, {
        onInitialized: null,
        onDisposing: null
    })
};
class SpeedDialMainItem extends _speed_dial_item.default {
    _getDefaultOptions() {
        const defaultOptions = {
            icon: "add",
            closeIcon: "close",
            position: {
                at: "right bottom",
                my: "right bottom",
                offset: {
                    x: -16,
                    y: -16
                }
            },
            maxSpeedDialActionCount: 5,
            hint: "",
            label: "",
            direction: "auto",
            actions: [],
            activeStateEnabled: true,
            hoverStateEnabled: true,
            indent: (0, _themes.isCompact)() ? 49 : 55,
            childIndent: 40,
            childOffset: (0, _themes.isCompact)() ? 2 : 9,
            callOverlayRenderShading: true,
            hideOnOutsideClick: true
        };
        return (0, _extend.extend)(super._getDefaultOptions(), (0, _extend.extend)(defaultOptions, (0, _config.default)().floatingActionButtonConfig, {
            shading: false
        }))
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => (0, _themes.isFluent)() && !(0, _themes.isCompact)(),
            options: {
                indent: 60,
                childIndent: 60,
                childOffset: 0
            }
        }, {
            device: () => (0, _themes.isFluent)() && (0, _themes.isCompact)(),
            options: {
                indent: 48,
                childIndent: 48,
                childOffset: 0
            }
        }, {
            device: () => (0, _themes.isMaterial)() && !(0, _themes.isCompact)(),
            options: {
                indent: 72,
                childIndent: 56,
                childOffset: 8
            }
        }, {
            device: () => (0, _themes.isMaterial)() && (0, _themes.isCompact)(),
            options: {
                indent: 58,
                childIndent: 48,
                childOffset: 1
            }
        }])
    }
    _render() {
        this.$element().addClass(FAB_MAIN_CLASS);
        super._render();
        this._moveToContainer();
        this._renderCloseIcon();
        this._renderClick()
    }
    _renderLabel() {
        super._renderLabel();
        this.$element().toggleClass("dx-fa-button-with-label", !!this._$label)
    }
    _renderIcon() {
        super._renderIcon();
        this.$element().toggleClass("dx-fa-button-without-icon", !this.option("icon"))
    }
    _renderCloseIcon() {
        this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent("closeIcon"), FAB_CLOSE_ICON_CLASS);
        this._$closeIcon.addClass("dx-state-invisible")
    }
    _renderClick() {
        this._clickAction = 1 === this._getVisibleActions().length ? this._getActionComponent()._createActionByOption("onClick") : this._createAction(this._clickHandler.bind(this));
        this._setClickAction()
    }
    _getVisibleActions(actions) {
        const currentActions = actions || this.option("actions");
        return currentActions.filter((action => action.option("visible")))
    }
    _getCurrentOptions(actions) {
        const visibleActions = speedDialMainItem._getVisibleActions(actions);
        const defaultOptions = this._getDefaultOptions();
        delete defaultOptions.closeOnOutsideClick;
        return 1 === visibleActions.length ? (0, _extend.extend)(modifyActionOptions(visibleActions[0]), {
            position: this._getPosition()
        }) : (0, _extend.extend)(defaultOptions, {
            visible: 0 !== visibleActions.length
        })
    }
    _clickHandler() {
        const actions = this._actionItems.filter((action => action.option("actionVisible"))).sort(((action, nextAction) => action.option("index") - nextAction.option("index")));
        if (1 === actions.length) {
            return
        }
        const lastActionIndex = actions.length - 1;
        for (let i = 0; i < actions.length; i++) {
            actions[i].option("animation", this._getActionAnimation(actions[i], i, lastActionIndex));
            actions[i].option("position", this._getActionPosition(actions, i));
            actions[i]._$wrapper.css("position", this._$wrapper.css("position"));
            actions[i].toggle()
        }
        if ((0, _config.default)().floatingActionButtonConfig.shading) {
            this._isShadingShown = !this.option("shading");
            this.option("shading", this._isShadingShown)
        }
        this._$icon.toggleClass("dx-state-invisible");
        this._$closeIcon.toggleClass("dx-state-invisible")
    }
    _updateZIndexStackPosition() {
        super._updateZIndexStackPosition();
        const overlayStack = this._overlayStack();
        overlayStack.push(this)
    }
    _renderActions() {
        const actions = this.option("actions");
        if (this._actionItems && this._actionItems.length) {
            this._actionItems.forEach((actionItem => {
                actionItem.dispose();
                actionItem.$element().remove()
            }));
            this._actionItems = []
        }
        this._actionItems = [];
        if (1 === actions.length) {
            return
        }
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            const $actionElement = (0, _renderer.default)("<div>").appendTo(getSwatchContainer(action.$element()));
            _events_engine.default.off($actionElement, "click");
            _events_engine.default.on($actionElement, "click", (() => {
                this._clickHandler()
            }));
            action._options.silent("actionComponent", action);
            action._options.silent("parentPosition", this._getPosition());
            action._options.silent("actionVisible", action._options.silent("visible"));
            this._actionItems.push(this._createComponent($actionElement, _speed_dial_item.default, (0, _extend.extend)({}, modifyActionOptions(action), {
                visible: false
            })))
        }
    }
    _getActionAnimation(action, index, lastActionIndex) {
        action._options.silent("animation.show.delay", 30 * index);
        action._options.silent("animation.hide.delay", 30 * (lastActionIndex - index));
        return action._options.silent("animation")
    }
    _getDirectionIndex(actions, direction) {
        if ("auto" === direction) {
            const contentHeight = (0, _size.getHeight)(this.$content());
            const actionsHeight = this.initialOption("indent") + this.initialOption("childIndent") * actions.length - contentHeight;
            const offsetTop = this.$content().offset().top;
            if (actionsHeight < offsetTop) {
                return -1
            } else {
                const offsetBottom = (0, _size.getHeight)(this._positionController._$wrapperCoveredElement) - contentHeight - offsetTop;
                return offsetTop >= offsetBottom ? -1 : 1
            }
        }
        return "down" !== direction ? -1 : 1
    }
    _getActionPosition(actions, index) {
        const action = actions[index];
        const actionOffsetXValue = this.initialOption("childOffset");
        const actionOffsetX = action._options.silent("label") && !this._$label ? this._isPositionLeft(this._getPosition()) ? actionOffsetXValue : -actionOffsetXValue : 0;
        const actionOffsetYValue = this.initialOption("indent") + this.initialOption("childIndent") * index;
        const actionOffsetY = this._getDirectionIndex(actions, this.option("direction")) * actionOffsetYValue;
        const actionPositionAtMy = action._options.silent("label") ? this._isPositionLeft(this._getPosition()) ? "left" : "right" : "center";
        return {
            of: this.$content(),
            at: actionPositionAtMy,
            my: actionPositionAtMy,
            offset: {
                x: actionOffsetX,
                y: actionOffsetY
            }
        }
    }
    _outsideClickHandler(e) {
        if (this._isShadingShown) {
            const isShadingClick = (0, _renderer.default)(e.target)[0] === this._$wrapper[0];
            if (isShadingClick) {
                e.preventDefault();
                this._clickHandler()
            }
        }
    }
    _setPosition() {
        if (this.option("visible")) {
            this._hide();
            this._show()
        }
    }
    _getPosition() {
        return this._getDefaultOptions().position
    }
    _getInkRippleContainer() {
        return this.$content()
    }
    _optionChanged(args) {
        switch (args.name) {
            case "actions":
                if (this._isVisible()) {
                    this._renderIcon();
                    this._renderLabel()
                }
                this._renderCloseIcon();
                this._renderClick();
                this._renderActions();
                break;
            case "maxSpeedDialActionCount":
                this._renderActions();
                break;
            case "closeIcon":
                this._renderCloseIcon();
                break;
            case "position":
                super._optionChanged(args);
                this._setPosition();
                break;
            case "label":
                if (this._isVisible()) {
                    this._renderLabel()
                }
                this._setPosition();
                break;
            case "icon":
                if (this._isVisible()) {
                    this._renderIcon()
                }
                break;
            default:
                super._optionChanged(args)
        }
    }
}

function initAction(newAction) {
    newAction._options.silent("onInitializing", null);
    let isActionExist = false;
    if (!speedDialMainItem) {
        const $fabMainElement = (0, _renderer.default)("<div>").appendTo(getSwatchContainer(newAction.$element()));
        speedDialMainItem = newAction._createComponent($fabMainElement, SpeedDialMainItem, (0, _extend.extend)({}, modifyActionOptions(newAction), {
            actions: [newAction]
        }))
    } else {
        const savedActions = speedDialMainItem.option("actions");
        savedActions.forEach((action => {
            if (action._options.silent("id") === newAction._options.silent("id")) {
                isActionExist = true;
                return newAction
            }
        }));
        delete speedDialMainItem._options.position;
        if (!isActionExist) {
            if (speedDialMainItem._getVisibleActions(savedActions).length >= speedDialMainItem.option("maxSpeedDialActionCount")) {
                newAction.dispose();
                _ui.default.log("W1014");
                return
            }
            savedActions.push(newAction);
            speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
                actions: savedActions
            }))
        } else if (1 === savedActions.length) {
            speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
                actions: savedActions,
                position: speedDialMainItem._getPosition()
            }))
        } else {
            speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
                actions: savedActions
            }))
        }
    }
}

function disposeAction(actionId) {
    if (!speedDialMainItem) {
        return
    }
    let savedActions = speedDialMainItem.option("actions");
    const savedActionsCount = savedActions.length;
    savedActions = savedActions.filter((action => action._options.silent("id") !== actionId));
    if (savedActionsCount === savedActions.length) {
        return
    }
    if (!savedActions.length) {
        speedDialMainItem.dispose();
        speedDialMainItem.$element().remove();
        speedDialMainItem = null
    } else if (1 === savedActions.length) {
        speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
            actions: savedActions
        }))
    } else {
        speedDialMainItem.option({
            actions: savedActions
        })
    }
}

function repaint() {
    if (!speedDialMainItem) {
        return
    }
    const visibleActions = speedDialMainItem._getVisibleActions();
    const icon = 1 === visibleActions.length ? visibleActions[0].option("icon") : speedDialMainItem._getDefaultOptions().icon;
    const label = 1 === visibleActions.length ? visibleActions[0].option("label") : speedDialMainItem._getDefaultOptions().label;
    speedDialMainItem.option({
        actions: speedDialMainItem.option("actions"),
        icon: icon,
        closeIcon: speedDialMainItem._getDefaultOptions().closeIcon,
        position: speedDialMainItem._getPosition(),
        label: label,
        maxSpeedDialActionCount: speedDialMainItem._getDefaultOptions().maxSpeedDialActionCount,
        direction: speedDialMainItem._getDefaultOptions().direction
    })
}
