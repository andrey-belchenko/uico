/**
 * DevExtreme (esm/viz/sankey/tooltip.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    extend as _extend
} from "../../core/utils/extend";
import {
    isFunction
} from "../../core/utils/type";
const defaultCustomizeLinkTooltip = formatter => function(info) {
    return {
        html: `<strong>${info.source} > ${info.target}</strong><br/>Weight: ${formatter(info.weight)}`
    }
};
const defaultCustomizeNodeTooltip = formatter => function(info) {
    return {
        html: `<strong>${info.label}</strong><br/>Incoming weight: ${formatter(info.weightIn)}<br/>Outgoing weight: ${formatter(info.weightOut)}`
    }
};
const generateCustomCallback = function(customCallback, defaultCallback) {
    return function(objectInfo) {
        let res = isFunction(customCallback) ? customCallback.call(objectInfo, objectInfo) : {};
        const hasOwnProperty = Object.prototype.hasOwnProperty.bind(res);
        if (!hasOwnProperty("html") && !hasOwnProperty("text")) {
            res = _extend(res, defaultCallback.call(objectInfo, objectInfo))
        }
        return res
    }
};
export function setTooltipCustomOptions(sankey) {
    sankey.prototype._setTooltipOptions = function() {
        const tooltip = this._tooltip;
        const options = tooltip && this._getOption("tooltip");
        let linkTemplate;
        let nodeTemplate;
        if (options.linkTooltipTemplate) {
            linkTemplate = this._getTemplate(options.linkTooltipTemplate)
        }
        if (options.nodeTooltipTemplate) {
            nodeTemplate = this._getTemplate(options.nodeTooltipTemplate)
        }
        tooltip && tooltip.update(_extend({}, options, {
            customizeTooltip: function(args) {
                if (!(linkTemplate && "link" === args.type || nodeTemplate && "node" === args.type)) {
                    args.skipTemplate = true
                }
                const formatter = value => tooltip.formatValue(value);
                if ("node" === args.type) {
                    return generateCustomCallback(options.customizeNodeTooltip, defaultCustomizeNodeTooltip(formatter))(args.info)
                } else if ("link" === args.type) {
                    return generateCustomCallback(options.customizeLinkTooltip, defaultCustomizeLinkTooltip(formatter))(args.info)
                }
                return {}
            },
            contentTemplate(arg, div) {
                const templateArgs = {
                    model: arg.info,
                    container: div
                };
                if (linkTemplate && "link" === arg.type) {
                    return linkTemplate.render(templateArgs)
                }
                if (nodeTemplate && "node" === arg.type) {
                    return nodeTemplate.render(templateArgs)
                }
            },
            enabled: options.enabled
        }))
    };
    sankey.prototype.hideTooltip = function() {
        this._tooltip && this._tooltip.hide()
    }
}
