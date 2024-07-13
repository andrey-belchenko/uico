/**
 * DevExtreme (esm/__internal/scheduler/shaders/m_current_time_shader.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
import $ from "../../../core/renderer";
const DATE_TIME_SHADER_CLASS = "dx-scheduler-date-time-shader";
class CurrentTimeShader {
    constructor(_workSpace) {
        this._workSpace = _workSpace;
        this._$container = this._workSpace._dateTableScrollable.$content()
    }
    render() {
        this.initShaderElements();
        this.renderShader();
        this._shader.forEach((shader => {
            this._$container.append(shader)
        }))
    }
    initShaderElements() {
        this._$shader = this.createShader();
        this._shader = [];
        this._shader.push(this._$shader)
    }
    renderShader() {}
    createShader() {
        return $("<div>").addClass(DATE_TIME_SHADER_CLASS)
    }
    clean() {
        this._$container && this._$container.find(`.${DATE_TIME_SHADER_CLASS}`).remove()
    }
}
export default CurrentTimeShader;
