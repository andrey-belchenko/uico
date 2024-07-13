/* eslint-env node */
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        // eslint-disable-next-line spellcheck/spell-checker
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    output: {
        sourcePrefix: '    ',
        devtoolModuleFilenameTemplate: 'dpt-ui:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'dpt-ui:///[resource-path]?[hash]'
    },
    externals: {
        // Optional (calling through window to skip error on script load)
        'jquery': 'window.jQuery',
        'jszip': 'window.JSZip',
        'knockout': 'window.ko',
        'globalize': 'window.Globalize',
        'globalize/number': 'window.Globalize',
        'globalize/currency': 'window.Globalize',
        'globalize/date': 'window.Globalize',
        'globalize/message': 'window.Globalize',
        'dpt-ui-quill': 'window.DevExpress.Quill',
        'turndown': 'window.TurndownService',
        'showdown': 'window.showdown',
        'exceljs': 'window.ExcelJS',
        'jspdf': 'window.jspdf.jsPDF',
        'dpt-ext-ui-diagram': 'window.DevExpress.diagram',
        'dpt-ext-ui-gantt': 'window.DevExpress.Gantt',
        'luxon': 'window.luxon'
    },
    resolve: {
        alias: {
            // '@dpt-ui/vdom': require.resolve('@dpt-ui/vdom/dist/cjs/index.js'),
            '@dpt-ui/runtime/common': require.resolve('@dpt-ui/runtime/cjs/common/index.js'),
            '@dpt-ui/runtime/inferno': require.resolve('@dpt-ui/runtime/cjs/inferno/index.js'),
            '@dpt-ui/runtime/declarations': require.resolve('@dpt-ui/runtime/cjs/declarations/index.js'),
            '@dpt-ui/runtime/angular': require.resolve('@dpt-ui/runtime/cjs/angular/index.js'),
            '@dpt-ui/runtime/vue': require.resolve('@dpt-ui/runtime/cjs/vue/index.js'),
            '@dpt-ui/runtime/react': require.resolve('@dpt-ui/runtime/cjs/react/index.js')
        }
    },
};
