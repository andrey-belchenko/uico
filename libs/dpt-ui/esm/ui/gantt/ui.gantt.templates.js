/**
 * DevExtreme (esm/ui/gantt/ui.gantt.templates.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../core/renderer";
import {
    getPublicElement
} from "../../core/element";
export class GanttTemplatesManager {
    constructor(gantt) {
        this._gantt = gantt
    }
    getTaskTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
        const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
        const createTemplateFunction = template && ((container, item, callback) => {
            template.render({
                model: this._gantt.getTaskDataByCoreData(item),
                container: getPublicElement($(container)),
                onRendered: () => {
                    callback()
                }
            });
            return true
        });
        return createTemplateFunction
    }
    getTaskProgressTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
        const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
        const createTemplateFunction = template && ((container, item, callback) => {
            template.render({
                model: item,
                container: getPublicElement($(container)),
                onRendered: () => {
                    callback()
                }
            });
            return true
        });
        return createTemplateFunction
    }
    getTaskTimeTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
        const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
        const createTemplateFunction = template && ((container, item, callback) => {
            template.render({
                model: item,
                container: getPublicElement($(container)),
                onRendered: () => {
                    callback()
                }
            });
            return true
        });
        return createTemplateFunction
    }
    getTaskContentTemplateFunc(taskContentTemplateOption) {
        const template = taskContentTemplateOption && this._gantt._getTemplate(taskContentTemplateOption);
        const createTemplateFunction = template && ((container, item, callback, index) => {
            item.taskData = this._gantt.getTaskDataByCoreData(item.taskData);
            template.render({
                model: item,
                container: getPublicElement($(container)),
                onRendered: () => {
                    callback(container, index)
                }
            });
            return true
        });
        return createTemplateFunction
    }
}
