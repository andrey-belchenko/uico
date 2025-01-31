/**
 * DevExtreme (esm/ui/form/ui.form.item_options_actions.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import ItemOptionAction from "./ui.form.item_option_action";
import {
    data
} from "../../core/element_data";
import {
    extend
} from "../../core/utils/extend";
import {
    getFullOptionName
} from "./ui.form.utils";
class WidgetOptionItemOptionAction extends ItemOptionAction {
    tryExecute() {
        const {
            value: value
        } = this._options;
        const instance = this.findInstance();
        if (instance) {
            instance.option(value);
            return true
        }
        return false
    }
}
class TabOptionItemOptionAction extends ItemOptionAction {
    tryExecute() {
        const tabPanel = this.findInstance();
        if (tabPanel) {
            const {
                optionName: optionName,
                item: item,
                value: value
            } = this._options;
            const itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item);
            if (itemIndex >= 0) {
                tabPanel.option(getFullOptionName(`items[${itemIndex}]`, optionName), value);
                return true
            }
        }
        return false
    }
}
class SimpleItemTemplateChangedAction extends ItemOptionAction {
    tryExecute() {
        return false
    }
}
class GroupItemTemplateChangedAction extends ItemOptionAction {
    tryExecute() {
        const preparedItem = this.findPreparedItem();
        if (null != preparedItem && preparedItem._prepareGroupItemTemplate && preparedItem._renderGroupContentTemplate) {
            preparedItem._prepareGroupItemTemplate(this._options.item.template);
            preparedItem._renderGroupContentTemplate();
            return true
        }
        return false
    }
}
class TabsOptionItemOptionAction extends ItemOptionAction {
    tryExecute() {
        const tabPanel = this.findInstance();
        if (tabPanel) {
            const {
                value: value
            } = this._options;
            tabPanel.option("dataSource", value);
            return true
        }
        return false
    }
}
class ValidationRulesItemOptionAction extends ItemOptionAction {
    tryExecute() {
        const {
            item: item
        } = this._options;
        const instance = this.findInstance();
        const validator = instance && data(instance.$element()[0], "dxValidator");
        if (validator && item) {
            const filterRequired = item => "required" === item.type;
            const oldContainsRequired = (validator.option("validationRules") || []).some(filterRequired);
            const newContainsRequired = (item.validationRules || []).some(filterRequired);
            if (!oldContainsRequired && !newContainsRequired || oldContainsRequired && newContainsRequired) {
                validator.option("validationRules", item.validationRules);
                return true
            }
        }
        return false
    }
}
class CssClassItemOptionAction extends ItemOptionAction {
    tryExecute() {
        const $itemContainer = this.findItemContainer();
        const {
            previousValue: previousValue,
            value: value
        } = this._options;
        if ($itemContainer) {
            $itemContainer.removeClass(previousValue).addClass(value);
            return true
        }
        return false
    }
}
const tryCreateItemOptionAction = (optionName, itemActionOptions) => {
    switch (optionName) {
        case "editorOptions":
        case "buttonOptions":
            return new WidgetOptionItemOptionAction(itemActionOptions);
        case "validationRules":
            return new ValidationRulesItemOptionAction(itemActionOptions);
        case "cssClass":
            return new CssClassItemOptionAction(itemActionOptions);
        case "badge":
        case "disabled":
        case "icon":
        case "tabTemplate":
        case "title":
            return new TabOptionItemOptionAction(extend(itemActionOptions, {
                optionName: optionName
            }));
        case "tabs":
            return new TabsOptionItemOptionAction(itemActionOptions);
        case "template": {
            var _itemActionOptions$it, _itemActionOptions$it2;
            const itemType = (null === itemActionOptions || void 0 === itemActionOptions || null === (_itemActionOptions$it = itemActionOptions.item) || void 0 === _itemActionOptions$it ? void 0 : _itemActionOptions$it.itemType) ?? (null === (_itemActionOptions$it2 = itemActionOptions.itemsRunTimeInfo.findPreparedItemByItem(null === itemActionOptions || void 0 === itemActionOptions ? void 0 : itemActionOptions.item)) || void 0 === _itemActionOptions$it2 ? void 0 : _itemActionOptions$it2.itemType);
            if ("simple" === itemType) {
                return new SimpleItemTemplateChangedAction(itemActionOptions)
            } else if ("group" === itemType) {
                return new GroupItemTemplateChangedAction(itemActionOptions)
            }
            return new TabOptionItemOptionAction(extend(itemActionOptions, {
                optionName: optionName
            }))
        }
        default:
            return null
    }
};
export default tryCreateItemOptionAction;
