/**
 * DevExtreme (esm/renovation/utils/diagnostic.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getWindow
} from "../../core/utils/window";
export const DiagnosticUtils = {
    resolveMap: () => {
        const diagnosticWindow = getWindow();
        if (!diagnosticWindow.dxDiagnostic) {
            diagnosticWindow.dxDiagnostic = {}
        }
        return diagnosticWindow.dxDiagnostic
    },
    getDiagnostic: key => {
        const diagnosticMap = DiagnosticUtils.resolveMap();
        if (!diagnosticMap[key]) {
            diagnosticMap[key] = {
                renderCount: 0
            }
        }
        return diagnosticMap[key]
    },
    incrementRenderCount: key => {
        const diagnostic = DiagnosticUtils.getDiagnostic(key);
        diagnostic.renderCount += 1
    }
};
