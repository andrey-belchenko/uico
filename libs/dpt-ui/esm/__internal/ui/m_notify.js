/**
 * DevExtreme (esm/__internal/ui/m_notify.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    extend
} from "../../core/utils/extend";
import {
    isPlainObject,
    isString
} from "../../core/utils/type";
import {
    value as viewPort
} from "../../core/utils/view_port";
import {
    getWindow
} from "../../core/utils/window";
import Toast from "../../ui/toast";
const window = getWindow();
let $notify = null;
const $containers = {};

function notify(message, typeOrStack, displayTime) {
    const options = isPlainObject(message) ? message : {
        message: message
    };
    const stack = isPlainObject(typeOrStack) ? typeOrStack : void 0;
    const type = isPlainObject(typeOrStack) ? void 0 : typeOrStack;
    const {
        onHidden: userOnHidden
    } = options;
    if (null !== stack && void 0 !== stack && stack.position) {
        const {
            position: position
        } = stack;
        const direction = stack.direction || getDefaultDirection(position);
        const containerKey = isString(position) ? position : `${position.top}-${position.left}-${position.bottom}-${position.right}`;
        const {
            onShowing: userOnShowing
        } = options;
        const $container = getStackContainer(containerKey);
        setContainerClasses($container, direction);
        extend(options, {
            container: $container,
            _skipContentPositioning: true,
            onShowing(args) {
                setContainerStyles($container, direction, position);
                null === userOnShowing || void 0 === userOnShowing || userOnShowing(args)
            }
        })
    }
    extend(options, {
        type: type,
        displayTime: displayTime,
        onHidden(args) {
            $(args.element).remove();
            null === userOnHidden || void 0 === userOnHidden || userOnHidden(args)
        }
    });
    $notify = $("<div>").appendTo(viewPort());
    new Toast($notify, options).show()
}
const getDefaultDirection = position => isString(position) && position.includes("top") ? "down-push" : "up-push";
const createStackContainer = key => {
    const $container = $("<div>").appendTo(viewPort());
    $containers[key] = $container;
    return $container
};
const getStackContainer = key => {
    const $container = $containers[key];
    return $container || createStackContainer(key)
};
const setContainerClasses = (container, direction) => {
    const containerClasses = `dx-toast-stack dx-toast-stack-${direction}-direction`;
    container.removeAttr("class").addClass(containerClasses)
};
const setContainerStyles = (container, direction, position) => {
    const {
        offsetWidth: toastWidth,
        offsetHeight: toastHeight
    } = container.children().first().get(0);
    const dimensions = {
        toastWidth: toastWidth,
        toastHeight: toastHeight,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    };
    const coordinates = isString(position) ? getCoordinatesByAlias(position, dimensions) : position;
    const styles = getPositionStylesByCoordinates(direction, coordinates, dimensions);
    container.css(styles)
};
const getCoordinatesByAlias = (alias, _ref) => {
    let {
        toastWidth: toastWidth,
        toastHeight: toastHeight,
        windowHeight: windowHeight,
        windowWidth: windowWidth
    } = _ref;
    switch (alias) {
        case "top left":
            return {
                top: 10, left: 10
            };
        case "top right":
            return {
                top: 10, right: 10
            };
        case "bottom left":
            return {
                bottom: 10, left: 10
            };
        case "bottom right":
            return {
                bottom: 10, right: 10
            };
        case "top center":
            return {
                top: 10, left: Math.round(windowWidth / 2 - toastWidth / 2)
            };
        case "left center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), left: 10
            };
        case "right center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), right: 10
            };
        case "center":
            return {
                top: Math.round(windowHeight / 2 - toastHeight / 2), left: Math.round(windowWidth / 2 - toastWidth / 2)
            };
        default:
            return {
                bottom: 10, left: Math.round(windowWidth / 2 - toastWidth / 2)
            }
    }
};
const getPositionStylesByCoordinates = (direction, coordinates, dimensions) => {
    const {
        toastWidth: toastWidth,
        toastHeight: toastHeight,
        windowHeight: windowHeight,
        windowWidth: windowWidth
    } = dimensions;
    switch (direction.replace(/-push|-stack/g, "")) {
        case "up":
            return {
                bottom: coordinates.bottom ?? windowHeight - toastHeight - coordinates.top, top: "", left: coordinates.left ?? "", right: coordinates.right ?? ""
            };
        case "down":
            return {
                top: coordinates.top ?? windowHeight - toastHeight - coordinates.bottom, bottom: "", left: coordinates.left ?? "", right: coordinates.right ?? ""
            };
        case "left":
            return {
                right: coordinates.right ?? windowWidth - toastWidth - coordinates.left, left: "", top: coordinates.top ?? "", bottom: coordinates.bottom ?? ""
            };
        case "right":
            return {
                left: coordinates.left ?? windowWidth - toastWidth - coordinates.right, right: "", top: coordinates.top ?? "", bottom: coordinates.bottom ?? ""
            }
    }
};
export default notify;
