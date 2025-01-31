/**
 * DevExtreme (esm/__internal/core/license/license_validation.js)
 * Version: 24.1.3
 * Build date: Tue Jun 11 2024
 *
 * Copyright (c) 2012 - 2024 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.dpt-ext-ui.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["customerId", "maxVersionAllowed", "format", "internalUsageId"];
import config from "../../../core/config";
import errors from "../../../core/errors";
import {
    fullVersion
} from "../../../core/version";
import {
    assertedVersionsCompatible,
    getPreviousMajorVersion,
    parseVersion
} from "../../utils/version";
import {
    base64ToBytes
} from "./byte_utils";
import {
    INTERNAL_USAGE_ID,
    PUBLIC_KEY
} from "./key";
import {
    pad
} from "./pkcs1";
import {
    compareSignatures
} from "./rsa_bigint";
import {
    sha1
} from "./sha1";
import {
    registerCustomComponents,
    renderTrialPanel
} from "./trial_panel";
import {
    TokenKind
} from "./types";
const FORMAT = 1;
const RTM_MIN_PATCH_VERSION = 3;
const KEY_SPLITTER = ".";
const BUY_NOW_LINK = "https://go.dpt-ext-ui.com/Licensing_Installer_Watermark_DevExtremeJQuery.aspx";
const GENERAL_ERROR = {
    kind: TokenKind.corrupted,
    error: "general"
};
const VERIFICATION_ERROR = {
    kind: TokenKind.corrupted,
    error: "verification"
};
const DECODING_ERROR = {
    kind: TokenKind.corrupted,
    error: "decoding"
};
const DESERIALIZATION_ERROR = {
    kind: TokenKind.corrupted,
    error: "deserialization"
};
const PAYLOAD_ERROR = {
    kind: TokenKind.corrupted,
    error: "payload"
};
const VERSION_ERROR = {
    kind: TokenKind.corrupted,
    error: "version"
};
let validationPerformed = false;

function verifySignature(_ref) {
    let {
        text: text,
        signature: encodedSignature
    } = _ref;
    return compareSignatures({
        key: PUBLIC_KEY,
        signature: base64ToBytes(encodedSignature),
        actual: pad(sha1(text))
    })
}
export function parseLicenseKey(encodedKey) {
    if (void 0 === encodedKey) {
        return GENERAL_ERROR
    }
    const parts = encodedKey.split(KEY_SPLITTER);
    if (2 !== parts.length || 0 === parts[0].length || 0 === parts[1].length) {
        return GENERAL_ERROR
    }
    if (!verifySignature({
            text: parts[0],
            signature: parts[1]
        })) {
        return VERIFICATION_ERROR
    }
    let decodedPayload = "";
    try {
        decodedPayload = atob(parts[0])
    } catch {
        return DECODING_ERROR
    }
    let payload = {};
    try {
        payload = JSON.parse(decodedPayload)
    } catch {
        return DESERIALIZATION_ERROR
    }
    const {
        customerId: customerId,
        maxVersionAllowed: maxVersionAllowed,
        format: format,
        internalUsageId: internalUsageId
    } = payload, rest = _objectWithoutPropertiesLoose(payload, _excluded);
    if (void 0 !== internalUsageId) {
        return {
            kind: TokenKind.internal,
            internalUsageId: internalUsageId
        }
    }
    if (void 0 === customerId || void 0 === maxVersionAllowed || void 0 === format) {
        return PAYLOAD_ERROR
    }
    if (format !== FORMAT) {
        return VERSION_ERROR
    }
    return {
        kind: TokenKind.verified,
        payload: _extends({
            customerId: customerId,
            maxVersionAllowed: maxVersionAllowed
        }, rest)
    }
}

function isPreview(patch) {
    return isNaN(patch) || patch < RTM_MIN_PATCH_VERSION
}

function getLicenseCheckParams(_ref2) {
    let {
        licenseKey: licenseKey,
        version: version
    } = _ref2;
    let preview = false;
    try {
        preview = isPreview(version.patch);
        const {
            major: major,
            minor: minor
        } = preview ? getPreviousMajorVersion(version) : version;
        if (!licenseKey) {
            return {
                preview: preview,
                error: "W0019"
            }
        }
        const license = parseLicenseKey(licenseKey);
        if (license.kind === TokenKind.corrupted) {
            return {
                preview: preview,
                error: "W0021"
            }
        }
        if (license.kind === TokenKind.internal) {
            return {
                preview: preview,
                internal: true,
                error: license.internalUsageId === INTERNAL_USAGE_ID ? void 0 : "W0020"
            }
        }
        if (!(major && minor)) {
            return {
                preview: preview,
                error: "W0021"
            }
        }
        if (10 * major + minor > license.payload.maxVersionAllowed) {
            return {
                preview: preview,
                error: "W0020"
            }
        }
        return {
            preview: preview,
            error: void 0
        }
    } catch {
        return {
            preview: preview,
            error: "W0021"
        }
    }
}
export function showTrialPanel(buyNowUrl, version, customStyles) {
    if ("undefined" !== typeof customElements) {
        renderTrialPanel(buyNowUrl, version, customStyles)
    }
}
export function registerTrialPanelComponents(customStyles) {
    if ("undefined" !== typeof customElements) {
        registerCustomComponents(customStyles)
    }
}
export function validateLicense(licenseKey) {
    let versionStr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : fullVersion;
    if (validationPerformed) {
        return
    }
    validationPerformed = true;
    const version = parseVersion(versionStr);
    const versionsCompatible = assertedVersionsCompatible(version);
    const {
        internal: internal,
        error: error
    } = getLicenseCheckParams({
        licenseKey: licenseKey,
        version: version
    });
    if (!versionsCompatible && internal) {
        return
    }
    if (error && !internal) {
        showTrialPanel(config().buyNowLink ?? BUY_NOW_LINK, fullVersion)
    }
    const preview = isPreview(version.patch);
    if (error) {
        errors.log(preview ? "W0022" : error);
        return
    }
    if (preview && !internal) {
        errors.log("W0022")
    }
}
export function peekValidationPerformed() {
    return validationPerformed
}
export function setLicenseCheckSkipCondition() {}
export default {
    validateLicense: validateLicense
};
