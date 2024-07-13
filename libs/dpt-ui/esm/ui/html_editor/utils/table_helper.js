/**
 * DevExtreme (esm/ui/html_editor/utils/table_helper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import {
    each
} from "../../../core/utils/iterator";
import {
    camelize
} from "../../../core/utils/inflector";
const TABLE_FORMATS = ["table", "tableHeaderCell"];
const TABLE_OPERATIONS = ["insertTable", "insertHeaderRow", "insertRowAbove", "insertRowBelow", "insertColumnLeft", "insertColumnRight", "deleteColumn", "deleteRow", "deleteTable", "cellProperties", "tableProperties"];

function getTableFormats(quill) {
    const tableModule = quill.getModule("table");
    return null !== tableModule && void 0 !== tableModule && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS
}

function hasEmbedContent(module, selection) {
    return !!selection && module.quill.getText(selection).length < selection.length
}

function unfixTableWidth($table, _ref) {
    let {
        tableBlot: tableBlot,
        quill: quill
    } = _ref;
    const formatBlot = tableBlot ?? quill.scroll.find($table.get(0));
    formatBlot.format("tableWidth", "initial")
}

function getColumnElements($table) {
    let index = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    return $table.find("tr").eq(index).find("th, td")
}

function getAutoSizedElements($table) {
    let direction = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "horizontal";
    const result = [];
    const isHorizontal = "horizontal" === direction;
    const $lineElements = isHorizontal ? getColumnElements($table) : getRowElements($table);
    $lineElements.each(((index, element) => {
        const $element = $(element);
        if ("" === $element.get(0).style[isHorizontal ? "width" : "height"]) {
            result.push($element)
        }
    }));
    return result
}

function setLineElementsFormat(module, _ref2) {
    let {
        elements: elements,
        property: property,
        value: value
    } = _ref2;
    const tableBlotNames = module.quill.getModule("table").tableBlots;
    const fullPropertyName = `cell${camelize(property,true)}`;
    each(elements, ((i, element) => {
        var _formatBlot;
        let formatBlot = module.quill.scroll.find(element);
        if (!tableBlotNames.includes(formatBlot.statics.blotName)) {
            const descendBlot = formatBlot.descendant((blot => tableBlotNames.includes(blot.statics.blotName)));
            formatBlot = descendBlot ? descendBlot[0] : null
        }
        null === (_formatBlot = formatBlot) || void 0 === _formatBlot || _formatBlot.format(fullPropertyName, value + "px")
    }))
}

function getLineElements($table, index) {
    let direction = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "horizontal";
    return "horizontal" === direction ? getRowElements($table, index) : getColumnElements($table, index)
}

function getRowElements($table) {
    let index = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    return $table.find(`th:nth-child(${1+index}), td:nth-child(${1+index})`)
}

function getTableOperationHandler(quill, operationName) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key]
    }
    return () => {
        const table = quill.getModule("table");
        if (!table) {
            return
        }
        quill.focus();
        return table[operationName](...rest)
    }
}
export {
    TABLE_OPERATIONS,
    getTableFormats,
    getTableOperationHandler,
    unfixTableWidth,
    getColumnElements,
    getAutoSizedElements,
    setLineElementsFormat,
    getLineElements,
    getRowElements,
    hasEmbedContent
};
