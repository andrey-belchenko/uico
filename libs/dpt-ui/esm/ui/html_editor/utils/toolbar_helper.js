/**
 * DevExtreme (esm/ui/html_editor/utils/toolbar_helper.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import localizationMessage from "../../../localization/message";
import {
    getTableOperationHandler,
    hasEmbedContent,
    unfixTableWidth,
    getColumnElements,
    getAutoSizedElements,
    setLineElementsFormat,
    getLineElements,
    getRowElements
} from "./table_helper";
import {
    isDefined,
    isBoolean
} from "../../../core/utils/type";
import {
    each
} from "../../../core/utils/iterator";
import Form from "../../form";
import ButtonGroup from "../../button_group";
import ColorBox from "../../color_box";
import ScrollView from "../../scroll_view";
import {
    getOuterHeight,
    getWidth,
    getOuterWidth
} from "../../../core/utils/size";
import {
    ImageUploader
} from "./image_uploader_helper";
import {
    camelize
} from "../../../core/utils/inflector";
import {
    getWindow
} from "../../../core/utils/window";
import {
    getQuill
} from "../quill_importer";
const MIN_HEIGHT = 400;
const BORDER_STYLES = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
const BORDER_STYLES_TRANSLATED = BORDER_STYLES.map((style => ({
    id: style,
    value: localizationMessage.format(`dxHtmlEditor-borderStyle${camelize(style,true)}`)
})));
const USER_ACTION = "user";
const SILENT_ACTION = "silent";
const DIALOG_COLOR_CAPTION = "dxHtmlEditor-dialogColorCaption";
const DIALOG_BACKGROUND_CAPTION = "dxHtmlEditor-dialogBackgroundCaption";
const DIALOG_LINK_CAPTION = "dxHtmlEditor-dialogLinkCaption";
const DIALOG_TABLE_CAPTION = "dxHtmlEditor-dialogInsertTableCaption";
const DIALOG_LINK_FIELD_URL = "dxHtmlEditor-dialogLinkUrlField";
const DIALOG_LINK_FIELD_TEXT = "dxHtmlEditor-dialogLinkTextField";
const DIALOG_LINK_FIELD_TARGET = "dxHtmlEditor-dialogLinkTargetField";
const DIALOG_LINK_FIELD_TARGET_CLASS = "dx-formdialog-field-target";
const DIALOG_TABLE_FIELD_COLUMNS = "dxHtmlEditor-dialogInsertTableRowsField";
const DIALOG_TABLE_FIELD_ROWS = "dxHtmlEditor-dialogInsertTableColumnsField";
const ICON_MAP = {
    insertHeaderRow: "header",
    clear: "clearformat"
};

function getFormatHandlers(module) {
    return {
        clear: _ref => {
            let {
                event: event
            } = _ref;
            const range = module.quill.getSelection();
            if (range) {
                var _getToolbarModule;
                module.saveValueChangeEvent(event);
                module.quill.removeFormat(range);
                null === (_getToolbarModule = getToolbarModule(module)) || void 0 === _getToolbarModule || _getToolbarModule.updateFormatWidgets()
            }
        },
        link: prepareLinkHandler(module),
        image: prepareImageHandler(module, module.editorInstance.option("imageUpload")),
        color: prepareColorClickHandler(module, "color"),
        background: prepareColorClickHandler(module, "background"),
        orderedList: prepareShortcutHandler(module, "list", "ordered"),
        bulletList: prepareShortcutHandler(module, "list", "bullet"),
        alignLeft: prepareShortcutHandler(module, "align", "left"),
        alignCenter: prepareShortcutHandler(module, "align", "center"),
        alignRight: prepareShortcutHandler(module, "align", "right"),
        alignJustify: prepareShortcutHandler(module, "align", "justify"),
        codeBlock: getDefaultClickHandler(module, "code-block"),
        undo: _ref2 => {
            let {
                event: event
            } = _ref2;
            module.saveValueChangeEvent(event);
            module.quill.history.undo()
        },
        redo: _ref3 => {
            let {
                event: event
            } = _ref3;
            module.saveValueChangeEvent(event);
            module.quill.history.redo()
        },
        increaseIndent: _ref4 => {
            let {
                event: event
            } = _ref4;
            applyFormat(module, ["indent", "+1", USER_ACTION], event)
        },
        decreaseIndent: _ref5 => {
            let {
                event: event
            } = _ref5;
            applyFormat(module, ["indent", "-1", USER_ACTION], event)
        },
        superscript: prepareShortcutHandler(module, "script", "super"),
        subscript: prepareShortcutHandler(module, "script", "sub"),
        insertTable: prepareInsertTableHandler(module),
        insertHeaderRow: getTableOperationHandler(module.quill, "insertHeaderRow"),
        insertRowAbove: getTableOperationHandler(module.quill, "insertRowAbove"),
        insertRowBelow: getTableOperationHandler(module.quill, "insertRowBelow"),
        insertColumnLeft: getTableOperationHandler(module.quill, "insertColumnLeft"),
        insertColumnRight: getTableOperationHandler(module.quill, "insertColumnRight"),
        deleteColumn: getTableOperationHandler(module.quill, "deleteColumn"),
        deleteRow: getTableOperationHandler(module.quill, "deleteRow"),
        deleteTable: getTableOperationHandler(module.quill, "deleteTable"),
        cellProperties: prepareShowFormProperties(module, "cell"),
        tableProperties: prepareShowFormProperties(module, "table")
    }
}

function resetFormDialogOptions(editorInstance, _ref6) {
    let {
        contentTemplate: contentTemplate,
        title: title,
        minHeight: minHeight,
        minWidth: minWidth,
        maxWidth: maxWidth
    } = _ref6;
    editorInstance.formDialogOption({
        contentTemplate: contentTemplate,
        title: title,
        minHeight: minHeight ?? 0,
        minWidth: minWidth ?? 0,
        maxWidth: maxWidth ?? "none"
    })
}

function prepareShowFormProperties(module, type) {
    return $element => {
        var _$element;
        if (!(null !== (_$element = $element) && void 0 !== _$element && _$element.length)) {
            $element = $(getTargetTableNode(module, type))
        }
        const [tableBlot, rowBlot] = module.quill.getModule("table").getTable() ?? [];
        const formats = module.quill.getFormat(module.editorInstance.getSelection(true));
        const tablePropertiesFormConfig = getFormConfigConstructor(type)(module, {
            $element: $element,
            formats: formats,
            tableBlot: tableBlot,
            rowBlot: rowBlot
        });
        const {
            contentTemplate: contentTemplate,
            title: title,
            minHeight: minHeight,
            minWidth: minWidth,
            maxWidth: maxWidth
        } = module.editorInstance._formDialog._popup.option();
        const savedOptions = {
            contentTemplate: contentTemplate,
            title: title,
            minHeight: minHeight,
            minWidth: minWidth,
            maxWidth: maxWidth
        };
        let formInstance;
        module.editorInstance.formDialogOption({
            contentTemplate: container => {
                const $content = $("<div>").appendTo(container);
                const $form = $("<div>").appendTo($content);
                module.editorInstance._createComponent($form, Form, tablePropertiesFormConfig.formOptions);
                module.editorInstance._createComponent($content, ScrollView, {});
                formInstance = $form.dxForm("instance");
                return $content
            },
            title: localizationMessage.format(`dxHtmlEditor-${type}Properties`),
            minHeight: MIN_HEIGHT,
            minWidth: Math.min(800, .9 * getWidth(getWindow()) - 1),
            maxWidth: .9 * getWidth(getWindow())
        });
        const promise = module.editorInstance.showFormDialog();
        promise.done(((formData, event) => {
            module.saveValueChangeEvent(event);
            tablePropertiesFormConfig.applyHandler(formInstance);
            resetFormDialogOptions(module.editorInstance, savedOptions)
        }));
        promise.fail((() => {
            module.quill.focus();
            resetFormDialogOptions(module.editorInstance, savedOptions)
        }))
    }
}

function applyFormat(module, formatArgs, event) {
    module.saveValueChangeEvent(event);
    module.quill.format(...formatArgs)
}

function getTargetTableNode(module, partName) {
    const currentSelectionParts = module.quill.getModule("table").getTable();
    return "table" === partName ? currentSelectionParts[0].domNode : currentSelectionParts[2].domNode
}

function getLinkRange(module, range) {
    const Quill = getQuill();
    const LinkBlot = Quill.import("formats/link");
    let link;
    let linkOffset;
    [link, linkOffset] = module.quill.scroll.descendant(LinkBlot, range.index);
    if (!link && 0 === range.length) {
        [link, linkOffset] = module.quill.scroll.descendant(LinkBlot, range.index - 1);
        if (link) {
            linkOffset += 1
        }
    }
    const result = !link ? null : {
        index: range.index - linkOffset,
        length: link.length()
    };
    return result
}

function getColorFromFormat(value) {
    return Array.isArray(value) ? value[0] : value
}

function prepareLinkHandler(module) {
    return () => {
        var _selection;
        module.quill.focus();
        let selection = module.quill.getSelection();
        const formats = selection ? module.quill.getFormat() : {};
        const isCursorAtLink = void 0 !== formats.link && 0 === (null === (_selection = selection) || void 0 === _selection ? void 0 : _selection.length);
        let href = formats.link || "";
        if (isCursorAtLink) {
            const linkRange = getLinkRange(module, selection);
            if (linkRange) {
                selection = linkRange
            } else {
                href = ""
            }
        }
        const selectionHasEmbedContent = hasEmbedContent(module, selection);
        const formData = {
            href: href,
            text: selection && !selectionHasEmbedContent ? module.quill.getText(selection) : "",
            target: Object.prototype.hasOwnProperty.call(formats, "target") ? !!formats.target : true
        };
        module.editorInstance.formDialogOption("title", localizationMessage.format(DIALOG_LINK_CAPTION));
        const promise = module.editorInstance.showFormDialog({
            formData: formData,
            items: getLinkFormItems(selectionHasEmbedContent)
        });
        promise.done(((formData, event) => {
            if (selection && !selectionHasEmbedContent) {
                const text = formData.text || formData.href;
                const {
                    index: index,
                    length: length
                } = selection;
                formData.text = void 0;
                module.saveValueChangeEvent(event);
                length && module.quill.deleteText(index, length, SILENT_ACTION);
                module.quill.insertText(index, text, "link", formData, USER_ACTION);
                module.quill.setSelection(index + text.length, 0, USER_ACTION)
            } else {
                formData.text = !selection && !formData.text ? formData.href : formData.text;
                applyFormat(module, ["link", formData, USER_ACTION], event)
            }
        }));
        promise.fail((() => {
            module.quill.focus()
        }))
    }
}

function prepareImageHandler(module, imageUploadOption) {
    const imageUploader = new ImageUploader(module, imageUploadOption);
    return () => {
        imageUploader.render()
    }
}

function getLinkFormItems(selectionHasEmbedContent) {
    return [{
        dataField: "href",
        label: {
            text: localizationMessage.format(DIALOG_LINK_FIELD_URL)
        }
    }, {
        dataField: "text",
        label: {
            text: localizationMessage.format(DIALOG_LINK_FIELD_TEXT)
        },
        visible: !selectionHasEmbedContent
    }, {
        dataField: "target",
        editorType: "dxCheckBox",
        editorOptions: {
            text: localizationMessage.format(DIALOG_LINK_FIELD_TARGET)
        },
        cssClass: DIALOG_LINK_FIELD_TARGET_CLASS,
        label: {
            visible: false
        }
    }]
}

function prepareColorClickHandler(module, name) {
    return () => {
        const formData = module.quill.getFormat();
        const caption = "color" === name ? DIALOG_COLOR_CAPTION : DIALOG_BACKGROUND_CAPTION;
        module.editorInstance.formDialogOption("title", localizationMessage.format(caption));
        const promise = module.editorInstance.showFormDialog({
            formData: formData,
            items: [{
                dataField: name,
                editorType: "dxColorView",
                editorOptions: {
                    focusStateEnabled: false
                },
                label: {
                    visible: false
                }
            }]
        });
        promise.done(((formData, event) => {
            applyFormat(module, [name, formData[name], USER_ACTION], event)
        }));
        promise.fail((() => {
            module.quill.focus()
        }))
    }
}

function prepareShortcutHandler(module, name, shortcutValue) {
    return _ref7 => {
        var _getToolbarModule2;
        let {
            event: event
        } = _ref7;
        const formats = module.quill.getFormat();
        const value = formats[name] === shortcutValue ? false : shortcutValue;
        applyFormat(module, [name, value, USER_ACTION], event);
        null === (_getToolbarModule2 = getToolbarModule(module)) || void 0 === _getToolbarModule2 || _getToolbarModule2.updateFormatWidgets(true)
    }
}

function getToolbarModule(module) {
    return module._updateFormatWidget ? module : module.quill.getModule("toolbar")
}

function getDefaultClickHandler(module, name) {
    return _ref8 => {
        var _getToolbarModule3;
        let {
            event: event
        } = _ref8;
        const formats = module.quill.getFormat();
        const value = formats[name];
        const newValue = !(isBoolean(value) ? value : isDefined(value));
        applyFormat(module, [name, newValue, USER_ACTION], event);
        null === (_getToolbarModule3 = getToolbarModule(module)) || void 0 === _getToolbarModule3 || _getToolbarModule3._updateFormatWidget(name, newValue, formats)
    }
}

function insertTableFormItems() {
    return [{
        dataField: "columns",
        editorType: "dxNumberBox",
        editorOptions: {
            min: 1
        },
        label: {
            text: localizationMessage.format(DIALOG_TABLE_FIELD_COLUMNS)
        }
    }, {
        dataField: "rows",
        editorType: "dxNumberBox",
        editorOptions: {
            min: 1
        },
        label: {
            text: localizationMessage.format(DIALOG_TABLE_FIELD_ROWS)
        }
    }]
}

function prepareInsertTableHandler(module) {
    return () => {
        const formats = module.quill.getFormat();
        const isTableFocused = module._tableFormats.some((format => Object.prototype.hasOwnProperty.call(formats, format)));
        if (isTableFocused) {
            module.quill.focus();
            return
        }
        module.editorInstance.formDialogOption("title", localizationMessage.format(DIALOG_TABLE_CAPTION));
        const promise = module.editorInstance.showFormDialog({
            formData: {
                rows: 1,
                columns: 1
            },
            items: insertTableFormItems()
        });
        promise.done(((formData, event) => {
            module.quill.focus();
            const table = module.quill.getModule("table");
            if (table) {
                module.saveValueChangeEvent(event);
                const {
                    columns: columns,
                    rows: rows
                } = formData;
                table.insertTable(columns, rows)
            }
        })).always((() => {
            module.quill.focus()
        }))
    }
}

function getTablePropertiesFormConfig(module, _ref9) {
    let {
        $element: $element,
        formats: formats,
        tableBlot: tableBlot
    } = _ref9;
    const window = getWindow();
    let alignmentEditorInstance;
    let borderColorEditorInstance;
    let backgroundColorEditorInstance;
    const $table = $element;
    const editorInstance = module.editorInstance;
    const startTableWidth = parseInt(formats.tableWidth) || getOuterWidth($table);
    const tableStyles = window.getComputedStyle($table.get(0));
    const startTextAlign = "start" === tableStyles.textAlign ? "left" : tableStyles.textAlign;
    const formOptions = {
        colCount: 2,
        formData: {
            width: startTableWidth,
            height: isDefined(formats.tableHeight) ? parseInt(formats.tableHeight) : getOuterHeight($table),
            backgroundColor: formats.tableBackgroundColor || tableStyles.backgroundColor,
            borderStyle: formats.tableBorderStyle || tableStyles.borderTopStyle,
            borderColor: formats.tableBorderColor || tableStyles.borderTopColor,
            borderWidth: parseInt(isDefined(formats.tableBorderWidth) ? formats.tableBorderWidth : tableStyles.borderTopWidth),
            alignment: formats.tableAlign || startTextAlign
        },
        items: [{
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-border"),
            colCountByScreen: {
                xs: 2
            },
            colCount: 2,
            items: [{
                dataField: "borderStyle",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-style")
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    items: BORDER_STYLES_TRANSLATED,
                    valueExpr: "id",
                    displayExpr: "value",
                    placeholder: "Select style"
                }
            }, {
                dataField: "borderWidth",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderWidth")
                },
                editorOptions: {
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                itemType: "simple",
                dataField: "borderColor",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderColor")
                },
                colSpan: 2,
                template: e => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ColorBox, {
                        editAlphaChannel: true,
                        value: e.component.option("formData").borderColor,
                        onInitialized: e => {
                            borderColorEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-dimensions"),
            colCountByScreen: {
                xs: 2
            },
            colCount: 2,
            items: [{
                dataField: "width",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-width")
                },
                editorOptions: {
                    min: 0,
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                dataField: "height",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-height")
                },
                editorOptions: {
                    min: 0,
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-tableBackground"),
            items: [{
                itemType: "simple",
                dataField: "backgroundColor",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderColor")
                },
                template: e => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ColorBox, {
                        editAlphaChannel: true,
                        value: e.component.option("formData").backgroundColor,
                        onInitialized: e => {
                            backgroundColorEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-alignment"),
            items: [{
                itemType: "simple",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-horizontal")
                },
                template: () => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ButtonGroup, {
                        items: [{
                            value: "left",
                            icon: "alignleft"
                        }, {
                            value: "center",
                            icon: "aligncenter"
                        }, {
                            value: "right",
                            icon: "alignright"
                        }, {
                            value: "justify",
                            icon: "alignjustify"
                        }],
                        keyExpr: "value",
                        selectedItemKeys: [startTextAlign],
                        onInitialized: e => {
                            alignmentEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }],
        showColonAfterLabel: true,
        labelLocation: "top",
        minColWidth: 400
    };
    return {
        formOptions: formOptions,
        applyHandler: formInstance => {
            const formData = formInstance.option("formData");
            const newWidth = formData.width === startTableWidth ? void 0 : formData.width;
            const newHeight = formData.height;
            applyTableDimensionChanges(module, {
                $table: $table,
                newHeight: newHeight,
                newWidth: newWidth,
                tableBlot: tableBlot
            });
            module.editorInstance.format("tableBorderStyle", formData.borderStyle);
            module.editorInstance.format("tableBorderWidth", formData.borderWidth + "px");
            module.editorInstance.format("tableBorderColor", borderColorEditorInstance.option("value"));
            module.editorInstance.format("tableBackgroundColor", backgroundColorEditorInstance.option("value"));
            module.editorInstance.format("tableTextAlign", alignmentEditorInstance.option("selectedItemKeys")[0])
        }
    }
}

function getCellPropertiesFormConfig(module, _ref10) {
    let {
        $element: $element,
        formats: formats,
        tableBlot: tableBlot,
        rowBlot: rowBlot
    } = _ref10;
    const window = getWindow();
    let alignmentEditorInstance;
    let verticalAlignmentEditorInstance;
    let borderColorEditorInstance;
    let backgroundColorEditorInstance;
    const $cell = $element;
    const startCellWidth = isDefined(formats.cellWidth) ? parseInt(formats.cellWidth) : getOuterWidth($cell);
    const editorInstance = module.editorInstance;
    const cellStyles = window.getComputedStyle($cell.get(0));
    const startTextAlign = "start" === cellStyles.textAlign ? "left" : cellStyles.textAlign;
    const formOptions = {
        colCount: 2,
        formData: {
            width: startCellWidth,
            height: isDefined(formats.cellHeight) ? parseInt(formats.cellHeight) : getOuterHeight($cell),
            backgroundColor: getColorFromFormat(formats.cellBackgroundColor) || cellStyles.backgroundColor,
            borderStyle: formats.cellBorderStyle || cellStyles.borderTopStyle,
            borderColor: getColorFromFormat(formats.cellBorderColor) || cellStyles.borderTopColor,
            borderWidth: parseInt(isDefined(formats.cellBorderWidth) ? formats.cellBorderWidth : cellStyles.borderTopWidth),
            alignment: formats.cellTextAlign || startTextAlign,
            verticalAlignment: formats.cellVerticalAlign || cellStyles.verticalAlign,
            verticalPadding: parseInt(isDefined(formats.cellPaddingTop) ? formats.cellPaddingTop : cellStyles.paddingTop),
            horizontalPadding: parseInt(isDefined(formats.cellPaddingLeft) ? formats.cellPaddingLeft : cellStyles.paddingLeft)
        },
        items: [{
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-border"),
            colCountByScreen: {
                xs: 2
            },
            colCount: 2,
            items: [{
                dataField: "borderStyle",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-style")
                },
                editorType: "dxSelectBox",
                editorOptions: {
                    items: BORDER_STYLES_TRANSLATED,
                    valueExpr: "id",
                    displayExpr: "value"
                }
            }, {
                dataField: "borderWidth",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderWidth")
                },
                editorOptions: {
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                itemType: "simple",
                dataField: "borderColor",
                colSpan: 2,
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderColor")
                },
                template: e => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ColorBox, {
                        editAlphaChannel: true,
                        value: e.component.option("formData").borderColor,
                        onInitialized: e => {
                            borderColorEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-dimensions"),
            colCount: 2,
            colCountByScreen: {
                xs: 2
            },
            items: [{
                dataField: "width",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-width")
                },
                editorOptions: {
                    min: 0,
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                dataField: "height",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-height")
                },
                editorOptions: {
                    min: 0,
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                dataField: "verticalPadding",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-paddingVertical")
                },
                editorOptions: {
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }, {
                label: {
                    text: localizationMessage.format("dxHtmlEditor-paddingHorizontal")
                },
                dataField: "horizontalPadding",
                editorOptions: {
                    placeholder: localizationMessage.format("dxHtmlEditor-pixels")
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-tableBackground"),
            items: [{
                itemType: "simple",
                dataField: "backgroundColor",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-borderColor")
                },
                template: e => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ColorBox, {
                        editAlphaChannel: true,
                        value: e.component.option("formData").backgroundColor,
                        onInitialized: e => {
                            backgroundColorEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }, {
            itemType: "group",
            caption: localizationMessage.format("dxHtmlEditor-alignment"),
            colCount: 2,
            items: [{
                itemType: "simple",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-horizontal")
                },
                template: () => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ButtonGroup, {
                        items: [{
                            value: "left",
                            icon: "alignleft"
                        }, {
                            value: "center",
                            icon: "aligncenter"
                        }, {
                            value: "right",
                            icon: "alignright"
                        }, {
                            value: "justify",
                            icon: "alignjustify"
                        }],
                        keyExpr: "value",
                        selectedItemKeys: [startTextAlign],
                        onInitialized: e => {
                            alignmentEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }, {
                itemType: "simple",
                label: {
                    text: localizationMessage.format("dxHtmlEditor-vertical")
                },
                template: () => {
                    const $content = $("<div>");
                    editorInstance._createComponent($content, ButtonGroup, {
                        items: [{
                            value: "top",
                            icon: "verticalaligntop"
                        }, {
                            value: "middle",
                            icon: "verticalaligncenter"
                        }, {
                            value: "bottom",
                            icon: "verticalalignbottom"
                        }],
                        keyExpr: "value",
                        selectedItemKeys: [cellStyles.verticalAlign],
                        onInitialized: e => {
                            verticalAlignmentEditorInstance = e.component
                        }
                    });
                    return $content
                }
            }]
        }],
        showColonAfterLabel: true,
        labelLocation: "top",
        minColWidth: 400
    };
    return {
        formOptions: formOptions,
        applyHandler: formInstance => {
            const formData = formInstance.option("formData");
            const newWidth = formData.width === parseInt(startCellWidth) ? void 0 : formData.width;
            const newHeight = formData.height;
            applyCellDimensionChanges(module, {
                $cell: $cell,
                newHeight: newHeight,
                newWidth: newWidth,
                tableBlot: tableBlot,
                rowBlot: rowBlot
            });
            module.editorInstance.format("cellBorderWidth", formData.borderWidth + "px");
            module.editorInstance.format("cellBorderColor", borderColorEditorInstance.option("value"));
            module.editorInstance.format("cellBorderStyle", formData.borderStyle);
            module.editorInstance.format("cellBackgroundColor", backgroundColorEditorInstance.option("value"));
            module.editorInstance.format("cellTextAlign", alignmentEditorInstance.option("selectedItemKeys")[0]);
            module.editorInstance.format("cellVerticalAlign", verticalAlignmentEditorInstance.option("selectedItemKeys")[0]);
            module.editorInstance.format("cellPaddingLeft", formData.horizontalPadding + "px");
            module.editorInstance.format("cellPaddingRight", formData.horizontalPadding + "px");
            module.editorInstance.format("cellPaddingTop", formData.verticalPadding + "px");
            module.editorInstance.format("cellPaddingBottom", formData.verticalPadding + "px")
        }
    }
}

function getFormConfigConstructor(type) {
    return "cell" === type ? getCellPropertiesFormConfig : getTablePropertiesFormConfig
}

function applyTableDimensionChanges(module, _ref11) {
    let {
        $table: $table,
        newHeight: newHeight,
        newWidth: newWidth,
        tableBlot: tableBlot
    } = _ref11;
    if (isDefined(newWidth)) {
        const autoWidthColumns = getAutoSizedElements($table);
        if (autoWidthColumns.length > 0) {
            module.editorInstance.format("tableWidth", newWidth + "px")
        } else {
            const $columns = getColumnElements($table);
            const oldTableWidth = getOuterWidth($table);
            unfixTableWidth($table, {
                tableBlot: tableBlot
            });
            each($columns, ((i, element) => {
                const $element = $(element);
                const newElementWidth = newWidth / oldTableWidth * getOuterWidth($element);
                const $lineElements = getLineElements($table, $element.index(), "horizontal");
                setLineElementsFormat(module, {
                    elements: $lineElements,
                    property: "width",
                    value: newElementWidth
                })
            }))
        }
    }
    const autoHeightRows = getAutoSizedElements($table, "vertical");
    if ((null === autoHeightRows || void 0 === autoHeightRows ? void 0 : autoHeightRows.length) > 0) {
        tableBlot.format("tableHeight", newHeight + "px")
    } else {
        const $rows = getRowElements($table);
        const oldTableHeight = getOuterHeight($table);
        each($rows, ((i, element) => {
            const $element = $(element);
            const newElementHeight = newHeight / oldTableHeight * getOuterHeight($element);
            const $lineElements = getLineElements($table, i, "vertical");
            setLineElementsFormat(module, {
                elements: $lineElements,
                property: "height",
                value: newElementHeight
            })
        }))
    }
}

function applyCellDimensionChanges(module, _ref12) {
    let {
        $cell: $cell,
        newHeight: newHeight,
        newWidth: newWidth,
        tableBlot: tableBlot,
        rowBlot: rowBlot
    } = _ref12;
    const $table = $($cell.closest("table"));
    if (isDefined(newWidth)) {
        const index = $($cell).index();
        let $verticalCells = getLineElements($table, index);
        const widthDiff = newWidth - getOuterWidth($cell);
        const tableWidth = getOuterWidth($table);
        if (newWidth > tableWidth) {
            unfixTableWidth($table, {
                tableBlot: tableBlot
            })
        }
        setLineElementsFormat(module, {
            elements: $verticalCells,
            property: "width",
            value: newWidth
        });
        const $nextColumnCell = $cell.next();
        const shouldUpdateNearestColumnWidth = 0 === getAutoSizedElements($table).length;
        if (shouldUpdateNearestColumnWidth) {
            unfixTableWidth($table, {
                tableBlot: tableBlot
            });
            if (1 === $nextColumnCell.length) {
                $verticalCells = getLineElements($table, index + 1);
                const nextColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
                setLineElementsFormat(module, {
                    elements: $verticalCells,
                    property: "width",
                    value: Math.max(nextColumnWidth, 0)
                })
            } else {
                const $prevColumnCell = $cell.prev();
                if (1 === $prevColumnCell.length) {
                    $verticalCells = getLineElements($table, index - 1);
                    const prevColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
                    setLineElementsFormat(module, {
                        elements: $verticalCells,
                        property: "width",
                        value: Math.max(prevColumnWidth, 0)
                    })
                }
            }
        }
    }
    rowBlot.children.forEach((rowCell => {
        rowCell.format("cellHeight", newHeight + "px")
    }));
    const autoHeightRows = getAutoSizedElements($table, "vertical");
    if (0 === autoHeightRows.length) {
        $table.css("height", "auto")
    }
}
export {
    getFormatHandlers,
    getDefaultClickHandler,
    ICON_MAP,
    applyFormat
};
