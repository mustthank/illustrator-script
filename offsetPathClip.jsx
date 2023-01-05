$.errorMessage = function (err) {alert(err + '\n' + err.line);};
function LA(obj, callback, reverse) {if (!callback) {if (obj instanceof Array) {return obj;}else {var arr = $.getArr(obj);if (arr === obj) {if ($.isColor(obj)) {return obj;}else {return [obj];}}return arr;}}else if (callback instanceof Function) {var arr = $.getArr(obj);if (arr === obj) {arr = [obj];}if (reverse) {var i = arr.length;while (i--) callback(arr[i], i, arr);}else {for (var i = 0; i < arr.length; i++) callback(arr[i], i, arr);}return arr;}}
$.each = function (object, callback, reverse) {try {if (object && object.length) {var l = object.length;if (!reverse) for (var i = 0; i < l; i++) callback(object[i], i, object);else while (l--) callback(object[l], l, object);}return $;}catch (e) {$.errorMessage('$.each() - error: ' + e);}};
Object.prototype.each = function (callback, reverse) {if (this.length) $.each(this, callback, reverse);return this;};
Object.prototype.getChildsByFilter = function (filterCallback, returnFirst) {filterCallback = filterCallback instanceof Function ? filterCallback : function () { return true; };var arr = [], items = LA(this),l = items.length;for (var i = 0; i < l; i++) {if (items[i].typename === 'GroupItem') {arr = arr.concat(LA(items[i].pageItems).getChildsByFilter(filterCallback));}else if (filterCallback(items[i])) {arr.push(items[i]);if (returnFirst) return arr;}}return arr;};
$.isArr = function (a) {if ((!a)|| (typeof a === 'string')|| (a.typename === 'Document')|| (a.typename === 'Layer')|| (a.typename === 'PathItem')|| (a.typename === 'GroupItem')|| (a.typename === 'PageItem')|| (a.typename === 'CompoundPathItem')|| (a.typename === 'TextFrame')|| (a.typename === 'TextRange')|| (a.typename === 'GraphItem')|| (a.typename === 'Document')|| (a.typename === 'Artboard')|| (a.typename === 'LegacyTextItem')|| (a.typename === 'NoNNativeItem')|| (a.typename === 'Pattern')|| (a.typename === 'PlacedItem')|| (a.typename === 'PluginItem')|| (a.typename === 'RasterItem')|| (a.typename === 'MeshItem')|| (a.typename === 'SymbolItem')) {return false;}else if (!a.typename && !(a instanceof Array)) {return false;}else {return true;}};
$.getArr = function (obj, attr, value, exclude) {var arr = [];function checkExclude (item) {if (exclude !== undefined) {var j = exclude.length;while (j--) if (exclude[j] === item) return true;}return false;}if ($.isArr(obj)) {for (var i = 0; i < obj.length; i++) {if (!checkExclude(obj[i])) {if (attr) {if (value !== undefined) {arr.push(obj[i][attr][value]);}else {arr.push(obj[i][attr]);}}else {arr.push(obj[i]);}}}return arr;}else if (attr) {return obj[attr];}else {return obj;}};
$.isColor = function (color) {if ((color.typename === 'GradientColor')|| (color.typename === 'PatternColor')|| (color.typename === 'CMYKColor')|| (color.typename === 'SpotColor')|| (color.typename === 'GrayColor')|| (color.typename === 'LabColor')|| (color.typename === 'RGBColor')|| (color.typename === 'NoColor')) {return true;}else {return false;}};
$.appName = {indesign: (BridgeTalk.appName.toLowerCase() === 'indesign'),photoshop: (BridgeTalk.appName.toLowerCase() === 'photoshop'),illustrator: (BridgeTalk.appName.toLowerCase() === 'illustrator')};
$.color = function (a, v) {if (a) {if (typeof a === 'string') {a = a.toLowerCase();}}else {return undefined;}if ((a === 'hex') && $.appName.illustrator) {if (!v) {return new RGBColor();}else {if (v === 'random') return $.color('rgb', v);else return $.hexToColor(v, 'RGB');}}else if ((a === 'cmyk') || (a === 'cmykcolor')) {var c = new CMYKColor(), b = [];if (v) {b = b.concat(v);if (typeof v === 'string' && v.toLowerCase() === 'random') {b = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];}else {for (var i = 0; i < b.length; i++) {if (b[i] === 'random') {b[i] = Math.floor(Math.random() * 100);}}}c.cyan = parseInt(b[0]);c.magenta = parseInt(b[1]);c.yellow = parseInt(b[2]);c.black = parseInt(b[3]);}return c;}else if ((a === 'rgb') || (a === 'rgbcolor') || ((a === 'hex') && $.appName.photoshop)) {var c = new RGBColor(), b = [];if (v) {b = b.concat(v);if (typeof v === 'string' && v.toLowerCase() === 'random') {b = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];}else {for (var i = 0; i < b.length; i++) {if (b[i] === 'random') {b[i] = Math.floor(Math.random() * 100);}}}if ($.appName.photoshop) {if (a !== 'hex' || (typeof v === 'string' && v.toLowerCase() === 'random')) {c.red = parseInt(b[0]);c.green = parseInt(b[1]);c.blue = parseInt(b[2]);}else {c.hexValue = b[0];}}else if ($.appName.illustrator) {c.red = parseInt(b[0]);c.green = parseInt(b[1]);c.blue = parseInt(b[2]);}}return c;}else if ((a === 'gray') || (a === 'grayscale') || (a === 'grayscale') || (a === 'graycolor')) {var c = new GrayColor(), b = [];if (v) {b = b.concat(v);if (typeof v === 'string' && v.toLowerCase() === 'random') {b = Math.floor(Math.random() * 100);}c.gray = parseInt(b[0] || b);}return c;}else if ((a === 'lab') || (a === 'labcolor')) {var c = new LabColor(), value, b = [];if (v) {b = b.concat(v);if (typeof v === 'string' && v.toLowerCase() === 'random') {b = [Math.floor(Math.random() * 100), Math.floor(-128 + Math.random() * 256), Math.floor(-128 + Math.random() * 256)];}else {for (var i = 0; i < b.length; i++) {if (i === 0) {if (b[i] === 'random') {b[i] = Math.floor(Math.random() * 100);}}else {if (b[i] === 'random') {b[i] = Math.floor(-128 + Math.random() * 256);}}}}c.l = parseInt(b[0]);c.a = parseInt(b[1]);c.b = parseInt(b[2]);}return c;}else if ((a === 'spot') || (a === 'spotcolor')) {var c = new SpotColor(), b = [];if (v) {b = b.concat(v);c.tint = parseInt(b[1]);}return c;}else if ((a === 'gradient') || (a === 'Gradient') || (a === 'GradientColor')) {var c = app.activeDocument.gradients.add(), g = new GradientColor(), b = [];if (v) {b = b.concat(v);for (var i = 0; i < b.length; i++) {c.gradientStops[i].color = $.color(b[i][0], b[i][1]);}g.gradient = c;}return g;}else if ((a === 'no') || (a === 'nocolor')) {return new NoColor();}};
$.toHex = function (color, hash) {if (color.typename !== 'RGBColor' && $.appName.illustrator) {color = $.convertColor(color, 'RGB');}return (hash ? '#' : '') + to(color.red) + to(color.green) + to(color.blue);function to(val) {var hex = val.toString(16);return hex.length === 1 ? '0' + hex : hex;}};
$.hexToColor = function (color, type) {color = color.toLowerCase();color = correct(color);function correct(a) {var l, b = '000000';if (a[0] === '#') {a = a.slice(1);}l = a.length;a = a + b.slice(l);return a;}return $.convertColor($.color('rgb', [parseInt((gc(color)).slice(0, 2), 16), parseInt((gc(color)).slice(2, 4), 16), parseInt((gc(color)).slice(4, 6), 16)]), type || 'rgb');function gc(h) {return (h.slice(0, 1) === '#') ? h.slice(1, 7) : h;}};
$.isColor = function (color) {if ((color.typename === 'GradientColor')|| (color.typename === 'PatternColor')|| (color.typename === 'CMYKColor')|| (color.typename === 'SpotColor')|| (color.typename === 'GrayColor')|| (color.typename === 'LabColor')|| (color.typename === 'RGBColor')|| (color.typename === 'NoColor')) {return true;}else {return false;}};
$.getColorValues = function (color) {if (color === undefined) {return undefined;}else if (color.typename === 'CMYKColor') {return [color.cyan, color.magenta, color.yellow, color.black];}else if (color.typename === 'RGBColor') {return [color.red, color.green, color.blue];}else if (color.typename === 'LabColor') {return [color.l, color.a, color.b];}else if (color.typename === 'SpotColor') {return [color.spotl, color.tint];}else if (color.typename === 'GrayColor') {return [color.gray];}else if (color.typename === 'NoColor') {return undefined;}else if (color.typename === 'GradientColor') {var colors = [], gradients = color.gradient.gradientStops;for (var i = 0; i < gradients.length; i++) {colors = colors.concat(gradients[i].color.getColorValues());}return colors;}};

var doc = app.activeDocument;
var objectsToSpec = new Array();
var notSelected = new Array();
var clippp = new Array();
try {
    main();
} catch (error) {
alert(error)    
}
function main()
{
    for (var index = doc.selection.length - 1; index >= 0; index--) {
        var itemMask = doc.selection[index].getChildsByFilter(function (mask) { return mask.clipping; }, true);
        if (itemMask == "") {
            // alert("Select only clipping mask object!!!");
            // return;
            doc.selection[index].selected = false;
        } else {
            objectsToSpec.push(itemMask[0]);
            clippp.push(itemMask[0].parent);
        }
    }
    doc.selection = objectsToSpec;
    app.redraw();
    app.executeMenuCommand("OffsetPath v23");
    for (var index = doc.selection.length - 1; index >= 0; index--){
        doc.selection[index].clipping = true;
        objectsToSpec[index].remove();
        clippp[index].clipped=true;
    }
    doc.selection=null;
}