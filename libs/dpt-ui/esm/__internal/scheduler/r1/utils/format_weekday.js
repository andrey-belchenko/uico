/**
 * DevExtreme (esm/__internal/scheduler/r1/utils/format_weekday.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import dateLocalization from "../../../../localization/date";
export const formatWeekday = date => dateLocalization.getDayNames("abbreviated")[date.getDay()];
export const formatWeekdayAndDay = date => `${formatWeekday(date)} ${dateLocalization.format(date,"day")}`;
