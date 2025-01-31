/*!
 * dpt-ui-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dpt-ui-react
 */

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxFileUploader, { Properties } from "dpt-ui/ui/file_uploader";
import { IHtmlOptions } from "./core/component";
import type { BeforeSendEvent, ContentReadyEvent, DisposingEvent, DropZoneEnterEvent, DropZoneLeaveEvent, FilesUploadedEvent, InitializedEvent, ProgressEvent, UploadAbortedEvent, UploadedEvent, UploadErrorEvent, UploadStartedEvent, ValueChangedEvent } from "dpt-ui/ui/file_uploader";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IFileUploaderOptionsNarrowedEvents = {
    onBeforeSend?: ((e: BeforeSendEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onDropZoneEnter?: ((e: DropZoneEnterEvent) => void);
    onDropZoneLeave?: ((e: DropZoneLeaveEvent) => void);
    onFilesUploaded?: ((e: FilesUploadedEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onProgress?: ((e: ProgressEvent) => void);
    onUploadAborted?: ((e: UploadAbortedEvent) => void);
    onUploaded?: ((e: UploadedEvent) => void);
    onUploadError?: ((e: UploadErrorEvent) => void);
    onUploadStarted?: ((e: UploadStartedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IFileUploaderOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IFileUploaderOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: Array<any>;
    onValueChange?: (value: Array<any>) => void;
}>;
interface FileUploaderRef {
    instance: () => dxFileUploader;
}
declare const FileUploader: (props: React.PropsWithChildren<IFileUploaderOptions> & {
    ref?: Ref<FileUploaderRef>;
}) => ReactElement | null;
export default FileUploader;
export { FileUploader, IFileUploaderOptions, FileUploaderRef };
import type * as FileUploaderTypes from 'dpt-ui/ui/file_uploader_types';
export { FileUploaderTypes };
