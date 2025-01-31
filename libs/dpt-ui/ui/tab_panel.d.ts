/**
* DevExtreme (ui/tab_panel.d.ts)
* Version: 24.1.3
* Build date: Tue Jun 11 2024
*
* Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
*/
import { DataSourceLike } from '../data/data_source';
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
} from '../core/templates/template';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../events/index';

import {
    Position,
    TabsIconPosition,
    TabsStyle,
} from '../common';

import CollectionWidget, {
    SelectionChangedInfo,
} from './collection/ui.collection_widget.base';

import {
    Item as dxMultiViewItem,
    dxMultiViewBaseOptions,
} from './multi_view';

export {
    Position,
    TabsIconPosition,
    TabsStyle,
};

type ItemLike = string | Item | any;

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface TabPanelItemInfo<TItem extends ItemLike> {
    /**
     * 
     */
    readonly itemData?: TItem;
    /**
     * 
     */
    readonly itemElement?: DxElement;
}

/**
 * The type of the contentReady event handler&apos;s argument.
 */
export type ContentReadyEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>>;

/**
 * The type of the disposing event handler&apos;s argument.
 */
export type DisposingEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>>;

/**
 * The type of the initialized event handler&apos;s argument.
 */
export type InitializedEvent<TItem extends ItemLike = any, TKey = any> = InitializedEventInfo<dxTabPanel<TItem, TKey>>;

/**
 * The type of the itemClick event handler&apos;s argument.
 */
export type ItemClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxTabPanel<TItem, TKey>, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * The type of the itemContextMenu event handler&apos;s argument.
 */
export type ItemContextMenuEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxTabPanel<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * The type of the itemHold event handler&apos;s argument.
 */
export type ItemHoldEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxTabPanel<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * The type of the itemRendered event handler&apos;s argument.
 */
export type ItemRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>> & ItemInfo<TItem>;

/**
 * The type of the optionChanged event handler&apos;s argument.
 */
export type OptionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>> & ChangedOptionInfo;

/**
 * The type of the selectionChanged event handler&apos;s argument.
 */
export type SelectionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>> & SelectionChangedInfo<TItem>;

/**
 * The type of the titleClick event handler&apos;s argument.
 */
export type TitleClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxTabPanel<TItem, TKey>, KeyboardEvent | MouseEvent | PointerEvent> & TabPanelItemInfo<TItem>;

/**
 * The type of the titleHold event handler&apos;s argument.
 */
export type TitleHoldEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxTabPanel<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & TabPanelItemInfo<TItem>;

/**
 * The type of the titleRendered event handler&apos;s argument.
 */
export type TitleRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxTabPanel<TItem, TKey>> & TabPanelItemInfo<TItem>;

/**
 * 
 * @deprecated 
 */
export interface dxTabPanelOptions<
    TItem extends ItemLike = any,
    TKey = any,
> extends dxMultiViewBaseOptions<dxTabPanel<TItem, TKey>, TItem, TKey> {
    /**
     * Specifies whether or not to animate the displayed item change.
     */
    animationEnabled?: boolean;
    /**
     * Binds the UI component to data.
     */
    dataSource?: DataSourceLike<TItem, TKey> | null;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies a custom template for item titles.
     */
    itemTitleTemplate?: template | ((itemData: TItem, itemIndex: number, itemElement: DxElement) => string | UserDefinedElement);
    /**
     * Specifies icon position relative to the text inside the tab.
     */
    iconPosition?: TabsIconPosition;
    /**
     * An array of items displayed by the UI component.
     */
    items?: Array<TItem>;
    /**
     * A function that is executed when a tab is clicked or tapped.
     */
    onTitleClick?: ((e: TitleClickEvent<TItem, TKey>) => void) | string;
    /**
     * A function that is executed when a tab has been held for a specified period.
     */
    onTitleHold?: ((e: TitleHoldEvent<TItem, TKey>) => void);
    /**
     * A function that is executed after a tab is rendered.
     */
    onTitleRendered?: ((e: TitleRenderedEvent<TItem, TKey>) => void);
    /**
     * Specifies whether to repaint only those elements whose data changed.
     */
    repaintChangesOnly?: boolean;
    /**
     * A Boolean value specifying if tabs in the title are scrolled by content.
     */
    scrollByContent?: boolean;
    /**
     * A Boolean indicating whether or not to add scrolling support for tabs in the title.
     */
    scrollingEnabled?: boolean;
    /**
     * Specifies whether navigation buttons should be available when tabs exceed the UI component&apos;s width.
     */
    showNavButtons?: boolean;
    /**
     * Specifies the styling mode for the active tab.
     */
    stylingMode?: TabsStyle;
    /**
     * A Boolean value specifying whether or not to allow users to change the selected index by swiping.
     */
    swipeEnabled?: boolean;
    /**
     * Specifies tab position relative to the panel.
     */
    tabsPosition?: Position;
}
/**
 * The TabPanel is a UI component consisting of the Tabs and MultiView UI components. It automatically synchronizes the selected tab with the currently displayed view, and vice versa.
 */
export default class dxTabPanel<
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidget<Properties<TItem, TKey>, TItem, TKey> { }

export type Item = dxTabPanelItem;

/**
 * @deprecated Use Item instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxTabPanelItem extends Omit<dxMultiViewItem, 'visible'> {
    /**
     * Specifies a badge text for the tab.
     */
    badge?: string;
    /**
     * Specifies the icon to be displayed in the tab&apos;s title.
     */
    icon?: string;
    /**
     * Specifies a template that should be used to render the tab for this item only.
     */
    tabTemplate?: template | (() => string | UserDefinedElement);
    /**
     * Specifies the item title text displayed on a corresponding tab.
     */
    title?: string;
}

export type ExplicitTypes<
    TItem extends ItemLike,
    TKey,
> = {
    Properties: Properties<TItem, TKey>;
    ContentReadyEvent: ContentReadyEvent<TItem, TKey>;
    DisposingEvent: DisposingEvent<TItem, TKey>;
    InitializedEvent: InitializedEvent<TItem, TKey>;
    ItemClickEvent: ItemClickEvent<TItem, TKey>;
    ItemContextMenuEvent: ItemContextMenuEvent<TItem, TKey>;
    ItemHoldEvent: ItemHoldEvent<TItem, TKey>;
    ItemRenderedEvent: ItemRenderedEvent<TItem, TKey>;
    OptionChangedEvent: OptionChangedEvent<TItem, TKey>;
    SelectionChangedEvent: SelectionChangedEvent<TItem, TKey>;
    TitleClickEvent: TitleClickEvent<TItem, TKey>;
    TitleHoldEvent: TitleHoldEvent<TItem, TKey>;
    TitleRenderedEvent: TitleRenderedEvent<TItem, TKey>;
};

export type Properties<
    TItem extends ItemLike = any,
    TKey = any,
> = dxTabPanelOptions<TItem, TKey>;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.dpt-ext-ui.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options<
    TItem extends ItemLike = any,
    TKey = any,
> = Properties<TItem, TKey>;


