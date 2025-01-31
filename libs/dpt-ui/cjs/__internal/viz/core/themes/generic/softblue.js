/**
 * DevExtreme (cjs/__internal/viz/core/themes/generic/softblue.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
const ACCENT_COLOR = "#7ab8eb";
const BACKGROUND_COLOR = "#fff";
const TITLE_COLOR = "#333";
const SUBTITLE_COLOR = "#99a1a8";
const TEXT_COLOR = "#707070";
const BORDER_COLOR = "#e8eaeb";
var _default = exports.default = [{
    baseThemeName: "generic.light",
    theme: {
        name: "generic.softblue",
        defaultPalette: "Soft Blue",
        backgroundColor: "#fff",
        primaryTitleColor: "#333",
        secondaryTitleColor: "#99a1a8",
        gridColor: "#e8eaeb",
        axisColor: "#707070",
        export: {
            backgroundColor: "#fff",
            font: {
                color: "#333"
            },
            button: {
                default: {
                    color: "#333",
                    borderColor: "#c9d0d4",
                    backgroundColor: "#fff"
                },
                hover: {
                    color: "#333",
                    borderColor: "#a7b2b9",
                    backgroundColor: "#e6e6e6"
                },
                focus: {
                    color: "#333",
                    borderColor: "#82929b",
                    backgroundColor: "#e6e6e6"
                },
                active: {
                    color: "#333",
                    borderColor: "#82929b",
                    backgroundColor: "#d4d4d4"
                }
            }
        },
        legend: {
            font: {
                color: "#707070"
            }
        },
        tooltip: {
            color: "#fff",
            border: {
                color: "#e8eaeb"
            },
            font: {
                color: "#333"
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: "#e8eaeb"
                    }
                }
            }
        },
        "chart:common:annotation": {
            color: "#fff",
            border: {
                color: "#e8eaeb"
            },
            font: {
                color: "#333"
            }
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: "#e8eaeb"
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#cfd2d3"
                }
            }
        },
        rangeSelector: {
            scale: {
                breakStyle: {
                    color: "#cfd2d3"
                },
                tick: {
                    opacity: .12
                }
            },
            selectedRangeColor: "#7ab8eb",
            sliderMarker: {
                color: "#7ab8eb"
            },
            sliderHandle: {
                color: "#7ab8eb",
                opacity: .5
            }
        },
        sparkline: {
            pointColor: "#fff",
            minColor: "#f0ad4e",
            maxColor: "#d9534f"
        },
        treeMap: {
            group: {
                color: "#e8eaeb",
                label: {
                    font: {
                        color: "#99a1a8"
                    }
                }
            }
        },
        bullet: {
            color: "#7ab8eb"
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: "#7ab8eb"
                },
                textcloud: {
                    color: "#7ab8eb"
                }
            }
        }
    }
}, {
    baseThemeName: "generic.softblue",
    theme: {
        name: "generic.softblue.compact"
    }
}];
