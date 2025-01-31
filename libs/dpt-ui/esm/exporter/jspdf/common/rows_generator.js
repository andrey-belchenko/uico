/**
 * DevExtreme (esm/exporter/jspdf/common/rows_generator.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDate,
    isDefined,
    isNumeric
} from "../../../core/utils/type";
import dateLocalization from "../../../localization/date";
import numberLocalization from "../../../localization/number";
import {
    toPdfUnit
} from "./pdf_utils";
const defaultStyles = {
    base: {
        font: {
            size: 10
        },
        borderWidth: .5,
        borderColor: "#979797"
    },
    header: {
        textColor: "#979797"
    },
    group: {},
    data: {},
    groupFooter: {},
    totalFooter: {}
};

function generateRowsInfo(doc, dataProvider, dataGrid, headerBackgroundColor) {
    const result = [];
    const rowsCount = dataProvider.getRowsCount();
    const wordWrapEnabled = !!dataGrid.option("wordWrapEnabled");
    const rtlEnabled = !!dataGrid.option("rtlEnabled");
    const columns = dataProvider.getColumns();
    const styles = dataProvider.getStyles();
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        const rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
        let indentLevel = "header" !== rowType ? dataProvider.getGroupLevel(rowIndex) : 0;
        const previousRow = result[rowIndex - 1];
        if ("groupFooter" === rowType && "groupFooter" === (null === previousRow || void 0 === previousRow ? void 0 : previousRow.rowType)) {
            indentLevel = previousRow.indentLevel - 1
        }
        result.push({
            rowType: rowType,
            indentLevel: indentLevel,
            cells: generateRowCells({
                doc: doc,
                dataProvider: dataProvider,
                rowIndex: rowIndex,
                wordWrapEnabled: wordWrapEnabled,
                columns: columns,
                styles: styles,
                rowType: rowType,
                backgroundColor: "header" === rowType ? headerBackgroundColor : void 0,
                rtlEnabled: rtlEnabled
            }),
            rowIndex: rowIndex
        })
    }
    return result
}

function generateRowCells(_ref) {
    let {
        doc: doc,
        dataProvider: dataProvider,
        rowIndex: rowIndex,
        wordWrapEnabled: wordWrapEnabled,
        columns: columns,
        styles: styles,
        rowType: rowType,
        backgroundColor: backgroundColor,
        rtlEnabled: rtlEnabled
    } = _ref;
    const result = [];
    for (let cellIndex = 0; cellIndex < columns.length; cellIndex++) {
        const cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
        const cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
        const style = getPdfCellStyle(columns[cellIndex], rowType, cellStyle);
        const defaultAlignment = rtlEnabled ? "right" : "left";
        const paddingValue = toPdfUnit(doc, 5);
        const pdfCell = {
            text: getFormattedValue(cellData.value, cellStyle.format),
            verticalAlign: "middle",
            horizontalAlign: style.alignment ?? defaultAlignment,
            wordWrapEnabled: wordWrapEnabled,
            backgroundColor: backgroundColor,
            padding: {
                top: paddingValue,
                right: paddingValue,
                bottom: paddingValue,
                left: paddingValue
            },
            _rect: {},
            _internalTextOptions: {}
        };
        if (rtlEnabled) {
            pdfCell._internalTextOptions.isInputVisual = false;
            pdfCell._internalTextOptions.isOutputVisual = true;
            pdfCell._internalTextOptions.isInputRtl = true;
            pdfCell._internalTextOptions.isOutputRtl = false
        }
        const cellInfo = {
            gridCell: cellData.cellSourceData,
            pdfCell: Object.assign({}, pdfCell, style)
        };
        if ("header" === rowType) {
            const cellMerging = dataProvider.getCellMerging(rowIndex, cellIndex);
            if (cellMerging && cellMerging.rowspan > 0) {
                cellInfo.rowSpan = cellMerging.rowspan
            }
            if (cellMerging && cellMerging.colspan > 0) {
                cellInfo.colSpan = cellMerging.colspan
            }
        } else if ("group" === rowType) {
            const drawLeftBorderField = rtlEnabled ? "drawRightBorder" : "drawLeftBorder";
            const drawRightBorderField = rtlEnabled ? "drawLeftBorder" : "drawRightBorder";
            cellInfo.pdfCell[drawLeftBorderField] = 0 === cellIndex;
            cellInfo.pdfCell[drawRightBorderField] = cellIndex === columns.length - 1;
            if (cellIndex > 0) {
                const isEmptyCellsExceptFirst = result.slice(1).reduce(((accumulate, cellInfo) => accumulate && !isDefined(cellInfo.pdfCell.text)), true);
                if (!isDefined(cellInfo.pdfCell.text) && isEmptyCellsExceptFirst) {
                    result[0].pdfCell[drawRightBorderField] = true;
                    for (let i = 0; i < result.length; i++) {
                        result[i].colSpan = result.length
                    }
                    cellInfo.colSpan = result.length
                }
            }
        }
        result.push(cellInfo)
    }
    return result
}

function getBaseTableStyle() {
    return defaultStyles.base
}

function getPdfCellStyle(column, rowType, cellStyle) {
    const styles = Object.assign({}, defaultStyles.base, defaultStyles[rowType]);
    const alignment = "header" === rowType ? column.alignment : cellStyle.alignment;
    if (alignment) {
        styles.alignment = alignment
    }
    if (cellStyle.bold && "header" !== rowType) {
        styles.font = Object.assign({}, styles.font, {
            style: "bold"
        })
    }
    return styles
}

function getFormattedValue(value, format) {
    if (isDefined(format)) {
        if (isDate(value)) {
            return dateLocalization.format(value, format)
        }
        if (isNumeric(value)) {
            return numberLocalization.format(value, format)
        }
    }
    return null === value || void 0 === value ? void 0 : value.toString()
}
export {
    generateRowsInfo,
    getBaseTableStyle
};
