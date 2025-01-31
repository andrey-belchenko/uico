/**
 * DevExtreme (esm/exporter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    fileSaver
} from "./exporter/file_saver";
import {
    imageCreator,
    testFormats,
    getData as getImageData
} from "./exporter/image_creator";
import {
    svgCreator,
    getData as getSvgData
} from "./exporter/svg_creator";
import {
    isFunction as _isFunction,
    isBoolean
} from "./core/utils/type";
import {
    Deferred
} from "./core/utils/deferred";
import {
    getData
} from "./exporter/pdf_creator";

function _export(data, options, getData) {
    if (!data) {
        return (new Deferred).resolve()
    }
    const exportingAction = options.exportingAction;
    const exportedAction = options.exportedAction;
    const fileSavingAction = options.fileSavingAction;
    const eventArgs = {
        fileName: options.fileName,
        format: options.format,
        cancel: false
    };
    if (isBoolean(options.selectedRowsOnly)) {
        eventArgs.selectedRowsOnly = options.selectedRowsOnly
    }
    _isFunction(exportingAction) && exportingAction(eventArgs);
    if (!eventArgs.cancel) {
        return getData(data, options).then((blob => {
            _isFunction(exportedAction) && exportedAction();
            if (_isFunction(fileSavingAction)) {
                eventArgs.data = blob;
                fileSavingAction(eventArgs)
            }
            if (!eventArgs.cancel) {
                const format = "xlsx" === options.format ? "EXCEL" : options.format;
                fileSaver.saveAs(eventArgs.fileName, format, blob)
            }
        }))
    }
    return (new Deferred).resolve()
}
export {
    _export as
    export, fileSaver
};
export const image = {
    creator: imageCreator,
    getData: getImageData,
    testFormats: testFormats
};
export const pdf = {
    getData: getData
};
export const svg = {
    creator: svgCreator,
    getData: getSvgData
};
