/**
 * DevExtreme (cjs/renovation/test_utils/transformers/get_cache_key.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
const crypto = require("crypto");
module.exports = function(fileData, filePath, configStr, transformerFileSrc) {
    return crypto.createHash("md5").update(transformerFileSrc).update("\0", "utf8").update(fileData).update("\0", "utf8").update(filePath).update("\0", "utf8").update(configStr).digest("hex")
};
