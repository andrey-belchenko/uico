/**
 * DevExtreme (esm/renovation/ui/droppable.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "className", "disabled", "onDragEnter", "onDragLeave", "onDrop"];
import {
    createVNode,
    normalizeProps
} from "inferno";
import {
    InfernoEffect,
    InfernoComponent
} from "@dpt-ui/runtime/inferno";
import {
    enter,
    leave,
    drop
} from "../../events/drag";
import eventsEngine from "../../events/core/events_engine";
import {
    combineClasses
} from "../utils/combine_classes";
export const viewFunction = _ref => {
    let {
        cssClasses: cssClasses,
        props: {
            children: children
        },
        restAttributes: restAttributes,
        widgetRef: widgetRef
    } = _ref;
    return normalizeProps(createVNode(1, "div", cssClasses, children, 0, _extends({}, restAttributes), null, widgetRef))
};
export const DroppableProps = {
    disabled: false,
    className: ""
};
import {
    createRef as infernoCreateRef
} from "inferno";
export class Droppable extends InfernoComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.widgetRef = infernoCreateRef();
        this.dropEventsEffect = this.dropEventsEffect.bind(this);
        this.dragEnterHandler = this.dragEnterHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.getEventArgs = this.getEventArgs.bind(this)
    }
    createEffects() {
        return [new InfernoEffect(this.dropEventsEffect, [this.props.disabled, this.props.onDragEnter, this.props.onDragLeave, this.props.onDrop])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ || _this$_effects$.update([this.props.disabled, this.props.onDragEnter, this.props.onDragLeave, this.props.onDrop])
    }
    dropEventsEffect() {
        if (this.props.disabled) {
            return
        }
        eventsEngine.on(this.widgetRef.current, enter, this.dragEnterHandler);
        eventsEngine.on(this.widgetRef.current, leave, this.dragLeaveHandler);
        eventsEngine.on(this.widgetRef.current, drop, this.dropHandler);
        return () => {
            eventsEngine.off(this.widgetRef.current, enter, this.dragEnterHandler);
            eventsEngine.off(this.widgetRef.current, leave, this.dragLeaveHandler);
            eventsEngine.off(this.widgetRef.current, drop, this.dropHandler)
        }
    }
    get cssClasses() {
        const {
            className: className,
            disabled: disabled
        } = this.props;
        const classesMap = {
            [className]: !!className,
            "dx-droppable": true,
            "dx-state-disabled": !!disabled
        };
        return combineClasses(classesMap)
    }
    dragEnterHandler(event) {
        const dragEnterArgs = this.getEventArgs(event);
        const {
            onDragEnter: onDragEnter
        } = this.props;
        null === onDragEnter || void 0 === onDragEnter || onDragEnter(dragEnterArgs)
    }
    dragLeaveHandler(event) {
        const dragLeaveArgs = this.getEventArgs(event);
        const {
            onDragLeave: onDragLeave
        } = this.props;
        null === onDragLeave || void 0 === onDragLeave || onDragLeave(dragLeaveArgs)
    }
    dropHandler(event) {
        const dropArgs = this.getEventArgs(event);
        const {
            onDrop: onDrop
        } = this.props;
        null === onDrop || void 0 === onDrop || onDrop(dropArgs)
    }
    getEventArgs(e) {
        return {
            event: e,
            itemElement: this.widgetRef.current
        }
    }
    get restAttributes() {
        const _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        const props = this.props;
        return viewFunction({
            props: _extends({}, props),
            widgetRef: this.widgetRef,
            cssClasses: this.cssClasses,
            dragEnterHandler: this.dragEnterHandler,
            dragLeaveHandler: this.dragLeaveHandler,
            dropHandler: this.dropHandler,
            getEventArgs: this.getEventArgs,
            restAttributes: this.restAttributes
        })
    }
}
Droppable.defaultProps = DroppableProps;
