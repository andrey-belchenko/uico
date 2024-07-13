/**
 * DevExtreme (esm/viz/core/annotations.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import domAdapter from "../../core/dom_adapter";
import {
    isDefined,
    isFunction
} from "../../core/utils/type";
import {
    Tooltip
} from "../core/tooltip";
import {
    extend
} from "../../core/utils/extend";
import {
    patchFontOptions
} from "./utils";
import {
    Plaque
} from "./plaque";
import pointerEvents from "../../events/pointer";
import {
    start as dragEventStart,
    move as dragEventMove,
    end as dragEventEnd
} from "../../events/drag";
import {
    addNamespace
} from "../../events/utils/index";
import eventsEngine from "../../events/core/events_engine";
const getDocument = domAdapter.getDocument;
const EVENT_NS = "annotations";
const DOT_EVENT_NS = "." + EVENT_NS;
const POINTER_ACTION = addNamespace([pointerEvents.down, pointerEvents.move], EVENT_NS);
const POINTER_UP_EVENT_NAME = addNamespace(pointerEvents.up, EVENT_NS);
const DRAG_START_EVENT_NAME = dragEventStart + DOT_EVENT_NS;
const DRAG_EVENT_NAME = dragEventMove + DOT_EVENT_NS;
const DRAG_END_EVENT_NAME = dragEventEnd + DOT_EVENT_NS;

function coreAnnotation(options, contentTemplate) {
    return {
        draw: function(widget, group) {
            const annotationGroup = widget._renderer.g().append(group).css(patchFontOptions(options.font));
            if (this.plaque) {
                this.plaque.clear()
            }
            this.plaque = new Plaque(extend(true, {}, options, {
                cornerRadius: (options.border || {}).cornerRadius
            }), widget, annotationGroup, contentTemplate, widget._isAnnotationBounded(options));
            this.plaque.draw(widget._getAnnotationCoords(this));
            if (options.allowDragging) {
                annotationGroup.on(DRAG_START_EVENT_NAME, {
                    immediate: true
                }, (e => {
                    this._dragOffsetX = this.plaque.x - e.pageX;
                    this._dragOffsetY = this.plaque.y - e.pageY
                })).on(DRAG_EVENT_NAME, (e => {
                    this.plaque.move(e.pageX + this._dragOffsetX, e.pageY + this._dragOffsetY)
                })).on(DRAG_END_EVENT_NAME, (e => {
                    this.offsetX = (this.offsetX || 0) + e.offset.x;
                    this.offsetY = (this.offsetY || 0) + e.offset.y
                }))
            }
        },
        hitTest(x, y) {
            return this.plaque.hitTest(x, y)
        },
        showTooltip(tooltip, _ref) {
            let {
                x: x,
                y: y
            } = _ref;
            const that = this;
            const options = that.options;
            if (tooltip.annotation !== that) {
                tooltip.setTemplate(options.tooltipTemplate);
                const callback = result => {
                    result && (tooltip.annotation = that)
                };
                callback(tooltip.show(options, {
                    x: x,
                    y: y
                }, {
                    target: options
                }, options.customizeTooltip, callback))
            } else if (!tooltip.isCursorOnTooltip(x, y)) {
                tooltip.move(x, y)
            }
        }
    }
}

function getTemplateFunction(options, widget) {
    let template;
    if ("text" === options.type) {
        template = function(item, groupElement) {
            const text = widget._renderer.text(item.text).attr({
                class: item.cssClass
            }).append({
                element: groupElement
            });
            if (item.width > 0 || item.height > 0) {
                text.setMaxSize(item.width, item.height, {
                    wordWrap: item.wordWrap,
                    textOverflow: item.textOverflow
                })
            }
        }
    } else if ("image" === options.type) {
        template = function(item, groupElement) {
            const {
                width: width,
                height: height,
                url: url,
                location: location
            } = item.image || {};
            const {
                width: outerWidth,
                height: outerHeight
            } = item;
            const imageWidth = outerWidth > 0 ? Math.min(width, outerWidth) : width;
            const imageHeight = outerHeight > 0 ? Math.min(height, outerHeight) : height;
            widget._renderer.image(0, 0, imageWidth, imageHeight, url, location || "center").append({
                element: groupElement
            })
        }
    } else if ("custom" === options.type) {
        template = options.template
    }
    return template
}

function getImageObject(image) {
    return "string" === typeof image ? {
        url: image
    } : image
}
export let createAnnotations = function(widget, items) {
    let commonAnnotationSettings = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    let customizeAnnotation = arguments.length > 3 ? arguments[3] : void 0;
    let pullOptions = arguments.length > 4 ? arguments[4] : void 0;
    const commonImageOptions = getImageObject(commonAnnotationSettings.image);
    return items.reduce(((arr, item) => {
        const currentImageOptions = getImageObject(item.image);
        const customizedItem = isFunction(customizeAnnotation) ? customizeAnnotation(item) : {};
        if (customizedItem) {
            customizedItem.image = getImageObject(customizedItem.image)
        }
        const options = extend(true, {}, commonAnnotationSettings, item, {
            image: commonImageOptions
        }, {
            image: currentImageOptions
        }, customizedItem);
        const templateFunction = getTemplateFunction(options, widget);
        const annotation = templateFunction && extend(true, pullOptions(options), coreAnnotation(options, widget._getTemplate(templateFunction)));
        annotation && arr.push(annotation);
        return arr
    }), [])
};
const chartPlugin = {
    name: "annotations_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            var _axis, _axis2;
            const coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            const argCoordName = this._options.silent("rotated") ? "y" : "x";
            const valCoordName = this._options.silent("rotated") ? "x" : "y";
            const argAxis = this.getArgumentAxis();
            const argument = argAxis.validateUnit(annotation.argument);
            let axis = this.getValueAxis(annotation.axis);
            let series;
            let pane = null === (_axis = axis) || void 0 === _axis ? void 0 : _axis.pane;
            if (annotation.series) {
                var _series;
                series = this.series.filter((s => s.name === annotation.series))[0];
                axis = null === (_series = series) || void 0 === _series ? void 0 : _series.getValueAxis();
                isDefined(axis) && (pane = axis.pane)
            }
            if (isDefined(argument)) {
                if (series) {
                    const center = series.getPointCenterByArg(argument);
                    center && (coords[argCoordName] = center[argCoordName])
                } else {
                    coords[argCoordName] = argAxis.getTranslator().translate(argument)
                }!isDefined(pane) && (pane = argAxis.pane)
            }
            const value = null === (_axis2 = axis) || void 0 === _axis2 ? void 0 : _axis2.validateUnit(annotation.value);
            if (isDefined(value)) {
                var _axis3;
                coords[valCoordName] = null === (_axis3 = axis) || void 0 === _axis3 ? void 0 : _axis3.getTranslator().translate(value);
                !isDefined(pane) && isDefined(axis) && (pane = axis.pane)
            }
            coords.canvas = this._getCanvasForPane(pane);
            if (isDefined(coords[argCoordName]) && !isDefined(value)) {
                var _series2;
                if (!isDefined(axis) && !isDefined(series)) {
                    coords[valCoordName] = argAxis.getAxisPosition()
                } else if (isDefined(axis) && !isDefined(series)) {
                    coords[valCoordName] = this._argumentAxes.filter((a => a.pane === axis.pane))[0].getAxisPosition()
                } else if (null !== (_series2 = series) && void 0 !== _series2 && _series2.checkSeriesViewportCoord(argAxis, coords[argCoordName])) {
                    coords[valCoordName] = series.getSeriesPairCoord(coords[argCoordName], true)
                }
            }
            if (!isDefined(argument) && isDefined(coords[valCoordName])) {
                if (isDefined(axis) && !isDefined(series)) {
                    coords[argCoordName] = axis.getAxisPosition()
                } else if (isDefined(series)) {
                    if (series.checkSeriesViewportCoord(axis, coords[valCoordName])) {
                        coords[argCoordName] = series.getSeriesPairCoord(coords[valCoordName], false)
                    }
                }
            }
            return coords
        },
        _annotationsPointerEventHandler(event) {
            if (this._disposed) {
                return
            }
            const originalEvent = event.originalEvent || {};
            const touch = originalEvent.touches && originalEvent.touches[0] || {};
            const rootOffset = this._renderer.getRootOffset();
            const coords = {
                x: touch.pageX || originalEvent.pageX || event.pageX,
                y: touch.pageY || originalEvent.pageY || event.pageY
            };
            const annotation = this._annotations.items.filter((a => a.hitTest(coords.x - rootOffset.left, coords.y - rootOffset.top)))[0];
            if (!annotation || !annotation.options.tooltipEnabled) {
                this._annotations.hideTooltip();
                return
            }
            this._clear();
            if (annotation.options.allowDragging && event.type === pointerEvents.down) {
                this._annotations._hideToolTipForDrag = true
            }
            if (!this._annotations._hideToolTipForDrag) {
                annotation.showTooltip(this._annotations.tooltip, coords);
                event.stopPropagation()
            }
        },
        _isAnnotationBounded: options => isDefined(options.value) || isDefined(options.argument),
        _pullOptions: options => ({
            type: options.type,
            name: options.name,
            x: options.x,
            y: options.y,
            value: options.value,
            argument: options.argument,
            axis: options.axis,
            series: options.series,
            options: options,
            offsetX: options.offsetX,
            offsetY: options.offsetY
        }),
        _forceAnnotationRender() {
            this._change(["FORCE_RENDER"])
        },
        _clear() {
            this.hideTooltip();
            this.clearHover()
        }
    }
};
const polarChartPlugin = {
    name: "annotations_polar_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            const coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._calcCanvas()
            };
            const argAxis = this.getArgumentAxis();
            let argument = argAxis.validateUnit(annotation.argument);
            const value = this.getValueAxis().validateUnit(annotation.value);
            const radius = annotation.radius;
            const angle = annotation.angle;
            let pointCoords;
            let series;
            if (annotation.series) {
                series = this.series.filter((s => s.name === annotation.series))[0]
            }
            extend(true, coords, this.getXYFromPolar(angle, radius, argument, value));
            if (isDefined(series)) {
                if (isDefined(coords.angle) && !isDefined(value) && !isDefined(radius)) {
                    if (!isDefined(argument)) {
                        argument = argAxis.getTranslator().from(isFinite(angle) ? this.getActualAngle(angle) : coords.angle)
                    }
                    pointCoords = series.getSeriesPairCoord({
                        argument: argument,
                        angle: -coords.angle
                    }, true)
                } else if (isDefined(coords.radius) && !isDefined(argument) && !isDefined(angle)) {
                    pointCoords = series.getSeriesPairCoord({
                        radius: coords.radius
                    }, false)
                }
                if (isDefined(pointCoords)) {
                    coords.x = pointCoords.x;
                    coords.y = pointCoords.y
                }
            }
            if (annotation.series && !isDefined(pointCoords)) {
                coords.x = coords.y = void 0
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: chartPlugin.members._isAnnotationBounded,
        _pullOptions(options) {
            const polarOptions = extend({}, {
                radius: options.radius,
                angle: options.angle
            }, chartPlugin.members._pullOptions(options));
            delete polarOptions.axis;
            return polarOptions
        },
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender,
        _clear: chartPlugin.members._clear
    }
};
const vectorMapPlugin = {
    name: "annotations_vector_map",
    init() {},
    dispose() {
        this._annotations._offTracker();
        this._annotations._offTracker = null
    },
    members: {
        _getAnnotationCoords(annotation) {
            const coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            coords.canvas = this._projection.getCanvas();
            if (annotation.coordinates) {
                const data = this._projection.toScreenPoint(annotation.coordinates);
                coords.x = data[0];
                coords.y = data[1]
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: options => isDefined(options.coordinates),
        _pullOptions(options) {
            const vectorMapOptions = extend({}, {
                coordinates: options.coordinates
            }, chartPlugin.members._pullOptions(options));
            delete vectorMapOptions.axis;
            delete vectorMapOptions.series;
            delete vectorMapOptions.argument;
            delete vectorMapOptions.value;
            return vectorMapOptions
        },
        _forceAnnotationRender() {
            this._change(["EXTRA_ELEMENTS"])
        },
        _getAnnotationStyles: () => ({
            "text-anchor": "start"
        }),
        _clear() {}
    },
    extenders: {
        _prepareExtraElements() {
            const that = this;
            const renderElements = () => {
                that._renderExtraElements()
            };
            that._annotations._offTracker = that._tracker.on({
                move: renderElements,
                zoom: renderElements,
                end: renderElements
            })
        }
    }
};
const pieChartPlugin = {
    name: "annotations_pie_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            let series;
            const coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._canvas
            };
            if (annotation.argument) {
                if (annotation.series) {
                    series = this.getSeriesByName(annotation.series)
                } else {
                    series = this.series[0]
                }
                const argument = series.getPointsByArg(annotation.argument)[0];
                const {
                    x: x,
                    y: y
                } = argument.getAnnotationCoords(annotation.location);
                coords.x = x;
                coords.y = y
            }
            return coords
        },
        _isAnnotationBounded: options => options.argument,
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _pullOptions(options) {
            const pieChartOptions = extend({}, {
                location: options.location
            }, chartPlugin.members._pullOptions(options));
            delete pieChartOptions.axis;
            return pieChartOptions
        },
        _clear: chartPlugin.members._clear,
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender
    }
};
const corePlugin = {
    name: "annotations_core",
    init() {
        this._annotations = {
            items: [],
            _hideToolTipForDrag: false,
            tooltip: new Tooltip({
                cssClass: `${this._rootClassPrefix}-annotation-tooltip`,
                eventTrigger: this._eventTrigger,
                widgetRoot: this.element(),
                widget: this
            }),
            hideTooltip() {
                this.tooltip.annotation = null;
                this.tooltip.hide()
            },
            clearItems() {
                this.items.forEach((i => i.plaque.clear()));
                this.items = []
            }
        };
        this._annotations.tooltip.setRendererOptions(this._getRendererOptions())
    },
    dispose() {
        this._annotationsGroup.linkRemove().linkOff();
        eventsEngine.off(getDocument(), DOT_EVENT_NS);
        this._annotationsGroup.off(DOT_EVENT_NS);
        this._annotations.tooltip && this._annotations.tooltip.dispose()
    },
    extenders: {
        _createHtmlStructure() {
            this._annotationsGroup = this._renderer.g().attr({
                class: `${this._rootClassPrefix}-annotations`
            }).css(this._getAnnotationStyles()).linkOn(this._renderer.root, "annotations").linkAppend();
            eventsEngine.on(getDocument(), POINTER_ACTION, (e => {
                if (this._disposed) {
                    return
                }
                if (!this._annotations.tooltip.isCursorOnTooltip(e.pageX, e.pageY)) {
                    this._annotations.hideTooltip()
                }
            }));
            eventsEngine.on(getDocument(), POINTER_UP_EVENT_NAME, (event => {
                this._annotations._hideToolTipForDrag = false;
                this._annotationsPointerEventHandler(event)
            }));
            this._annotationsGroup.on(POINTER_ACTION, this._annotationsPointerEventHandler.bind(this))
        },
        _renderExtraElements() {
            this._annotationsGroup.clear();
            this._annotations.items.forEach((item => item.draw(this, this._annotationsGroup)))
        },
        _stopCurrentHandling() {
            this._annotations.hideTooltip()
        }
    },
    members: {
        _buildAnnotations() {
            this._annotations.clearItems();
            const items = this._getOption("annotations", true);
            if (!(null !== items && void 0 !== items && items.length)) {
                return
            }
            this._annotations.items = createAnnotations(this, items, this._getOption("commonAnnotationSettings"), this._getOption("customizeAnnotation", true), this._pullOptions)
        },
        _setAnnotationTooltipOptions() {
            const tooltipOptions = extend({}, this._getOption("tooltip"));
            tooltipOptions.contentTemplate = tooltipOptions.customizeTooltip = void 0;
            this._annotations.tooltip.update(tooltipOptions)
        },
        _getAnnotationCoords: () => ({}),
        _pullOptions: () => ({}),
        _getAnnotationStyles: () => ({})
    },
    customize(constructor) {
        constructor.addChange({
            code: "ANNOTATIONITEMS",
            handler() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "annotations"
        });
        constructor.addChange({
            code: "ANNOTATIONSSETTINGS",
            handler() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "commonAnnotationSettings"
        });
        constructor.addChange({
            code: "ANNOTATIONS",
            handler() {
                this._buildAnnotations();
                this._setAnnotationTooltipOptions();
                this._forceAnnotationRender()
            },
            isThemeDependent: true,
            isOptionChange: true
        })
    },
    fontFields: ["commonAnnotationSettings.font"]
};
export const plugins = {
    core: corePlugin,
    chart: chartPlugin,
    polarChart: polarChartPlugin,
    vectorMap: vectorMapPlugin,
    pieChart: pieChartPlugin
};
