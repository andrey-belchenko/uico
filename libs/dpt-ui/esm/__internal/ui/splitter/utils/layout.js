/**
 * DevExtreme (esm/__internal/ui/splitter/utils/layout.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getHeight,
    getWidth
} from "../../../../core/utils/size";
import {
    normalizeStyleProp,
    styleProp
} from "../../../../core/utils/style";
import {
    isDefined,
    isNumeric,
    isString
} from "../../../../core/utils/type";
import {
    toFixed
} from "../../../../localization/utils";
import {
    compareNumbersWithPrecision,
    PRECISION
} from "./number_comparison";
const ORIENTATION = {
    horizontal: "horizontal",
    vertical: "vertical"
};
const PERCENT_UNIT = "%";
const PIXEL_UNIT = "px";
export function findLastIndexOfVisibleItem(items) {
    for (let i = items.length - 1; i >= 0; i -= 1) {
        if (false !== items[i].visible) {
            return i
        }
    }
    return -1
}
export function findLastIndexOfNonCollapsedItem(items) {
    for (let i = items.length - 1; i >= 0; i -= 1) {
        if (true !== items[i].collapsed) {
            return i
        }
    }
    return -1
}
export function findIndexOfNextVisibleItem(items, index) {
    for (let i = index + 1; i < items.length; i += 1) {
        if (false !== items[i].visible) {
            return i
        }
    }
    return -1
}
export function normalizePanelSize(paneRestrictions, size) {
    const {
        minSize: minSize = 0,
        maxSize: maxSize = 100,
        resizable: resizable,
        visible: visible,
        collapsed: collapsed,
        collapsedSize: collapsedSize = 0
    } = paneRestrictions;
    if (false === visible) {
        return 0
    }
    if (true === collapsed) {
        return collapsedSize ?? 0
    }
    if (false === resizable && isDefined(paneRestrictions.size)) {
        return paneRestrictions.size
    }
    let adjustedSize = compareNumbersWithPrecision(size, minSize) < 0 ? minSize : size;
    adjustedSize = Math.min(maxSize, adjustedSize);
    adjustedSize = parseFloat(toFixed(adjustedSize, PRECISION));
    return adjustedSize
}

function findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex) {
    let maxDelta = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
    if (paneIndex < 0 || paneIndex >= paneRestrictions.length) {
        return maxDelta
    }
    const prevSize = currentLayout[paneIndex];
    const maxPaneSize = normalizePanelSize(paneRestrictions[paneIndex], 100);
    const delta = maxPaneSize - prevSize;
    const nextMaxDelta = maxDelta + delta;
    return findMaxAvailableDelta(increment, currentLayout, paneRestrictions, paneIndex + increment, nextMaxDelta)
}
export function getNextLayout(currentLayout, delta, prevPaneIndex, paneRestrictions) {
    if (!isDefined(prevPaneIndex)) {
        return currentLayout
    }
    const nextLayout = [...currentLayout];
    const nextPaneIndex = prevPaneIndex + 1;
    let currentDelta = delta;
    const increment = currentDelta < 0 ? 1 : -1;
    let currentItemIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
    const maxDelta = findMaxAvailableDelta(increment, currentLayout, paneRestrictions, currentItemIndex, 0);
    const minAbsDelta = Math.min(Math.abs(currentDelta), Math.abs(maxDelta));
    let deltaApplied = 0;
    currentDelta = currentDelta < 0 ? -minAbsDelta : minAbsDelta;
    currentItemIndex = currentDelta < 0 ? prevPaneIndex : nextPaneIndex;
    while (currentItemIndex >= 0 && currentItemIndex < paneRestrictions.length) {
        const deltaRemaining = Math.abs(currentDelta) - Math.abs(deltaApplied);
        const prevSize = currentLayout[currentItemIndex];
        const unsafeSize = prevSize - deltaRemaining;
        const safeSize = normalizePanelSize(paneRestrictions[currentItemIndex], unsafeSize);
        if (!(0 === compareNumbersWithPrecision(prevSize, safeSize))) {
            deltaApplied += prevSize - safeSize;
            nextLayout[currentItemIndex] = safeSize;
            if (parseFloat(toFixed(deltaApplied, PRECISION)) >= parseFloat(toFixed(Math.abs(currentDelta), PRECISION))) {
                break
            }
        }
        if (currentDelta < 0) {
            currentItemIndex -= 1
        } else {
            currentItemIndex += 1
        }
    }
    if (0 === compareNumbersWithPrecision(deltaApplied, 0)) {
        return currentLayout
    }
    let pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
    let prevSize = currentLayout[pivotIndex];
    let unsafeSize = prevSize + deltaApplied;
    let safeSize = normalizePanelSize(paneRestrictions[pivotIndex], unsafeSize);
    nextLayout[pivotIndex] = safeSize;
    if (!(0 === compareNumbersWithPrecision(safeSize, unsafeSize))) {
        let deltaRemaining = unsafeSize - safeSize;
        pivotIndex = currentDelta < 0 ? nextPaneIndex : prevPaneIndex;
        let index = pivotIndex;
        while (index >= 0 && index < paneRestrictions.length) {
            prevSize = nextLayout[index];
            unsafeSize = prevSize + deltaRemaining;
            safeSize = normalizePanelSize(paneRestrictions[index], unsafeSize);
            if (!(0 === compareNumbersWithPrecision(prevSize, safeSize))) {
                deltaRemaining -= safeSize - prevSize;
                nextLayout[index] = safeSize
            }
            if (0 === compareNumbersWithPrecision(deltaRemaining, 0)) {
                break
            }
            if (currentDelta > 0) {
                index -= 1
            } else {
                index += 1
            }
        }
    }
    const totalSize = nextLayout.reduce(((total, size) => size + total), 0);
    if (!(0 === compareNumbersWithPrecision(totalSize, 100, 3))) {
        return currentLayout
    }
    return nextLayout
}

function normalizeOffset(offset, orientation, rtlEnabled) {
    if (orientation === ORIENTATION.vertical) {
        return offset.y ?? 0
    }
    return (rtlEnabled ? -1 : 1) * (offset.x ?? 0)
}
export function calculateDelta(offset, orientation, rtlEnabled) {
    let ratio = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    const delta = normalizeOffset(offset, orientation, rtlEnabled) * ratio;
    return delta
}
export function setFlexProp(element, prop, value) {
    const normalizedProp = normalizeStyleProp(prop, value);
    element.style[styleProp(prop)] = normalizedProp
}

function isValidFormat(size, unit) {
    if (!isString(size)) {
        return false
    }
    const regex = new RegExp(`^\\d+(\\.\\d+)?${unit}$`);
    return regex.test(size)
}
export function isPercentWidth(size) {
    return isValidFormat(size, PERCENT_UNIT)
}
export function isPixelWidth(size) {
    if ("number" === typeof size) {
        return size >= 0
    }
    return isValidFormat(size, PIXEL_UNIT)
}

function computeRatio(totalSize, size) {
    if (0 === totalSize) {
        return 0
    }
    const percentage = size / totalSize * 100;
    return percentage
}
export function tryConvertToNumber(size, totalPanesSize) {
    if (!isDefined(size)) {
        return
    }
    if (isNumeric(size) && size >= 0) {
        return Number(size)
    }
    if (isString(size)) {
        if (isPercentWidth(size)) {
            return parseFloat(size) / 100 * totalPanesSize
        }
        if (isPixelWidth(size)) {
            return parseFloat(size.slice(0, -2))
        }
    }
    return
}
export function convertSizeToRatio(size, totalPanesSize, handlesSizeSum) {
    const sizeInPx = tryConvertToNumber(size, totalPanesSize);
    if (!isDefined(sizeInPx)) {
        return
    }
    const adjustedSize = totalPanesSize - handlesSizeSum;
    const ratio = computeRatio(adjustedSize, sizeInPx);
    return parseFloat(toFixed(ratio, PRECISION))
}
export function getVisibleItems(items) {
    return items.filter((p => false !== p.visible))
}
export function getVisibleItemsCount(items) {
    return getVisibleItems(items).length
}
export function getElementSize($element, orientation) {
    return orientation === ORIENTATION.horizontal ? getWidth($element) : getHeight($element)
}
export function isElementVisible(element) {
    if (element) {
        var _element$getClientRec;
        return !!(element.offsetWidth || element.offsetHeight || null !== (_element$getClientRec = element.getClientRects) && void 0 !== _element$getClientRec && _element$getClientRec.call(element).length)
    }
    return false
}
