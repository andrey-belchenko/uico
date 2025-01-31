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
import dxButton, { Properties } from "dpt-ui/ui/button";
import { IHtmlOptions } from "./core/component";
import type { ClickEvent, ContentReadyEvent, DisposingEvent, InitializedEvent } from "dpt-ui/ui/button";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IButtonOptionsNarrowedEvents = {
    onClick?: ((e: ClickEvent) => void);
    onContentReady?: ((e: ContentReadyEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IButtonOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IButtonOptionsNarrowedEvents> & IHtmlOptions & {
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
}>;
interface ButtonRef {
    instance: () => dxButton;
}
declare const Button: (props: React.PropsWithChildren<IButtonOptions> & {
    ref?: Ref<ButtonRef>;
}) => ReactElement | null;
export default Button;
export { Button, IButtonOptions, ButtonRef };
import type * as ButtonTypes from 'dpt-ui/ui/button_types';
export { ButtonTypes };
