/**
 * DevExtreme (esm/ui/html_editor/formats/mention.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import Quill from "dpt-ui-quill";
import $ from "../../../core/renderer";
import TemplatesStorage from "../utils/templates_storage";
let Mention = {};
if (Quill) {
    const Embed = Quill.import("blots/embed");
    const MENTION_CLASS = "dx-mention";
    Mention = class Mention extends Embed {
        constructor(scroll, node) {
            super(scroll, node);
            this.renderContent(this.contentNode, Mention.value(node))
        }
        static create(data) {
            const node = super.create();
            node.setAttribute("spellcheck", false);
            node.dataset.marker = data.marker;
            node.dataset.mentionValue = data.value;
            node.dataset.id = data.id;
            return node
        }
        static value(node) {
            return {
                marker: node.dataset.marker,
                id: node.dataset.id,
                value: node.dataset.mentionValue
            }
        }
        renderContent(node, data) {
            const template = Mention._templatesStorage.get({
                editorKey: data.keyInTemplateStorage,
                marker: data.marker
            });
            if (template) {
                template.render({
                    model: data,
                    container: node
                })
            } else {
                this.baseContentRender(node, data)
            }
        }
        baseContentRender(node, data) {
            const $marker = $("<span>").text(data.marker);
            $(node).append($marker).append(data.value)
        }
        static addTemplate(data, template) {
            this._templatesStorage.set(data, template)
        }
        static removeTemplate(data) {
            this._templatesStorage.delete(data)
        }
    };
    Mention.blotName = "mention";
    Mention.tagName = "span";
    Mention.className = MENTION_CLASS;
    Mention._templatesStorage = new TemplatesStorage
}
export default Mention;
