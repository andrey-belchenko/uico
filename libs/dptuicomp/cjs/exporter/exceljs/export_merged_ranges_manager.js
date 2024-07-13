/**
 * DevExtreme (cjs/exporter/exceljs/export_merged_ranges_manager.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
"use strict";
exports.MergedRangesManager = void 0;
class MergedRangesManager {
    constructor(dataProvider, worksheet) {
        this.dataProvider = dataProvider;
        this.worksheet = worksheet;
        this.mergedCells = [];
        this.mergedRanges = []
    }
    updateMergedRanges(excelCell, rowIndex, cellIndex, helpers) {
        if (helpers._isHeaderCell(rowIndex, cellIndex) && !this.isCellInMergedRanges(rowIndex, cellIndex)) {
            const {
                rowspan: rowspan,
                colspan: colspan
            } = this.dataProvider.getCellMerging(rowIndex, cellIndex);
            const isMasterCellOfMergedRange = colspan || rowspan;
            if (isMasterCellOfMergedRange) {
                const allowToMergeRange = helpers._allowToMergeRange(rowIndex, cellIndex, rowspan, colspan);
                this.updateMergedCells(excelCell, rowIndex, cellIndex, rowspan, colspan);
                if (allowToMergeRange) {
                    const shouldReduceInfoRange = helpers._isInfoCell(rowIndex, cellIndex) && helpers._allowExportRowFieldHeaders();
                    this.mergedRanges.push({
                        masterCell: excelCell,
                        rowspan: rowspan - (shouldReduceInfoRange && rowspan > 0),
                        colspan: colspan
                    })
                }
            }
        }
    }
    isCellInMergedRanges(rowIndex, cellIndex) {
        return this.mergedCells[rowIndex] && this.mergedCells[rowIndex][cellIndex]
    }
    findMergedCellInfo(rowIndex, cellIndex, isHeaderCell) {
        if (isHeaderCell && this.isCellInMergedRanges(rowIndex, cellIndex)) {
            return this.mergedCells[rowIndex][cellIndex]
        }
    }
    updateMergedCells(excelCell, rowIndex, cellIndex, rowspan, colspan) {
        for (let i = rowIndex; i <= rowIndex + rowspan; i++) {
            for (let j = cellIndex; j <= cellIndex + colspan; j++) {
                if (!this.mergedCells[i]) {
                    this.mergedCells[i] = []
                }
                this.mergedCells[i][j] = {
                    masterCell: excelCell
                }
            }
        }
    }
    addMergedRange(masterCell, rowspan, colspan) {
        this.mergedRanges.push({
            masterCell: masterCell,
            rowspan: rowspan,
            colspan: colspan
        })
    }
    applyMergedRages() {
        this.mergedRanges.forEach((range => {
            const startRowIndex = range.masterCell.fullAddress.row;
            const startColumnIndex = range.masterCell.fullAddress.col;
            const endRowIndex = startRowIndex + range.rowspan;
            const endColumnIndex = startColumnIndex + range.colspan;
            this.worksheet.mergeCells(startRowIndex, startColumnIndex, endRowIndex, endColumnIndex)
        }))
    }
}
exports.MergedRangesManager = MergedRangesManager;
