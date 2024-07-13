/**
 * DevExtreme (cjs/viz/chart_components/layout_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.LayoutManager = LayoutManager;
var _type = require("../../core/utils/type");
var _consts = _interopRequireDefault(require("../components/consts"));
var _layout_element = require("../core/layout_element");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const {
    floor: floor,
    sqrt: sqrt
} = Math;
const _min = Math.min;
const _max = Math.max;
const DEFAULT_INNER_RADIUS = .5;
const RADIAL_LABEL_INDENT = _consts.default.radialLabelIndent;

function getNearestCoord(firstCoord, secondCoord, pointCenterCoord) {
    let nearestCoord;
    if (pointCenterCoord < firstCoord) {
        nearestCoord = firstCoord
    } else if (secondCoord < pointCenterCoord) {
        nearestCoord = secondCoord
    } else {
        nearestCoord = pointCenterCoord
    }
    return nearestCoord
}

function getLabelLayout(point) {
    if (point._label.isVisible() && "inside" !== point._label.getLayoutOptions().position) {
        return point._label.getBoundingRect()
    }
}

function getPieRadius(series, paneCenterX, paneCenterY, accessibleRadius, minR) {
    series.some((function(singleSeries) {
        return singleSeries.getVisiblePoints().reduce((function(radiusIsFound, point) {
            const labelBBox = getLabelLayout(point);
            if (labelBBox) {
                const xCoords = getNearestCoord(labelBBox.x, labelBBox.x + labelBBox.width, paneCenterX);
                const yCoords = getNearestCoord(labelBBox.y, labelBBox.y + labelBBox.height, paneCenterY);
                accessibleRadius = _min(_max(getLengthFromCenter(xCoords, yCoords, paneCenterX, paneCenterY) - RADIAL_LABEL_INDENT, minR), accessibleRadius);
                radiusIsFound = true
            }
            return radiusIsFound
        }), false)
    }));
    return accessibleRadius
}

function getSizeLabels(series) {
    return series.reduce((function(res, singleSeries) {
        let maxWidth = singleSeries.getVisiblePoints().reduce((function(width, point) {
            const labelBBox = getLabelLayout(point);
            if (labelBBox && labelBBox.width > width) {
                width = labelBBox.width
            }
            return width
        }), 0);
        let rWidth = maxWidth;
        if (maxWidth) {
            res.outerLabelsCount++;
            if (res.outerLabelsCount > 1) {
                maxWidth += _consts.default.pieLabelSpacing
            }
            rWidth += _consts.default.pieLabelSpacing
        }
        res.sizes.push(maxWidth);
        res.rSizes.push(rWidth);
        res.common += maxWidth;
        return res
    }), {
        sizes: [],
        rSizes: [],
        common: 0,
        outerLabelsCount: 0
    })
}

function correctLabelRadius(labelSizes, radius, series, canvas, averageWidthLabels, centerX) {
    let curRadius;
    let i;
    let runningWidth = 0;
    const sizes = labelSizes.sizes;
    const rSizes = labelSizes.rSizes;
    for (i = 0; i < series.length; i++) {
        if (0 === sizes[i]) {
            curRadius && (curRadius += rSizes[i - 1]);
            continue
        }
        curRadius = floor(curRadius ? curRadius + rSizes[i - 1] : radius);
        series[i].correctLabelRadius(curRadius);
        runningWidth += averageWidthLabels || sizes[i];
        rSizes[i] = averageWidthLabels || rSizes[i];
        series[i].setVisibleArea({
            left: floor(centerX - radius - runningWidth),
            right: floor(canvas.width - (centerX + radius + runningWidth)),
            top: canvas.top,
            bottom: canvas.bottom,
            width: canvas.width,
            height: canvas.height
        })
    }
}

function getLengthFromCenter(x, y, paneCenterX, paneCenterY) {
    return sqrt((x - paneCenterX) * (x - paneCenterX) + (y - paneCenterY) * (y - paneCenterY))
}

function getInnerRadius(_ref) {
    let {
        type: type,
        innerRadius: innerRadius
    } = _ref;
    return "pie" === type ? 0 : (0, _type.isNumeric)(innerRadius) ? Number(innerRadius) : .5
}

function LayoutManager() {}

function getAverageLabelWidth(centerX, radius, canvas, sizeLabels) {
    return (centerX - radius - RADIAL_LABEL_INDENT - canvas.left) / sizeLabels.outerLabelsCount
}

function getFullRadiusWithLabels(centerX, canvas, sizeLabels) {
    return centerX - canvas.left - (sizeLabels.outerLabelsCount > 0 ? sizeLabels.common + RADIAL_LABEL_INDENT : 0)
}

function correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY) {
    const sizeLabels = getSizeLabels(series);
    let averageWidthLabels;
    const fullRadiusWithLabels = getFullRadiusWithLabels(paneCenterX, canvas, sizeLabels);
    if (fullRadiusWithLabels < minR) {
        availableRadius = minR;
        averageWidthLabels = getAverageLabelWidth(paneCenterX, availableRadius, canvas, sizeLabels)
    } else {
        availableRadius = _min(getPieRadius(series, paneCenterX, paneCenterY, availableRadius, minR), fullRadiusWithLabels)
    }
    correctLabelRadius(sizeLabels, availableRadius + RADIAL_LABEL_INDENT, series, canvas, averageWidthLabels, paneCenterX);
    return availableRadius
}

function toLayoutElementCoords(canvas) {
    return new _layout_element.WrapperLayoutElement(null, {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    })
}
LayoutManager.prototype = {
    constructor: LayoutManager,
    setOptions: function(options) {
        this._options = options
    },
    applyPieChartSeriesLayout: function(canvas, series, hideLayoutLabels) {
        const paneSpaceHeight = canvas.height - canvas.top - canvas.bottom;
        const paneSpaceWidth = canvas.width - canvas.left - canvas.right;
        const paneCenterX = paneSpaceWidth / 2 + canvas.left;
        const paneCenterY = paneSpaceHeight / 2 + canvas.top;
        const piePercentage = this._options.piePercentage;
        let availableRadius;
        let minR;
        if ((0, _type.isNumeric)(piePercentage)) {
            availableRadius = minR = piePercentage * _min(canvas.height, canvas.width) / 2
        } else {
            availableRadius = _min(paneSpaceWidth, paneSpaceHeight) / 2;
            minR = this._options.minPiePercentage * availableRadius
        }
        if (!hideLayoutLabels) {
            availableRadius = correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY)
        }
        return {
            centerX: floor(paneCenterX),
            centerY: floor(paneCenterY),
            radiusInner: floor(availableRadius * getInnerRadius(series[0])),
            radiusOuter: floor(availableRadius)
        }
    },
    applyEqualPieChartLayout: function(series, layout) {
        const radius = layout.radius;
        return {
            centerX: floor(layout.x),
            centerY: floor(layout.y),
            radiusInner: floor(radius * getInnerRadius(series[0])),
            radiusOuter: floor(radius)
        }
    },
    correctPieLabelRadius: function(series, layout, canvas) {
        const sizeLabels = getSizeLabels(series);
        let averageWidthLabels;
        const radius = layout.radiusOuter + RADIAL_LABEL_INDENT;
        const availableLabelWidth = layout.centerX - canvas.left - radius;
        if (sizeLabels.common + RADIAL_LABEL_INDENT > availableLabelWidth) {
            averageWidthLabels = getAverageLabelWidth(layout.centerX, layout.radiusOuter, canvas, sizeLabels)
        }
        correctLabelRadius(sizeLabels, radius, series, canvas, averageWidthLabels, layout.centerX)
    },
    needMoreSpaceForPanesCanvas(panes, rotated, fixedSizeCallback) {
        const options = this._options;
        const width = options.width;
        const height = options.height;
        const piePercentage = options.piePercentage;
        const percentageIsValid = (0, _type.isNumeric)(piePercentage);
        let needHorizontalSpace = 0;
        let needVerticalSpace = 0;
        panes.forEach((pane => {
            const paneCanvas = pane.canvas;
            const minSize = percentageIsValid ? _min(paneCanvas.width, paneCanvas.height) * piePercentage : void 0;
            const paneSized = fixedSizeCallback ? fixedSizeCallback(pane) : {
                width: false,
                height: false
            };
            const needPaneHorizontalSpace = !paneSized.width ? (percentageIsValid ? minSize : width) - (paneCanvas.width - paneCanvas.left - paneCanvas.right) : 0;
            const needPaneVerticalSpace = !paneSized.height ? (percentageIsValid ? minSize : height) - (paneCanvas.height - paneCanvas.top - paneCanvas.bottom) : 0;
            if (rotated) {
                needHorizontalSpace += needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0;
                needVerticalSpace = _max(needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0, needVerticalSpace)
            } else {
                needHorizontalSpace = _max(needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0, needHorizontalSpace);
                needVerticalSpace += needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0
            }
        }));
        return needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
            width: needHorizontalSpace,
            height: needVerticalSpace
        } : false
    },
    layoutInsideLegend: function(legend, canvas) {
        const layoutOptions = legend.getLayoutOptions();
        if (!layoutOptions) {
            return
        }
        const position = layoutOptions.position;
        const cutSide = layoutOptions.cutSide;
        const my = {
            horizontal: position.horizontal,
            vertical: position.vertical
        };
        canvas[layoutOptions.cutLayoutSide] += "horizontal" === layoutOptions.cutSide ? layoutOptions.width : layoutOptions.height;
        my[cutSide] = {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            center: "center"
        } [my[cutSide]];
        legend.position({
            of: toLayoutElementCoords(canvas),
            my: my,
            at: position
        })
    }
};
