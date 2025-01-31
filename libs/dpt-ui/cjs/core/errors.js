/**
 * DevExtreme (cjs/core/errors.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _error = _interopRequireDefault(require("./utils/error"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _default = exports.default = (0, _error.default)({
    E0001: "Method is not implemented",
    E0002: "Member name collision: {0}",
    E0003: "A class must be instantiated using the 'new' keyword",
    E0004: "The NAME property of the component is not specified",
    E0005: "Unknown device",
    E0006: "Unknown endpoint key is requested",
    E0007: "'Invalidate' method is called outside the update transaction",
    E0008: "Type of the option name is not appropriate to create an action",
    E0009: "Component '{0}' has not been initialized for an element",
    E0010: "Animation configuration with the '{0}' type requires '{1}' configuration as {2}",
    E0011: "Unknown animation type '{0}'",
    E0012: "jQuery version is too old. Please upgrade jQuery to 1.10.0 or later",
    E0013: "KnockoutJS version is too old. Please upgrade KnockoutJS to 2.3.0 or later",
    E0014: "The 'release' method shouldn't be called for an unlocked Lock object",
    E0015: "Queued task returned an unexpected result",
    E0017: "Event namespace is not defined",
    E0018: "DevExpress.ui.DevExpressPopup widget is required",
    E0020: "Template engine '{0}' is not supported",
    E0021: "Unknown theme is set: {0}",
    E0022: "LINK[rel=DevExpress-theme] tags must go before DevExpress included scripts",
    E0023: "Template name is not specified",
    E0024: "DevExtreme bundle already included",
    E0025: "Unexpected argument type",
    E0100: "Unknown validation type is detected",
    E0101: "Misconfigured range validation rule is detected",
    E0102: "Misconfigured comparison validation rule is detected",
    E0103: "validationCallback of an asynchronous rule should return a jQuery or a native promise",
    E0110: "Unknown validation group is detected",
    E0120: "Adapter for a DevExpressValidator component cannot be configured",
    E0121: "The 'customItem' parameter of the 'onCustomItemCreating' function is empty or contains invalid data. Assign a custom object or a Promise that is resolved after the item is created.",
    W0000: "'{0}' is deprecated in {1}. {2}",
    W0001: "{0} - '{1}' option is deprecated in {2}. {3}",
    W0002: "{0} - '{1}' method is deprecated in {2}. {3}",
    W0003: "{0} - '{1}' property is deprecated in {2}. {3}",
    W0004: "Timeout for theme loading is over: {0}",
    W0005: "'{0}' event is deprecated in {1}. {2}",
    W0006: "Invalid recurrence rule: '{0}'",
    W0007: "'{0}' Globalize culture is not defined",
    W0008: "Invalid view name: '{0}'",
    W0009: "Invalid time zone name: '{0}'",
    W0010: "{0} is deprecated in {1}. {2}",
    W0011: "Number parsing is invoked while the parser is not defined",
    W0012: "Date parsing is invoked while the parser is not defined",
    W0013: "'{0}' file is deprecated in {1}. {2}",
    W0014: "{0} - '{1}' type is deprecated in {2}. {3}",
    W0015: "Instead of returning a value from the '{0}' function, write it into the '{1}' field of the function's parameter.",
    W0016: 'The "{0}" option does not accept the "{1}" value since v{2}. {3}.',
    W0017: 'Setting the "{0}" property with a function is deprecated since v21.2',
    W0018: 'Setting the "position" property with a function is deprecated since v21.2',
    W0019: "DevExtreme: Unable to Locate a Valid License Key.\n\nIf you are using a 30-day trial version of DevExtreme, you must uninstall all copies of DevExtreme once your 30-day trial period expires. For terms and conditions that govern use of DevExtreme UI components/libraries, please refer to the DevExtreme End User License Agreement: https://js.dpt-ext-ui.com/EULAs/DevExtremeComplete.\n\nTo use DevExtreme in a commercial project, you must purchase a license. For pricing/licensing options, please visit: https://js.dpt-ext-ui.com/Buy.\n\nIf you have licensing-related questions or need help with a purchase, please email clientservices@dpt-ext-ui.com.\n\n",
    W0020: "DevExtreme: License Key Has Expired.\n\nA mismatch exists between the license key used and the DevExtreme version referenced in this project.\n\nTo proceed, you can:\n\u2022 use a version of DevExtreme linked to your license key: https://www.dpt-ext-ui.com/ClientCenter/DownloadManager\n\u2022 renew your DevExpress Subscription: https://www.dpt-ext-ui.com/buy/renew (once you renew your subscription, you will be entitled to product updates and support service as defined in the DevExtreme End User License Agreement)\n\nIf you have licensing-related questions or need help with a renewal, please email clientservices@dpt-ext-ui.com.\n\n",
    W0021: "DevExtreme: License Key Verification Has Failed.\n\nTo verify your DevExtreme license, make certain to specify a correct key in the GlobalConfig. If you continue to encounter this error, please visit https://www.dpt-ext-ui.com/ClientCenter/DownloadManager to obtain a valid license key.\n\nIf you have a valid license and this problem persists, please submit a support ticket via the DevExpress Support Center. We will be happy to follow-up: https://supportcenter.dpt-ext-ui.com/ticket/create.\n\n",
    W0022: "DevExtreme: Pre-release software. Not suitable for commercial use.\n\nPre-release software may contain deficiencies and as such, should not be considered for use or integrated in any mission critical application.\n\n",
    W0023: "DevExtreme: the following 'dpt-ui' package version does not match versions of other DevExpress products used in this application:\n\n{0}\n\nInteroperability between different versions of the products listed herein cannot be guaranteed.\n\n"
});
module.exports = exports.default;
module.exports.default = exports.default;
