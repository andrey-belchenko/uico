/**
 * DevExtreme (esm/renovation/component_wrapper/common/component.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    createRef
} from "inferno";
import KeyboardProcessor from "../../../events/core/keyboard_processor";
import renderer from "../../../core/inferno_renderer";
import $ from "../../../core/renderer";
import domAdapter from "../../../core/dom_adapter";
import DOMComponent from "../../../core/dom_component";
import {
    extend
} from "../../../core/utils/extend";
import {
    getPublicElement
} from "../../../core/element";
import {
    isDefined,
    isRenderer,
    isString
} from "../../../core/utils/type";
import {
    TemplateWrapper,
    buildTemplateArgs
} from "./template_wrapper";
import {
    updatePropsImmutable
} from "../utils/update_props_immutable";
import "../../../events/click";
import "../../../events/core/emitter.feedback";
import "../../../events/hover";
const setDefaultOptionValue = (options, defaultValueGetter) => name => {
    if (Object.prototype.hasOwnProperty.call(options, name) && void 0 === options[name]) {
        options[name] = defaultValueGetter(name)
    }
};
class ComponentWrapper extends DOMComponent {
    get _propsInfo() {
        return {
            allowNull: [],
            twoWay: [],
            elements: [],
            templates: [],
            props: []
        }
    }
    constructor(element, options) {
        super(element, options);
        this._shouldRaiseContentReady = false;
        this.validateKeyDownHandler()
    }
    validateKeyDownHandler() {
        const supportedKeyNames = this.getSupportedKeyNames();
        const hasComponentDefaultKeyHandlers = supportedKeyNames.length > 0;
        const hasComponentKeyDownMethod = "function" === typeof this._viewComponent.prototype.keyDown;
        if (hasComponentDefaultKeyHandlers && !hasComponentKeyDownMethod) {
            throw Error("Component's declaration must have 'keyDown' method.")
        }
    }
    get viewRef() {
        var _this$_viewRef;
        return null === (_this$_viewRef = this._viewRef) || void 0 === _this$_viewRef ? void 0 : _this$_viewRef.current
    }
    _checkContentReadyOption(fullName) {
        const contentReadyOptions = this._getContentReadyOptions().reduce(((options, name) => {
            options[name] = true;
            return options
        }), {});
        this._checkContentReadyOption = optionName => !!contentReadyOptions[optionName];
        return this._checkContentReadyOption(fullName)
    }
    _getContentReadyOptions() {
        return ["rtlEnabled"]
    }
    _fireContentReady() {
        this._actionsMap.onContentReady({})
    }
    _getDefaultOptions() {
        const viewDefaultProps = this._getViewComponentDefaultProps();
        return extend(true, super._getDefaultOptions(), viewDefaultProps, this._propsInfo.twoWay.reduce(((options, _ref) => {
            let [name, defaultName, eventName] = _ref;
            return _extends({}, options, {
                [name]: viewDefaultProps[defaultName],
                [eventName]: value => this.option(name, value)
            })
        }), {}), this._propsInfo.templates.reduce(((options, name) => _extends({}, options, {
            [name]: null
        })), {}))
    }
    _getUnwrappedOption() {
        const unwrappedProps = {};
        Object.keys(this.option()).forEach((key => {
            unwrappedProps[key] = this.option(key)
        }));
        return unwrappedProps
    }
    _initializeComponent() {
        var _this$_templateManage;
        super._initializeComponent();
        null === (_this$_templateManage = this._templateManager) || void 0 === _this$_templateManage || _this$_templateManage.addDefaultTemplates(this.getDefaultTemplates());
        const optionProxy = this._getUnwrappedOption();
        this._props = this._optionsWithDefaultTemplates(optionProxy);
        this._propsInfo.templates.forEach((template => {
            this._componentTemplates[template] = this._createTemplateComponent(this._props[template])
        }));
        Object.keys(this._getActionConfigsFull()).forEach((name => this._addAction(name)));
        this._viewRef = createRef();
        this.defaultKeyHandlers = this._createDefaultKeyHandlers()
    }
    _initMarkup() {
        const props = this.getProps();
        this._renderWrapper(props)
    }
    _renderWrapper(props) {
        const containerNode = this.$element()[0];
        if (!this._isNodeReplaced) {
            renderer.onPreRender()
        }
        renderer.render(this._viewComponent, props, containerNode, this._isNodeReplaced);
        if (!this._isNodeReplaced) {
            this._isNodeReplaced = true;
            renderer.onAfterRender();
            this._shouldRaiseContentReady = true
        }
        if (this._shouldRaiseContentReady) {
            this._fireContentReady();
            this._shouldRaiseContentReady = false
        }
    }
    _silent(name, value) {
        this._options.silent(name, value)
    }
    _render() {}
    _removeWidget() {
        renderer.remove(this.$element()[0])
    }
    _dispose() {
        this._removeWidget();
        super._dispose()
    }
    get elementAttr() {
        const element = this.$element()[0];
        if (!this._elementAttr) {
            const {
                attributes: attributes
            } = element;
            const attrs = Array.from(attributes).filter((attr => {
                var _attributes$attr$name;
                return !this._propsInfo.templates.includes(attr.name) && (null === (_attributes$attr$name = attributes[attr.name]) || void 0 === _attributes$attr$name ? void 0 : _attributes$attr$name.specified)
            })).reduce(((result, _ref2) => {
                let {
                    name: name,
                    value: value
                } = _ref2;
                const updatedAttributes = result;
                const isDomAttr = name in element;
                updatedAttributes[name] = "" === value && isDomAttr ? element[name] : value;
                return updatedAttributes
            }), {});
            this._elementAttr = attrs;
            this._storedClasses = element.getAttribute("class") || ""
        }
        const elemStyle = element.style;
        const style = {};
        for (let i = 0; i < elemStyle.length; i += 1) {
            style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i])
        }
        this._elementAttr.style = style;
        this._elementAttr.class = this._storedClasses;
        return this._elementAttr
    }
    _getAdditionalActionConfigs() {
        return {
            onContentReady: {
                excludeValidators: ["disabled", "readOnly"]
            }
        }
    }
    _getAdditionalProps() {
        return []
    }
    _patchOptionValues(options) {
        const {
            allowNull: allowNull,
            elements: elements,
            props: props,
            twoWay: twoWay
        } = this._propsInfo;
        const viewDefaultProps = this._getViewComponentDefaultProps();
        const defaultWidgetPropsKeys = Object.keys(viewDefaultProps);
        const defaultOptions = this._getDefaultOptions();
        const {
            children: children,
            onKeyboardHandled: onKeyboardHandled,
            ref: ref
        } = options;
        const onKeyDown = onKeyboardHandled ? (_, event_options) => {
            onKeyboardHandled(event_options)
        } : void 0;
        const widgetProps = {
            ref: ref,
            children: children,
            onKeyDown: onKeyDown
        };
        [...props, ...this._getAdditionalProps()].forEach((propName => {
            if (Object.prototype.hasOwnProperty.call(options, propName)) {
                widgetProps[propName] = options[propName]
            }
        }));
        allowNull.forEach(setDefaultOptionValue(widgetProps, (() => null)));
        defaultWidgetPropsKeys.forEach(setDefaultOptionValue(widgetProps, (name => defaultOptions[name])));
        twoWay.forEach((_ref3 => {
            let [name, defaultName] = _ref3;
            setDefaultOptionValue(widgetProps, (() => defaultOptions[defaultName]))(name)
        }));
        elements.forEach((name => {
            if (name in widgetProps) {
                const value = widgetProps[name];
                if (isRenderer(value)) {
                    widgetProps[name] = this._patchElementParam(value)
                }
            }
        }));
        return widgetProps
    }
    getSupportedKeyNames() {
        return []
    }
    prepareStyleProp(props) {
        if ("string" === typeof props.style) {
            return _extends({}, props, {
                style: {},
                cssText: props.style
            })
        }
        return props
    }
    getProps() {
        const {
            elementAttr: elementAttr
        } = this.option();
        const options = this._patchOptionValues(_extends({}, this._props, {
            ref: this._viewRef,
            children: this._extractDefaultSlot(),
            aria: this._aria
        }));
        this._propsInfo.templates.forEach((template => {
            options[template] = this._componentTemplates[template]
        }));
        return this.prepareStyleProp(_extends({}, options, this.elementAttr, elementAttr, {
            className: [...(this.elementAttr.class ?? "").split(" "), ...((null === elementAttr || void 0 === elementAttr ? void 0 : elementAttr.class) ?? "").split(" ")].filter(((c, i, a) => c && a.indexOf(c) === i)).join(" ").trim(),
            class: ""
        }, this._actionsMap))
    }
    _getActionConfigs() {
        return {}
    }
    _getActionConfigsFull() {
        return _extends({}, this._getActionConfigs(), this._getAdditionalActionConfigs())
    }
    getDefaultTemplates() {
        const defaultTemplates = Object.values(this._templatesInfo);
        const result = {};
        defaultTemplates.forEach((template => {
            result[template] = "dx-renovation-template-mock"
        }));
        return result
    }
    get _templatesInfo() {
        return {}
    }
    _optionsWithDefaultTemplates(options) {
        const templateOptions = Object.entries(this._templatesInfo).reduce(((result, _ref4) => {
            let [templateName, templateValue] = _ref4;
            return _extends({}, result, {
                [templateName]: options[templateName] ?? templateValue
            })
        }), {});
        return _extends({}, options, templateOptions)
    }
    _init() {
        super._init();
        this.customKeyHandlers = {};
        this._actionsMap = {};
        this._aria = {};
        this._componentTemplates = {}
    }
    _createDefaultKeyHandlers() {
        const result = {};
        const keys = this.getSupportedKeyNames();
        keys.forEach((key => {
            result[key] = e => this.viewRef.keyDown(KeyboardProcessor.createKeyDownOptions(e))
        }));
        return result
    }
    _addAction(event, actionToAdd) {
        let action = actionToAdd;
        if (!action) {
            const actionByOption = this._createActionByOption(event, this._getActionConfigsFull()[event]);
            action = actArgs => {
                Object.keys(actArgs).forEach((name => {
                    if (isDefined(actArgs[name]) && domAdapter.isNode(actArgs[name])) {
                        actArgs[name] = getPublicElement($(actArgs[name]))
                    }
                }));
                return actionByOption(actArgs)
            }
        }
        this._actionsMap[event] = action
    }
    _optionChanged(option) {
        const {
            fullName: fullName,
            name: name,
            previousValue: previousValue,
            value: value
        } = option;
        updatePropsImmutable(this._props, this.option(), name, fullName);
        if (this._propsInfo.templates.includes(name) && value !== previousValue) {
            this._componentTemplates[name] = this._createTemplateComponent(value)
        }
        if (name && this._getActionConfigsFull()[name]) {
            this._addAction(name)
        }
        this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(fullName);
        super._optionChanged(option);
        this._invalidate()
    }
    _extractDefaultSlot() {
        if (this.option("_hasAnonymousTemplateContent")) {
            return renderer.createElement(TemplateWrapper, {
                template: this._getTemplate(this._templateManager.anonymousTemplateName),
                transclude: true,
                renovated: true
            })
        }
        return null
    }
    _createTemplateComponent(templateOption) {
        if (!templateOption) {
            return
        }
        const template = this._getTemplate(templateOption);
        if (isString(template) && "dx-renovation-template-mock" === template) {
            return
        }
        return model => renderer.createElement(TemplateWrapper, buildTemplateArgs(model, template))
    }
    _wrapKeyDownHandler(initialHandler) {
        return options => {
            const {
                keyName: keyName,
                originalEvent: originalEvent,
                which: which
            } = options;
            const keys = this.customKeyHandlers;
            const func = keys[keyName] || keys[which];
            if (void 0 !== func) {
                const handler = func.bind(this);
                const result = handler(originalEvent, options);
                if (!result) {
                    originalEvent.cancel = true;
                    return originalEvent
                }
            }
            return null === initialHandler || void 0 === initialHandler ? void 0 : initialHandler(originalEvent, options)
        }
    }
    _toPublicElement(element) {
        return getPublicElement($(element))
    }
    _patchElementParam(value) {
        try {
            const result = $(value);
            const element = null === result || void 0 === result ? void 0 : result.get(0);
            return null !== element && void 0 !== element && element.nodeType ? element : value
        } catch (error) {
            return value
        }
    }
    repaint() {
        this._isNodeReplaced = false;
        this._shouldRaiseContentReady = true;
        this._removeWidget();
        this._refresh()
    }
    _supportedKeys() {
        return _extends({}, this.defaultKeyHandlers, this.customKeyHandlers)
    }
    registerKeyHandler(key, handler) {
        this.customKeyHandlers[key] = handler
    }
    setAria(name, value) {
        this._aria[name] = value;
        this._initMarkup()
    }
    _getViewComponentDefaultProps() {
        return this._viewComponent.defaultProps || {}
    }
}
ComponentWrapper.IS_RENOVATED_WIDGET = false;
export default ComponentWrapper;
ComponentWrapper.IS_RENOVATED_WIDGET = true;
