/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DX_REMOVE_EVENT = exports.ComponentBase = void 0;
const React = __importStar(require("react"));
const events = __importStar(require("dpt-ui/events"));
const react_1 = require("react");
const frame_1 = require("dpt-ui/animation/frame");
const common_1 = require("dpt-ui/core/utils/common");
const config_1 = __importDefault(require("dpt-ui/core/config"));
const react_dom_1 = require("react-dom");
const helpers_1 = require("./helpers");
const options_manager_1 = require("./options-manager");
const widget_config_1 = require("./widget-config");
const tree_1 = require("./configuration/react/tree");
const template_manager_1 = require("./template-manager");
const DX_REMOVE_EVENT = 'dxremove';
exports.DX_REMOVE_EVENT = DX_REMOVE_EVENT;
(0, config_1.default)({
    buyNowLink: 'https://go.dpt-ext-ui.com/Licensing_Installer_Watermark_DevExtremeReact.aspx',
});
const ComponentBase = (0, react_1.forwardRef)((props, ref) => {
    const { templateProps = [], defaults = {}, expectedChildren = {}, isPortalComponent = false, useRequestAnimationFrameFlag = false, subscribableOptions = [], WidgetClass, independentEvents = [], renderChildren, beforeCreateWidget = () => undefined, afterCreateWidget = () => undefined, } = props;
    const [, setForceUpdateToken] = (0, react_1.useState)(0);
    const removalLocker = (0, react_1.useContext)(helpers_1.RemovalLockerContext);
    const restoreParentLink = (0, react_1.useContext)(helpers_1.RestoreTreeContext);
    const instance = (0, react_1.useRef)();
    const element = (0, react_1.useRef)();
    const portalContainer = (0, react_1.useRef)();
    const useDeferUpdateForTemplates = (0, react_1.useRef)(false);
    const guardsUpdateScheduled = (0, react_1.useRef)(false);
    const childElementsDetached = (0, react_1.useRef)(false);
    const optionsManager = (0, react_1.useRef)(new options_manager_1.OptionsManager());
    const childNodes = (0, react_1.useRef)();
    const createDXTemplates = (0, react_1.useRef)();
    const clearInstantiationModels = (0, react_1.useRef)();
    const updateTemplates = (0, react_1.useRef)();
    const prevPropsRef = (0, react_1.useRef)();
    const restoreTree = (0, react_1.useCallback)(() => {
        if (childNodes.current?.length && element.current) {
            element.current.append(...childNodes.current);
            childElementsDetached.current = false;
        }
        if (restoreParentLink && element.current && !element.current.isConnected) {
            restoreParentLink();
        }
    }, [
        childNodes.current,
        element.current,
        childElementsDetached.current,
        restoreParentLink,
    ]);
    const updateCssClasses = (0, react_1.useCallback)((prevProps, newProps) => {
        const prevClassName = prevProps ? (0, widget_config_1.getClassName)(prevProps) : undefined;
        const newClassName = (0, widget_config_1.getClassName)(newProps);
        if (prevClassName === newClassName) {
            return;
        }
        if (prevClassName) {
            const classNames = prevClassName.split(' ').filter((c) => c);
            if (classNames.length) {
                element.current?.classList.remove(...classNames);
            }
        }
        if (newClassName) {
            const classNames = newClassName.split(' ').filter((c) => c);
            if (classNames.length) {
                element.current?.classList.add(...classNames);
            }
        }
    }, [element.current]);
    const setInlineStyles = (0, react_1.useCallback)((styles) => {
        if (element.current) {
            const el = element.current;
            Object.entries(styles).forEach(([name, value]) => {
                el.style[name] = value;
            });
        }
    }, [element.current]);
    const getConfig = (0, react_1.useCallback)(() => (0, tree_1.buildConfigTree)({
        templates: templateProps,
        initialValuesProps: defaults,
        predefinedValuesProps: {},
        expectedChildren,
    }, props), [
        templateProps,
        defaults,
        expectedChildren,
        props,
    ]);
    const setTemplateManagerHooks = (0, react_1.useCallback)(({ createDXTemplates: createDXTemplatesFn, clearInstantiationModels: clearInstantiationModelsFn, updateTemplates: updateTemplatesFn, }) => {
        createDXTemplates.current = createDXTemplatesFn;
        clearInstantiationModels.current = clearInstantiationModelsFn;
        updateTemplates.current = updateTemplatesFn;
    }, [
        createDXTemplates.current,
        clearInstantiationModels.current,
        updateTemplates.current,
    ]);
    const getElementProps = (0, react_1.useCallback)(() => {
        const elementProps = {
            ref: (el) => {
                if (el) {
                    element.current = el;
                }
            },
        };
        widget_config_1.elementPropNames.forEach((name) => {
            if (name in props) {
                elementProps[name] = props[name];
            }
        });
        return elementProps;
    }, [element.current]);
    const scheduleTemplatesUpdate = (0, react_1.useCallback)(() => {
        if (guardsUpdateScheduled.current) {
            return;
        }
        guardsUpdateScheduled.current = true;
        const updateFunc = useDeferUpdateForTemplates.current ? common_1.deferUpdate : frame_1.requestAnimationFrame;
        updateFunc(() => {
            guardsUpdateScheduled.current = false;
            updateTemplates.current?.(() => (0, options_manager_1.scheduleGuards)());
        });
        (0, options_manager_1.unscheduleGuards)();
    }, [
        guardsUpdateScheduled.current,
        useDeferUpdateForTemplates.current,
        updateTemplates.current,
    ]);
    const createWidget = (0, react_1.useCallback)((el) => {
        beforeCreateWidget();
        el = el || element.current;
        const widgetConfig = getConfig();
        let options = {
            templatesRenderAsynchronously: true,
            ...optionsManager.current.getInitialOptions(widgetConfig),
        };
        const templateOptions = optionsManager.current.getTemplateOptions(widgetConfig);
        const dxTemplates = createDXTemplates.current?.(templateOptions);
        if (dxTemplates && Object.keys(dxTemplates).length) {
            options = {
                ...options,
                integrationOptions: {
                    templates: dxTemplates,
                },
            };
        }
        clearInstantiationModels.current?.();
        instance.current = new WidgetClass(el, options);
        if (!useRequestAnimationFrameFlag) {
            useDeferUpdateForTemplates.current = instance.current.option('integrationOptions.useDeferUpdateForTemplates');
        }
        optionsManager.current.setInstance(instance.current, widgetConfig, subscribableOptions, independentEvents);
        instance.current.on('optionChanged', optionsManager.current.onOptionChanged);
        afterCreateWidget();
    }, [
        beforeCreateWidget,
        afterCreateWidget,
        element.current,
        optionsManager.current,
        createDXTemplates.current,
        clearInstantiationModels.current,
        WidgetClass,
        useRequestAnimationFrameFlag,
        useDeferUpdateForTemplates.current,
        instance.current,
        subscribableOptions,
        independentEvents,
        getConfig,
    ]);
    const onComponentUpdated = (0, react_1.useCallback)(() => {
        if (!optionsManager.current?.isInstanceSet) {
            return;
        }
        updateCssClasses(prevPropsRef.current, props);
        const widgetConfig = getConfig();
        const templateOptions = optionsManager.current.getTemplateOptions(widgetConfig);
        const dxTemplates = createDXTemplates.current?.(templateOptions) || {};
        optionsManager.current.update(widgetConfig, dxTemplates);
        scheduleTemplatesUpdate();
        prevPropsRef.current = props;
    }, [
        optionsManager.current,
        prevPropsRef.current,
        createDXTemplates.current,
        scheduleTemplatesUpdate,
        updateCssClasses,
        getConfig,
        props,
    ]);
    const onComponentMounted = (0, react_1.useCallback)(() => {
        const { style } = props;
        if (childElementsDetached.current) {
            restoreTree();
        }
        else if (element.current?.childNodes.length) {
            childNodes.current = Array.from(element.current?.childNodes);
        }
        updateCssClasses(undefined, props);
        if (style) {
            setInlineStyles(style);
        }
        prevPropsRef.current = props;
    }, [
        childNodes.current,
        element.current,
        childElementsDetached.current,
        updateCssClasses,
        setInlineStyles,
        props,
    ]);
    const onComponentUnmounted = (0, react_1.useCallback)(() => {
        removalLocker?.lock();
        if (instance.current) {
            const dxRemoveArgs = { isUnmounting: true };
            childNodes.current?.forEach((child) => child.parentNode?.removeChild(child));
            childElementsDetached.current = true;
            if (element.current) {
                events.triggerHandler(element.current, DX_REMOVE_EVENT, dxRemoveArgs);
            }
            instance.current.dispose();
        }
        optionsManager.current.dispose();
        removalLocker?.unlock();
    }, [
        removalLocker,
        instance.current,
        childNodes.current,
        element.current,
        optionsManager.current,
        childElementsDetached.current,
    ]);
    (0, react_1.useLayoutEffect)(() => {
        onComponentMounted();
        return () => {
            onComponentUnmounted();
        };
    }, []);
    (0, react_1.useLayoutEffect)(() => {
        onComponentUpdated();
    });
    (0, react_1.useImperativeHandle)(ref, () => ({
        getInstance() {
            return instance.current;
        },
        getElement() {
            return element.current;
        },
        createWidget(el) {
            createWidget(el);
        },
    }), [instance.current, element.current, createWidget]);
    const _renderChildren = (0, react_1.useCallback)(() => {
        if (renderChildren) {
            return renderChildren();
        }
        // @ts-expect-error TS2339
        const { children } = props;
        return children;
    }, [props, renderChildren]);
    const renderPortal = (0, react_1.useCallback)(() => portalContainer.current && (0, react_dom_1.createPortal)(_renderChildren(), portalContainer.current), [portalContainer.current, _renderChildren]);
    const renderContent = (0, react_1.useCallback)(() => {
        // @ts-expect-error TS2339
        const { children } = props;
        return isPortalComponent && children
            ? React.createElement('div', {
                ref: (node) => {
                    if (node && portalContainer.current !== node) {
                        portalContainer.current = node;
                        setForceUpdateToken(Math.random());
                    }
                },
                style: { display: 'contents' },
            })
            : _renderChildren();
    }, [
        props,
        isPortalComponent,
        portalContainer.current,
        _renderChildren,
    ]);
    return React.createElement(helpers_1.RestoreTreeContext.Provider, {
        value: restoreTree,
    }, React.createElement('div', getElementProps(), renderContent(), React.createElement(template_manager_1.TemplateManager, {
        init: setTemplateManagerHooks,
    })), isPortalComponent && renderPortal());
});
exports.ComponentBase = ComponentBase;
