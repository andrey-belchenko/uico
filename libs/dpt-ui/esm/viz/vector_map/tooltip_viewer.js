/**
 * DevExtreme (esm/viz/vector_map/tooltip_viewer.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const TOOLTIP_OFFSET = 12;
export function TooltipViewer(params) {
    this._subscribeToTracker(params.tracker, params.tooltip, params.layerCollection)
}
TooltipViewer.prototype = {
    constructor: TooltipViewer,
    dispose: function() {
        this._offTracker();
        this._offTracker = null
    },
    _subscribeToTracker: function(tracker, tooltip, layerCollection) {
        this._offTracker = tracker.on({
            "focus-on": function(arg) {
                let layer;
                let proxy;
                if (tooltip.isEnabled()) {
                    layer = layerCollection.byName(arg.data.name);
                    proxy = layer && layer.getProxy(arg.data.index);
                    const callback = result => {
                        result && arg.done(result)
                    };
                    proxy && callback(tooltip.show(proxy, {
                        x: arg.x,
                        y: arg.y,
                        offset: 12
                    }, {
                        target: proxy
                    }, void 0, callback))
                }
            },
            "focus-move": function(arg) {
                tooltip.move(arg.x, arg.y, 12)
            },
            "focus-off": function() {
                tooltip.hide()
            }
        })
    }
};
