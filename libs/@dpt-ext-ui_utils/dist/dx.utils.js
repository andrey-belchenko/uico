/*!
 * DevExpress Utils (dx.utils)
 * Version: 1.4.3
 * Build date: Wed Apr 03 2024
 * 
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExpress licensing here: https://www.dpt-ext-ui.com/Support/EULAs
 */
var DevExpress = typeof DevExpress === "object" ? DevExpress : {}; DevExpress["WebUtils"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
var Browser = (function () {
    function Browser() {
    }
    Browser.IdentUserAgent = function (userAgent, ignoreDocumentMode) {
        if (ignoreDocumentMode === void 0) { ignoreDocumentMode = false; }
        var browserTypesOrderedList = ['Mozilla', 'IE', 'Firefox', 'Netscape', 'Safari', 'Chrome', 'Opera', 'Opera10', 'Edge'];
        var defaultBrowserType = 'IE';
        var defaultPlatform = 'Win';
        var defaultVersions = { Safari: 2, Chrome: 0.1, Mozilla: 1.9, Netscape: 8, Firefox: 2, Opera: 9, IE: 6, Edge: 12 };
        if (!userAgent || userAgent.length === 0) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
            return;
        }
        userAgent = userAgent.toLowerCase();
        Browser.indentPlatformMajorVersion(userAgent);
        try {
            var platformIdentStrings = {
                'Windows': 'Win',
                'Macintosh': 'Mac',
                'Mac OS': 'Mac',
                'Mac_PowerPC': 'Mac',
                'cpu os': 'MacMobile',
                'cpu iphone os': 'MacMobile',
                'Android': 'Android',
                '!Windows Phone': 'WinPhone',
                '!WPDesktop': 'WinPhone',
                '!ZuneWP': 'WinPhone'
            };
            var optSlashOrSpace = '(?:/|\\s*)?';
            var versionString = '(\\d+)(?:\\.((?:\\d+?[1-9])|\\d)0*?)?';
            var optVersion = '(?:' + versionString + ')?';
            var patterns = {
                Safari: 'applewebkit(?:.*?(?:version/' + versionString + '[\\.\\w\\d]*?(?:\\s+mobile/\\S*)?\\s+safari))?',
                Chrome: '(?:chrome|crios)(?!frame)' + optSlashOrSpace + optVersion,
                Mozilla: 'mozilla(?:.*rv:' + optVersion + '.*Gecko)?',
                Netscape: '(?:netscape|navigator)\\d*/?\\s*' + optVersion,
                Firefox: 'firefox' + optSlashOrSpace + optVersion,
                Opera: '(?:opera|\\sopr)' + optSlashOrSpace + optVersion,
                Opera10: 'opera.*\\s*version' + optSlashOrSpace + optVersion,
                IE: 'msie\\s*' + optVersion,
                Edge: 'edge' + optSlashOrSpace + optVersion
            };
            var browserType = null;
            var version = -1;
            for (var i = 0; i < browserTypesOrderedList.length; i++) {
                var browserTypeCandidate = browserTypesOrderedList[i];
                var regExp = new RegExp(patterns[browserTypeCandidate], 'i');
                var matches = regExp.exec(userAgent);
                if (matches && matches.index >= 0) {
                    if (browserType === 'IE' && version >= 11 && browserTypeCandidate === 'Safari')
                        continue;
                    browserType = browserTypeCandidate;
                    if (browserType === 'Opera10')
                        browserType = 'Opera';
                    var tridentPattern = 'trident' + optSlashOrSpace + optVersion;
                    version = Browser.GetBrowserVersion(userAgent, matches, tridentPattern, Browser.getIECompatibleVersionString());
                    if (browserType === 'Mozilla' && version >= 11)
                        browserType = 'IE';
                }
            }
            if (!browserType)
                browserType = defaultBrowserType;
            var browserVersionDetected = version !== -1;
            if (!browserVersionDetected)
                version = defaultVersions[browserType];
            var platform = null;
            var minOccurenceIndex = Number.MAX_VALUE;
            for (var identStr in platformIdentStrings) {
                if (!Object.prototype.hasOwnProperty.call(platformIdentStrings, identStr))
                    continue;
                var importantIdent = identStr.substr(0, 1) === '!';
                var occurenceIndex = userAgent.indexOf((importantIdent ? identStr.substr(1) : identStr).toLowerCase());
                if (occurenceIndex >= 0 && (occurenceIndex < minOccurenceIndex || importantIdent)) {
                    minOccurenceIndex = importantIdent ? 0 : occurenceIndex;
                    platform = platformIdentStrings[identStr];
                }
            }
            var samsungPattern = 'SM-[A-Z]';
            var m = userAgent.toUpperCase().match(samsungPattern);
            var isSamsungAndroidDevice = m && m.length > 0;
            if (platform === 'WinPhone' && version < 9)
                version = Math.floor(Browser.getVersionFromTrident(userAgent, 'trident' + optSlashOrSpace + optVersion));
            if (!ignoreDocumentMode && browserType === 'IE' && version > 7 && document.documentMode < version)
                version = document.documentMode;
            if (platform === 'WinPhone')
                version = Math.max(9, version);
            if (!platform)
                platform = defaultPlatform;
            if (platform === platformIdentStrings['cpu os'] && !browserVersionDetected)
                version = 4;
            Browser.fillUserAgentInfo(browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice);
        }
        catch (e) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
        }
    };
    Browser.GetBrowserVersion = function (userAgent, matches, tridentPattern, ieCompatibleVersionString) {
        var version = Browser.getVersionFromMatches(matches);
        if (ieCompatibleVersionString) {
            var versionFromTrident = Browser.getVersionFromTrident(userAgent, tridentPattern);
            if (ieCompatibleVersionString === 'edge' || parseInt(ieCompatibleVersionString) === versionFromTrident)
                return versionFromTrident;
        }
        return version;
    };
    Browser.getIECompatibleVersionString = function () {
        if (document.compatible) {
            for (var i = 0; i < document.compatible.length; i++) {
                if (document.compatible[i].userAgent === 'IE' && document.compatible[i].version)
                    return document.compatible[i].version.toLowerCase();
            }
        }
        return '';
    };
    Browser.isTouchEnabled = function () {
        return Browser.hasTouchStart() || Browser.hasMaxTouchPoints() || Browser.hasMsMaxTouchPoints();
    };
    Browser.hasTouchStart = function () {
        return ('ontouchstart' in window);
    };
    Browser.hasMaxTouchPoints = function () {
        return navigator['maxTouchPoints'] > 0;
    };
    Browser.hasMsMaxTouchPoints = function () {
        return navigator['msMaxTouchPoints'] > 0;
    };
    Browser.hasNavigator = function () {
        return typeof navigator !== 'undefined';
    };
    Browser.fillUserAgentInfo = function (browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice) {
        if (isSamsungAndroidDevice === void 0) { isSamsungAndroidDevice = false; }
        for (var i = 0; i < browserTypesOrderedList.length; i++) {
            var type = browserTypesOrderedList[i];
            Browser[type] = type === browserType;
        }
        Browser.Version = Math.floor(10.0 * version) / 10.0;
        Browser.MajorVersion = Math.floor(Browser.Version);
        Browser.WindowsPlatform = platform === 'Win' || platform === 'WinPhone';
        Browser.MacOSMobilePlatform = platform === 'MacMobile' || (platform === 'Mac' && Browser.isTouchEnabled());
        Browser.MacOSPlatform = platform === 'Mac' && !Browser.MacOSMobilePlatform;
        Browser.AndroidMobilePlatform = platform === 'Android';
        Browser.WindowsPhonePlatform = platform === 'WinPhone';
        Browser.WebKitFamily = Browser.Safari || Browser.Chrome || Browser.Opera && Browser.MajorVersion >= 15;
        Browser.NetscapeFamily = Browser.Netscape || Browser.Mozilla || Browser.Firefox;
        Browser.WebKitTouchUI = Browser.MacOSMobilePlatform || Browser.AndroidMobilePlatform;
        var isIETouchUI = Browser.IE && Browser.MajorVersion > 9 && Browser.WindowsPlatform && Browser.UserAgent.toLowerCase().indexOf('touch') >= 0;
        Browser.MSTouchUI = isIETouchUI || (Browser.Edge && !!window.navigator.maxTouchPoints);
        Browser.TouchUI = Browser.WebKitTouchUI || Browser.MSTouchUI;
        Browser.MobileUI = Browser.WebKitTouchUI || Browser.WindowsPhonePlatform;
        Browser.AndroidDefaultBrowser = Browser.AndroidMobilePlatform && !Browser.Chrome;
        Browser.AndroidChromeBrowser = Browser.AndroidMobilePlatform && Browser.Chrome;
        if (isSamsungAndroidDevice)
            Browser.SamsungAndroidDevice = isSamsungAndroidDevice;
        if (Browser.MSTouchUI) {
            var isARMArchitecture = Browser.UserAgent.toLowerCase().indexOf('arm;') > -1;
            Browser.VirtualKeyboardSupported = isARMArchitecture || Browser.WindowsPhonePlatform;
        }
        else
            Browser.VirtualKeyboardSupported = Browser.WebKitTouchUI;
        Browser.fillDocumentElementBrowserTypeClassNames(browserTypesOrderedList);
    };
    Browser.indentPlatformMajorVersion = function (userAgent) {
        var regex = /(?:(?:windows nt|macintosh|mac os|cpu os|cpu iphone os|android|windows phone|linux) )(\d+)(?:[-0-9_.])*/;
        var matches = regex.exec(userAgent);
        if (matches)
            Browser.PlaformMajorVersion = matches[1];
    };
    Browser.getVersionFromMatches = function (matches) {
        var result = -1;
        var versionStr = '';
        if (matches) {
            if (matches[1]) {
                versionStr += matches[1];
                if (matches[2])
                    versionStr += '.' + matches[2];
            }
            if (versionStr !== '') {
                result = parseFloat(versionStr);
                if (isNaN(result))
                    result = -1;
            }
        }
        return result;
    };
    Browser.getVersionFromTrident = function (userAgent, tridentPattern) {
        var tridentDiffFromVersion = 4;
        var matches = new RegExp(tridentPattern, 'i').exec(userAgent);
        return Browser.getVersionFromMatches(matches) + tridentDiffFromVersion;
    };
    Browser.fillDocumentElementBrowserTypeClassNames = function (browserTypesOrderedList) {
        var documentElementClassName = '';
        var browserTypeslist = browserTypesOrderedList.concat(['WindowsPlatform', 'MacOSPlatform', 'MacOSMobilePlatform', 'AndroidMobilePlatform',
            'WindowsPhonePlatform', 'WebKitFamily', 'WebKitTouchUI', 'MSTouchUI', 'TouchUI', 'AndroidDefaultBrowser']);
        for (var i = 0; i < browserTypeslist.length; i++) {
            var type = browserTypeslist[i];
            if (Browser[type])
                documentElementClassName += 'dx' + type + ' ';
        }
        documentElementClassName += 'dxBrowserVersion-' + Browser.MajorVersion;
        if (typeof document !== 'undefined' && document && document.documentElement) {
            if (document.documentElement.className !== '')
                documentElementClassName = ' ' + documentElementClassName;
            document.documentElement.className += documentElementClassName;
            Browser.Info = documentElementClassName;
        }
    };
    Browser.getUserAgent = function () {
        return Browser.hasNavigator() && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
    };
    Browser.UserAgent = Browser.getUserAgent();
    Browser._foo = Browser.IdentUserAgent(Browser.UserAgent);
    return Browser;
}());
exports.Browser = Browser;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToStringHex = exports.numberToStringBin = exports.isOdd = exports.isEven = exports.isNonNullString = exports.isString = exports.isNumber = exports.boolToString = exports.boolToInt = exports.isDefined = void 0;
var string_1 = __webpack_require__(3);
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function boolToInt(value) {
    return value ? 1 : 0;
}
exports.boolToInt = boolToInt;
function boolToString(value) {
    return value ? '1' : '0';
}
exports.boolToString = boolToString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNonNullString(str) {
    return !!str;
}
exports.isNonNullString = isNonNullString;
function isEven(num) {
    return (num % 2) !== 0;
}
exports.isEven = isEven;
function isOdd(num) {
    return (num % 2) === 0;
}
exports.isOdd = isOdd;
function numberToStringBin(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(2), minLength, '0');
}
exports.numberToStringBin = numberToStringBin;
function numberToStringHex(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(16), minLength, '0');
}
exports.numberToStringHex = numberToStringHex;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    };
    StringUtils.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };
    StringUtils.stringHashCode = function (str) {
        var hash = 0;
        if (str.length === 0)
            return hash;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };
    StringUtils.endsAt = function (str, template) {
        var strInd = str.length - 1;
        var tmplInd = template.length - 1;
        var strStartInd = strInd - tmplInd;
        if (strStartInd < 0)
            return false;
        for (; strInd >= strStartInd; strInd--, tmplInd--) {
            if (str[strInd] !== template[tmplInd])
                return false;
        }
        return true;
    };
    StringUtils.startsAt = function (str, template) {
        return str.substr(0, template.length) === template;
    };
    StringUtils.stringInLowerCase = function (str) {
        return str.toLowerCase() === str;
    };
    StringUtils.stringInUpperCase = function (str) {
        return str.toUpperCase() === str;
    };
    StringUtils.atLeastOneSymbolInUpperCase = function (str) {
        for (var i = 0, char = void 0; char = str[i]; i++) {
            if (StringUtils.stringInUpperCase(char) && !StringUtils.stringInLowerCase(char))
                return true;
        }
        return false;
    };
    StringUtils.getSymbolFromEnd = function (text, posFromEnd) {
        return text[text.length - posFromEnd];
    };
    StringUtils.trim = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("(^[" + joinedChars + "]*)|([" + joinedChars + "]*$)", 'g'), '');
        }
    };
    StringUtils.trimStart = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, false);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("^[" + joinedChars + "]*", 'g'), '');
        }
    };
    StringUtils.trimEnd = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, false, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("[" + joinedChars + "]*$", 'g'), '');
        }
    };
    StringUtils.getDecimalSeparator = function () {
        return (1.1).toLocaleString().substr(1, 1);
    };
    StringUtils.repeat = function (str, count) {
        return new Array(count <= 0 ? 0 : count + 1).join(str);
    };
    StringUtils.isNullOrEmpty = function (str) {
        return !str || !str.length;
    };
    StringUtils.padLeft = function (str, totalWidth, paddingChar) {
        return StringUtils.repeat(paddingChar, Math.max(0, totalWidth - str.length)) + str;
    };
    StringUtils.trimInternal = function (source, trimStart, trimEnd) {
        var len = source.length;
        if (!len)
            return source;
        if (len < 0xBABA1) {
            var result = source;
            if (trimStart)
                result = result.replace(/^\s+/, '');
            if (trimEnd)
                result = result.replace(/\s+$/, '');
            return result;
        }
        else {
            var start = 0;
            if (trimEnd) {
                while (len > 0 && /\s/.test(source[len - 1]))
                    len--;
            }
            if (trimStart && len > 0) {
                while (start < len && /\s/.test(source[start]))
                    start++;
            }
            return source.substring(start, len);
        }
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.zero = function () {
        return new Point(0, 0);
    };
    Point.fromNumber = function (num) {
        return new Point(num, num);
    };
    Point.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    };
    Point.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.equals = function (obj) {
        return this.x === obj.x && this.y === obj.y;
    };
    Point.prototype.offset = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Point.prototype.offsetByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Point.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        return this;
    };
    Point.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Point.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        return this;
    };
    Point.plus = function (a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    };
    Point.minus = function (a, b) {
        return new Point(a.x - b.x, a.y - b.y);
    };
    Point.xComparer = function (a, b) {
        return a.x - b.x;
    };
    Point.yComparer = function (a, b) {
        return a.y - b.y;
    };
    Point.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedMinMax = exports.ExtendedMax = exports.ExtendedMin = exports.MinMaxNumber = exports.MinMax = void 0;
var tslib_1 = __webpack_require__(1);
var MinMax = (function () {
    function MinMax(minElement, maxElement) {
        this.minElement = minElement;
        this.maxElement = maxElement;
    }
    return MinMax;
}());
exports.MinMax = MinMax;
var MinMaxNumber = (function (_super) {
    tslib_1.__extends(MinMaxNumber, _super);
    function MinMaxNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinMaxNumber.prototype, "length", {
        get: function () {
            return this.maxElement - this.minElement;
        },
        enumerable: false,
        configurable: true
    });
    return MinMaxNumber;
}(MinMax));
exports.MinMaxNumber = MinMaxNumber;
var ExtendedMin = (function () {
    function ExtendedMin(minElement, minValue) {
        this.minElement = minElement;
        this.minValue = minValue;
    }
    return ExtendedMin;
}());
exports.ExtendedMin = ExtendedMin;
var ExtendedMax = (function () {
    function ExtendedMax(maxElement, maxValue) {
        this.maxElement = maxElement;
        this.maxValue = maxValue;
    }
    return ExtendedMax;
}());
exports.ExtendedMax = ExtendedMax;
var ExtendedMinMax = (function (_super) {
    tslib_1.__extends(ExtendedMinMax, _super);
    function ExtendedMinMax(minElement, minValue, maxElement, maxValue) {
        var _this = _super.call(this, minElement, maxElement) || this;
        _this.minValue = minValue;
        _this.maxValue = maxValue;
        return _this;
    }
    return ExtendedMinMax;
}(MinMax));
exports.ExtendedMinMax = ExtendedMinMax;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
var list_1 = __webpack_require__(7);
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.round = function (value, digits) {
        if (digits === void 0) { digits = 0; }
        var factor = MathUtils.powFactor[digits];
        return Math.round(value * factor) / factor;
    };
    MathUtils.numberCloseTo = function (num, to, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return Math.abs(num - to) < accuracy;
    };
    MathUtils.restrictValue = function (val, minVal, maxVal) {
        if (maxVal < minVal)
            maxVal = minVal;
        if (val > maxVal)
            return maxVal;
        else if (val < minVal)
            return minVal;
        return val;
    };
    MathUtils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    MathUtils.generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    MathUtils.powFactor = list_1.ListUtils.initByCallback(20, function (ind) { return Math.pow(10, ind); });
    MathUtils.somePrimes = [1009, 1013,
        1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069,
        1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
        1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223,
        1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291,
        1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373,
        1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
        1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511,
        1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583,
        1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657,
        1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733,
        1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811,
        1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
        1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987,
        1993, 1997, 1999, 2003];
    return MathUtils;
}());
exports.MathUtils = MathUtils;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUtils = void 0;
var min_max_1 = __webpack_require__(5);
var comparers_1 = __webpack_require__(26);
var ListUtils = (function () {
    function ListUtils() {
    }
    ListUtils.remove = function (list, element) {
        var index = list.indexOf(element, 0);
        if (index >= 0)
            list.splice(index, 1);
    };
    ListUtils.removeBy = function (list, callback) {
        var len = list.length;
        for (var index = 0; index < len; index++) {
            if (callback(list[index], index))
                return list.splice(index, 1)[0];
        }
        return null;
    };
    ListUtils.shallowCopy = function (list) {
        return list.slice();
    };
    ListUtils.deepCopy = function (list) {
        return ListUtils.map(list, function (val) { return val.clone(); });
    };
    ListUtils.initByValue = function (numElements, initValue) {
        var result = [];
        for (; numElements > 0; numElements--)
            result.push(initValue);
        return result;
    };
    ListUtils.initByCallback = function (numElements, initCallback) {
        var result = [];
        for (var index = 0; index < numElements; index++)
            result.push(initCallback(index));
        return result;
    };
    ListUtils.forEachOnInterval = function (interval, callback) {
        var end = interval.end;
        for (var index = interval.start; index < end; index++)
            callback(index);
    };
    ListUtils.reverseForEachOnInterval = function (interval, callback) {
        var start = interval.start;
        for (var index = interval.end - 1; index >= start; index--)
            callback(index);
    };
    ListUtils.reducedMap = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var newItem = callback(list[index], index);
            if (newItem !== null)
                result.push(newItem);
        }
        return result;
    };
    ListUtils.filter = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var item = list[index];
            if (callback(item, index))
                result.push(item);
        }
        return result;
    };
    ListUtils.map = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++)
            result.push(callback(list[index], index));
        return result;
    };
    ListUtils.indexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var ind = startIndex; ind < endIndex; ind++) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.reverseIndexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var ind = startIndex; ind >= endIndex; ind--) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.elementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var ind = ListUtils.indexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.reverseElementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        var ind = ListUtils.reverseIndexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.last = function (list) {
        return list[list.length - 1];
    };
    ListUtils.setLast = function (list, newVal) {
        return list[list.length - 1] = newVal;
    };
    ListUtils.incLast = function (list) {
        return ++list[list.length - 1];
    };
    ListUtils.decLast = function (list) {
        return --list[list.length - 1];
    };
    ListUtils.equals = function (a, b) {
        return a.length === b.length && ListUtils.allOf2(a, b, function (a, b) { return a.equals(b); });
    };
    ListUtils.equalsByReference = function (a, b) {
        var aLen = a.length;
        var bLen = a.length;
        if (aLen !== bLen)
            return false;
        for (var i = 0; i < aLen; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListUtils.unique = function (list, cmp, equal, finalizeObj) {
        if (equal === void 0) { equal = cmp; }
        if (finalizeObj === void 0) { finalizeObj = function () { }; }
        var len = list.length;
        if (len === 0)
            return [];
        list = list.sort(cmp);
        var prevValue = list[0];
        var result = ListUtils.reducedMap(list, function (v) {
            if (equal(prevValue, v) !== 0) {
                prevValue = v;
                return v;
            }
            finalizeObj(v);
            return null;
        }, 1, len);
        result.unshift(list[0]);
        return result;
    };
    ListUtils.uniqueNumber = function (list) {
        list = list.sort(comparers_1.Comparers.number);
        var prevValue = Number.NaN;
        for (var i = list.length - 1; i >= 0; i--) {
            if (prevValue === list[i])
                list.splice(i, 1);
            else
                prevValue = list[i];
        }
        return list;
    };
    ListUtils.forEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(list[index], index);
    };
    ListUtils.forEach2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(listA[index], listB[index], index);
    };
    ListUtils.reverseForEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--)
            callback(list[index], index);
    };
    ListUtils.reverseIndexOf = function (list, element, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (list[index] === element)
                return index;
        }
        return -1;
    };
    ListUtils.accumulate = function (list, initAccValue, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc = callback(acc, list[ind], ind);
        return acc;
    };
    ListUtils.accumulateNumber = function (list, callback, initAccValue, startIndex, endIndex) {
        if (initAccValue === void 0) { initAccValue = 0; }
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc += callback(list[ind], ind, acc);
        return acc;
    };
    ListUtils.anyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.reverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeReverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.anyOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(listA[index], listB[index], index))
                return true;
        }
        return false;
    };
    ListUtils.allOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(list[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(listA[index], listB[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOfOnInterval = function (interval, callback) {
        var endIndex = interval.end;
        for (var index = interval.start; index < endIndex; index++) {
            if (!callback(index))
                return false;
        }
        return true;
    };
    ListUtils.addListOnTail = function (resultList, addedList) {
        for (var i = 0, elem = void 0; elem = addedList[i]; i++)
            resultList.push(elem);
        return resultList;
    };
    ListUtils.joinLists = function (converter) {
        var lists = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            lists[_i - 1] = arguments[_i];
        }
        return ListUtils.accumulate(lists, [], function (accList, list) {
            ListUtils.addListOnTail(accList, converter(list));
            return accList;
        });
    };
    ListUtils.push = function (list, element) {
        list.push(element);
        return list;
    };
    ListUtils.countIf = function (list, callback) {
        return ListUtils.accumulateNumber(list, function (elem, ind) { return callback(elem, ind) ? 1 : 0; });
    };
    ListUtils.clear = function (list) {
        list.splice(0);
    };
    ListUtils.merge = function (list, cmp, shouldMerge, merge, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        list = list.slice(startIndex, endIndex);
        if (endIndex - startIndex < 2)
            return list;
        list = list.sort(cmp);
        var prevObj = list[startIndex];
        var result = [prevObj];
        for (var ind = startIndex + 1; ind < endIndex; ind++) {
            var obj = list[ind];
            if (shouldMerge(prevObj, obj))
                merge(prevObj, obj);
            else {
                prevObj = obj;
                result.push(prevObj);
            }
        }
        return result;
    };
    ListUtils.min = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minExtended(list, getValue, startIndex, endIndex);
        return res ? res.minElement : null;
    };
    ListUtils.max = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.maxExtended(list, getValue, startIndex, endIndex);
        return res ? res.maxElement : null;
    };
    ListUtils.minMax = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minMaxExtended(list, getValue, startIndex, endIndex);
        return res ? new min_max_1.MinMax(res.minElement, res.maxElement) : null;
    };
    ListUtils.minExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var minValue = getValue(minElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
        }
        return new min_max_1.ExtendedMin(minElement, minValue);
    };
    ListUtils.maxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var maxElement = list[startIndex];
        var maxValue = getValue(maxElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    ListUtils.minMaxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var maxElement = minElement;
        var minValue = getValue(minElement);
        var maxValue = minValue;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
            else if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    ListUtils.minByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) < 0)
                found = elem;
        }
        return found;
    };
    ListUtils.maxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) > 0)
                found = elem;
        }
        return found;
    };
    ListUtils.minMaxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var min = list[startIndex];
        var max = min;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var res = cmp(elem, min);
            if (res > 0)
                max = elem;
            else if (res < 0)
                min = elem;
        }
        return new min_max_1.MinMax(min, max);
    };
    return ListUtils;
}());
exports.ListUtils = ListUtils;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchUtils = void 0;
var browser_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var TouchUtils = (function () {
    function TouchUtils() {
    }
    TouchUtils.onEventAttachingToDocument = function (eventName, func) {
        if (browser_1.Browser.MacOSMobilePlatform && TouchUtils.isTouchEventName(eventName)) {
            if (!TouchUtils.documentTouchHandlers[eventName])
                TouchUtils.documentTouchHandlers[eventName] = [];
            TouchUtils.documentTouchHandlers[eventName].push(func);
            return TouchUtils.documentEventAttachingAllowed;
        }
        return true;
    };
    TouchUtils.isTouchEventName = function (eventName) {
        return browser_1.Browser.WebKitTouchUI && (eventName.indexOf('touch') > -1 || eventName.indexOf('gesture') > -1);
    };
    TouchUtils.isTouchEvent = function (evt) {
        return browser_1.Browser.WebKitTouchUI && common_1.isDefined(evt.changedTouches);
    };
    TouchUtils.getEventX = function (evt) {
        return browser_1.Browser.IE ? evt.pageX : evt.changedTouches[0].pageX;
    };
    TouchUtils.getEventY = function (evt) {
        return browser_1.Browser.IE ? evt.pageY : evt.changedTouches[0].pageY;
    };
    TouchUtils.touchMouseDownEventName = browser_1.Browser.WebKitTouchUI ? 'touchstart' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerdown' : 'mousedown');
    TouchUtils.touchMouseUpEventName = browser_1.Browser.WebKitTouchUI ? 'touchend' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerup' : 'mouseup');
    TouchUtils.touchMouseMoveEventName = browser_1.Browser.WebKitTouchUI ? 'touchmove' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointermove' : 'mousemove');
    TouchUtils.msTouchDraggableClassName = 'dxMSTouchDraggable';
    TouchUtils.documentTouchHandlers = {};
    TouchUtils.documentEventAttachingAllowed = true;
    return TouchUtils;
}());
exports.TouchUtils = TouchUtils;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUtils = void 0;
var SearchUtils = (function () {
    function SearchUtils() {
    }
    SearchUtils.binaryIndexOf = function (array, comparer, minIndex, maxIndex) {
        if (minIndex === void 0) { minIndex = 0; }
        if (maxIndex === void 0) { maxIndex = -2; }
        var findFromZeroPosition = minIndex === 0;
        if (maxIndex === -2)
            maxIndex = array.length - 1;
        while (minIndex <= maxIndex) {
            var currentIndex = (minIndex + ((maxIndex - minIndex) >> 1));
            var compare = comparer(array[currentIndex]);
            if (compare < 0)
                minIndex = currentIndex + 1;
            else if (compare > 0)
                maxIndex = currentIndex - 1;
            else
                return currentIndex;
        }
        return findFromZeroPosition ? ~minIndex : -1;
    };
    SearchUtils.normedBinaryIndexOf = function (array, comparer, minIndex, maxIndex) {
        if (minIndex === void 0) { minIndex = 0; }
        if (maxIndex === void 0) { maxIndex = -2; }
        var index = SearchUtils.binaryIndexOf(array, comparer, minIndex, maxIndex);
        return SearchUtils.binaryIndexNormalizator(index);
    };
    SearchUtils.binaryIndexNormalizator = function (index) {
        return index < 0 ? ~index - 1 : index;
    };
    SearchUtils.normedInterpolationIndexOf = function (array, getValue, toFind, lowIndex, highIndex) {
        if (lowIndex === void 0) { lowIndex = 0; }
        if (highIndex === void 0) { highIndex = -2; }
        if (highIndex === -2)
            highIndex = array.length - 1;
        var firstObject = array[Math.min(lowIndex, highIndex)];
        if (firstObject === undefined || toFind < getValue(firstObject))
            return -1;
        var lowValue = getValue(array[lowIndex]);
        var highValue = getValue(array[highIndex]);
        while (true) {
            if (toFind > lowValue && toFind < highValue) {
                var midIndex = lowIndex + Math.floor(((toFind - lowValue) * (highIndex - lowIndex)) / (highValue - lowValue));
                var midValue = getValue(array[midIndex]);
                if (toFind > midValue) {
                    lowIndex = midIndex + 1;
                    lowValue = getValue(array[lowIndex]);
                    if (toFind < lowValue)
                        return midIndex;
                }
                else if (toFind < midValue) {
                    highIndex = midIndex - 1;
                    highValue = getValue(array[highIndex]);
                }
                else
                    return midIndex;
            }
            else
                return toFind === lowValue ? lowIndex : highIndex;
        }
    };
    return SearchUtils;
}());
exports.SearchUtils = SearchUtils;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.fixTimezoneGap = function (oldDate, newDate) {
        var diff = newDate.getHours() - oldDate.getHours();
        if (diff === 0)
            return;
        var sign = (diff === 1 || diff === -23) ? -1 : 1;
        var trial = new Date(newDate.getTime() + sign * 3600000);
        var isDateChangedAsExpected = newDate.getHours() - trial.getHours() === diff;
        if (isDateChangedAsExpected && (sign > 0 || trial.getDate() === newDate.getDate()))
            newDate.setTime(trial.getTime());
    };
    DateUtils.expandTwoDigitYear = function (value, options) {
        value += 1900;
        if (value + 99 < options.twoDigitYearMax)
            value += 100;
        return value;
    };
    DateUtils.toUtcTime = function (date) {
        var result = new Date();
        result.setTime(date.valueOf() + DateUtils.getTimeZoneOffset(date));
        return result;
    };
    DateUtils.getTimeZoneOffset = function (date) {
        var utcFullYear = date.getUTCFullYear();
        var utcDate = new Date(utcFullYear, date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        if (utcFullYear < 100)
            utcDate.setFullYear(utcFullYear);
        return utcDate.valueOf() - date.valueOf();
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFormatter = void 0;
var string_1 = __webpack_require__(23);
var string_2 = __webpack_require__(3);
var date_utils_1 = __webpack_require__(10);
var DateFormatter = (function () {
    function DateFormatter(options) {
        this.date = new Date(2000, 0, 1);
        this.mask = '';
        this.specifiers = {};
        this.spPositions = [];
        this.parserKeys = [];
        this.savedYear = -1;
        this.isYearParsed = false;
        this.parsedMonth = -1;
        this.knownSpecifiers = ['d', 'M', 'y', 'H', 'h', 'm', 's', 'f', 'F', 'g', 't'];
        this.replacers = {
            'd': this.replaceDay,
            'M': this.replaceMonth,
            'y': this.replaceYear,
            'H': this.replaceHours23,
            'h': this.replaceHours12,
            'm': this.replaceMinutes,
            's': this.replaceSeconds,
            'F': this.replaceMsTrimmed,
            'f': this.replaceMs,
            'g': this.replaceEra,
            't': this.replaceAmPm
        };
        this.parsers = {
            'd': this.parseDay,
            'M': this.parseMonth,
            'y': this.parseYear,
            'H': this.parseHours,
            'h': this.parseHours,
            'm': this.parseMinutes,
            's': this.parseSeconds,
            'F': this.parseMs,
            'f': this.parseMs,
            'g': this.parseEra,
            't': this.parseAmPm
        };
        this.options = options;
    }
    DateFormatter.prototype.setFormatString = function (mask) {
        if (mask.length === 2 && mask.charAt(0) === '%')
            mask = mask.charAt(1);
        var stringContainsDateSeparator = !!mask && (mask.indexOf(this.options.ds) !== -1);
        this.specifiers = {};
        this.spPositions = [];
        this.mask = '';
        var subt = 0;
        var startPos = 0;
        var skip = false;
        var backslash = false;
        var sp = '';
        var prevCh = '';
        for (var pos = 0; true; pos++) {
            var ch = mask.charAt(pos);
            if (ch === '') {
                if (sp.length > 0)
                    this.registerSpecifier(startPos, sp, stringContainsDateSeparator);
                break;
            }
            if (ch === '\\' && !backslash) {
                backslash = true;
                subt++;
            }
            else {
                if (!backslash && (ch === '\'' || ch === '"')) {
                    skip = !skip;
                    subt++;
                }
                else {
                    if (!skip) {
                        if (ch === '/')
                            ch = this.options.ds;
                        else if (ch === ':')
                            ch = this.options.ts;
                        else if (this.isKnownSpecifier(ch)) {
                            if (prevCh.length === 0)
                                prevCh = ch;
                            if (ch === prevCh)
                                sp += ch;
                            else {
                                if (sp.length > 0)
                                    this.registerSpecifier(startPos, sp, stringContainsDateSeparator);
                                sp = ch;
                                startPos = pos - subt;
                            }
                        }
                    }
                    this.mask += ch;
                }
                backslash = false;
            }
            prevCh = ch;
        }
        this.spPositions.reverse();
    };
    DateFormatter.prototype.format = function (date) {
        this.date = date;
        var result = this.mask;
        for (var _i = 0, _a = this.spPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            var sp = this.specifiers[pos];
            var replacerKey = sp.substr(0, 1);
            if (this.replacers[replacerKey])
                result = result.substr(0, pos) + this.replacers[replacerKey].call(this, sp.length) + result.substr(pos + sp.length);
        }
        return result;
    };
    DateFormatter.prototype.parse = function (str, rememberParserKeys) {
        var now = new Date();
        this.savedYear = now.getFullYear();
        this.isYearParsed = false;
        this.parsedMonth = -1;
        this.date = new Date(2000, 0, now.getDate());
        this.strToParse = str;
        this.catchNumbers(str);
        this.hasAmPm = false;
        for (var _i = 0, _a = this.spPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            var sp = this.specifiers[pos];
            var parserKey = sp.substr(0, 1);
            if (this.parsers[parserKey]) {
                if (rememberParserKeys)
                    this.parserKeys.push(parserKey);
                if (!this.parsers[parserKey].call(this, sp.length))
                    return false;
            }
        }
        if (this.hasAmPm) {
            if (!this.fixHours())
                return false;
        }
        if (!this.isYearParsed)
            this.date.setFullYear(this.savedYear);
        if (this.parsedMonth < 0)
            this.parsedMonth = now.getMonth();
        this.applyMonth();
        return this.date;
    };
    DateFormatter.prototype.hasYear = function () {
        return this.hasParserKey('y');
    };
    DateFormatter.prototype.hasMonth = function () {
        return this.hasParserKey('M');
    };
    DateFormatter.prototype.hasDay = function () {
        return this.hasParserKey('d');
    };
    DateFormatter.prototype.hasHours = function () {
        return this.hasParserKey('h') || this.hasParserKey('H');
    };
    DateFormatter.prototype.hasMinutes = function () {
        return this.hasParserKey('m');
    };
    DateFormatter.prototype.hasSeconds = function () {
        return this.hasParserKey('s');
    };
    DateFormatter.prototype.hasMilliseconds = function () {
        return this.hasParserKey('f') || this.hasParserKey('F');
    };
    DateFormatter.prototype.hasParserKey = function (key) {
        return this.parserKeys.indexOf(key) !== -1;
    };
    DateFormatter.expandPredefinedFormat = function (format, options) {
        switch (format) {
            case 'd':
                return options.shortDate;
            case 'D':
                return options.longDate;
            case 't':
                return options.shortTime;
            case 'T':
                return options.longTime;
            case 'g':
                return options.shortDate + ' ' + options.shortTime;
            case 'f':
                return options.longDate + ' ' + options.shortTime;
            case 'G':
                return options.shortDate + ' ' + options.longTime;
            case 'F':
            case 'U':
                return options.longDate + ' ' + options.longTime;
            case 'M':
            case 'm':
                return options.monthDay;
            case 'Y':
            case 'y':
                return options.yearMonth;
            case 'O':
            case 'o':
                return 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss.fffffff';
            case 'R':
            case 'r':
                return 'ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'';
            case 's':
                return 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss';
            case 'u':
                return 'yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'';
        }
        return format;
    };
    DateFormatter.prototype.applyMonth = function () {
        var trial;
        var day = this.date.getDate();
        while (true) {
            trial = new Date();
            trial.setTime(this.date.getTime());
            trial.setMonth(this.parsedMonth);
            if (trial.getMonth() === this.parsedMonth)
                break;
            --day;
            this.date.setDate(day);
        }
        date_utils_1.DateUtils.fixTimezoneGap(this.date, trial);
        this.date = trial;
    };
    DateFormatter.prototype.registerSpecifier = function (pos, sp, stringContainsDateSeparator) {
        if (this.options.ds.length > 1 && this.mask && !stringContainsDateSeparator) {
            var dateParts = this.mask.split(this.options.ds);
            if (dateParts) {
                if (dateParts.length > 0 && dateParts[dateParts.length - 1] === '')
                    dateParts.pop();
                pos += (dateParts.length - 1) * (this.options.ds.length - 1);
            }
        }
        this.spPositions.push(pos);
        this.specifiers[pos] = sp;
    };
    DateFormatter.prototype.replaceDay = function (length) {
        if (length < 3) {
            var value = this.date.getDate().toString();
            return length === 2 ? this.padLeft(value, 2) : value;
        }
        else if (length === 3)
            return this.options.abbrDayNames[this.date.getDay()];
        else
            return this.options.dayNames[this.date.getDay()];
    };
    DateFormatter.prototype.replaceMonth = function (length) {
        var value = 1 + this.date.getMonth();
        switch (length) {
            case 1:
                return value.toString();
            case 2:
                return this.padLeft(value.toString(), 2);
            case 3:
                return this.options.abbrMonthNames[value - 1];
            default:
                for (var i in this.specifiers) {
                    if (Object.prototype.hasOwnProperty.call(this.specifiers, i)) {
                        var spec = this.specifiers[i];
                        if (spec === 'd' || spec === 'dd')
                            return this.options.genMonthNames[value - 1];
                    }
                }
                return this.options.monthNames[value - 1];
        }
    };
    DateFormatter.prototype.replaceYear = function (length) {
        var value = this.date.getFullYear();
        if (length <= 2)
            value = value % 100;
        return this.padLeft(value.toString(), length);
    };
    DateFormatter.prototype.replaceHours23 = function (length) {
        var value = this.date.getHours().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceHours12 = function (length) {
        var value = this.date.getHours() % 12;
        if (value === 0)
            value = 12;
        var strValue = value.toString();
        return length > 1 ? this.padLeft(strValue, 2) : strValue;
    };
    DateFormatter.prototype.replaceMinutes = function (length) {
        var value = this.date.getMinutes().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceSeconds = function (length) {
        var value = this.date.getSeconds().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceMsTrimmed = function (length) {
        return this.formatMs(length, true);
    };
    DateFormatter.prototype.replaceMs = function (length) {
        return this.formatMs(length, false);
    };
    DateFormatter.prototype.replaceEra = function (_length) {
        return 'A.D.';
    };
    DateFormatter.prototype.replaceAmPm = function (length) {
        var value = this.date.getHours() < 12 ? this.options.am : this.options.pm;
        return length < 2 ? value.charAt(0) : value;
    };
    DateFormatter.prototype.catchNumbers = function (str) {
        var _this = this;
        this.parseNumbers = [];
        var regex = /\d+/g;
        var match;
        while (true) {
            match = regex.exec(str);
            if (!match)
                break;
            this.parseNumbers.push(this.parseDecInt(match[0]));
        }
        var spCount = 0;
        var now = new Date();
        string_1.StringMapUtils.forEach(this.specifiers, function (sp) {
            if (typeof (sp) !== 'string' || !_this.isNumericSpecifier(sp))
                return;
            spCount++;
            if (_this.parseNumbers.length < spCount) {
                var defaultValue = 0;
                if (sp.charAt(0) === 'y')
                    defaultValue = now.getFullYear();
                _this.parseNumbers.push(defaultValue);
            }
        });
        var excess = this.parseNumbers.length - spCount;
        if (excess > 0)
            this.parseNumbers.splice(spCount, excess);
        this.currentParseNumber = this.parseNumbers.length - 1;
    };
    DateFormatter.prototype.popParseNumber = function () {
        return this.parseNumbers[this.currentParseNumber--];
    };
    DateFormatter.prototype.findAbbrMonth = function () {
        return this.findMonthCore(this.options.abbrMonthNames);
    };
    DateFormatter.prototype.findFullMonth = function () {
        return this.findMonthCore(this.options.genMonthNames);
    };
    DateFormatter.prototype.findMonthCore = function (monthNames) {
        var inputLower = this.strToParse.toLowerCase();
        for (var i = 0; i < monthNames.length; i++) {
            var monthName = monthNames[i].toLowerCase();
            if (monthName.length > 0 && inputLower.indexOf(monthName) > -1) {
                this.strToParse = this.strToParse.replace(new RegExp(monthName, 'gi'), string_2.StringUtils.repeat(' ', monthName.length));
                return 1 + i;
            }
        }
        return false;
    };
    DateFormatter.prototype.parseDay = function (length) {
        if (length < 3) {
            var value = this.popParseNumber();
            if (value < 1 || value > 31)
                return false;
            this.date.setDate(value);
        }
        return true;
    };
    DateFormatter.prototype.parseMonth = function (length) {
        var value;
        switch (length) {
            case 1:
            case 2:
                value = this.popParseNumber();
                break;
            case 3:
                value = this.findAbbrMonth();
                break;
            default:
                value = this.findFullMonth();
                break;
        }
        if (value === false || value < 1 || value > 12)
            return false;
        this.parsedMonth = value - 1;
        return true;
    };
    DateFormatter.prototype.parseYear = function (_length) {
        var value = this.popParseNumber();
        if (value > 9999)
            return false;
        if (value < 100)
            value = date_utils_1.DateUtils.expandTwoDigitYear(value, this.options);
        this.date.setFullYear(value);
        this.isYearParsed = true;
        return true;
    };
    DateFormatter.prototype.parseHours = function (_length) {
        var value = this.popParseNumber();
        if (value > 23)
            return false;
        this.date.setHours(value);
        return true;
    };
    DateFormatter.prototype.parseMinutes = function (_length) {
        var value = this.parseMinSecCore();
        if (value === -1)
            return false;
        this.date.setMinutes(value);
        return true;
    };
    DateFormatter.prototype.parseSeconds = function (_length) {
        var value = this.parseMinSecCore();
        if (value === -1)
            return false;
        this.date.setSeconds(value);
        return true;
    };
    DateFormatter.prototype.parseMs = function (length) {
        if (length > 3)
            length = 3;
        var thr = 1;
        for (var i = 0; i < length; i++)
            thr *= 10;
        thr -= 1;
        var value = this.popParseNumber();
        while (value > thr)
            value /= 10;
        this.date.setMilliseconds(Math.round(value));
        return true;
    };
    DateFormatter.prototype.parseEra = function (_length) {
        return true;
    };
    DateFormatter.prototype.parseAmPm = function (_length) {
        this.hasAmPm = this.options.am.length > 0 && this.options.pm.length > 0;
        return true;
    };
    DateFormatter.prototype.parseDecInt = function (str) {
        return parseInt(str, 10);
    };
    DateFormatter.prototype.padLeft = function (str, length) {
        while (str.length < length)
            str = '0' + str;
        return str;
    };
    DateFormatter.prototype.formatMs = function (length, trim) {
        var numVal = Math.floor(this.date.getMilliseconds() * Math.pow(10, length - 3));
        var value = this.padLeft(numVal.toString(), length);
        if (trim) {
            var pos = value.length - 1;
            var req = false;
            while (value.charAt(pos) === '0') {
                req = true;
                pos--;
            }
            if (req)
                value = value.substring(0, pos + 1);
        }
        return value;
    };
    DateFormatter.prototype.parseMinSecCore = function () {
        var value = this.popParseNumber();
        return value > 59 ? -1 : value;
    };
    DateFormatter.prototype.fixHours = function () {
        var state = this.getAmPmState(this.strToParse, false);
        if (!state)
            return true;
        var h = this.date.getHours();
        switch (state) {
            case 'P':
                if (h > 12)
                    return false;
                if (h < 12)
                    this.date.setHours(12 + h);
                break;
            case 'A':
                if (h === 12)
                    this.date.setHours(0);
        }
        return true;
    };
    DateFormatter.prototype.getAmPmState = function (str, skipCorrection) {
        var am = this.options.am.charAt(0).toLowerCase();
        var pm = this.options.pm.charAt(0).toLowerCase();
        var amMatches = new RegExp(am, 'gi').exec(str);
        var pmMatches = new RegExp(pm, 'gi').exec(str);
        var amCount = amMatches ? amMatches.length : 0;
        var pmCount = pmMatches ? pmMatches.length : 0;
        var hasAm = amCount > 0;
        var hasPm = pmCount > 0;
        if (hasAm !== hasPm && amCount < 2 && pmCount < 2)
            return hasAm ? 'A' : 'P';
        if (!skipCorrection) {
            str = str.replace(new RegExp(this.getDayMonthNameReplacePattern(), 'gi'), '');
            return this.getAmPmState(str, true);
        }
        return null;
    };
    DateFormatter.prototype.getDayMonthNameReplacePattern = function () {
        if (!this.dayMonthNameReplacePattern)
            return this.createDayMonthNameReplacePattern();
        return this.dayMonthNameReplacePattern;
    };
    DateFormatter.prototype.createDayMonthNameReplacePattern = function () {
        var parts = [];
        parts.push('(?:');
        parts.push(this.createReplacePattern(this.options.monthNames));
        parts.push(this.createReplacePattern(this.options.genMonthNames));
        parts.push(this.createReplacePattern(this.options.abbrMonthNames));
        parts.push(this.createReplacePattern(this.options.abbrDayNames));
        parts.push(this.createReplacePattern(this.options.dayNames));
        parts.push(')');
        return parts.join('');
    };
    DateFormatter.prototype.createReplacePattern = function (names) {
        return names && names.length > 0 ? '\\b' + names.join('\\b|\\b') + '\\b' : '';
    };
    DateFormatter.prototype.isNumericSpecifier = function (sp) {
        var ch = sp.charAt(0);
        return !(ch === 'g' || ch === 't' || ((ch === 'M' || ch === 'd') && sp.length > 2));
    };
    DateFormatter.prototype.isKnownSpecifier = function (sp) {
        sp = sp.charAt(0);
        return this.knownSpecifiers.indexOf(sp) !== -1;
    };
    return DateFormatter;
}());
exports.DateFormatter = DateFormatter;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Int32Constants = exports.Constants = void 0;
var Constants = (function () {
    function Constants() {
    }
    Constants.MIN_SAFE_INTEGER = -(Math.pow(2, 53) - 1);
    Constants.MAX_SAFE_INTEGER = (Math.pow(2, 53) - 1);
    Constants.MAX_BYTE = Math.pow(2, 8) - 1;
    return Constants;
}());
exports.Constants = Constants;
var Int32Constants = (function () {
    function Int32Constants() {
    }
    Int32Constants.MIN_VALUE = -2147483648;
    Int32Constants.MAX_VALUE = 2147483647;
    return Int32Constants;
}());
exports.Int32Constants = Int32Constants;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Offsets = void 0;
var Offsets = (function () {
    function Offsets(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    Offsets.empty = function () {
        return new Offsets(0, 0, 0, 0);
    };
    Object.defineProperty(Offsets.prototype, "horizontal", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Offsets.prototype, "vertical", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Offsets.fromNumber = function (offset) {
        return new Offsets(offset, offset, offset, offset);
    };
    Offsets.fromOffsets = function (offsets) {
        return new Offsets(offsets.left, offsets.right, offsets.top, offsets.bottom);
    };
    Offsets.fromSide = function (horizontal, vertical) {
        return new Offsets(horizontal, horizontal, vertical, vertical);
    };
    Offsets.prototype.normalize = function () {
        this.left = Math.max(0, this.left);
        this.right = Math.max(0, this.right);
        this.top = Math.max(0, this.top);
        this.bottom = Math.max(0, this.bottom);
        return this;
    };
    Offsets.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Offsets.prototype.isEmpty = function () {
        return this.left === 0 && this.right === 0 && this.top === 0 && this.bottom === 0;
    };
    Offsets.prototype.offset = function (offset) {
        this.left += offset.left;
        this.right += offset.right;
        this.top += offset.top;
        this.bottom += offset.bottom;
        return this;
    };
    Offsets.prototype.multiply = function (multLeft, multRight, multTop, multBottom) {
        switch (arguments.length) {
            case 1: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multLeft;
                this.bottom *= multLeft;
                return this;
            }
            case 2: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multRight;
                this.bottom *= multRight;
                return this;
            }
            case 4: {
                this.left *= multLeft;
                this.right *= multRight;
                this.top *= multTop;
                this.bottom *= multBottom;
                return this;
            }
        }
        return this;
    };
    Offsets.prototype.clone = function () {
        return new Offsets(this.left, this.right, this.top, this.bottom);
    };
    Offsets.prototype.copyFrom = function (obj) {
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top;
        this.bottom = obj.bottom;
    };
    Offsets.prototype.equals = function (obj) {
        return this.top === obj.top &&
            this.bottom === obj.bottom &&
            this.right === obj.right &&
            this.left === obj.left;
    };
    Offsets.prototype.applyConverter = function (converter) {
        this.left = converter(this.left);
        this.right = converter(this.right);
        this.top = converter(this.top);
        this.bottom = converter(this.bottom);
        return this;
    };
    return Offsets;
}());
exports.Offsets = Offsets;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
var Vector = (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    });
    Vector.fromPoints = function (begin, end) {
        return new Vector(end.x - begin.x, end.y - begin.y);
    };
    Vector.fromSegment = function (segment) {
        return new Vector(segment.endPoint.x - segment.startPoint.x, segment.endPoint.y - segment.startPoint.y);
    };
    Vector.prototype.normalize = function () {
        var length = this.length;
        if (length !== 0) {
            this.x /= length;
            this.y /= length;
        }
        return this;
    };
    Vector.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Object.defineProperty(Vector, "axisX", {
        get: function () {
            return new Vector(1, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector, "axisY", {
        get: function () {
            return new Vector(0, 1);
        },
        enumerable: false,
        configurable: true
    });
    Vector.angleBetween = function (a, b) {
        var cosFi = Vector.scalarProduct(a, b) / (a.length * b.length);
        return Math.acos(cosFi);
    };
    Vector.scalarProduct = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    return Vector;
}());
exports.Vector = Vector;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
var math_1 = __webpack_require__(6);
var metrics_1 = __webpack_require__(27);
var point_1 = __webpack_require__(4);
var rectangle_1 = __webpack_require__(16);
var Segment = (function () {
    function Segment(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }
    Object.defineProperty(Segment.prototype, "length", {
        get: function () {
            return metrics_1.Metrics.euclideanDistance(this.startPoint, this.endPoint);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "xLength", {
        get: function () {
            return Math.abs(this.endPoint.x - this.startPoint.x);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "yLength", {
        get: function () {
            return Math.abs(this.endPoint.y - this.startPoint.y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "center", {
        get: function () {
            return new point_1.Point(this.startPoint.x + (this.endPoint.x - this.startPoint.x) / 2, this.startPoint.y + (this.endPoint.y - this.startPoint.y) / 2);
        },
        enumerable: false,
        configurable: true
    });
    Segment.prototype.isIntersected = function (segment) {
        return this.startPoint.equals(segment.startPoint) || this.endPoint.equals(segment.startPoint) ||
            this.startPoint.equals(segment.endPoint) || this.endPoint.equals(segment.endPoint) ||
            (this.intersectCore(segment) && segment.intersectCore(this));
    };
    Segment.prototype.containsPoint = function (point, accuracy) {
        if (accuracy === void 0) { accuracy = 0.0000001; }
        return this.startPoint.equals(point) || this.endPoint.equals(point) ||
            math_1.MathUtils.numberCloseTo(this.length, metrics_1.Metrics.euclideanDistance(this.startPoint, point) + metrics_1.Metrics.euclideanDistance(this.endPoint, point), accuracy);
    };
    Segment.prototype.isIntersectedByRect = function (rect) {
        if (rectangle_1.Rectangle.containsPoint(rect, this.startPoint) || rectangle_1.Rectangle.containsPoint(rect, this.endPoint))
            return true;
        var left = rect.x;
        var right = rect.x + rect.width;
        var top = rect.y;
        var bottom = rect.y + rect.height;
        return this.isIntersected(new Segment(new point_1.Point(left, top), new point_1.Point(left, bottom))) ||
            this.isIntersected(new Segment(new point_1.Point(right, top), new point_1.Point(right, bottom))) ||
            this.isIntersected(new Segment(new point_1.Point(left, top), new point_1.Point(right, top))) ||
            this.isIntersected(new Segment(new point_1.Point(left, bottom), new point_1.Point(right, bottom)));
    };
    Segment.prototype.intersectCore = function (segment) {
        if (this.startPoint.x === this.endPoint.x) {
            if (this.startPoint.x - segment.endPoint.x !== 0)
                return (this.startPoint.x - segment.startPoint.x) / (this.startPoint.x - segment.endPoint.x) <= 0;
            if (segment.endPoint.y - this.endPoint.y !== 0)
                return (segment.endPoint.y - this.startPoint.y) / (segment.endPoint.y - this.endPoint.y) <= 0;
        }
        if (this.startPoint.y === this.endPoint.y) {
            if (this.startPoint.y - segment.endPoint.y !== 0)
                return (this.startPoint.y - segment.startPoint.y) / (this.startPoint.y - segment.endPoint.y) <= 0;
            if (segment.endPoint.x - this.endPoint.x !== 0)
                return (segment.endPoint.x - this.startPoint.x) / (segment.endPoint.x - this.endPoint.x) <= 0;
        }
        var tg = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
        var y1 = this.startPoint.y + (segment.startPoint.x - this.startPoint.x) * tg;
        var y2 = this.startPoint.y + (segment.endPoint.x - this.startPoint.x) * tg;
        var dy1 = segment.startPoint.y - y1;
        var dy2 = segment.endPoint.y - y2;
        if (dy1 === 0 && dy2 === 0) {
            return (this.startPoint.y - y1) / (this.endPoint.y - y1) <= 0 ||
                (this.startPoint.y - y2) / (this.endPoint.y - y2) <= 0;
        }
        return dy1 === 0 || dy2 === 0 || dy1 / dy2 < 0;
    };
    return Segment;
}());
exports.Segment = Segment;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RectangleDeviation = exports.HitTestDeviation = exports.Rectangle = void 0;
var flag_1 = __webpack_require__(22);
var algorithms_1 = __webpack_require__(28);
var fixed_1 = __webpack_require__(17);
var point_1 = __webpack_require__(4);
var size_1 = __webpack_require__(32);
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function () {
            return Rectangle.center(this);
        },
        enumerable: false,
        configurable: true
    });
    Rectangle.prototype.createRectangle = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.createSize = function () {
        return new size_1.Size(this.width, this.height);
    };
    Rectangle.prototype.createPosition = function () {
        return new point_1.Point(this.x, this.y);
    };
    Rectangle.prototype.createVerticalInterval = function () {
        return new fixed_1.FixedInterval(this.y, this.height);
    };
    Rectangle.prototype.createHorizontalInterval = function () {
        return new fixed_1.FixedInterval(this.x, this.width);
    };
    Rectangle.fromGeometry = function (point, size) {
        return new Rectangle(point.x, point.y, size.width, size.height);
    };
    Rectangle.fromPoints = function (pointA, pointB) {
        var x = Math.min(pointA.x, pointB.x);
        var y = Math.min(pointA.y, pointB.y);
        var width = Math.abs(pointA.x - pointB.x);
        var height = Math.abs(pointA.y - pointB.y);
        return new Rectangle(x, y, width, height);
    };
    Rectangle.fromPositions = function (x1, y1, x2, y2) {
        var x = Math.min(x1, x2);
        var y = Math.min(y1, y2);
        var width = Math.abs(x2 - x1);
        var height = Math.abs(y2 - y1);
        return new Rectangle(x, y, width, height);
    };
    Rectangle.fromCenter = function (center, minRadius) {
        return new Rectangle(center.x - minRadius, center.y - minRadius, minRadius * 2, minRadius * 2);
    };
    Rectangle.prototype.isCollapsed = function () {
        return this.width === 0 || this.height === 0;
    };
    Rectangle.prototype.isEmpty = function () {
        return this.x === 0 && this.y === 0 &&
            this.width === 0 && this.height === 0;
    };
    Rectangle.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Rectangle.prototype.setPosition = function (pos) {
        this.x = pos.x;
        this.y = pos.y;
        return this;
    };
    Rectangle.prototype.setSize = function (size) {
        this.width = size.width;
        this.height = size.height;
        return this;
    };
    Rectangle.prototype.setGeomerty = function (rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        return this;
    };
    Rectangle.prototype.moveRectangle = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Rectangle.prototype.moveRectangleByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Rectangle.prototype.resize = function (deltaX, deltaY) {
        this.width += deltaX;
        this.height += deltaY;
        return this;
    };
    Rectangle.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Rectangle.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        this.width *= multiplierX;
        this.height *= multiplierY;
        return this;
    };
    Rectangle.prototype.equals = function (obj) {
        return Rectangle.equals(this, obj);
    };
    Rectangle.prototype.clone = function () {
        var rect = new Rectangle(0, 0, 0, 0);
        rect.copyFrom(this);
        return rect;
    };
    Rectangle.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
    };
    Rectangle.prototype.containsPoint = function (point) {
        return Rectangle.containsPoint(this, point);
    };
    Rectangle.prototype.containsRectangle = function (rectangle) {
        return this.x <= rectangle.x &&
            this.right >= rectangle.right &&
            this.y <= rectangle.y &&
            this.bottom >= rectangle.bottom;
    };
    Rectangle.prototype.inflate = function (deltaX, deltaY) {
        if (deltaY === void 0) { deltaY = deltaX; }
        this.x -= deltaX;
        this.y -= deltaY;
        this.width += deltaX * 2;
        this.height += deltaY * 2;
        return this;
    };
    Rectangle.prototype.applyOffsetsInside = function (offsets) {
        this.x += offsets.left;
        this.y += offsets.top;
        this.width -= offsets.left + offsets.right;
        this.height -= offsets.top + offsets.bottom;
        return this;
    };
    Rectangle.prototype.applyNormalizedOffsetsInside = function (offsets) {
        var left = Math.max(0, offsets.left);
        var right = Math.max(0, offsets.right);
        var horSum = left + right;
        if (horSum !== 0) {
            if (horSum <= this.width) {
                this.x += left;
                this.width -= horSum;
            }
            else {
                this.x += this.width * (left / horSum);
                this.width = 0;
            }
        }
        var top = Math.max(0, offsets.top);
        var bottom = Math.max(0, offsets.bottom);
        var vertSum = top + bottom;
        if (vertSum !== 0) {
            if (vertSum <= this.height) {
                this.y += top;
                this.height -= vertSum;
            }
            else {
                this.y += this.height * (top / vertSum);
                this.height = 0;
            }
        }
        return this;
    };
    Rectangle.prototype.applyOffsetsOutside = function (offsets) {
        this.x -= offsets.left;
        this.y -= offsets.top;
        this.width += offsets.left + offsets.right;
        this.height += offsets.top + offsets.bottom;
        return this;
    };
    Rectangle.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        this.width = converter(this.width);
        this.height = converter(this.height);
        return this;
    };
    Rectangle.getHorizIntersection = function (objA, objB) {
        return algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.x, objA.width), new fixed_1.FixedInterval(objB.x, objB.width));
    };
    Rectangle.getVertIntersection = function (objA, objB) {
        return algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.y, objA.height), new fixed_1.FixedInterval(objB.y, objB.height));
    };
    Rectangle.getIntersection = function (objA, objB) {
        var horInters = algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.x, objA.width), new fixed_1.FixedInterval(objB.x, objB.width));
        if (!horInters)
            return null;
        var vertInters = algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.y, objA.height), new fixed_1.FixedInterval(objB.y, objB.height));
        if (!vertInters)
            return null;
        return new Rectangle(horInters.start, vertInters.start, horInters.length, vertInters.length);
    };
    Rectangle.getHorNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getHorizIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.getVertNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getVertIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.getNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.areIntersected = function (rectA, rectB) {
        return !(rectA.x > rectB.x + rectB.width || rectB.x > rectA.x + rectA.width) &&
            !(rectA.y > rectB.y + rectB.height || rectB.y > rectA.y + rectA.height);
    };
    Rectangle.union = function (rectA, rectB) {
        var right = Math.max(rectA.x + rectA.width, rectB.x + rectB.width);
        var bottom = Math.max(rectA.y + rectA.height, rectB.y + rectB.height);
        var x = Math.min(rectA.x, rectB.x);
        var y = Math.min(rectA.y, rectB.y);
        return new Rectangle(x, y, right - x, bottom - y);
    };
    Rectangle.equals = function (a, b) {
        return a.x === b.x &&
            a.y === b.y &&
            a.width === b.width &&
            a.height === b.height;
    };
    Rectangle.center = function (rect) {
        return new point_1.Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
    };
    Rectangle.containsPoint = function (rect, point) {
        var right = rect.x + rect.width;
        var bottom = rect.y + rect.height;
        return point.y >= rect.y && bottom >= point.y &&
            point.x >= rect.x && right >= point.x;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var HitTestDeviation;
(function (HitTestDeviation) {
    HitTestDeviation[HitTestDeviation["None"] = 0] = "None";
    HitTestDeviation[HitTestDeviation["Top"] = 1] = "Top";
    HitTestDeviation[HitTestDeviation["Bottom"] = 2] = "Bottom";
    HitTestDeviation[HitTestDeviation["Left"] = 4] = "Left";
    HitTestDeviation[HitTestDeviation["Right"] = 8] = "Right";
})(HitTestDeviation = exports.HitTestDeviation || (exports.HitTestDeviation = {}));
var RectangleDeviation = (function () {
    function RectangleDeviation(initRectangle, initPoint) {
        this.initRectangle = initRectangle;
        this.initPoint = initPoint;
        this.deviation = new flag_1.Flag(HitTestDeviation.None);
    }
    RectangleDeviation.prototype.calcDeviation = function () {
        if (this.initPoint.x < this.initRectangle.x)
            this.deviation.set(HitTestDeviation.Left, true);
        else if (this.initPoint.x > this.initRectangle.right)
            this.deviation.set(HitTestDeviation.Right, true);
        if (this.initPoint.y < this.initRectangle.y)
            this.deviation.set(HitTestDeviation.Top, true);
        else if (this.initPoint.y > this.initRectangle.bottom)
            this.deviation.set(HitTestDeviation.Bottom, true);
        return this;
    };
    RectangleDeviation.prototype.calcAdditionalParams = function () {
        this.insidePoint = this.initPoint.clone();
        this.offsetToInside = new point_1.Point(0, 0);
        if (this.deviation.get(HitTestDeviation.Left)) {
            this.insidePoint.x = this.initRectangle.x;
            this.offsetToInside.x = this.insidePoint.x - this.initPoint.x;
        }
        else if (this.deviation.get(HitTestDeviation.Right)) {
            this.insidePoint.x = this.initRectangle.right;
            this.offsetToInside.x = this.initPoint.x - this.insidePoint.x;
        }
        if (this.deviation.get(HitTestDeviation.Top)) {
            this.insidePoint.y = this.initRectangle.y;
            this.offsetToInside.y = this.insidePoint.y - this.initPoint.y;
        }
        else if (this.deviation.get(HitTestDeviation.Bottom)) {
            this.insidePoint.y = this.initRectangle.bottom;
            this.offsetToInside.y = this.initPoint.y - this.insidePoint.y;
        }
        return this;
    };
    return RectangleDeviation;
}());
exports.RectangleDeviation = RectangleDeviation;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedInterval = void 0;
var tslib_1 = __webpack_require__(1);
var mutable_1 = __webpack_require__(18);
var FixedInterval = (function (_super) {
    tslib_1.__extends(FixedInterval, _super);
    function FixedInterval(start, length) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.length = length;
        return _this;
    }
    Object.defineProperty(FixedInterval.prototype, "end", {
        get: function () {
            return this.start + this.length;
        },
        set: function (newEnd) {
            this.length = newEnd - this.start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FixedInterval.prototype, "center", {
        get: function () {
            return this.start + this.length / 2;
        },
        enumerable: false,
        configurable: true
    });
    FixedInterval.prototype.copyFrom = function (obj) {
        this.start = obj.start;
        this.length = obj.length;
    };
    FixedInterval.prototype.equals = function (obj) {
        return obj && this.start === obj.start && this.length === obj.length;
    };
    FixedInterval.prototype.clone = function () {
        return new FixedInterval(this.start, this.length);
    };
    FixedInterval.prototype.makeByStartEnd = function (start, end) {
        return new FixedInterval(start, end - start);
    };
    FixedInterval.prototype.makeByStartLength = function (start, length) {
        return new FixedInterval(start, length);
    };
    FixedInterval.prototype.makeByLengthEnd = function (length, end) {
        return new FixedInterval(end - length, length);
    };
    FixedInterval.fromPositions = function (start, end) {
        return new FixedInterval(start, end - start);
    };
    FixedInterval.makeByConstInterval = function (interval) {
        return new FixedInterval(interval.start, interval.length);
    };
    FixedInterval.prototype.expand = function (interval) {
        var end = Math.max(interval.end, this.end);
        this.start = Math.min(interval.start, this.start);
        this.end = end;
        return this;
    };
    return FixedInterval;
}(mutable_1.MutableInterval));
exports.FixedInterval = FixedInterval;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MutableInterval = void 0;
var tslib_1 = __webpack_require__(1);
var const_1 = __webpack_require__(29);
var MutableInterval = (function (_super) {
    tslib_1.__extends(MutableInterval, _super);
    function MutableInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MutableInterval.prototype.normalizeLength = function () {
        if (this.length < 0)
            this.length = 0;
        return this;
    };
    return MutableInterval;
}(const_1.ConstInterval));
exports.MutableInterval = MutableInterval;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseIntervals = void 0;
var iterator_1 = __webpack_require__(20);
var objects_iterator_1 = __webpack_require__(31);
var SparseIntervals = (function () {
    function SparseIntervals(list) {
        if (list === void 0) { list = []; }
        this.list = list;
        this._count = 0;
        this._numIntervals = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var curr = list_1[_i];
            this._count += curr.length;
            this._numIntervals++;
        }
    }
    Object.defineProperty(SparseIntervals.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SparseIntervals.prototype, "numIntervals", {
        get: function () {
            return this._numIntervals;
        },
        enumerable: false,
        configurable: true
    });
    SparseIntervals.prototype.getInterval = function (index) {
        return this.list[index];
    };
    SparseIntervals.prototype.getNativeIterator = function () {
        return new iterator_1.SparseIntervalsIterator(this);
    };
    SparseIntervals.prototype.getObjectsIterator = function (objects) {
        return new objects_iterator_1.SparseObjectsIterator(this, objects);
    };
    return SparseIntervals;
}());
exports.SparseIntervals = SparseIntervals;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseIntervalsIterator = void 0;
var SparseIntervalsIterator = (function () {
    function SparseIntervalsIterator(sparseIntervals) {
        this.sparseIntervals = sparseIntervals;
        this.intervalIndex = -1;
    }
    Object.defineProperty(SparseIntervalsIterator.prototype, "isStarted", {
        get: function () {
            return !!this.curr;
        },
        enumerable: false,
        configurable: true
    });
    SparseIntervalsIterator.prototype.moveNext = function () {
        if (this.curr && this.posInInterval + 1 < this.curr.length) {
            this.posInInterval++;
            this.index++;
            this.initObject();
            return true;
        }
        if (this.intervalIndex + 1 < this.sparseIntervals.numIntervals) {
            this.intervalIndex++;
            this.curr = this.sparseIntervals.getInterval(this.intervalIndex);
            if (!this.curr.length)
                return this.moveNext();
            this.posInInterval = 0;
            this.index = this.curr.start;
            this.initObject();
            return true;
        }
        return false;
    };
    SparseIntervalsIterator.prototype.movePrev = function () {
        if (this.curr && this.posInInterval - 1 >= this.curr.start) {
            this.posInInterval--;
            this.index--;
            this.initObject();
            return true;
        }
        if (!this.isStarted)
            this.intervalIndex = this.sparseIntervals.numIntervals;
        if (this.intervalIndex - 1 >= 0) {
            this.intervalIndex--;
            this.curr = this.sparseIntervals.getInterval(this.intervalIndex);
            this.posInInterval = Math.max(this.curr.length - 1, this.curr.start);
            this.index = this.curr.start;
            this.initObject();
            return true;
        }
        return false;
    };
    SparseIntervalsIterator.prototype.initObject = function () { };
    return SparseIntervalsIterator;
}());
exports.SparseIntervalsIterator = SparseIntervalsIterator;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DomUtils = void 0;
var browser_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var math_1 = __webpack_require__(6);
var string_1 = __webpack_require__(3);
var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.clearInnerHtml = function (element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    };
    DomUtils.setStylePosition = function (style, point) {
        style.left = math_1.MathUtils.round(point.x, 3) + 'px';
        style.top = math_1.MathUtils.round(point.y, 3) + 'px';
    };
    DomUtils.setStyleSize = function (style, size) {
        style.width = math_1.MathUtils.round(size.width, 3) + 'px';
        style.height = math_1.MathUtils.round(size.height, 3) + 'px';
    };
    DomUtils.setStyleSizeAndPosition = function (style, rectangle) {
        DomUtils.setStylePosition(style, rectangle);
        DomUtils.setStyleSize(style, rectangle);
    };
    DomUtils.hideNode = function (node) {
        if (node) {
            var parentNode = node.parentNode;
            if (parentNode)
                parentNode.removeChild(node);
        }
    };
    DomUtils.isHTMLElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isTextNode = function (node) {
        return node.nodeType === Node.TEXT_NODE;
    };
    DomUtils.isElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isHTMLTableRowElement = function (element) {
        return element.tagName === 'TR';
    };
    DomUtils.isItParent = function (parentElement, element) {
        if (!parentElement || !element)
            return false;
        while (element) {
            if (element === parentElement)
                return true;
            if (element.tagName === 'BODY')
                return false;
            element = element.parentNode;
        }
        return false;
    };
    DomUtils.getParentByTagName = function (element, tagName) {
        tagName = tagName.toUpperCase();
        while (element) {
            if (element.tagName === 'BODY')
                return null;
            if (element.tagName === tagName)
                return element;
            element = element.parentNode;
        }
        return null;
    };
    DomUtils.getDocumentScrollTop = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollTop > 0;
        if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge || isScrollBodyIE) {
            if (browser_1.Browser.MacOSMobilePlatform)
                return window.pageYOffset;
            if (browser_1.Browser.WebKitFamily)
                return document.documentElement.scrollTop || document.body.scrollTop;
            return document.body.scrollTop;
        }
        else
            return document.documentElement.scrollTop;
    };
    DomUtils.getDocumentScrollLeft = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollLeft > 0;
        if (browser_1.Browser.Edge || isScrollBodyIE)
            return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
        if (browser_1.Browser.WebKitFamily)
            return document.documentElement.scrollLeft || document.body.scrollLeft;
        return document.documentElement.scrollLeft;
    };
    DomUtils.getCurrentStyle = function (element) {
        if (element.currentStyle)
            return element.currentStyle;
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var result = document.defaultView.getComputedStyle(element, null);
            if (!result && browser_1.Browser.Firefox && window.frameElement) {
                var changes = [];
                var curElement = window.frameElement;
                while (!(result = document.defaultView.getComputedStyle(element, null))) {
                    changes.push([curElement, curElement.style.display]);
                    curElement.style.setProperty('display', 'block', 'important');
                    curElement = curElement.tagName === 'BODY' ? curElement.ownerDocument.defaultView.frameElement : curElement.parentNode;
                }
                result = cloneObject(result);
                for (var ch = void 0, i = 0; ch = changes[i]; i++)
                    ch[0].style.display = ch[1];
                document.body.offsetWidth;
            }
            return result;
        }
        return window.getComputedStyle(element, null);
    };
    DomUtils.setFocus = function (element) {
        function focusCore() {
            try {
                element.focus();
                if (browser_1.Browser.IE && document.activeElement !== element)
                    element.focus();
            }
            catch (e) {
            }
        }
        if (browser_1.Browser.MacOSMobilePlatform)
            focusCore();
        else {
            setTimeout(function () {
                focusCore();
            }, 100);
        }
    };
    DomUtils.hasClassName = function (element, className) {
        try {
            var classNames = className.split(' ');
            var classList = element.classList;
            if (classList) {
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (!classList.contains(classNames[i]))
                        return false;
                }
            }
            else {
                var elementClassName = element.getAttribute && element.getAttribute('class');
                if (!elementClassName)
                    return false;
                var elementClasses = elementClassName.split(' ');
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (elementClasses.indexOf(classNames[i]) < 0)
                        return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    DomUtils.addClassName = function (element, className) {
        if (!DomUtils.hasClassName(element, className)) {
            var elementClassName = element.getAttribute && element.getAttribute('class');
            element.setAttribute('class', elementClassName === '' ? className : elementClassName + " " + className);
        }
    };
    DomUtils.removeClassName = function (element, className) {
        var elementClassName = element.getAttribute && element.getAttribute('class');
        var updClassName = " " + elementClassName + " ";
        var newClassName = updClassName.replace(" " + className + " ", ' ');
        if (updClassName.length !== newClassName.length)
            element.setAttribute('class', string_1.StringUtils.trim(newClassName));
    };
    DomUtils.toggleClassName = function (element, className, toggle) {
        if (toggle === undefined) {
            if (DomUtils.hasClassName(element, className))
                DomUtils.removeClassName(element, className);
            else
                DomUtils.addClassName(element, className);
        }
        else {
            if (toggle)
                DomUtils.addClassName(element, className);
            else
                DomUtils.removeClassName(element, className);
        }
    };
    DomUtils.pxToInt = function (px) {
        return pxToNumber(px, parseInt);
    };
    DomUtils.pxToFloat = function (px) {
        return pxToNumber(px, parseFloat);
    };
    DomUtils.getAbsolutePositionY = function (element) {
        function getAbsolutePositionY_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop();
        }
        function getAbsolutePositionY_FF3(element) {
            return Math.round(element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop());
        }
        function getAbsolutePositionY_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderTopWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionY_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionY_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionY_FF3(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionY_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionY_FF3(element);
        return getAbsolutePositionY_Other(element);
    };
    DomUtils.getAbsolutePositionX = function (element) {
        function getAbsolutePositionX_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft();
        }
        function getAbsolutePositionX_FF3(element) {
            return Math.round(element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft());
        }
        function getAbsolutePositionX_Opera(curEl) {
            var isFirstCycle = true;
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle)
                    pos -= curEl.scrollLeft;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollLeft;
            return pos;
        }
        function getAbsolutePositionX_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderLeftWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionX_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionX_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionX_FF3(element);
        else if (browser_1.Browser.Opera && browser_1.Browser.Version <= 12)
            return getAbsolutePositionX_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionX_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionX_FF3(element);
        else
            return getAbsolutePositionX_Other(element);
    };
    DomUtils.isInteractiveControl = function (element) {
        return ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'BUTTON', 'IFRAME'].indexOf(element.tagName) > -1;
    };
    DomUtils.getClearClientHeight = function (element) {
        return element.offsetHeight - (DomUtils.getTopBottomPaddings(element) + DomUtils.getVerticalBordersWidth(element));
    };
    DomUtils.getTopBottomPaddings = function (element, style) {
        var currentStyle = style ? style : DomUtils.getCurrentStyle(element);
        return DomUtils.pxToInt(currentStyle.paddingTop) + DomUtils.pxToInt(currentStyle.paddingBottom);
    };
    DomUtils.getVerticalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && browser_1.Browser.MajorVersion !== 9 && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderTopStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderTopWidth);
        if (style.borderBottomStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderBottomWidth);
        return res;
    };
    DomUtils.getNodes = function (parent, predicate) {
        var collection = parent.all || parent.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getChildNodes = function (parent, predicate) {
        var collection = parent.childNodes;
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getNodesByClassName = function (parent, className) {
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            var result_1 = [];
            children.forEach(function (element) { return result_1.push(element); });
            return result_1;
        }
        else
            return DomUtils.getNodes(parent, function (elem) { return DomUtils.hasClassName(elem, className); });
    };
    DomUtils.getChildNodesByClassName = function (parent, className) {
        function nodeListToArray(nodeList, filter) {
            var result = [];
            for (var i = 0; i < nodeList.length; i++) {
                var element = nodeList[i];
                if (filter(element))
                    result.push(element);
            }
            return result;
        }
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            return nodeListToArray(children, function (element) { return element.parentNode === parent; });
        }
        else {
            return DomUtils.getChildNodes(parent, function (elem) {
                if (DomUtils.isElementNode(elem))
                    return common_1.isNonNullString(elem.className) && DomUtils.hasClassName(elem, elem.className);
                else
                    return false;
            });
        }
    };
    DomUtils.getVerticalScrollBarWidth = function () {
        if (DomUtils.verticalScrollBarWidth === undefined) {
            var container = document.createElement('DIV');
            container.style.cssText = 'position: absolute; top: 0px; left: 0px; visibility: hidden; width: 200px; height: 150px; overflow: hidden; box-sizing: content-box';
            document.body.appendChild(container);
            var child = document.createElement('P');
            container.appendChild(child);
            child.style.cssText = 'width: 100%; height: 200px;';
            var widthWithoutScrollBar = child.offsetWidth;
            container.style.overflow = 'scroll';
            var widthWithScrollBar = child.offsetWidth;
            if (widthWithoutScrollBar === widthWithScrollBar)
                widthWithScrollBar = container.clientWidth;
            DomUtils.verticalScrollBarWidth = widthWithoutScrollBar - widthWithScrollBar;
            document.body.removeChild(container);
        }
        return DomUtils.verticalScrollBarWidth;
    };
    DomUtils.getHorizontalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderLeftStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderLeftWidth);
        if (style.borderRightStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderRightWidth);
        return res;
    };
    DomUtils.getFontFamiliesFromCssString = function (cssString) {
        return cssString.split(',').map(function (fam) { return string_1.StringUtils.trim(fam.replace(/'|"/gi, '')); });
    };
    DomUtils.getInnerText = function (container) {
        if (browser_1.Browser.Safari && browser_1.Browser.MajorVersion <= 5) {
            if (DomUtils.html2PlainTextFilter === null) {
                DomUtils.html2PlainTextFilter = document.createElement('DIV');
                DomUtils.html2PlainTextFilter.style.width = '0';
                DomUtils.html2PlainTextFilter.style.height = '0';
                DomUtils.html2PlainTextFilter.style.overflow = 'visible';
                DomUtils.html2PlainTextFilter.style.display = 'none';
                document.body.appendChild(DomUtils.html2PlainTextFilter);
            }
            var filter = DomUtils.html2PlainTextFilter;
            filter.innerHTML = container.innerHTML;
            filter.style.display = '';
            var innerText = filter.innerText;
            filter.style.display = 'none';
            return innerText;
        }
        else if (browser_1.Browser.NetscapeFamily || browser_1.Browser.WebKitFamily || (browser_1.Browser.IE && browser_1.Browser.Version >= 9) || browser_1.Browser.Edge)
            return container.textContent;
        else
            return container.innerText;
    };
    DomUtils.html2PlainTextFilter = null;
    DomUtils.verticalScrollBarWidth = undefined;
    return DomUtils;
}());
exports.DomUtils = DomUtils;
function cloneObject(srcObject) {
    if (typeof (srcObject) !== 'object' || !common_1.isDefined(srcObject))
        return srcObject;
    var newObject = {};
    for (var i in srcObject)
        newObject[i] = srcObject[i];
    return newObject;
}
function pxToNumber(px, parseFunction) {
    var result = 0;
    if (common_1.isDefined(px) && px !== '') {
        try {
            var indexOfPx = px.indexOf('px');
            if (indexOfPx > -1)
                result = parseFunction(px.substr(0, indexOfPx));
        }
        catch (e) { }
    }
    return result;
}
function getAbsoluteScrollOffset_OperaFF(curEl, isX) {
    var pos = 0;
    var isFirstCycle = true;
    while (curEl != null) {
        if (curEl.tagName === 'BODY')
            break;
        var style = DomUtils.getCurrentStyle(curEl);
        if (style.position === 'absolute')
            break;
        if (!isFirstCycle && curEl.tagName === 'DIV' && (style.position === '' || style.position === 'static'))
            pos -= isX ? curEl.scrollLeft : curEl.scrollTop;
        curEl = curEl.parentNode;
        isFirstCycle = false;
    }
    return pos;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Flag = void 0;
var Flag = (function () {
    function Flag(initValue) {
        if (initValue === void 0) { initValue = 0; }
        this.value = initValue;
    }
    Flag.prototype.get = function (enumVal) {
        return (this.value & enumVal) === enumVal;
    };
    Flag.prototype.set = function (enumVal, newValue) {
        var currVal = (this.value & enumVal) === enumVal;
        if (currVal !== newValue) {
            if (newValue)
                this.value |= enumVal;
            else
                this.value ^= enumVal;
        }
        return this;
    };
    Flag.prototype.add = function (value) {
        this.value |= value;
    };
    Flag.prototype.anyOf = function () {
        var flags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            flags[_i] = arguments[_i];
        }
        for (var _a = 0, flags_1 = flags; _a < flags_1.length; _a++) {
            var flag = flags_1[_a];
            if ((this.value & flag) === flag)
                return true;
        }
        return false;
    };
    Flag.prototype.getValue = function () {
        return this.value;
    };
    Flag.prototype.clone = function () {
        return new Flag(this.value);
    };
    return Flag;
}());
exports.Flag = Flag;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringMapUtils = void 0;
var min_max_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(12);
var StringMapUtils = (function () {
    function StringMapUtils() {
    }
    StringMapUtils.forEach = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                callback(map[key], key);
        }
    };
    StringMapUtils.map = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                result[key] = callback(map[key], key);
        }
        return result;
    };
    StringMapUtils.reducedMap = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var newItem = callback(map[key], key);
                if (newItem !== null)
                    result[key] = newItem;
            }
        }
        return result;
    };
    StringMapUtils.clear = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                delete map[key];
        }
    };
    StringMapUtils.shallowCopy = function (map) {
        return StringMapUtils.map(map, function (val) { return val; });
    };
    StringMapUtils.deepCopy = function (map) {
        return StringMapUtils.map(map, function (val) { return val.clone(); });
    };
    StringMapUtils.isEmpty = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                return false;
        }
        return true;
    };
    StringMapUtils.accumulate = function (map, initAccValue, callback) {
        var acc = initAccValue;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                acc = callback(acc, map[key], key);
        }
        return acc;
    };
    StringMapUtils.keyBy = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (callback(map[key], key))
                    return key;
            }
        }
        return null;
    };
    StringMapUtils.elementBy = function (map, callback) {
        var key = StringMapUtils.keyBy(map, callback);
        return key === null ? null : map[key];
    };
    StringMapUtils.containsBy = function (map, callback) {
        return StringMapUtils.keyBy(map, callback) !== null;
    };
    StringMapUtils.toList = function (map) {
        return StringMapUtils.toListBy(map, function (elem) { return elem; });
    };
    StringMapUtils.toListBy = function (map, callback, maxElements) {
        if (maxElements === void 0) { maxElements = constants_1.Constants.MAX_SAFE_INTEGER; }
        var result = [];
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                result.push(callback(map[key], key));
                if (!--maxElements)
                    break;
            }
        }
        return result;
    };
    StringMapUtils.anyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], key);
                if (res !== null)
                    return res;
            }
        }
        return null;
    };
    StringMapUtils.unsafeAnyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], key);
                if (res)
                    return res;
            }
        }
        return null;
    };
    StringMapUtils.allOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (!callback(map[key], key))
                    return false;
            }
        }
        return true;
    };
    StringMapUtils.mapLength = function (map) {
        var length = 0;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                length++;
        }
        return length;
    };
    StringMapUtils.min = function (map, getValue) {
        var res = StringMapUtils.minExtended(map, getValue);
        return res === null ? null : res.minElement;
    };
    StringMapUtils.max = function (map, getValue) {
        var res = StringMapUtils.maxExtended(map, getValue);
        return res === null ? null : res.maxElement;
    };
    StringMapUtils.minMax = function (map, getValue) {
        var res = StringMapUtils.minMaxExtended(map, getValue);
        return res === null ? null : new min_max_1.MinMax(res.minElement, res.maxElement);
    };
    StringMapUtils.minExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMin(minElement, minValue);
    };
    StringMapUtils.maxExtended = function (map, getValue) {
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return maxElement === undefined ? null : new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    StringMapUtils.minMaxExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, key);
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
                else if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    StringMapUtils.maxByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) > 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    StringMapUtils.minByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) < 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    return StringMapUtils;
}());
exports.StringMapUtils = StringMapUtils;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormatter = void 0;
var NumberFormatter = (function () {
    function NumberFormatter(options) {
        this.positive = true;
        this.digits = [];
        this.pointPos = 0;
        this.spec = '';
        this.prec = -1;
        this.upper = true;
        this.custom = false;
        this.options = options;
    }
    NumberFormatter.prototype.format = function (format, value) {
        if (isNaN(value))
            return this.options.numNan;
        if (!isFinite(value)) {
            return value > 0 ?
                this.options.numPosInf :
                this.options.numNegInf;
        }
        this.fillFormatInfo(format);
        if (this.spec === 'X')
            return this.formatHex(value);
        this.fillDigitInfo(value);
        switch (this.spec) {
            case 'C':
                return this.formatCurrency();
            case 'D':
                return this.formatDecimal();
            case 'E':
                return this.formatExp();
            case 'F':
                return this.formatFixed();
            case 'G':
                return this.formatGeneral();
            case 'N':
                return this.formatNumber();
            case 'P':
                return this.formatPercent();
            default:
                if (this.custom)
                    return this.formatCustom(format);
                return '?';
        }
    };
    NumberFormatter.prototype.formatCurrency = function () {
        if (this.prec < 0)
            this.prec = this.options.currPrec;
        this.round(this.prec);
        var bag = [];
        if (this.positive) {
            switch (this.options.currPosPattern) {
                case 0:
                    bag.push(this.options.currency);
                    break;
                case 2:
                    bag.push(this.options.currency, ' ');
                    break;
            }
        }
        else {
            switch (this.options.currNegPattern) {
                case 0:
                    bag.push('(', this.options.currency);
                    break;
                case 1:
                    bag.push('-', this.options.currency);
                    break;
                case 2:
                    bag.push(this.options.currency, '-');
                    break;
                case 3:
                    bag.push(this.options.currency);
                    break;
                case 4:
                    bag.push('(');
                    break;
                case 5:
                case 8:
                    bag.push('-');
                    break;
                case 9:
                    bag.push('-', this.options.currency, ' ');
                    break;
                case 11:
                    bag.push(this.options.currency, ' ');
                    break;
                case 12:
                    bag.push(this.options.currency, ' -');
                    break;
                case 14:
                    bag.push('(', this.options.currency, ' ');
                    break;
                case 15:
                    bag.push('(');
                    break;
            }
        }
        this.appendGroupedInteger(bag, this.options.currGroups, this.options.currGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.currDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        if (this.positive) {
            switch (this.options.currPosPattern) {
                case 1:
                    bag.push(this.options.currency);
                    break;
                case 3:
                    bag.push(' ', this.options.currency);
                    break;
            }
        }
        else {
            switch (this.options.currNegPattern) {
                case 0:
                case 14:
                    bag.push(')');
                    break;
                case 3:
                    bag.push('-');
                    break;
                case 4:
                    bag.push(this.options.currency, ')');
                    break;
                case 5:
                    bag.push(this.options.currency);
                    break;
                case 6:
                    bag.push('-', this.options.currency);
                    break;
                case 7:
                    bag.push(this.options.currency, '-');
                    break;
                case 8:
                    bag.push(' ', this.options.currency);
                    break;
                case 10:
                    bag.push(' ', this.options.currency, '-');
                    break;
                case 11:
                    bag.push('-');
                    break;
                case 13:
                    bag.push('- ', this.options.currency);
                    break;
                case 15:
                    bag.push(' ', this.options.currency, ')');
                    break;
            }
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatDecimal = function () {
        if (this.prec < this.pointPos)
            this.prec = this.pointPos;
        if (this.prec < 1)
            return '0';
        var bag = [];
        if (!this.positive)
            bag.push('-');
        this.appendDigits(bag, this.pointPos - this.prec, this.pointPos);
        return bag.join('');
    };
    NumberFormatter.prototype.formatExp = function () {
        if (this.prec < 0)
            this.prec = 6;
        this.round(1 - this.pointPos + this.prec);
        return this.formatExpCore(3);
    };
    NumberFormatter.prototype.formatExpCore = function (minExpDigits) {
        var bag = [];
        if (!this.positive)
            bag.push('-');
        this.appendDigits(bag, 0, 1);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, 1, 1 + this.prec);
        }
        bag.push(this.upper ? 'E' : 'e');
        var order = this.pointPos - 1;
        if (order >= 0)
            bag.push('+');
        else {
            bag.push('-');
            order = -order;
        }
        var orderStr = String(order);
        for (var i = orderStr.length; i < minExpDigits; i++)
            bag.push(0);
        bag.push(orderStr);
        return bag.join('');
    };
    NumberFormatter.prototype.formatFixed = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        this.round(this.prec);
        var bag = [];
        if (!this.positive)
            bag.push('-');
        if (this.pointPos < 1)
            bag.push(0);
        else
            this.appendDigits(bag, 0, this.pointPos);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatGeneral = function () {
        var hasFrac = this.pointPos < this.digits.length;
        var allowExp;
        if (this.prec < 0) {
            allowExp = hasFrac;
            this.prec = hasFrac ? 15 : 10;
        }
        else {
            allowExp = true;
            if (this.prec < 1)
                this.prec = hasFrac ? 15 : 10;
            this.round(this.prec - this.pointPos);
        }
        if (allowExp) {
            if (this.pointPos > this.prec || this.pointPos <= -4) {
                this.prec = this.digits.length - 1;
                return this.formatExpCore(2);
            }
        }
        this.prec = Math.min(this.prec, Math.max(1, this.digits.length)) - this.pointPos;
        return this.formatFixed();
    };
    NumberFormatter.prototype.formatNumber = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        this.round(this.prec);
        var bag = [];
        if (!this.positive) {
            switch (this.options.numNegPattern) {
                case 0:
                    bag.push('(');
                    break;
                case 1:
                    bag.push('-');
                    break;
                case 2:
                    bag.push('- ');
                    break;
            }
        }
        this.appendGroupedInteger(bag, this.options.numGroups, this.options.numGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        if (!this.positive) {
            switch (this.options.numNegPattern) {
                case 0:
                    bag.push(')');
                    break;
                case 3:
                    bag.push('-');
                    break;
                case 4:
                    bag.push(' -');
                    break;
            }
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatPercent = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        if (this.digits.length > 0)
            this.pointPos += 2;
        this.round(this.prec);
        var bag = [];
        if (!this.positive)
            bag.push('-');
        if (this.options.percentPattern === 2)
            bag.push('%');
        this.appendGroupedInteger(bag, this.options.numGroups, this.options.numGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        switch (this.options.percentPattern) {
            case 0:
                bag.push(' %');
                break;
            case 1:
                bag.push('%');
                break;
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatHex = function (value) {
        var result = value.toString(16);
        if (result.indexOf('(') > -1)
            return result;
        result = this.upper ? result.toUpperCase() : result.toLowerCase();
        if (this.prec <= result.length)
            return result;
        var bag = [];
        for (var i = result.length; i < this.prec; i++)
            bag.push(0);
        bag.push(result);
        return bag.join('');
    };
    NumberFormatter.prototype.formatCustom = function (format) {
        var sectionList = NumberFormatter.getCustomFormatSections(format);
        var section = this.selectCustomFormatSection(sectionList);
        if (section === '')
            return this.positive ? '' : '-';
        var info = NumberFormatter.parseCustomFormatSection(section);
        var lists = this.createCustomFormatLists(info);
        if (sectionList.length > 2 && section !== sectionList[2]) {
            var zero = lists.i.concat(lists.f).join('').split('0').join('') === '';
            if (zero) {
                section = sectionList[2];
                info = NumberFormatter.parseCustomFormatSection(section);
                lists = this.createCustomFormatLists(info);
            }
        }
        return this.formatCustomCore(section, info, lists);
    };
    NumberFormatter.getCustomFormatSections = function (format) {
        var sections = [];
        var escaping = false;
        var quote = '';
        var length = 0;
        var prevPos = 0;
        for (var i = 0; i < format.length; i++) {
            var ch = format.charAt(i);
            if (!escaping && quote === '' && ch === ';') {
                sections.push(format.substr(prevPos, length));
                length = 0;
                prevPos = i + 1;
                if (sections.length > 2)
                    break;
            }
            else {
                if (escaping)
                    escaping = false;
                else if (ch === quote)
                    quote = quote === '' ? ch : '';
                else if (ch === '\\')
                    escaping = true;
                else if (ch === '\'' || ch === '"')
                    quote = ch;
                ++length;
            }
        }
        if (length > 0)
            sections.push(format.substr(prevPos, length));
        if (sections.length < 1)
            sections.push(format);
        return sections;
    };
    NumberFormatter.prototype.selectCustomFormatSection = function (sections) {
        if (!this.positive && sections.length > 1 && sections[1] !== '') {
            this.positive = true;
            return sections[1];
        }
        if (this.digits.length < 1 && sections.length > 2 && sections[2] !== '')
            return sections[2];
        return sections[0];
    };
    NumberFormatter.createCustomFormatInfo = function () {
        return {
            pointPos: -1,
            grouping: false,
            exp: false,
            expShowPlus: false,
            percent: false,
            scaling: 0,
            intDigits: 0,
            fracDigits: 0,
            expDigits: 0,
            intSharps: 0,
            fracSharps: 0,
            expSharps: 0
        };
    };
    NumberFormatter.parseCustomFormatSection = function (section) {
        var quote = '';
        var area = 'i';
        var canParseIntSharps = true;
        var result = NumberFormatter.createCustomFormatInfo();
        var groupSeparators = 0;
        for (var i = 0; i < section.length; i++) {
            var ch = section.charAt(i);
            if (ch === quote) {
                quote = '';
                continue;
            }
            if (quote !== '')
                continue;
            if (area === 'e' && ch !== '0' && ch !== '#') {
                area = result.pointPos < 0 ? 'i' : 'f';
                i--;
                continue;
            }
            switch (ch) {
                case '\\':
                    i++;
                    continue;
                case '\'':
                case '"':
                    quote = ch;
                    continue;
                case '#':
                case '0':
                    if (ch === '#') {
                        switch (area) {
                            case 'i':
                                if (canParseIntSharps)
                                    result.intSharps++;
                                break;
                            case 'f':
                                result.fracSharps++;
                                break;
                            case 'e':
                                result.expSharps++;
                                break;
                        }
                    }
                    else {
                        canParseIntSharps = false;
                        switch (area) {
                            case 'f':
                                result.fracSharps = 0;
                                break;
                            case 'e':
                                result.expSharps = 0;
                                break;
                        }
                    }
                    switch (area) {
                        case 'i':
                            result.intDigits++;
                            if (groupSeparators > 0)
                                result.grouping = true;
                            groupSeparators = 0;
                            break;
                        case 'f':
                            result.fracDigits++;
                            break;
                        case 'e':
                            result.expDigits++;
                            break;
                    }
                    break;
                case 'e':
                case 'E':
                    if (result.exp)
                        break;
                    result.exp = true;
                    area = 'e';
                    if (i < section.length - 1) {
                        var next = section.charAt(1 + i);
                        if (next === '+' || next === '-') {
                            if (next === '+')
                                result.expShowPlus = true;
                            i++;
                        }
                        else if (next !== '0' && next !== '#') {
                            result.exp = false;
                            if (result.pointPos < 0)
                                area = 'i';
                        }
                    }
                    break;
                case '.':
                    area = 'f';
                    if (result.pointPos < 0)
                        result.pointPos = i;
                    break;
                case '%':
                    result.percent = true;
                    break;
                case ',':
                    if (area === 'i' && result.intDigits > 0)
                        groupSeparators++;
                    break;
                default:
                    break;
            }
        }
        if (result.expDigits < 1)
            result.exp = false;
        else
            result.intSharps = 0;
        if (result.fracDigits < 1)
            result.pointPos = -1;
        result.scaling = 3 * groupSeparators;
        return result;
    };
    NumberFormatter.prototype.createCustomFormatLists = function (info) {
        var intList = [];
        var fracList = [];
        var expList = [];
        if (this.digits.length > 0) {
            if (info.percent)
                this.pointPos += 2;
            this.pointPos -= info.scaling;
        }
        var expPositive = true;
        if (info.exp && (info.intDigits > 0 || info.fracDigits > 0)) {
            var diff = 0;
            if (this.digits.length > 0) {
                this.round(info.intDigits + info.fracDigits - this.pointPos);
                diff -= this.pointPos - info.intDigits;
                this.pointPos = info.intDigits;
            }
            expPositive = diff <= 0;
            expList = String(diff < 0 ? -diff : diff).split('');
        }
        else
            this.round(info.fracDigits);
        if (this.digits.length < 1 || this.pointPos < 1)
            intList = [0];
        else
            this.appendDigits(intList, 0, this.pointPos);
        this.appendDigits(fracList, this.pointPos, this.digits.length);
        if (info.exp) {
            while (intList.length < info.intDigits)
                intList.unshift(0);
            while (expList.length < info.expDigits - info.expSharps)
                expList.unshift(0);
            if (expPositive && info.expShowPlus)
                expList.unshift('+');
            else if (!expPositive)
                expList.unshift('-');
        }
        else {
            while (intList.length < info.intDigits - info.intSharps)
                intList.unshift(0);
            if (info.intSharps >= info.intDigits) {
                var zero = true;
                for (var i = 0; i < intList.length; i++) {
                    if (intList[i] !== 0) {
                        zero = false;
                        break;
                    }
                }
                if (zero)
                    intList = [];
            }
        }
        while (fracList.length < info.fracDigits - info.fracSharps)
            fracList.push(0);
        return {
            i: intList,
            f: fracList,
            e: expList
        };
    };
    NumberFormatter.prototype.formatCustomCore = function (section, info, lists) {
        var intLen = 0;
        var total = 0;
        var groupIndex = 0;
        var counter = 0;
        var groupSize = 0;
        if (info.grouping && this.options.numGroups.length > 0) {
            intLen = lists.i.length;
            for (var i = 0; i < this.options.numGroups.length; i++) {
                if (total + this.options.numGroups[i] <= intLen) {
                    total += this.options.numGroups[i];
                    groupIndex = i;
                }
            }
            groupSize = this.options.numGroups[groupIndex];
            var fraction = intLen > total ? intLen - total : 0;
            if (groupSize === 0) {
                while (groupIndex >= 0 && this.options.numGroups[groupIndex] === 0)
                    groupIndex--;
                groupSize = fraction > 0 ? fraction : this.options.numGroups[groupIndex];
            }
            if (fraction === 0)
                counter = groupSize;
            else {
                groupIndex += Math.floor(fraction / groupSize);
                counter = fraction % groupSize;
                if (counter === 0)
                    counter = groupSize;
                else
                    groupIndex++;
            }
        }
        else
            info.grouping = false;
        var bag = [];
        var area = 'i';
        var intSharps = 0;
        var intListIndex = 0;
        var fracListIndex = 0;
        var savedCh = '';
        for (var i = 0; i < section.length; i++) {
            var ch = section.charAt(i);
            if (ch === savedCh) {
                savedCh = '';
                continue;
            }
            if (savedCh !== '') {
                bag.push(ch);
                continue;
            }
            switch (ch) {
                case '\\':
                    ++i;
                    if (i < section.length)
                        bag.push(section.charAt(i));
                    continue;
                case '\'':
                case '"':
                    savedCh = ch;
                    continue;
                case '#':
                case '0':
                    if (area === 'i') {
                        intSharps++;
                        if (ch === '0' || info.intDigits - intSharps < lists.i.length + intListIndex) {
                            while (info.intDigits - intSharps + intListIndex < lists.i.length) {
                                bag.push(lists.i[intListIndex].toString());
                                intListIndex++;
                                if (info.grouping && --intLen > 0 && --counter === 0) {
                                    bag.push(this.options.numGroupSeparator);
                                    if (--groupIndex < this.options.numGroups.length && groupIndex >= 0)
                                        groupSize = this.options.numGroups[groupIndex];
                                    counter = groupSize;
                                }
                            }
                        }
                    }
                    else if (area === 'f') {
                        if (fracListIndex < lists.f.length) {
                            bag.push(lists.f[fracListIndex].toString());
                            fracListIndex++;
                        }
                    }
                    break;
                case 'e':
                case 'E': {
                    if (lists.e == null || !info.exp) {
                        bag.push(ch);
                        break;
                    }
                    var q = i + 1;
                    for (; q < section.length; q++) {
                        if (q === i + 1 && (section.charAt(q) === '+' || section.charAt(q) === '-'))
                            continue;
                        if (section.charAt(q) === '0' || section.charAt(q) === '#')
                            continue;
                        break;
                    }
                    i = q - 1;
                    area = info.pointPos < 0 ? 'i' : 'f';
                    bag.push(ch);
                    bag = bag.concat(lists.e);
                    lists.e = null;
                    break;
                }
                case '.':
                    if (info.pointPos === i && lists.f.length > 0)
                        bag.push(this.options.numDecimalPoint);
                    area = 'f';
                    break;
                case ',':
                    break;
                default:
                    bag.push(ch);
                    break;
            }
        }
        if (!this.positive)
            bag.unshift('-');
        return bag.join('');
    };
    NumberFormatter.prototype.fillDigitInfo = function (value) {
        this.positive = true;
        if (value < 0) {
            value = -value;
            this.positive = false;
        }
        this.digits = [];
        this.pointPos = 0;
        if (value === 0 || !isFinite(value) || isNaN(value)) {
            this.pointPos = 1;
            return;
        }
        var list = String(value).split('e');
        var str = list[0];
        if (list.length > 1)
            this.pointPos = Number(list[1]);
        var frac = false;
        var decimalCount = 0;
        for (var i = 0; i < str.length; i++) {
            var ch = str.charAt(i);
            if (ch === '.')
                frac = true;
            else {
                if (frac)
                    decimalCount++;
                if (ch !== '0' || this.digits.length > 0)
                    this.digits.push(Number(ch));
            }
        }
        this.pointPos += this.digits.length - decimalCount;
    };
    NumberFormatter.prototype.fillFormatInfo = function (format) {
        this.upper = true;
        this.custom = false;
        this.prec = -1;
        var spec;
        if (format == null || format.length < 1)
            spec = 'G';
        else
            spec = format.charAt(0);
        if (spec >= 'a' && spec <= 'z') {
            spec = spec.toUpperCase();
            this.upper = false;
        }
        if (spec >= 'A' && spec <= 'Z') {
            if (format != null && format.length > 1) {
                var prec = Number(format.substr(1));
                if (!isNaN(prec))
                    this.prec = prec;
                else
                    this.custom = true;
            }
        }
        else
            this.custom = true;
        this.spec = this.custom ? '0' : spec;
    };
    NumberFormatter.prototype.round = function (shift) {
        var amount = this.digits.length - this.pointPos - shift;
        if (amount <= 0)
            return;
        var cutPos = this.pointPos + shift;
        if (cutPos < 0) {
            this.digits = [];
            this.pointPos = 0;
            return;
        }
        var digit = this.digits[cutPos];
        if (digit > 4) {
            for (var i = 0; i < amount; i++) {
                var index = cutPos - 1 - i;
                if (index < 0) {
                    this.digits.unshift(0);
                    this.pointPos++;
                    cutPos++;
                    index++;
                }
                digit = this.digits[index];
                if (digit < 9) {
                    this.digits[index] = 1 + digit;
                    break;
                }
                else {
                    this.digits[index] = 0;
                    amount++;
                }
            }
        }
        for (var i = cutPos - 1; i >= 0; i--) {
            if (this.digits[i] > 0)
                break;
            cutPos--;
        }
        this.digits.splice(cutPos, this.digits.length - cutPos);
    };
    NumberFormatter.prototype.appendGroupedInteger = function (list, groups, separator) {
        if (this.pointPos < 1) {
            list.push(0);
            return;
        }
        var total = 0;
        var groupIndex = 0;
        for (var i = 0; i < groups.length; i++) {
            if (total + groups[i] <= this.pointPos) {
                total += groups[i];
                groupIndex = i;
            }
            else
                break;
        }
        if (groups.length > 0 && total > 0) {
            var counter = void 0;
            var groupSize = groups[groupIndex];
            var fraction = this.pointPos > total ? this.pointPos - total : 0;
            if (groupSize === 0) {
                while (groupIndex >= 0 && groups[groupIndex] === 0)
                    groupIndex--;
                groupSize = fraction > 0 ? fraction : groups[groupIndex];
            }
            if (fraction === 0)
                counter = groupSize;
            else {
                groupIndex += Math.floor(fraction / groupSize);
                counter = fraction % groupSize;
                if (counter === 0)
                    counter = groupSize;
                else
                    groupIndex++;
            }
            var i = 0;
            while (true) {
                if (this.pointPos - i <= counter || counter === 0) {
                    this.appendDigits(list, i, this.pointPos);
                    break;
                }
                this.appendDigits(list, i, i + counter);
                list.push(separator);
                i += counter;
                groupIndex--;
                if (groupIndex < groups.length && groupIndex >= 0)
                    groupSize = groups[groupIndex];
                counter = groupSize;
            }
        }
        else
            this.appendDigits(list, 0, this.pointPos);
    };
    NumberFormatter.prototype.appendDigits = function (list, start, end) {
        for (var i = start; i < end; i++) {
            if (i < 0 || i >= this.digits.length)
                list.push(0);
            else
                list.push(this.digits[i]);
        }
    };
    return NumberFormatter;
}());
exports.NumberFormatter = NumberFormatter;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFormatter = void 0;
var date_1 = __webpack_require__(11);
var date_utils_1 = __webpack_require__(10);
var StringFormatter = (function () {
    function StringFormatter(dateFormatter, numberFormatter) {
        this.activeDateFormat = null;
        this.dateFormatter = dateFormatter;
        this.numberFormatter = numberFormatter;
    }
    StringFormatter.prototype.format = function (pattern) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var bag = [];
        var pos = 0;
        var savedPos = 0;
        while (pos < pattern.length) {
            var ch = pattern.charAt(pos);
            pos++;
            if (ch === '{') {
                bag.push(pattern.substr(savedPos, pos - savedPos - 1));
                if (pattern.charAt(pos) === '{') {
                    savedPos = pos;
                    pos++;
                    continue;
                }
                var spec = this.parseSpec(pattern, pos);
                pos = spec.pos;
                var arg = args[spec.index];
                var argString = void 0;
                if (arg == null)
                    argString = '';
                else if (typeof arg === 'number')
                    argString = this.numberFormatter.format(spec.format, arg);
                else if (arg instanceof Date) {
                    if (spec.format !== this.activeDateFormat) {
                        this.activeDateFormat = spec.format;
                        if (spec.format === '')
                            spec.format = 'G';
                        if (spec.format.length === 1)
                            spec.format = date_1.DateFormatter.expandPredefinedFormat(spec.format, this.dateFormatter.options);
                        this.dateFormatter.setFormatString(spec.format);
                    }
                    if (this.activeDateFormat === 'U')
                        arg = date_utils_1.DateUtils.toUtcTime(arg);
                    argString = this.dateFormatter.format(arg);
                }
                else {
                    argString = String(arg);
                    if (spec.format !== '' && argString.length > 0) {
                        var num = Number(argString.replace(',', '.'));
                        if (!isNaN(num))
                            argString = this.numberFormatter.format(spec.format, num);
                    }
                }
                var padLen = spec.width - argString.length;
                if (padLen > 0) {
                    if (spec.left)
                        bag.push(argString);
                    for (var i = 0; i < padLen; i++)
                        bag.push(' ');
                    if (!spec.left)
                        bag.push(argString);
                }
                else
                    bag.push(argString);
                savedPos = pos;
            }
            else if (ch === '}' && pos < pattern.length && pattern.charAt(pos) === '}') {
                bag.push(pattern.substr(savedPos, pos - savedPos - 1));
                savedPos = pos;
                pos++;
            }
            else if (ch === '}')
                return '';
        }
        if (savedPos < pattern.length)
            bag.push(pattern.substr(savedPos));
        return bag.join('');
    };
    StringFormatter.prototype.parseSpec = function (format, pos) {
        var result = {
            index: -1,
            left: false,
            width: 0,
            format: '',
            pos: 0
        };
        var savedPos;
        var ch;
        savedPos = pos;
        while (true) {
            ch = format.charAt(pos);
            if (ch < '0' || ch > '9')
                break;
            pos++;
        }
        if (pos > savedPos)
            result.index = Number(format.substr(savedPos, pos - savedPos));
        if (format.charAt(pos) === ',') {
            pos++;
            while (true) {
                ch = format.charAt(pos);
                if (ch !== ' ' && ch !== '\t')
                    break;
                pos++;
            }
            result.left = format.charAt(pos) === '-';
            if (result.left)
                pos++;
            savedPos = pos;
            while (true) {
                ch = format.charAt(pos);
                if (ch < '0' || ch > '9')
                    break;
                pos++;
            }
            if (pos > savedPos)
                result.width = Number(format.substr(savedPos, pos - savedPos));
        }
        if (format.charAt(pos) === ':') {
            pos++;
            savedPos = pos;
            while (format.charAt(pos) !== '}')
                pos++;
            result.format = format.substr(savedPos, pos - savedPos);
        }
        pos++;
        result.pos = pos;
        return result;
    };
    return StringFormatter;
}());
exports.StringFormatter = StringFormatter;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Equals = exports.Comparers = void 0;
var Comparers = (function () {
    function Comparers() {
    }
    Comparers.number = function (a, b) {
        return a - b;
    };
    Comparers.string = function (a, b) {
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    Comparers.stringIgnoreCase = function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    return Comparers;
}());
exports.Comparers = Comparers;
var Equals = (function () {
    function Equals() {
    }
    Equals.simpleType = function (a, b) {
        return a === b;
    };
    Equals.object = function (a, b) {
        return a && b && (a === b || a.equals(b));
    };
    return Equals;
}());
exports.Equals = Equals;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
var Metrics = (function () {
    function Metrics() {
    }
    Metrics.euclideanDistance = function (a, b) {
        var xDist = a.x - b.x;
        var yDist = a.y - b.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    };
    Metrics.manhattanDistance = function (a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };
    return Metrics;
}());
exports.Metrics = Metrics;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalAlgorithms = void 0;
var list_1 = __webpack_require__(7);
var search_1 = __webpack_require__(9);
var fixed_1 = __webpack_require__(17);
var collector_1 = __webpack_require__(30);
var IntervalAlgorithms = (function () {
    function IntervalAlgorithms() {
    }
    IntervalAlgorithms.oneConstainsOtherArraysOfInterval = function (mergedIntervalsA, intervalsB) {
        var shouldBeContais = list_1.ListUtils.deepCopy(intervalsB);
        var currenInterval = shouldBeContais.pop();
        while (currenInterval) {
            if (!list_1.ListUtils.unsafeAnyOf(mergedIntervalsA, function (mergedInterval) { return mergedInterval.containsInterval(currenInterval); }))
                return false;
            currenInterval = shouldBeContais.pop();
        }
        return true;
    };
    IntervalAlgorithms.getIntersection = function (intervalA, intervalB) {
        return IntervalAlgorithms.getIntersectionTemplate(intervalA, intervalB, intervalA);
    };
    IntervalAlgorithms.getIntersectionTemplate = function (intervalA, intervalB, template) {
        var start = Math.max(intervalA.start, intervalB.start);
        var end = Math.min(intervalA.end, intervalB.end);
        if (start > end)
            return null;
        return template.makeByStartEnd(start, end);
    };
    IntervalAlgorithms.getIntersectionNonNullLength = function (intervalA, intervalB) {
        return IntervalAlgorithms.getIntersectionNonNullLengthTemplate(intervalA, intervalB, intervalA);
    };
    IntervalAlgorithms.getIntersectionNonNullLengthTemplate = function (intervalA, intervalB, template) {
        var inters = IntervalAlgorithms.getIntersectionTemplate(intervalA, intervalB, template);
        return inters && inters.length ? inters : null;
    };
    IntervalAlgorithms.getIntersectionsTwoArraysOfInterval = function (intervalsA, intervalsB) {
        return IntervalAlgorithms.getIntersectionsTwoArraysOfIntervalTemplate(intervalsA, intervalsB, intervalsA[0]);
    };
    IntervalAlgorithms.getIntersectionsTwoArraysOfIntervalTemplate = function (intervalsA, intervalsB, template) {
        var result = [];
        var lengthIntervalsA = intervalsA.length;
        var lengthIntervalsB = intervalsB.length;
        var intervalsAIndex = 0;
        var intervalsBIndex = 0;
        var currAInterval = intervalsA[intervalsAIndex];
        var currBInterval = intervalsB[intervalsBIndex];
        var currResultInterval = null;
        while (intervalsAIndex < lengthIntervalsA && intervalsBIndex < lengthIntervalsB) {
            var intersection = IntervalAlgorithms.getIntersectionTemplate(currAInterval, currBInterval, template);
            if (intersection) {
                if (currResultInterval && currResultInterval.end === intersection.start)
                    currResultInterval.length += intersection.length;
                else {
                    currResultInterval = intersection;
                    result.push(currResultInterval);
                }
            }
            if (currAInterval.end < currBInterval.end) {
                intervalsAIndex++;
                currAInterval = intervalsA[intervalsAIndex];
            }
            else {
                intervalsBIndex++;
                currBInterval = intervalsB[intervalsBIndex];
            }
        }
        return result;
    };
    IntervalAlgorithms.getAffectedObjects = function (objects, intervals, getFirstIndex, conflictResolver) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        if (conflictResolver === void 0) { conflictResolver = function (objectInterval, touchingIntervalLength, touchPoint) {
            return objectInterval.start === touchPoint && touchingIntervalLength === 0;
        }; }
        return IntervalAlgorithms.getAffectedObjectsTemplate(objects, intervals, intervals[0], getFirstIndex, conflictResolver);
    };
    IntervalAlgorithms.getAffectedObjectsTemplate = function (objects, intervals, template, getFirstIndex, conflictResolver) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        if (conflictResolver === void 0) { conflictResolver = function (objectInterval, touchingIntervalLength, touchPoint) {
            return objectInterval.start === touchPoint && touchingIntervalLength === 0;
        }; }
        var collector = new collector_1.SparseIntervalsCollector(template);
        for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
            var interval = intervals_1[_i];
            var ind = Math.max(0, getFirstIndex(interval.start, objects));
            for (var obj = void 0; obj = objects[ind]; ind++) {
                var objInterval = obj.interval;
                if (objInterval.start > interval.end)
                    break;
                var intersection = IntervalAlgorithms.getIntersectionTemplate(objInterval, interval, template);
                if (intersection && (intersection.length || conflictResolver(objInterval, interval.length, intersection.start)))
                    collector.add(ind);
            }
        }
        return collector.getIntervals();
    };
    IntervalAlgorithms.handleAffectedObjects = function (objects, intervals, callback, getFirstIndex) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        var template = new fixed_1.FixedInterval(0, 0);
        for (var _i = 0, intervals_2 = intervals; _i < intervals_2.length; _i++) {
            var interval = intervals_2[_i];
            var ind = Math.max(0, getFirstIndex(interval.start, objects));
            for (var obj = void 0; obj = objects[ind]; ind++) {
                var objInterval = obj.interval;
                if (objInterval.start > interval.end)
                    break;
                var intersection = IntervalAlgorithms.getIntersectionTemplate(objInterval, interval, template);
                if (intersection)
                    callback(obj, ind, interval, intersection);
            }
        }
    };
    IntervalAlgorithms.getMergedIntervals = function (intervals, needSort) {
        return IntervalAlgorithms.getMergedIntervalsTemplate(intervals, needSort, intervals[0]);
    };
    IntervalAlgorithms.getMergedIntervalsTemplate = function (intervals, needSort, template) {
        if (intervals.length < 2)
            return intervals.length > 0 ? [template.makeByStartLength(intervals[0].start, intervals[0].length)] : [];
        var sortedIntervals = needSort ?
            [].concat(intervals).sort(function (a, b) { return a.start - b.start; }) :
            intervals;
        var result = [];
        for (var i = 0, interval = void 0; interval = sortedIntervals[i];) {
            var minBound = interval.start;
            var maxBound = interval.end;
            for (++i; (interval = sortedIntervals[i]) !== undefined && (interval.start <= maxBound); i++) {
                if (interval.end > maxBound)
                    maxBound = interval.end;
            }
            result.push(template.makeByStartEnd(minBound, maxBound));
        }
        return result;
    };
    IntervalAlgorithms.reflectIntervals = function (intervals, bounds) {
        return IntervalAlgorithms.reflectIntervalsTemplate(intervals, bounds, bounds);
    };
    IntervalAlgorithms.reflectIntervalsTemplate = function (intervals, bounds, template) {
        if (!intervals.length)
            return [template.makeByStartLength(bounds.start, bounds.length)];
        var lastIntervalEnd = list_1.ListUtils.last(intervals).end;
        var result = list_1.ListUtils.reducedMap(intervals, function (curr, i) {
            return IntervalAlgorithms.getIntersectionNonNullLengthTemplate(template.makeByStartEnd(intervals[i - 1].end, curr.start), bounds, template);
        }, 1);
        if (bounds.start < intervals[0].start)
            result.unshift(template.makeByStartEnd(bounds.start, intervals[0].start));
        if (bounds.end > lastIntervalEnd)
            result.push(template.makeByStartEnd(lastIntervalEnd, bounds.end));
        return result;
    };
    IntervalAlgorithms.reflectionOfPointOnInterval = function (value, valInterval, targetInterval) {
        return (value - valInterval.start) / valInterval.length * targetInterval.length + targetInterval.start;
    };
    return IntervalAlgorithms;
}());
exports.IntervalAlgorithms = IntervalAlgorithms;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstInterval = void 0;
var ConstInterval = (function () {
    function ConstInterval() {
    }
    Object.defineProperty(ConstInterval.prototype, "center", {
        get: function () {
            return this.start + (this.length / 2);
        },
        enumerable: false,
        configurable: true
    });
    ConstInterval.prototype.isNormalized = function () {
        return this.end >= this.start;
    };
    ConstInterval.prototype.isCollapsed = function () {
        return this.length === 0;
    };
    ConstInterval.prototype.equals = function (obj) {
        return this.start === obj.start && this.end === obj.end;
    };
    ConstInterval.isCollapsed = function (intervals) {
        return !intervals[1] && intervals[0].isCollapsed();
    };
    ConstInterval.prototype.containsInterval = function (interval) {
        return this.start <= interval.start && this.end >= interval.end;
    };
    ConstInterval.prototype.containsIntervalWithoutEnd = function (interval) {
        return this.start <= interval.start && this.end > interval.end;
    };
    ConstInterval.prototype.contains = function (pos) {
        return this.start <= pos && pos < this.end;
    };
    ConstInterval.prototype.containsWithIntervalEnd = function (val) {
        return this.start <= val && val <= this.end;
    };
    ConstInterval.prototype.containsWithoutIntervalEndAndStart = function (pos) {
        return this.start < pos && pos < this.end;
    };
    return ConstInterval;
}());
exports.ConstInterval = ConstInterval;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseIntervalsCollector = void 0;
var intervals_1 = __webpack_require__(19);
var SparseIntervalsCollector = (function () {
    function SparseIntervalsCollector(template) {
        this.intervals = [];
        this.template = template;
    }
    SparseIntervalsCollector.prototype.add = function (index) {
        if (this.curr && this.curr.end === index) {
            this.curr.length++;
            return;
        }
        this.curr = this.template.makeByStartLength(index, 1);
        this.intervals.push(this.curr);
    };
    SparseIntervalsCollector.prototype.getIntervals = function () {
        return new intervals_1.SparseIntervals(this.intervals);
    };
    return SparseIntervalsCollector;
}());
exports.SparseIntervalsCollector = SparseIntervalsCollector;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseObjectsIterator = void 0;
var tslib_1 = __webpack_require__(1);
var iterator_1 = __webpack_require__(20);
var SparseObjectsIterator = (function (_super) {
    tslib_1.__extends(SparseObjectsIterator, _super);
    function SparseObjectsIterator(sparseIntervals, objects) {
        var _this = _super.call(this, sparseIntervals) || this;
        _this.objects = objects;
        return _this;
    }
    SparseObjectsIterator.prototype.initObject = function () {
        this.obj = this.objects[this.index];
    };
    return SparseObjectsIterator;
}(iterator_1.SparseIntervalsIterator));
exports.SparseObjectsIterator = SparseObjectsIterator;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    Size.empty = function () {
        return new Size(0, 0);
    };
    Size.fromNumber = function (num) {
        return new Size(num, num);
    };
    Size.initByCommonAction = function (action) {
        var widthAdp = function (s) { return s.width; };
        var heightAdp = function (s) { return s.height; };
        return new Size(action(widthAdp, heightAdp), action(heightAdp, widthAdp));
    };
    Size.prototype.isEmpty = function () {
        return this.width === 0 && this.height === 0;
    };
    Size.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Size.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Size.prototype.offset = function (offsetWidth, offsetHeight) {
        this.width = this.width + offsetWidth;
        this.height = this.height + offsetHeight;
        return this;
    };
    Size.prototype.multiply = function (multiplierW, multiplierH) {
        this.width *= multiplierW;
        this.height *= multiplierH;
        return this;
    };
    Size.prototype.equals = function (obj) {
        return this.width === obj.width && this.height === obj.height;
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    Size.prototype.copyFrom = function (obj) {
        this.width = obj.width;
        this.height = obj.height;
    };
    Size.prototype.applyConverter = function (conv) {
        this.width = conv(this.width);
        this.height = conv(this.height);
        return this;
    };
    Size.equals = function (a, b) {
        return a.width === b.width && a.height === b.height;
    };
    return Size;
}());
exports.Size = Size;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonalChain = void 0;
var list_1 = __webpack_require__(7);
var point_1 = __webpack_require__(4);
var rectangle_1 = __webpack_require__(16);
var segment_1 = __webpack_require__(15);
var vector_1 = __webpack_require__(14);
var PolygonalChain = (function () {
    function PolygonalChain(points) {
        this.points = [];
        this.points = points;
    }
    PolygonalChain.prototype.getSegment = function (edgeIndex) {
        return new segment_1.Segment(this.points[edgeIndex], this.points[(edgeIndex + 1)]);
    };
    Object.defineProperty(PolygonalChain.prototype, "bounds", {
        get: function () {
            var vertBounds = list_1.ListUtils.minMaxExtended(this.points, function (p) { return p.y; });
            var horBounds = list_1.ListUtils.minMaxExtended(this.points, function (p) { return p.x; });
            return new rectangle_1.Rectangle(horBounds.minValue, vertBounds.minValue, horBounds.maxValue - horBounds.minValue, vertBounds.maxValue - vertBounds.minValue);
        },
        enumerable: false,
        configurable: true
    });
    PolygonalChain.prototype.rotateAround = function (point, angle, rightSC, byClockwise) {
        if (rightSC === void 0) { rightSC = false; }
        if (byClockwise === void 0) { byClockwise = true; }
        var center = new point_1.Point(point.x, point.y);
        this.changeCoordinateCenterTo(center);
        var sinFi = Math.sin(angle);
        var cosFi = Math.cos(angle);
        var sign = (rightSC ? 1 : 0) ^ (byClockwise ? 1 : 0) ? -1 : 1;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var pt = _a[_i];
            var clone = pt.clone();
            pt.x = clone.x * cosFi + sign * clone.y * sinFi;
            pt.y = -sign * clone.x * sinFi + clone.y * cosFi;
        }
        this.changeCoordinateCenterTo(center.multiply(-1, -1));
        return this;
    };
    PolygonalChain.prototype.changeCoordinateCenterTo = function (p) {
        var offset = new point_1.Point(p.x, p.y).multiply(-1, -1);
        list_1.ListUtils.forEach(this.points, function (rp) { return rp.offsetByPoint(offset); });
        return this;
    };
    PolygonalChain.prototype.projection = function (axis) {
        return list_1.ListUtils.minMaxExtended(this.points, function (p) { return vector_1.Vector.scalarProduct(p, axis); });
    };
    return PolygonalChain;
}());
exports.PolygonalChain = PolygonalChain;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseIntervalsMapIterator = void 0;
var intervals_1 = __webpack_require__(19);
var SparseIntervalsMapIterator = (function () {
    function SparseIntervalsMapIterator(intervals, valMap) {
        this.sparseIntervals = new intervals_1.SparseIntervals(intervals);
        this.valMap = valMap;
        this.intervalIndex = -1;
    }
    Object.defineProperty(SparseIntervalsMapIterator.prototype, "numIntervals", {
        get: function () {
            return this.sparseIntervals.numIntervals;
        },
        enumerable: false,
        configurable: true
    });
    SparseIntervalsMapIterator.prototype.moveToNextPosition = function () {
        if (this.interval && this.posInInterval + 1 < this.interval.length) {
            this.posInInterval++;
            this.position++;
            return true;
        }
        return this.moveToNextInterval();
    };
    SparseIntervalsMapIterator.prototype.moveToNextInterval = function () {
        if (this.intervalIndex + 1 < this.sparseIntervals.numIntervals) {
            this.intervalIndex++;
            this.interval = this.sparseIntervals.getInterval(this.intervalIndex);
            this.posInInterval = 0;
            this.position = this.interval.start;
            this.object = this.valMap[this.position];
            return true;
        }
        return false;
    };
    return SparseIntervalsMapIterator;
}());
exports.SparseIntervalsMapIterator = SparseIntervalsMapIterator;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPluginHelper = void 0;
var browser_1 = __webpack_require__(0);
var PdfPluginHelper = (function () {
    function PdfPluginHelper() {
    }
    PdfPluginHelper.isInstalled = function () {
        return !!PdfPluginHelper.getPdfPlugin();
    };
    PdfPluginHelper.getPdfPlugin = function () {
        if (!PdfPluginHelper.plugin) {
            PdfPluginHelper.plugin = browser_1.Browser.IE ?
                PdfPluginHelper.getActiveXObject('AcroPDF.PDF') || PdfPluginHelper.getActiveXObject('PDF.PdfCtrl') :
                PdfPluginHelper.getNavigatorPlugin('Adobe Acrobat') || PdfPluginHelper.getNavigatorPlugin('Chrome PDF Viewer') ||
                    PdfPluginHelper.getNavigatorPlugin('WebKit built-in PDF') || PdfPluginHelper.getNavigatorPlugin('Chromium PDF Viewer');
        }
        return PdfPluginHelper.plugin;
    };
    PdfPluginHelper.getActiveXObject = function (name) {
        try {
            return new ActiveXObject(name);
        }
        catch (e) {
            return null;
        }
    };
    PdfPluginHelper.getNavigatorPlugin = function (name) {
        var plugins = navigator.plugins;
        for (var key in plugins) {
            if (!Object.prototype.hasOwnProperty.call(plugins, key))
                continue;
            var plugin = plugins[key];
            if (plugin.name === name)
                return plugin;
        }
        return null;
    };
    PdfPluginHelper.getVersion = function () {
        try {
            var plugin = PdfPluginHelper.getPdfPlugin();
            if (browser_1.Browser.IE) {
                var versions = plugin.GetVersions().split(',');
                var latest = versions[0].split('=');
                return parseFloat(latest[1]);
            }
            return plugin.version ? parseInt(plugin.version) : plugin.name;
        }
        catch (e) {
            return null;
        }
    };
    return PdfPluginHelper;
}());
exports.PdfPluginHelper = PdfPluginHelper;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceComparator = exports.SesElem = exports.SesType = void 0;
var SesType;
(function (SesType) {
    SesType[SesType["Delete"] = -1] = "Delete";
    SesType[SesType["Common"] = 0] = "Common";
    SesType[SesType["Add"] = 1] = "Add";
})(SesType = exports.SesType || (exports.SesType = {}));
var SesElem = (function () {
    function SesElem(elem, type) {
        this.elem = elem;
        this.type = type;
    }
    SesElem.prototype.toString = function () {
        var sign;
        switch (this.type) {
            case SesType.Add:
                sign = '+';
                break;
            case SesType.Delete:
                sign = '-';
                break;
            case SesType.Common:
                sign = ' ';
                break;
        }
        return sign + this.elem.toString();
    };
    return SesElem;
}());
exports.SesElem = SesElem;
var SequenceComparator = (function () {
    function SequenceComparator(a, b) {
        this.editDistance = null;
        this.lcs = '';
        this.ses = [];
        this.path = [];
        this.pathposi = [];
        this.a = a;
        this.b = b;
        this.m = this.a.length;
        this.n = this.b.length;
        this.reverse = this.m > this.n;
        if (this.reverse) {
            var tmpA = this.a;
            this.a = this.b;
            this.b = tmpA;
            var tmpM = this.m;
            this.m = this.n;
            this.n = tmpM;
        }
        this.offset = this.m + 1;
        this.comparer = this.a.getComparer();
    }
    SequenceComparator.prototype.calculate = function () {
        var size = this.m + this.n + 3;
        var fp = {};
        for (var i = 0; i < size; ++i) {
            fp[i] = -1;
            this.path[i] = -1;
        }
        var delta = this.n - this.m;
        var p = -1;
        do {
            ++p;
            for (var k = -p; k <= delta - 1; ++k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            for (var k = delta + p; k >= delta + 1; --k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            fp[delta + this.offset] = this.snake(delta, fp[delta - 1 + this.offset] + 1, fp[delta + 1 + this.offset]);
        } while (fp[delta + this.offset] !== this.n);
        this.editDistance = delta + 2 * p;
        var r = this.path[delta + this.offset];
        var epc = [];
        while (r !== -1) {
            var pos = this.pathposi[r];
            epc.push(new PathElem(pos.x, pos.y, null));
            r = pos.k;
        }
        this.recordSeq(epc);
        return this.ses;
    };
    SequenceComparator.prototype.toString = function () {
        var result = [];
        for (var _i = 0, _a = this.ses; _i < _a.length; _i++) {
            var elem = _a[_i];
            result.push(elem.toString());
        }
        return result.join('\n');
    };
    SequenceComparator.prototype.snake = function (k, p, pp) {
        var r = p > pp ?
            this.path[k - 1 + this.offset] :
            this.path[k + 1 + this.offset];
        var y = Math.max(p, pp);
        var x = y - k;
        while (x < this.m && y < this.n && this.comparer(this.a.getByIndex(x), this.b.getByIndex(y))) {
            ++x;
            ++y;
        }
        var len = this.pathposi.push(new PathElem(x, y, r));
        this.path[k + this.offset] = len - 1;
        return y;
    };
    SequenceComparator.prototype.recordSeq = function (epc) {
        var px_idx = 0;
        var py_idx = 0;
        var addTag = this.reverse ? SesType.Delete : SesType.Add;
        var deleteTag = this.reverse ? SesType.Add : SesType.Delete;
        for (var i = epc.length - 1; i >= 0; --i) {
            var currEpc = epc[i];
            while (px_idx < currEpc.x || py_idx < currEpc.y) {
                var yxDiff = currEpc.y - currEpc.x;
                var pypxDiff = py_idx - px_idx;
                if (yxDiff > pypxDiff) {
                    this.ses.push(new SesElem(this.b.getByIndex(py_idx), addTag));
                    ++py_idx;
                }
                else if (yxDiff < pypxDiff) {
                    this.ses.push(new SesElem(this.a.getByIndex(px_idx), deleteTag));
                    ++px_idx;
                }
                else {
                    this.ses.push(new SesElem(this.a.getByIndex(px_idx), SesType.Common));
                    this.lcs += this.a.getByIndex(px_idx);
                    ++px_idx;
                    ++py_idx;
                }
            }
        }
    };
    return SequenceComparator;
}());
exports.SequenceComparator = SequenceComparator;
var PathElem = (function () {
    function PathElem(x, y, k) {
        this.x = x;
        this.y = y;
        this.k = k;
    }
    return PathElem;
}());


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Utils = void 0;
var file_1 = __webpack_require__(38);
var mime_type_1 = __webpack_require__(39);
var Base64Utils = (function () {
    function Base64Utils() {
    }
    Base64Utils.normalizeToDataUrl = function (base64, mimeType) {
        if (!Base64Utils.checkPrependDataUrl(base64))
            base64 = Base64Utils.prependByDataUrl(base64, mimeType);
        return base64;
    };
    Base64Utils.prependByDataUrl = function (base64, mimeType) {
        return "data:" + mimeType + ";base64," + base64;
    };
    Base64Utils.checkPrependDataUrl = function (base64) {
        return Base64Utils.dataUrl.test(base64);
    };
    Base64Utils.deleteDataUrlPrefix = function (base64DataUrl) {
        return base64DataUrl.replace(Base64Utils.dataUrl, '');
    };
    Base64Utils.getUint8Array = function (base64) {
        base64 = atob(base64);
        var n = base64.length;
        var arr = new Uint8Array(n);
        while (n--)
            arr[n] = base64.charCodeAt(n);
        return arr;
    };
    Base64Utils.fromArrayBuffer = function (buffer) {
        var binary = [];
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++)
            binary.push(String.fromCharCode(bytes[i]));
        return window.btoa(binary.join(''));
    };
    Base64Utils.getFileFromBase64 = function (base64, fileName, options) {
        if (fileName === void 0) { fileName = ''; }
        var data = Base64Utils.getUint8Array(base64);
        return file_1.FileUtils.createFile([data], fileName, options);
    };
    Base64Utils.getMimeTypeAsString = function (base64) {
        var match = base64.match(Base64Utils.dataUrl);
        return match ? match[1] : null;
    };
    Base64Utils.getKnownMimeType = function (base64) {
        var match = base64.match(Base64Utils.dataUrl);
        return match ? mime_type_1.MimeTypeUtils.stringTypeToType(match[1]) : mime_type_1.DxMimeType.Unknown;
    };
    Base64Utils.fromBlobAsArrayBuffer = function (blob, callback) {
        var reader = new FileReader();
        reader.onloadend = function () { return callback(Base64Utils.fromArrayBuffer(reader.result)); };
        reader.readAsArrayBuffer(blob);
    };
    Base64Utils.fromBlobAsDataUrl = function (blob, callback) {
        var reader = new FileReader();
        reader.onloadend = function () { return callback(reader.result); };
        reader.readAsDataURL(blob);
    };
    Base64Utils.dataUrl = /^data:(.*?)(;(.*?))??(;base64)?,/;
    return Base64Utils;
}());
exports.Base64Utils = Base64Utils;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
var browser_1 = __webpack_require__(0);
var base64_1 = __webpack_require__(37);
var common_1 = __webpack_require__(2);
var FileUtils = (function () {
    function FileUtils() {
    }
    FileUtils.loadJavascriptFile = function (srcUri, callback) {
        var _a;
        var headElem = document.getElementsByTagName('head')[0];
        if (!headElem) {
            headElem = document.createElement('head');
            var bodyElem = document.getElementsByTagName('body')[0];
            (_a = bodyElem.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(headElem, bodyElem);
        }
        var scriptElem = document.createElement('script');
        scriptElem.onload = callback;
        scriptElem.src = srcUri;
        headElem.appendChild(scriptElem);
        return { htmlScriptElement: scriptElem };
    };
    FileUtils.startDownloadFileLocal = function (content, fileName) {
        if (content instanceof ArrayBuffer)
            content = base64_1.Base64Utils.fromArrayBuffer(content);
        if (common_1.isString(content))
            content = base64_1.Base64Utils.getFileFromBase64(content);
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(content, fileName);
        else {
            var a_1 = document.createElement('a');
            var url_1 = URL.createObjectURL(content);
            a_1.href = url_1;
            a_1.download = fileName;
            document.body.appendChild(a_1);
            a_1.click();
            setTimeout(function () {
                document.body.removeChild(a_1);
                window.URL.revokeObjectURL(url_1);
            }, 0);
        }
    };
    FileUtils.createFile = function (fileBits, fileName, options) {
        var _a;
        if (browser_1.Browser.IE || browser_1.Browser.Edge && browser_1.Browser.MajorVersion < 86) {
            var blob = new Blob(fileBits, options);
            blob['lastModifiedDate'] = (_a = options === null || options === void 0 ? void 0 : options.lastModified) !== null && _a !== void 0 ? _a : Date.now();
            blob['name'] = fileName;
            return blob;
        }
        else
            return new File(fileBits, fileName, options);
    };
    FileUtils.isFile = function (file) {
        if (browser_1.Browser.IE || browser_1.Browser.Edge && browser_1.Browser.MajorVersion < 86)
            return (file instanceof File) || (file instanceof Blob && common_1.isDefined(file.name));
        else
            return file instanceof File;
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeTypeUtils = exports.DxMimeType = exports.ImageWebpMimeType = exports.ImageWbmpMimeType = exports.ImageIcoMimeType = exports.ImageTiffMimeType = exports.ImageSvgMimeType = exports.ImagePjpegMimeType = exports.ImageJpegMimeType = exports.ImageGifMimeType = exports.ImagePngMimeType = exports.DocmMimeType = exports.HtmlMimeType = exports.PlainTextMimeType = exports.RtfMimeType = exports.OpenXmlMimeType = void 0;
exports.OpenXmlMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
exports.RtfMimeType = 'application/rtf';
exports.PlainTextMimeType = 'text/plain';
exports.HtmlMimeType = 'text/html';
exports.DocmMimeType = 'application/vnd.ms-word.document.macroEnabled.12';
exports.ImagePngMimeType = 'image/png';
exports.ImageGifMimeType = 'image/gif';
exports.ImageJpegMimeType = 'image/jpeg';
exports.ImagePjpegMimeType = 'image/pjpeg';
exports.ImageSvgMimeType = 'image/svg+xml';
exports.ImageTiffMimeType = 'image/tiff';
exports.ImageIcoMimeType = 'image/vnd.microsoft.icon';
exports.ImageWbmpMimeType = 'image/vnd.wap.wbmp';
exports.ImageWebpMimeType = 'image/webp';
var DxMimeType;
(function (DxMimeType) {
    DxMimeType[DxMimeType["Unknown"] = 0] = "Unknown";
    DxMimeType[DxMimeType["OpenXml"] = 1] = "OpenXml";
    DxMimeType[DxMimeType["Rtf"] = 2] = "Rtf";
    DxMimeType[DxMimeType["PlainText"] = 3] = "PlainText";
    DxMimeType[DxMimeType["Docm"] = 4] = "Docm";
    DxMimeType[DxMimeType["Png"] = 5] = "Png";
    DxMimeType[DxMimeType["Gif"] = 6] = "Gif";
    DxMimeType[DxMimeType["Jpeg"] = 7] = "Jpeg";
    DxMimeType[DxMimeType["Pjpeg"] = 8] = "Pjpeg";
    DxMimeType[DxMimeType["Svg"] = 9] = "Svg";
    DxMimeType[DxMimeType["Tiff"] = 10] = "Tiff";
    DxMimeType[DxMimeType["Ico"] = 11] = "Ico";
    DxMimeType[DxMimeType["Wbmp"] = 12] = "Wbmp";
    DxMimeType[DxMimeType["Webp"] = 13] = "Webp";
    DxMimeType[DxMimeType["Html"] = 14] = "Html";
})(DxMimeType = exports.DxMimeType || (exports.DxMimeType = {}));
var MimeTypeUtils = (function () {
    function MimeTypeUtils() {
    }
    MimeTypeUtils.stringTypeToExtension = function (mimeTypeAsStr) {
        var mimeType = MimeTypeUtils.stringTypeToTypeMap[mimeTypeAsStr];
        return mimeType === undefined ? '' : MimeTypeUtils.typeToExtensionMap[mimeType];
    };
    MimeTypeUtils.typeToExtension = function (mimeType) {
        var ext = MimeTypeUtils.typeToExtensionMap[mimeType];
        return ext !== null && ext !== void 0 ? ext : '';
    };
    MimeTypeUtils.extensionToType = function (extension) {
        extension = extension.toLowerCase();
        if (extension[0] !== '.')
            extension += '.';
        var mimeType = MimeTypeUtils.extensionToTypeMap[extension];
        return mimeType !== null && mimeType !== void 0 ? mimeType : DxMimeType.Unknown;
    };
    MimeTypeUtils.typeToStringType = function (mimeType) {
        var str = MimeTypeUtils.typeToStringTypeMap[mimeType];
        return str !== null && str !== void 0 ? str : '';
    };
    MimeTypeUtils.stringTypeToType = function (mimeTypeAsStr) {
        var mimeType = MimeTypeUtils.stringTypeToTypeMap[mimeTypeAsStr];
        return mimeType === undefined ? DxMimeType.Unknown : mimeType;
    };
    MimeTypeUtils.stringTypeToTypeMap = (_a = {},
        _a[exports.OpenXmlMimeType] = DxMimeType.OpenXml,
        _a[exports.RtfMimeType] = DxMimeType.Rtf,
        _a[exports.PlainTextMimeType] = DxMimeType.PlainText,
        _a[exports.DocmMimeType] = DxMimeType.Docm,
        _a[exports.HtmlMimeType] = DxMimeType.Html,
        _a[exports.ImagePngMimeType] = DxMimeType.Png,
        _a[exports.ImageGifMimeType] = DxMimeType.Gif,
        _a[exports.ImageJpegMimeType] = DxMimeType.Jpeg,
        _a[exports.ImagePjpegMimeType] = DxMimeType.Pjpeg,
        _a[exports.ImageSvgMimeType] = DxMimeType.Svg,
        _a[exports.ImageTiffMimeType] = DxMimeType.Tiff,
        _a[exports.ImageIcoMimeType] = DxMimeType.Ico,
        _a[exports.ImageWbmpMimeType] = DxMimeType.Wbmp,
        _a[exports.ImageWebpMimeType] = DxMimeType.Webp,
        _a);
    MimeTypeUtils.typeToStringTypeMap = (_b = {},
        _b[DxMimeType.Unknown] = undefined,
        _b[DxMimeType.OpenXml] = exports.OpenXmlMimeType,
        _b[DxMimeType.Rtf] = exports.RtfMimeType,
        _b[DxMimeType.PlainText] = exports.PlainTextMimeType,
        _b[DxMimeType.Docm] = exports.DocmMimeType,
        _b[DxMimeType.Html] = exports.HtmlMimeType,
        _b[DxMimeType.Png] = exports.ImagePngMimeType,
        _b[DxMimeType.Gif] = exports.ImageGifMimeType,
        _b[DxMimeType.Jpeg] = exports.ImageJpegMimeType,
        _b[DxMimeType.Pjpeg] = exports.ImagePjpegMimeType,
        _b[DxMimeType.Svg] = exports.ImageSvgMimeType,
        _b[DxMimeType.Tiff] = exports.ImageTiffMimeType,
        _b[DxMimeType.Ico] = exports.ImageIcoMimeType,
        _b[DxMimeType.Wbmp] = exports.ImageWbmpMimeType,
        _b[DxMimeType.Webp] = exports.ImageWebpMimeType,
        _b);
    MimeTypeUtils.typeToExtensionMap = (_c = {},
        _c[DxMimeType.Unknown] = undefined,
        _c[DxMimeType.OpenXml] = '.docx',
        _c[DxMimeType.Rtf] = '.rtf',
        _c[DxMimeType.PlainText] = '.txt',
        _c[DxMimeType.Docm] = '.docm',
        _c[DxMimeType.Html] = '.html',
        _c[DxMimeType.Png] = '.png',
        _c[DxMimeType.Gif] = '.gif',
        _c[DxMimeType.Jpeg] = '.jpeg',
        _c[DxMimeType.Pjpeg] = '.pjpeg',
        _c[DxMimeType.Svg] = '.svg',
        _c[DxMimeType.Tiff] = '.tiff',
        _c[DxMimeType.Ico] = '.ico',
        _c[DxMimeType.Wbmp] = '.wbmp',
        _c[DxMimeType.Webp] = '.webp',
        _c);
    MimeTypeUtils.extensionToTypeMap = {
        '.docx': DxMimeType.OpenXml,
        '.rtf': DxMimeType.Rtf,
        '.txt': DxMimeType.PlainText,
        '.docm': DxMimeType.Docm,
        '.html': DxMimeType.Html,
        '.htm': DxMimeType.Html,
        '.png': DxMimeType.Png,
        '.gif': DxMimeType.Gif,
        '.jpeg': DxMimeType.Jpeg,
        '.pjpeg': DxMimeType.Pjpeg,
        '.svg': DxMimeType.Svg,
        '.tiff': DxMimeType.Tiff,
        '.ico': DxMimeType.Ico,
        '.wbmp': DxMimeType.Wbmp,
        '.webp': DxMimeType.Webp,
    };
    return MimeTypeUtils;
}());
exports.MimeTypeUtils = MimeTypeUtils;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodeUtils = void 0;
var EncodeUtils = (function () {
    function EncodeUtils() {
    }
    EncodeUtils.encodeHtml = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    EncodeUtils.decodeHtml = function (text) {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
    EncodeUtils.prepareTextForRequest = function (text) {
        return text
            .replace(/%/g, '%25')
            .replace(/&/g, '%26amp;')
            .replace(/\+/g, '%2B')
            .replace(/</g, '%26lt;')
            .replace(/>/g, '%26gt;')
            .replace(/"/g, '%26quot;');
    };
    EncodeUtils.prepareTextForCallBackRequest = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };
    EncodeUtils.decodeViaTextArea = function (html) {
        var textArea = document.createElement('TEXTAREA');
        textArea.innerHTML = html;
        return textArea.value;
    };
    return EncodeUtils;
}());
exports.EncodeUtils = EncodeUtils;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(64), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(2), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(70), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(6), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(73), exports);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(3), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(74), exports);
tslib_1.__exportStar(__webpack_require__(0), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(75), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyBatchUpdatableObject = exports.BatchUpdatableObject = void 0;
var BatchUpdatableObject = (function () {
    function BatchUpdatableObject() {
        this.suspendUpdateCount = 0;
        this.occurredEvents = 0;
    }
    BatchUpdatableObject.prototype.beginUpdate = function () {
        if (this.suspendUpdateCount === 0)
            this.onUpdateLocked();
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount--;
        else
            this.suspendUpdateCount++;
    };
    BatchUpdatableObject.prototype.endUpdate = function () {
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount++;
        else if (this.suspendUpdateCount > 0)
            this.suspendUpdateCount--;
        if (!this.isUpdateLocked()) {
            var occurredEvents = this.occurredEvents;
            this.occurredEvents = 0;
            this.onUpdateUnlocked(occurredEvents);
        }
    };
    BatchUpdatableObject.prototype.suspendUpdate = function () {
        if (this.suspendUpdateCount > 0) {
            this.suspendUpdateCount *= -1;
            var occurredEvents = this.occurredEvents;
            this.occurredEvents = 0;
            this.onUpdateUnlocked(occurredEvents);
        }
    };
    BatchUpdatableObject.prototype.continueUpdate = function () {
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount *= -1;
    };
    BatchUpdatableObject.prototype.isUpdateLocked = function () {
        return this.suspendUpdateCount > 0;
    };
    BatchUpdatableObject.prototype.onUpdateLocked = function () { };
    BatchUpdatableObject.prototype.registerOccurredEvent = function (eventMask) {
        this.occurredEvents |= eventMask;
    };
    BatchUpdatableObject.prototype.resetOccurredEvents = function () {
        this.occurredEvents = 0;
    };
    BatchUpdatableObject.prototype.isLocked = function () {
        return this.suspendUpdateCount !== 0;
    };
    return BatchUpdatableObject;
}());
exports.BatchUpdatableObject = BatchUpdatableObject;
var EmptyBatchUpdatableObject = (function () {
    function EmptyBatchUpdatableObject() {
    }
    EmptyBatchUpdatableObject.prototype.beginUpdate = function () { };
    EmptyBatchUpdatableObject.prototype.endUpdate = function () { };
    return EmptyBatchUpdatableObject;
}());
exports.EmptyBatchUpdatableObject = EmptyBatchUpdatableObject;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkedText = void 0;
var ChunkedText = (function () {
    function ChunkedText(text, maxChunkSize) {
        if (maxChunkSize === void 0) { maxChunkSize = 2000; }
        this.maxChunkSize = maxChunkSize;
        this.chunks = [];
        this._textLength = 0;
        this.pushText(text);
        this.resetToStart();
    }
    Object.defineProperty(ChunkedText.prototype, "currChar", {
        get: function () {
            return this.chunk[this.posInChunk];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChunkedText.prototype, "currPos", {
        get: function () {
            return this._currPos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChunkedText.prototype, "textLength", {
        get: function () {
            return this._textLength;
        },
        enumerable: false,
        configurable: true
    });
    ChunkedText.prototype.resetToStart = function () {
        this.setChunk(0);
        this.posInChunk = -1;
        this._currPos = -1;
    };
    ChunkedText.prototype.resetToEnd = function () {
        this.setChunk(this.chunks.length - 1);
        this.posInChunk = this.chunkLength - 1;
        this._currPos = this._textLength;
    };
    ChunkedText.prototype.addText = function (text) {
        this.pushText(text);
        if (this._currPos === -1) {
            this.chunk = this.chunks[0];
            this.chunkLength = this.chunk.length;
        }
        else
            this.setPositionTo(this._currPos);
    };
    ChunkedText.prototype.getText = function () {
        return this.chunks.join('');
    };
    ChunkedText.prototype.moveToNextChar = function () {
        this.posInChunk++;
        this._currPos++;
        if (this.posInChunk < this.chunkLength)
            return true;
        if (this.setChunk(this.chunkIndex + 1)) {
            this.posInChunk = 0;
            return true;
        }
        else {
            this.posInChunk = this.chunkLength;
            this._currPos = this._textLength;
            return false;
        }
    };
    ChunkedText.prototype.moveToPrevChar = function () {
        this.posInChunk--;
        this._currPos--;
        if (this.posInChunk >= 0)
            return true;
        if (this.setChunk(this.chunkIndex - 1)) {
            this.posInChunk = this.chunkLength - 1;
            return true;
        }
        else {
            this.posInChunk = -1;
            this._currPos = -1;
            return false;
        }
    };
    ChunkedText.prototype.setPositionTo = function (position) {
        var restLength = position;
        this.chunkIndex = 0;
        for (var ind = 0; true; ind++) {
            if (this.setChunk(ind)) {
                if (restLength > this.chunkLength)
                    restLength -= this.chunk.length;
                else {
                    this.posInChunk = restLength;
                    this._currPos = position;
                    return;
                }
            }
            else {
                this.posInChunk = this.chunkLength;
                this._currPos = this._textLength;
                return;
            }
        }
    };
    ChunkedText.prototype.setChunk = function (index) {
        var prevChunkVal = this.chunk;
        this.chunk = this.chunks[index];
        if (!this.chunk) {
            this.chunk = prevChunkVal;
            return false;
        }
        this.chunkIndex = index;
        this.chunkLength = this.chunk.length;
        return true;
    };
    ChunkedText.prototype.pushText = function (text) {
        if (!text.length)
            return;
        var textPos = 0;
        while (textPos < text.length) {
            if (textPos === 0) {
                var lastChunk = this.chunks.pop();
                if (lastChunk) {
                    if (lastChunk.length < this.maxChunkSize) {
                        var restLen = this.maxChunkSize - lastChunk.length;
                        this.chunks.push(lastChunk + text.substr(textPos, restLen));
                        textPos += restLen;
                        continue;
                    }
                    else
                        this.chunks.push(lastChunk);
                }
            }
            this.chunks.push(text.substr(textPos, this.maxChunkSize));
            textPos += this.maxChunkSize;
        }
        this._textLength += text.length;
    };
    return ChunkedText;
}());
exports.ChunkedText = ChunkedText;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedActionManager = void 0;
var DelayedActionManager = (function () {
    function DelayedActionManager(action) {
        this.action = action;
        this.reset();
    }
    Object.defineProperty(DelayedActionManager.prototype, "actionExecuted", {
        get: function () {
            return this.actionTimeoutId === null;
        },
        enumerable: false,
        configurable: true
    });
    DelayedActionManager.prototype.reset = function () {
        this.actionTimeout = undefined;
        this.actionTimeoutId = undefined;
        this.actionStartTime = undefined;
    };
    DelayedActionManager.prototype.start = function (timeout) {
        var _this = this;
        this.actionTimeout = timeout;
        this.actionTimeoutId = setTimeout(function () { return _this.executeAction(); }, this.actionTimeout);
        this.actionStartTime = Date.now();
    };
    DelayedActionManager.prototype.executeIfTimerExpired = function () {
        if (Date.now() - this.actionStartTime > this.actionTimeout)
            this.executeAction();
    };
    DelayedActionManager.prototype.executeAction = function () {
        if (!this.actionExecuted) {
            this.action();
            this.stop();
        }
    };
    DelayedActionManager.prototype.stop = function () {
        clearTimeout(this.actionTimeoutId);
        this.actionTimeoutId = null;
    };
    return DelayedActionManager;
}());
exports.DelayedActionManager = DelayedActionManager;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DomEventHandlersHolder = void 0;
var touch_1 = __webpack_require__(8);
var DomEventHandler = (function () {
    function DomEventHandler(element, eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.element = element;
        this.eventName = eventName;
        this.handler = handler;
        this.options = options;
    }
    return DomEventHandler;
}());
var DomEventHandlersHolder = (function () {
    function DomEventHandlersHolder() {
        this.handlers = [];
    }
    DomEventHandlersHolder.prototype.addListener = function (element, eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.handlers.push(new DomEventHandler(element, eventName, handler, options));
        element.addEventListener(eventName, handler, options);
    };
    DomEventHandlersHolder.prototype.addListenerToWindow = function (eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.handlers.push(new DomEventHandler(window, eventName, handler, options));
        window.addEventListener(eventName, handler, options);
    };
    DomEventHandlersHolder.prototype.addListenerToDocument = function (eventName, handler, options) {
        if (options === void 0) { options = true; }
        var attachingAllowed = touch_1.TouchUtils.onEventAttachingToDocument(eventName, handler);
        if (attachingAllowed) {
            this.handlers.push(new DomEventHandler(document, eventName, handler, options));
            document.addEventListener(eventName, handler, options);
        }
    };
    DomEventHandlersHolder.prototype.removeAllListeners = function () {
        this.handlers.forEach(function (evtHandler) { return evtHandler.element.removeEventListener(evtHandler.eventName, evtHandler.handler, evtHandler.options); });
        this.handlers = [];
    };
    return DomEventHandlersHolder;
}());
exports.DomEventHandlersHolder = DomEventHandlersHolder;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize = exports.Initializer = void 0;
var Initializer = (function () {
    function Initializer() {
    }
    Initializer.prototype.set = function (property, value) {
        this[property] = value;
        return this;
    };
    return Initializer;
}());
exports.Initializer = Initializer;
function Initialize(options) {
    var set = function (property, value) {
        options[property] = value;
        return {
            set: set,
            result: options
        };
    };
    return {
        set: set,
        result: options
    };
}
exports.Initialize = Initialize;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedList = void 0;
var search_1 = __webpack_require__(9);
var OrderedList = (function () {
    function OrderedList(comparer) {
        this.list = [];
        this.comparer = comparer;
    }
    OrderedList.prototype.add = function (elem) {
        var _this = this;
        this.list.splice(search_1.SearchUtils.normedBinaryIndexOf(this.list, function (currElem) { return _this.comparer(currElem, elem); }) + 1, 0, elem);
        return this;
    };
    OrderedList.prototype.sort = function () {
        this.list.sort(this.comparer);
    };
    OrderedList.prototype.findIndex = function (elem) {
        var _this = this;
        var ind = search_1.SearchUtils.binaryIndexOf(this.list, function (currElem) { return _this.comparer(currElem, elem); });
        if (ind < 0)
            return -1;
        for (var prevElem = void 0; (prevElem = this.list[ind - 1]) && this.comparer(elem, prevElem) === 0; ind--)
            ;
        return ind;
    };
    OrderedList.prototype.findElement = function (elem) {
        var element = this.list[this.findIndex(elem)];
        return element === undefined ? null : element;
    };
    return OrderedList;
}());
exports.OrderedList = OrderedList;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = void 0;
var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    return Pair;
}());
exports.Pair = Pair;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack = (function () {
    function Stack() {
        this.list = [];
        this._count = 0;
        this.last = undefined;
    }
    Stack.prototype.push = function (val) {
        this.list.push(val);
        this.last = val;
        this._count++;
    };
    Stack.prototype.pop = function () {
        this._count--;
        var result = this.list.pop();
        this.last = this.list[this.list.length - 1];
        return result;
    };
    Stack.prototype.peek = function () {
        return this.last;
    };
    Object.defineProperty(Stack.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    Stack.prototype.getPrevious = function () {
        return this.list[this._count - 2];
    };
    return Stack;
}());
exports.Stack = Stack;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitConverter = void 0;
var UnitConverter = (function () {
    function UnitConverter() {
    }
    UnitConverter.hundredthsOfMillimeterToTwipsRound = function (value) {
        return Math.round(1440 * value / 2540.0);
    };
    UnitConverter.documentsToTwips = function (value) {
        return 24 * value / 5;
    };
    UnitConverter.pixelsToTwips = function (value) {
        return Math.round(UnitConverter.pixelsToTwipsF(value));
    };
    UnitConverter.pixelsToTwipsCustomDpi = function (value, dpi) {
        return Math.round(UnitConverter.pixelsToTwipsFCustomDpi(value, dpi));
    };
    UnitConverter.inchesToTwips = function (value) {
        return Math.round(UnitConverter.inchesToTwipsF(value));
    };
    UnitConverter.pointsToTwips = function (value) {
        return Math.round(UnitConverter.pointsToTwipsF(value));
    };
    UnitConverter.picasToTwips = function (value) {
        return Math.round(value * 1440 / UnitConverter.PICAS_PER_INCH);
    };
    UnitConverter.centimetersToTwips = function (value) {
        return Math.round(UnitConverter.centimetersToTwipsF(value));
    };
    UnitConverter.pixelsToTwipsF = function (value) {
        return value * 1440 / UnitConverter.DPI;
    };
    UnitConverter.pixelsToTwipsFCustomDpi = function (value, dpi) {
        return value * 1440 / dpi;
    };
    UnitConverter.inchesToTwipsF = function (value) {
        return value * 1440;
    };
    UnitConverter.pointsToTwipsF = function (value) {
        return value * 20;
    };
    UnitConverter.centimetersToTwipsF = function (value) {
        return value * 1440 / UnitConverter.CENTIMETERS_PER_INCH;
    };
    UnitConverter.twipsToDegrees = function (value) {
        return value / 60000;
    };
    UnitConverter.twipsToRadians = function (value) {
        return value / 60000 * Math.PI / 180;
    };
    UnitConverter.degreesToTwips = function (value) {
        return value * 60000;
    };
    UnitConverter.radiansToTwips = function (value) {
        return value * 60000 / Math.PI * 180;
    };
    UnitConverter.radiansToDegrees = function (value) {
        return value / Math.PI * 180;
    };
    UnitConverter.twipsToFD = function (value) {
        return Math.round(value * 2048 / 1875);
    };
    UnitConverter.fdToTwips = function (value) {
        return Math.round(value * 1875 / 2048);
    };
    UnitConverter.emuToTwips = function (val) {
        return val / 635;
    };
    UnitConverter.twipsToPixels = function (value) {
        return Math.round(UnitConverter.twipsToPixelsF(value));
    };
    UnitConverter.inchesToPixels = function (value) {
        return Math.round(UnitConverter.DPI * value);
    };
    UnitConverter.centimeterToPixel = function (value) {
        return Math.round(this.centimeterToPixelF(value));
    };
    UnitConverter.centimeterToPixelF = function (value) {
        return value * UnitConverter.DPI / UnitConverter.CENTIMETERS_PER_INCH;
    };
    UnitConverter.millimetersToPixel = function (value) {
        return Math.round(value / (UnitConverter.CENTIMETERS_PER_INCH / UnitConverter.DPI) / 10);
    };
    UnitConverter.pointsToPixels = function (value) {
        return Math.round(value * UnitConverter.DPI / 72);
    };
    UnitConverter.pointsToPixelsF = function (value) {
        return value * UnitConverter.DPI / 72;
    };
    UnitConverter.twipsToPixelsF = function (value) {
        return value * UnitConverter.DPI / 1440;
    };
    UnitConverter.pixelsToPoints = function (value) {
        return Math.round(value * 72 / UnitConverter.DPI);
    };
    UnitConverter.pixelsToPointsF = function (value) {
        return value * 72 / UnitConverter.DPI;
    };
    UnitConverter.twipsToPoints = function (value) {
        return Math.round(this.twipsToPointsF(value));
    };
    UnitConverter.twipsToPointsF = function (value) {
        return value / 20;
    };
    UnitConverter.twipsToInches = function (value) {
        return value / 1440;
    };
    UnitConverter.pixelsToInches = function (value) {
        return value / UnitConverter.DPI;
    };
    UnitConverter.twipsToCentimeters = function (value) {
        return value * UnitConverter.CENTIMETERS_PER_INCH / 1440;
    };
    UnitConverter.pixelToCentimeters = function (value) {
        return value * UnitConverter.CENTIMETERS_PER_INCH / UnitConverter.DPI;
    };
    UnitConverter.twipsToHundredthsOfMillimeter = function (value) {
        return Math.round(127 * value / 72);
    };
    UnitConverter.pixelsToHundredthsOfMillimeter = function (value) {
        return Math.round(2540 * value / UnitConverter.DPI);
    };
    UnitConverter.hundredthsOfMillimeterToTwips = function (value) {
        return 15 * value / 127;
    };
    UnitConverter.twipsToEmu = function (val) {
        return val * 635;
    };
    UnitConverter.twipsToDegree = function (value) {
        return value / 60000;
    };
    UnitConverter.DPI = 96;
    UnitConverter.CENTIMETERS_PER_INCH = 2.54;
    UnitConverter.PICAS_PER_INCH = 6;
    return UnitConverter;
}());
exports.UnitConverter = UnitConverter;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFieldFormatter = void 0;
var tslib_1 = __webpack_require__(1);
var DateTimeFieldFormatter = (function () {
    function DateTimeFieldFormatter(options) {
        this.AMPMKeyword = 'am/pm';
        this.options = options;
    }
    DateTimeFieldFormatter.prototype.format = function (date, formatString) {
        this.date = date;
        this.formatString = formatString;
        this.result = '';
        var index = 0;
        var formatLength = this.formatString.length;
        while (index < formatLength)
            index += this.formatNext(index);
        return this.result;
    };
    DateTimeFieldFormatter.prototype.formatNext = function (index) {
        var ch = this.formatString[index];
        var formattingItem = this.tryCreateFormattingItem(ch);
        if (formattingItem)
            return this.processAsFormattingItem(index, formattingItem);
        if (this.isKeyword(this.AMPMKeyword, index))
            return this.processAsAMPMKeyword();
        if (ch === '\'')
            return this.processAsEmbedText(index);
        return this.processAsSingleCharacter(index);
    };
    DateTimeFieldFormatter.prototype.isKeyword = function (keyword, index) {
        if (keyword.length > (this.formatString.length - index))
            return false;
        var substring = this.formatString.substr(index, keyword.length);
        return keyword.toLowerCase() === substring.toLowerCase();
    };
    DateTimeFieldFormatter.prototype.processAsAMPMKeyword = function () {
        var result = (this.date.getHours() - 12) >= 0 ? this.options.pm : this.options.am;
        this.result += result;
        return this.AMPMKeyword.length;
    };
    DateTimeFieldFormatter.prototype.processAsEmbedText = function (index) {
        var startTextIndex = index + 1;
        if (startTextIndex >= (this.formatString.length - 1))
            return 1;
        var textLength = this.getCharacterSequenceLength(this.formatString[index], startTextIndex, this.charsAreNotEqual);
        if ((textLength + startTextIndex) === this.formatString.length) {
            this.result += '\'';
            return 1;
        }
        this.result += this.formatString.substr(startTextIndex, textLength);
        return textLength + 2;
    };
    DateTimeFieldFormatter.prototype.processAsSingleCharacter = function (index) {
        this.result += this.formatString[index];
        return 1;
    };
    DateTimeFieldFormatter.prototype.processAsFormattingItem = function (index, formattingItem) {
        var sequenceLength = this.getCharacterSequenceLength(this.formatString[index], index, this.charsAreEqual);
        var patternLength = formattingItem.getAvailablePatternLength(sequenceLength);
        var result = formattingItem.format(this.date, patternLength);
        this.result += result;
        return Math.min(sequenceLength, patternLength);
    };
    DateTimeFieldFormatter.prototype.getCharacterSequenceLength = function (ch, index, predicate) {
        var length = this.formatString.length;
        var nextCharIndex = index + 1;
        while (nextCharIndex < length && predicate(ch, this.formatString[nextCharIndex]))
            nextCharIndex++;
        return nextCharIndex - index;
    };
    DateTimeFieldFormatter.prototype.tryCreateFormattingItem = function (formattingChar) {
        switch (formattingChar) {
            case 'h':
                return new Hour12FormattingItem(this.options);
            case 'H':
                return new Hour24FormattingItem(this.options);
            case 'm':
                return new MinuteFormattingItem(this.options);
            case 'S':
            case 's':
                return new SecondFormattingItem(this.options);
            case 'Y':
            case 'y':
                return new YearFormattingItem(this.options);
            case 'M':
                return new MonthFormattingItem(this.options);
            case 'D':
            case 'd':
                return new DayFormattingItem(this.options);
        }
        return null;
    };
    DateTimeFieldFormatter.prototype.charsAreEqual = function (ch1, ch2) {
        return ch1 === ch2;
    };
    DateTimeFieldFormatter.prototype.charsAreNotEqual = function (ch1, ch2) {
        return ch1 !== ch2;
    };
    return DateTimeFieldFormatter;
}());
exports.DateTimeFieldFormatter = DateTimeFieldFormatter;
var DateTimeFormattingItem = (function () {
    function DateTimeFormattingItem(options) {
        this.options = options;
    }
    DateTimeFormattingItem.prototype.getAvailablePatternLength = function (patternLength) {
        var count = this.patternsLength.length;
        for (var i = 0; i < count; i++) {
            if (this.patternsLength[i] >= patternLength)
                return this.patternsLength[i];
        }
        return this.patternsLength[count - 1];
    };
    return DateTimeFormattingItem;
}());
var NumericFormattingItem = (function (_super) {
    tslib_1.__extends(NumericFormattingItem, _super);
    function NumericFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [1, 2];
        return _this;
    }
    NumericFormattingItem.prototype.formatCore = function (value, patternLength) {
        var result = '' + value;
        if (patternLength === 2 && result.length === 1)
            return '0' + result;
        return result;
    };
    return NumericFormattingItem;
}(DateTimeFormattingItem));
var CombinedFormattingItem = (function (_super) {
    tslib_1.__extends(CombinedFormattingItem, _super);
    function CombinedFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [1, 2, 3, 4];
        return _this;
    }
    CombinedFormattingItem.prototype.format = function (date, patternLength) {
        if (patternLength <= 2)
            return this.formatCore(this.getNumericValue(date), patternLength);
        if (patternLength === 3)
            return this.getAbbreviatedName(date);
        return this.getFullName(date);
    };
    return CombinedFormattingItem;
}(NumericFormattingItem));
var Hour24FormattingItem = (function (_super) {
    tslib_1.__extends(Hour24FormattingItem, _super);
    function Hour24FormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hour24FormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getHours(), patternLength);
    };
    return Hour24FormattingItem;
}(NumericFormattingItem));
var Hour12FormattingItem = (function (_super) {
    tslib_1.__extends(Hour12FormattingItem, _super);
    function Hour12FormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hour12FormattingItem.prototype.format = function (date, patternLength) {
        var hour = date.getHours() % 12;
        if (hour === 0)
            hour = 12;
        return this.formatCore(hour, patternLength);
    };
    return Hour12FormattingItem;
}(NumericFormattingItem));
var MinuteFormattingItem = (function (_super) {
    tslib_1.__extends(MinuteFormattingItem, _super);
    function MinuteFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinuteFormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getMinutes(), patternLength);
    };
    return MinuteFormattingItem;
}(NumericFormattingItem));
var SecondFormattingItem = (function (_super) {
    tslib_1.__extends(SecondFormattingItem, _super);
    function SecondFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondFormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getSeconds(), patternLength);
    };
    return SecondFormattingItem;
}(NumericFormattingItem));
var DayFormattingItem = (function (_super) {
    tslib_1.__extends(DayFormattingItem, _super);
    function DayFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayFormattingItem.prototype.getAbbreviatedName = function (date) {
        return this.options.abbrDayNames[this.getDayOfWeek(date)];
    };
    DayFormattingItem.prototype.getFullName = function (date) {
        return this.options.dayNames[this.getDayOfWeek(date)];
    };
    DayFormattingItem.prototype.getNumericValue = function (date) {
        return date.getDate();
    };
    DayFormattingItem.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    return DayFormattingItem;
}(CombinedFormattingItem));
var MonthFormattingItem = (function (_super) {
    tslib_1.__extends(MonthFormattingItem, _super);
    function MonthFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthFormattingItem.prototype.getAbbreviatedName = function (date) {
        return this.options.abbrMonthNames[date.getMonth()];
    };
    MonthFormattingItem.prototype.getFullName = function (date) {
        return this.options.monthNames[date.getMonth()];
    };
    MonthFormattingItem.prototype.getNumericValue = function (date) {
        return date.getMonth() + 1;
    };
    return MonthFormattingItem;
}(CombinedFormattingItem));
var YearFormattingItem = (function (_super) {
    tslib_1.__extends(YearFormattingItem, _super);
    function YearFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [2, 4];
        return _this;
    }
    YearFormattingItem.prototype.format = function (date, patternLength) {
        var year = date.getFullYear();
        if (patternLength === 2 && year > 99) {
            var shortYear = year % 100;
            var result = '' + shortYear;
            if (result.length === 1)
                return '0' + result;
            return result;
        }
        return '' + year;
    };
    return YearFormattingItem;
}(DateTimeFormattingItem));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFormattersManager = void 0;
var tslib_1 = __webpack_require__(1);
var date_1 = __webpack_require__(11);
var number_1 = __webpack_require__(24);
var string_1 = __webpack_require__(25);
var SimpleFormattersManager = (function () {
    function SimpleFormattersManager(options) {
        this.options = options;
        this.dateFormatter = new date_1.DateFormatter(options);
        this.numberFormatter = new number_1.NumberFormatter(options);
        this.stringFormatter = new string_1.StringFormatter(this.dateFormatter, this.numberFormatter);
    }
    SimpleFormattersManager.prototype.formatString = function (pattern) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.stringFormatter).format.apply(_a, tslib_1.__spreadArray([pattern], args));
    };
    SimpleFormattersManager.prototype.formatDate = function (format, date) {
        this.dateFormatter.setFormatString(format);
        return this.dateFormatter.format(date);
    };
    SimpleFormattersManager.prototype.formatNumber = function (format, value) {
        return this.numberFormatter.format(format, value);
    };
    return SimpleFormattersManager;
}());
exports.SimpleFormattersManager = SimpleFormattersManager;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LineEquation = void 0;
var math_1 = __webpack_require__(6);
var point_1 = __webpack_require__(4);
var LineEquation = (function () {
    function LineEquation(aParam, bParam, cParam) {
        this.aParam = aParam;
        this.bParam = bParam;
        this.cParam = cParam;
    }
    LineEquation.prototype.equals = function (obj) {
        return this.aParam === obj.aParam &&
            this.bParam === obj.bParam &&
            this.cParam === obj.cParam;
    };
    LineEquation.prototype.getIntersection = function (equation) {
        return LineEquation.getIntersection(this, equation);
    };
    LineEquation.fromPoints = function (pointA, pointB) {
        return new LineEquation(pointB.y - pointA.y, pointA.x - pointB.x, pointB.x * pointA.y - pointA.x * pointB.y);
    };
    LineEquation.getIntersection = function (a, b) {
        var A1 = a.aParam;
        var B1 = a.bParam;
        var C1 = a.cParam;
        var A2 = b.aParam;
        var B2 = b.bParam;
        var C2 = b.cParam;
        var v = A2 * B1 - A1 * B2;
        if (math_1.MathUtils.numberCloseTo(v, 0))
            return null;
        if (A1 === 0) {
            var x = (B2 * C1 - C2 * B1) / (B1 * A2);
            return new point_1.Point(x, -C1 / B1);
        }
        var y = (C2 * A1 - C1 * A2) / v;
        return new point_1.Point((-B1 * y - C1) / A1, y);
    };
    LineEquation.equals = function (a, b) {
        return a.aParam === b.bParam &&
            a.bParam === b.bParam &&
            a.cParam === b.cParam;
    };
    return LineEquation;
}());
exports.LineEquation = LineEquation;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Margins = void 0;
var tslib_1 = __webpack_require__(1);
var offsets_1 = __webpack_require__(13);
var Margins = (function (_super) {
    tslib_1.__extends(Margins, _super);
    function Margins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margins.empty = function () {
        return new Margins(0, 0, 0, 0);
    };
    Margins.prototype.clone = function () {
        return new Margins(this.left, this.right, this.top, this.bottom);
    };
    return Margins;
}(offsets_1.Offsets));
exports.Margins = Margins;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Paddings = void 0;
var tslib_1 = __webpack_require__(1);
var offsets_1 = __webpack_require__(13);
var Paddings = (function (_super) {
    tslib_1.__extends(Paddings, _super);
    function Paddings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paddings.empty = function () {
        return new Paddings(0, 0, 0, 0);
    };
    Paddings.prototype.clone = function () {
        return new Paddings(this.left, this.right, this.top, this.bottom);
    };
    return Paddings;
}(offsets_1.Offsets));
exports.Paddings = Paddings;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollisionResult = exports.Polygon = void 0;
var tslib_1 = __webpack_require__(1);
var point_1 = __webpack_require__(4);
var vector_1 = __webpack_require__(14);
var segment_1 = __webpack_require__(15);
var polygonal_chain_1 = __webpack_require__(33);
var Polygon = (function (_super) {
    tslib_1.__extends(Polygon, _super);
    function Polygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Polygon.prototype, "numEdges", {
        get: function () {
            return this.points.length;
        },
        enumerable: false,
        configurable: true
    });
    Polygon.fromRectangle = function (rect) {
        var right = rect.x + rect.width;
        var bottom = rect.y + rect.height;
        return new Polygon([
            new point_1.Point(rect.x, rect.y),
            new point_1.Point(right, rect.y),
            new point_1.Point(right, bottom),
            new point_1.Point(rect.x, bottom)
        ]);
    };
    Polygon.prototype.getEdge = function (edgeIndex) {
        return new segment_1.Segment(this.points[edgeIndex], this.points[(edgeIndex + 1) % this.numEdges]);
    };
    Polygon.collision = function (a, b) {
        var edgeCountA = a.numEdges;
        var edgeCountB = b.numEdges;
        var intersect = false;
        for (var edgeIndex = 0; edgeIndex < edgeCountA + edgeCountB; edgeIndex++) {
            var edge = edgeIndex < edgeCountA ? a.getEdge(edgeIndex) : b.getEdge(edgeIndex - edgeCountA);
            var edgeVector = vector_1.Vector.fromSegment(edge);
            var axis = new vector_1.Vector(-edgeVector.y, edgeVector.x).normalize();
            var projectionA = a.projection(axis);
            var projectionB = b.projection(axis);
            var intersectionOfProjection = projectionA.minValue < projectionB.minValue ?
                projectionB.minValue - projectionA.maxValue :
                projectionA.minValue - projectionB.maxValue;
            if (intersectionOfProjection > 0)
                return CollisionResult.None;
            if (intersectionOfProjection < 0)
                intersect = true;
        }
        return intersect ? CollisionResult.Intersect : CollisionResult.Contact;
    };
    return Polygon;
}(polygonal_chain_1.PolygonalChain));
exports.Polygon = Polygon;
var CollisionResult;
(function (CollisionResult) {
    CollisionResult[CollisionResult["None"] = 0] = "None";
    CollisionResult[CollisionResult["Intersect"] = 1] = "Intersect";
    CollisionResult[CollisionResult["Contact"] = 2] = "Contact";
})(CollisionResult = exports.CollisionResult || (exports.CollisionResult = {}));


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SparseIntervalsMapCollector = void 0;
var map_iterator_1 = __webpack_require__(34);
var SparseIntervalsMapCollector = (function () {
    function SparseIntervalsMapCollector(cmp, template) {
        this.intervals = [];
        this.valMap = {};
        this.cmp = cmp;
        this.template = template;
    }
    SparseIntervalsMapCollector.prototype.add = function (index, value) {
        if (this.curr && this.curr.end === index && this.cmp(this.currVal, value) === 0) {
            this.curr.length++;
            return;
        }
        this.curr = this.template.makeByStartLength(index, 1);
        this.intervals.push(this.curr);
        this.currVal = value;
        this.valMap[index] = value;
    };
    SparseIntervalsMapCollector.prototype.getIterator = function () {
        return new map_iterator_1.SparseIntervalsMapIterator(this.intervals, this.valMap);
    };
    return SparseIntervalsMapCollector;
}());
exports.SparseIntervalsMapCollector = SparseIntervalsMapCollector;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundaryInterval = void 0;
var tslib_1 = __webpack_require__(1);
var mutable_1 = __webpack_require__(18);
var BoundaryInterval = (function (_super) {
    tslib_1.__extends(BoundaryInterval, _super);
    function BoundaryInterval(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    Object.defineProperty(BoundaryInterval.prototype, "length", {
        get: function () {
            return this.end - this.start;
        },
        set: function (newLength) {
            this.end = this.start + newLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoundaryInterval.prototype, "center", {
        get: function () {
            return (this.start + this.end) / 2;
        },
        enumerable: false,
        configurable: true
    });
    BoundaryInterval.normalized = function (pointA, pointB) {
        return pointA > pointB ?
            new BoundaryInterval(pointB, pointA) :
            new BoundaryInterval(pointA, pointB);
    };
    BoundaryInterval.prototype.copyFrom = function (obj) {
        this.start = obj.start;
        this.end = obj.end;
    };
    BoundaryInterval.prototype.equals = function (obj) {
        return obj && this.start === obj.start && this.end === obj.end;
    };
    BoundaryInterval.prototype.clone = function () {
        return new BoundaryInterval(this.start, this.length);
    };
    BoundaryInterval.prototype.makeByStartEnd = function (start, end) {
        return new BoundaryInterval(start, end);
    };
    BoundaryInterval.prototype.makeByStartLength = function (start, length) {
        return new BoundaryInterval(start, start + length);
    };
    BoundaryInterval.prototype.makeByLengthEnd = function (length, end) {
        return new BoundaryInterval(end - length, end);
    };
    BoundaryInterval.makeByConstInterval = function (interval) {
        return new BoundaryInterval(interval.start, interval.end);
    };
    BoundaryInterval.prototype.expand = function (interval) {
        this.start = Math.min(interval.start, this.start);
        this.end = Math.max(interval.end, this.end);
        return this;
    };
    return BoundaryInterval;
}(mutable_1.MutableInterval));
exports.BoundaryInterval = BoundaryInterval;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfHelperFrame = void 0;
var browser_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(21);
var plugin_helper_1 = __webpack_require__(35);
var PdfHelperFrame = (function () {
    function PdfHelperFrame(container, frameClassName) {
        this.helperFrame = null;
        this.helperFrameName = null;
        this.container = container;
        this.frameClassName = frameClassName;
    }
    PdfHelperFrame.prototype.dispose = function () {
        this.removeHelperFrame();
    };
    PdfHelperFrame.prototype.showPrintDialog = function (resourceUrl) {
        if (browser_1.Browser.Edge || plugin_helper_1.PdfPluginHelper.isInstalled())
            this.getHelperFrame().document.location = resourceUrl;
        else {
            var printWindow_1 = window.open(resourceUrl, 'print', "height=" + window.innerHeight + ",width=" + window.innerWidth + ",tabbar=no");
            if (printWindow_1) {
                printWindow_1.focus();
                setTimeout(function () {
                    printWindow_1.print();
                }, 100);
            }
        }
    };
    PdfHelperFrame.prototype.getHelperFrame = function () {
        if (browser_1.Browser.Firefox)
            this.removeHelperFrame();
        if (!this.helperFrame)
            this.createHelperFrame();
        return this.helperFrame;
    };
    PdfHelperFrame.prototype.removeHelperFrame = function () {
        if (this.helperFrame) {
            dom_1.DomUtils.hideNode(this.helperFrame);
            try {
                delete window.frames[this.helperFrameName];
            }
            catch (e) {
            }
            this.helperFrame = null;
            this.helperFrameName = null;
        }
    };
    PdfHelperFrame.prototype.createHelperFrame = function () {
        var helperFrame = document.createElement('iframe');
        var frameSize = browser_1.Browser.Safari ? '1px' : '0px';
        helperFrame.style.width = frameSize;
        helperFrame.style.height = frameSize;
        helperFrame.name = this.getNewName();
        helperFrame.className = this.frameClassName;
        if ((browser_1.Browser.Chrome && browser_1.Browser.Version >= 77) || browser_1.Browser.Edge || browser_1.Browser.Safari) {
            helperFrame.addEventListener('load', function () {
                var _a, _b, _c;
                if (((_a = helperFrame.contentDocument) === null || _a === void 0 ? void 0 : _a.contentType) === 'application/pdf') {
                    if (browser_1.Browser.Edge)
                        (_b = helperFrame.contentWindow) === null || _b === void 0 ? void 0 : _b.document.execCommand('print', false, undefined);
                    else if (browser_1.Browser.Safari) {
                        setTimeout(function () {
                            var _a;
                            (_a = helperFrame.contentWindow) === null || _a === void 0 ? void 0 : _a.print();
                        }, 1000);
                    }
                    else
                        (_c = helperFrame.contentWindow) === null || _c === void 0 ? void 0 : _c.print();
                }
            });
        }
        this.container.appendChild(helperFrame);
        this.helperFrame = window.frames[helperFrame.name];
        this.helperFrameName = helperFrame.name;
    };
    PdfHelperFrame.prototype.getNewName = function () {
        for (var index = 0; true; index++) {
            var name_1 = "dxreHelperFrame" + index;
            if (!window.frames[name_1])
                return name_1;
        }
    };
    return PdfHelperFrame;
}());
exports.PdfHelperFrame = PdfHelperFrame;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringSequenceComparatorItertor = exports.StringSesElem = exports.StringSequenceComparator = void 0;
var common_1 = __webpack_require__(36);
var StringSequenceComparator = (function () {
    function StringSequenceComparator(a, b) {
        this.editDistance = null;
        this.lcs = '';
        this.ses = [];
        this.path = [];
        this.pathposi = [];
        this.a = a;
        this.b = b;
        this.m = this.a.length;
        this.n = this.b.length;
        this.reverse = this.m > this.n;
        if (this.reverse) {
            var tmpA = this.a;
            this.a = this.b;
            this.b = tmpA;
            var tmpM = this.m;
            this.m = this.n;
            this.n = tmpM;
        }
        this.offset = this.m + 1;
    }
    StringSequenceComparator.prototype.calculate = function () {
        var size = this.m + this.n + 3;
        var fp = {};
        for (var i = 0; i < size; ++i) {
            fp[i] = -1;
            this.path[i] = -1;
        }
        var delta = this.n - this.m;
        var p = -1;
        do {
            ++p;
            for (var k = -p; k <= delta - 1; ++k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            for (var k = delta + p; k >= delta + 1; --k)
                fp[k + this.offset] = this.snake(k, fp[k - 1 + this.offset] + 1, fp[k + 1 + this.offset]);
            fp[delta + this.offset] = this.snake(delta, fp[delta - 1 + this.offset] + 1, fp[delta + 1 + this.offset]);
        } while (fp[delta + this.offset] !== this.n);
        this.editDistance = delta + 2 * p;
        var r = this.path[delta + this.offset];
        var epc = [];
        while (r !== -1) {
            var pos = this.pathposi[r];
            epc.push(new PathElem(pos.x, pos.y, null));
            r = pos.k;
        }
        this.recordSeq(epc);
        return this.ses;
    };
    StringSequenceComparator.prototype.toString = function () {
        var result = [];
        for (var _i = 0, _a = this.ses; _i < _a.length; _i++) {
            var elem = _a[_i];
            result.push(elem.toString());
        }
        return result.join('\n');
    };
    StringSequenceComparator.prototype.snake = function (k, p, pp) {
        var r = p > pp ?
            this.path[k - 1 + this.offset] :
            this.path[k + 1 + this.offset];
        var y = Math.max(p, pp);
        var x = y - k;
        while (x < this.m && y < this.n && this.a[x] === this.b[y]) {
            ++x;
            ++y;
        }
        var len = this.pathposi.push(new PathElem(x, y, r));
        this.path[k + this.offset] = len - 1;
        return y;
    };
    StringSequenceComparator.prototype.recordSeq = function (epc) {
        var px_idx = 0;
        var py_idx = 0;
        var addTag = this.reverse ? common_1.SesType.Delete : common_1.SesType.Add;
        var deleteTag = this.reverse ? common_1.SesType.Add : common_1.SesType.Delete;
        for (var i = epc.length - 1; i >= 0; --i) {
            var currEpc = epc[i];
            while (px_idx < currEpc.x || py_idx < currEpc.y) {
                var yxDiff = currEpc.y - currEpc.x;
                var pypxDiff = py_idx - px_idx;
                if (yxDiff > pypxDiff) {
                    this.ses.push(new StringSesElem(this.b[py_idx], addTag));
                    ++py_idx;
                }
                else if (yxDiff < pypxDiff) {
                    this.ses.push(new StringSesElem(this.a[px_idx], deleteTag));
                    ++px_idx;
                }
                else {
                    this.ses.push(new StringSesElem(this.a[px_idx], common_1.SesType.Common));
                    this.lcs += this.a[px_idx];
                    ++px_idx;
                    ++py_idx;
                }
            }
        }
    };
    return StringSequenceComparator;
}());
exports.StringSequenceComparator = StringSequenceComparator;
var PathElem = (function () {
    function PathElem(x, y, k) {
        this.x = x;
        this.y = y;
        this.k = k;
    }
    return PathElem;
}());
var StringSesElem = (function () {
    function StringSesElem(elem, type) {
        this.elem = elem;
        this.type = type;
    }
    StringSesElem.prototype.toString = function () {
        var sign;
        switch (this.type) {
            case common_1.SesType.Add:
                sign = '+';
                break;
            case common_1.SesType.Delete:
                sign = '-';
                break;
            case common_1.SesType.Common:
                sign = ' ';
                break;
        }
        return sign + this.elem;
    };
    return StringSesElem;
}());
exports.StringSesElem = StringSesElem;
var StringSequenceComparatorItertor = (function () {
    function StringSequenceComparatorItertor(str) {
        this.str = str;
    }
    Object.defineProperty(StringSequenceComparatorItertor.prototype, "length", {
        get: function () {
            return this.str.length;
        },
        enumerable: false,
        configurable: true
    });
    StringSequenceComparatorItertor.prototype.getComparer = function () {
        return function (a, b) { return a === b; };
    };
    StringSequenceComparatorItertor.prototype.getByIndex = function (index) {
        return this.str[index];
    };
    return StringSequenceComparatorItertor;
}());
exports.StringSequenceComparatorItertor = StringSequenceComparatorItertor;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberMapUtils = void 0;
var constants_1 = __webpack_require__(12);
var min_max_1 = __webpack_require__(5);
var NumberMapUtils = (function () {
    function NumberMapUtils() {
    }
    NumberMapUtils.forEach = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                callback(map[key], parseInt(key));
        }
    };
    NumberMapUtils.map = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                result[key] = callback(map[key], parseInt(key));
        }
        return result;
    };
    NumberMapUtils.reducedMap = function (map, callback) {
        var result = {};
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var newItem = callback(map[key], parseInt(key));
                if (newItem !== null)
                    result[key] = newItem;
            }
        }
        return result;
    };
    NumberMapUtils.clear = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                delete map[key];
        }
    };
    NumberMapUtils.shallowCopy = function (map) {
        return NumberMapUtils.map(map, function (val) { return val; });
    };
    NumberMapUtils.deepCopy = function (map) {
        return NumberMapUtils.map(map, function (val) { return val.clone(); });
    };
    NumberMapUtils.isEmpty = function (map) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                return false;
        }
        return true;
    };
    NumberMapUtils.accumulate = function (map, initAccValue, callback) {
        var acc = initAccValue;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                acc = callback(acc, map[key], parseInt(key));
        }
        return acc;
    };
    NumberMapUtils.keyBy = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var intKey = parseInt(key);
                if (callback(map[key], intKey))
                    return intKey;
            }
        }
        return null;
    };
    NumberMapUtils.elementBy = function (map, callback) {
        var key = NumberMapUtils.keyBy(map, callback);
        return key === null ? null : map[key];
    };
    NumberMapUtils.containsBy = function (map, callback) {
        return NumberMapUtils.keyBy(map, callback) !== null;
    };
    NumberMapUtils.toList = function (map) {
        return NumberMapUtils.toListBy(map, function (elem) { return elem; });
    };
    NumberMapUtils.toListBy = function (map, callback, maxElements) {
        if (maxElements === void 0) { maxElements = constants_1.Constants.MAX_SAFE_INTEGER; }
        var result = [];
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                result.push(callback(map[key], parseInt(key)));
                if (!--maxElements)
                    break;
            }
        }
        return result;
    };
    NumberMapUtils.anyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], parseInt(key));
                if (res !== null)
                    return res;
            }
        }
        return null;
    };
    NumberMapUtils.unsafeAnyOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var res = callback(map[key], parseInt(key));
                if (res)
                    return res;
            }
        }
        return null;
    };
    NumberMapUtils.allOf = function (map, callback) {
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (!callback(map[key], parseInt(key)))
                    return false;
            }
        }
        return true;
    };
    NumberMapUtils.mapLength = function (map) {
        var length = 0;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key))
                length++;
        }
        return length;
    };
    NumberMapUtils.min = function (map, getValue) {
        var res = NumberMapUtils.minExtended(map, getValue);
        return res === null ? null : res.minElement;
    };
    NumberMapUtils.max = function (map, getValue) {
        var res = NumberMapUtils.maxExtended(map, getValue);
        return res === null ? null : res.maxElement;
    };
    NumberMapUtils.minMax = function (map, getValue) {
        var res = NumberMapUtils.minMaxExtended(map, getValue);
        return res === null ? null : new min_max_1.MinMax(res.minElement, res.maxElement);
    };
    NumberMapUtils.minExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMin(minElement, minValue);
    };
    NumberMapUtils.maxExtended = function (map, getValue) {
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
                if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return maxElement === undefined ? null : new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    NumberMapUtils.minMaxExtended = function (map, getValue) {
        var minElement;
        var minValue = constants_1.Constants.MAX_SAFE_INTEGER;
        var maxElement;
        var maxValue = constants_1.Constants.MIN_SAFE_INTEGER;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                var currElem = map[key];
                var currValue = getValue(currElem, parseInt(key));
                if (currValue < minValue) {
                    minElement = currElem;
                    minValue = currValue;
                }
                else if (currValue > maxValue) {
                    maxElement = currElem;
                    maxValue = currValue;
                }
            }
        }
        return minElement === undefined ? null : new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    NumberMapUtils.maxByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) > 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    NumberMapUtils.minByCmp = function (map, cmp) {
        var found;
        for (var key in map) {
            if (Object.prototype.hasOwnProperty.call(map, key)) {
                if (found !== undefined) {
                    var elem = map[key];
                    if (cmp(elem, found) < 0)
                        found = elem;
                }
                else
                    found = map[key];
            }
        }
        return found === undefined ? null : found;
    };
    return NumberMapUtils;
}());
exports.NumberMapUtils = NumberMapUtils;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AttrUtils = void 0;
var browser_1 = __webpack_require__(0);
var AttrUtils = (function () {
    function AttrUtils() {
    }
    AttrUtils.setElementAttribute = function (obj, attrName, value) {
        if (obj.setAttribute) {
            if (browser_1.Browser.IE && browser_1.Browser.MajorVersion >= 11 && attrName.toLowerCase() === 'src')
                obj.setAttribute(attrName, '');
            obj.setAttribute(attrName, value);
        }
    };
    AttrUtils.setStyleAttribute = function (obj, attrName, value) {
        if (obj.setProperty)
            obj.setProperty(attrName, value, '');
    };
    AttrUtils.getElementAttribute = function (obj, attrName) {
        return obj.getAttribute(attrName);
    };
    AttrUtils.getStyleAttribute = function (obj, attrName) {
        if (obj.getPropertyValue) {
            if (browser_1.Browser.Firefox) {
                try {
                    return obj.getPropertyValue(attrName);
                }
                catch (e) {
                    return obj[attrName];
                }
            }
            return obj.getPropertyValue(attrName);
        }
        return null;
    };
    AttrUtils.removeElementAttribute = function (obj, attrName) {
        if (obj.removeAttribute)
            obj.removeAttribute(attrName);
    };
    AttrUtils.removeStyleAttribute = function (obj, attrName) {
        if (obj.removeProperty)
            obj.removeProperty(attrName);
    };
    AttrUtils.changeElementStyleAttribute = function (obj, attrName, newValue) {
        AttrUtils.saveStyleAttributeInElement(obj, attrName);
        AttrUtils.setStyleAttribute(obj.style, attrName, newValue);
    };
    AttrUtils.restoreElementStyleAttribute = function (obj, attrName) {
        var savedAttrName = "dxwu_saved" + attrName;
        var style = obj.style;
        if (AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getElementAttribute(obj, savedAttrName);
            if (oldValue === AttrUtils.emptyObject || oldValue === null)
                AttrUtils.removeStyleAttribute(style, attrName);
            else
                AttrUtils.setStyleAttribute(style, attrName, oldValue);
            AttrUtils.removeElementAttribute(obj, savedAttrName);
            return true;
        }
        return false;
    };
    AttrUtils.saveStyleAttributeInElement = function (obj, attrName) {
        var savedAttrName = "dxwu_saved" + attrName;
        var style = obj.style;
        if (!AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getStyleAttribute(style, attrName);
            AttrUtils.setElementAttribute(obj, savedAttrName, AttrUtils.isAttributeExists(oldValue) ? oldValue : AttrUtils.emptyObject);
        }
    };
    AttrUtils.isExistsAttributeInElement = function (obj, attrName) {
        var value = AttrUtils.getElementAttribute(obj, attrName);
        return AttrUtils.isAttributeExists(value);
    };
    AttrUtils.isAttributeExists = function (attrValue) {
        return attrValue !== null && attrValue !== '';
    };
    AttrUtils.emptyObject = 'DxEmptyValue';
    return AttrUtils;
}());
exports.AttrUtils = AttrUtils;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransferUtils = void 0;
var browser_1 = __webpack_require__(0);
var DataTransferUtils = (function () {
    function DataTransferUtils() {
    }
    DataTransferUtils.isBrowserSupportExtendedClientBuffer = function () {
        return browser_1.Browser.WebKitFamily || (browser_1.Browser.Firefox && browser_1.Browser.MajorVersion >= 50) || (browser_1.Browser.Edge && browser_1.Browser.MajorVersion >= 14);
    };
    DataTransferUtils.getPlainTextItem = function (items) {
        return DataTransferUtils.getTransferItemByType(items, 'text/plain');
    };
    DataTransferUtils.getRtfTextItem = function (items) {
        return DataTransferUtils.getTransferItemByType(items, 'text/rtf');
    };
    DataTransferUtils.getImageItem = function (items) {
        var len = items.length;
        while (len--) {
            if (items[len].type.indexOf('image') >= 0)
                return items[len].getAsFile();
        }
        return null;
    };
    DataTransferUtils.getTransferItemByType = function (items, type) {
        if (this.isBrowserSupportExtendedClientBuffer()) {
            var len = items.length;
            while (len--) {
                var item = items[len];
                if (item.type.indexOf(type) >= 0)
                    return item;
            }
        }
        return null;
    };
    return DataTransferUtils;
}());
exports.DataTransferUtils = DataTransferUtils;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUtils = void 0;
var EnumUtils = (function () {
    function EnumUtils() {
    }
    EnumUtils.forEach = function (enumObject, callback) {
        for (var key in enumObject) {
            if (!Object.prototype.hasOwnProperty.call(enumObject, key))
                continue;
            var keyNum = parseInt(key);
            if (!isNaN(keyNum))
                callback(keyNum);
        }
    };
    EnumUtils.isAnyOf = function (value) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
            var param = params_1[_a];
            if (value === param)
                return true;
        }
        return false;
    };
    return EnumUtils;
}());
exports.EnumUtils = EnumUtils;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EvtUtils = void 0;
var browser_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(21);
var touch_1 = __webpack_require__(8);
var EvtUtils = (function () {
    function EvtUtils() {
    }
    EvtUtils.preventEvent = function (evt) {
        if (!evt.cancelable)
            return;
        if (evt.preventDefault)
            evt.preventDefault();
        else
            evt.returnValue = false;
    };
    EvtUtils.getEventSource = function (evt) {
        return common_1.isDefined(evt) ? EvtUtils.getEventSourceCore(evt) : null;
    };
    EvtUtils.getEventSourceByPosition = function (evt) {
        if (!common_1.isDefined(evt))
            return null;
        if (!document.elementFromPoint)
            return EvtUtils.getEventSourceCore(evt);
        var clientX = EvtUtils.getEventX(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollLeft() : 0);
        var clientY = EvtUtils.getEventY(evt) - (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollTop() : 0);
        if (clientX === undefined || clientY === undefined)
            return EvtUtils.getEventSourceCore(evt);
        return document.elementFromPoint(clientX, clientY);
    };
    EvtUtils.getEventSourceCore = function (evt) {
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    EvtUtils.getMouseWheelEventName = function () {
        if (browser_1.Browser.Safari)
            return 'mousewheel';
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            return 'DOMMouseScroll';
        return 'wheel';
    };
    EvtUtils.isLeftButtonPressed = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return true;
        evt = (browser_1.Browser.IE && common_1.isDefined(event)) ? event : evt;
        if (!evt)
            return false;
        if (browser_1.Browser.IE && browser_1.Browser.Version < 11)
            return browser_1.Browser.MSTouchUI ? true : evt.button % 2 === 1;
        if (browser_1.Browser.WebKitFamily)
            return (evt.type === 'pointermove' || evt.type === 'pointerenter' || evt.type === 'pointerleave') ? evt.buttons === 1 : evt.which === 1;
        if (browser_1.Browser.NetscapeFamily || browser_1.Browser.Edge || (browser_1.Browser.IE && browser_1.Browser.Version >= 11))
            return EvtUtils.isMoveEventName(evt.type) ? evt.buttons === 1 : evt.which === 1;
        return browser_1.Browser.Opera ? evt.button === 0 : true;
    };
    EvtUtils.isMoveEventName = function (type) {
        return type === touch_1.TouchUtils.touchMouseMoveEventName || type === EvtUtils.getMoveEventName();
    };
    EvtUtils.getMoveEventName = function () {
        return window.PointerEvent ? 'pointermove' : (browser_1.Browser.TouchUI ? 'touchmove' : 'mousemove');
    };
    EvtUtils.preventEventAndBubble = function (evt) {
        EvtUtils.preventEvent(evt);
        if (evt.stopPropagation)
            evt.stopPropagation();
        evt.cancelBubble = true;
    };
    EvtUtils.clientEventRequiresDocScrollCorrection = function () {
        var isSafariVerLess3 = browser_1.Browser.Safari && browser_1.Browser.Version < 3;
        var isMacOSMobileVerLess51 = browser_1.Browser.MacOSMobilePlatform && browser_1.Browser.Version < 5.1;
        return browser_1.Browser.AndroidDefaultBrowser || browser_1.Browser.AndroidChromeBrowser || !(isSafariVerLess3 || isMacOSMobileVerLess51);
    };
    EvtUtils.getEventX = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventX(evt);
        return evt.clientX + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollLeft() : 0);
    };
    EvtUtils.getEventY = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventY(evt);
        return evt.clientY + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollTop() : 0);
    };
    EvtUtils.cancelBubble = function (evt) {
        evt.cancelBubble = true;
    };
    EvtUtils.getWheelDelta = function (evt) {
        var ret;
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            ret = -evt.detail;
        else if (browser_1.Browser.Safari)
            ret = evt.wheelDelta;
        else
            ret = -evt.deltaY;
        if (browser_1.Browser.Opera && browser_1.Browser.Version < 9)
            ret = -ret;
        return ret;
    };
    return EvtUtils;
}());
exports.EvtUtils = EvtUtils;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFont = exports.addFontToDocument = exports.loadFont = exports.afterFontsLoaded = exports.fontWebApiAvailable = void 0;
function fontWebApiAvailable() {
    return document.fonts && document.fonts.ready && document.fonts.ready.then;
}
exports.fontWebApiAvailable = fontWebApiAvailable;
function afterFontsLoaded(callback) {
    document.fonts.ready.then(callback);
}
exports.afterFontsLoaded = afterFontsLoaded;
function loadFont(fontFamily, source, fontFaceDescriptors, callback) {
    var font = new (window.FontFace)(fontFamily, source, fontFaceDescriptors);
    font.load().then(function (loadedFace) {
        addFontToDocument(loadedFace);
        callback(null);
    }).catch(function (error) {
        return callback(error);
    });
}
exports.loadFont = loadFont;
function addFontToDocument(loadedFace) {
    document.fonts.add(loadedFace);
}
exports.addFontToDocument = addFontToDocument;
function checkFont(fontFamily, text) {
    if (text === void 0) { text = 'b'; }
    return document.fonts.check("12px '" + fontFamily + "'", text);
}
exports.checkFont = checkFont;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonUtils = void 0;
var JsonUtils = (function () {
    function JsonUtils() {
    }
    JsonUtils.isValid = function (json) {
        return !(/[^,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(json.replace(/"(\\.|[^"\\])*"/g, '')));
    };
    return JsonUtils;
}());
exports.JsonUtils = JsonUtils;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCode = exports.ModifierKey = exports.KeyUtils = void 0;
var browser_1 = __webpack_require__(0);
var encode_1 = __webpack_require__(40);
var string_1 = __webpack_require__(3);
var KeyUtils = (function () {
    function KeyUtils() {
    }
    KeyUtils.getKeyModifiers = function (evt) {
        var result = 0;
        if (evt.altKey)
            result |= ModifierKey.Alt;
        if (evt.ctrlKey)
            result |= ModifierKey.Ctrl;
        if (evt.shiftKey)
            result |= ModifierKey.Shift;
        if (evt.metaKey)
            result |= ModifierKey.Meta;
        return result;
    };
    KeyUtils.getShortcutCode = function (keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey) {
        var value = keyCode;
        value |= isCtrlKey ? ModifierKey.Ctrl : 0;
        value |= isShiftKey ? ModifierKey.Shift : 0;
        value |= isAltKey ? ModifierKey.Alt : 0;
        value |= isMetaKey ? ModifierKey.Meta : 0;
        return value;
    };
    KeyUtils.getShortcutCodeByEvent = function (evt) {
        return KeyUtils.getShortcutCode(KeyUtils.getEventKeyCode(evt), evt.ctrlKey, evt.shiftKey, evt.altKey, browser_1.Browser.MacOSPlatform ? evt.metaKey : false);
    };
    KeyUtils.getEventKeyCode = function (evt) {
        return browser_1.Browser.NetscapeFamily || browser_1.Browser.Opera ? evt.which : evt.keyCode;
    };
    KeyUtils.parseShortcutString = function (shortcutString) {
        if (!shortcutString)
            return 0;
        var isCtrlKey = false;
        var isShiftKey = false;
        var isAltKey = false;
        var isMetaKey = false;
        var keyCode = null;
        var shcKeys = shortcutString.toString().split('+');
        if (shcKeys.length > 0) {
            for (var i = 0; i < shcKeys.length; i++) {
                var key = string_1.StringUtils.trim(shcKeys[i].toUpperCase());
                switch (key) {
                    case 'CONTROL':
                    case 'CONTROLKEY':
                    case 'CTRL':
                        isCtrlKey = true;
                        break;
                    case 'SHIFT':
                    case 'SHIFTKEY':
                        isShiftKey = true;
                        break;
                    case 'ALT':
                        isAltKey = true;
                        break;
                    case 'CMD':
                        isMetaKey = true;
                        break;
                    case 'F1':
                        keyCode = KeyCode.F1;
                        break;
                    case 'F2':
                        keyCode = KeyCode.F2;
                        break;
                    case 'F3':
                        keyCode = KeyCode.F3;
                        break;
                    case 'F4':
                        keyCode = KeyCode.F4;
                        break;
                    case 'F5':
                        keyCode = KeyCode.F5;
                        break;
                    case 'F6':
                        keyCode = KeyCode.F6;
                        break;
                    case 'F7':
                        keyCode = KeyCode.F7;
                        break;
                    case 'F8':
                        keyCode = KeyCode.F8;
                        break;
                    case 'F9':
                        keyCode = KeyCode.F9;
                        break;
                    case 'F10':
                        keyCode = KeyCode.F10;
                        break;
                    case 'F11':
                        keyCode = KeyCode.F11;
                        break;
                    case 'F12':
                        keyCode = KeyCode.F12;
                        break;
                    case 'RETURN':
                    case 'ENTER':
                        keyCode = KeyCode.Enter;
                        break;
                    case 'HOME':
                        keyCode = KeyCode.Home;
                        break;
                    case 'END':
                        keyCode = KeyCode.End;
                        break;
                    case 'LEFT':
                        keyCode = KeyCode.Left;
                        break;
                    case 'RIGHT':
                        keyCode = KeyCode.Right;
                        break;
                    case 'UP':
                        keyCode = KeyCode.Up;
                        break;
                    case 'DOWN':
                        keyCode = KeyCode.Down;
                        break;
                    case 'PAGEUP':
                        keyCode = KeyCode.PageUp;
                        break;
                    case 'PAGEDOWN':
                        keyCode = KeyCode.PageDown;
                        break;
                    case 'SPACE':
                        keyCode = KeyCode.Space;
                        break;
                    case 'TAB':
                        keyCode = KeyCode.Tab;
                        break;
                    case 'BACKSPACE':
                    case 'BACK':
                        keyCode = KeyCode.Backspace;
                        break;
                    case 'CONTEXT':
                        keyCode = KeyCode.ContextMenu;
                        break;
                    case 'ESCAPE':
                    case 'ESC':
                        keyCode = KeyCode.Esc;
                        break;
                    case 'DELETE':
                    case 'DEL':
                        keyCode = KeyCode.Delete;
                        break;
                    case 'INSERT':
                    case 'INS':
                        keyCode = KeyCode.Insert;
                        break;
                    case 'PLUS':
                        keyCode = '+'.charCodeAt(0);
                        break;
                    default:
                        keyCode = key.charCodeAt(0);
                        break;
                }
            }
        }
        else
            alert(encode_1.EncodeUtils.decodeViaTextArea('Invalid shortcut'));
        return KeyUtils.getShortcutCode(keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey);
    };
    return KeyUtils;
}());
exports.KeyUtils = KeyUtils;
var ModifierKey;
(function (ModifierKey) {
    ModifierKey[ModifierKey["None"] = 0] = "None";
    ModifierKey[ModifierKey["Ctrl"] = 65536] = "Ctrl";
    ModifierKey[ModifierKey["Shift"] = 262144] = "Shift";
    ModifierKey[ModifierKey["Alt"] = 1048576] = "Alt";
    ModifierKey[ModifierKey["Meta"] = 16777216] = "Meta";
})(ModifierKey = exports.ModifierKey || (exports.ModifierKey = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
    KeyCode[KeyCode["Tab"] = 9] = "Tab";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Pause"] = 19] = "Pause";
    KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
    KeyCode[KeyCode["Esc"] = 27] = "Esc";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
    KeyCode[KeyCode["End"] = 35] = "End";
    KeyCode[KeyCode["Home"] = 36] = "Home";
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Insert"] = 45] = "Insert";
    KeyCode[KeyCode["Delete"] = 46] = "Delete";
    KeyCode[KeyCode["Key_0"] = 48] = "Key_0";
    KeyCode[KeyCode["Key_1"] = 49] = "Key_1";
    KeyCode[KeyCode["Key_2"] = 50] = "Key_2";
    KeyCode[KeyCode["Key_3"] = 51] = "Key_3";
    KeyCode[KeyCode["Key_4"] = 52] = "Key_4";
    KeyCode[KeyCode["Key_5"] = 53] = "Key_5";
    KeyCode[KeyCode["Key_6"] = 54] = "Key_6";
    KeyCode[KeyCode["Key_7"] = 55] = "Key_7";
    KeyCode[KeyCode["Key_8"] = 56] = "Key_8";
    KeyCode[KeyCode["Key_9"] = 57] = "Key_9";
    KeyCode[KeyCode["Key_a"] = 65] = "Key_a";
    KeyCode[KeyCode["Key_b"] = 66] = "Key_b";
    KeyCode[KeyCode["Key_c"] = 67] = "Key_c";
    KeyCode[KeyCode["Key_d"] = 68] = "Key_d";
    KeyCode[KeyCode["Key_e"] = 69] = "Key_e";
    KeyCode[KeyCode["Key_f"] = 70] = "Key_f";
    KeyCode[KeyCode["Key_g"] = 71] = "Key_g";
    KeyCode[KeyCode["Key_h"] = 72] = "Key_h";
    KeyCode[KeyCode["Key_i"] = 73] = "Key_i";
    KeyCode[KeyCode["Key_j"] = 74] = "Key_j";
    KeyCode[KeyCode["Key_k"] = 75] = "Key_k";
    KeyCode[KeyCode["Key_l"] = 76] = "Key_l";
    KeyCode[KeyCode["Key_m"] = 77] = "Key_m";
    KeyCode[KeyCode["Key_n"] = 78] = "Key_n";
    KeyCode[KeyCode["Key_o"] = 79] = "Key_o";
    KeyCode[KeyCode["Key_p"] = 80] = "Key_p";
    KeyCode[KeyCode["Key_q"] = 81] = "Key_q";
    KeyCode[KeyCode["Key_r"] = 82] = "Key_r";
    KeyCode[KeyCode["Key_s"] = 83] = "Key_s";
    KeyCode[KeyCode["Key_t"] = 84] = "Key_t";
    KeyCode[KeyCode["Key_u"] = 85] = "Key_u";
    KeyCode[KeyCode["Key_v"] = 86] = "Key_v";
    KeyCode[KeyCode["Key_w"] = 87] = "Key_w";
    KeyCode[KeyCode["Key_x"] = 88] = "Key_x";
    KeyCode[KeyCode["Key_y"] = 89] = "Key_y";
    KeyCode[KeyCode["Key_z"] = 90] = "Key_z";
    KeyCode[KeyCode["Windows"] = 91] = "Windows";
    KeyCode[KeyCode["ContextMenu"] = 93] = "ContextMenu";
    KeyCode[KeyCode["Numpad_0"] = 96] = "Numpad_0";
    KeyCode[KeyCode["Numpad_1"] = 97] = "Numpad_1";
    KeyCode[KeyCode["Numpad_2"] = 98] = "Numpad_2";
    KeyCode[KeyCode["Numpad_3"] = 99] = "Numpad_3";
    KeyCode[KeyCode["Numpad_4"] = 100] = "Numpad_4";
    KeyCode[KeyCode["Numpad_5"] = 101] = "Numpad_5";
    KeyCode[KeyCode["Numpad_6"] = 102] = "Numpad_6";
    KeyCode[KeyCode["Numpad_7"] = 103] = "Numpad_7";
    KeyCode[KeyCode["Numpad_8"] = 104] = "Numpad_8";
    KeyCode[KeyCode["Numpad_9"] = 105] = "Numpad_9";
    KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
    KeyCode[KeyCode["Add"] = 107] = "Add";
    KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
    KeyCode[KeyCode["Decimal"] = 110] = "Decimal";
    KeyCode[KeyCode["Divide"] = 111] = "Divide";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
    KeyCode[KeyCode["Semicolon"] = 186] = "Semicolon";
    KeyCode[KeyCode["Equals"] = 187] = "Equals";
    KeyCode[KeyCode["Comma"] = 188] = "Comma";
    KeyCode[KeyCode["Dash"] = 189] = "Dash";
    KeyCode[KeyCode["Period"] = 190] = "Period";
    KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
    KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
    KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
    KeyCode[KeyCode["BackSlash"] = 220] = "BackSlash";
    KeyCode[KeyCode["CloseBracket"] = 221] = "CloseBracket";
    KeyCode[KeyCode["SingleQuote"] = 222] = "SingleQuote";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupUtils = void 0;
var browser_1 = __webpack_require__(0);
var PopupUtils = (function () {
    function PopupUtils() {
    }
    PopupUtils.preventContextMenu = function (evt) {
        evt === null || evt === void 0 ? void 0 : evt.stopPropagation();
        evt === null || evt === void 0 ? void 0 : evt.preventDefault();
        if (browser_1.Browser.WebKitFamily)
            evt.returnValue = false;
    };
    return PopupUtils;
}());
exports.PopupUtils = PopupUtils;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
var browser_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var string_1 = __webpack_require__(3);
var javascriptPrefix = 'javascript:';
var Url = (function () {
    function Url() {
    }
    Url.containsClientScript = function (url) {
        return url.toLowerCase().indexOf(javascriptPrefix) !== -1;
    };
    Url.navigate = function (url, target) {
        if (string_1.StringUtils.isNullOrEmpty(url))
            return;
        else if (Url.containsClientScript(url))
            eval(url.substr(javascriptPrefix.length));
        else {
            try {
                if (common_1.isNonNullString(target))
                    Url.navigateTo(url, target);
                else
                    location.href = url;
            }
            catch (e) {
            }
        }
    };
    Url.navigateTo = function (url, target) {
        var lowerCaseTarget = target.toLowerCase();
        if ('_top' === lowerCaseTarget)
            top.location.href = url;
        else if ('_self' === lowerCaseTarget)
            location.href = url;
        else if ('_search' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else if ('_media' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else if ('_parent' === lowerCaseTarget)
            window.parent.location.href = url;
        else if ('_blank' === lowerCaseTarget)
            Url.openInNewWindow(url);
        else {
            var frame = Url.getFrame(top.frames, target);
            if (frame !== null)
                frame.location.href = url;
            else
                Url.openInNewWindow(url);
        }
    };
    Url.openInNewWindow = function (url) {
        if (browser_1.Browser.Safari)
            Url.openInNewWindowViaIframe(url);
        else {
            var newWindow = window.open();
            if (newWindow) {
                newWindow.opener = null;
                newWindow.location.assign(url);
            }
        }
    };
    Url.openInNewWindowViaIframe = function (url) {
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        var openArgs = '"' + url + '"';
        var script = iframeDoc.createElement('script');
        script.type = 'text/javascript';
        script.text = 'window.parent = null; ' +
            'window.top = null;' +
            'window.frameElement = null;' +
            'var child = window.open(' + openArgs + ');' +
            'child.opener = null';
        iframeDoc.body.appendChild(script);
        document.body.removeChild(iframe);
    };
    Url.getFrame = function (frames, name) {
        if (frames[name])
            return frames[name];
        for (var i = 0; i < frames.length; i++) {
            try {
                var frame = frames[i];
                if (frame.name === name)
                    return frame;
                frame = Url.getFrame(frame.frames, name);
                if (frame !== null)
                    return frame;
            }
            catch (e) {
            }
        }
        return null;
    };
    return Url;
}());
exports.Url = Url;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
var Errors = (function () {
    function Errors() {
    }
    Errors.internalExceptionTemplate = function (str) {
        return Errors.InternalException + " " + str;
    };
    Errors.NotImplemented = 'The method is not implemented.';
    Errors.InternalException = 'Internal exception.';
    Errors.ValueCannotBeNull = 'Value cannot be null.';
    return Errors;
}());
exports.Errors = Errors;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ })
/******/ ]);