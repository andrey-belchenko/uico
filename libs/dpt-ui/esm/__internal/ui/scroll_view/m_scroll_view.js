/**
 * DevExtreme (esm/__internal/ui/scroll_view/m_scroll_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import devices from "../../../core/devices";
import {
    getPublicElement
} from "../../../core/element";
import $ from "../../../core/renderer";
import {
    noop
} from "../../../core/utils/common";
import {
    extend
} from "../../../core/utils/extend";
import {
    hasWindow
} from "../../../core/utils/window";
import messageLocalization from "../../../localization/message";
import LoadIndicator from "../../../ui/load_indicator";
import LoadPanel from "../../../ui/load_panel";
import {
    isMaterialBased
} from "../../../ui/themes";
import PullDownStrategy from "./m_scroll_view.native.pull_down";
import SwipeDownStrategy from "./m_scroll_view.native.swipe_down";
import SimulatedStrategy from "./m_scroll_view.simulated";
import Scrollable from "./m_scrollable";
const SCROLLVIEW_CLASS = "dx-scrollview";
const SCROLLVIEW_CONTENT_CLASS = "dx-scrollview-content";
const SCROLLVIEW_TOP_POCKET_CLASS = "dx-scrollview-top-pocket";
const SCROLLVIEW_BOTTOM_POCKET_CLASS = "dx-scrollview-bottom-pocket";
const SCROLLVIEW_PULLDOWN_CLASS = "dx-scrollview-pull-down";
const SCROLLVIEW_REACHBOTTOM_CLASS = "dx-scrollview-scrollbottom";
const SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = "dx-scrollview-scrollbottom-indicator";
const SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = "dx-scrollview-scrollbottom-text";
const SCROLLVIEW_LOADPANEL = "dx-scrollview-loadpanel";
const refreshStrategies = {
    pullDown: PullDownStrategy,
    swipeDown: SwipeDownStrategy,
    simulated: SimulatedStrategy
};
const isServerSide = !hasWindow();
const scrollViewServerConfig = {
    finishLoading: noop,
    release: noop,
    refresh: noop,
    scrollOffset: () => ({
        top: 0,
        left: 0
    }),
    _optionChanged(args) {
        if ("onUpdated" !== args.name) {
            return this.callBase.apply(this, arguments)
        }
    }
};
const ScrollView = Scrollable.inherit(isServerSide ? scrollViewServerConfig : {
    _getDefaultOptions() {
        return extend(this.callBase(), {
            pullingDownText: messageLocalization.format("dxScrollView-pullingDownText"),
            pulledDownText: messageLocalization.format("dxScrollView-pulledDownText"),
            refreshingText: messageLocalization.format("dxScrollView-refreshingText"),
            reachBottomText: messageLocalization.format("dxScrollView-reachBottomText"),
            onPullDown: null,
            onReachBottom: null,
            refreshStrategy: "pullDown"
        })
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device() {
                const realDevice = devices.real();
                return "android" === realDevice.platform
            },
            options: {
                refreshStrategy: "swipeDown"
            }
        }, {
            device: () => isMaterialBased(),
            options: {
                pullingDownText: "",
                pulledDownText: "",
                refreshingText: "",
                reachBottomText: ""
            }
        }])
    },
    _init() {
        this.callBase();
        this._loadingIndicatorEnabled = true
    },
    _initScrollableMarkup() {
        this.callBase();
        this.$element().addClass("dx-scrollview");
        this._initContent();
        this._initTopPocket();
        this._initBottomPocket();
        this._initLoadPanel()
    },
    _initContent() {
        const $content = $("<div>").addClass("dx-scrollview-content");
        this._$content.wrapInner($content)
    },
    _initTopPocket() {
        const $topPocket = this._$topPocket = $("<div>").addClass("dx-scrollview-top-pocket");
        const $pullDown = this._$pullDown = $("<div>").addClass("dx-scrollview-pull-down");
        $topPocket.append($pullDown);
        this._$content.prepend($topPocket)
    },
    _initBottomPocket() {
        const $bottomPocket = this._$bottomPocket = $("<div>").addClass("dx-scrollview-bottom-pocket");
        const $reachBottom = this._$reachBottom = $("<div>").addClass("dx-scrollview-scrollbottom");
        const $loadContainer = $("<div>").addClass("dx-scrollview-scrollbottom-indicator");
        const $loadIndicator = new LoadIndicator($("<div>")).$element();
        const $text = this._$reachBottomText = $("<div>").addClass("dx-scrollview-scrollbottom-text");
        this._updateReachBottomText();
        $reachBottom.append($loadContainer.append($loadIndicator)).append($text);
        $bottomPocket.append($reachBottom);
        this._$content.append($bottomPocket)
    },
    _initLoadPanel() {
        const $loadPanelElement = $("<div>").addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
        const loadPanelOptions = {
            shading: false,
            delay: 400,
            message: this.option("refreshingText"),
            position: {
                of: this.$element()
            }
        };
        this._loadPanel = this._createComponent($loadPanelElement, LoadPanel, loadPanelOptions)
    },
    _updateReachBottomText() {
        this._$reachBottomText.text(this.option("reachBottomText"))
    },
    _createStrategy() {
        const strategyName = this.option("useNative") ? this.option("refreshStrategy") : "simulated";
        const strategyClass = refreshStrategies[strategyName];
        this._strategy = new strategyClass(this);
        this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
        this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
        this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this))
    },
    _createActions() {
        this.callBase();
        this._pullDownAction = this._createActionByOption("onPullDown");
        this._reachBottomAction = this._createActionByOption("onReachBottom");
        this._tryRefreshPocketState()
    },
    _tryRefreshPocketState() {
        this._pullDownEnable(this.hasActionSubscription("onPullDown"));
        this._reachBottomEnable(this.hasActionSubscription("onReachBottom"))
    },
    on(eventName) {
        const result = this.callBase.apply(this, arguments);
        if ("pullDown" === eventName || "reachBottom" === eventName) {
            this._tryRefreshPocketState()
        }
        return result
    },
    _pullDownEnable(enabled) {
        if (0 === arguments.length) {
            return this._pullDownEnabled
        }
        if (this._$pullDown && this._strategy) {
            this._$pullDown.toggle(enabled);
            this._strategy.pullDownEnable(enabled);
            this._pullDownEnabled = enabled
        }
    },
    _reachBottomEnable(enabled) {
        if (0 === arguments.length) {
            return this._reachBottomEnabled
        }
        if (this._$reachBottom && this._strategy) {
            this._$reachBottom.toggle(enabled);
            this._strategy.reachBottomEnable(enabled);
            this._reachBottomEnabled = enabled
        }
    },
    _pullDownHandler() {
        this._loadingIndicator(false);
        this._pullDownLoading()
    },
    _loadingIndicator(value) {
        if (arguments.length < 1) {
            return this._loadingIndicatorEnabled
        }
        this._loadingIndicatorEnabled = value
    },
    _pullDownLoading() {
        this.startLoading();
        this._pullDownAction()
    },
    _reachBottomHandler() {
        this._loadingIndicator(false);
        this._reachBottomLoading()
    },
    _reachBottomLoading() {
        this.startLoading();
        this._reachBottomAction()
    },
    _releaseHandler() {
        this.finishLoading();
        this._loadingIndicator(true)
    },
    _optionChanged(args) {
        switch (args.name) {
            case "onPullDown":
            case "onReachBottom":
                this._createActions();
                break;
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "refreshStrategy":
                this._invalidate();
                break;
            case "reachBottomText":
                this._updateReachBottomText();
                break;
            default:
                this.callBase(args)
        }
    },
    content() {
        return getPublicElement(this._$content.children().eq(1))
    },
    release(preventReachBottom) {
        if (void 0 !== preventReachBottom) {
            this.toggleLoading(!preventReachBottom)
        }
        return this._strategy.release()
    },
    toggleLoading(showOrHide) {
        this._reachBottomEnable(showOrHide)
    },
    refresh() {
        if (!this.hasActionSubscription("onPullDown")) {
            return
        }
        this._strategy.pendingRelease();
        this._pullDownLoading()
    },
    startLoading() {
        if (this._loadingIndicator() && this.$element().is(":visible")) {
            this._loadPanel.show()
        }
        this._lock()
    },
    finishLoading() {
        this._loadPanel.hide();
        this._unlock()
    },
    _dispose() {
        this._strategy.dispose();
        this.callBase();
        if (this._loadPanel) {
            this._loadPanel.$element().remove()
        }
    }
});
registerComponent("dxScrollView", ScrollView);
export default ScrollView;
