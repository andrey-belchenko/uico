/**
 * DevExtreme (esm/ui/file_uploader.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    getOffset,
    getWidth
} from "../core/utils/size";
import $ from "../core/renderer";
import Guid from "../core/guid";
import {
    getWindow
} from "../core/utils/window";
import eventsEngine from "../events/core/events_engine";
import registerComponent from "../core/component_registrator";
import Callbacks from "../core/utils/callbacks";
import {
    isDefined,
    isFunction,
    isNumeric
} from "../core/utils/type";
import {
    each
} from "../core/utils/iterator";
import {
    extend
} from "../core/utils/extend";
import {
    Deferred,
    fromPromise
} from "../core/utils/deferred";
import ajax from "../core/utils/ajax";
import Editor from "./editor/editor";
import Button from "./button";
import ProgressBar from "./progress_bar";
import devices from "../core/devices";
import {
    addNamespace,
    isTouchEvent
} from "../events/utils/index";
import {
    name as clickEventName
} from "../events/click";
import messageLocalization from "../localization/message";
import {
    isFluent,
    isMaterial
} from "./themes";
import domAdapter from "../core/dom_adapter";
const window = getWindow();
const FILEUPLOADER_CLASS = "dx-fileuploader";
const FILEUPLOADER_EMPTY_CLASS = "dx-fileuploader-empty";
const FILEUPLOADER_SHOW_FILE_LIST_CLASS = "dx-fileuploader-show-file-list";
const FILEUPLOADER_DRAGOVER_CLASS = "dx-fileuploader-dragover";
const FILEUPLOADER_WRAPPER_CLASS = "dx-fileuploader-wrapper";
const FILEUPLOADER_CONTAINER_CLASS = "dx-fileuploader-container";
const FILEUPLOADER_CONTENT_CLASS = "dx-fileuploader-content";
const FILEUPLOADER_INPUT_WRAPPER_CLASS = "dx-fileuploader-input-wrapper";
const FILEUPLOADER_INPUT_CONTAINER_CLASS = "dx-fileuploader-input-container";
const FILEUPLOADER_INPUT_LABEL_CLASS = "dx-fileuploader-input-label";
const FILEUPLOADER_INPUT_CLASS = "dx-fileuploader-input";
const FILEUPLOADER_FILES_CONTAINER_CLASS = "dx-fileuploader-files-container";
const FILEUPLOADER_FILE_CONTAINER_CLASS = "dx-fileuploader-file-container";
const FILEUPLOADER_FILE_INFO_CLASS = "dx-fileuploader-file-info";
const FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = "dx-fileuploader-file-status-message";
const FILEUPLOADER_FILE_CLASS = "dx-fileuploader-file";
const FILEUPLOADER_FILE_NAME_CLASS = "dx-fileuploader-file-name";
const FILEUPLOADER_FILE_SIZE_CLASS = "dx-fileuploader-file-size";
const FILEUPLOADER_BUTTON_CLASS = "dx-fileuploader-button";
const FILEUPLOADER_BUTTON_CONTAINER_CLASS = "dx-fileuploader-button-container";
const FILEUPLOADER_CANCEL_BUTTON_CLASS = "dx-fileuploader-cancel-button";
const FILEUPLOADER_UPLOAD_BUTTON_CLASS = "dx-fileuploader-upload-button";
const FILEUPLOADER_INVALID_CLASS = "dx-fileuploader-invalid";
const FILEUPLOADER_AFTER_LOAD_DELAY = 400;
const FILEUPLOADER_CHUNK_META_DATA_NAME = "chunkMetadata";
const DRAG_EVENT_DELTA = 1;
let renderFileUploaderInput = () => $("<input>").attr("type", "file");
const isFormDataSupported = () => !!window.FormData;
class FileUploader extends Editor {
    _supportedKeys() {
        const click = e => {
            e.preventDefault();
            const $selectButton = this._selectButton.$element();
            eventsEngine.trigger($selectButton, clickEventName)
        };
        return extend(super._supportedKeys(), {
            space: click,
            enter: click
        })
    }
    _setOptionsByReference() {
        super._setOptionsByReference();
        extend(this._optionsByReference, {
            value: true
        })
    }
    _getDefaultOptions() {
        return extend(super._getDefaultOptions(), {
            chunkSize: 0,
            value: [],
            selectButtonText: messageLocalization.format("dxFileUploader-selectFile"),
            uploadButtonText: messageLocalization.format("dxFileUploader-upload"),
            labelText: messageLocalization.format("dxFileUploader-dropFile"),
            name: "files[]",
            multiple: false,
            accept: "",
            uploadUrl: "/",
            allowCanceling: true,
            showFileList: true,
            progress: 0,
            dialogTrigger: void 0,
            dropZone: void 0,
            readyToUploadMessage: messageLocalization.format("dxFileUploader-readyToUpload"),
            uploadedMessage: messageLocalization.format("dxFileUploader-uploaded"),
            uploadFailedMessage: messageLocalization.format("dxFileUploader-uploadFailedMessage"),
            uploadAbortedMessage: messageLocalization.format("dxFileUploader-uploadAbortedMessage"),
            uploadMode: "instantly",
            uploadMethod: "POST",
            uploadHeaders: {},
            uploadCustomData: {},
            onBeforeSend: null,
            onUploadStarted: null,
            onUploaded: null,
            onFilesUploaded: null,
            onProgress: null,
            onUploadError: null,
            onUploadAborted: null,
            onDropZoneEnter: null,
            onDropZoneLeave: null,
            allowedFileExtensions: [],
            maxFileSize: 0,
            minFileSize: 0,
            inputAttr: {},
            invalidFileExtensionMessage: messageLocalization.format("dxFileUploader-invalidFileExtension"),
            invalidMaxFileSizeMessage: messageLocalization.format("dxFileUploader-invalidMaxFileSize"),
            invalidMinFileSizeMessage: messageLocalization.format("dxFileUploader-invalidMinFileSize"),
            extendSelection: true,
            validationMessageMode: "always",
            uploadFile: null,
            uploadChunk: null,
            abortUpload: null,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            hoverStateEnabled: true,
            useNativeInputClick: false,
            useDragOver: true,
            nativeDropSupported: true,
            _uploadButtonType: "normal",
            _buttonStylingMode: "contained"
        })
    }
    _defaultOptionsRules() {
        return super._defaultOptionsRules().concat([{
            device: () => "desktop" === devices.real().deviceType && !devices.isSimulator(),
            options: {
                focusStateEnabled: true
            }
        }, {
            device: [{
                platform: "android"
            }],
            options: {
                validationMessageOffset: {
                    v: 0
                }
            }
        }, {
            device: () => "desktop" !== devices.real().deviceType,
            options: {
                useDragOver: false
            }
        }, {
            device: () => !isFormDataSupported(),
            options: {
                uploadMode: "useForm"
            }
        }, {
            device: () => "desktop" !== devices.real().deviceType,
            options: {
                nativeDropSupported: false
            }
        }, {
            device: () => isMaterial(),
            options: {
                _uploadButtonType: "default"
            }
        }, {
            device: () => isFluent(),
            options: {
                _buttonStylingMode: "text"
            }
        }])
    }
    _initOptions(options) {
        const isLabelTextDefined = "labelText" in options;
        super._initOptions(options);
        if (!isLabelTextDefined && !this._shouldDragOverBeRendered()) {
            this.option("labelText", "")
        }
    }
    _init() {
        super._init();
        this._initFileInput();
        this._initLabel();
        this._setUploadStrategy();
        this._createFiles();
        this._createBeforeSendAction();
        this._createUploadStartedAction();
        this._createUploadedAction();
        this._createFilesUploadedAction();
        this._createProgressAction();
        this._createUploadErrorAction();
        this._createUploadAbortedAction();
        this._createDropZoneEnterAction();
        this._createDropZoneLeaveAction()
    }
    _setUploadStrategy() {
        let strategy = null;
        if (this.option("chunkSize") > 0) {
            const uploadChunk = this.option("uploadChunk");
            strategy = uploadChunk && isFunction(uploadChunk) ? new CustomChunksFileUploadStrategy(this) : new DefaultChunksFileUploadStrategy(this)
        } else {
            const uploadFile = this.option("uploadFile");
            strategy = uploadFile && isFunction(uploadFile) ? new CustomWholeFileUploadStrategy(this) : new DefaultWholeFileUploadStrategy(this)
        }
        this._uploadStrategy = strategy
    }
    _initFileInput() {
        this._isCustomClickEvent = false;
        const {
            multiple: multiple,
            accept: accept,
            hint: hint
        } = this.option();
        if (!this._$fileInput) {
            this._$fileInput = renderFileUploaderInput();
            eventsEngine.on(this._$fileInput, "change", this._inputChangeHandler.bind(this));
            eventsEngine.on(this._$fileInput, "click", (e => {
                e.stopPropagation();
                this._resetInputValue();
                return this.option("useNativeInputClick") || this._isCustomClickEvent
            }))
        }
        const inputProps = {
            multiple: multiple,
            accept: accept,
            tabIndex: -1
        };
        if (isDefined(hint)) {
            inputProps.title = hint
        }
        this._$fileInput.prop(inputProps)
    }
    _inputChangeHandler() {
        if (this._doPreventInputChange) {
            return
        }
        const fileName = this._$fileInput.val().replace(/^.*\\/, "");
        const files = this._$fileInput.prop("files");
        if (files && !files.length && "useForm" !== this.option("uploadMode")) {
            return
        }
        const value = files ? this._getFiles(files) : [{
            name: fileName
        }];
        this._changeValue(value);
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    }
    _shouldFileListBeExtended() {
        return "useForm" !== this.option("uploadMode") && this.option("extendSelection") && this.option("multiple")
    }
    _changeValue(value) {
        const files = this._shouldFileListBeExtended() ? this.option("value").slice() : [];
        this.option("value", files.concat(value))
    }
    _getFiles(fileList) {
        const values = [];
        each(fileList, ((_, value) => values.push(value)));
        return values
    }
    _getFile(fileData) {
        const targetFileValue = isNumeric(fileData) ? this.option("value")[fileData] : fileData;
        return this._files.filter((file => file.value === targetFileValue))[0]
    }
    _initLabel() {
        if (!this._$inputLabel) {
            this._$inputLabel = $("<div>")
        }
        this._updateInputLabelText()
    }
    _updateInputLabelText() {
        const correctedValue = this._isInteractionDisabled() ? "" : this.option("labelText");
        this._$inputLabel.text(correctedValue)
    }
    _focusTarget() {
        return this.$element().find(".dx-fileuploader-button")
    }
    _getSubmitElement() {
        return this._$fileInput
    }
    _initMarkup() {
        super._initMarkup();
        this.$element().addClass("dx-fileuploader");
        this._renderWrapper();
        this._renderInputWrapper();
        this._renderSelectButton();
        this._renderInputContainer();
        this._renderUploadButton();
        this._preventRecreatingFiles = true;
        this._activeDropZone = null
    }
    _render() {
        this._preventRecreatingFiles = false;
        this._attachDragEventHandlers(this._$inputWrapper);
        this._attachDragEventHandlers(this.option("dropZone"));
        this._renderFiles();
        super._render()
    }
    _createFileProgressBar(file) {
        file.progressBar = this._createProgressBar(file.value.size);
        file.progressBar.$element().appendTo(file.$file);
        this._initStatusMessage(file);
        this._ensureCancelButtonInitialized(file)
    }
    _setStatusMessage(file, message) {
        setTimeout((() => {
            if (this.option("showFileList")) {
                if (file.$statusMessage) {
                    file.$statusMessage.text(message);
                    file.$statusMessage.css("display", "");
                    file.progressBar.$element().remove()
                }
            }
        }), 400)
    }
    _getUploadAbortedStatusMessage() {
        return "instantly" === this.option("uploadMode") ? this.option("uploadAbortedMessage") : this.option("readyToUploadMessage")
    }
    _createFiles() {
        const value = this.option("value");
        if (this._files && (0 === value.length || !this._shouldFileListBeExtended())) {
            this._preventFilesUploading(this._files);
            this._files = null
        }
        if (!this._files) {
            this._files = []
        }
        each(value.slice(this._files.length), ((_, value) => {
            const file = this._createFile(value);
            this._validateFile(file);
            this._files.push(file)
        }))
    }
    _preventFilesUploading(files) {
        files.forEach((file => this._uploadStrategy.abortUpload(file)))
    }
    _validateFile(file) {
        file.isValidFileExtension = this._validateFileExtension(file);
        file.isValidMinSize = this._validateMinFileSize(file);
        file.isValidMaxSize = this._validateMaxFileSize(file)
    }
    _validateFileExtension(file) {
        const allowedExtensions = this.option("allowedFileExtensions");
        const accept = this.option("accept");
        const allowedTypes = this._getAllowedFileTypes(accept);
        const fileExtension = file.value.name.substring(file.value.name.lastIndexOf(".")).toLowerCase();
        if (0 !== accept.length && !this._isFileTypeAllowed(file.value, allowedTypes)) {
            return false
        }
        if (0 === allowedExtensions.length) {
            return true
        }
        for (let i = 0; i < allowedExtensions.length; i++) {
            if (fileExtension === allowedExtensions[i].toLowerCase()) {
                return true
            }
        }
        return false
    }
    _validateMaxFileSize(file) {
        const fileSize = file.value.size;
        const maxFileSize = this.option("maxFileSize");
        return maxFileSize > 0 ? fileSize <= maxFileSize : true
    }
    _validateMinFileSize(file) {
        const fileSize = file.value.size;
        const minFileSize = this.option("minFileSize");
        return minFileSize > 0 ? fileSize >= minFileSize : true
    }
    _createBeforeSendAction() {
        this._beforeSendAction = this._createActionByOption("onBeforeSend", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadStartedAction() {
        this._uploadStartedAction = this._createActionByOption("onUploadStarted", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadedAction() {
        this._uploadedAction = this._createActionByOption("onUploaded", {
            excludeValidators: ["readOnly"]
        })
    }
    _createFilesUploadedAction() {
        this._filesUploadedAction = this._createActionByOption("onFilesUploaded", {
            excludeValidators: ["readOnly"]
        })
    }
    _createProgressAction() {
        this._progressAction = this._createActionByOption("onProgress", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadAbortedAction() {
        this._uploadAbortedAction = this._createActionByOption("onUploadAborted", {
            excludeValidators: ["readOnly"]
        })
    }
    _createUploadErrorAction() {
        this._uploadErrorAction = this._createActionByOption("onUploadError", {
            excludeValidators: ["readOnly"]
        })
    }
    _createDropZoneEnterAction() {
        this._dropZoneEnterAction = this._createActionByOption("onDropZoneEnter")
    }
    _createDropZoneLeaveAction() {
        this._dropZoneLeaveAction = this._createActionByOption("onDropZoneLeave")
    }
    _createFile(value) {
        return {
            value: value,
            loadedSize: 0,
            onProgress: Callbacks(),
            onAbort: Callbacks(),
            onLoad: Callbacks(),
            onError: Callbacks(),
            onLoadStart: Callbacks(),
            isValidFileExtension: true,
            isValidMaxSize: true,
            isValidMinSize: true,
            isValid() {
                return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize
            },
            isInitialized: false
        }
    }
    _resetFileState(file) {
        file.isAborted = false;
        file.uploadStarted = false;
        file.isStartLoad = false;
        file.loadedSize = 0;
        file.chunksData = void 0;
        file.request = void 0
    }
    _renderFiles() {
        var _this$_validationMess;
        const value = this.option("value");
        if (!this._$filesContainer) {
            this._$filesContainer = $("<div>").addClass("dx-fileuploader-files-container").appendTo(this._$content)
        } else if (!this._shouldFileListBeExtended() || 0 === value.length) {
            this._$filesContainer.empty()
        }
        const showFileList = this.option("showFileList");
        if (showFileList) {
            each(this._files, ((_, file) => {
                if (!file.$file) {
                    this._renderFile(file)
                }
            }))
        }
        this.$element().toggleClass("dx-fileuploader-show-file-list", showFileList);
        this._toggleFileUploaderEmptyClassName();
        this._updateFileNameMaxWidth();
        null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess || _this$_validationMess.repaint()
    }
    _renderFile(file) {
        const value = file.value;
        const $fileContainer = $("<div>").addClass("dx-fileuploader-file-container").appendTo(this._$filesContainer);
        this._renderFileButtons(file, $fileContainer);
        file.$file = $("<div>").addClass("dx-fileuploader-file").appendTo($fileContainer);
        const $fileInfo = $("<div>").addClass("dx-fileuploader-file-info").appendTo(file.$file);
        file.$statusMessage = $("<div>").addClass("dx-fileuploader-file-status-message").appendTo(file.$file);
        $("<div>").addClass("dx-fileuploader-file-name").text(value.name).appendTo($fileInfo);
        if (isDefined(value.size)) {
            $("<div>").addClass("dx-fileuploader-file-size").text(this._getFileSize(value.size)).appendTo($fileInfo)
        }
        if (file.isValid()) {
            file.$statusMessage.text(this.option("readyToUploadMessage"))
        } else {
            if (!file.isValidFileExtension) {
                file.$statusMessage.append(this._createValidationElement("invalidFileExtensionMessage"))
            }
            if (!file.isValidMaxSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMaxFileSizeMessage"))
            }
            if (!file.isValidMinSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMinFileSizeMessage"))
            }
            $fileContainer.addClass("dx-fileuploader-invalid")
        }
    }
    _createValidationElement(key) {
        return $("<span>").text(this.option(key))
    }
    _updateFileNameMaxWidth() {
        const cancelButtonsCount = this.option("allowCanceling") && "useForm" !== this.option("uploadMode") ? 1 : 0;
        const uploadButtonsCount = "useButtons" === this.option("uploadMode") ? 1 : 0;
        const filesContainerWidth = getWidth(this._$filesContainer.find(".dx-fileuploader-file-container").first()) || getWidth(this._$filesContainer);
        const $buttonContainer = this._$filesContainer.find(".dx-fileuploader-button-container").eq(0);
        const buttonsWidth = getWidth($buttonContainer) * (cancelButtonsCount + uploadButtonsCount);
        const $fileSize = this._$filesContainer.find(".dx-fileuploader-file-size").eq(0);
        const prevFileSize = $fileSize.text();
        $fileSize.text("1000 Mb");
        const fileSizeWidth = getWidth($fileSize);
        $fileSize.text(prevFileSize);
        this._$filesContainer.find(".dx-fileuploader-file-name").css("maxWidth", filesContainerWidth - buttonsWidth - fileSizeWidth)
    }
    _renderFileButtons(file, $container) {
        const $cancelButton = this._getCancelButton(file);
        $cancelButton && $container.append($cancelButton);
        const $uploadButton = this._getUploadButton(file);
        $uploadButton && $container.append($uploadButton)
    }
    _getCancelButton(file) {
        if ("useForm" === this.option("uploadMode")) {
            return null
        }
        const {
            allowCanceling: allowCanceling,
            readOnly: readOnly,
            hoverStateEnabled: hoverStateEnabled,
            _buttonStylingMode: _buttonStylingMode
        } = this.option();
        file.cancelButton = this._createComponent($("<div>").addClass("dx-fileuploader-button dx-fileuploader-cancel-button"), Button, {
            onClick: () => this._removeFile(file),
            icon: "close",
            visible: allowCanceling,
            disabled: readOnly,
            integrationOptions: {},
            hoverStateEnabled: hoverStateEnabled,
            stylingMode: _buttonStylingMode
        });
        return $("<div>").addClass("dx-fileuploader-button-container").append(file.cancelButton.$element())
    }
    _getUploadButton(file) {
        if (!file.isValid() || "useButtons" !== this.option("uploadMode")) {
            return null
        }
        const {
            hoverStateEnabled: hoverStateEnabled,
            _buttonStylingMode: _buttonStylingMode
        } = this.option();
        file.uploadButton = this._createComponent($("<div>").addClass("dx-fileuploader-button dx-fileuploader-upload-button"), Button, {
            onClick: () => this._uploadFile(file),
            icon: "upload",
            hoverStateEnabled: hoverStateEnabled,
            stylingMode: _buttonStylingMode
        });
        file.onLoadStart.add((() => file.uploadButton.option({
            visible: false,
            disabled: true
        })));
        file.onAbort.add((() => file.uploadButton.option({
            visible: true,
            disabled: false
        })));
        return $("<div>").addClass("dx-fileuploader-button-container").append(file.uploadButton.$element())
    }
    _removeFile(file) {
        var _file$$file;
        null === (_file$$file = file.$file) || void 0 === _file$$file || _file$$file.parent().remove();
        this._files.splice(this._files.indexOf(file), 1);
        const value = this.option("value").slice();
        value.splice(value.indexOf(file.value), 1);
        this._preventRecreatingFiles = true;
        this.option("value", value);
        this._preventRecreatingFiles = false;
        this._toggleFileUploaderEmptyClassName();
        this._resetInputValue(true)
    }
    removeFile(fileData) {
        if ("useForm" === this.option("uploadMode") || !isDefined(fileData)) {
            return
        }
        const file = this._getFile(fileData);
        if (file) {
            if (file.uploadStarted) {
                this._preventFilesUploading([file])
            }
            this._removeFile(file)
        }
    }
    _toggleFileUploaderEmptyClassName() {
        this.$element().toggleClass("dx-fileuploader-empty", !this._files.length || this._hasInvalidFile(this._files))
    }
    _hasInvalidFile(files) {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].isValid()) {
                return true
            }
        }
        return false
    }
    _getFileSize(size) {
        let i = 0;
        const labels = [messageLocalization.format("dxFileUploader-bytes"), messageLocalization.format("dxFileUploader-kb"), messageLocalization.format("dxFileUploader-Mb"), messageLocalization.format("dxFileUploader-Gb")];
        const count = labels.length - 1;
        while (i < count && size >= 1024) {
            size /= 1024;
            i++
        }
        return Math.round(size) + " " + labels[i]
    }
    _renderSelectButton() {
        const $button = $("<div>").addClass("dx-fileuploader-button").appendTo(this._$inputWrapper);
        this._selectButton = this._createComponent($button, Button, {
            text: this.option("selectButtonText"),
            focusStateEnabled: false,
            integrationOptions: {},
            disabled: this.option("readOnly"),
            hoverStateEnabled: this.option("hoverStateEnabled")
        });
        this._selectFileDialogHandler = this._selectButtonClickHandler.bind(this);
        if ("desktop" === devices.real().deviceType) {
            this._selectButton.option("onClick", this._selectFileDialogHandler)
        } else {
            this._attachSelectFileDialogHandler(this._selectButton.$element())
        }
        this._attachSelectFileDialogHandler(this.option("dialogTrigger"))
    }
    _selectButtonClickHandler() {
        if (this.option("useNativeInputClick")) {
            return
        }
        if (this._isInteractionDisabled()) {
            return false
        }
        this._isCustomClickEvent = true;
        eventsEngine.trigger(this._$fileInput, "click");
        this._isCustomClickEvent = false
    }
    _attachSelectFileDialogHandler(target) {
        if (!isDefined(target)) {
            return
        }
        this._detachSelectFileDialogHandler(target);
        eventsEngine.on($(target), "click", this._selectFileDialogHandler)
    }
    _detachSelectFileDialogHandler(target) {
        if (!isDefined(target)) {
            return
        }
        eventsEngine.off($(target), "click", this._selectFileDialogHandler)
    }
    _renderUploadButton() {
        if ("useButtons" !== this.option("uploadMode")) {
            return
        }
        const $uploadButton = $("<div>").addClass("dx-fileuploader-button").addClass("dx-fileuploader-upload-button").appendTo(this._$content);
        this._uploadButton = this._createComponent($uploadButton, Button, {
            text: this.option("uploadButtonText"),
            onClick: this._uploadButtonClickHandler.bind(this),
            type: this.option("_uploadButtonType"),
            integrationOptions: {},
            hoverStateEnabled: this.option("hoverStateEnabled")
        })
    }
    _uploadButtonClickHandler() {
        this._uploadFiles()
    }
    _shouldDragOverBeRendered() {
        return !this.option("readOnly") && ("useForm" !== this.option("uploadMode") || this.option("nativeDropSupported"))
    }
    _isInteractionDisabled() {
        return this.option("readOnly") || this.option("disabled")
    }
    _renderInputContainer() {
        this._$inputContainer = $("<div>").addClass("dx-fileuploader-input-container").appendTo(this._$inputWrapper);
        this._$fileInput.addClass("dx-fileuploader-input");
        this._renderInput();
        const labelId = `dx-fileuploader-input-label-${new Guid}`;
        this._$inputLabel.attr("id", labelId).addClass("dx-fileuploader-input-label").appendTo(this._$inputContainer);
        this.setAria("labelledby", labelId, this._$fileInput)
    }
    _renderInput() {
        if (this.option("useNativeInputClick")) {
            this._selectButton.option("template", this._selectButtonInputTemplate.bind(this))
        } else {
            this._$fileInput.appendTo(this._$inputContainer);
            this._selectButton.option("template", "content")
        }
        this._applyInputAttributes(this.option("inputAttr"))
    }
    _selectButtonInputTemplate(data, content) {
        const $content = $(content);
        const $text = $("<span>").addClass("dx-button-text").text(data.text);
        $content.append($text).append(this._$fileInput);
        return $content
    }
    _renderInputWrapper() {
        this._$inputWrapper = $("<div>").addClass("dx-fileuploader-input-wrapper").appendTo(this._$content)
    }
    _detachDragEventHandlers(target) {
        if (!isDefined(target)) {
            return
        }
        eventsEngine.off($(target), addNamespace("", this.NAME))
    }
    _attachDragEventHandlers(target) {
        const isCustomTarget = target !== this._$inputWrapper;
        if (!isDefined(target) || !this._shouldDragOverBeRendered()) {
            return
        }
        this._detachDragEventHandlers(target);
        target = $(target);
        eventsEngine.on(target, addNamespace("dragenter", this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));
        eventsEngine.on(target, addNamespace("dragover", this.NAME), this._dragOverHandler.bind(this, isCustomTarget));
        eventsEngine.on(target, addNamespace("dragleave", this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));
        eventsEngine.on(target, addNamespace("drop", this.NAME), this._dropHandler.bind(this, isCustomTarget))
    }
    _applyInputAttributes(customAttributes) {
        this._$fileInput.attr(customAttributes)
    }
    _useInputForDrop() {
        return this.option("nativeDropSupported") && "useForm" === this.option("uploadMode")
    }
    _getDropZoneElement(isCustomTarget, e) {
        let targetList = isCustomTarget ? Array.from($(this.option("dropZone"))) : [this._$inputWrapper];
        targetList = targetList.map((element => $(element).get(0)));
        return targetList[targetList.indexOf(e.currentTarget)]
    }
    _dragEnterHandler(isCustomTarget, e) {
        if (this.option("disabled")) {
            return false
        }
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        const dropZoneElement = this._getDropZoneElement(isCustomTarget, e);
        if (isDefined(dropZoneElement) && this._shouldRaiseDragOver(e, dropZoneElement)) {
            this._activeDropZone = dropZoneElement;
            this._tryToggleDropZoneActive(true, isCustomTarget, e)
        }
    }
    _shouldRaiseDragOver(e, dropZoneElement) {
        return null === this._activeDropZone && this.isMouseOverElement(e, dropZoneElement, false) && e.originalEvent.dataTransfer.types.find((item => "Files" === item))
    }
    _dragOverHandler(isCustomTarget, e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        e.originalEvent.dataTransfer.dropEffect = "copy";
        if (!isCustomTarget) {
            const dropZoneElement = this._getDropZoneElement(false, e);
            if (this._shouldRaiseDragOver(e, dropZoneElement)) {
                this._dragEnterHandler(false, e)
            }
            if (this._shouldRaiseDragLeave(e, false)) {
                this._dragLeaveHandler(false, e)
            }
        }
    }
    _dragLeaveHandler(isCustomTarget, e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        if (this._shouldRaiseDragLeave(e, isCustomTarget)) {
            this._tryToggleDropZoneActive(false, isCustomTarget, e);
            this._activeDropZone = null
        }
    }
    _shouldRaiseDragLeave(e, isCustomTarget) {
        return null !== this._activeDropZone && !this.isMouseOverElement(e, this._activeDropZone, !isCustomTarget, -1)
    }
    _tryToggleDropZoneActive(active, isCustom, event) {
        const classAction = active ? "addClass" : "removeClass";
        const mouseAction = active ? "_dropZoneEnterAction" : "_dropZoneLeaveAction";
        this[mouseAction]({
            event: event,
            dropZoneElement: this._activeDropZone
        });
        if (!isCustom) {
            this.$element()[classAction]("dx-fileuploader-dragover")
        }
    }
    _dropHandler(isCustomTarget, e) {
        this._activeDropZone = null;
        if (!isCustomTarget) {
            this.$element().removeClass("dx-fileuploader-dragover")
        }
        if (this._useInputForDrop() || isCustomTarget && this._isInteractionDisabled()) {
            return
        }
        e.preventDefault();
        const fileList = e.originalEvent.dataTransfer.files;
        const files = this._getFiles(fileList);
        if (!this.option("multiple") && files.length > 1 || 0 === files.length) {
            return
        }
        this._changeValue(files);
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    }
    _areAllFilesLoaded() {
        return this._files.every((file => !file.isValid() || file._isError || file._isLoaded || file.isAborted))
    }
    _handleAllFilesUploaded() {
        this._recalculateProgress();
        if (this._areAllFilesLoaded()) {
            this._filesUploadedAction()
        }
    }
    _getAllowedFileTypes(acceptSting) {
        if (!acceptSting.length) {
            return []
        }
        return acceptSting.split(",").map((item => item.trim()))
    }
    _isFileTypeAllowed(file, allowedTypes) {
        for (let i = 0, n = allowedTypes.length; i < n; i++) {
            let allowedType = allowedTypes[i];
            if ("." === allowedType[0]) {
                allowedType = allowedType.replace(".", "\\.");
                if (file.name.match(new RegExp(allowedType + "$", "i"))) {
                    return true
                }
            } else {
                allowedType = allowedType.replace(new RegExp("\\*", "g"), "");
                if (file.type.match(new RegExp(allowedType, "i"))) {
                    return true
                }
            }
        }
        return false
    }
    _renderWrapper() {
        const $wrapper = $("<div>").addClass("dx-fileuploader-wrapper").appendTo(this.$element());
        const $container = $("<div>").addClass("dx-fileuploader-container").appendTo($wrapper);
        this._$content = $("<div>").addClass("dx-fileuploader-content").appendTo($container)
    }
    _clean() {
        this._$fileInput.detach();
        delete this._$filesContainer;
        this._detachSelectFileDialogHandler(this.option("dialogTrigger"));
        this._detachDragEventHandlers(this.option("dropZone"));
        if (this._files) {
            this._files.forEach((file => {
                file.$file = null;
                file.$statusMessage = null
            }))
        }
        super._clean()
    }
    abortUpload(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if (isDefined(fileData)) {
            const file = this._getFile(fileData);
            if (file) {
                this._preventFilesUploading([file])
            }
        } else {
            this._preventFilesUploading(this._files)
        }
    }
    upload(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if (isDefined(fileData)) {
            const file = this._getFile(fileData);
            if (file && isFormDataSupported()) {
                this._uploadFile(file)
            }
        } else {
            this._uploadFiles()
        }
    }
    _uploadFiles() {
        if (isFormDataSupported()) {
            each(this._files, ((_, file) => this._uploadFile(file)))
        }
    }
    _uploadFile(file) {
        this._uploadStrategy.upload(file)
    }
    _updateProgressBar(file, loadedFileData) {
        file.progressBar && file.progressBar.option({
            value: loadedFileData.loaded,
            showStatus: true
        });
        this._progressAction({
            file: file.value,
            segmentSize: loadedFileData.currentSegmentSize,
            bytesLoaded: loadedFileData.loaded,
            bytesTotal: loadedFileData.total,
            event: loadedFileData.event,
            request: file.request
        })
    }
    _updateTotalProgress(totalFilesSize, totalLoadedFilesSize) {
        let progress = 0;
        if (isDefined(totalFilesSize)) {
            if (this._files.length > 0 && this._areAllFilesLoaded() && 0 === totalFilesSize && 0 === totalLoadedFilesSize) {
                progress = this._getProgressValue(1)
            } else if (totalFilesSize) {
                progress = this._getProgressValue(totalLoadedFilesSize / totalFilesSize)
            }
        }
        this.option("progress", progress);
        this._setLoadedSize(totalLoadedFilesSize)
    }
    _getProgressValue(ratio) {
        return Math.floor(100 * ratio)
    }
    _initStatusMessage(file) {
        file.$statusMessage.css("display", "none")
    }
    _ensureCancelButtonInitialized(file) {
        if (file.isInitialized) {
            return
        }
        file.cancelButton.option("onClick", (() => {
            this._preventFilesUploading([file]);
            this._removeFile(file)
        }));
        const hideCancelButton = () => {
            setTimeout((() => {
                file.cancelButton.option({
                    visible: false
                })
            }), 400)
        };
        file.onLoad.add(hideCancelButton);
        file.onError.add(hideCancelButton)
    }
    _createProgressBar(fileSize) {
        return this._createComponent($("<div>"), ProgressBar, {
            value: void 0,
            min: 0,
            max: fileSize,
            statusFormat: ratio => this._getProgressValue(ratio) + "%",
            showStatus: false,
            statusPosition: "right"
        })
    }
    _getTotalFilesSize() {
        if (!this._totalFilesSize) {
            this._totalFilesSize = 0;
            each(this._files, ((_, file) => {
                this._totalFilesSize += file.value.size
            }))
        }
        return this._totalFilesSize
    }
    _getTotalLoadedFilesSize() {
        if (!this._totalLoadedFilesSize) {
            this._totalLoadedFilesSize = 0;
            each(this._files, ((_, file) => {
                this._totalLoadedFilesSize += file.loadedSize
            }))
        }
        return this._totalLoadedFilesSize
    }
    _setLoadedSize(value) {
        this._totalLoadedFilesSize = value
    }
    _recalculateProgress() {
        this._totalFilesSize = 0;
        this._totalLoadedFilesSize = 0;
        this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize())
    }
    isMouseOverElement(mouseEvent, element, correctPseudoElements) {
        let dragEventDelta = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        if (!element) {
            return false
        }
        const beforeHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ":before").height) : 0;
        const afterHeight = correctPseudoElements ? parseFloat(window.getComputedStyle(element, ":after").height) : 0;
        const x = getOffset(element).left;
        const y = getOffset(element).top + beforeHeight;
        const w = element.offsetWidth;
        const h = element.offsetHeight - beforeHeight - afterHeight;
        const eventX = this._getEventX(mouseEvent);
        const eventY = this._getEventY(mouseEvent);
        return eventX + dragEventDelta >= x && eventX - dragEventDelta < x + w && eventY + dragEventDelta >= y && eventY - dragEventDelta < y + h
    }
    _getEventX(e) {
        return isTouchEvent(e) ? this._getTouchEventX(e) : e.clientX + this._getDocumentScrollLeft()
    }
    _getEventY(e) {
        return isTouchEvent(e) ? this._getTouchEventY(e) : e.clientY + this._getDocumentScrollTop()
    }
    _getTouchEventX(e) {
        let touchPoint = null;
        if (e.changedTouches.length > 0) {
            touchPoint = e.changedTouches
        } else if (e.targetTouches.length > 0) {
            touchPoint = e.targetTouches
        }
        return touchPoint ? touchPoint[0].pageX : 0
    }
    _getTouchEventY(e) {
        let touchPoint = null;
        if (e.changedTouches.length > 0) {
            touchPoint = e.changedTouches
        } else if (e.targetTouches.length > 0) {
            touchPoint = e.targetTouches
        }
        return touchPoint ? touchPoint[0].pageY : 0
    }
    _getDocumentScrollTop() {
        const document = domAdapter.getDocument();
        return document.documentElement.scrollTop || document.body.scrollTop
    }
    _getDocumentScrollLeft() {
        const document = domAdapter.getDocument();
        return document.documentElement.scrollLeft || document.body.scrollLeft
    }
    _updateReadOnlyState() {
        const readOnly = this.option("readOnly");
        this._selectButton.option("disabled", readOnly);
        this._files.forEach((file => {
            var _file$cancelButton;
            return null === (_file$cancelButton = file.cancelButton) || void 0 === _file$cancelButton ? void 0 : _file$cancelButton.option("disabled", readOnly)
        }));
        this._updateInputLabelText();
        this._attachDragEventHandlers(this._$inputWrapper)
    }
    _updateHoverState() {
        var _this$_selectButton, _this$_uploadButton;
        const value = this.option("hoverStateEnabled");
        null === (_this$_selectButton = this._selectButton) || void 0 === _this$_selectButton || _this$_selectButton.option("hoverStateEnabled", value);
        null === (_this$_uploadButton = this._uploadButton) || void 0 === _this$_uploadButton || _this$_uploadButton.option("hoverStateEnabled", value);
        this._files.forEach((file => {
            var _file$uploadButton, _file$cancelButton2;
            null === (_file$uploadButton = file.uploadButton) || void 0 === _file$uploadButton || _file$uploadButton.option("hoverStateEnabled", value);
            null === (_file$cancelButton2 = file.cancelButton) || void 0 === _file$cancelButton2 || _file$cancelButton2.option("hoverStateEnabled", value)
        }))
    }
    _optionChanged(args) {
        const {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "height":
            case "width":
                this._updateFileNameMaxWidth();
                super._optionChanged(args);
                break;
            case "value":
                !value.length && this._$fileInput.val("");
                if (!this._preventRecreatingFiles) {
                    this._createFiles();
                    this._renderFiles()
                }
                this._recalculateProgress();
                super._optionChanged(args);
                break;
            case "name":
            case "hint":
                this._initFileInput();
                super._optionChanged(args);
                break;
            case "accept":
                this._initFileInput();
                break;
            case "multiple":
                this._initFileInput();
                if (!args.value) {
                    this.clear()
                }
                break;
            case "readOnly":
                this._updateReadOnlyState();
                super._optionChanged(args);
                break;
            case "disabled":
                this._updateInputLabelText();
                super._optionChanged(args);
                break;
            case "selectButtonText":
                this._selectButton.option("text", value);
                break;
            case "uploadButtonText":
                this._uploadButton && this._uploadButton.option("text", value);
                break;
            case "_uploadButtonType":
                this._uploadButton && this._uploadButton.option("type", value);
                break;
            case "_buttonStylingMode":
                this._files.forEach((file => {
                    var _file$uploadButton2, _file$cancelButton3;
                    null === (_file$uploadButton2 = file.uploadButton) || void 0 === _file$uploadButton2 || _file$uploadButton2.option("stylingMode", value);
                    null === (_file$cancelButton3 = file.cancelButton) || void 0 === _file$cancelButton3 || _file$cancelButton3.option("stylingMode", value)
                }));
                break;
            case "dialogTrigger":
                this._detachSelectFileDialogHandler(previousValue);
                this._attachSelectFileDialogHandler(value);
                break;
            case "dropZone":
                this._detachDragEventHandlers(previousValue);
                this._attachDragEventHandlers(value);
                break;
            case "maxFileSize":
            case "minFileSize":
            case "allowedFileExtensions":
            case "invalidFileExtensionMessage":
            case "invalidMaxFileSizeMessage":
            case "invalidMinFileSizeMessage":
            case "readyToUploadMessage":
            case "uploadedMessage":
            case "uploadFailedMessage":
            case "uploadAbortedMessage":
            case "nativeDropSupported":
                this._invalidate();
                break;
            case "labelText":
                this._updateInputLabelText();
                break;
            case "showFileList":
                if (!this._preventRecreatingFiles) {
                    this._renderFiles()
                }
                break;
            case "uploadFile":
            case "uploadChunk":
            case "chunkSize":
                this._setUploadStrategy();
                break;
            case "abortUpload":
            case "uploadUrl":
            case "progress":
            case "uploadMethod":
            case "uploadHeaders":
            case "uploadCustomData":
            case "extendSelection":
                break;
            case "hoverStateEnabled":
                this._updateHoverState();
                super._optionChanged(args);
                break;
            case "allowCanceling":
            case "uploadMode":
                this.clear();
                this._invalidate();
                break;
            case "onBeforeSend":
                this._createBeforeSendAction();
                break;
            case "onUploadStarted":
                this._createUploadStartedAction();
                break;
            case "onUploaded":
                this._createUploadedAction();
                break;
            case "onFilesUploaded":
                this._createFilesUploadedAction();
                break;
            case "onProgress":
                this._createProgressAction();
                break;
            case "onUploadError":
                this._createUploadErrorAction();
                break;
            case "onUploadAborted":
                this._createUploadAbortedAction();
                break;
            case "onDropZoneEnter":
                this._createDropZoneEnterAction();
                break;
            case "onDropZoneLeave":
                this._createDropZoneLeaveAction();
                break;
            case "useNativeInputClick":
                this._renderInput();
                break;
            case "useDragOver":
                this._attachDragEventHandlers(this._$inputWrapper);
                break;
            case "inputAttr":
                this._applyInputAttributes(this.option(name));
                break;
            default:
                super._optionChanged(args)
        }
    }
    _resetInputValue(force) {
        if ("useForm" === this.option("uploadMode") && !force) {
            return
        }
        this._doPreventInputChange = true;
        this._$fileInput.val("");
        this._doPreventInputChange = false
    }
    clear() {
        this.option("value", [])
    }
}
class FileBlobReader {
    constructor(file, chunkSize) {
        this.file = file;
        this.chunkSize = chunkSize;
        this.index = 0
    }
    read() {
        if (!this.file) {
            return null
        }
        const result = this.createBlobResult(this.file, this.index, this.chunkSize);
        if (result.isCompleted) {
            this.file = null
        }
        this.index++;
        return result
    }
    createBlobResult(file, index, chunkSize) {
        const currentPosition = index * chunkSize;
        return {
            blob: this.sliceFile(file, currentPosition, chunkSize),
            index: index,
            isCompleted: currentPosition + chunkSize >= file.size
        }
    }
    sliceFile(file, startPos, length) {
        if (file.slice) {
            return file.slice(startPos, startPos + length)
        }
        if (file.webkitSlice) {
            return file.webkitSlice(startPos, startPos + length)
        }
        return null
    }
}
class FileUploadStrategyBase {
    constructor(fileUploader) {
        this.fileUploader = fileUploader
    }
    upload(file) {
        if (file.isInitialized && file.isAborted) {
            this.fileUploader._resetFileState(file)
        }
        if (file.isValid() && !file.uploadStarted) {
            this._prepareFileBeforeUpload(file);
            this._uploadCore(file)
        }
    }
    abortUpload(file) {
        if (file._isError || file._isLoaded || file.isAborted || !file.uploadStarted) {
            return
        }
        file.isAborted = true;
        file.request && file.request.abort();
        if (this._isCustomCallback("abortUpload")) {
            const abortUpload = this.fileUploader.option("abortUpload");
            const arg = this._createUploadArgument(file);
            let deferred = null;
            try {
                const result = abortUpload(file.value, arg);
                deferred = fromPromise(result)
            } catch (error) {
                deferred = (new Deferred).reject(error).promise()
            }
            deferred.done((() => file.onAbort.fire())).fail((error => this._handleFileError(file, error)))
        }
    }
    _beforeSend(xhr, file) {
        const arg = this._createUploadArgument(file);
        this.fileUploader._beforeSendAction({
            request: xhr,
            file: file.value,
            uploadInfo: arg
        });
        file.request = xhr
    }
    _createUploadArgument(file) {}
    _uploadCore(file) {}
    _isCustomCallback(name) {
        const callback = this.fileUploader.option(name);
        return callback && isFunction(callback)
    }
    _handleProgress(file, e) {
        if (file._isError) {
            return
        }
        file._isProgressStarted = true;
        this._handleProgressCore(file, e)
    }
    _handleProgressCore(file, e) {}
    _handleFileError(file, error) {
        file._isError = true;
        file.onError.fire(error)
    }
    _prepareFileBeforeUpload(file) {
        if (file.$file) {
            var _file$progressBar;
            null === (_file$progressBar = file.progressBar) || void 0 === _file$progressBar || _file$progressBar.dispose();
            this.fileUploader._createFileProgressBar(file)
        }
        if (file.isInitialized) {
            return
        }
        file.onLoadStart.add(this._onUploadStarted.bind(this, file));
        file.onLoad.add(this._onLoadedHandler.bind(this, file));
        file.onError.add(this._onErrorHandler.bind(this, file));
        file.onAbort.add(this._onAbortHandler.bind(this, file));
        file.onProgress.add(this._onProgressHandler.bind(this, file));
        file.isInitialized = true
    }
    _shouldHandleError(file, e) {
        return (this._isStatusError(e.status) || !file._isProgressStarted) && !file.isAborted
    }
    _isStatusError(status) {
        return 400 <= status && status < 500 || 500 <= status && status < 600
    }
    _onUploadStarted(file, e) {
        file.uploadStarted = true;
        this.fileUploader._uploadStartedAction({
            file: file.value,
            event: e,
            request: file.request
        })
    }
    _onAbortHandler(file, e) {
        const args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader._getUploadAbortedStatusMessage()
        };
        this.fileUploader._uploadAbortedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onErrorHandler(file, error) {
        const args = {
            file: file.value,
            event: void 0,
            request: file.request,
            error: error,
            message: this.fileUploader.option("uploadFailedMessage")
        };
        this.fileUploader._uploadErrorAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onLoadedHandler(file, e) {
        const args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader.option("uploadedMessage")
        };
        file._isLoaded = true;
        this.fileUploader._uploadedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    }
    _onProgressHandler(file, e) {
        if (file) {
            const totalFilesSize = this.fileUploader._getTotalFilesSize();
            const totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();
            const loadedSize = Math.min(e.loaded, file.value.size);
            const segmentSize = loadedSize - file.loadedSize;
            file.loadedSize = loadedSize;
            this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);
            this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e))
        }
    }
    _getLoadedData(loaded, total, currentSegmentSize, event) {
        return {
            loaded: loaded,
            total: total,
            currentSegmentSize: currentSegmentSize
        }
    }
    _extendFormData(formData) {
        const formDataEntries = this.fileUploader.option("uploadCustomData");
        for (const entryName in formDataEntries) {
            if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && isDefined(formDataEntries[entryName])) {
                formData.append(entryName, formDataEntries[entryName])
            }
        }
    }
}
class ChunksFileUploadStrategyBase extends FileUploadStrategyBase {
    constructor(fileUploader) {
        super(fileUploader);
        this.chunkSize = this.fileUploader.option("chunkSize")
    }
    _uploadCore(file) {
        const realFile = file.value;
        const chunksData = {
            name: realFile.name,
            loadedBytes: 0,
            type: realFile.type,
            blobReader: new FileBlobReader(realFile, this.chunkSize),
            guid: new Guid,
            fileSize: realFile.size,
            count: this._getFileChunksCount(realFile),
            customData: {}
        };
        file.chunksData = chunksData;
        this._sendChunk(file, chunksData)
    }
    _getFileChunksCount(jsFile) {
        return 0 === jsFile.size ? 1 : Math.ceil(jsFile.size / this.chunkSize)
    }
    _sendChunk(file, chunksData) {
        const chunk = chunksData.blobReader.read();
        chunksData.currentChunk = chunk;
        if (chunk) {
            this._sendChunkCore(file, chunksData, chunk).done((() => {
                if (file.isAborted) {
                    return
                }
                chunksData.loadedBytes += chunk.blob.size;
                file.onProgress.fire({
                    loaded: chunksData.loadedBytes,
                    total: file.value.size
                });
                if (chunk.isCompleted) {
                    file.onLoad.fire()
                }
                setTimeout((() => this._sendChunk(file, chunksData)))
            })).fail((error => {
                if (this._shouldHandleError(file, error)) {
                    this._handleFileError(file, error)
                }
            }))
        }
    }
    _sendChunkCore(file, chunksData, chunk) {}
    _tryRaiseStartLoad(file) {
        if (!file.isStartLoad) {
            file.isStartLoad = true;
            file.onLoadStart.fire()
        }
    }
    _getEvent(e) {
        return null
    }
    _createUploadArgument(file) {
        return this._createChunksInfo(file.chunksData)
    }
    _createChunksInfo(chunksData) {
        return {
            bytesUploaded: chunksData.loadedBytes,
            chunkCount: chunksData.count,
            customData: chunksData.customData,
            chunkBlob: chunksData.currentChunk.blob,
            chunkIndex: chunksData.currentChunk.index
        }
    }
}
class DefaultChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
    _sendChunkCore(file, chunksData, chunk) {
        return ajax.sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: xhr => this._beforeSend(xhr, file),
            upload: {
                onprogress: e => this._handleProgress(file, e),
                onloadstart: () => this._tryRaiseStartLoad(file),
                onabort: () => file.onAbort.fire()
            },
            data: this._createFormData({
                fileName: chunksData.name,
                blobName: this.fileUploader.option("name"),
                blob: chunk.blob,
                index: chunk.index,
                count: chunksData.count,
                type: chunksData.type,
                guid: chunksData.guid,
                size: chunksData.fileSize
            })
        })
    }
    _createFormData(options) {
        const formData = new window.FormData;
        formData.append(options.blobName, options.blob);
        formData.append("chunkMetadata", JSON.stringify({
            FileName: options.fileName,
            Index: options.index,
            TotalCount: options.count,
            FileSize: options.size,
            FileType: options.type,
            FileGuid: options.guid
        }));
        this._extendFormData(formData);
        return formData
    }
}
class CustomChunksFileUploadStrategy extends ChunksFileUploadStrategyBase {
    _sendChunkCore(file, chunksData) {
        this._tryRaiseStartLoad(file);
        const chunksInfo = this._createChunksInfo(chunksData);
        const uploadChunk = this.fileUploader.option("uploadChunk");
        try {
            const result = uploadChunk(file.value, chunksInfo);
            return fromPromise(result)
        } catch (error) {
            return (new Deferred).reject(error).promise()
        }
    }
    _shouldHandleError(file, error) {
        return true
    }
}
class WholeFileUploadStrategyBase extends FileUploadStrategyBase {
    _uploadCore(file) {
        file.loadedSize = 0;
        this._uploadFile(file).done((() => {
            if (!file.isAborted) {
                file.onLoad.fire()
            }
        })).fail((error => {
            if (this._shouldHandleError(file, error)) {
                this._handleFileError(file, error)
            }
        }))
    }
    _uploadFile(file) {}
    _handleProgressCore(file, e) {
        file.onProgress.fire(e)
    }
    _getLoadedData(loaded, total, segmentSize, event) {
        const result = super._getLoadedData(loaded, total, segmentSize, event);
        result.event = event;
        return result
    }
}
class DefaultWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
    _uploadFile(file) {
        return ajax.sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: xhr => this._beforeSend(xhr, file),
            upload: {
                onprogress: e => this._handleProgress(file, e),
                onloadstart: () => file.onLoadStart.fire(),
                onabort: () => file.onAbort.fire()
            },
            data: this._createFormData(this.fileUploader.option("name"), file.value)
        })
    }
    _createFormData(fieldName, fieldValue) {
        const formData = new window.FormData;
        formData.append(fieldName, fieldValue, fieldValue.name);
        this._extendFormData(formData);
        return formData
    }
}
class CustomWholeFileUploadStrategy extends WholeFileUploadStrategyBase {
    _uploadFile(file) {
        file.onLoadStart.fire();
        const progressCallback = loadedBytes => {
            const arg = {
                loaded: loadedBytes,
                total: file.value.size
            };
            this._handleProgress(file, arg)
        };
        const uploadFile = this.fileUploader.option("uploadFile");
        try {
            const result = uploadFile(file.value, progressCallback);
            return fromPromise(result)
        } catch (error) {
            return (new Deferred).reject(error).promise()
        }
    }
    _shouldHandleError(file, e) {
        return true
    }
}
registerComponent("dxFileUploader", FileUploader);
export default FileUploader;
