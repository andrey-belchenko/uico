/**
 * DevExtreme (esm/__internal/scheduler/r1/components/base/date_header_text.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    createVNode,
    createFragment
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
const DateHeaderTextDefaultProps = {
    text: "",
    splitText: false
};
export class DateHeaderText extends BaseInfernoComponent {
    constructor() {
        super(...arguments);
        this._textCache = null
    }
    getTextParts() {
        if (null !== this._textCache) {
            return this._textCache
        }
        const {
            text: text
        } = this.props;
        this._textCache = text ? text.split(" ") : [""];
        return this._textCache
    }
    componentWillUpdate(nextProps) {
        if (this.props.text !== nextProps.text) {
            this._textCache = null
        }
    }
    render() {
        const {
            splitText: splitText,
            text: text
        } = this.props;
        const textParts = this.getTextParts();
        return createFragment(splitText ? textParts.map((part => createVNode(1, "div", "dx-scheduler-header-panel-cell-date", createVNode(1, "span", null, part, 0), 2))) : text, 0)
    }
}
DateHeaderText.defaultProps = DateHeaderTextDefaultProps;
