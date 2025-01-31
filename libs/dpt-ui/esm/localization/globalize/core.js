/**
 * DevExtreme (esm/localization/globalize/core.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Globalize from "globalize";
import coreLocalization from "../core";
import {
    enCldr
} from "../cldr-data/en";
import {
    supplementalCldr
} from "../cldr-data/supplemental";
if (Globalize && Globalize.load) {
    if (!Globalize.locale()) {
        Globalize.load(enCldr, supplementalCldr);
        Globalize.locale("en")
    }
    coreLocalization.inject({
        locale: function(locale) {
            if (!locale) {
                return Globalize.locale().locale
            }
            Globalize.locale(locale)
        }
    })
}
