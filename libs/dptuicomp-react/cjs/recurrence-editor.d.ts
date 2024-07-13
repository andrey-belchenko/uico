/*!
 * dptuicomp-react
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/dptuicomp-react
 */

import * as React from "react";
import { Ref, ReactElement } from "react";
import dxRecurrenceEditor, { Properties } from "dptuicomp/ui/recurrence_editor";
import { IHtmlOptions } from "./core/component";
import type { ContentReadyEvent, DisposingEvent, InitializedEvent, ValueChangedEvent } from "dptuicomp/ui/recurrence_editor";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IRecurrenceEditorOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type IRecurrenceEditorOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IRecurrenceEditorOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}>;
interface RecurrenceEditorRef {
    instance: () => dxRecurrenceEditor;
}
declare const RecurrenceEditor: (props: React.PropsWithChildren<IRecurrenceEditorOptions> & {
    ref?: Ref<RecurrenceEditorRef>;
}) => ReactElement | null;
export default RecurrenceEditor;
export { RecurrenceEditor, IRecurrenceEditorOptions, RecurrenceEditorRef };
import type * as RecurrenceEditorTypes from 'dptuicomp/ui/recurrence_editor_types';
export { RecurrenceEditorTypes };
