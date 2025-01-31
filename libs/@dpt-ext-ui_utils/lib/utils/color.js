"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorUtils = void 0;
var string_1 = require("./string");
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.getAlpha = function (color) {
        return (color >> 24) & 255;
    };
    ColorUtils.getRed = function (color) {
        return (color >> 16) & 255;
    };
    ColorUtils.getGreen = function (color) {
        return (color >> 8) & 255;
    };
    ColorUtils.getBlue = function (color) {
        return color & 255;
    };
    ColorUtils.redPartToString = function (color) {
        var redStr = ColorUtils.getRed(color).toString(16);
        return redStr.length > 1 ? redStr : '0' + redStr;
    };
    ColorUtils.greenPartToString = function (color) {
        var greenStr = ColorUtils.getGreen(color).toString(16);
        return greenStr.length > 1 ? greenStr : '0' + greenStr;
    };
    ColorUtils.bluePartToString = function (color) {
        var blueStr = ColorUtils.getBlue(color).toString(16);
        return blueStr.length > 1 ? blueStr : '0' + blueStr;
    };
    ColorUtils.fromArgbNumber = function (alpha, red, green, blue) {
        return (alpha << 24) | (red << 16) | (green << 8) | blue;
    };
    ColorUtils.fromRgbaString = function (color, alpha) {
        if (alpha === void 0) { alpha = 255; }
        var matchesRGBA = color.replace(/ +/g, '').match(/(rgba?)|(\d+(\.\d+)?%?)|(\.\d+)/g);
        if (matchesRGBA && matchesRGBA.length > 3) {
            var result = [];
            for (var i = 1, matchItem = void 0; matchItem = matchesRGBA[i]; i++) {
                var item = matchItem.indexOf('%') !== -1 ?
                    Math.round(parseFloat(matchItem) * 2.55) :
                    parseInt(matchItem);
                if (item < 0 || item > 255)
                    return null;
                result.push(item);
            }
            if (color.indexOf('rgba') === 0) {
                if (isNaN(result[3]) || result[3] < 0 || result[3] > 1)
                    return null;
                else if (result[3] <= 1)
                    result[3] = Math.round(result[3] * 255);
            }
            else if (result[3])
                return null;
            return ((result[0] & 255) << 16) | ((result[1] & 255) << 8) | (result[2] & 255) |
                (((result.length > 3 ? result[3] : alpha) & 255) << 24);
        }
        return null;
    };
    ColorUtils.fromHashString = function (hash, alpha) {
        if (alpha === void 0) { alpha = 255; }
        if (!ColorUtils.isHashColorString(hash))
            return null;
        if (hash.charAt(0) === '#')
            hash = hash.substr(1);
        if (hash.length === 3)
            hash = string_1.StringUtils.repeat(hash.charAt(0), 2) + string_1.StringUtils.repeat(hash.charAt(1), 2) + string_1.StringUtils.repeat(hash.charAt(2), 2);
        return parseInt(hash, 16) | (alpha << 24);
    };
    ColorUtils.fromColorName = function (color, alpha) {
        if (alpha === void 0) { alpha = 255; }
        var colorNameAsHash = ColorUtils.colorNames[color.toLowerCase()];
        return colorNameAsHash ? ColorUtils.fromHashString(colorNameAsHash, alpha) : null;
    };
    ColorUtils.fromString = function (color, alpha) {
        if (alpha === void 0) { alpha = 255; }
        var rgbaColor = ColorUtils.fromRgbaString(color, alpha);
        if (rgbaColor !== null)
            return rgbaColor;
        var hashColor = ColorUtils.fromHashString(color, alpha);
        if (hashColor !== null)
            return hashColor;
        return ColorUtils.fromColorName(color, alpha);
    };
    ColorUtils.colorToHash = function (color) {
        return '#' + ColorUtils.redPartToString(color) + ColorUtils.greenPartToString(color) + ColorUtils.bluePartToString(color);
    };
    ColorUtils.stringToHash = function (color) {
        var result = this.fromString(color);
        return result !== null ? this.colorToHash(result) : null;
    };
    ColorUtils.isHashColorString = function (color) {
        return /^#?([0-9a-f]{6})$/i.test(color) || /^#?([0-9a-f]{3})$/i.test(color);
    };
    ColorUtils.isKnownColorName = function (color) {
        return !!ColorUtils.colorNames[color.toLowerCase()];
    };
    ColorUtils.isGray = function (color) {
        var red = ColorUtils.getRed(color);
        return red === ColorUtils.getGreen(color) && red === ColorUtils.getBlue(color);
    };
    ColorUtils.DARK_COLOR = -16777216;
    ColorUtils.LIGHT_COLOR = -1;
    ColorUtils.colorNames = {
        aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff',
        aquamarine: '#7fffd4', azure: '#f0ffff', beige: '#f5f5dc',
        bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd',
        blue: '#0000ff', blueviolet: '#8a2be2', brown: '#a52a2a',
        burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00',
        chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc', crimson: '#dc143c', cyan: '#00ffff',
        darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9', darkgreen: '#006400', darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b', darkolivegreen: '#556b2f', darkorange: '#ff8c00',
        darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f', darkslateblue: '#483d8b', darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1', darkviolet: '#9400d3', deeppink: '#ff1493',
        deepskyblue: '#00bfff', dimgray: '#696969', dodgerblue: '#1e90ff',
        feldspar: '#d19275', firebrick: '#b22222', floralwhite: '#fffaf0',
        forestgreen: '#228b22', fuchsia: '#ff00ff', gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080',
        green: '#00ff00', greenyellow: '#adff2f', honeydew: '#f0fff0', hotpink: '#ff69b4',
        indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c',
        lavender: '#e6e6fa', lavenderblush: '#fff0f5', lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080',
        lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3',
        lightgreen: '#90ee90', lightpink: '#ffb6c1', lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa', lightskyblue: '#87cefa', lightslateblue: '#8470ff',
        lightslategray: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0',
        lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff',
        maroon: '#800000', mediumaquamarine: '#66cdaa', mediumblue: '#0000cd',
        mediumorchid: '#ba55d3', mediumpurple: '#9370d8', mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa',
        mistyrose: '#ffe4e1', moccasin: '#ffe4b5', navajowhite: '#ffdead', navy: '#000080',
        oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23', orange: '#ffa500',
        orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98',
        paleturquoise: '#afeeee', palevioletred: '#d87093', papayawhip: '#ffefd5',
        peachpuff: '#ffdab9', peru: '#cd853f', pink: '#ffc0cb', plum: '#dda0dd',
        powderblue: '#b0e0e6', purple: '#800080', red: '#ff0000', rosybrown: '#bc8f8f',
        royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072', sandybrown: '#f4a460',
        seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0',
        skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', snow: '#fffafa',
        springgreen: '#00ff7f', steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080',
        thistle: '#d8bfd8', tomato: '#ff6347', turquoise: '#40e0d0', violet: '#ee82ee',
        violetred: '#d02090', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5',
        yellow: '#ffff00', yellowgreen: '#9acd32', windowtext: '#000000'
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
