/**
 * DevExtreme (esm/__internal/ui/scroll_view/m_scroll_view.simulated.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import $ from "../../../core/renderer";
import Callbacks from "../../../core/utils/callbacks";
import {
    executeAsync
} from "../../../core/utils/common";
import {
    extend
} from "../../../core/utils/extend";
import {
    each
} from "../../../core/utils/iterator";
import {
    getHeight
} from "../../../core/utils/size";
import LoadIndicator from "../../../ui/load_indicator";
import {
    Scroller,
    SimulatedStrategy
} from "./m_scrollable.simulated";
const math = Math;
const SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-loading";
const SCROLLVIEW_PULLDOWN_READY_CLASS = "dx-scrollview-pull-down-ready";
const SCROLLVIEW_PULLDOWN_IMAGE_CLASS = "dx-scrollview-pull-down-image";
const SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
const SCROLLVIEW_PULLDOWN_TEXT_CLASS = "dx-scrollview-pull-down-text";
const SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = "dx-scrollview-pull-down-text-visible";
const STATE_RELEASED = 0;
const STATE_READY = 1;
const STATE_REFRESHING = 2;
const STATE_LOADING = 3;
const ScrollViewScroller = Scroller.inherit({
    ctor() {
        this._topPocketSize = 0;
        this._bottomPocketSize = 0;
        this.callBase.apply(this, arguments);
        this._initCallbacks();
        this._releaseState()
    },
    _releaseState() {
        this._state = 0;
        this._refreshPullDownText()
    },
    _refreshPullDownText() {
        const that = this;
        const pullDownTextItems = [{
            element: this._$pullingDownText,
            visibleState: 0
        }, {
            element: this._$pulledDownText,
            visibleState: 1
        }, {
            element: this._$refreshingText,
            visibleState: 2
        }];
        each(pullDownTextItems, ((_, item) => {
            const action = that._state === item.visibleState ? "addClass" : "removeClass";
            item.element[action]("dx-scrollview-pull-down-text-visible")
        }))
    },
    _initCallbacks() {
        this.pullDownCallbacks = Callbacks();
        this.releaseCallbacks = Callbacks();
        this.reachBottomCallbacks = Callbacks()
    },
    _updateBounds() {
        const considerPockets = "horizontal" !== this._direction;
        if (considerPockets) {
            this._topPocketSize = this._$topPocket.get(0).clientHeight;
            this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
            const containerEl = this._$container.get(0);
            const contentEl = this._$content.get(0);
            this._bottomBoundary = Math.max(contentEl.clientHeight - this._bottomPocketSize - containerEl.clientHeight, 0)
        }
        this.callBase()
    },
    _updateScrollbar() {
        this._scrollbar.option({
            containerSize: this._containerSize(),
            contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
            scaleRatio: this._getScaleRatio()
        })
    },
    _moveContent() {
        this.callBase();
        if (this._isPullDown()) {
            this._pullDownReady()
        } else if (this._isReachBottom()) {
            this._reachBottomReady()
        } else if (0 !== this._state) {
            this._stateReleased()
        }
    },
    _moveScrollbar() {
        this._scrollbar.moveTo(this._topPocketSize + this._location)
    },
    _isPullDown() {
        return this._pullDownEnabled && this._location >= 0
    },
    _isReachBottom() {
        const containerEl = this._$container.get(0);
        return this._reachBottomEnabled && Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1
    },
    _scrollComplete() {
        if (this._inBounds() && 1 === this._state) {
            this._pullDownRefreshing()
        } else if (this._inBounds() && 3 === this._state) {
            this._reachBottomLoading()
        } else {
            this.callBase()
        }
    },
    _reachBottomReady() {
        if (3 === this._state) {
            return
        }
        this._state = 3;
        this._minOffset = this._getMinOffset()
    },
    _getMaxOffset() {
        return -this._topPocketSize
    },
    _getMinOffset() {
        return math.min(this.callBase(), -this._topPocketSize)
    },
    _reachBottomLoading() {
        this.reachBottomCallbacks.fire()
    },
    _pullDownReady() {
        if (1 === this._state) {
            return
        }
        this._state = 1;
        this._maxOffset = 0;
        this._$pullDown.addClass("dx-scrollview-pull-down-ready");
        this._refreshPullDownText()
    },
    _stateReleased() {
        if (0 === this._state) {
            return
        }
        this._releaseState();
        this._updateBounds();
        this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
        this.releaseCallbacks.fire()
    },
    _pullDownRefreshing() {
        if (2 === this._state) {
            return
        }
        this._state = 2;
        this._$pullDown.addClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
        this._refreshPullDownText();
        this.pullDownCallbacks.fire()
    },
    _releaseHandler() {
        if (0 === this._state) {
            this._moveToBounds()
        }
        this._update();
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this._releaseTask = executeAsync(this._release.bind(this));
        return this._releaseTask.promise
    },
    _release() {
        this._stateReleased();
        this._scrollComplete()
    },
    _reachBottomEnablingHandler(enabled) {
        if (this._reachBottomEnabled === enabled) {
            return
        }
        this._reachBottomEnabled = enabled;
        this._updateBounds()
    },
    _pullDownEnablingHandler(enabled) {
        if (this._pullDownEnabled === enabled) {
            return
        }
        this._pullDownEnabled = enabled;
        this._considerTopPocketChange();
        this._updateHandler()
    },
    _considerTopPocketChange() {
        this._location -= getHeight(this._$topPocket) || -this._topPocketSize;
        this._maxOffset = 0;
        this._move()
    },
    _pendingReleaseHandler() {
        this._state = 1
    },
    dispose() {
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this.callBase()
    }
});
const SimulatedScrollViewStrategy = SimulatedStrategy.inherit({
    _init(scrollView) {
        this.callBase(scrollView);
        this._$pullDown = scrollView._$pullDown;
        this._$topPocket = scrollView._$topPocket;
        this._$bottomPocket = scrollView._$bottomPocket;
        this._initCallbacks()
    },
    _initCallbacks() {
        this.pullDownCallbacks = Callbacks();
        this.releaseCallbacks = Callbacks();
        this.reachBottomCallbacks = Callbacks()
    },
    render() {
        this._renderPullDown();
        this.callBase()
    },
    _renderPullDown() {
        const $image = $("<div>").addClass("dx-scrollview-pull-down-image");
        const $loadContainer = $("<div>").addClass("dx-scrollview-pull-down-indicator");
        const $loadIndicator = new LoadIndicator($("<div>")).$element();
        const $text = this._$pullDownText = $("<div>").addClass("dx-scrollview-pull-down-text");
        this._$pullingDownText = $("<div>").text(this.option("pullingDownText")).appendTo($text);
        this._$pulledDownText = $("<div>").text(this.option("pulledDownText")).appendTo($text);
        this._$refreshingText = $("<div>").text(this.option("refreshingText")).appendTo($text);
        this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append($text)
    },
    pullDownEnable(enabled) {
        this._eventHandler("pullDownEnabling", enabled)
    },
    reachBottomEnable(enabled) {
        this._eventHandler("reachBottomEnabling", enabled)
    },
    _createScroller(direction) {
        const that = this;
        const scroller = that._scrollers[direction] = new ScrollViewScroller(that._scrollerOptions(direction));
        scroller.pullDownCallbacks.add((() => {
            that.pullDownCallbacks.fire()
        }));
        scroller.releaseCallbacks.add((() => {
            that.releaseCallbacks.fire()
        }));
        scroller.reachBottomCallbacks.add((() => {
            that.reachBottomCallbacks.fire()
        }))
    },
    _scrollerOptions(direction) {
        return extend(this.callBase(direction), {
            $topPocket: this._$topPocket,
            $bottomPocket: this._$bottomPocket,
            $pullDown: this._$pullDown,
            $pullDownText: this._$pullDownText,
            $pullingDownText: this._$pullingDownText,
            $pulledDownText: this._$pulledDownText,
            $refreshingText: this._$refreshingText
        })
    },
    pendingRelease() {
        this._eventHandler("pendingRelease")
    },
    release() {
        return this._eventHandler("release").done(this._updateAction)
    },
    location() {
        const location = this.callBase();
        location.top += getHeight(this._$topPocket);
        return location
    },
    dispose() {
        each(this._scrollers, (function() {
            this.dispose()
        }));
        this.callBase()
    }
});
export default SimulatedScrollViewStrategy;
