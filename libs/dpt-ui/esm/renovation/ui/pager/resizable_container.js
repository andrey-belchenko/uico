/**
 * DevExtreme (esm/renovation/ui/pager/resizable_container.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["contentTemplate", "pagerProps"];
import {
    createComponentVNode,
    normalizeProps
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import resizeCallbacks from "../../../core/utils/resize_callbacks";
import {
    getElementWidth,
    getElementStyle,
    getElementContentWidth
} from "./utils/get_element_width";
import {
    isDefined
} from "../../../core/utils/type";
export const viewFunction = _ref => {
    let {
        contentAttributes: contentAttributes,
        infoTextRef: infoTextRef,
        infoTextVisible: infoTextVisible,
        isLargeDisplayMode: isLargeDisplayMode,
        pageSizesRef: pageSizesRef,
        pagesRef: pagesRef,
        parentRef: parentRef,
        props: {
            contentTemplate: Content
        }
    } = _ref;
    return Content(_extends({
        rootElementRef: parentRef,
        pageSizesRef: pageSizesRef,
        infoTextRef: infoTextRef,
        pagesRef: pagesRef,
        infoTextVisible: infoTextVisible,
        isLargeDisplayMode: isLargeDisplayMode
    }, contentAttributes))
};
export function calculateLargeDisplayMode(_ref2) {
    let {
        pageSizes: pageSizesWidth,
        pages: pagesWidth,
        parent: parentWidth
    } = _ref2;
    return parentWidth - (pageSizesWidth + pagesWidth) > 0
}
export function calculateInfoTextVisible(_ref3) {
    let {
        info: infoWidth,
        pageSizes: pageSizesWidth,
        pages: pagesWidth,
        parent: parentWidth
    } = _ref3;
    const minimalWidth = pageSizesWidth + pagesWidth + infoWidth;
    return parentWidth - minimalWidth > 0
}

function getElementsWidth(_ref4) {
    let {
        info: info,
        pageSizes: pageSizes,
        pages: pages,
        parent: parent
    } = _ref4;
    const parentWidth = getElementContentWidth(parent);
    const pageSizesWidth = getElementWidth(pageSizes);
    const infoWidth = getElementWidth(info);
    const pagesHtmlWidth = getElementWidth(pages);
    return {
        parent: parentWidth,
        pageSizes: pageSizesWidth,
        info: infoWidth + getElementStyle("marginLeft", info) + getElementStyle("marginRight", info),
        pages: pagesHtmlWidth
    }
}
export const ResizableContainerProps = {};
import {
    createRef as infernoCreateRef
} from "inferno";
const getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class ResizableContainer extends InfernoComponent {
    constructor(props) {
        super(props);
        this.parentRef = infernoCreateRef();
        this.pageSizesRef = infernoCreateRef();
        this.infoTextRef = infernoCreateRef();
        this.pagesRef = infernoCreateRef();
        this.actualIsLargeDisplayMode = true;
        this.actualInfoTextVisible = true;
        this.state = {
            infoTextVisible: true,
            isLargeDisplayMode: true
        };
        this.subscribeToResize = this.subscribeToResize.bind(this);
        this.effectUpdateChildProps = this.effectUpdateChildProps.bind(this);
        this.updateAdaptivityProps = this.updateAdaptivityProps.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.subscribeToResize, [this.state.infoTextVisible, this.state.isLargeDisplayMode]), new InfernoEffect(this.effectUpdateChildProps, [this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate])]
    }
    updateEffects() {
        var _this$_effects$, _this$_effects$2;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.state.infoTextVisible, this.state.isLargeDisplayMode]);
        null === (_this$_effects$2 = this._effects[1]) || void 0 === _this$_effects$2 || _this$_effects$2.update([this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate])
    }
    subscribeToResize() {
        const callback = () => {
            this.parentWidth > 0 && this.updateAdaptivityProps()
        };
        resizeCallbacks.add(callback);
        return () => {
            resizeCallbacks.remove(callback)
        }
    }
    effectUpdateChildProps() {
        if (this.parentWidth > 0) {
            this.updateAdaptivityProps()
        }
    }
    get contentAttributes() {
        const {
            className: className,
            displayMode: displayMode,
            gridCompatibility: gridCompatibility,
            hasKnownLastPage: hasKnownLastPage,
            infoText: infoText,
            label: label,
            lightModeEnabled: lightModeEnabled,
            maxPagesCount: maxPagesCount,
            onKeyDown: onKeyDown,
            pageCount: pageCount,
            pageIndex: pageIndex,
            pageIndexChange: pageIndexChange,
            pageSize: pageSize,
            pageSizeChange: pageSizeChange,
            pageSizes: pageSizes,
            pagesCountText: pagesCountText,
            pagesNavigatorVisible: pagesNavigatorVisible,
            rtlEnabled: rtlEnabled,
            showInfo: showInfo,
            showNavigationButtons: showNavigationButtons,
            showPageSizes: showPageSizes,
            totalCount: totalCount,
            visible: visible
        } = this.props.pagerProps;
        return _extends({}, this.restAttributes, {
            pageSize: pageSize,
            pageIndex: pageIndex,
            pageIndexChange: pageIndexChange,
            pageSizeChange: pageSizeChange,
            gridCompatibility: gridCompatibility,
            className: className,
            showInfo: showInfo,
            infoText: infoText,
            lightModeEnabled: lightModeEnabled,
            displayMode: displayMode,
            maxPagesCount: maxPagesCount,
            pageCount: pageCount,
            pagesCountText: pagesCountText,
            visible: visible,
            hasKnownLastPage: hasKnownLastPage,
            pagesNavigatorVisible: pagesNavigatorVisible,
            showPageSizes: showPageSizes,
            pageSizes: pageSizes,
            rtlEnabled: rtlEnabled,
            showNavigationButtons: showNavigationButtons,
            totalCount: totalCount,
            onKeyDown: onKeyDown,
            label: label
        })
    }
    get parentWidth() {
        return this.parentRef.current ? getElementWidth(this.parentRef.current) : 0
    }
    updateAdaptivityProps() {
        const currentElementsWidth = getElementsWidth({
            parent: this.parentRef.current,
            pageSizes: this.pageSizesRef.current,
            info: this.infoTextRef.current,
            pages: this.pagesRef.current
        });
        if (this.actualInfoTextVisible !== this.state.infoTextVisible || this.actualIsLargeDisplayMode !== this.state.isLargeDisplayMode) {
            return
        }
        const isEmpty = !isDefined(this.elementsWidth);
        if (isEmpty) {
            this.elementsWidth = {}
        }
        if (isEmpty || this.state.isLargeDisplayMode) {
            this.elementsWidth.pageSizes = currentElementsWidth.pageSizes;
            this.elementsWidth.pages = currentElementsWidth.pages
        }
        if (isEmpty || this.state.infoTextVisible) {
            this.elementsWidth.info = currentElementsWidth.info
        }
        this.actualIsLargeDisplayMode = calculateLargeDisplayMode(_extends({
            parent: currentElementsWidth.parent
        }, {
            pageSizes: this.elementsWidth.pageSizes,
            pages: this.elementsWidth.pages
        }));
        this.actualInfoTextVisible = calculateInfoTextVisible(_extends({}, currentElementsWidth, {
            info: this.elementsWidth.info
        }));
        this.setState((__state_argument => ({
            infoTextVisible: this.actualInfoTextVisible
        })));
        this.setState((__state_argument => ({
            isLargeDisplayMode: this.actualIsLargeDisplayMode
        })))
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                contentTemplate: getTemplate(props.contentTemplate)
            }),
            infoTextVisible: this.state.infoTextVisible,
            isLargeDisplayMode: this.state.isLargeDisplayMode,
            parentRef: this.parentRef,
            pageSizesRef: this.pageSizesRef,
            infoTextRef: this.infoTextRef,
            pagesRef: this.pagesRef,
            contentAttributes: this.contentAttributes,
            parentWidth: this.parentWidth,
            updateAdaptivityProps: this.updateAdaptivityProps,
            restAttributes: this.restAttributes
        })
    }
}
ResizableContainer.defaultProps = ResizableContainerProps;
