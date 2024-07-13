/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.common.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import {
    when,
    Deferred
} from "../../core/utils/deferred";
import {
    extend
} from "../../core/utils/extend";
import {
    noop
} from "../../core/utils/common";
import {
    isFunction,
    isDefined
} from "../../core/utils/type";
export const whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || noop;
    onError = onError || noop;
    if (!Array.isArray(arg)) {
        arg = [arg]
    }
    const deferreds = arg.map(((item, index) => when(item).then((result => {
        isFunction(onSuccess) && onSuccess({
            item: item,
            index: index,
            result: result
        });
        return result
    }), (error => {
        if (!error) {
            error = {}
        }
        error.index = index;
        isFunction(onError) && onError(error);
        return (new Deferred).resolve().promise()
    }))));
    return when.apply(null, deferreds)
};
export const getDisplayFileSize = function(byteSize) {
    const sizesTitles = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;
    let displaySize = byteSize;
    while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
        displaySize /= 1024;
        index++
    }
    displaySize = Math.round(10 * displaySize) / 10;
    return `${displaySize} ${sizesTitles[index]}`
};
export const extendAttributes = function(targetObject, sourceObject, objectKeysArray) {
    objectKeysArray.forEach((objectKey => {
        extend(true, targetObject, isDefined(sourceObject[objectKey]) ? {
            [objectKey]: sourceObject[objectKey]
        } : {})
    }));
    return targetObject
};
export const findItemsByKeys = (itemInfos, keys) => {
    const itemMap = {};
    keys.forEach((key => {
        itemMap[key] = null
    }));
    itemInfos.forEach((itemInfo => {
        const key = itemInfo.fileItem.key;
        if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
            itemMap[key] = itemInfo
        }
    }));
    const result = [];
    keys.forEach((key => {
        const itemInfo = itemMap[key];
        if (itemInfo) {
            result.push(itemInfo)
        }
    }));
    return result
};
export const getMapFromObject = function(object) {
    const keys = Object.keys(object);
    const values = [];
    keys.forEach((key => values.push(object[key])));
    return {
        keys: keys,
        values: values
    }
};
