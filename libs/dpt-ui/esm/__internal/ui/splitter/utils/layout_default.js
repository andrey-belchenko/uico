/**
 * DevExtreme (esm/__internal/ui/splitter/utils/layout_default.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    isDefined
} from "../../../../core/utils/type";
import {
    toFixed
} from "../../../../localization/utils";
import {
    findLastIndexOfVisibleItem,
    normalizePanelSize
} from "./layout";
import {
    compareNumbersWithPrecision,
    PRECISION
} from "./number_comparison";
export function getDefaultLayout(layoutRestrictions) {
    let layout = new Array(layoutRestrictions.length).fill(null);
    let numPanelsWithDefinedSize = 0;
    let remainingSize = 100;
    layoutRestrictions.forEach(((paneRestrictions, index) => {
        const {
            size: size,
            visible: visible,
            collapsed: collapsed,
            collapsedSize: collapsedSize = 0
        } = paneRestrictions;
        if (false === visible) {
            numPanelsWithDefinedSize += 1;
            layout[index] = 0;
            remainingSize -= 0;
            return
        }
        if (true === collapsed) {
            numPanelsWithDefinedSize += 1;
            layout[index] = collapsedSize;
            remainingSize -= collapsedSize;
            return
        }
        if (isDefined(size)) {
            numPanelsWithDefinedSize += 1;
            if (remainingSize - size < 0) {
                layout[index] = remainingSize;
                remainingSize = 0;
                return
            }
            layout[index] = size;
            remainingSize -= size
        }
    }));
    let panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
    if (0 === panelsToDistribute) {
        layout[findLastIndexOfVisibleItem(layoutRestrictions)] += remainingSize;
        remainingSize = 0
    } else {
        layoutRestrictions.forEach(((paneRestrictions, index) => {
            if (null === layout[index]) {
                if (isDefined(paneRestrictions.maxSize) && 1 === panelsToDistribute) {
                    layout[index] = remainingSize > paneRestrictions.maxSize ? remainingSize : paneRestrictions.maxSize;
                    remainingSize -= layout[index];
                    numPanelsWithDefinedSize += 1
                } else if (isDefined(paneRestrictions.maxSize) && paneRestrictions.maxSize < remainingSize / panelsToDistribute) {
                    layout[index] = paneRestrictions.maxSize;
                    remainingSize -= paneRestrictions.maxSize;
                    numPanelsWithDefinedSize += 1;
                    panelsToDistribute -= 1
                }
            }
        }));
        panelsToDistribute = layoutRestrictions.length - numPanelsWithDefinedSize;
        if (panelsToDistribute > 0) {
            const spacePerPanel = remainingSize / panelsToDistribute;
            layout.forEach(((panelSize, index) => {
                if (null === panelSize) {
                    layout[index] = spacePerPanel
                }
            }))
        }
    }
    layout = layout.map((size => null === size ? 0 : parseFloat(toFixed(size, PRECISION))));
    if (1 === layout.length) {
        return layout
    }
    let nextLayout = [...layout];
    const nextLayoutTotalSize = nextLayout.reduce(((accumulated, current) => accumulated + current), 0);
    if (!(0 === compareNumbersWithPrecision(nextLayoutTotalSize, 100))) {
        for (let index = 0; index < layoutRestrictions.length; index += 1) {
            const unsafeSize = nextLayout[index];
            const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
            nextLayout[index] = safeSize
        }
    }
    remainingSize = 0;
    nextLayout = layout.map(((panelSize, index) => {
        const restriction = layoutRestrictions[index];
        const adjustedSize = normalizePanelSize(restriction, panelSize);
        remainingSize += panelSize - adjustedSize;
        return adjustedSize
    }));
    if (0 !== compareNumbersWithPrecision(remainingSize, 0)) {
        for (let index = 0; index < nextLayout.length && 0 !== compareNumbersWithPrecision(remainingSize, 0); index += 1) {
            const currentSize = nextLayout[index];
            const adjustedSize = normalizePanelSize(layoutRestrictions[index], currentSize + remainingSize);
            remainingSize -= adjustedSize - currentSize;
            nextLayout[index] = adjustedSize
        }
        if (remainingSize > 0) {
            const paneIndex = findLastIndexOfVisibleItem(layoutRestrictions);
            if (false === layoutRestrictions[paneIndex].collapsed) {
                nextLayout[paneIndex] += remainingSize
            }
        }
    }
    return nextLayout
}
