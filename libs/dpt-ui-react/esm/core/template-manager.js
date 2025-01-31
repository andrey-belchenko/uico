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

import * as React from 'react';
import * as events from 'dpt-ui/events';
import { useState, useMemo, useCallback, useEffect, useRef, } from 'react';
import { TemplateWrapper } from './template-wrapper';
import { TemplateInstantiationModels, generateID } from './helpers';
import { DX_REMOVE_EVENT } from './component-base';
import { getOption as getConfigOption } from './config';
function normalizeProps(props) {
    if (getConfigOption('useLegacyTemplateEngine')) {
        const model = props.data;
        if (model && Object.prototype.hasOwnProperty.call(model, 'key')) {
            model.dxkey = model.key;
        }
        return model;
    }
    return props;
}
export const TemplateManager = ({ init }) => {
    const [instantiationModels, setInstantiationModels] = useState(new TemplateInstantiationModels());
    const [updateContext, setUpdateContext] = useState();
    const widgetId = useRef('');
    const templateFactories = useRef({});
    const subscribeOnRemoval = useCallback((container, onRemoved) => {
        if (container.nodeType === Node.ELEMENT_NODE) {
            events.on(container, DX_REMOVE_EVENT, onRemoved);
        }
    }, []);
    const unsubscribeOnRemoval = useCallback((container, onRemoved) => {
        if (container.nodeType === Node.ELEMENT_NODE) {
            events.off(container, DX_REMOVE_EVENT, onRemoved);
        }
    }, []);
    const unwrapElement = useCallback((element) => (element.get ? element.get(0) : element), []);
    const createMapKey = useCallback((key1, key2) => ({ key1, key2 }), []);
    const getRandomId = useCallback(() => `${generateID()}${generateID()}${generateID()}`, []);
    const getRenderFunc = useCallback((templateKey) => ({ model: data, index, container, onRendered, }) => {
        const containerElement = unwrapElement(container);
        const key = createMapKey(data, containerElement);
        const onRemoved = () => {
            setInstantiationModels((currentInstantiationModels) => {
                const template = currentInstantiationModels.get(key);
                if (template) {
                    currentInstantiationModels.delete(key);
                    return currentInstantiationModels.shallowCopy();
                }
                return currentInstantiationModels;
            });
        };
        const hostWidgetId = widgetId.current;
        setInstantiationModels((currentInstantiationModels) => {
            currentInstantiationModels.set(key, {
                templateKey,
                index,
                componentKey: getRandomId(),
                onRendered: () => {
                    unsubscribeOnRemoval(containerElement, onRemoved);
                    if (hostWidgetId === widgetId.current) {
                        onRendered?.();
                    }
                },
                onRemoved,
            });
            return currentInstantiationModels.shallowCopy();
        });
        return containerElement;
    }, [unsubscribeOnRemoval, createMapKey]);
    useMemo(() => {
        function getTemplateFunction(template) {
            switch (template.type) {
                case 'children': return () => template.content;
                case 'render': return (props) => {
                    normalizeProps(props);
                    return template.content(props.data, props.index);
                };
                case 'component': return (props) => {
                    props = normalizeProps(props);
                    return React.createElement.bind(null, template.content)(props);
                };
                default: return () => React.createElement(React.Fragment);
            }
        }
        function createDXTemplates(templateOptions) {
            const factories = Object.entries(templateOptions)
                .reduce((res, [key, template]) => ({
                ...res,
                [key]: getTemplateFunction(template),
            }), {});
            templateFactories.current = factories;
            const dxTemplates = Object.keys(factories)
                .reduce((templates, templateKey) => {
                templates[templateKey] = { render: getRenderFunc(templateKey) };
                return templates;
            }, {});
            return dxTemplates;
        }
        function clearInstantiationModels() {
            widgetId.current = getRandomId();
            setInstantiationModels(new TemplateInstantiationModels());
        }
        function updateTemplates(onUpdated) {
            setUpdateContext({ onUpdated });
        }
        init({ createDXTemplates, clearInstantiationModels, updateTemplates });
    }, [init, getRenderFunc]);
    useEffect(() => {
        if (updateContext) {
            updateContext.onUpdated();
        }
    }, [updateContext]);
    if (instantiationModels.empty) {
        return null;
    }
    return (React.createElement(React.Fragment, null, Array.from(instantiationModels).map(([{ key1: data, key2: container }, { index, templateKey, componentKey, onRendered, onRemoved, }]) => {
        subscribeOnRemoval(container, onRemoved);
        const factory = templateFactories.current[templateKey];
        if (factory) {
            return React.createElement(TemplateWrapper, { key: componentKey, templateFactory: factory, data: data, index: index, container: container, onRemoved: onRemoved, onRendered: onRendered });
        }
        return null;
    })));
};
