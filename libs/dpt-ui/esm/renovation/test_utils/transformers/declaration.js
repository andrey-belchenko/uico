/**
 * DevExtreme (esm/renovation/test_utils/transformers/declaration.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
const {
    compileCode: compileCode
} = require("@dpt-ui-generator/core");
const {
    getTsConfig: getTsConfig
} = require("@dpt-ui-generator/build-helpers");
const generator = require("@dpt-ui-generator/inferno").default;
const ts = require("typescript");
const path = require("path");
const fs = require("fs");
const tsJest = require("ts-jest").default;
const getCacheKey = require("./get_cache_key");
const {
    BASE_GENERATOR_OPTIONS_WITH_JQUERY: BASE_GENERATOR_OPTIONS_WITH_JQUERY
} = require("../../../../build/gulp/generator/generator-options");
const THIS_FILE = fs.readFileSync(__filename);
const jestTransformer = tsJest.createTransformer();
const TS_CONFIG_PATH = "build/gulp/generator/ts-configs/jest.tsconfig.json";
const tsConfig = getTsConfig(TS_CONFIG_PATH);
generator.options = BASE_GENERATOR_OPTIONS_WITH_JQUERY;
module.exports = {
    process(src, filename, options) {
        if (-1 !== filename.indexOf("test_components") && ".tsx" === path.extname(filename)) {
            const result = compileCode(generator, src, {
                path: filename,
                dirname: path.dirname(filename)
            }, {
                includeExtraComponents: true
            });
            if (result && result[1]) {
                const componentName = (result[1].code.match(/export default class (\w+) extends/) || [])[1];
                if (!componentName) {
                    return ""
                }
                return jestTransformer.process(ts.transpileModule(`import { createElement as h } from "inferno-create-element";\n                        ${result[0].code}\n                ${result[1].code.replace("export default","export ").replace(new RegExp(`\\b${componentName}\\b`,"g"),`${componentName}Class`).replace(new RegExp(`import ${componentName}Component from\\s+\\S+`),`const ${componentName}Component = ${componentName}`)}`, tsConfig).outputText, filename, options)
            }
        }
        return jestTransformer.process(src, filename, options)
    },
    getCacheKey: (fileData, filePath, transformOptions) => getCacheKey(fileData, filePath, transformOptions.configString, THIS_FILE)
};
