/**
 * DevExtreme (esm/ui/html_editor/matchers/wordLists.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
function getListType(matches) {
    const prefix = matches[1];
    return prefix.match(/\S+\./) ? "ordered" : "bullet"
}

function getIndent(node, msStyleAttributeName) {
    const style = node.getAttribute(msStyleAttributeName);
    if (style) {
        const level = style.replace(/\n+/g, "").match(/level(\d+)/);
        return level ? level[1] - 1 : 0
    } else {
        return false
    }
}

function removeNewLineChar(operations) {
    const newLineOperation = operations[operations.length - 1];
    newLineOperation.insert = newLineOperation.insert.trim()
}
const getMatcher = quill => {
    const Delta = quill.import("delta");
    const msStyleAttributeName = quill.MS_LIST_DATA_KEY;
    return (node, delta) => {
        const ops = delta.ops.slice();
        const insertOperation = ops[0];
        insertOperation.insert = insertOperation.insert.replace(/^\s+/, "");
        const listDecoratorMatches = insertOperation.insert.match(/^(\S+)\s+/);
        const indent = listDecoratorMatches && getIndent(node, msStyleAttributeName);
        if (!listDecoratorMatches || false === indent) {
            return delta
        }
        insertOperation.insert = insertOperation.insert.substring(listDecoratorMatches[0].length, insertOperation.insert.length);
        removeNewLineChar(ops);
        ops.push({
            insert: "\n",
            attributes: {
                list: getListType(listDecoratorMatches),
                indent: indent
            }
        });
        return new Delta(ops)
    }
};
export default getMatcher;
