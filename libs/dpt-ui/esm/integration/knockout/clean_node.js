/**
 * DevExtreme (esm/integration/knockout/clean_node.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    afterCleanData,
    strategyChanging,
    cleanData
} from "../../core/element_data";
import ko from "knockout";
import {
    compare as compareVersion
} from "../../core/utils/version";
import {
    getClosestNodeWithKoCreation
} from "./utils";
if (ko) {
    const originalKOCleanExternalData = ko.utils.domNodeDisposal.cleanExternalData;
    const patchCleanData = function() {
        afterCleanData((function(nodes) {
            let i;
            for (i = 0; i < nodes.length; i++) {
                nodes[i].cleanedByJquery = true
            }
            for (i = 0; i < nodes.length; i++) {
                if (!nodes[i].cleanedByKo) {
                    ko.cleanNode(nodes[i])
                }
                delete nodes[i].cleanedByKo
            }
            for (i = 0; i < nodes.length; i++) {
                delete nodes[i].cleanedByJquery
            }
        }));
        ko.utils.domNodeDisposal.cleanExternalData = function(node) {
            node.cleanedByKo = true;
            if (getClosestNodeWithKoCreation(node)) {
                if (!node.cleanedByJquery) {
                    cleanData([node])
                }
            }
        }
    };
    const restoreOriginCleanData = function() {
        afterCleanData((function() {}));
        ko.utils.domNodeDisposal.cleanExternalData = originalKOCleanExternalData
    };
    patchCleanData();
    strategyChanging.add((function(strategy) {
        const isJQuery = !!strategy.fn;
        if (isJQuery && compareVersion(strategy.fn.jquery, [2, 0]) < 0) {
            restoreOriginCleanData()
        }
    }))
}
