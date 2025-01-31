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
import dxTextArea, { Properties } from "dpt-ui/ui/text_area";
import { IHtmlOptions } from "./core/component";
import type { ChangeEvent, ContentReadyEvent, CopyEvent, CutEvent, DisposingEvent, EnterKeyEvent, FocusInEvent, FocusOutEvent, InitializedEvent, InputEvent, KeyDownEvent, KeyUpEvent, PasteEvent, ValueChangedEvent } from "dpt-ui/ui/text_area";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type ITextAreaOptionsNarrowedEvents = {
    onChange?: ((e: ChangeEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onCopy?: ((e: CopyEvent) => void);
    onCut?: ((e: CutEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onEnterKey?: ((e: EnterKeyEvent) => void);
    onFocusIn?: ((e: FocusInEvent) => void);
    onFocusOut?: ((e: FocusOutEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onInput?: ((e: InputEvent) => void);
    onKeyDown?: ((e: KeyDownEvent) => void);
    onKeyUp?: ((e: KeyUpEvent) => void);
    onPaste?: ((e: PasteEvent) => void);
    onValueChanged?: ((e: ValueChangedEvent) => void);
};
type ITextAreaOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, ITextAreaOptionsNarrowedEvents> & IHtmlOptions & {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}>;
interface TextAreaRef {
    instance: () => dxTextArea;
}
declare const TextArea: (props: React.PropsWithChildren<ITextAreaOptions> & {
    ref?: Ref<TextAreaRef>;
}) => ReactElement | null;
export default TextArea;
export { TextArea, ITextAreaOptions, TextAreaRef };
import type * as TextAreaTypes from 'dpt-ui/ui/text_area_types';
export { TextAreaTypes };
