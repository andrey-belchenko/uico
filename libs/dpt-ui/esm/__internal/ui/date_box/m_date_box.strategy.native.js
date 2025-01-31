/**
 * DevExtreme (esm/__internal/ui/date_box/m_date_box.strategy.native.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import devices from "../../../core/devices";
import {
    noop
} from "../../../core/utils/common";
import dateSerialization from "../../../core/utils/date_serialization";
import {
    extend
} from "../../../core/utils/extend";
import {
    inputType
} from "../../../core/utils/support";
import DateBoxStrategy from "./m_date_box.strategy";
import dateUtils from "./m_date_utils";
const NativeStrategy = DateBoxStrategy.inherit({
    NAME: "Native",
    popupConfig: popupConfig => extend({}, popupConfig, {
        width: "auto"
    }),
    getParsedText(text) {
        if (!text) {
            return null
        }
        if ("datetime" === this.dateBox.option("type")) {
            return new Date(text.replace(/-/g, "/").replace("T", " ").split(".")[0])
        }
        return dateUtils.fromStandardDateFormat(text)
    },
    renderPopupContent: noop,
    _getWidgetName: noop,
    _getWidgetOptions: noop,
    _getDateBoxType() {
        let type = this.dateBox.option("type");
        if (!dateUtils.SUPPORTED_FORMATS.includes(type)) {
            type = "date"
        } else if ("datetime" === type && !inputType(type)) {
            type = "datetime-local"
        }
        return type
    },
    customizeButtons() {
        const dropDownButton = this.dateBox.getButton("dropDown");
        if (devices.real().android && dropDownButton) {
            dropDownButton.on("click", (() => {
                this.dateBox._input().get(0).click()
            }))
        }
    },
    getDefaultOptions() {
        return {
            mode: this._getDateBoxType()
        }
    },
    getDisplayFormat(displayFormat) {
        const type = this._getDateBoxType();
        return displayFormat || dateUtils.FORMATS_MAP[type]
    },
    renderInputMinMax($input) {
        $input.attr({
            min: dateSerialization.serializeDate(this.dateBox.dateOption("min"), "yyyy-MM-dd"),
            max: dateSerialization.serializeDate(this.dateBox.dateOption("max"), "yyyy-MM-dd")
        })
    }
});
export default NativeStrategy;
