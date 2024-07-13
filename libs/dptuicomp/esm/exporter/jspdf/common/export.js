/**
 * DevExtreme (esm/exporter/jspdf/common/export.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    isDefined
} from "../../../core/utils/type";
import {
    extend
} from "../../../core/utils/extend";
import {
    normalizeRowsInfo,
    normalizeBoundaryValue
} from "./normalizeOptions";
import {
    initializeCellsWidth,
    applyColSpans,
    applyRowSpans,
    applyBordersConfig,
    calculateHeights,
    calculateCoordinates,
    calculateTableSize,
    resizeFirstColumnByIndentLevel
} from "./row_utils";
import {
    updateRowsAndCellsHeights
} from "./height_updater";
import {
    generateRowsInfo,
    getBaseTableStyle
} from "./rows_generator";
import {
    splitByPages
} from "./rows_splitting";
import {
    drawCellsContent,
    drawCellsLines,
    drawGridLines,
    getDocumentStyles,
    setDocumentStyles,
    addNewPage
} from "./draw_utils";
import {
    applyRtl,
    applyWordWrap,
    toPdfUnit
} from "./pdf_utils";
import messageLocalization from "../../../localization/message";
import {
    ExportLoadPanel
} from "../../common/export_load_panel";
import {
    hasWindow
} from "../../../core/utils/window";

function _getFullOptions(options) {
    const {
        jsPDFDocument: jsPDFDocument
    } = options;
    const fullOptions = extend({}, options);
    if (!isDefined(fullOptions.topLeft)) {
        fullOptions.topLeft = {
            x: 0,
            y: 0
        }
    }
    if (!isDefined(fullOptions.indent)) {
        fullOptions.indent = 0
    }
    if (!isDefined(fullOptions.repeatHeaders)) {
        fullOptions.repeatHeaders = true
    }
    if (!isDefined(fullOptions.margin)) {
        fullOptions.margin = toPdfUnit(jsPDFDocument, 40)
    }
    fullOptions.margin = normalizeBoundaryValue(fullOptions.margin);
    if (!Array.isArray(fullOptions.columnWidths)) {
        fullOptions.columnWidths = []
    }
    if (!isDefined(fullOptions.loadPanel)) {
        fullOptions.loadPanel = {}
    }
    if (!isDefined(fullOptions.loadPanel.enabled)) {
        fullOptions.loadPanel.enabled = true
    }
    if (!isDefined(fullOptions.loadPanel.text)) {
        fullOptions.loadPanel.text = messageLocalization.format("dxDataGrid-exporting")
    }
    return fullOptions
}

function exportDataGrid(options) {
    var _component$_getIntern;
    const {
        jsPDFDocument: jsPDFDocument,
        component: component,
        selectedRowsOnly: selectedRowsOnly,
        loadPanel: loadPanel
    } = options;
    const internalComponent = (null === (_component$_getIntern = component._getInternalInstance) || void 0 === _component$_getIntern ? void 0 : _component$_getIntern.call(component)) || component;
    const initialLoadPanelEnabledOption = internalComponent.option("loadPanel") && internalComponent.option("loadPanel").enabled;
    if (initialLoadPanelEnabledOption) {
        component.option("loadPanel.enabled", false)
    }
    let exportLoadPanel;
    if (loadPanel.enabled && hasWindow()) {
        const rowsView = component.getView("rowsView");
        exportLoadPanel = new ExportLoadPanel(component, rowsView.element(), rowsView.element().parent(), loadPanel);
        exportLoadPanel.show()
    }
    const dataProvider = component.getDataProvider(selectedRowsOnly);
    return new Promise((resolve => {
        dataProvider.ready().done((() => {
            var _options$rowOptions;
            const rowsInfo = generateRowsInfo(jsPDFDocument, dataProvider, component, null === (_options$rowOptions = options.rowOptions) || void 0 === _options$rowOptions || null === (_options$rowOptions = _options$rowOptions.headerStyles) || void 0 === _options$rowOptions ? void 0 : _options$rowOptions.backgroundColor);
            if (options.customizeCell) {
                rowsInfo.forEach((rowInfo => rowInfo.cells.forEach((cellInfo => options.customizeCell(cellInfo)))))
            }
            normalizeRowsInfo(rowsInfo);
            initializeCellsWidth(jsPDFDocument, dataProvider, rowsInfo, options);
            resizeFirstColumnByIndentLevel(rowsInfo, options);
            applyColSpans(rowsInfo);
            calculateHeights(jsPDFDocument, rowsInfo, options);
            applyRowSpans(rowsInfo);
            updateRowsAndCellsHeights(jsPDFDocument, rowsInfo);
            calculateCoordinates(jsPDFDocument, rowsInfo, options);
            applyBordersConfig(rowsInfo);
            applyWordWrap(jsPDFDocument, rowsInfo);
            const docStyles = getDocumentStyles(jsPDFDocument);
            const rtlEnabled = !!component.option("rtlEnabled");
            const rectsByPages = splitByPages(jsPDFDocument, rowsInfo, options, (_ref => {
                var _sourceRect$sourceCel;
                let {
                    sourceRect: sourceRect,
                    leftRect: leftRect,
                    rightRect: rightRect
                } = _ref;
                let leftRectTextOptions = {};
                let rightRectTextOptions = {};
                const isTextNotEmpty = (null === (_sourceRect$sourceCel = sourceRect.sourceCellInfo.text) || void 0 === _sourceRect$sourceCel ? void 0 : _sourceRect$sourceCel.length) > 0;
                if (isTextNotEmpty) {
                    if (rtlEnabled) {
                        const isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
                        const isTextRightAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || "right" === sourceRect.sourceCellInfo.horizontalAlign;
                        if (isTextWidthGreaterThanRect || !isTextRightAlignment) {
                            var _sourceRect$sourceCel2, _sourceRect$sourceCel3, _sourceRect$sourceCel4;
                            let rightRectTextOffset;
                            let leftRectTextOffset;
                            if ("right" === (null === (_sourceRect$sourceCel2 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel2 ? void 0 : _sourceRect$sourceCel2.horizontalAlign)) {
                                rightRectTextOffset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                                leftRectTextOffset = rightRectTextOffset + leftRect.w
                            } else if ("center" === (null === (_sourceRect$sourceCel3 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel3 ? void 0 : _sourceRect$sourceCel3.horizontalAlign)) {
                                leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w) + sourceRect.sourceCellInfo._rect.w / 2 - leftRect.w / 2;
                                rightRectTextOffset = leftRectTextOffset - rightRect.w
                            } else if ("left" === (null === (_sourceRect$sourceCel4 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel4 ? void 0 : _sourceRect$sourceCel4.horizontalAlign)) {
                                leftRectTextOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w);
                                rightRectTextOffset = leftRectTextOffset - rightRect.w
                            }
                            leftRectTextOptions = Object.assign({}, {
                                _textLeftOffset: rightRectTextOffset
                            });
                            rightRectTextOptions = Object.assign({}, {
                                _textLeftOffset: leftRectTextOffset
                            })
                        } else {
                            rightRectTextOptions = Object.assign({}, {
                                text: ""
                            })
                        }
                    } else {
                        const isTextWidthGreaterThanRect = jsPDFDocument.getTextWidth(sourceRect.sourceCellInfo.text) > leftRect.w;
                        const isTextLeftAlignment = !isDefined(sourceRect.sourceCellInfo.horizontalAlign) || "left" === sourceRect.sourceCellInfo.horizontalAlign;
                        if (isTextWidthGreaterThanRect || !isTextLeftAlignment) {
                            var _sourceRect$sourceCel5, _sourceRect$sourceCel6, _sourceRect$sourceCel7;
                            let leftTextLeftOffset;
                            let rightTextLeftOffset;
                            if ("left" === (null === (_sourceRect$sourceCel5 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel5 ? void 0 : _sourceRect$sourceCel5.horizontalAlign)) {
                                leftTextLeftOffset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                                rightTextLeftOffset = leftTextLeftOffset - leftRect.w
                            } else if ("center" === (null === (_sourceRect$sourceCel6 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel6 ? void 0 : _sourceRect$sourceCel6.horizontalAlign)) {
                                const offset = sourceRect.sourceCellInfo._textLeftOffset ?? 0;
                                leftTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (leftRect.x + leftRect.w / 2);
                                rightTextLeftOffset = offset + (sourceRect.x + sourceRect.w / 2) - (rightRect.x + rightRect.w / 2)
                            } else if ("right" === (null === (_sourceRect$sourceCel7 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel7 ? void 0 : _sourceRect$sourceCel7.horizontalAlign)) {
                                leftTextLeftOffset = sourceRect.x + sourceRect.w - (leftRect.x + leftRect.w);
                                rightTextLeftOffset = sourceRect.x + sourceRect.w - (rightRect.x + rightRect.w)
                            }
                            leftRectTextOptions = Object.assign({}, {
                                _textLeftOffset: leftTextLeftOffset
                            });
                            rightRectTextOptions = Object.assign({}, {
                                _textLeftOffset: rightTextLeftOffset
                            })
                        } else {
                            rightRectTextOptions = Object.assign({}, {
                                text: ""
                            })
                        }
                    }
                }
                leftRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
                    debugSourceCellInfo: sourceRect.sourceCellInfo
                }, leftRectTextOptions);
                rightRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
                    debugSourceCellInfo: sourceRect.sourceCellInfo
                }, rightRectTextOptions)
            }), (_ref2 => {
                var _sourceRect$sourceCel8;
                let {
                    sourceRect: sourceRect,
                    topRect: topRect,
                    bottomRect: bottomRect
                } = _ref2;
                let topRectTextOptions = {};
                let bottomRectTextOptions = {};
                const isTextNotEmpty = (null === (_sourceRect$sourceCel8 = sourceRect.sourceCellInfo.text) || void 0 === _sourceRect$sourceCel8 ? void 0 : _sourceRect$sourceCel8.length) > 0;
                if (isTextNotEmpty) {
                    var _sourceRect$sourceCel9;
                    const isTextHeightGreaterThanRect = jsPDFDocument.getTextDimensions(sourceRect.sourceCellInfo.text).h > topRect.h;
                    const isTextTopAlignment = "top" === (null === (_sourceRect$sourceCel9 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel9 ? void 0 : _sourceRect$sourceCel9.verticalAlign);
                    if (isTextHeightGreaterThanRect || !isTextTopAlignment) {
                        var _sourceRect$sourceCel10, _sourceRect$sourceCel11, _sourceRect$sourceCel12;
                        let topTextTopOffset;
                        let bottomTextTopOffset;
                        if ("top" === (null === (_sourceRect$sourceCel10 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel10 ? void 0 : _sourceRect$sourceCel10.verticalAlign)) {
                            topTextTopOffset = sourceRect.sourceCellInfo._textTopOffset ?? 0;
                            bottomTextTopOffset = topTextTopOffset - topRect.h
                        } else if ("middle" === (null === (_sourceRect$sourceCel11 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel11 ? void 0 : _sourceRect$sourceCel11.verticalAlign)) {
                            const offset = sourceRect.sourceCellInfo._textTopOffset ?? 0;
                            topTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (topRect.y + topRect.h / 2);
                            bottomTextTopOffset = offset + (sourceRect.y + sourceRect.h / 2) - (bottomRect.y + bottomRect.h / 2)
                        } else if ("bottom" === (null === (_sourceRect$sourceCel12 = sourceRect.sourceCellInfo) || void 0 === _sourceRect$sourceCel12 ? void 0 : _sourceRect$sourceCel12.verticalAlign)) {
                            topTextTopOffset = sourceRect.y + sourceRect.h - (topRect.y + topRect.h);
                            bottomTextTopOffset = sourceRect.y + sourceRect.h - (bottomRect.y + bottomRect.h)
                        }
                        topRectTextOptions = Object.assign({}, {
                            _textTopOffset: topTextTopOffset
                        });
                        bottomRectTextOptions = Object.assign({}, {
                            _textTopOffset: bottomTextTopOffset
                        })
                    } else {
                        bottomRectTextOptions = Object.assign({}, {
                            text: ""
                        })
                    }
                }
                topRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
                    debugSourceCellInfo: sourceRect.sourceCellInfo
                }, topRectTextOptions);
                bottomRect.sourceCellInfo = Object.assign({}, sourceRect.sourceCellInfo, {
                    debugSourceCellInfo: sourceRect.sourceCellInfo
                }, bottomRectTextOptions)
            }));
            if (rtlEnabled) {
                applyRtl(jsPDFDocument, rectsByPages, options)
            }
            rectsByPages.forEach(((pdfCellsInfo, index) => {
                if (index > 0) {
                    addNewPage(jsPDFDocument)
                }
                drawCellsContent(jsPDFDocument, options.customDrawCell, pdfCellsInfo, docStyles);
                drawCellsLines(jsPDFDocument, pdfCellsInfo, docStyles);
                const isEmptyPdfCellsInfoSpecified = isDefined(pdfCellsInfo) && 0 === pdfCellsInfo.length;
                if (isEmptyPdfCellsInfoSpecified) {
                    const tableRect = calculateTableSize(jsPDFDocument, pdfCellsInfo, options);
                    const baseStyle = getBaseTableStyle();
                    drawGridLines(jsPDFDocument, tableRect, baseStyle, docStyles)
                }
            }));
            setDocumentStyles(jsPDFDocument, docStyles);
            resolve()
        })).always((() => {
            if (initialLoadPanelEnabledOption) {
                component.option("loadPanel.enabled", initialLoadPanelEnabledOption)
            }
            if (loadPanel.enabled && hasWindow()) {
                exportLoadPanel.dispose()
            }
        }))
    }))
}
export const Export = {
    getFullOptions: _getFullOptions,
    export: exportDataGrid
};
