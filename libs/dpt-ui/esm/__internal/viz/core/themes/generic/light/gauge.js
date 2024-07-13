/**
 * DevExtreme (esm/__internal/viz/core/themes/generic/light/gauge.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    BOTTOM,
    CENTER,
    LEFT,
    NONE,
    OUTSIDE,
    RIGHT,
    TOP,
    WHITE
} from "./contants";
export default {
    gauge: {
        scale: {
            tick: {
                visible: true,
                length: 5,
                width: 2,
                opacity: 1
            },
            minorTick: {
                visible: false,
                length: 3,
                width: 1,
                opacity: 1
            },
            label: {
                visible: true,
                alignment: CENTER,
                hideFirstOrLast: "last",
                overlappingBehavior: "hide"
            },
            position: TOP,
            endOnTick: false
        },
        rangeContainer: {
            offset: 0,
            width: 5,
            backgroundColor: "#808080"
        },
        valueIndicators: {
            _default: {
                color: "#c2c2c2"
            },
            rangebar: {
                space: 2,
                size: 10,
                color: "#cbc5cf",
                backgroundColor: NONE,
                text: {
                    indent: 0,
                    font: {
                        size: 14,
                        color: null
                    }
                }
            },
            twocolorneedle: {
                secondColor: "#e18e92"
            },
            trianglemarker: {
                space: 2,
                length: 14,
                width: 13,
                color: "#8798a5"
            },
            textcloud: {
                arrowLength: 5,
                horizontalOffset: 6,
                verticalOffset: 3,
                color: "#679ec5",
                text: {
                    font: {
                        color: WHITE,
                        size: 18
                    }
                }
            }
        },
        indicator: {
            hasPositiveMeaning: true,
            layout: {
                horizontalAlignment: CENTER,
                verticalAlignment: BOTTOM
            },
            text: {
                font: {
                    size: 18
                }
            }
        },
        _circular: {
            scale: {
                scaleDivisionFactor: 17,
                orientation: OUTSIDE,
                label: {
                    indentFromTick: 10
                }
            },
            rangeContainer: {
                orientation: OUTSIDE
            },
            valueIndicatorType: "rectangleneedle",
            subvalueIndicatorType: "trianglemarker",
            valueIndicators: {
                _type: "rectangleneedle",
                _default: {
                    offset: 20,
                    indentFromCenter: 0,
                    width: 2,
                    spindleSize: 14,
                    spindleGapSize: 10,
                    beginAdaptingAtRadius: 50
                },
                triangleneedle: {
                    width: 4
                },
                twocolorneedle: {
                    space: 2,
                    secondFraction: .4
                },
                rangebar: {
                    offset: 30
                },
                trianglemarker: {
                    offset: 6
                },
                textcloud: {
                    offset: -6
                }
            }
        },
        _linear: {
            scale: {
                scaleDivisionFactor: 25,
                horizontalOrientation: RIGHT,
                verticalOrientation: BOTTOM,
                label: {
                    indentFromTick: -10
                }
            },
            rangeContainer: {
                horizontalOrientation: RIGHT,
                verticalOrientation: BOTTOM
            },
            valueIndicatorType: "rangebar",
            subvalueIndicatorType: "trianglemarker",
            valueIndicators: {
                _type: "rectangle",
                _default: {
                    offset: 2.5,
                    length: 15,
                    width: 15
                },
                rectangle: {
                    width: 10
                },
                rangebar: {
                    offset: 10,
                    horizontalOrientation: RIGHT,
                    verticalOrientation: BOTTOM
                },
                trianglemarker: {
                    offset: 10,
                    horizontalOrientation: LEFT,
                    verticalOrientation: TOP
                },
                textcloud: {
                    offset: -1,
                    horizontalOrientation: LEFT,
                    verticalOrientation: TOP
                }
            }
        }
    }
};
