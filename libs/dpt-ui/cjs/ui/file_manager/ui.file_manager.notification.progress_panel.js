/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.notification.progress_panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _icon = require("../../core/utils/icon");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _progress_bar = _interopRequireDefault(require("../progress_bar"));
var _button = _interopRequireDefault(require("../button"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const FILE_MANAGER_PROGRESS_PANEL_CLASS = "dx-filemanager-progress-panel";
const FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS = "dx-filemanager-progress-panel-container";
const FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS = "dx-filemanager-progress-panel-title";
const FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS = "dx-filemanager-progress-panel-title-text";
const FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS = "dx-filemanager-progress-panel-close-button";
const FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS = "dx-filemanager-progress-panel-infos-container";
const FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS = "dx-filemanager-progress-panel-separator";
const FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS = "dx-filemanager-progress-panel-info";
const FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS = "dx-filemanager-progress-panel-common";
const FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS = "dx-filemanager-progress-panel-info-with-details";
const FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS = "dx-filemanager-progress-panel-details";
const FILE_MANAGER_PROGRESS_BOX_CLASS = "dx-filemanager-progress-box";
const FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "dx-filemanager-progress-box-error";
const FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS = "dx-filemanager-progress-box-without-close-button";
const FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "dx-filemanager-progress-box-image";
const FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "dx-filemanager-progress-box-wrapper";
const FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "dx-filemanager-progress-box-common";
const FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS = "dx-filemanager-progress-box-progress-bar";
const FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS = "dx-filemanager-progress-box-close-button";
const DX_CARD_CLASS = "dx-card";
class FileManagerProgressPanel extends _ui.default {
    _initMarkup() {
        super._initMarkup();
        this._initActions();
        this._operationCount = 0;
        this.$element().addClass("dx-filemanager-progress-panel");
        const $scrollView = (0, _renderer.default)("<div>").appendTo(this.$element());
        const $container = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-container").appendTo($scrollView);
        this._scrollView = this._createComponent($scrollView, _scroll_view.default, {
            scrollByContent: true,
            scrollByThumb: true,
            showScrollbar: "onScroll"
        });
        const $title = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-title").appendTo($container);
        (0, _renderer.default)("<div>").text(_message.default.format("dxFileManager-notificationProgressPanelTitle")).addClass("dx-filemanager-progress-panel-title-text").appendTo($title);
        const $closeButton = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-close-button").appendTo($title);
        this._createComponent($closeButton, _button.default, {
            icon: "close",
            stylingMode: "text",
            onClick: () => this._raisePanelClosed()
        });
        this._$infosContainer = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-infos-container").appendTo($container);
        this._renderEmptyListText()
    }
    _getDefaultOptions() {
        return (0, _extend.extend)(super._getDefaultOptions(), {
            onOperationClosed: null,
            onOperationCanceled: null,
            onOperationItemCanceled: null,
            onPanelClosed: null
        })
    }
    _initActions() {
        this._actions = {
            onOperationClosed: this._createActionByOption("onOperationClosed"),
            onOperationCanceled: this._createActionByOption("onOperationCanceled"),
            onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled"),
            onPanelClosed: this._createActionByOption("onPanelClosed")
        }
    }
    _optionChanged(args) {
        const name = args.name;
        switch (name) {
            case "test":
                break;
            case "onOperationClosed":
            case "onOperationCanceled":
            case "onOperationItemCanceled":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                super._optionChanged(args)
        }
    }
    addOperation(commonText, showCloseButtonAlways, allowProgressAutoUpdate) {
        if (this._operationCount) {
            (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-separator").prependTo(this._$infosContainer)
        } else {
            this._$infosContainer.empty()
        }
        this._operationCount++;
        const info = {
            customCloseHandling: showCloseButtonAlways,
            allowProgressAutoUpdate: (0, _common.ensureDefined)(allowProgressAutoUpdate, true)
        };
        const $info = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-info").prependTo(this._$infosContainer);
        info.$info = $info;
        const $common = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-common").appendTo($info);
        info.common = this._createProgressBox($common, {
            commonText: commonText,
            showCloseButton: true,
            showCloseButtonAlways: showCloseButtonAlways,
            onCloseButtonClick: () => this._closeOperation(info)
        });
        return info
    }
    addOperationDetails(info, details, showCloseButton) {
        info.$info.addClass("dx-filemanager-progress-panel-info-with-details");
        const $details = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-panel-details").appendTo(info.$info);
        info.details = details.map(((itemInfo, index) => {
            itemInfo.info = info;
            return this._createDetailsItem($details, itemInfo, index, false, showCloseButton)
        }))
    }
    _createDetailsItem($container, item, itemIndex, skipProgressBox, showCloseButton) {
        const $detailsItem = (0, _renderer.default)("<div>").appendTo($container);
        if (-1 !== itemIndex) {
            $detailsItem.addClass("dx-card")
        }
        return this._createProgressBox($detailsItem, {
            commonText: item.commonText,
            imageUrl: item.imageUrl,
            skipProgressBox: skipProgressBox,
            showCloseButton: showCloseButton,
            showCloseButtonAlways: showCloseButton,
            onCloseButtonClick: () => this._cancelOperationItem(item, itemIndex)
        })
    }
    completeOperationItem(operationInfo, itemIndex, commonProgress) {
        if (operationInfo.allowProgressAutoUpdate) {
            this.updateOperationItemProgress(operationInfo, itemIndex, 100, commonProgress)
        }
        this._setCloseButtonVisible(operationInfo.details[itemIndex], false)
    }
    updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
        this.updateOperationCommonProgress(operationInfo, commonProgress);
        if (operationInfo.details) {
            const detailsItem = operationInfo.details[itemIndex];
            detailsItem.progressBar.option("value", itemProgress)
        }
    }
    updateOperationCommonProgress(operationInfo, commonProgress) {
        var _operationInfo$common;
        null === (_operationInfo$common = operationInfo.common.progressBar) || void 0 === _operationInfo$common || _operationInfo$common.option("value", commonProgress)
    }
    completeOperation(info, commonText, isError, statusText) {
        info.completed = true;
        info.common.$commonText.text(commonText);
        if (isError) {
            this._removeProgressBar(info.common)
        } else if (info.allowProgressAutoUpdate) {
            this.updateOperationCommonProgress(info, 100)
        }
        if (statusText) {
            this._setProgressBarText(info.common, statusText)
        }
        this._setCloseButtonVisible(info.common, true)
    }
    completeSingleOperationWithError(info, errorText) {
        var _info$details;
        const detailsItem = null === (_info$details = info.details) || void 0 === _info$details ? void 0 : _info$details[0];
        info.completed = true;
        this._renderOperationError(detailsItem || info.common, errorText);
        this._setCloseButtonVisible(info.common, true);
        if (detailsItem) {
            this._setCloseButtonVisible(detailsItem, false)
        }
    }
    addOperationDetailsError(info, index, errorText) {
        const detailsItem = info.details[index];
        this._renderOperationError(detailsItem, errorText);
        this._setCloseButtonVisible(detailsItem, false)
    }
    _renderError($container, $target, errorText) {
        (0, _renderer.default)("<div>").text(errorText).addClass("dx-filemanager-progress-box-error").appendTo($container)
    }
    _renderEmptyListText() {
        this._$infosContainer.text(_message.default.format("dxFileManager-notificationProgressPanelEmptyListText"))
    }
    _renderOperationError(info, errorText) {
        this._removeProgressBar(info);
        this._renderError(info.$wrapper, info.$commonText, errorText)
    }
    _removeProgressBar(progressBox) {
        if (progressBox.progressBar) {
            progressBox.progressBar.dispose();
            progressBox.progressBar.$element().remove();
            progressBox.progressBar = null
        }
    }
    _createProgressBox($container, options) {
        $container.addClass("dx-filemanager-progress-box");
        if (!options.showCloseButtonAlways) {
            $container.addClass("dx-filemanager-progress-box-without-close-button")
        }
        if (options.imageUrl) {
            (0, _icon.getImageContainer)(options.imageUrl).addClass("dx-filemanager-progress-box-image").appendTo($container)
        }
        const $wrapper = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-box-wrapper").appendTo($container);
        const $commonText = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-box-common").text(options.commonText).appendTo($wrapper);
        let progressBar = null;
        if (!options.skipProgressBox) {
            const $progressBar = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-box-progress-bar").appendTo($wrapper);
            progressBar = this._createComponent($progressBar, _progress_bar.default, {
                min: 0,
                max: 100,
                width: "100%",
                validationMessageMode: "always",
                statusFormat: (ratio, value) => this._getStatusString(ratio, value)
            })
        }
        let closeButton = null;
        if (options.showCloseButton) {
            const $button = (0, _renderer.default)("<div>").addClass("dx-filemanager-progress-box-close-button").appendTo($container);
            closeButton = this._createComponent($button, _button.default, {
                icon: "dx-filemanager-i dx-filemanager-i-cancel",
                stylingMode: "text",
                visible: options.showCloseButtonAlways,
                onClick: options.onCloseButtonClick
            })
        }
        return {
            $commonText: $commonText,
            progressBar: progressBar,
            $element: $container,
            $wrapper: $wrapper,
            closeButton: closeButton
        }
    }
    _setCloseButtonVisible(progressBox, visible) {
        if (progressBox.closeButton) {
            progressBox.$element.toggleClass("dx-filemanager-progress-box-without-close-button", !visible);
            progressBox.closeButton.option("visible", visible)
        }
    }
    _setProgressBarText(progressBox, text) {
        progressBox.progressBar.option("statusFormat", (() => text))
    }
    _closeOperation(info) {
        if (info.customCloseHandling && !info.completed) {
            this._raiseOperationCanceled(info);
            this._setCloseButtonVisible(info.common, false);
            info.details.forEach((item => this._displayClosedOperationItem(item)))
        } else {
            this._raiseOperationClosed(info);
            info.$info.next(".dx-filemanager-progress-panel-separator").remove();
            info.$info.remove();
            this._operationCount--;
            if (!this._operationCount) {
                this._renderEmptyListText()
            }
        }
    }
    _cancelOperationItem(item, itemIndex) {
        this._raiseOperationItemCanceled(item, itemIndex);
        const itemInfo = item.info.details[itemIndex];
        this._displayClosedOperationItem(itemInfo)
    }
    _displayClosedOperationItem(itemInfo) {
        this._setProgressBarText(itemInfo, _message.default.format("dxFileManager-notificationProgressPanelOperationCanceled"));
        this._setCloseButtonVisible(itemInfo, false)
    }
    _getStatusString(ratio, value) {
        return 1 === ratio ? _message.default.format("Done") : Math.round(100 * ratio) + "%"
    }
    _raiseOperationClosed(info) {
        this._actions.onOperationClosed({
            info: info
        })
    }
    _raiseOperationCanceled(info) {
        this._actions.onOperationCanceled({
            info: info
        })
    }
    _raiseOperationItemCanceled(item, itemIndex) {
        this._actions.onOperationItemCanceled({
            item: item,
            itemIndex: itemIndex
        })
    }
    _raisePanelClosed() {
        this._actions.onPanelClosed()
    }
}
var _default = exports.default = FileManagerProgressPanel;
module.exports = exports.default;
module.exports.default = exports.default;
