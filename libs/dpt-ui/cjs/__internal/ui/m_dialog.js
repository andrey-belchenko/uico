/**
 * DevExtreme (cjs/__internal/ui/m_dialog.js)
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
exports.custom = exports.confirm = exports.alert = void 0;
var _action = _interopRequireDefault(require("../../core/action"));
var _config = _interopRequireDefault(require("../../core/config"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _dom = require("../../core/utils/dom");
var _extend = require("../../core/utils/extend");
var _size = require("../../core/utils/size");
var _type = require("../../core/utils/type");
var _view_port = require("../../core/utils/view_port");
var _window = require("../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../../ui/popup/ui.popup"));
var _themes = require("../../ui/themes");
var _ui2 = _interopRequireDefault(require("../../ui/widget/ui.errors"));

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
const window = (0, _window.getWindow)();
const DEFAULT_BUTTON = {
    text: "OK",
    onClick: () => true
};
const DX_DIALOG_CLASSNAME = "dx-dialog";
const DX_DIALOG_WRAPPER_CLASSNAME = "dx-dialog-wrapper";
const DX_DIALOG_ROOT_CLASSNAME = "dx-dialog-root";
const DX_DIALOG_CONTENT_CLASSNAME = "dx-dialog-content";
const DX_DIALOG_MESSAGE_CLASSNAME = "dx-dialog-message";
const DX_DIALOG_BUTTONS_CLASSNAME = "dx-dialog-buttons";
const DX_DIALOG_BUTTON_CLASSNAME = "dx-dialog-button";
const DX_BUTTON_CLASSNAME = "dx-button";
const getApplyButtonConfig = () => {
    if ((0, _themes.isFluent)()) {
        return {
            stylingMode: "contained",
            type: "default"
        }
    }
    return {}
};
const getCancelButtonConfig = () => {
    if ((0, _themes.isFluent)()) {
        return {
            stylingMode: "outlined",
            type: "default"
        }
    }
    return {}
};
const custom = function(options) {
    const deferred = (0, _deferred.Deferred)();
    options = options || {};
    const $element = (0, _renderer.default)("<div>").addClass("dx-dialog").appendTo((0, _view_port.value)());
    const isMessageDefined = "message" in options;
    const isMessageHtmlDefined = "messageHtml" in options;
    if (isMessageDefined) {
        _ui2.default.log("W1013")
    }
    const messageHtml = String(isMessageHtmlDefined ? options.messageHtml : options.message);
    const messageId = options.title ? null : new _guid.default;
    const $message = (0, _renderer.default)("<div>").addClass("dx-dialog-message").html(messageHtml).attr("id", messageId);
    const popupToolbarItems = [];
    const popupInstance = new _ui.default($element, (0, _extend.extend)({
        title: options.title ?? "",
        showTitle: (0, _common.ensureDefined)(options.showTitle, true),
        dragEnabled: (0, _common.ensureDefined)(options.dragEnabled, true),
        height: "auto",
        width: options.width,
        showCloseButton: options.showCloseButton || false,
        ignoreChildEvents: false,
        container: $element,
        visualContainer: window,
        dragAndResizeArea: window,
        onContentReady(args) {
            args.component.$content().addClass("dx-dialog-content").append($message);
            if (messageId) {
                args.component.$overlayContent().attr("aria-labelledby", messageId)
            }
        },
        onShowing(e) {
            e.component.bottomToolbar().addClass("dx-dialog-buttons").find(".dx-button").addClass("dx-dialog-button");
            (0, _dom.resetActiveElement)()
        },
        onShown(e) {
            const $firstButton = e.component.bottomToolbar().find(".dx-button").first();
            _events_engine.default.trigger($firstButton, "focus")
        },
        onHiding() {
            deferred.reject()
        },
        onHidden(_ref) {
            let {
                element: element
            } = _ref;
            (0, _renderer.default)(element).remove()
        },
        animation: {
            show: {
                type: "pop",
                duration: 400
            },
            hide: {
                type: "pop",
                duration: 400,
                to: {
                    opacity: 0,
                    scale: 0
                },
                from: {
                    opacity: 1,
                    scale: 1
                }
            }
        },
        rtlEnabled: (0, _config.default)().rtlEnabled,
        position: {
            boundaryOffset: {
                h: 10,
                v: 0
            }
        }
    }, options.popupOptions));
    const buttonOptions = options.buttons || [DEFAULT_BUTTON];
    buttonOptions.forEach((options => {
        const action = new _action.default(options.onClick, {
            context: popupInstance
        });
        popupToolbarItems.push({
            toolbar: "bottom",
            location: _devices.default.current().android ? "after" : "center",
            widget: "dxButton",
            options: _extends({}, options, {
                onClick() {
                    const result = action.execute(...arguments);
                    hide(result)
                }
            })
        })
    }));
    popupInstance.option("toolbarItems", popupToolbarItems);
    popupInstance.$wrapper().addClass("dx-dialog-wrapper");
    if (options.position) {
        popupInstance.option("position", options.position)
    }
    popupInstance.$wrapper().addClass("dx-dialog-root");

    function hide(value) {
        deferred.resolve(value);
        popupInstance.hide()
    }
    return {
        show: function() {
            if ("phone" === _devices.default.real().deviceType) {
                const isPortrait = (0, _size.getHeight)(window) > (0, _size.getWidth)(window);
                const width = isPortrait ? "90%" : "60%";
                popupInstance.option({
                    width: width
                })
            }
            popupInstance.show();
            return deferred.promise()
        },
        hide: hide
    }
};
exports.custom = custom;
const alert = function(messageHtml) {
    let title = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    let showTitle = arguments.length > 2 ? arguments[2] : void 0;
    const options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
        title: title,
        messageHtml: messageHtml,
        showTitle: showTitle,
        buttons: [_extends({}, DEFAULT_BUTTON, getApplyButtonConfig())],
        dragEnabled: showTitle
    };
    return custom(options).show()
};
exports.alert = alert;
const confirm = function(messageHtml) {
    let title = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    let showTitle = arguments.length > 2 ? arguments[2] : void 0;
    const options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
        title: title,
        messageHtml: messageHtml,
        showTitle: showTitle,
        buttons: [_extends({
            text: _message.default.format("Yes"),
            onClick: () => true
        }, getApplyButtonConfig()), _extends({
            text: _message.default.format("No"),
            onClick: () => false
        }, getCancelButtonConfig())],
        dragEnabled: showTitle
    };
    return custom(options).show()
};
exports.confirm = confirm;
