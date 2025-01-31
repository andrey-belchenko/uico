/**
 * DevExtreme (esm/viz/gauges/theme_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    extend
} from "../../core/utils/extend";
const _extend = extend;
import {
    BaseThemeManager
} from "../core/base_theme_manager";
const ThemeManager = BaseThemeManager.inherit({
    ctor(options) {
        this.callBase.apply(this, arguments);
        this._subTheme = options.subTheme
    },
    _initializeTheme: function() {
        const that = this;
        let subTheme;
        if (that._subTheme) {
            subTheme = _extend(true, {}, that._theme[that._subTheme], that._theme);
            _extend(true, that._theme, subTheme)
        }
        that.callBase.apply(that, arguments)
    }
});
export default {
    ThemeManager: ThemeManager
};
