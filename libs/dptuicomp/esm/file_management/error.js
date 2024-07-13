/**
 * DevExtreme (esm/file_management/error.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dptuiext.com/Licensing/
 */
class FileSystemError {
    constructor(errorCode, fileSystemItem, errorText) {
        this.errorCode = errorCode;
        this.fileSystemItem = fileSystemItem;
        this.errorText = errorText
    }
}
export default FileSystemError;
