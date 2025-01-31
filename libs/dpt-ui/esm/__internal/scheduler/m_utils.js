/**
 * DevExtreme (esm/__internal/scheduler/m_utils.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getPublicElement
} from "../../core/element";
import $ from "../../core/renderer";
import {
    compileGetter,
    compileSetter
} from "../../core/utils/data";
import dateSerialization from "../../core/utils/date_serialization";
import {
    each
} from "../../core/utils/iterator";
import {
    getOuterHeight,
    setHeight,
    setWidth
} from "../../core/utils/size";
import {
    APPOINTMENT_SETTINGS_KEY
} from "./m_constants";
export const utils = {
    dataAccessors: {
        getAppointmentSettings: element => $(element).data(APPOINTMENT_SETTINGS_KEY),
        getAppointmentInfo: element => {
            const settings = utils.dataAccessors.getAppointmentSettings(element);
            return null === settings || void 0 === settings ? void 0 : settings.info
        },
        create: (fields, currentDataAccessors, forceIsoDateParsing, dateSerializationFormat) => {
            const dataAccessors = currentDataAccessors ? _extends({}, currentDataAccessors) : {
                getter: {},
                setter: {},
                expr: {}
            };
            each(fields, ((name, expr) => {
                if (expr) {
                    const getter = compileGetter(expr);
                    const setter = compileSetter(expr);
                    let dateGetter;
                    let dateSetter;
                    let serializationFormat;
                    if (field = name, "startDate" === field || "endDate" === field) {
                        dateGetter = object => {
                            let value = getter(object);
                            if (forceIsoDateParsing) {
                                value = dateSerialization.deserializeDate(value)
                            }
                            return value
                        };
                        dateSetter = (object, value) => {
                            if (dateSerializationFormat) {
                                serializationFormat = dateSerializationFormat
                            } else if (forceIsoDateParsing && !serializationFormat) {
                                const oldValue = getter(object);
                                serializationFormat = dateSerialization.getDateSerializationFormat(oldValue)
                            }
                            const newValue = dateSerialization.serializeDate(value, serializationFormat);
                            setter(object, newValue)
                        }
                    }
                    dataAccessors.getter[name] = dateGetter || getter;
                    dataAccessors.setter[name] = dateSetter || setter;
                    dataAccessors.expr[`${name}Expr`] = expr
                } else {
                    delete dataAccessors.getter[name];
                    delete dataAccessors.setter[name];
                    delete dataAccessors.expr[`${name}Expr`]
                }
                var field
            }));
            return dataAccessors
        }
    },
    DOM: {
        getHeaderHeight: header => header ? header._$element && parseInt(getOuterHeight(header._$element), 10) : 0
    },
    renovation: {
        renderComponent: (widget, parentElement, componentClass, componentName, viewModel) => {
            let component = widget[componentName];
            if (!component) {
                const container = getPublicElement(parentElement);
                component = widget._createComponent(container, componentClass, viewModel);
                widget[componentName] = component
            } else {
                const $element = component.$element();
                const elementStyle = $element.get(0).style;
                const {
                    height: height
                } = elementStyle;
                const {
                    width: width
                } = elementStyle;
                component.option(viewModel);
                if (height) {
                    setHeight($element, height)
                }
                if (width) {
                    setWidth($element, width)
                }
            }
        }
    }
};
