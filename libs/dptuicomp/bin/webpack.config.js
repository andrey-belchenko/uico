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
        devtoolModuleFilenameTemplate: 'dptuicomp:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'dptuicomp:///[resource-path]?[hash]'
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
        'dptuicomp-quill': 'window.DevExpress.Quill',
        'turndown': 'window.TurndownService',
        'showdown': 'window.showdown',
        'exceljs': 'window.ExcelJS',
        'jspdf': 'window.jspdf.jsPDF',
        'dptuiext-diagram': 'window.DevExpress.diagram',
        'dptuiext-gantt': 'window.DevExpress.Gantt',
        'luxon': 'window.luxon'
    },
    resolve: {
        alias: {
            // '@dptuicomp/vdom': require.resolve('@dptuicomp/vdom/dist/cjs/index.js'),
            '@dptuicomp/runtime/common': require.resolve('@dptuicomp/runtime/cjs/common/index.js'),
            '@dptuicomp/runtime/inferno': require.resolve('@dptuicomp/runtime/cjs/inferno/index.js'),
            '@dptuicomp/runtime/declarations': require.resolve('@dptuicomp/runtime/cjs/declarations/index.js'),
            '@dptuicomp/runtime/angular': require.resolve('@dptuicomp/runtime/cjs/angular/index.js'),
            '@dptuicomp/runtime/vue': require.resolve('@dptuicomp/runtime/cjs/vue/index.js'),
            '@dptuicomp/runtime/react': require.resolve('@dptuicomp/runtime/cjs/react/index.js')
        }
    },
};
