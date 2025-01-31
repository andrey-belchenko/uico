/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.notification.js)
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
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _ui2 = _interopRequireDefault(require("../popup/ui.popup"));
var _drawer = _interopRequireDefault(require("../drawer"));
var _uiFile_manager = require("./ui.file_manager.notification_manager");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const window = (0, _window.getWindow)();
const ADAPTIVE_STATE_SCREEN_WIDTH = 1e3;
const FILE_MANAGER_NOTIFICATION_CLASS = "dx-filemanager-notification";
const FILE_MANAGER_NOTIFICATION_DRAWER_CLASS = "dx-filemanager-notification-drawer";
const FILE_MANAGER_NOTIFICATION_DRAWER_PANEL_CLASS = "dx-filemanager-notification-drawer-panel";
const FILE_MANAGER_NOTIFICATION_POPUP_CLASS = "dx-filemanager-notification-popup";
const FILE_MANAGER_NOTIFICATION_POPUP_ERROR_CLASS = "dx-filemanager-notification-popup-error";
const FILE_MANAGER_NOTIFICATION_COMMON_CLASS = "dx-filemanager-notification-common";
const FILE_MANAGER_NOTIFICATION_SEPARATOR_CLASS = "dx-filemanager-notification-separator";
const FILE_MANAGER_NOTIFICATION_DETAILS_CLASS = "dx-filemanager-notification-details";
const FILE_MANAGER_NOTIFICATION_COMMON_NO_ITEM_CLASS = "dx-filemanager-notification-common-no-item";
class FileManagerNotificationControl extends _ui.default {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._isInAdaptiveState = this._isSmallScreen();
        this._managerMap = {};
        this._notificationManagerStubId = null;
        this._setNotificationManager();
        const $progressPanelContainer = this.option("progressPanelContainer");
        const $progressDrawer = (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-drawer").appendTo($progressPanelContainer);
        (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-drawer-panel").appendTo($progressDrawer);
        const drawerOptions = (0, _extend.extend)({
            opened: false,
            position: "right",
            template: container => this._ensureProgressPanelCreated(container)
        }, this._getProgressDrawerAdaptiveOptions());
        this._progressDrawer = this._createComponent($progressDrawer, _drawer.default, drawerOptions);
        const $drawerContent = $progressDrawer.find(".dx-filemanager-notification-drawer-panel").first();
        const contentRenderer = this.option("contentTemplate");
        if ((0, _type.isFunction)(contentRenderer)) {
            contentRenderer($drawerContent, this)
        }
    }
    _setNotificationManager(options) {
        options = (0, _extend.extend)({
            onActionProgressStatusChanged: this._raiseActionProgress.bind(this)
        }, options);
        if (!this._notificationManagerStubId) {
            const stubManager = new _uiFile_manager.NotificationManagerStub(options);
            this._notificationManagerStubId = stubManager.getId();
            this._managerMap[this._notificationManagerStubId] = stubManager
        }
        if (!this._isProgressDrawerDisabled()) {
            const notificationManagerComponent = this._getProgressManagerComponent();
            options.isActual = true;
            const defaultManager = new notificationManagerComponent(options);
            this._managerMap[defaultManager.getId()] = defaultManager
        }
    }
    _getNotificationManager(operationInfo) {
        const actualManagerId = (null === operationInfo || void 0 === operationInfo ? void 0 : operationInfo[_uiFile_manager.MANAGER_ID_NAME]) || this._getActualNotificationManagerId();
        return this._managerMap[actualManagerId] || this._managerMap[this._notificationManagerStubId]
    }
    _clearManagerMap() {
        const stubManager = this._managerMap[this._notificationManagerStubId];
        delete this._managerMap;
        this._managerMap = {
            [this._notificationManagerStubId]: stubManager
        }
    }
    _getActualNotificationManagerId() {
        return Object.keys(this._managerMap).filter((managerId => this._managerMap[managerId].isActual()))[0]
    }
    tryShowProgressPanel() {
        const promise = new _deferred.Deferred;
        const notificationManager = this._getNotificationManager();
        if (notificationManager.isActionProgressStatusDefault() || this._isProgressDrawerOpened() || this._isProgressDrawerDisabled()) {
            return promise.resolve().promise()
        }
        setTimeout((() => {
            this._progressDrawer.show().done(promise.resolve);
            this._hidePopup();
            notificationManager.tryHideActionProgress()
        }));
        return promise.promise()
    }
    addOperation(processingMessage, allowCancel, allowProgressAutoUpdate) {
        const notificationManager = this._getNotificationManager();
        return notificationManager.addOperation(processingMessage, allowCancel, allowProgressAutoUpdate)
    }
    addOperationDetails(operationInfo, details, showCloseButton) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.addOperationDetails(operationInfo, details, showCloseButton)
    }
    updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress)
    }
    completeOperationItem(operationInfo, itemIndex, commonProgress) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.completeOperationItem(operationInfo, itemIndex, commonProgress)
    }
    finishOperation(operationInfo, commonProgress) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.finishOperation(operationInfo, commonProgress)
    }
    completeOperation(operationInfo, commonText, isError, statusText) {
        const notificationManager = this._getNotificationManager(operationInfo);
        if (!isError) {
            this._showPopup(commonText)
        }
        notificationManager.completeOperation(operationInfo, commonText, isError, statusText);
        if (!this._isProgressDrawerOpened() || !notificationManager.hasNoOperations()) {
            notificationManager.updateActionProgressStatus(operationInfo)
        } else {
            notificationManager.tryHideActionProgress()
        }
    }
    completeSingleOperationWithError(operationInfo, errorInfo) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.completeSingleOperationWithError(operationInfo, errorInfo);
        this._showPopupError(errorInfo)
    }
    addOperationDetailsError(operationInfo, errorInfo) {
        const notificationManager = this._getNotificationManager(operationInfo);
        notificationManager.addOperationDetailsError(operationInfo, errorInfo);
        this._showPopupError(errorInfo)
    }
    _hideProgressPanel() {
        setTimeout((() => this._progressDrawer.hide()))
    }
    _isSmallScreen() {
        if (!(0, _window.hasWindow)()) {
            return false
        }
        return (0, _size.getWidth)(window) <= 1e3
    }
    _dimensionChanged(dimension) {
        if (!(dimension && "height" === dimension)) {
            this._checkAdaptiveState()
        }
    }
    _checkAdaptiveState() {
        const oldState = this._isInAdaptiveState;
        this._isInAdaptiveState = this._isSmallScreen();
        if (oldState !== this._isInAdaptiveState && this._progressDrawer) {
            const notificationManager = this._getNotificationManager();
            if (notificationManager.handleDimensionChanged()) {
                const options = this._getProgressDrawerAdaptiveOptions();
                this._progressDrawer.option(options)
            }
        }
    }
    _getProgressDrawerAdaptiveOptions() {
        if (this._isInAdaptiveState) {
            return {
                openedStateMode: "overlap",
                shading: true,
                hideOnOutsideClick: true
            }
        } else {
            return {
                openedStateMode: "shrink",
                shading: false,
                hideOnOutsideClick: false
            }
        }
    }
    _ensureProgressPanelCreated(container) {
        const notificationManager = this._getNotificationManager();
        notificationManager.ensureProgressPanelCreated(container, {
            onOperationCanceled: _ref => {
                let {
                    info: info
                } = _ref;
                return this._raiseOperationCanceled(info)
            },
            onOperationItemCanceled: _ref2 => {
                let {
                    item: item,
                    itemIndex: itemIndex
                } = _ref2;
                return this._raiseOperationItemCanceled(item, itemIndex)
            },
            onPanelClosed: () => this._hideProgressPanel()
        })
    }
    _getProgressManagerComponent() {
        return _uiFile_manager.NotificationManager
    }
    _isProgressDrawerDisabled() {
        return !this.option("showProgressPanel")
    }
    _isProgressDrawerOpened() {
        return this._progressDrawer.option("opened")
    }
    _hidePopup(forceHide) {
        if (!this.option("showNotificationPopup") && !forceHide) {
            return
        }
        this._getNotificationPopup().hide()
    }
    _showPopup(content, errorMode) {
        if (this._isProgressDrawerOpened() || !this.option("showNotificationPopup")) {
            return
        }
        this._getNotificationPopup().$wrapper().toggleClass("dx-filemanager-notification-popup-error", !!errorMode);
        this._getNotificationPopup().option("contentTemplate", content);
        if (!this._getNotificationPopup().option("visible")) {
            this._getNotificationPopup().show()
        }
    }
    _showPopupError(errorInfo) {
        if (!this.option("showNotificationPopup")) {
            return
        }
        const notificationManager = this._getNotificationManager();
        const $content = (0, _renderer.default)("<div>");
        const $message = (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-common").text(errorInfo.commonErrorText);
        const $separator = (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-separator");
        (0, _renderer.default)("<div>").appendTo($separator);
        const $details = (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-details");
        if (errorInfo.item) {
            notificationManager.createErrorDetailsProgressBox($details, errorInfo.item, errorInfo.detailErrorText)
        } else {
            $message.addClass("dx-filemanager-notification-common-no-item");
            notificationManager.renderError($details, errorInfo.detailErrorText)
        }
        $content.append($message, $separator, $details);
        this._showPopup($content, true)
    }
    _getNotificationPopup() {
        if (!this._notificationPopup) {
            const $popup = (0, _renderer.default)("<div>").appendTo(this.$element());
            this._notificationPopup = this._createComponent($popup, _ui2.default, {
                container: this.$element(),
                width: "auto",
                height: "auto",
                showTitle: false,
                dragEnabled: false,
                shading: false,
                visible: false,
                hideOnOutsideClick: true,
                animation: {
                    duration: 0
                },
                position: {
                    my: "right top",
                    at: "right top",
                    of: this.option("positionTarget"),
                    offset: "-10 -5"
                },
                _wrapperClassExternal: "dx-filemanager-notification-popup"
            })
        }
        return this._notificationPopup
    }
    _raiseActionProgress(message, status) {
        this._actions.onActionProgress({
            message: message,
            status: status
        })
    }
    _raiseOperationCanceled(info) {
        this._actions.onOperationCanceled({
            info: info
        })
    }
    _raiseOperationItemCanceled(item, index) {
        this._actions.onOperationItemCanceled({
            item: item,
            itemIndex: index
        })
    }
    _initActions() {
        this._actions = {
            onActionProgress: this._createActionByOption("onActionProgress"),
            onOperationCanceled: this._createActionByOption("onOperationCanceled"),
            onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled")
        }
    }
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            progressPanelContainer: null,
            contentTemplate: null,
            onActionProgress: null,
            onOperationCanceled: null,
            onOperationItemCanceled: null,
            showProgressPanel: true,
            showNotificationPopup: true
        })
    }
    _optionChanged(args) {
        const name = args.name;
        switch (name) {
            case "progressPanelContainer":
            case "contentTemplate":
                break;
            case "showProgressPanel":
                this._setNotificationManager();
                this._getNotificationManager().updateActionProgressStatus();
                if (!args.value) {
                    this._hideProgressPanel();
                    this._clearManagerMap()
                }
                this._progressDrawer.repaint();
                break;
            case "showNotificationPopup":
                if (!args.value) {
                    this._hidePopup(true)
                }
                break;
            case "onActionProgress":
            case "onOperationCanceled":
            case "onOperationItemCanceled":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
}
exports.default = FileManagerNotificationControl;
module.exports = exports.default;
module.exports.default = exports.default;
