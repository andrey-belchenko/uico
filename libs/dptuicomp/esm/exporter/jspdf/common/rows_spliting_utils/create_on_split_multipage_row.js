/**
 * DevExtreme (esm/exporter/jspdf/common/rows_spliting_utils/create_on_split_multipage_row.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getTextLines,
    getTextDimensions,
    calculateTextHeight
} from "../pdf_utils";

function createMultiCellRect(rect, text, marginTop) {
    return _extends({}, rect, {
        sourceCellInfo: _extends({}, rect.sourceCellInfo, {
            text: text
        }),
        y: marginTop
    })
}
export const createOnSplitMultiPageRow = (doc, options, headerHeight, maxBottomRight) => (isFirstPage, pageRects) => {
    const currentPageRects = [];
    const nextPageRects = [];
    let maxCurrentPageHeight = 0;
    let maxNextPageHeight = 0;
    pageRects.forEach((rect => {
        const {
            w: w,
            sourceCellInfo: sourceCellInfo
        } = rect;
        const additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : headerHeight + options.topLeft.y;
        const heightOfOneLine = getTextDimensions(doc, sourceCellInfo.text, sourceCellInfo.font).h;
        const paddingHeight = sourceCellInfo.padding.top + sourceCellInfo.padding.bottom;
        const fullPageHeight = maxBottomRight.y - additionalHeight - paddingHeight - options.margin.top;
        const possibleLinesCount = Math.floor(fullPageHeight / (heightOfOneLine * doc.getLineHeightFactor()));
        const allLines = getTextLines(doc, sourceCellInfo.text, sourceCellInfo.font, {
            wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
            targetRectWidth: w
        });
        if (possibleLinesCount < allLines.length) {
            const currentPageText = allLines.slice(0, possibleLinesCount).join("\n");
            const currentPageHeight = calculateTextHeight(doc, currentPageText, sourceCellInfo.font, {
                wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
                targetRectWidth: w
            });
            maxCurrentPageHeight = Math.max(maxCurrentPageHeight, currentPageHeight + paddingHeight);
            maxNextPageHeight = rect.h - currentPageHeight;
            currentPageRects.push(createMultiCellRect(rect, currentPageText, options.margin.top));
            nextPageRects.push(createMultiCellRect(rect, allLines.slice(possibleLinesCount).join("\n"), options.margin.top))
        } else {
            const currentPageHeight = calculateTextHeight(doc, sourceCellInfo.text, sourceCellInfo.font, {
                wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
                targetRectWidth: w
            });
            maxCurrentPageHeight = Math.max(maxCurrentPageHeight, currentPageHeight + paddingHeight);
            maxNextPageHeight = Math.max(maxNextPageHeight, currentPageHeight + paddingHeight);
            currentPageRects.push(createMultiCellRect(rect, sourceCellInfo.text, options.margin.top));
            nextPageRects.push(createMultiCellRect(rect, "", options.margin.top))
        }
    }));
    currentPageRects.forEach((rect => rect.h = maxCurrentPageHeight));
    nextPageRects.forEach((rect => rect.h = maxNextPageHeight));
    return [currentPageRects, nextPageRects]
};
