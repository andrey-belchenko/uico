/**
 * DevExtreme (esm/viz/core/base_theme_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Class from "../../core/class";
import {
    extend
} from "../../core/utils/extend";
import {
    isString as _isString
} from "../../core/utils/type";
import {
    each
} from "../../core/utils/iterator";
import {
    createPalette as getPalette,
    getDiscretePalette,
    getGradientPalette,
    getAccentColor as accentColor
} from "../palette";
import {
    parseScalar as _parseScalar
} from "./utils";
import {
    getTheme,
    addCacheItem,
    removeCacheItem
} from "../themes";
const _getTheme = getTheme;
const _addCacheItem = addCacheItem;
const _removeCacheItem = removeCacheItem;
const _extend = extend;
const _each = each;

function getThemePart(theme, path) {
    let _theme = theme;
    path && _each(path.split("."), (function(_, pathItem) {
        return _theme = _theme[pathItem]
    }));
    return _theme
}
export const BaseThemeManager = Class.inherit({
    ctor: function(options) {
        this._themeSection = options.themeSection;
        this._fontFields = options.fontFields || [];
        _addCacheItem(this)
    },
    dispose: function() {
        _removeCacheItem(this);
        this._callback = this._theme = this._font = null;
        return this
    },
    setCallback: function(callback) {
        this._callback = callback;
        return this
    },
    setTheme: function(theme, rtl) {
        this._current = theme;
        this._rtl = rtl;
        return this.refresh()
    },
    refresh: function() {
        const that = this;
        const current = that._current || {};
        let theme = _getTheme(current.name || current);
        that._themeName = theme.name;
        that._defaultPalette = theme.defaultPalette;
        that._font = _extend({}, theme.font, current.font);
        that._themeSection && _each(that._themeSection.split("."), (function(_, path) {
            theme = _extend(true, {}, theme[path])
        }));
        that._theme = _extend(true, {}, theme, _isString(current) ? {} : current);
        that._initializeTheme();
        if (_parseScalar(that._rtl, that._theme.rtlEnabled)) {
            _extend(true, that._theme, that._theme._rtl)
        }
        that._callback();
        return that
    },
    theme: function(path) {
        return getThemePart(this._theme, path)
    },
    themeName: function() {
        return this._themeName
    },
    createPalette: function(palette, options) {
        return getPalette(palette, options, this._defaultPalette)
    },
    createDiscretePalette: function(palette, count) {
        return getDiscretePalette(palette, count, this._defaultPalette)
    },
    createGradientPalette: function(palette) {
        return getGradientPalette(palette, this._defaultPalette)
    },
    getAccentColor: function(palette) {
        return accentColor(palette, this._defaultPalette)
    },
    _initializeTheme: function() {
        const that = this;
        _each(that._fontFields || [], (function(_, path) {
            that._initializeFont(getThemePart(that._theme, path))
        }))
    },
    _initializeFont: function(font) {
        _extend(font, this._font, _extend({}, font))
    }
});
