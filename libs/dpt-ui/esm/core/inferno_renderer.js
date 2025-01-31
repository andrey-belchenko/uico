/**
 * DevExtreme (esm/core/inferno_renderer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    render
} from "inferno";
import {
    InfernoEffectHost,
    hydrate
} from "@dpt-ui/runtime/inferno";
import {
    createElement
} from "inferno-create-element";
import domAdapter from "./dom_adapter";
import {
    cleanDataRecursive
} from "./element_data";
import injector from "./utils/dependency_injector";
const remove = element => {
    const {
        parentNode: parentNode
    } = element;
    if (parentNode) {
        const nextSibling = element.nextSibling;
        cleanDataRecursive(element);
        parentNode.$V = element.$V;
        render(null, parentNode);
        parentNode.insertBefore(element, nextSibling);
        element.innerHTML = "";
        delete parentNode.$V
    }
    delete element.$V
};
export default injector({
    createElement: (component, props) => createElement(component, props),
    remove: remove,
    onAfterRender: () => {
        InfernoEffectHost.callEffects()
    },
    onPreRender: () => {
        InfernoEffectHost.lock()
    },
    render: (component, props, container, replace) => {
        if (!replace) {
            const {
                parentNode: parentNode
            } = container;
            const nextNode = null === container || void 0 === container ? void 0 : container.nextSibling;
            const rootNode = domAdapter.createElement("div");
            rootNode.appendChild(container);
            const mountNode = domAdapter.createDocumentFragment().appendChild(rootNode);
            const vNodeAlreadyExists = !!container.$V;
            vNodeAlreadyExists && remove(container);
            hydrate(createElement(component, props), mountNode);
            container.$V = mountNode.$V;
            if (parentNode) {
                parentNode.insertBefore(container, nextNode)
            }
        } else {
            render(createElement(component, props), container)
        }
    }
});
