/**
 * DevExtreme (esm/ui/file_manager/ui.file_manager.file_actions_button.js)
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
import Widget from "../widget/ui.widget";
import Button from "../button";
const FILE_MANAGER_FILE_ACTIONS_BUTTON = "dx-filemanager-file-actions-button";
const FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED = "dx-filemanager-file-actions-button-activated";
const ACTIVE_STATE_CLASS = "dx-state-active";
class FileManagerFileActionsButton extends Widget {
    _initMarkup() {
        this._createClickAction();
        const $button = $("<div>");
        this.$element().append($button).addClass(FILE_MANAGER_FILE_ACTIONS_BUTTON);
        this._button = this._createComponent($button, Button, {
            icon: "overflow",
            stylingMode: "text",
            onClick: e => this._raiseClick(e)
        });
        super._initMarkup()
    }
    _createClickAction() {
        this._clickAction = this._createActionByOption("onClick")
    }
    _raiseClick(e) {
        this._clickAction(e)
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            cssClass: "",
            onClick: null
        })
    }
    _optionChanged(args) {
        const name = args.name;
        switch (name) {
            case "cssClass":
                this.repaint();
                break;
            case "onClick":
                this._createClickAction();
                break;
            default:
                super._optionChanged(args)
        }
    }
    setActive(active) {
        this.$element().toggleClass(FILE_MANAGER_FILE_ACTIONS_BUTTON_ACTIVATED, active);
        setTimeout((() => this._button.$element().toggleClass("dx-state-active", active)))
    }
}
export default FileManagerFileActionsButton;
