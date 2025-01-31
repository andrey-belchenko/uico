/**
 * DevExtreme (esm/__internal/scheduler/m_publisher_mixin.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const publisherMixin = {
    notifyObserver(subject, args) {
        const observer = this.option("observer");
        if (observer) {
            observer.fire(subject, args)
        }
    },
    invoke() {
        const observer = this.option("observer");
        if (observer) {
            return observer.fire.apply(observer, arguments)
        }
    }
};
export default publisherMixin;
