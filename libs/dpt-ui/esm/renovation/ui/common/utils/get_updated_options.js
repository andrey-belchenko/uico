/**
 * DevExtreme (esm/renovation/ui/common/utils/get_updated_options.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    isPlainObject,
    type
} from "../../../../core/utils/type";
const defaultNotDeepCopyArrays = ["dataSource", "selectedRowKeys"];
const propsToIgnore = {
    integrationOptions: true
};

function getDiffItem(key, value, previousValue) {
    return {
        path: key,
        value: value,
        previousValue: previousValue
    }
}

function compare(resultPaths, item1, item2, key, fullPropName, notDeepCopyArrays) {
    if (propsToIgnore[key]) {
        return
    }
    const type1 = type(item1);
    const type2 = type(item2);
    if (item1 === item2) {
        return
    }
    if (type1 !== type2) {
        resultPaths.push(getDiffItem(key, item2, item1))
    } else if ("object" === type1) {
        if (!isPlainObject(item2)) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else {
            const diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
            resultPaths.push(...diffPaths.map((item => _extends({}, item, {
                path: `${key}.${item.path}`
            }))))
        }
    } else if ("array" === type1) {
        const notDeepCopy = notDeepCopyArrays.some((prop => fullPropName.includes(prop)));
        if (notDeepCopy && item1 !== item2) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else if (item1.length !== item2.length) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else {
            const diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
            [].push.apply(resultPaths, diffPaths.map((item => _extends({}, item, {
                path: `${key}${item.path}`
            }))))
        }
    } else {
        resultPaths.push(getDiffItem(key, item2, item1))
    }
}
const objectDiffsFiltered = propsEnumerator => (oldProps, props, fullPropName, notDeepCopyArrays) => {
    const resultPaths = [];
    const processItem = !Array.isArray(oldProps) ? propName => {
        compare(resultPaths, oldProps[propName], props[propName], propName, `${fullPropName}.${propName}`, notDeepCopyArrays)
    } : propName => {
        compare(resultPaths, oldProps[propName], props[propName], `[${propName}]`, `${fullPropName}.${propName}`, notDeepCopyArrays)
    };
    propsEnumerator(oldProps).forEach(processItem);
    Object.keys(props).filter((propName => !Object.prototype.hasOwnProperty.call(oldProps, propName) && oldProps[propName] !== props[propName])).forEach((propName => {
        resultPaths.push({
            path: propName,
            value: props[propName],
            previousValue: oldProps[propName]
        })
    }));
    return resultPaths
};
const objectDiffs = objectDiffsFiltered((oldProps => Object.keys(oldProps)));
const reactProps = {
    key: true,
    ref: true,
    children: true,
    style: true
};
const objectDiffsWithoutReactProps = objectDiffsFiltered((prop => Object.keys(prop).filter((p => !reactProps[p]))));
export function getUpdatedOptions(oldProps, props) {
    let notDeepCopyArrays = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : defaultNotDeepCopyArrays;
    return objectDiffsWithoutReactProps(oldProps, props, "", notDeepCopyArrays)
}
