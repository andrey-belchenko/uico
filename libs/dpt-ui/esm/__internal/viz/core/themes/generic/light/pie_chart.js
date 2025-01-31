/**
 * DevExtreme (esm/__internal/viz/core/themes/generic/light/pie_chart.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    NONE,
    RIGHT,
    WHITE
} from "./contants";
export default {
    pie: {
        innerRadius: .5,
        minDiameter: .5,
        type: "pie",
        dataPrepareSettings: {
            _skipArgumentSorting: true
        },
        commonSeriesSettings: {
            pie: {
                border: {
                    visible: false,
                    width: 2,
                    color: WHITE
                },
                hoverStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .75
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                },
                selectionStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .5
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                }
            },
            doughnut: {
                border: {
                    visible: false,
                    width: 2,
                    color: WHITE
                },
                hoverStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .75
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                },
                selectionStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .5
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                }
            },
            donut: {
                border: {
                    visible: false,
                    width: 2,
                    color: WHITE
                },
                hoverStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .75
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                },
                selectionStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 4,
                        step: 10,
                        opacity: .5
                    },
                    highlight: true,
                    border: {
                        visible: false,
                        width: 2
                    }
                }
            },
            label: {
                textOverflow: "ellipsis",
                wordWrap: "normal"
            }
        },
        legend: {
            hoverMode: "allArgumentPoints",
            backgroundColor: NONE
        },
        adaptiveLayout: {
            keepLabels: false
        }
    }
};
