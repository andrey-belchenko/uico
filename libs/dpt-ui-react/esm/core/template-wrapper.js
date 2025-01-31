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
import { useCallback, useLayoutEffect, useEffect, useState, useRef, useMemo, memo, } from 'react';
import { createPortal } from 'react-dom';
import { DX_REMOVE_EVENT } from './component-base';
import { RemovalLockerContext } from './helpers';
const createHiddenNode = (containerNodeName, ref, defaultElement) => {
    const style = { display: 'none' };
    switch (containerNodeName) {
        case 'TABLE':
            return React.createElement("tbody", { style: style, ref: ref });
        case 'TBODY':
            return React.createElement("tr", { style: style, ref: ref });
        default:
            return React.createElement(defaultElement, { style, ref });
    }
};
const TemplateWrapperComponent = ({ templateFactory, data, index, container, onRemoved, onRendered, }) => {
    const [removalListenerRequired, setRemovalListenerRequired] = useState(false);
    const isRemovalLocked = useRef(false);
    const removalLocker = useMemo(() => ({
        lock() { isRemovalLocked.current = true; },
        unlock() { isRemovalLocked.current = false; },
    }), []);
    const element = useRef();
    const hiddenNodeElement = useRef();
    const removalListenerElement = useRef();
    const onTemplateRemoved = useCallback((_, args) => {
        if (args?.isUnmounting || isRemovalLocked.current) {
            return;
        }
        if (element.current) {
            events.off(element.current, DX_REMOVE_EVENT, onTemplateRemoved);
        }
        if (removalListenerElement.current) {
            events.off(removalListenerElement.current, DX_REMOVE_EVENT, onTemplateRemoved);
        }
        onRemoved();
    }, [onRemoved]);
    useLayoutEffect(() => {
        const el = element.current;
        if (el && el.nodeType === Node.ELEMENT_NODE) {
            events.off(el, DX_REMOVE_EVENT, onTemplateRemoved);
            events.on(el, DX_REMOVE_EVENT, onTemplateRemoved);
        }
        else if (!removalListenerRequired) {
            setRemovalListenerRequired(true);
        }
        else if (removalListenerElement.current) {
            events.off(removalListenerElement.current, DX_REMOVE_EVENT, onTemplateRemoved);
            events.on(removalListenerElement.current, DX_REMOVE_EVENT, onTemplateRemoved);
        }
        return () => {
            if (element.current) {
                container.appendChild(element.current);
            }
            if (hiddenNodeElement.current) {
                container.appendChild(hiddenNodeElement.current);
            }
            if (removalListenerElement.current) {
                container.appendChild(removalListenerElement.current);
            }
            if (el) {
                events.off(el, DX_REMOVE_EVENT, onTemplateRemoved);
            }
        };
    }, [onTemplateRemoved, removalListenerRequired, container]);
    useEffect(() => {
        onRendered();
    }, [onRendered]);
    const hiddenNode = createHiddenNode(container?.nodeName, (node) => {
        hiddenNodeElement.current = node;
        element.current = node?.previousSibling;
    }, 'div');
    const removalListener = removalListenerRequired
        ? createHiddenNode(container?.nodeName, (node) => { removalListenerElement.current = node; }, 'span')
        : undefined;
    return createPortal(React.createElement(React.Fragment, null,
        React.createElement(RemovalLockerContext.Provider, { value: removalLocker },
            templateFactory({ data, index, onRendered }),
            hiddenNode,
            removalListener)), container);
};
export const TemplateWrapper = memo(TemplateWrapperComponent);
