/**
 * DevExtreme (esm/__internal/ui/scroll_view/m_scroll_view.native.swipe_down.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import {
    move
} from "../../../animation/translator";
import $ from "../../../core/renderer";
import Callbacks from "../../../core/utils/callbacks";
import {
    Deferred
} from "../../../core/utils/deferred";
import {
    getOuterHeight
} from "../../../core/utils/size";
import {
    eventData
} from "../../../events/utils/index";
import LoadIndicator from "../../../ui/load_indicator";
import NativeStrategy from "./m_scrollable.native";
const SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = "dx-scrollview-pull-down-loading";
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-refreshing";
const PULLDOWN_ICON_CLASS = "dx-icon-pulldown";
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_TOUCHED = 4;
const STATE_PULLED = 5;
const SwipeDownNativeScrollViewStrategy = NativeStrategy.inherit({
    _init(scrollView) {
        this.callBase(scrollView);
        this._$topPocket = scrollView._$topPocket;
        this._$pullDown = scrollView._$pullDown;
        this._$scrollViewContent = $(scrollView.content());
        this._$container = $(scrollView.container());
        this._initCallbacks();
        this._location = 0
    },
    _initCallbacks() {
        this.pullDownCallbacks = Callbacks();
        this.releaseCallbacks = Callbacks();
        this.reachBottomCallbacks = Callbacks()
    },
    render() {
        this.callBase();
        this._renderPullDown();
        this._releaseState()
    },
    _renderPullDown() {
        const $loadContainer = $("<div>").addClass("dx-scrollview-pull-down-indicator");
        const $loadIndicator = new LoadIndicator($("<div>")).$element();
        this._$icon = $("<div>").addClass("dx-icon-pulldown");
        this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator))
    },
    _releaseState() {
        this._state = 0;
        this._releasePullDown();
        this._updateDimensions()
    },
    _releasePullDown() {
        this._$pullDown.css({
            opacity: 0
        })
    },
    _updateDimensions() {
        this.callBase();
        this._topPocketSize = this._$topPocket.get(0).clientHeight;
        const contentEl = this._$scrollViewContent.get(0);
        const containerEl = this._$container.get(0);
        this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0)
    },
    _allowedDirections() {
        const allowedDirections = this.callBase();
        allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
        return allowedDirections
    },
    handleInit(e) {
        this.callBase(e);
        if (0 === this._state && 0 === this._location) {
            this._startClientY = eventData(e.originalEvent).y;
            this._state = 4
        }
    },
    handleMove(e) {
        this.callBase(e);
        this._deltaY = eventData(e.originalEvent).y - this._startClientY;
        if (4 === this._state) {
            if (this._pullDownEnabled && this._deltaY > 0) {
                this._state = 5
            } else {
                this._complete()
            }
        }
        if (5 === this._state) {
            e.preventDefault();
            this._movePullDown()
        }
    },
    _movePullDown() {
        const pullDownHeight = this._getPullDownHeight();
        const top = Math.min(3 * pullDownHeight, this._deltaY + this._getPullDownStartPosition());
        const angle = 180 * top / pullDownHeight / 3;
        this._$pullDown.css({
            opacity: 1
        }).toggleClass("dx-scrollview-pull-down-refreshing", top < pullDownHeight);
        move(this._$pullDown, {
            top: top
        });
        this._$icon.css({
            transform: `rotate(${angle}deg)`
        })
    },
    _isPullDown() {
        return this._pullDownEnabled && 5 === this._state && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition()
    },
    _getPullDownHeight() {
        return Math.round(.05 * getOuterHeight(this._$element))
    },
    _getPullDownStartPosition() {
        return -Math.round(1.5 * getOuterHeight(this._$pullDown))
    },
    handleEnd() {
        if (this._isPullDown()) {
            this._pullDownRefreshing()
        }
        this._complete()
    },
    handleStop() {
        this._complete()
    },
    _complete() {
        if (4 === this._state || 5 === this._state) {
            this._releaseState()
        }
    },
    handleScroll(e) {
        this.callBase(e);
        if (2 === this._state) {
            return
        }
        const currentLocation = this.location().top;
        const scrollDelta = this._location - currentLocation;
        this._location = currentLocation;
        if (scrollDelta > 0 && this._isReachBottom()) {
            this._reachBottom()
        } else {
            this._stateReleased()
        }
    },
    _isReachBottom() {
        return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1
    },
    _reachBottom() {
        this.reachBottomCallbacks.fire()
    },
    _stateReleased() {
        if (0 === this._state) {
            return
        }
        this._$pullDown.removeClass("dx-scrollview-pull-down-loading");
        this._releaseState()
    },
    _pullDownRefreshing() {
        this._state = 2;
        this._pullDownRefreshHandler()
    },
    _pullDownRefreshHandler() {
        this._refreshPullDown();
        this.pullDownCallbacks.fire()
    },
    _refreshPullDown() {
        this._$pullDown.addClass("dx-scrollview-pull-down-loading");
        move(this._$pullDown, {
            top: this._getPullDownHeight()
        })
    },
    pullDownEnable(enabled) {
        this._$topPocket.toggle(enabled);
        this._pullDownEnabled = enabled
    },
    reachBottomEnable(enabled) {
        this._reachBottomEnabled = enabled
    },
    pendingRelease() {
        this._state = 1
    },
    release() {
        const deferred = Deferred();
        this._updateDimensions();
        clearTimeout(this._releaseTimeout);
        this._releaseTimeout = setTimeout((() => {
            this._stateReleased();
            this.releaseCallbacks.fire();
            this._updateAction();
            deferred.resolve()
        }), 800);
        return deferred.promise()
    },
    dispose() {
        clearTimeout(this._pullDownRefreshTimeout);
        clearTimeout(this._releaseTimeout);
        this.callBase()
    }
});
export default SwipeDownNativeScrollViewStrategy;
