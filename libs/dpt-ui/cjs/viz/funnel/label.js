/**
 * DevExtreme (cjs/viz/funnel/label.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
exports.plugin = void 0;
var _label = require("../series/points/label");
var _utils = require("../core/utils");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
const OUTSIDE_POSITION = "outside";
const INSIDE_POSITION = "inside";
const OUTSIDE_LABEL_INDENT = 5;
const COLUMNS_LABEL_INDENT = 20;
const CONNECTOR_INDENT = 4;
const PREVENT_EMPTY_PIXEL_OFFSET = 1;

function getLabelIndent(pos) {
    pos = (0, _utils.normalizeEnum)(pos);
    if (pos === OUTSIDE_POSITION) {
        return 5
    } else if (pos === INSIDE_POSITION) {
        return 0
    }
    return 20
}

function isOutsidePosition(pos) {
    pos = (0, _utils.normalizeEnum)(pos);
    return pos === OUTSIDE_POSITION || pos !== INSIDE_POSITION
}

function correctYForInverted(y, bBox, inverted) {
    return inverted ? y - bBox.height : y
}

function getOutsideRightLabelPosition(coords, bBox, options, inverted) {
    return {
        x: coords[2] + options.horizontalOffset + 5,
        y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
    }
}

function getOutsideLeftLabelPosition(coords, bBox, options, inverted) {
    return {
        x: coords[0] - bBox.width - options.horizontalOffset - 5,
        y: correctYForInverted(coords[1] + options.verticalOffset, bBox, inverted)
    }
}

function getInsideLabelPosition(coords, bBox, options) {
    const width = coords[2] - coords[0];
    const height = coords[7] - coords[1];
    return {
        x: coords[0] + width / 2 + options.horizontalOffset - bBox.width / 2,
        y: coords[1] + options.verticalOffset + height / 2 - bBox.height / 2
    }
}

function getColumnLabelRightPosition(labelRect, rect, textAlignment) {
    return function(coords, bBox, options, inverted) {
        return {
            x: "left" === textAlignment ? rect[2] + options.horizontalOffset + 20 : labelRect[2] - bBox.width,
            y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
        }
    }
}

function getColumnLabelLeftPosition(labelRect, rect, textAlignment) {
    return function(coords, bBox, options, inverted) {
        return {
            x: "left" === textAlignment ? labelRect[0] : rect[0] - bBox.width - options.horizontalOffset - 20,
            y: correctYForInverted(coords[3] + options.verticalOffset, bBox, inverted)
        }
    }
}

function getConnectorStrategy(options, inverted) {
    const isLeftPos = "left" === options.horizontalAlignment;
    const connectorIndent = isLeftPos ? 4 : -4;
    const verticalCorrection = inverted ? -1 : 0;

    function getFigureCenter(figure) {
        return isLeftPos ? [figure[0] + 1, figure[1] + verticalCorrection] : [figure[2] - 1, figure[3] + verticalCorrection]
    }
    return {
        isLabelInside: function() {
            return !isOutsidePosition(options.position)
        },
        getFigureCenter: getFigureCenter,
        prepareLabelPoints: function(bBox) {
            const x = bBox.x + connectorIndent;
            const y = bBox.y;
            const x1 = x + bBox.width;
            return [...Array(bBox.height + 1)].map(((_, i) => [x, y + i])).concat([...Array(bBox.height + 1)].map(((_, i) => [x1, y + i])))
        },
        isHorizontal: function() {
            return true
        },
        findFigurePoint: function(figure) {
            return getFigureCenter(figure)
        },
        adjustPoints: function(points) {
            return points.map(Math.round)
        }
    }
}

function getLabelOptions(labelOptions, defaultColor, defaultTextAlignment) {
    const opt = labelOptions || {};
    const labelFont = (0, _extend.extend)({}, opt.font) || {};
    const labelBorder = opt.border || {};
    const labelConnector = opt.connector || {};
    const backgroundAttr = {
        fill: opt.backgroundColor || defaultColor,
        "stroke-width": labelBorder.visible ? labelBorder.width || 0 : 0,
        stroke: labelBorder.visible && labelBorder.width ? labelBorder.color : "none",
        dashStyle: labelBorder.dashStyle
    };
    const connectorAttr = {
        stroke: labelConnector.visible && labelConnector.width ? labelConnector.color || defaultColor : "none",
        "stroke-width": labelConnector.visible ? labelConnector.width || 0 : 0,
        opacity: labelConnector.opacity
    };
    labelFont.color = "none" === opt.backgroundColor && "#ffffff" === (0, _utils.normalizeEnum)(labelFont.color) && "inside" !== opt.position ? defaultColor : labelFont.color;
    return {
        format: opt.format,
        textAlignment: opt.textAlignment || (isOutsidePosition(opt.position) ? defaultTextAlignment : "center"),
        customizeText: opt.customizeText,
        attributes: {
            font: labelFont
        },
        visible: 0 !== labelFont.size ? opt.visible : false,
        showForZeroValues: opt.showForZeroValues,
        horizontalOffset: opt.horizontalOffset,
        verticalOffset: opt.verticalOffset,
        background: backgroundAttr,
        connector: connectorAttr,
        wordWrap: labelOptions.wordWrap,
        textOverflow: labelOptions.textOverflow
    }
}

function correctLabelPosition(pos, bBox, rect) {
    if (pos.x < rect[0]) {
        pos.x = rect[0]
    }
    if (pos.x + bBox.width > rect[2]) {
        pos.x = rect[2] - bBox.width
    }
    if (pos.y < rect[1]) {
        pos.y = rect[1]
    }
    if (pos.y + bBox.height > rect[3]) {
        pos.y = rect[3] - bBox.height
    }
    return pos
}

function removeEmptySpace(labels, requiredSpace, startPoint) {
    labels.reduce(((requiredSpace, label, index, labels) => {
        const prevLabel = labels[index + 1];
        if (requiredSpace > 0) {
            const bBox = label.getBoundingRect();
            const point = prevLabel ? prevLabel.getBoundingRect().y + prevLabel.getBoundingRect().height : startPoint;
            const emptySpace = bBox.y - point;
            const shift = Math.min(emptySpace, requiredSpace);
            labels.slice(0, index + 1).forEach((label => {
                const bBox = label.getBoundingRect();
                label.shift(bBox.x, bBox.y - shift)
            }));
            requiredSpace -= shift
        }
        return requiredSpace
    }), requiredSpace)
}
const plugin = exports.plugin = {
    name: "lables",
    init: _common.noop,
    dispose: _common.noop,
    extenders: {
        _initCore: function() {
            this._labelsGroup = this._renderer.g().attr({
                class: this._rootClassPrefix + "-labels"
            }).append(this._renderer.root);
            this._labels = []
        },
        _applySize: function() {
            const options = this._getOption("label");
            const adaptiveLayout = this._getOption("adaptiveLayout");
            const rect = this._rect;
            let labelWidth = 0;
            const width = rect[2] - rect[0];
            this._labelRect = rect.slice();
            if (!this._labels.length || !isOutsidePosition(options.position)) {
                if ((0, _utils.normalizeEnum)("none" !== this._getOption("resolveLabelOverlapping", true))) {
                    this._labels.forEach((l => !l.isVisible() && l.draw(true)))
                }
                return
            }
            const groupWidth = this._labels.map((function(label) {
                label.resetEllipsis();
                return label.getBoundingRect().width
            })).reduce((function(max, width) {
                return Math.max(max, width)
            }), 0);
            labelWidth = groupWidth + options.horizontalOffset + getLabelIndent(options.position);
            if (!adaptiveLayout.keepLabels && width - labelWidth < adaptiveLayout.width) {
                this._labels.forEach((function(label) {
                    label.draw(false)
                }));
                return
            } else {
                if (width - labelWidth < adaptiveLayout.width) {
                    labelWidth = width - adaptiveLayout.width;
                    labelWidth = labelWidth > 0 ? labelWidth : 0
                }
                this._labels.forEach((function(label) {
                    label.draw(true)
                }))
            }
            if ("left" === options.horizontalAlignment) {
                rect[0] += labelWidth
            } else {
                rect[2] -= labelWidth
            }
        },
        _buildNodes: function() {
            this._createLabels()
        },
        _change_TILING: function() {
            const that = this;
            const options = that._getOption("label");
            let getCoords = getInsideLabelPosition;
            const inverted = that._getOption("inverted", true);
            let textAlignment;
            if (isOutsidePosition(options.position)) {
                if ((0, _utils.normalizeEnum)(options.position) === OUTSIDE_POSITION) {
                    getCoords = "left" === options.horizontalAlignment ? getOutsideLeftLabelPosition : getOutsideRightLabelPosition
                } else {
                    textAlignment = this._defaultLabelTextAlignment();
                    getCoords = "left" === options.horizontalAlignment ? getColumnLabelLeftPosition(this._labelRect, this._rect, textAlignment) : getColumnLabelRightPosition(this._labelRect, this._rect, textAlignment)
                }
            }
            that._labels.forEach((function(label, index) {
                const item = that._items[index];
                const borderWidth = item.getNormalStyle()["stroke-width"];
                const halfBorderWidth = inverted ? borderWidth / 2 : -borderWidth / 2;
                const coords = halfBorderWidth ? item.coords.map((function(coord, index) {
                    if (1 === index || 3 === index) {
                        return coord - halfBorderWidth
                    } else if (2 === index) {
                        return coord - borderWidth
                    } else if (0 === index) {
                        return coord + borderWidth
                    }
                    return coord
                })) : item.coords;
                if (!options.showForZeroValues && 0 === item.value) {
                    label.draw(false);
                    return
                }
                if (isOutsidePosition(options.position)) {
                    that._correctLabelWidth(label, item.coords, options)
                }
                const bBox = label.getBoundingRect();
                const pos = correctLabelPosition(getCoords(coords, bBox, options, inverted), bBox, that._labelRect);
                label.setFigureToDrawConnector(coords);
                label.shift(pos.x, pos.y)
            }));
            that._resolveLabelOverlapping()
        }
    },
    members: {
        _resolveLabelOverlapping() {
            const that = this;
            const resolveLabelOverlapping = (0, _utils.normalizeEnum)(that._getOption("resolveLabelOverlapping", true));
            const labels = this._getOption("inverted", true) ? that._labels.slice().reverse() : that._labels;
            if ("hide" === resolveLabelOverlapping) {
                labels.reduce(((height, label) => {
                    if (label.getBoundingRect().y < height) {
                        label.hide()
                    } else {
                        height = label.getBoundingRect().y + label.getBoundingRect().height
                    }
                    return height
                }), 0)
            } else if ("shift" === resolveLabelOverlapping) {
                const maxHeight = this._labelRect[3];
                labels.filter((label => label.isVisible())).reduce(((_ref, label, index, labels) => {
                    let [height, emptySpace] = _ref;
                    const bBox = label.getBoundingRect();
                    let y = bBox.y;
                    if (bBox.y < height) {
                        label.shift(bBox.x, height);
                        y = height
                    }
                    if (y - height > 0) {
                        emptySpace += y - height
                    }
                    if (y + bBox.height > maxHeight) {
                        if (emptySpace && emptySpace > y + bBox.height - maxHeight) {
                            removeEmptySpace(labels.slice(0, index).reverse(), y + bBox.height - maxHeight, that._labelRect[1]);
                            emptySpace -= y + bBox.height - maxHeight;
                            label.shift(bBox.x, y - (y + bBox.height - maxHeight));
                            height = y - (y + bBox.height - maxHeight) + bBox.height
                        } else {
                            label.hide()
                        }
                    } else {
                        height = y + bBox.height
                    }
                    return [height, emptySpace]
                }), [this._labelRect[1], 0])
            }
        },
        _defaultLabelTextAlignment: function() {
            return this._getOption("rtlEnabled", true) ? "right" : "left"
        },
        _correctLabelWidth: function(label, item, options) {
            const isLeftPos = "left" === options.horizontalAlignment;
            const minX = isLeftPos ? this._labelRect[0] : item[2];
            const maxX = isLeftPos ? item[0] : this._labelRect[2];
            const maxWidth = maxX - minX;
            if (label.getBoundingRect().width > maxWidth) {
                label.fit(maxWidth)
            }
        },
        _createLabels: function() {
            const that = this;
            const labelOptions = that._getOption("label");
            const connectorStrategy = getConnectorStrategy(labelOptions, that._getOption("inverted", true));
            this._labelsGroup.clear();
            if (!labelOptions.visible) {
                return
            }
            this._labels = that._items.map((function(item) {
                const label = new _label.Label({
                    renderer: that._renderer,
                    labelsGroup: that._labelsGroup,
                    strategy: connectorStrategy
                });
                label.setOptions(getLabelOptions(labelOptions, item.color, that._defaultLabelTextAlignment()));
                label.setData({
                    item: item,
                    value: item.value,
                    percent: item.percent
                });
                label.draw(true);
                return label
            }));
            if (this._labels.length && isOutsidePosition(labelOptions.position)) {
                this._requestChange(["LAYOUT"])
            }
        }
    },
    customize: function(constructor) {
        constructor.prototype._proxyData.push((function(x, y) {
            const that = this;
            let data;
            that._labels.forEach((function(label, index) {
                const rect = label.getBoundingRect();
                if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
                    const pos = isOutsidePosition(that._getOption("label").position) ? "outside" : "inside";
                    data = {
                        id: index,
                        type: pos + "-label"
                    };
                    return true
                }
            }));
            return data
        }));
        ["label", "resolveLabelOverlapping"].forEach((optionName => {
            constructor.addChange({
                code: optionName.toUpperCase(),
                handler: function() {
                    this._createLabels();
                    this._requestChange(["LAYOUT"])
                },
                isThemeDependent: true,
                isOptionChange: true,
                option: optionName
            })
        }))
    },
    fontFields: ["label.font"]
};
