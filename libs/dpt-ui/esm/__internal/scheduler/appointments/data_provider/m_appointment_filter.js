/**
 * DevExtreme (esm/__internal/scheduler/appointments/data_provider/m_appointment_filter.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    wrapToArray
} from "../../../../core/utils/array";
import dateUtils from "../../../../core/utils/date";
import {
    each,
    map
} from "../../../../core/utils/iterator";
import {
    isDefined,
    isFunction
} from "../../../../core/utils/type";
import query from "../../../../data/query";
import {
    dateUtilsTs
} from "../../../core/utils/date";
import {
    getAppointmentTakesAllDay,
    getDatesWithoutTime,
    hasResourceValue,
    isDateAndTimeView,
    isTimelineView
} from "../../../scheduler/r1/utils/index";
import {
    createAppointmentAdapter
} from "../../m_appointment_adapter";
import {
    getRecurrenceProcessor
} from "../../m_recurrence";
import {
    getResourcesDataByGroups
} from "../../resources/m_utils";
import {
    _appointmentPartInInterval,
    compareDateWithEndDayHour,
    compareDateWithStartDayHour,
    getAppointmentTakesSeveralDays,
    getRecurrenceException
} from "./m_utils";
const toMs = dateUtils.dateToMilliseconds;
const FilterStrategies = {
    virtual: "virtual",
    standard: "standard"
};
export class AppointmentFilterBaseStrategy {
    constructor(options) {
        this.options = options;
        this.dataAccessors = this.options.dataAccessors;
        this._init()
    }
    get strategyName() {
        return FilterStrategies.standard
    }
    get timeZoneCalculator() {
        return this.options.timeZoneCalculator
    }
    get viewStartDayHour() {
        return this.options.startDayHour
    }
    get viewEndDayHour() {
        return this.options.endDayHour
    }
    get timezone() {
        return this.options.timezone
    }
    get firstDayOfWeek() {
        return this.options.firstDayOfWeek
    }
    get showAllDayPanel() {
        return this.options.showAllDayPanel
    }
    get loadedResources() {
        return this._resolveOption("loadedResources")
    }
    get supportAllDayRow() {
        return this._resolveOption("supportAllDayRow")
    }
    get viewType() {
        return this._resolveOption("viewType")
    }
    get viewDirection() {
        return this._resolveOption("viewDirection")
    }
    get dateRange() {
        return this._resolveOption("dateRange")
    }
    get groupCount() {
        return this._resolveOption("groupCount")
    }
    get viewDataProvider() {
        return this._resolveOption("viewDataProvider")
    }
    get allDayPanelMode() {
        return this._resolveOption("allDayPanelMode")
    }
    _resolveOption(name) {
        const result = this.options[name];
        return "function" === typeof result ? result() : result
    }
    _init() {
        this.setDataAccessors(this.dataAccessors)
    }
    filter(preparedItems) {
        const [min, max] = this.dateRange;
        const {
            viewOffset: viewOffset
        } = this.options;
        const allDay = !this.showAllDayPanel && this.supportAllDayRow ? false : void 0;
        return this.filterLoadedAppointments({
            startDayHour: this.viewStartDayHour,
            endDayHour: this.viewEndDayHour,
            viewOffset: viewOffset,
            viewStartDayHour: this.viewStartDayHour,
            viewEndDayHour: this.viewEndDayHour,
            min: min,
            max: max,
            resources: this.loadedResources,
            allDay: allDay,
            supportMultiDayAppointments: isTimelineView(this.viewType),
            firstDayOfWeek: this.firstDayOfWeek
        }, preparedItems)
    }
    hasAllDayAppointments(filteredItems, preparedItems) {
        const adapters = filteredItems.map((item => createAppointmentAdapter(item, this.dataAccessors, this.timeZoneCalculator)));
        let result = false;
        each(adapters, ((_, item) => {
            if (getAppointmentTakesAllDay(item, this.allDayPanelMode)) {
                result = true;
                return false
            }
        }));
        return result
    }
    setDataAccessors(dataAccessors) {
        this.dataAccessors = dataAccessors
    }
    _createAllDayAppointmentFilter() {
        return [
            [appointment => getAppointmentTakesAllDay(appointment, this.allDayPanelMode)]
        ]
    }
    _createCombinedFilter(filterOptions) {
        const min = new Date(filterOptions.min);
        const max = new Date(filterOptions.max);
        const {
            startDayHour: startDayHour,
            endDayHour: endDayHour,
            viewOffset: viewOffset,
            viewStartDayHour: viewStartDayHour,
            viewEndDayHour: viewEndDayHour,
            resources: resources,
            firstDayOfWeek: firstDayOfWeek,
            checkIntersectViewport: checkIntersectViewport,
            supportMultiDayAppointments: supportMultiDayAppointments
        } = filterOptions;
        const [trimMin, trimMax] = getDatesWithoutTime(min, max);
        const useRecurrence = isDefined(this.dataAccessors.getter.recurrenceRule);
        return [
            [appointment => {
                const appointmentVisible = appointment.visible ?? true;
                if (!appointmentVisible) {
                    return false
                }
                const {
                    allDay: isAllDay,
                    hasRecurrenceRule: hasRecurrenceRule
                } = appointment;
                const startDate = dateUtilsTs.addOffsets(appointment.startDate, [-viewOffset]);
                const endDate = dateUtilsTs.addOffsets(appointment.endDate, [-viewOffset]);
                const appointmentTakesAllDay = getAppointmentTakesAllDay(appointment, this.allDayPanelMode);
                if (!hasRecurrenceRule) {
                    if (!(endDate >= trimMin && startDate < trimMax || dateUtils.sameDate(endDate, trimMin) && dateUtils.sameDate(startDate, trimMin))) {
                        return false
                    }
                }
                const appointmentTakesSeveralDays = getAppointmentTakesSeveralDays(appointment);
                const isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
                if (null !== resources && void 0 !== resources && resources.length && !this._filterAppointmentByResources(appointment.rawAppointment, resources)) {
                    return false
                }
                if (appointmentTakesAllDay && false === filterOptions.allDay) {
                    return false
                }
                if (hasRecurrenceRule) {
                    const recurrenceException = getRecurrenceException(appointment, this.timeZoneCalculator, this.timezone);
                    if (!this._filterAppointmentByRRule(_extends({}, appointment, {
                            recurrenceException: recurrenceException,
                            allDay: appointmentTakesAllDay
                        }), min, max, startDayHour, endDayHour, firstDayOfWeek)) {
                        return false
                    }
                }
                if (!isAllDay && supportMultiDayAppointments && isLongAppointment) {
                    if (endDate < min && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
                        return false
                    }
                }
                if (!isAllDay && isDefined(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
                    if (!compareDateWithStartDayHour(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
                        return false
                    }
                }
                if (!isAllDay && isDefined(endDayHour)) {
                    if (!compareDateWithEndDayHour({
                            startDate: startDate,
                            endDate: endDate,
                            startDayHour: startDayHour,
                            endDayHour: endDayHour,
                            viewOffset: viewOffset,
                            viewStartDayHour: viewStartDayHour,
                            viewEndDayHour: viewEndDayHour,
                            allDay: appointmentTakesAllDay,
                            severalDays: appointmentTakesSeveralDays,
                            min: min,
                            max: max,
                            checkIntersectViewport: checkIntersectViewport
                        })) {
                        return false
                    }
                }
                if (!isAllDay && (!isLongAppointment || supportMultiDayAppointments)) {
                    if (endDate < min && useRecurrence && !hasRecurrenceRule) {
                        return false
                    }
                }
                return true
            }]
        ]
    }
    _createAppointmentFilter(filterOptions) {
        return this._createCombinedFilter(filterOptions)
    }
    _filterAppointmentByResources(appointment, resources) {
        const checkAppointmentResourceValues = (resourceName, resourceIndex) => {
            const resourceGetter = this.dataAccessors.resources.getter[resourceName];
            let resource;
            if (isFunction(resourceGetter)) {
                resource = resourceGetter(appointment)
            }
            const appointmentResourceValues = wrapToArray(resource);
            const resourceData = map(resources[resourceIndex].items, (_ref => {
                let {
                    id: id
                } = _ref;
                return id
            }));
            for (let i = 0; i < appointmentResourceValues.length; i++) {
                if (hasResourceValue(resourceData, appointmentResourceValues[i])) {
                    return true
                }
            }
            return false
        };
        let result = false;
        for (let i = 0; i < resources.length; i++) {
            const resourceName = resources[i].name;
            result = checkAppointmentResourceValues(resourceName, i);
            if (!result) {
                return false
            }
        }
        return result
    }
    _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
        const {
            recurrenceRule: recurrenceRule
        } = appointment;
        const {
            recurrenceException: recurrenceException
        } = appointment;
        const {
            allDay: allDay
        } = appointment;
        let result = true;
        const appointmentStartDate = appointment.startDate;
        const appointmentEndDate = appointment.endDate;
        const recurrenceProcessor = getRecurrenceProcessor();
        if (allDay || _appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
            const [trimMin, trimMax] = getDatesWithoutTime(min, max);
            min = trimMin;
            max = new Date(trimMax.getTime() - toMs("minute"))
        }
        if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
            result = appointmentEndDate > min && appointmentStartDate <= max
        }
        if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
            const {
                viewOffset: viewOffset
            } = this.options;
            result = recurrenceProcessor.hasRecurrence({
                rule: recurrenceRule,
                exception: recurrenceException,
                start: appointmentStartDate,
                end: appointmentEndDate,
                min: dateUtilsTs.addOffsets(min, [viewOffset]),
                max: dateUtilsTs.addOffsets(max, [viewOffset]),
                firstDayOfWeek: firstDayOfWeek,
                appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointmentStartDate, appointment.startDateTimeZone, false)
            })
        }
        return result
    }
    filterLoadedAppointments(filterOptions, preparedItems) {
        const filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
        return filteredItems.map((_ref2 => {
            let {
                rawAppointment: rawAppointment
            } = _ref2;
            return rawAppointment
        }))
    }
    filterPreparedItems(filterOptions, preparedItems) {
        const combinedFilter = this._createAppointmentFilter(filterOptions);
        return query(preparedItems).filter(combinedFilter).toArray()
    }
    filterAllDayAppointments(preparedItems) {
        const combinedFilter = this._createAllDayAppointmentFilter();
        return query(preparedItems).filter(combinedFilter).toArray().map((_ref3 => {
            let {
                rawAppointment: rawAppointment
            } = _ref3;
            return rawAppointment
        }))
    }
}
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
    get strategyName() {
        return FilterStrategies.virtual
    }
    get resources() {
        return this.options.resources
    }
    filter(preparedItems) {
        const {
            viewOffset: viewOffset
        } = this.options;
        const hourMs = toMs("hour");
        const isCalculateStartAndEndDayHour = isDateAndTimeView(this.viewType);
        const checkIntersectViewport = isCalculateStartAndEndDayHour && "horizontal" === this.viewDirection;
        const isAllDayWorkspace = !this.supportAllDayRow;
        const showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
        const endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
        const shiftedEndViewDate = dateUtilsTs.addOffsets(endViewDate, [viewOffset]);
        const filterOptions = [];
        const groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
        groupsInfo.forEach((item => {
            const {
                groupIndex: groupIndex
            } = item;
            const groupStartDate = item.startDate;
            const groupEndDate = new Date(Math.min(item.endDate.getTime(), shiftedEndViewDate.getTime()));
            const startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
            const endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate.getTime() - groupStartDate.getTime()) / hourMs : this.viewEndDayHour;
            const resources = this._getPrerenderFilterResources(groupIndex);
            const hasAllDayPanel = this.viewDataProvider.hasGroupAllDayPanel(groupIndex);
            const supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
            filterOptions.push({
                isVirtualScrolling: true,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                viewOffset: viewOffset,
                viewStartDayHour: this.viewStartDayHour,
                viewEndDayHour: this.viewEndDayHour,
                min: dateUtilsTs.addOffsets(groupStartDate, [-viewOffset]),
                max: dateUtilsTs.addOffsets(groupEndDate, [-viewOffset]),
                supportMultiDayAppointments: isTimelineView(this.viewType),
                allDay: supportAllDayAppointment,
                resources: resources,
                firstDayOfWeek: this.firstDayOfWeek,
                checkIntersectViewport: checkIntersectViewport
            })
        }));
        return this.filterLoadedAppointments({
            filterOptions: filterOptions,
            groupCount: this.groupCount
        }, preparedItems)
    }
    filterPreparedItems(_ref4, preparedItems) {
        let {
            filterOptions: filterOptions,
            groupCount: groupCount
        } = _ref4;
        const combinedFilters = [];
        let itemsToFilter = preparedItems;
        const needPreFilter = groupCount > 0;
        if (needPreFilter) {
            itemsToFilter = itemsToFilter.filter((_ref5 => {
                let {
                    rawAppointment: rawAppointment
                } = _ref5;
                for (let i = 0; i < filterOptions.length; ++i) {
                    const {
                        resources: resources
                    } = filterOptions[i];
                    if (this._filterAppointmentByResources(rawAppointment, resources)) {
                        return true
                    }
                }
            }))
        }
        filterOptions.forEach((option => {
            combinedFilters.length && combinedFilters.push("or");
            const filter = this._createAppointmentFilter(option);
            combinedFilters.push(filter)
        }));
        return query(itemsToFilter).filter(combinedFilters).toArray()
    }
    hasAllDayAppointments(filteredItems, preparedItems) {
        return this.filterAllDayAppointments(preparedItems).length > 0
    }
    _getPrerenderFilterResources(groupIndex) {
        const cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
        return getResourcesDataByGroups(this.loadedResources, this.resources, [cellGroup])
    }
}
