/**
 * DevExtreme (cjs/__internal/utils/version.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertDevExtremeVersion = assertDevExtremeVersion;
exports.assertedVersionsCompatible = assertedVersionsCompatible;
exports.clearAssertedVersions = clearAssertedVersions;
exports.getPreviousMajorVersion = getPreviousMajorVersion;
exports.parseVersion = parseVersion;
exports.stringifyVersion = stringifyVersion;
var _errors = _interopRequireDefault(require("../../core/errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
const MAX_MINOR_VERSION = 2;
const MIN_MINOR_VERSION = 1;
const assertedVersions = [];
const VERSION_SPLITTER = ".";

function stringifyVersion(version) {
    const {
        major: major,
        minor: minor,
        patch: patch
    } = version;
    return [major, minor, patch].join(VERSION_SPLITTER)
}

function parseVersion(version) {
    const [major, minor, patch] = version.split(".").map(Number);
    return {
        major: major,
        minor: minor,
        patch: patch
    }
}

function assertDevExtremeVersion(packageName, version) {
    assertedVersions.push({
        packageName: packageName,
        version: version
    })
}

function clearAssertedVersions() {}

function stringifyVersionList(assertedVersionList) {
    return assertedVersionList.map((assertedVersion => `${assertedVersion.packageName}: ${assertedVersion.version}`)).join("\n")
}

function versionsEqual(versionA, versionB) {
    return versionA.major === versionB.major && versionA.minor === versionB.minor && versionA.patch === versionB.patch
}

function getPreviousMajorVersion(_ref) {
    let {
        major: major,
        minor: minor,
        patch: patch
    } = _ref;
    const previousMajorVersion = minor === MIN_MINOR_VERSION ? {
        major: major - 1,
        minor: MAX_MINOR_VERSION,
        patch: patch
    } : {
        major: major,
        minor: minor - 1,
        patch: patch
    };
    return previousMajorVersion
}

function assertedVersionsCompatible(currentVersion) {
    const mismatchingVersions = assertedVersions.filter((assertedVersion => !versionsEqual(parseVersion(assertedVersion.version), currentVersion)));
    if (mismatchingVersions.length) {
        _errors.default.log("W0023", stringifyVersionList([{
            packageName: "dpt-ui",
            version: stringifyVersion(currentVersion)
        }, ...mismatchingVersions]));
        return false
    }
    return true
}
