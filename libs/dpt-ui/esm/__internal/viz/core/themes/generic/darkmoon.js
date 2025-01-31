/**
 * DevExtreme (esm/__internal/viz/core/themes/generic/darkmoon.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const ACCENT_COLOR = "#3debd3";
const BACKGROUND_COLOR = "#465672";
const TITLE_COLOR = "#fff";
const SUBTITLE_COLOR = "#919bac";
const TEXT_COLOR = "#c7ccd4";
const BORDER_COLOR = "#596980";
export default [{
    baseThemeName: "generic.dark",
    theme: {
        name: "generic.darkmoon",
        defaultPalette: "Dark Moon",
        backgroundColor: "#465672",
        primaryTitleColor: "#fff",
        secondaryTitleColor: "#919bac",
        gridColor: "#596980",
        axisColor: "#c7ccd4",
        export: {
            backgroundColor: "#465672",
            font: {
                color: "#fff"
            },
            button: {
                default: {
                    color: "#fff",
                    borderColor: "#7a889e",
                    backgroundColor: "#465672"
                },
                hover: {
                    color: "#fff",
                    borderColor: "#9da8b8",
                    backgroundColor: "#596e92"
                },
                focus: {
                    color: "#fff",
                    borderColor: "#c4cad4",
                    backgroundColor: "#596e92"
                },
                active: {
                    color: "#fff",
                    borderColor: "#c4cad4",
                    backgroundColor: "#6b80a4"
                }
            }
        },
        legend: {
            font: {
                color: "#c7ccd4"
            }
        },
        tooltip: {
            color: "#62789e",
            border: {
                color: "#596980"
            },
            font: {
                color: "#fff"
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: "#596980"
                    }
                }
            }
        },
        "chart:common:annotation": {
            font: {
                color: "#fff"
            },
            border: {
                color: "#596980"
            },
            color: "#62789e"
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: "#596980"
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#73869e"
                }
            }
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: "#3debd3"
                },
                textcloud: {
                    color: "#3debd3",
                    text: {
                        font: {
                            color: "#465672"
                        }
                    }
                }
            }
        },
        barGauge: {
            backgroundColor: "#526280"
        },
        funnel: {
            item: {
                border: {
                    color: "#465672"
                }
            }
        },
        sparkline: {
            pointColor: "#465672",
            minColor: "#f0ad4e",
            maxColor: "#f9517e"
        },
        treeMap: {
            group: {
                color: "#596980",
                label: {
                    font: {
                        color: "#fff"
                    }
                }
            }
        },
        map: {
            background: {
                borderColor: "#596980"
            },
            "layer:area": {
                color: "#97a3b6",
                borderColor: "#465672"
            }
        },
        rangeSelector: {
            shutter: {
                color: "#465672"
            },
            scale: {
                breakStyle: {
                    color: "#73869e"
                },
                tick: {
                    opacity: .2
                }
            },
            selectedRangeColor: "#3debd3",
            sliderMarker: {
                color: "#3debd3",
                font: {
                    color: "#000"
                }
            },
            sliderHandle: {
                color: "#3debd3",
                opacity: .5
            }
        },
        bullet: {
            color: "#3debd3"
        },
        sankey: {
            link: {
                border: {
                    color: "#465672"
                }
            },
            node: {
                border: {
                    color: "#465672"
                }
            }
        }
    }
}, {
    baseThemeName: "generic.darkmoon",
    theme: {
        name: "generic.darkmoon.compact"
    }
}];
