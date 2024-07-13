/**
 * DevExtreme (cjs/__internal/viz/core/themes/generic/light/tree_map.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _contants = require("./contants");
var _default = exports.default = {
    treeMap: {
        tile: {
            border: {
                width: 1,
                opacity: .2,
                color: "#000000"
            },
            color: "#5f8b95",
            hoverStyle: {
                hatching: {
                    opacity: .75,
                    step: 6,
                    width: 2,
                    direction: "right"
                },
                border: {}
            },
            selectionStyle: {
                hatching: {
                    opacity: .5,
                    step: 6,
                    width: 2,
                    direction: "right"
                },
                border: {
                    opacity: 1
                }
            },
            label: {
                visible: true,
                paddingLeftRight: 5,
                paddingTopBottom: 4,
                font: {
                    color: "#ffffff",
                    weight: 600
                },
                shadow: {
                    opacity: .6,
                    offsetX: 0,
                    offsetY: 1,
                    blur: 2,
                    color: "#000000"
                },
                wordWrap: "normal",
                textOverflow: "ellipsis"
            }
        },
        group: {
            padding: 4,
            border: {
                width: 1
            },
            color: "#eeeeee",
            hoverStyle: {
                hatching: {
                    opacity: 0,
                    step: 6,
                    width: 2,
                    direction: "right"
                },
                border: {}
            },
            selectionStyle: {
                hatching: {
                    opacity: 0,
                    step: 6,
                    width: 2,
                    direction: "right"
                },
                border: {}
            },
            label: {
                visible: true,
                paddingLeftRight: 5,
                paddingTopBottom: 4,
                font: {
                    color: _contants.SECONDARY_TITLE_COLOR,
                    weight: 600
                },
                textOverflow: "ellipsis"
            }
        },
        title: {
            subtitle: {}
        },
        tooltip: {},
        loadingIndicator: {}
    }
};
