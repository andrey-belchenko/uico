/**
 * DevExtreme (esm/__internal/scheduler/m_compact_appointments_helper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    locate,
    move
} from "../../animation/translator";
import $ from "../../core/renderer";
import {
    FunctionTemplate
} from "../../core/templates/function_template";
import {
    when
} from "../../core/utils/deferred";
import {
    getBoundingRect
} from "../../core/utils/position";
import messageLocalization from "../../localization/message";
import Button from "../../ui/button";
import {
    getOverflowIndicatorColor
} from "../scheduler/r1/utils/index";
import {
    createAppointmentAdapter
} from "./m_appointment_adapter";
import {
    LIST_ITEM_CLASS,
    LIST_ITEM_DATA_KEY
} from "./m_constants";
import {
    AppointmentTooltipInfo
} from "./m_data_structures";
const APPOINTMENT_COLLECTOR_CLASS = "dx-scheduler-appointment-collector";
const COMPACT_APPOINTMENT_COLLECTOR_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-compact`;
const APPOINTMENT_COLLECTOR_CONTENT_CLASS = `${APPOINTMENT_COLLECTOR_CLASS}-content`;
const WEEK_VIEW_COLLECTOR_OFFSET = 5;
const COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
export class CompactAppointmentsHelper {
    constructor(instance) {
        this.instance = instance;
        this.elements = []
    }
    render(options) {
        const {
            isCompact: isCompact,
            items: items,
            buttonColor: buttonColor
        } = options;
        const template = this._createTemplate(items.data.length, isCompact);
        const button = this._createCompactButton(template, options);
        const $button = button.$element();
        this._makeBackgroundColor($button, items.colors, buttonColor);
        this._makeBackgroundDarker($button);
        this.elements.push($button);
        $button.data("items", this._createTooltipInfos(items));
        return $button
    }
    clear() {
        this.elements.forEach((button => {
            button.detach();
            button.remove()
        }));
        this.elements = []
    }
    _createTooltipInfos(items) {
        return items.data.map(((appointment, index) => {
            var _items$settings;
            const targetedAdapter = createAppointmentAdapter(appointment, this.instance._dataAccessors, this.instance.timeZoneCalculator).clone();
            if ((null === (_items$settings = items.settings) || void 0 === _items$settings ? void 0 : _items$settings.length) > 0) {
                const {
                    info: info
                } = items.settings[index];
                targetedAdapter.startDate = info.sourceAppointment.startDate;
                targetedAdapter.endDate = info.sourceAppointment.endDate
            }
            return new AppointmentTooltipInfo(appointment, targetedAdapter.source(), items.colors[index], items.settings[index])
        }))
    }
    _onButtonClick(e, options) {
        const $button = $(e.element);
        this.instance.showAppointmentTooltipCore($button, $button.data("items"), this._getExtraOptionsForTooltip(options, $button))
    }
    _getExtraOptionsForTooltip(options, $appointmentCollector) {
        return {
            clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
            dragBehavior: options.allowDrag && this._createTooltipDragBehavior($appointmentCollector).bind(this),
            dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
            isButtonClick: true
        }
    }
    _clickEvent(onAppointmentClick) {
        return e => {
            const clickEventArgs = this.instance._createEventArgs(e);
            onAppointmentClick(clickEventArgs)
        }
    }
    _createTooltipDragBehavior($appointmentCollector) {
        return e => {
            const $element = $(e.element);
            const $schedulerElement = $(this.instance.element());
            const workSpace = this.instance.getWorkSpace();
            const initialPosition = locate($appointmentCollector);
            const options = {
                filter: `.${LIST_ITEM_CLASS}`,
                isSetCursorOffset: true,
                initialPosition: initialPosition,
                getItemData: itemElement => {
                    var _$$data;
                    return null === (_$$data = $(itemElement).data(LIST_ITEM_DATA_KEY)) || void 0 === _$$data ? void 0 : _$$data.appointment
                },
                getItemSettings: (_, event) => event.itemSettings
            };
            workSpace._createDragBehaviorBase($element, $schedulerElement, options)
        }
    }
    _getCollectorOffset(width, cellWidth) {
        return cellWidth - width - this._getCollectorRightOffset()
    }
    _getCollectorRightOffset() {
        return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? 1 : 5
    }
    _makeBackgroundDarker(button) {
        button.css("boxShadow", `inset ${getBoundingRect(button.get(0)).width}px 0 0 0 rgba(0, 0, 0, 0.3)`)
    }
    _makeBackgroundColor($button, colors, color) {
        when.apply(null, colors).done(function() {
            this._makeBackgroundColorCore($button, color, [...arguments])
        }.bind(this))
    }
    _makeBackgroundColorCore($button, color, itemColors) {
        color && color.done((color => {
            const backgroundColor = getOverflowIndicatorColor(color, itemColors);
            if (backgroundColor) {
                $button.css("backgroundColor", backgroundColor)
            }
        }))
    }
    _setPosition(element, position) {
        move(element, {
            top: position.top,
            left: position.left
        })
    }
    _createCompactButton(template, options) {
        const $button = this._createCompactButtonElement(options);
        return this.instance._createComponent($button, Button, {
            type: "default",
            width: options.width,
            height: options.height,
            onClick: e => this._onButtonClick(e, options),
            template: this._renderTemplate(template, options.items, options.isCompact)
        })
    }
    _createCompactButtonElement(_ref) {
        let {
            isCompact: isCompact,
            $container: $container,
            coordinates: coordinates
        } = _ref;
        const result = $("<div>").addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
        this._setPosition(result, coordinates);
        return result
    }
    _renderTemplate(template, items, isCompact) {
        return new FunctionTemplate((options => template.render({
            model: {
                appointmentCount: items.data.length,
                isCompact: isCompact
            },
            container: options.container
        })))
    }
    _createTemplate(count, isCompact) {
        this._initButtonTemplate(count, isCompact);
        return this.instance._getAppointmentTemplate("appointmentCollectorTemplate")
    }
    _initButtonTemplate(count, isCompact) {
        this.instance._templateManager.addDefaultTemplates({
            appointmentCollector: new FunctionTemplate((options => this._createButtonTemplate(count, $(options.container), isCompact)))
        })
    }
    _createButtonTemplate(appointmentCount, element, isCompact) {
        const text = isCompact ? appointmentCount : messageLocalization.getFormatter("dxScheduler-moreAppointments")(appointmentCount);
        return element.append($("<span>").text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS)
    }
}
