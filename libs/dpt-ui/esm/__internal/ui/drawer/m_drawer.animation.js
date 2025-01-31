/**
 * DevExtreme (esm/__internal/ui/drawer/m_drawer.animation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import fx from "../../../animation/fx";
import {
    camelize
} from "../../../core/utils/inflector";
export const animation = {
    moveTo(config) {
        const {
            $element: $element
        } = config;
        const {
            position: position
        } = config;
        const direction = config.direction || "left";
        const toConfig = {};
        let animationType;
        switch (direction) {
            case "right":
                toConfig.transform = `translate(${position}px, 0px)`;
                animationType = "custom";
                break;
            case "left":
                toConfig.left = position;
                animationType = "slide";
                break;
            case "top":
            case "bottom":
                toConfig.top = position;
                animationType = "slide"
        }
        fx.animate($element, {
            type: animationType,
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    margin(config) {
        const {
            $element: $element
        } = config;
        const {
            margin: margin
        } = config;
        const direction = config.direction || "left";
        const toConfig = {};
        toConfig[`margin${camelize(direction,true)}`] = margin;
        fx.animate($element, {
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    fade($element, config, duration, completeAction) {
        fx.animate($element, {
            type: "fade",
            to: config.to,
            from: config.from,
            duration: duration,
            complete: completeAction
        })
    },
    size(config) {
        const {
            $element: $element
        } = config;
        const {
            size: size
        } = config;
        const direction = config.direction || "left";
        const marginTop = config.marginTop || 0;
        const {
            duration: duration
        } = config;
        const toConfig = {};
        if ("right" === direction || "left" === direction) {
            toConfig.width = size
        } else {
            toConfig.height = size
        }
        if ("bottom" === direction) {
            toConfig.marginTop = marginTop
        }
        fx.animate($element, {
            to: toConfig,
            duration: duration,
            complete: config.complete
        })
    },
    complete($element) {
        fx.stop($element, true)
    }
};
