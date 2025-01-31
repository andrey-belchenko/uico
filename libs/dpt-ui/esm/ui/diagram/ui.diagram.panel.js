/**
 * DevExtreme (esm/ui/diagram/ui.diagram.panel.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import Widget from "../widget/ui.widget";
import eventsEngine from "../../events/core/events_engine";
import {
    addNamespace
} from "../../events/utils/index";
import pointerEvents from "../../events/pointer";
const POINTERUP_EVENT_NAME = addNamespace(pointerEvents.up, "dxDiagramPanel");
const PREVENT_REFOCUS_SELECTOR = ".dx-textbox";
class DiagramPanel extends Widget {
    _init() {
        super._init();
        this._createOnPointerUpAction()
    }
    _render() {
        super._render();
        this._attachPointerUpEvent()
    }
    _getPointerUpElements() {
        return [this.$element()]
    }
    _attachPointerUpEvent() {
        const elements = this._getPointerUpElements();
        elements.forEach((element => {
            eventsEngine.off(element, POINTERUP_EVENT_NAME);
            eventsEngine.on(element, POINTERUP_EVENT_NAME, (e => {
                if (!$(e.target).closest(".dx-textbox").length) {
                    this._onPointerUpAction()
                }
            }))
        }))
    }
    _createOnPointerUpAction() {
        this._onPointerUpAction = this._createActionByOption("onPointerUp")
    }
    _optionChanged(args) {
        if ("onPointerUp" === args.name) {
            this._createOnPointerUpAction()
        } else {
            super._optionChanged(args)
        }
    }
}
export default DiagramPanel;
