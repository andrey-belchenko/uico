/**
 * DevExtreme (esm/renovation/ui/pager/info.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["infoText", "pageCount", "pageIndex", "rootElementRef", "totalCount"];
import {
    createVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    format
} from "../../../core/utils/string";
import messageLocalization from "../../../localization/message";
import {
    InternalPagerProps
} from "./common/pager_props";
export const PAGER_INFO_CLASS = "dx-info";
export const viewFunction = _ref => {
    let {
        props: {
            rootElementRef: rootElementRef
        },
        text: text
    } = _ref;
    return createVNode(1, "div", "dx-info", text, 0, null, null, rootElementRef)
};
export const InfoTextProps = {};
const InfoTextPropsType = {
    get pageIndex() {
        return InternalPagerProps.pageIndex
    },
    get pageCount() {
        return InternalPagerProps.pageCount
    },
    get totalCount() {
        return InternalPagerProps.totalCount
    }
};
export class InfoText extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get infoText() {
        return (this.props.infoText ?? "") || messageLocalization.getFormatter("dxPager-infoText")()
    }
    get text() {
        const {
            pageCount: pageCount,
            pageIndex: pageIndex,
            totalCount: totalCount
        } = this.props;
        return format(this.infoText, (pageIndex + 1).toString(), pageCount.toString(), totalCount.toString())
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            infoText: this.infoText,
            text: this.text,
            restAttributes: this.restAttributes
        })
    }
}
InfoText.defaultProps = InfoTextPropsType;
