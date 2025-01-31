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
import dxDiagram, { Properties } from "dpt-ui/ui/diagram";
import { IHtmlOptions, IElementDescriptor } from "./core/component";
import type { ContentReadyEvent, CustomCommandEvent, DisposingEvent, InitializedEvent, ItemClickEvent, ItemDblClickEvent, RequestEditOperationEvent, RequestLayoutUpdateEvent, CustomCommand, dxDiagramShape } from "dpt-ui/ui/diagram";
import type { dxSVGElement } from "dpt-ui/core/element";
import type { template } from "dpt-ui/core/templates/template";
import type { DataSourceOptions } from "dpt-ui/data/data_source";
import type { Store } from "dpt-ui/data/store";
import type DataSource from "dpt-ui/data/data_source";
type ReplaceFieldTypes<TSource, TReplacement> = {
    [P in keyof TSource]: P extends keyof TReplacement ? TReplacement[P] : TSource[P];
};
type IDiagramOptionsNarrowedEvents = {
    onContentReady?: ((e: ContentReadyEvent) => void);
    onCustomCommand?: ((e: CustomCommandEvent) => void);
    onDisposing?: ((e: DisposingEvent) => void);
    onInitialized?: ((e: InitializedEvent) => void);
    onItemClick?: ((e: ItemClickEvent) => void);
    onItemDblClick?: ((e: ItemDblClickEvent) => void);
    onRequestEditOperation?: ((e: RequestEditOperationEvent) => void);
    onRequestLayoutUpdate?: ((e: RequestLayoutUpdateEvent) => void);
};
type IDiagramOptions = React.PropsWithChildren<ReplaceFieldTypes<Properties, IDiagramOptionsNarrowedEvents> & IHtmlOptions & {
    customShapeRender?: (...params: any) => React.ReactNode;
    customShapeComponent?: React.ComponentType<any>;
    customShapeToolboxRender?: (...params: any) => React.ReactNode;
    customShapeToolboxComponent?: React.ComponentType<any>;
    defaultGridSize?: number | Record<string, any>;
    defaultPageSize?: Record<string, any>;
    defaultZoomLevel?: number | Record<string, any>;
    onGridSizeChange?: (value: number | Record<string, any>) => void;
    onPageSizeChange?: (value: Record<string, any>) => void;
    onZoomLevelChange?: (value: number | Record<string, any>) => void;
}>;
interface DiagramRef {
    instance: () => dxDiagram;
}
declare const Diagram: (props: React.PropsWithChildren<IDiagramOptions> & {
    ref?: Ref<DiagramRef>;
}) => ReactElement | null;
type IAutoLayoutProps = React.PropsWithChildren<{
    orientation?: "horizontal" | "vertical";
    type?: "auto" | "off" | "tree" | "layered";
}>;
declare const _componentAutoLayout: React.MemoExoticComponent<(props: IAutoLayoutProps) => React.FunctionComponentElement<IAutoLayoutProps>>;
declare const AutoLayout: typeof _componentAutoLayout & IElementDescriptor;
type ICommandProps = React.PropsWithChildren<{
    icon?: string;
    items?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    location?: "after" | "before" | "center";
    name?: "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox";
    text?: string;
}>;
declare const _componentCommand: React.MemoExoticComponent<(props: ICommandProps) => React.FunctionComponentElement<ICommandProps>>;
declare const Command: typeof _componentCommand & IElementDescriptor;
type ICommandItemProps = React.PropsWithChildren<{
    icon?: string;
    items?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    location?: "after" | "before" | "center";
    name?: "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox";
    text?: string;
}>;
declare const _componentCommandItem: React.MemoExoticComponent<(props: ICommandItemProps) => React.FunctionComponentElement<ICommandItemProps>>;
declare const CommandItem: typeof _componentCommandItem & IElementDescriptor;
type IConnectionPointProps = React.PropsWithChildren<{
    x?: number;
    y?: number;
}>;
declare const _componentConnectionPoint: React.MemoExoticComponent<(props: IConnectionPointProps) => React.FunctionComponentElement<IConnectionPointProps>>;
declare const ConnectionPoint: typeof _componentConnectionPoint & IElementDescriptor;
type IContextMenuProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    enabled?: boolean;
}>;
declare const _componentContextMenu: React.MemoExoticComponent<(props: IContextMenuProps) => React.FunctionComponentElement<IContextMenuProps>>;
declare const ContextMenu: typeof _componentContextMenu & IElementDescriptor;
type IContextToolboxProps = React.PropsWithChildren<{
    category?: "general" | "flowchart" | "orgChart" | "containers" | "custom";
    displayMode?: "icons" | "texts";
    enabled?: boolean;
    shapeIconsPerRow?: number;
    shapes?: Array<"text" | "rectangle" | "ellipse" | "cross" | "triangle" | "diamond" | "heart" | "pentagon" | "hexagon" | "octagon" | "star" | "arrowLeft" | "arrowTop" | "arrowRight" | "arrowBottom" | "arrowNorthSouth" | "arrowEastWest" | "process" | "decision" | "terminator" | "predefinedProcess" | "document" | "multipleDocuments" | "manualInput" | "preparation" | "data" | "database" | "hardDisk" | "internalStorage" | "paperTape" | "manualOperation" | "delay" | "storedData" | "display" | "merge" | "connector" | "or" | "summingJunction" | "verticalContainer" | "horizontalContainer" | "cardWithImageOnLeft" | "cardWithImageOnTop" | "cardWithImageOnRight">;
    width?: number;
}>;
declare const _componentContextToolbox: React.MemoExoticComponent<(props: IContextToolboxProps) => React.FunctionComponentElement<IContextToolboxProps>>;
declare const ContextToolbox: typeof _componentContextToolbox & IElementDescriptor;
type ICustomShapeProps = React.PropsWithChildren<{
    allowEditImage?: boolean;
    allowEditText?: boolean;
    allowResize?: boolean;
    backgroundImageHeight?: number;
    backgroundImageLeft?: number;
    backgroundImageToolboxUrl?: string;
    backgroundImageTop?: number;
    backgroundImageUrl?: string;
    backgroundImageWidth?: number;
    baseType?: "text" | "rectangle" | "ellipse" | "cross" | "triangle" | "diamond" | "heart" | "pentagon" | "hexagon" | "octagon" | "star" | "arrowLeft" | "arrowTop" | "arrowRight" | "arrowBottom" | "arrowNorthSouth" | "arrowEastWest" | "process" | "decision" | "terminator" | "predefinedProcess" | "document" | "multipleDocuments" | "manualInput" | "preparation" | "data" | "database" | "hardDisk" | "internalStorage" | "paperTape" | "manualOperation" | "delay" | "storedData" | "display" | "merge" | "connector" | "or" | "summingJunction" | "verticalContainer" | "horizontalContainer" | "cardWithImageOnLeft" | "cardWithImageOnTop" | "cardWithImageOnRight";
    category?: string;
    connectionPoints?: Array<Record<string, any>> | {
        x?: number;
        y?: number;
    }[];
    defaultHeight?: number;
    defaultImageUrl?: string;
    defaultText?: string;
    defaultWidth?: number;
    imageHeight?: number;
    imageLeft?: number;
    imageTop?: number;
    imageWidth?: number;
    keepRatioOnAutoSize?: boolean;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    template?: ((container: dxSVGElement, data: {
        item: dxDiagramShape;
    }) => void) | template;
    templateHeight?: number;
    templateLeft?: number;
    templateTop?: number;
    templateWidth?: number;
    textHeight?: number;
    textLeft?: number;
    textTop?: number;
    textWidth?: number;
    title?: string;
    toolboxTemplate?: ((container: dxSVGElement, data: {
        item: dxDiagramShape;
    }) => void) | template;
    toolboxWidthToHeightRatio?: number;
    type?: string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    toolboxRender?: (...params: any) => React.ReactNode;
    toolboxComponent?: React.ComponentType<any>;
}>;
declare const _componentCustomShape: React.MemoExoticComponent<(props: ICustomShapeProps) => React.FunctionComponentElement<ICustomShapeProps>>;
declare const CustomShape: typeof _componentCustomShape & IElementDescriptor;
type IDefaultItemPropertiesProps = React.PropsWithChildren<{
    connectorLineEnd?: "none" | "arrow" | "outlinedTriangle" | "filledTriangle";
    connectorLineStart?: "none" | "arrow" | "outlinedTriangle" | "filledTriangle";
    connectorLineType?: "straight" | "orthogonal";
    shapeMaxHeight?: number;
    shapeMaxWidth?: number;
    shapeMinHeight?: number;
    shapeMinWidth?: number;
    style?: Record<string, any>;
    textStyle?: Record<string, any>;
}>;
declare const _componentDefaultItemProperties: React.MemoExoticComponent<(props: IDefaultItemPropertiesProps) => React.FunctionComponentElement<IDefaultItemPropertiesProps>>;
declare const DefaultItemProperties: typeof _componentDefaultItemProperties & IElementDescriptor;
type IEdgesProps = React.PropsWithChildren<{
    customDataExpr?: ((data: any, value: any) => any) | string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    fromExpr?: ((data: any, value: any) => any) | string;
    fromLineEndExpr?: ((data: any, value: any) => any) | string;
    fromPointIndexExpr?: ((data: any, value: any) => any) | string;
    keyExpr?: ((data: any, value: any) => any) | string;
    lineTypeExpr?: ((data: any, value: any) => any) | string;
    lockedExpr?: ((data: any, value: any) => any) | string;
    pointsExpr?: ((data: any, value: any) => any) | string;
    styleExpr?: ((data: any, value: any) => any) | string;
    textExpr?: ((data: any, value: any) => any) | string;
    textStyleExpr?: ((data: any, value: any) => any) | string;
    toExpr?: ((data: any, value: any) => any) | string;
    toLineEndExpr?: ((data: any, value: any) => any) | string;
    toPointIndexExpr?: ((data: any, value: any) => any) | string;
    zIndexExpr?: ((data: any, value: any) => any) | string;
}>;
declare const _componentEdges: React.MemoExoticComponent<(props: IEdgesProps) => React.FunctionComponentElement<IEdgesProps>>;
declare const Edges: typeof _componentEdges & IElementDescriptor;
type IEditingProps = React.PropsWithChildren<{
    allowAddShape?: boolean;
    allowChangeConnection?: boolean;
    allowChangeConnectorPoints?: boolean;
    allowChangeConnectorText?: boolean;
    allowChangeShapeText?: boolean;
    allowDeleteConnector?: boolean;
    allowDeleteShape?: boolean;
    allowMoveShape?: boolean;
    allowResizeShape?: boolean;
}>;
declare const _componentEditing: React.MemoExoticComponent<(props: IEditingProps) => React.FunctionComponentElement<IEditingProps>>;
declare const Editing: typeof _componentEditing & IElementDescriptor;
type IExportProps = React.PropsWithChildren<{
    fileName?: string;
}>;
declare const _componentExport: React.MemoExoticComponent<(props: IExportProps) => React.FunctionComponentElement<IExportProps>>;
declare const Export: typeof _componentExport & IElementDescriptor;
type IGridSizeProps = React.PropsWithChildren<{
    items?: Array<number>;
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
}>;
declare const _componentGridSize: React.MemoExoticComponent<(props: IGridSizeProps) => React.FunctionComponentElement<IGridSizeProps>>;
declare const GridSize: typeof _componentGridSize & IElementDescriptor;
type IGroupProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    title?: string;
    category?: "general" | "flowchart" | "orgChart" | "containers" | "custom";
    displayMode?: "icons" | "texts";
    expanded?: boolean;
    shapes?: Array<"text" | "rectangle" | "ellipse" | "cross" | "triangle" | "diamond" | "heart" | "pentagon" | "hexagon" | "octagon" | "star" | "arrowLeft" | "arrowTop" | "arrowRight" | "arrowBottom" | "arrowNorthSouth" | "arrowEastWest" | "process" | "decision" | "terminator" | "predefinedProcess" | "document" | "multipleDocuments" | "manualInput" | "preparation" | "data" | "database" | "hardDisk" | "internalStorage" | "paperTape" | "manualOperation" | "delay" | "storedData" | "display" | "merge" | "connector" | "or" | "summingJunction" | "verticalContainer" | "horizontalContainer" | "cardWithImageOnLeft" | "cardWithImageOnTop" | "cardWithImageOnRight">;
}>;
declare const _componentGroup: React.MemoExoticComponent<(props: IGroupProps) => React.FunctionComponentElement<IGroupProps>>;
declare const Group: typeof _componentGroup & IElementDescriptor;
type IHistoryToolbarProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    visible?: boolean;
}>;
declare const _componentHistoryToolbar: React.MemoExoticComponent<(props: IHistoryToolbarProps) => React.FunctionComponentElement<IHistoryToolbarProps>>;
declare const HistoryToolbar: typeof _componentHistoryToolbar & IElementDescriptor;
type IItemProps = React.PropsWithChildren<{
    icon?: string;
    items?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    location?: "after" | "before" | "center";
    name?: "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox";
    text?: string;
    height?: number;
    width?: number;
}>;
declare const _componentItem: React.MemoExoticComponent<(props: IItemProps) => React.FunctionComponentElement<IItemProps>>;
declare const Item: typeof _componentItem & IElementDescriptor;
type IMainToolbarProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    visible?: boolean;
}>;
declare const _componentMainToolbar: React.MemoExoticComponent<(props: IMainToolbarProps) => React.FunctionComponentElement<IMainToolbarProps>>;
declare const MainToolbar: typeof _componentMainToolbar & IElementDescriptor;
type INodesProps = React.PropsWithChildren<{
    autoLayout?: Record<string, any> | "auto" | "off" | "tree" | "layered" | {
        orientation?: "horizontal" | "vertical";
        type?: "auto" | "off" | "tree" | "layered";
    };
    autoSizeEnabled?: boolean;
    containerChildrenExpr?: ((data: any, value: any) => any) | string;
    containerKeyExpr?: ((data: any, value: any) => any) | string;
    customDataExpr?: ((data: any, value: any) => any) | string;
    dataSource?: Array<any> | DataSource | DataSourceOptions | null | Store | string;
    heightExpr?: ((data: any, value: any) => any) | string;
    imageUrlExpr?: ((data: any, value: any) => any) | string;
    itemsExpr?: ((data: any, value: any) => any) | string;
    keyExpr?: ((data: any, value: any) => any) | string;
    leftExpr?: ((data: any, value: any) => any) | string;
    lockedExpr?: ((data: any, value: any) => any) | string;
    parentKeyExpr?: ((data: any, value: any) => any) | string;
    styleExpr?: ((data: any, value: any) => any) | string;
    textExpr?: ((data: any, value: any) => any) | string;
    textStyleExpr?: ((data: any, value: any) => any) | string;
    topExpr?: ((data: any, value: any) => any) | string;
    typeExpr?: ((data: any, value: any) => any) | string;
    widthExpr?: ((data: any, value: any) => any) | string;
    zIndexExpr?: ((data: any, value: any) => any) | string;
}>;
declare const _componentNodes: React.MemoExoticComponent<(props: INodesProps) => React.FunctionComponentElement<INodesProps>>;
declare const Nodes: typeof _componentNodes & IElementDescriptor;
type IPageSizeProps = React.PropsWithChildren<{
    height?: number;
    items?: Array<Record<string, any>> | {
        height?: number;
        text?: string;
        width?: number;
    }[];
    width?: number;
    defaultHeight?: number;
    onHeightChange?: (value: number) => void;
    defaultWidth?: number;
    onWidthChange?: (value: number) => void;
}>;
declare const _componentPageSize: React.MemoExoticComponent<(props: IPageSizeProps) => React.FunctionComponentElement<IPageSizeProps>>;
declare const PageSize: typeof _componentPageSize & IElementDescriptor;
type IPageSizeItemProps = React.PropsWithChildren<{
    height?: number;
    text?: string;
    width?: number;
}>;
declare const _componentPageSizeItem: React.MemoExoticComponent<(props: IPageSizeItemProps) => React.FunctionComponentElement<IPageSizeItemProps>>;
declare const PageSizeItem: typeof _componentPageSizeItem & IElementDescriptor;
type IPropertiesPanelProps = React.PropsWithChildren<{
    tabs?: Array<Record<string, any>> | {
        commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
        groups?: Array<Record<string, any>> | {
            commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
            title?: string;
        }[];
        title?: string;
    }[];
    visibility?: "auto" | "visible" | "collapsed" | "disabled";
}>;
declare const _componentPropertiesPanel: React.MemoExoticComponent<(props: IPropertiesPanelProps) => React.FunctionComponentElement<IPropertiesPanelProps>>;
declare const PropertiesPanel: typeof _componentPropertiesPanel & IElementDescriptor;
type ITabProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    groups?: Array<Record<string, any>> | {
        commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
        title?: string;
    }[];
    title?: string;
}>;
declare const _componentTab: React.MemoExoticComponent<(props: ITabProps) => React.FunctionComponentElement<ITabProps>>;
declare const Tab: typeof _componentTab & IElementDescriptor;
type ITabGroupProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    title?: string;
}>;
declare const _componentTabGroup: React.MemoExoticComponent<(props: ITabGroupProps) => React.FunctionComponentElement<ITabGroupProps>>;
declare const TabGroup: typeof _componentTabGroup & IElementDescriptor;
type IToolboxProps = React.PropsWithChildren<{
    groups?: Array<Record<string, any>> | {
        category?: "general" | "flowchart" | "orgChart" | "containers" | "custom";
        displayMode?: "icons" | "texts";
        expanded?: boolean;
        shapes?: Array<"text" | "rectangle" | "ellipse" | "cross" | "triangle" | "diamond" | "heart" | "pentagon" | "hexagon" | "octagon" | "star" | "arrowLeft" | "arrowTop" | "arrowRight" | "arrowBottom" | "arrowNorthSouth" | "arrowEastWest" | "process" | "decision" | "terminator" | "predefinedProcess" | "document" | "multipleDocuments" | "manualInput" | "preparation" | "data" | "database" | "hardDisk" | "internalStorage" | "paperTape" | "manualOperation" | "delay" | "storedData" | "display" | "merge" | "connector" | "or" | "summingJunction" | "verticalContainer" | "horizontalContainer" | "cardWithImageOnLeft" | "cardWithImageOnTop" | "cardWithImageOnRight">;
        title?: string;
    }[];
    shapeIconsPerRow?: number;
    showSearch?: boolean;
    visibility?: "auto" | "visible" | "collapsed" | "disabled";
    width?: number;
}>;
declare const _componentToolbox: React.MemoExoticComponent<(props: IToolboxProps) => React.FunctionComponentElement<IToolboxProps>>;
declare const Toolbox: typeof _componentToolbox & IElementDescriptor;
type IToolboxGroupProps = React.PropsWithChildren<{
    category?: "general" | "flowchart" | "orgChart" | "containers" | "custom";
    displayMode?: "icons" | "texts";
    expanded?: boolean;
    shapes?: Array<"text" | "rectangle" | "ellipse" | "cross" | "triangle" | "diamond" | "heart" | "pentagon" | "hexagon" | "octagon" | "star" | "arrowLeft" | "arrowTop" | "arrowRight" | "arrowBottom" | "arrowNorthSouth" | "arrowEastWest" | "process" | "decision" | "terminator" | "predefinedProcess" | "document" | "multipleDocuments" | "manualInput" | "preparation" | "data" | "database" | "hardDisk" | "internalStorage" | "paperTape" | "manualOperation" | "delay" | "storedData" | "display" | "merge" | "connector" | "or" | "summingJunction" | "verticalContainer" | "horizontalContainer" | "cardWithImageOnLeft" | "cardWithImageOnTop" | "cardWithImageOnRight">;
    title?: string;
}>;
declare const _componentToolboxGroup: React.MemoExoticComponent<(props: IToolboxGroupProps) => React.FunctionComponentElement<IToolboxGroupProps>>;
declare const ToolboxGroup: typeof _componentToolboxGroup & IElementDescriptor;
type IViewToolbarProps = React.PropsWithChildren<{
    commands?: Array<CustomCommand | "separator" | "exportSvg" | "exportPng" | "exportJpg" | "undo" | "redo" | "cut" | "copy" | "paste" | "selectAll" | "delete" | "fontName" | "fontSize" | "bold" | "italic" | "underline" | "fontColor" | "lineStyle" | "lineWidth" | "lineColor" | "fillColor" | "textAlignLeft" | "textAlignCenter" | "textAlignRight" | "lock" | "unlock" | "sendToBack" | "bringToFront" | "insertShapeImage" | "editShapeImage" | "deleteShapeImage" | "connectorLineType" | "connectorLineStart" | "connectorLineEnd" | "layoutTreeTopToBottom" | "layoutTreeBottomToTop" | "layoutTreeLeftToRight" | "layoutTreeRightToLeft" | "layoutLayeredTopToBottom" | "layoutLayeredBottomToTop" | "layoutLayeredLeftToRight" | "layoutLayeredRightToLeft" | "fullScreen" | "zoomLevel" | "showGrid" | "snapToGrid" | "gridSize" | "units" | "pageSize" | "pageOrientation" | "pageColor" | "simpleView" | "toolbox">;
    visible?: boolean;
}>;
declare const _componentViewToolbar: React.MemoExoticComponent<(props: IViewToolbarProps) => React.FunctionComponentElement<IViewToolbarProps>>;
declare const ViewToolbar: typeof _componentViewToolbar & IElementDescriptor;
type IZoomLevelProps = React.PropsWithChildren<{
    items?: Array<number>;
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;
}>;
declare const _componentZoomLevel: React.MemoExoticComponent<(props: IZoomLevelProps) => React.FunctionComponentElement<IZoomLevelProps>>;
declare const ZoomLevel: typeof _componentZoomLevel & IElementDescriptor;
export default Diagram;
export { Diagram, IDiagramOptions, DiagramRef, AutoLayout, IAutoLayoutProps, Command, ICommandProps, CommandItem, ICommandItemProps, ConnectionPoint, IConnectionPointProps, ContextMenu, IContextMenuProps, ContextToolbox, IContextToolboxProps, CustomShape, ICustomShapeProps, DefaultItemProperties, IDefaultItemPropertiesProps, Edges, IEdgesProps, Editing, IEditingProps, Export, IExportProps, GridSize, IGridSizeProps, Group, IGroupProps, HistoryToolbar, IHistoryToolbarProps, Item, IItemProps, MainToolbar, IMainToolbarProps, Nodes, INodesProps, PageSize, IPageSizeProps, PageSizeItem, IPageSizeItemProps, PropertiesPanel, IPropertiesPanelProps, Tab, ITabProps, TabGroup, ITabGroupProps, Toolbox, IToolboxProps, ToolboxGroup, IToolboxGroupProps, ViewToolbar, IViewToolbarProps, ZoomLevel, IZoomLevelProps };
import type * as DiagramTypes from 'dpt-ui/ui/diagram_types';
export { DiagramTypes };
