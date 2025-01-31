/**
 * DevExtreme (esm/core/utils/svg.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../core/dom_adapter";
import {
    getWindow
} from "./window";
import $ from "../../core/renderer";
import {
    isRenderer,
    isString
} from "./type";
const window = getWindow();

function getMarkup(element, backgroundColor) {
    const temp = domAdapter.createElement("div");
    const clone = element.cloneNode(true);
    if (backgroundColor) {
        $(clone).css("backgroundColor", backgroundColor)
    }
    temp.appendChild(clone);
    return temp.innerHTML
}

function fixNamespaces(markup) {
    let first = true;
    if (-1 === markup.indexOf("xmlns:xlink")) {
        markup = markup.replace("<svg", '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
    }
    markup = markup.replace(/xmlns="[\s\S]*?"/gi, (function(match) {
        if (!first) {
            return ""
        }
        first = false;
        return match
    }));
    return markup.replace(/xmlns:NS1="[\s\S]*?"/gi, "").replace(/NS1:xmlns:xlink="([\s\S]*?)"/gi, 'xmlns:xlink="$1"')
}

function decodeHtmlEntities(markup) {
    return markup.replace(/&quot;/gi, "&#34;").replace(/&amp;/gi, "&#38;").replace(/&apos;/gi, "&#39;").replace(/&lt;/gi, "&#60;").replace(/&gt;/gi, "&#62;").replace(/&nbsp;/gi, "&#160;").replace(/&shy;/gi, "&#173;")
}
export const HIDDEN_FOR_EXPORT = "hidden-for-export";
export function getSvgMarkup(element, backgroundColor) {
    return fixNamespaces(decodeHtmlEntities(getMarkup(element, backgroundColor)))
}
export function getSvgElement(markup) {
    if (isString(markup)) {
        const parsedMarkup = (new window.DOMParser).parseFromString(markup, "image/svg+xml").childNodes[0];
        return parsedMarkup
    } else if (domAdapter.isNode(markup)) {
        return markup
    } else if (isRenderer(markup)) {
        return markup.get(0)
    }
}
