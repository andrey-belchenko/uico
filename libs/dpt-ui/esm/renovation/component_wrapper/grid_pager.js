/**
 * DevExtreme (esm/renovation/component_wrapper/grid_pager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Component from "./common/component";
export class GridPagerWrapper extends Component {
    _optionChanged(args) {
        switch (args.name) {
            case "pageIndex": {
                const pageIndexChanged = this.option("pageIndexChanged");
                if (pageIndexChanged) {
                    pageIndexChanged(args.value)
                }
                break
            }
            case "pageSize": {
                const pageSizeChanged = this.option("pageSizeChanged");
                if (pageSizeChanged) {
                    pageSizeChanged(args.value)
                }
                break
            }
        }
        super._optionChanged(args)
    }
}
