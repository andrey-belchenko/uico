/**
 * DevExtreme (esm/ui/validation_summary.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../core/component_registrator";
import eventsEngine from "../events/core/events_engine";
import {
    grep
} from "../core/utils/common";
import {
    extend
} from "../core/utils/extend";
import {
    each,
    map
} from "../core/utils/iterator";
import ValidationEngine from "./validation_engine";
import CollectionWidget from "./collection/ui.collection_widget.edit";
const VALIDATION_SUMMARY_CLASS = "dx-validationsummary";
const ITEM_CLASS = "dx-validationsummary-item";
const ITEM_DATA_KEY = "dx-validationsummary-item-data";
const ValidationSummary = CollectionWidget.inherit({
    _getDefaultOptions() {
        return extend(this.callBase(), {
            focusStateEnabled: false,
            noDataText: null
        })
    },
    _setOptionsByReference() {
        this.callBase();
        extend(this._optionsByReference, {
            validationGroup: true
        })
    },
    _init() {
        this.callBase();
        this._initGroupRegistration()
    },
    _initGroupRegistration() {
        const $element = this.$element();
        const group = this.option("validationGroup") || ValidationEngine.findGroup($element, this._modelByElement($element));
        const groupConfig = ValidationEngine.addGroup(group);
        this._unsubscribeGroup();
        this._groupWasInit = true;
        this._validationGroup = group;
        this.groupSubscription = this._groupValidationHandler.bind(this);
        groupConfig.on("validated", this.groupSubscription)
    },
    _unsubscribeGroup() {
        const groupConfig = ValidationEngine.getGroupConfig(this._validationGroup);
        groupConfig && groupConfig.off("validated", this.groupSubscription)
    },
    _getOrderedItems(validators, items) {
        let orderedItems = [];
        each(validators, (function(_, validator) {
            const foundItems = grep(items, (function(item) {
                if (item.validator === validator) {
                    return true
                }
            }));
            if (foundItems.length) {
                orderedItems = orderedItems.concat(foundItems)
            }
        }));
        return orderedItems
    },
    _groupValidationHandler(params) {
        const items = this._getOrderedItems(params.validators, map(params.brokenRules, (function(rule) {
            return {
                text: rule.message,
                validator: rule.validator,
                index: rule.index
            }
        })));
        this.validators = params.validators;
        each(this.validators, ((_, validator) => {
            if (validator._validationSummary !== this) {
                let handler = this._itemValidationHandler.bind(this);
                const disposingHandler = function() {
                    validator.off("validated", handler);
                    validator._validationSummary = null;
                    handler = null
                };
                validator.on("validated", handler);
                validator.on("disposing", disposingHandler);
                validator._validationSummary = this
            }
        }));
        this.option("items", items)
    },
    _itemValidationHandler(_ref) {
        let {
            isValid: isValid,
            validator: validator,
            brokenRules: brokenRules
        } = _ref;
        let items = this.option("items");
        let itemsChanged = false;
        let itemIndex = 0;
        while (itemIndex < items.length) {
            const item = items[itemIndex];
            if (item.validator === validator) {
                const foundRule = grep(brokenRules || [], (function(rule) {
                    return rule.index === item.index
                }))[0];
                if (isValid || !foundRule) {
                    items.splice(itemIndex, 1);
                    itemsChanged = true;
                    continue
                }
                if (foundRule.message !== item.text) {
                    item.text = foundRule.message;
                    itemsChanged = true
                }
            }
            itemIndex++
        }
        each(brokenRules, (function(_, rule) {
            const foundItem = grep(items, (function(item) {
                return item.validator === validator && item.index === rule.index
            }))[0];
            if (!foundItem) {
                items.push({
                    text: rule.message,
                    validator: validator,
                    index: rule.index
                });
                itemsChanged = true
            }
        }));
        if (itemsChanged) {
            items = this._getOrderedItems(this.validators, items);
            this.option("items", items)
        }
    },
    _initMarkup() {
        this.$element().addClass("dx-validationsummary");
        this.callBase()
    },
    _optionChanged(args) {
        if ("validationGroup" === args.name) {
            this._initGroupRegistration()
        } else {
            this.callBase(args)
        }
    },
    _itemClass: () => ITEM_CLASS,
    _itemDataKey: () => ITEM_DATA_KEY,
    _postprocessRenderItem(params) {
        eventsEngine.on(params.itemElement, "click", (function() {
            params.itemData.validator && params.itemData.validator.focus && params.itemData.validator.focus()
        }))
    },
    _dispose() {
        this.callBase();
        this._unsubscribeGroup()
    },
    refreshValidationGroup() {
        this._initGroupRegistration()
    }
});
registerComponent("dxValidationSummary", ValidationSummary);
export default ValidationSummary;
