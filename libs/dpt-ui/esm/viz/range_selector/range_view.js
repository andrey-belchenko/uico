/**
 * DevExtreme (esm/viz/range_selector/range_view.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
function drawSeriesView(root, seriesDataSource, canvas, isAnimationEnabled) {
    const seriesList = seriesDataSource.getSeries();
    if (!seriesList.length) {
        return
    }
    const valueAxis = seriesList[0].getValueAxis();
    valueAxis.updateCanvas({
        top: canvas.top,
        bottom: 0,
        height: canvas.height + canvas.top
    });
    seriesDataSource.adjustSeriesDimensions();
    const valueRange = seriesDataSource.getBoundRange().val;
    valueRange.sortCategories(valueAxis.getCategoriesSorter());
    valueAxis.setBusinessRange(valueRange);
    seriesList.forEach((series => {
        series._extGroups.seriesGroup = series._extGroups.labelsGroup = root;
        series.draw(isAnimationEnabled)
    }))
}

function merge(a, b) {
    return void 0 !== a ? a : b
}
export function RangeView(params) {
    this._params = params;
    this._clipRect = params.renderer.clipRect();
    params.root.attr({
        "clip-path": this._clipRect.id
    })
}
RangeView.prototype = {
    constructor: RangeView,
    update: function(backgroundOption, backgroundTheme, canvas, isCompactMode, isAnimationEnabled, seriesDataSource) {
        const renderer = this._params.renderer;
        const root = this._params.root;
        const canvasWidth = canvas.width - canvas.left;
        let seriesGroup;
        backgroundOption = backgroundOption || {};
        root.clear();
        this._clipRect.attr({
            x: canvas.left,
            y: canvas.top,
            width: canvasWidth,
            height: canvas.height
        });
        if (!isCompactMode) {
            if (merge(backgroundOption.visible, backgroundTheme.visible)) {
                if (backgroundOption.color) {
                    renderer.rect(canvas.left, canvas.top, canvasWidth + 1, canvas.height).attr({
                        fill: merge(backgroundOption.color, backgroundTheme.color),
                        class: "dx-range-selector-background"
                    }).append(root)
                }
                if (backgroundOption.image && backgroundOption.image.url) {
                    renderer.image(canvas.left, canvas.top, canvasWidth + 1, canvas.height, backgroundOption.image.url, merge(backgroundOption.image.location, backgroundTheme.image.location)).append(root)
                }
            }
            if (seriesDataSource && seriesDataSource.isShowChart()) {
                seriesGroup = renderer.g().attr({
                    class: "dxrs-series-group"
                }).append(root);
                drawSeriesView(seriesGroup, seriesDataSource, canvas, isAnimationEnabled)
            }
        }
    }
};
