/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

import { Template as TemplateComponent } from '../../template';
var ElementType;
(function (ElementType) {
    ElementType[ElementType["Option"] = 0] = "Option";
    ElementType[ElementType["Template"] = 1] = "Template";
    ElementType[ElementType["Unknown"] = 2] = "Unknown";
})(ElementType || (ElementType = {}));
function getElementInfo(element, parentExpectedChildren) {
    const reactElement = element;
    if (!reactElement || !reactElement.type) {
        return {
            type: ElementType.Unknown,
        };
    }
    if (reactElement.type === TemplateComponent) {
        return {
            type: ElementType.Template,
            props: reactElement.props,
        };
    }
    const elementDescriptor = reactElement.type;
    if (elementDescriptor.OptionName) {
        let name = elementDescriptor.OptionName;
        let isCollectionItem = elementDescriptor.IsCollectionItem;
        const expectation = parentExpectedChildren && parentExpectedChildren[name];
        if (expectation) {
            isCollectionItem = expectation.isCollectionItem;
            if (expectation.optionName) {
                name = expectation.optionName;
            }
        }
        return {
            type: ElementType.Option,
            descriptor: {
                name,
                isCollection: !!isCollectionItem,
                templates: elementDescriptor.TemplateProps || [],
                initialValuesProps: elementDescriptor.DefaultsProps || {},
                predefinedValuesProps: elementDescriptor.PredefinedProps || {},
                expectedChildren: elementDescriptor.ExpectedChildren || {},
            },
            props: reactElement.props,
        };
    }
    return {
        type: ElementType.Unknown,
    };
}
export { getElementInfo, ElementType, };
