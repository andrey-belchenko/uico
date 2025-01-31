/**
 * DevExtreme (esm/__internal/grids/pivot_grid/chart_integration/m_chart_integration.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    createPath,
    foreachTree,
    formatValue
} from "../m_widget_utils";
const FORMAT_DICTIONARY = {
    number: "numeric",
    date: "datetime"
};
const UNBIND_KEY = "dxPivotGridUnbinding";

function getFormattedValue(path, fields) {
    const value = [];
    const lastFieldIndex = fields.length - 1;
    each(path, ((i, item) => {
        value.push(item.text || formatValue(item.value, fields[lastFieldIndex - i]))
    }));
    return value.reverse()
}

function getExpandedLevel(node) {
    let level = 0;
    foreachTree(node, (members => {
        level = Math.max(level, members.length - 1)
    }));
    return level
}

function processDataCell(processCellArgs, processCell) {
    let {
        chartDataItem: chartDataItem
    } = processCellArgs;
    let processedCell = processCell && processCell(processCellArgs);
    if (processedCell) {
        chartDataItem = extend({}, chartDataItem, processedCell.chartDataItem);
        processedCell = extend({}, processCellArgs, processedCell, {
            chartDataItem: chartDataItem
        });
        return processedCell
    }
    return processCellArgs
}

function createChartDataSource(pivotGridDataSource, mapOptions, axisDictionary) {
    const data = pivotGridDataSource.getData();
    const dataSource = [];
    const dataFields = pivotGridDataSource.getAreaFields("data");
    const rowFields = pivotGridDataSource.getAreaFields("row");
    const columnFields = pivotGridDataSource.getAreaFields("column");
    const columnElements = [{
        index: data.grandTotalColumnIndex,
        children: data.columns
    }];
    const rowElements = [{
        index: data.grandTotalRowIndex,
        children: data.rows
    }];
    const rowLevel = getExpandedLevel(rowElements);
    const columnLevel = getExpandedLevel(columnElements);
    let measureIndex;
    let dataField;
    let rowMemberIndex;
    let rowVisibility;
    let rowPathFormatted;
    let rowPath;
    let columnMemberIndex;
    let columnVisibility;
    let columnPath;
    let columnPathFormatted;

    function createDataItem() {
        const dataCell = (data.values[rowMemberIndex] || [])[columnMemberIndex] || [];
        const value = dataCell[measureIndex];
        let axis;
        let processCellArgs = {
            rowPath: rowPath,
            maxRowLevel: rowLevel,
            rowPathFormatted: rowPathFormatted,
            rowFields: rowFields,
            columnPathFormatted: columnPathFormatted,
            maxColumnLevel: columnLevel,
            columnPath: columnPath,
            columnFields: columnFields,
            dataFields: dataFields,
            dataIndex: measureIndex,
            dataValues: dataCell,
            visible: columnVisibility && rowVisibility
        };
        let seriesName = (mapOptions.inverted ? columnPathFormatted : rowPathFormatted).join(" - ");
        let argument = (mapOptions.inverted ? rowPathFormatted : columnPathFormatted).join("/");
        if (dataFields.length > 1) {
            if ("args" === mapOptions.putDataFieldsInto || "both" === mapOptions.putDataFieldsInto) {
                argument += ` | ${dataField.caption}`
            }
            if ("args" !== mapOptions.putDataFieldsInto) {
                seriesName += ` | ${dataField.caption}`;
                if ("singleAxis" !== mapOptions.dataFieldsDisplayMode) {
                    axis = dataField.caption
                }
            }
        }
        processCellArgs.chartDataItem = {
            val: void 0 === value ? null : value,
            series: seriesName,
            arg: argument
        };
        processCellArgs = processDataCell(processCellArgs, mapOptions.processCell);
        if (processCellArgs.visible) {
            axisDictionary[processCellArgs.chartDataItem.series] = axisDictionary[processCellArgs.chartDataItem.series] || axis;
            dataSource.push(processCellArgs.chartDataItem)
        }
    }

    function foreachRowColumn(callBack) {
        foreachTree(rowElements, (rowMembers => {
            rowMemberIndex = rowMembers[0].index;
            rowMembers = rowMembers.slice(0, rowMembers.length - 1);
            rowVisibility = rowLevel === rowMembers.length;
            rowPath = createPath(rowMembers);
            rowPathFormatted = getFormattedValue(rowMembers, rowFields);
            if (0 === rowPath.length) {
                rowPathFormatted = [mapOptions.grandTotalText]
            }
            foreachTree(columnElements, (columnMembers => {
                columnMemberIndex = columnMembers[0].index;
                columnMembers = columnMembers.slice(0, columnMembers.length - 1);
                columnVisibility = columnLevel === columnMembers.length;
                columnPath = createPath(columnMembers);
                columnPathFormatted = getFormattedValue(columnMembers, columnFields);
                if (0 === columnPath.length) {
                    columnPathFormatted = [mapOptions.grandTotalText]
                }
                callBack()
            }))
        }))
    }

    function foreachDataField(callback) {
        each(dataFields, ((index, field) => {
            dataField = field;
            measureIndex = index;
            callback()
        }))
    }
    if (false === mapOptions.alternateDataFields) {
        foreachDataField((() => {
            foreachRowColumn(createDataItem)
        }))
    } else {
        foreachRowColumn((() => {
            foreachDataField(createDataItem)
        }))
    }
    return dataSource
}

function createValueAxisOptions(dataSource, options) {
    const dataFields = dataSource.getAreaFields("data");
    if ("args" !== options.putDataFieldsInto && "singleAxis" !== options.dataFieldsDisplayMode || 1 === dataFields.length) {
        const valueAxisSettings = [];
        each(dataFields, ((_, dataField) => {
            const valueAxisOptions = {
                name: dataField.caption,
                title: dataField.caption,
                valueType: FORMAT_DICTIONARY[dataField.dataType] || dataField.dataType,
                label: {
                    format: dataField.format
                }
            };
            if (dataField.customizeText) {
                valueAxisOptions.label.customizeText = function(formatObject) {
                    return dataField.customizeText.call(dataField, formatObject)
                }
            }
            if ("splitPanes" === options.dataFieldsDisplayMode) {
                valueAxisOptions.pane = dataField.caption
            }
            valueAxisSettings.push(valueAxisOptions)
        }));
        return valueAxisSettings
    }
    return [{}]
}

function createPanesOptions(dataSource, options) {
    const panes = [];
    const dataFields = dataSource.getAreaFields("data");
    if (dataFields.length > 1 && "splitPanes" === options.dataFieldsDisplayMode && "args" !== options.putDataFieldsInto) {
        each(dataFields, ((_, dataField) => {
            panes.push({
                name: dataField.caption
            })
        }))
    }
    if (!panes.length) {
        panes.push({})
    }
    return panes
}

function createChartOptions(dataSource, options) {
    const {
        customizeSeries: customizeSeries
    } = options;
    const {
        customizeChart: customizeChart
    } = options;
    let chartOptions = {
        valueAxis: createValueAxisOptions(dataSource, options),
        panes: createPanesOptions(dataSource, options)
    };
    const axisDictionary = {};
    if (customizeChart) {
        chartOptions = extend(true, {}, chartOptions, customizeChart(chartOptions))
    }
    chartOptions.dataSource = createChartDataSource(dataSource, options, axisDictionary);
    chartOptions.seriesTemplate = {
        nameField: "series",
        customizeSeries(seriesName) {
            let seriesOptions = {};
            if ("splitPanes" === options.dataFieldsDisplayMode) {
                seriesOptions.pane = axisDictionary[seriesName]
            } else if ("singleAxis" !== options.dataFieldsDisplayMode) {
                seriesOptions.axis = axisDictionary[seriesName]
            }
            if (customizeSeries) {
                seriesOptions = extend(seriesOptions, customizeSeries(seriesName, seriesOptions))
            }
            return seriesOptions
        }
    };
    return chartOptions
}

function getChartInstance(chartElement) {
    if (!chartElement) {
        return false
    }
    if (chartElement.NAME) {
        return "dxChart" === chartElement.NAME && chartElement
    }
    const element = $(chartElement);
    return element.data("dxChart") && element.dxChart("instance")
}

function removeBinding(chart) {
    const unbind = chart.$element().data(UNBIND_KEY);
    unbind && unbind()
}
const ChartIntegrationMixin = {
    bindChart(chart, integrationOptions) {
        integrationOptions = extend({}, integrationOptions);
        const that = this;
        const updateChart = function() {
            integrationOptions.grandTotalText = that.option("texts.grandTotal");
            const chartOptions = createChartOptions(that.getDataSource(), integrationOptions);
            chart.option(chartOptions)
        };
        chart = getChartInstance(chart);
        if (!chart) {
            return null
        }
        removeBinding(chart);
        that.on("changed", updateChart);
        updateChart();
        const disposeBinding = function() {
            chart.$element().removeData(UNBIND_KEY);
            that.off("changed", updateChart)
        };
        chart.on("disposing", disposeBinding);
        this.on("disposing", disposeBinding);
        chart.$element().data(UNBIND_KEY, disposeBinding);
        return disposeBinding
    }
};
export default {
    ChartIntegrationMixin: ChartIntegrationMixin
};
export {
    ChartIntegrationMixin
};
