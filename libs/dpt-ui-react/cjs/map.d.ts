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
import dxMap, { Properties } from "dpt-ui/ui/map";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ClickEvent, DisposingEvent, InitializedEvent, MarkerAddedEvent, MarkerRemovedEvent, ReadyEvent, RouteAddedEvent, RouteRemovedEvent } from "dpt-ui/ui/map";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IMapOptionsNarrowedEvents = {
    onClick?: ((e: ClickEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onMarkerAdded?: ((e: MarkerAddedEvent) => void);
    onMarkerRemoved?: ((e: MarkerRemovedEvent) => void);
    onReady?: ((e: ReadyEvent) => void);
    onRouteAdded?: ((e: RouteAddedEvent) => void);
    onRouteRemoved?: ((e: RouteRemovedEvent) => void);
};
type IMapOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IMapOptionsNarrowedEvents> & IHtmlOptions & {
    defaultCenter?: Array<number> | Record<string, any> | string;
    defaultMarkers?: Array<Record<string, any>>;
    defaultRoutes?: Array<Record<string, any>>;
    defaultZoom?: number;
    onCenterChange?: (value: Array<number> | Record<string, any> | string) => void;
    onMarkersChange?: (value: Array<Record<string, any>>) => void;
    onRoutesChange?: (value: Array<Record<string, any>>) => void;
    onZoomChange?: (value: number) => void;
}>;
interface MapRef {
    instance: () => dxMap;
}
declare const Map: (props: React.PropsWithChildren<IMapOptions> & {
    ref?: Ref<MapRef>;
}) => ReactElement | null;
type IApiKeyProps = React.PropsWithChildren<{
    bing?: string;
    google?: string;
    googleStatic?: string;
}>;
declare const _componentApiKey: React.MemoExoticComponent<(props: IApiKeyProps) => React.FunctionComponentElement<IApiKeyProps>>;
declare const ApiKey: typeof _componentApiKey & IElementDescriptor;
type ICenterProps = React.PropsWithChildren<{
    lat?: number;
    lng?: number;
}>;
declare const _componentCenter: React.MemoExoticComponent<(props: ICenterProps) => React.FunctionComponentElement<ICenterProps>>;
declare const Center: typeof _componentCenter & IElementDescriptor;
type ILocationProps = React.PropsWithChildren<{
    lat?: number;
    lng?: number;
}>;
declare const _componentLocation: React.MemoExoticComponent<(props: ILocationProps) => React.FunctionComponentElement<ILocationProps>>;
declare const Location: typeof _componentLocation & IElementDescriptor;
type IMarkerProps = React.PropsWithChildren<{
    iconSrc?: string;
    location?: Array<number> | Record<string, any> | string | {
        lat?: number;
        lng?: number;
    }[];
    onClick?: (() => void);
    tooltip?: Record<string, any> | string | {
        isShown?: boolean;
        text?: string;
    };
}>;
declare const _componentMarker: React.MemoExoticComponent<(props: IMarkerProps) => React.FunctionComponentElement<IMarkerProps>>;
declare const Marker: typeof _componentMarker & IElementDescriptor;
type IRouteProps = React.PropsWithChildren<{
    color?: string;
    locations?: Array<Record<string, any>> | {
        lat?: number;
        lng?: number;
    }[];
    mode?: "driving" | "walking";
    opacity?: number;
    weight?: number;
}>;
declare const _componentRoute: React.MemoExoticComponent<(props: IRouteProps) => React.FunctionComponentElement<IRouteProps>>;
declare const Route: typeof _componentRoute & IElementDescriptor;
type ITooltipProps = React.PropsWithChildren<{
    isShown?: boolean;
    text?: string;
}>;
declare const _componentTooltip: React.MemoExoticComponent<(props: ITooltipProps) => React.FunctionComponentElement<ITooltipProps>>;
declare const Tooltip: typeof _componentTooltip & IElementDescriptor;
export default Map;
export { Map, IMapOptions, MapRef, ApiKey, IApiKeyProps, Center, ICenterProps, Location, ILocationProps, Marker, IMarkerProps, Route, IRouteProps, Tooltip, ITooltipProps };
import type * as MapTypes from 'dpt-ui/ui/map_types';
export { MapTypes };
