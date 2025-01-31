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
import dxDrawer, { Properties } from "dpt-ui/ui/drawer";
import { IHtmlOptions } from "./core/component";
import type { DisposingEvent, InitializedEvent } from "dpt-ui/ui/drawer";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IDrawerOptionsNarrowedEvents = {
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
};
type IDrawerOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IDrawerOptionsNarrowedEvents> & IHtmlOptions & {
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    defaultOpened?: boolean;
    onOpenedChange?: (value: boolean) => void;
}>;
interface DrawerRef {
    instance: () => dxDrawer;
}
declare const Drawer: (props: React.PropsWithChildren<IDrawerOptions> & {
    ref?: Ref<DrawerRef>;
}) => ReactElement | null;
export default Drawer;
export { Drawer, IDrawerOptions, DrawerRef };
import type * as DrawerTypes from 'dpt-ui/ui/drawer_types';
export { DrawerTypes };
