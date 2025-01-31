/**
 * DevExtreme (esm/__internal/grids/grid_core/m_widget_base.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    deferRender
} from "../../../core/utils/common";
import {
    extend
} from "../../../core/utils/extend";
import {
    each
} from "../../../core/utils/iterator";
import {
    isFunction
} from "../../../core/utils/type";
import Widget from "../../../ui/widget/ui.widget";
const GRID_CORE_ROW_SELECTOR = ".dx-row";
export default class GridCoreWidget extends Widget {
    constructor() {
        super(...arguments);
        this._activeStateUnit = ".dx-row"
    }
    _getDefaultOptions() {
        const result = super._getDefaultOptions();
        each(this.getGridCoreHelper().modules, (function() {
            if (isFunction(this.defaultOptions)) {
                extend(true, result, this.defaultOptions())
            }
        }));
        return result
    }
    _setDeprecatedOptions() {
        super._setDeprecatedOptions();
        extend(this._deprecatedOptions, {
            "columnChooser.allowSearch": {
                since: "23.1",
                message: 'Use the "columnChooser.search.enabled" option instead'
            },
            "columnChooser.searchTimeout": {
                since: "23.1",
                message: 'Use the "columnChooser.search.timeout" option instead'
            }
        })
    }
    _clean() {}
    _optionChanged(args) {
        this.getGridCoreHelper().callModuleItemsMethod(this, "optionChanged", [args]);
        if (!args.handled) {
            super._optionChanged(args)
        }
    }
    _dimensionChanged() {
        this.updateDimensions(true)
    }
    _visibilityChanged(visible) {
        if (visible) {
            this.updateDimensions()
        }
    }
    _renderContentImpl() {
        this.getView("gridView").update()
    }
    _renderContent() {
        const that = this;
        deferRender((() => {
            that._renderContentImpl()
        }))
    }
    _dispose() {
        super._dispose();
        this.getGridCoreHelper().callModuleItemsMethod(this, "dispose")
    }
    isReady() {
        return this.getController("data").isReady()
    }
    getController(name) {
        return this._controllers[name]
    }
    getView(name) {
        return this._views[name]
    }
    getGridCoreHelper() {}
    beginUpdate() {
        super.beginUpdate();
        this.getGridCoreHelper().callModuleItemsMethod(this, "beginUpdate")
    }
    endUpdate() {
        this.getGridCoreHelper().callModuleItemsMethod(this, "endUpdate");
        super.endUpdate()
    }
}
