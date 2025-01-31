/**
 * DevExtreme (esm/ui/diagram/ui.diagram.properties_toolbar.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import DiagramToolbar from "./ui.diagram.toolbar";
import DiagramCommandsManager from "./diagram.commands_manager";
class DiagramPropertiesToolbar extends DiagramToolbar {
    _getCommands() {
        return DiagramCommandsManager.getPropertiesToolbarCommands()
    }
}
export default DiagramPropertiesToolbar;
