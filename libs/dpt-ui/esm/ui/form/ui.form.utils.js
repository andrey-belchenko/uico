/**
 * DevExtreme (esm/ui/form/ui.form.utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
export const createItemPathByIndex = (index, isTabs) => `${isTabs?"tabs":"items"}[${index}]`;
export const concatPaths = (path1, path2) => {
    if (isDefined(path1) && isDefined(path2)) {
        return `${path1}.${path2}`
    }
    return path1 || path2
};
export const getTextWithoutSpaces = text => text ? text.replace(/\s/g, "") : void 0;
export const isEqualToDataFieldOrNameOrTitleOrCaption = (item, fieldName) => {
    if (item) {
        return item.dataField === fieldName || item.name === fieldName || getTextWithoutSpaces(item.title) === fieldName || "group" === item.itemType && getTextWithoutSpaces(item.caption) === fieldName
    }
    return false
};
export const getFullOptionName = (path, optionName) => `${path}.${optionName}`;
export const getOptionNameFromFullName = fullName => {
    const parts = fullName.split(".");
    return parts[parts.length - 1].replace(/\[\d+]/, "")
};
export const tryGetTabPath = fullPath => {
    const pathParts = fullPath.split(".");
    const resultPathParts = [...pathParts];
    for (let i = pathParts.length - 1; i >= 0; i--) {
        if (isFullPathContainsTabs(pathParts[i])) {
            return resultPathParts.join(".")
        }
        resultPathParts.splice(i, 1)
    }
    return ""
};
export const isFullPathContainsTabs = fullPath => fullPath.indexOf("tabs") > -1;
export const getItemPath = (items, item, isTabs) => {
    const index = items.indexOf(item);
    if (index > -1) {
        return createItemPathByIndex(index, isTabs)
    }
    for (let i = 0; i < items.length; i++) {
        const targetItem = items[i];
        const tabOrGroupItems = targetItem.tabs || targetItem.items;
        if (tabOrGroupItems) {
            const itemPath = getItemPath(tabOrGroupItems, item, targetItem.tabs);
            if (itemPath) {
                return concatPaths(createItemPathByIndex(i, isTabs), itemPath)
            }
        }
    }
};
export function convertToLayoutManagerOptions(_ref) {
    let {
        form: form,
        $formElement: $formElement,
        formOptions: formOptions,
        items: items,
        validationGroup: validationGroup,
        extendedLayoutManagerOptions: extendedLayoutManagerOptions,
        onFieldDataChanged: onFieldDataChanged,
        onContentReady: onContentReady,
        onDisposing: onDisposing,
        onFieldItemRendered: onFieldItemRendered
    } = _ref;
    const baseOptions = {
        form: form,
        items: items,
        $formElement: $formElement,
        validationGroup: validationGroup,
        onFieldDataChanged: onFieldDataChanged,
        onContentReady: onContentReady,
        onDisposing: onDisposing,
        onFieldItemRendered: onFieldItemRendered,
        validationBoundary: formOptions.scrollingEnabled ? $formElement : void 0,
        scrollingEnabled: formOptions.scrollingEnabled,
        showRequiredMark: formOptions.showRequiredMark,
        showOptionalMark: formOptions.showOptionalMark,
        requiredMark: formOptions.requiredMark,
        optionalMark: formOptions.optionalMark,
        requiredMessage: formOptions.requiredMessage,
        screenByWidth: formOptions.screenByWidth,
        layoutData: formOptions.formData,
        labelLocation: formOptions.labelLocation,
        customizeItem: formOptions.customizeItem,
        minColWidth: formOptions.minColWidth,
        showColonAfterLabel: formOptions.showColonAfterLabel,
        onEditorEnterKey: formOptions.onEditorEnterKey,
        labelMode: formOptions.labelMode
    };
    const result = extend(baseOptions, {
        isRoot: extendedLayoutManagerOptions.isRoot,
        colCount: extendedLayoutManagerOptions.colCount,
        alignItemLabels: extendedLayoutManagerOptions.alignItemLabels,
        cssItemClass: extendedLayoutManagerOptions.cssItemClass,
        colCountByScreen: extendedLayoutManagerOptions.colCountByScreen,
        onLayoutChanged: extendedLayoutManagerOptions.onLayoutChanged,
        width: extendedLayoutManagerOptions.width
    });
    return result
}
