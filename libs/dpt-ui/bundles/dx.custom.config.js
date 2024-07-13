"use strict";

/* Comment lines below for the widgets you don't require and run "dpt-ui-bundler" in this directory, then include dx.custom.js in your project */

/* Core (dx.module-core.js) */
/* eslint-disable import/no-commonjs */
const DevExpress = require('dpt-ui/bundles/modules/core');

/* Integrations (dx.module-core.js) */

require('dpt-ui/integration/jquery');
require('dpt-ui/integration/knockout');

require('dpt-ui/localization/globalize/core');
require('dpt-ui/localization/globalize/message');
require('dpt-ui/localization/globalize/number');
require('dpt-ui/localization/globalize/date');
require('dpt-ui/localization/globalize/currency');

/* Events (dx.module-core.js) */

require('dpt-ui/events/click');
require('dpt-ui/events/contextmenu');
require('dpt-ui/events/double_click');
require('dpt-ui/events/drag');
require('dpt-ui/events/hold');
require('dpt-ui/events/hover');
require('dpt-ui/events/pointer');
require('dpt-ui/events/swipe');
require('dpt-ui/events/transform');


/* Data (dx.module-core.js) */

const data = DevExpress.data = require('dpt-ui/bundles/modules/data');

data.odata = require('dpt-ui/bundles/modules/data.odata');


/* UI core (dx.module-core.js) */

const ui = DevExpress.ui = require('dpt-ui/bundles/modules/ui');

ui.themes = require('dpt-ui/ui/themes');

// deprecated
ui.setTemplateEngine = require('dpt-ui/core/templates/template_engine_registry').setTemplateEngine;

ui.dialog = require('dpt-ui/ui/dialog');
ui.notify = require('dpt-ui/ui/notify');
ui.repaintFloatingActionButton = require('dpt-ui/ui/speed_dial_action/repaint_floating_action_button');
ui.hideToasts = require('dpt-ui/ui/toast/hide_toasts');

/* Base widgets (dx.module-widgets-base.js) */

ui.dxActionSheet = require('dpt-ui/ui/action_sheet');
ui.dxAutocomplete = require('dpt-ui/ui/autocomplete');
ui.dxBox = require('dpt-ui/ui/box');
ui.dxButton = require('dpt-ui/ui/button');
ui.dxDropDownButton = require('dpt-ui/ui/drop_down_button');
ui.dxButtonGroup = require('dpt-ui/ui/button_group');
ui.dxCalendar = require('dpt-ui/ui/calendar');
ui.dxCheckBox = require('dpt-ui/ui/check_box');
ui.dxColorBox = require('dpt-ui/ui/color_box');
ui.dxDateBox = require('dpt-ui/ui/date_box');
ui.dxDateRangeBox = require('dpt-ui/ui/date_range_box');
ui.dxDrawer = require('dpt-ui/ui/drawer');
ui.dxDeferRendering = require('dpt-ui/ui/defer_rendering');
ui.dxDropDownBox = require('dpt-ui/ui/drop_down_box');
ui.dxFileUploader = require('dpt-ui/ui/file_uploader');
ui.dxForm = require('dpt-ui/ui/form');
ui.dxGallery = require('dpt-ui/ui/gallery');
ui.dxHtmlEditor = require('dpt-ui/ui/html_editor');
ui.dxList = require('dpt-ui/ui/list');
ui.dxLoadIndicator = require('dpt-ui/ui/load_indicator');
ui.dxLoadPanel = require('dpt-ui/ui/load_panel');
ui.dxLookup = require('dpt-ui/ui/lookup');
ui.dxMap = require('dpt-ui/ui/map');
ui.dxMultiView = require('dpt-ui/ui/multi_view');
ui.dxNumberBox = require('dpt-ui/ui/number_box');
ui.dxOverlay = require('dpt-ui/ui/overlay/ui.overlay');
ui.dxPopover = require('dpt-ui/ui/popover');
ui.dxPopup = require('dpt-ui/ui/popup');
ui.dxProgressBar = require('dpt-ui/ui/progress_bar');
ui.dxRadioGroup = require('dpt-ui/ui/radio_group');
ui.dxRangeSlider = require('dpt-ui/ui/range_slider');
ui.dxResizable = require('dpt-ui/ui/resizable');
ui.dxResponsiveBox = require('dpt-ui/ui/responsive_box');
ui.dxScrollView = require('dpt-ui/ui/scroll_view');
ui.dxSelectBox = require('dpt-ui/ui/select_box');
ui.dxSlider = require('dpt-ui/ui/slider');
ui.dxSpeedDialAction = require('dpt-ui/ui/speed_dial_action');
ui.dxSplitter = require('dpt-ui/ui/splitter');
ui.dxSwitch = require('dpt-ui/ui/switch');
ui.dxTabPanel = require('dpt-ui/ui/tab_panel');
ui.dxTabs = require('dpt-ui/ui/tabs');
ui.dxTagBox = require('dpt-ui/ui/tag_box');
ui.dxTextArea = require('dpt-ui/ui/text_area');
ui.dxTextBox = require('dpt-ui/ui/text_box');
ui.dxTileView = require('dpt-ui/ui/tile_view');
ui.dxToast = require('dpt-ui/ui/toast');
ui.dxToolbar = require('dpt-ui/ui/toolbar');
ui.dxTooltip = require('dpt-ui/ui/tooltip');
ui.dxTrackBar = require('dpt-ui/ui/track_bar');
ui.dxDraggable = require('dpt-ui/ui/draggable');
ui.dxSortable = require('dpt-ui/ui/sortable');

/* Validation (dx.module-widgets-base.js) */

DevExpress.validationEngine = require('dpt-ui/ui/validation_engine');
ui.dxValidationSummary = require('dpt-ui/ui/validation_summary');
ui.dxValidationGroup = require('dpt-ui/ui/validation_group');
ui.dxValidator = require('dpt-ui/ui/validator');

/* Widget parts */
require('dpt-ui/ui/html_editor/converters/markdown');


/* Web widgets (dx.module-widgets-web.js) */

ui.dxAccordion = require('dpt-ui/ui/accordion');
ui.dxContextMenu = require('dpt-ui/ui/context_menu');
ui.dxDataGrid = require('dpt-ui/ui/data_grid');
ui.dxTreeList = require('dpt-ui/ui/tree_list');
ui.dxMenu = require('dpt-ui/ui/menu');
ui.dxPivotGrid = require('dpt-ui/ui/pivot_grid');
ui.dxPivotGridFieldChooser = require('dpt-ui/ui/pivot_grid_field_chooser');
data.PivotGridDataSource = require('dpt-ui/ui/pivot_grid/data_source');
data.XmlaStore = require('dpt-ui/ui/pivot_grid/xmla_store');
ui.dxScheduler = require('dpt-ui/ui/scheduler');
ui.dxTreeView = require('dpt-ui/ui/tree_view');
ui.dxFilterBuilder = require('dpt-ui/ui/filter_builder');
ui.dxFileManager = require('dpt-ui/ui/file_manager');
ui.dxDiagram = require('dpt-ui/ui/diagram');
ui.dxGantt = require('dpt-ui/ui/gantt');


/* Chart common */
require('dpt-ui/bundles/modules/common.charts');

/* Viz core (dx.module-viz-core.js) */

const viz = DevExpress.viz = require('dpt-ui/bundles/modules/viz');
viz.currentTheme = require('dpt-ui/viz/themes').currentTheme;
viz.registerTheme = require('dpt-ui/viz/themes').registerTheme;
viz.exportFromMarkup = require('dpt-ui/viz/export').exportFromMarkup;
viz.getMarkup = require('dpt-ui/viz/export').getMarkup;
viz.exportWidgets = require('dpt-ui/viz/export').exportWidgets;
viz.currentPalette = require('dpt-ui/viz/palette').currentPalette;
viz.getPalette = require('dpt-ui/viz/palette').getPalette;
viz.generateColors = require('dpt-ui/viz/palette').generateColors;
viz.registerPalette = require('dpt-ui/viz/palette').registerPalette;
viz.refreshTheme = require('dpt-ui/viz/themes').refreshTheme;

/* Charts (dx.module-viz-charts.js) */
viz.dxChart = require('dpt-ui/viz/chart');
viz.dxPieChart = require('dpt-ui/viz/pie_chart');
viz.dxPolarChart = require('dpt-ui/viz/polar_chart');

/* Gauges (dx.module-viz-gauges.js) */
viz.dxLinearGauge = require('dpt-ui/viz/linear_gauge');
viz.dxCircularGauge = require('dpt-ui/viz/circular_gauge');
viz.dxBarGauge = require('dpt-ui/viz/bar_gauge');

/* Range selector (dx.module-viz-rangeselector.js) */
viz.dxRangeSelector = require('dpt-ui/viz/range_selector');

/* Vector map (dx.module-viz-vectormap.js) */
viz.dxVectorMap = require('dpt-ui/viz/vector_map');
viz.map = {};
viz.map.sources = {};
viz.map.projection = require('dpt-ui/viz/vector_map/projection').projection;

/* Sparklines (dx.module-viz-sparklines.js) */
viz.dxSparkline = require('dpt-ui/viz/sparkline');
viz.dxBullet = require('dpt-ui/viz/bullet');

/* Treemap */
viz.dxTreeMap = require('dpt-ui/viz/tree_map');

/* Funnel */
viz.dxFunnel = require('dpt-ui/viz/funnel');

/* Sankey */
viz.dxSankey = require('dpt-ui/viz/sankey');


/* Utilities for integration with ASP.NET */
/* DevExpress.aspnet = require('dpt-ui/aspnet'); */
