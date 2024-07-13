"use strict";

/* Comment lines below for the widgets you don't require and run "dptuicomp-bundler" in this directory, then include dx.custom.js in your project */

/* Core (dx.module-core.js) */
/* eslint-disable import/no-commonjs */
const DevExpress = require('dptuicomp/bundles/modules/core');

/* Integrations (dx.module-core.js) */

require('dptuicomp/integration/jquery');
require('dptuicomp/integration/knockout');

require('dptuicomp/localization/globalize/core');
require('dptuicomp/localization/globalize/message');
require('dptuicomp/localization/globalize/number');
require('dptuicomp/localization/globalize/date');
require('dptuicomp/localization/globalize/currency');

/* Events (dx.module-core.js) */

require('dptuicomp/events/click');
require('dptuicomp/events/contextmenu');
require('dptuicomp/events/double_click');
require('dptuicomp/events/drag');
require('dptuicomp/events/hold');
require('dptuicomp/events/hover');
require('dptuicomp/events/pointer');
require('dptuicomp/events/swipe');
require('dptuicomp/events/transform');


/* Data (dx.module-core.js) */

const data = DevExpress.data = require('dptuicomp/bundles/modules/data');

data.odata = require('dptuicomp/bundles/modules/data.odata');


/* UI core (dx.module-core.js) */

const ui = DevExpress.ui = require('dptuicomp/bundles/modules/ui');

ui.themes = require('dptuicomp/ui/themes');

// deprecated
ui.setTemplateEngine = require('dptuicomp/core/templates/template_engine_registry').setTemplateEngine;

ui.dialog = require('dptuicomp/ui/dialog');
ui.notify = require('dptuicomp/ui/notify');
ui.repaintFloatingActionButton = require('dptuicomp/ui/speed_dial_action/repaint_floating_action_button');
ui.hideToasts = require('dptuicomp/ui/toast/hide_toasts');

/* Base widgets (dx.module-widgets-base.js) */

ui.dxActionSheet = require('dptuicomp/ui/action_sheet');
ui.dxAutocomplete = require('dptuicomp/ui/autocomplete');
ui.dxBox = require('dptuicomp/ui/box');
ui.dxButton = require('dptuicomp/ui/button');
ui.dxDropDownButton = require('dptuicomp/ui/drop_down_button');
ui.dxButtonGroup = require('dptuicomp/ui/button_group');
ui.dxCalendar = require('dptuicomp/ui/calendar');
ui.dxCheckBox = require('dptuicomp/ui/check_box');
ui.dxColorBox = require('dptuicomp/ui/color_box');
ui.dxDateBox = require('dptuicomp/ui/date_box');
ui.dxDateRangeBox = require('dptuicomp/ui/date_range_box');
ui.dxDrawer = require('dptuicomp/ui/drawer');
ui.dxDeferRendering = require('dptuicomp/ui/defer_rendering');
ui.dxDropDownBox = require('dptuicomp/ui/drop_down_box');
ui.dxFileUploader = require('dptuicomp/ui/file_uploader');
ui.dxForm = require('dptuicomp/ui/form');
ui.dxGallery = require('dptuicomp/ui/gallery');
ui.dxHtmlEditor = require('dptuicomp/ui/html_editor');
ui.dxList = require('dptuicomp/ui/list');
ui.dxLoadIndicator = require('dptuicomp/ui/load_indicator');
ui.dxLoadPanel = require('dptuicomp/ui/load_panel');
ui.dxLookup = require('dptuicomp/ui/lookup');
ui.dxMap = require('dptuicomp/ui/map');
ui.dxMultiView = require('dptuicomp/ui/multi_view');
ui.dxNumberBox = require('dptuicomp/ui/number_box');
ui.dxOverlay = require('dptuicomp/ui/overlay/ui.overlay');
ui.dxPopover = require('dptuicomp/ui/popover');
ui.dxPopup = require('dptuicomp/ui/popup');
ui.dxProgressBar = require('dptuicomp/ui/progress_bar');
ui.dxRadioGroup = require('dptuicomp/ui/radio_group');
ui.dxRangeSlider = require('dptuicomp/ui/range_slider');
ui.dxResizable = require('dptuicomp/ui/resizable');
ui.dxResponsiveBox = require('dptuicomp/ui/responsive_box');
ui.dxScrollView = require('dptuicomp/ui/scroll_view');
ui.dxSelectBox = require('dptuicomp/ui/select_box');
ui.dxSlider = require('dptuicomp/ui/slider');
ui.dxSpeedDialAction = require('dptuicomp/ui/speed_dial_action');
ui.dxSplitter = require('dptuicomp/ui/splitter');
ui.dxSwitch = require('dptuicomp/ui/switch');
ui.dxTabPanel = require('dptuicomp/ui/tab_panel');
ui.dxTabs = require('dptuicomp/ui/tabs');
ui.dxTagBox = require('dptuicomp/ui/tag_box');
ui.dxTextArea = require('dptuicomp/ui/text_area');
ui.dxTextBox = require('dptuicomp/ui/text_box');
ui.dxTileView = require('dptuicomp/ui/tile_view');
ui.dxToast = require('dptuicomp/ui/toast');
ui.dxToolbar = require('dptuicomp/ui/toolbar');
ui.dxTooltip = require('dptuicomp/ui/tooltip');
ui.dxTrackBar = require('dptuicomp/ui/track_bar');
ui.dxDraggable = require('dptuicomp/ui/draggable');
ui.dxSortable = require('dptuicomp/ui/sortable');

/* Validation (dx.module-widgets-base.js) */

DevExpress.validationEngine = require('dptuicomp/ui/validation_engine');
ui.dxValidationSummary = require('dptuicomp/ui/validation_summary');
ui.dxValidationGroup = require('dptuicomp/ui/validation_group');
ui.dxValidator = require('dptuicomp/ui/validator');

/* Widget parts */
require('dptuicomp/ui/html_editor/converters/markdown');


/* Web widgets (dx.module-widgets-web.js) */

ui.dxAccordion = require('dptuicomp/ui/accordion');
ui.dxContextMenu = require('dptuicomp/ui/context_menu');
ui.dxDataGrid = require('dptuicomp/ui/data_grid');
ui.dxTreeList = require('dptuicomp/ui/tree_list');
ui.dxMenu = require('dptuicomp/ui/menu');
ui.dxPivotGrid = require('dptuicomp/ui/pivot_grid');
ui.dxPivotGridFieldChooser = require('dptuicomp/ui/pivot_grid_field_chooser');
data.PivotGridDataSource = require('dptuicomp/ui/pivot_grid/data_source');
data.XmlaStore = require('dptuicomp/ui/pivot_grid/xmla_store');
ui.dxScheduler = require('dptuicomp/ui/scheduler');
ui.dxTreeView = require('dptuicomp/ui/tree_view');
ui.dxFilterBuilder = require('dptuicomp/ui/filter_builder');
ui.dxFileManager = require('dptuicomp/ui/file_manager');
ui.dxDiagram = require('dptuicomp/ui/diagram');
ui.dxGantt = require('dptuicomp/ui/gantt');


/* Chart common */
require('dptuicomp/bundles/modules/common.charts');

/* Viz core (dx.module-viz-core.js) */

const viz = DevExpress.viz = require('dptuicomp/bundles/modules/viz');
viz.currentTheme = require('dptuicomp/viz/themes').currentTheme;
viz.registerTheme = require('dptuicomp/viz/themes').registerTheme;
viz.exportFromMarkup = require('dptuicomp/viz/export').exportFromMarkup;
viz.getMarkup = require('dptuicomp/viz/export').getMarkup;
viz.exportWidgets = require('dptuicomp/viz/export').exportWidgets;
viz.currentPalette = require('dptuicomp/viz/palette').currentPalette;
viz.getPalette = require('dptuicomp/viz/palette').getPalette;
viz.generateColors = require('dptuicomp/viz/palette').generateColors;
viz.registerPalette = require('dptuicomp/viz/palette').registerPalette;
viz.refreshTheme = require('dptuicomp/viz/themes').refreshTheme;

/* Charts (dx.module-viz-charts.js) */
viz.dxChart = require('dptuicomp/viz/chart');
viz.dxPieChart = require('dptuicomp/viz/pie_chart');
viz.dxPolarChart = require('dptuicomp/viz/polar_chart');

/* Gauges (dx.module-viz-gauges.js) */
viz.dxLinearGauge = require('dptuicomp/viz/linear_gauge');
viz.dxCircularGauge = require('dptuicomp/viz/circular_gauge');
viz.dxBarGauge = require('dptuicomp/viz/bar_gauge');

/* Range selector (dx.module-viz-rangeselector.js) */
viz.dxRangeSelector = require('dptuicomp/viz/range_selector');

/* Vector map (dx.module-viz-vectormap.js) */
viz.dxVectorMap = require('dptuicomp/viz/vector_map');
viz.map = {};
viz.map.sources = {};
viz.map.projection = require('dptuicomp/viz/vector_map/projection').projection;

/* Sparklines (dx.module-viz-sparklines.js) */
viz.dxSparkline = require('dptuicomp/viz/sparkline');
viz.dxBullet = require('dptuicomp/viz/bullet');

/* Treemap */
viz.dxTreeMap = require('dptuicomp/viz/tree_map');

/* Funnel */
viz.dxFunnel = require('dptuicomp/viz/funnel');

/* Sankey */
viz.dxSankey = require('dptuicomp/viz/sankey');


/* Utilities for integration with ASP.NET */
/* DevExpress.aspnet = require('dptuicomp/aspnet'); */
