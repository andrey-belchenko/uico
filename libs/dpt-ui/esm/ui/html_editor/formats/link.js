/**
 * DevExtreme (esm/ui/html_editor/formats/link.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Quill from "dpt-ui-quill";
import {
    isObject
} from "../../../core/utils/type";
let ExtLink = {};
if (Quill) {
    const Link = Quill.import("formats/link");
    ExtLink = class ExtLink extends Link {
        static create(data) {
            const HREF = (null === data || void 0 === data ? void 0 : data.href) ?? data;
            const node = super.create(HREF);
            if (isObject(data)) {
                if (data.text) {
                    node.innerText = data.text
                }
                if (!data.target) {
                    node.removeAttribute("target")
                }
            }
            return node
        }
        static formats(domNode) {
            return {
                href: domNode.getAttribute("href"),
                target: domNode.getAttribute("target")
            }
        }
        formats() {
            const formats = super.formats();
            const {
                href: href,
                target: target
            } = ExtLink.formats(this.domNode);
            formats.link = href;
            formats.target = target;
            return formats
        }
        format(name, value) {
            if ("link" === name && isObject(value)) {
                if (value.text) {
                    this.domNode.innerText = value.text
                }
                if (value.target) {
                    this.domNode.setAttribute("target", "_blank")
                } else {
                    this.domNode.removeAttribute("target")
                }
                this.domNode.setAttribute("href", value.href)
            } else {
                super.format(name, value)
            }
        }
        static value(domNode) {
            return {
                href: domNode.getAttribute("href"),
                text: domNode.innerText,
                target: !!domNode.getAttribute("target")
            }
        }
    }
}
export default ExtLink;
