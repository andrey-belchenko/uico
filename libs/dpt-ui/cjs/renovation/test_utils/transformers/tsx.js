/**
 * DevExtreme (cjs/renovation/test_utils/transformers/tsx.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
const fs = require("fs");
const tsJest = require("ts-jest").default;
const getCacheKey = require("./get_cache_key");
const THIS_FILE = fs.readFileSync(__filename);
const jestTransformer = tsJest.createTransformer();
const addCreateElementImport = src => `import React from 'react'; ${src}`;
module.exports = {
    process: (src, filename, options) => jestTransformer.process(filename.indexOf("__tests__") > -1 ? src : addCreateElementImport(src), filename, options),
    getCacheKey: (fileData, filePath, transformOptions) => getCacheKey(fileData, filePath, transformOptions.configString, THIS_FILE)
};
