
$.errorMessage = function (err) {alert(err + '\n' + err.line);};
function LA(obj, callback, reverse) {if (!callback) {if (obj instanceof Array) {return obj;}else {var arr = $.getArr(obj);if (arr === obj) {if ($.isColor(obj)) {return obj;}else {return [obj];}}return arr;}}else if (callback instanceof Function) {var arr = $.getArr(obj);if (arr === obj) {arr = [obj];}if (reverse) {var i = arr.length;while (i--) callback(arr[i], i, arr);}else {for (var i = 0; i < arr.length; i++) callback(arr[i], i, arr);}return arr;}}
$.each = function (object, callback, reverse) {try {if (object && object.length) {var l = object.length;if (!reverse) for (var i = 0; i < l; i++) callback(object[i], i, object);else while (l--) callback(object[l], l, object);}return $;}catch (e) {$.errorMessage('$.each() - error: ' + e);}};
Object.prototype.each = function (callback, reverse) {if (this.length) $.each(this, callback, reverse);return this;};
Object.prototype.getChildsByFilter = function (filterCallback, returnFirst) {filterCallback = filterCallback instanceof Function ? filterCallback : function () { return true; };var arr = [], items = LA(this),l = items.length;for (var i = 0; i < l; i++) {if (items[i].typename === 'GroupItem') {arr = arr.concat(LA(items[i].pageItems).getChildsByFilter(filterCallback));}else if (filterCallback(items[i])) {arr.push(items[i]);if (returnFirst) return arr;}}return arr;};
$.isArr = function (a) {if ((!a)|| (typeof a === 'string')|| (a.typename === 'Document')|| (a.typename === 'Layer')|| (a.typename === 'PathItem')|| (a.typename === 'GroupItem')|| (a.typename === 'PageItem')|| (a.typename === 'CompoundPathItem')|| (a.typename === 'TextFrame')|| (a.typename === 'TextRange')|| (a.typename === 'GraphItem')|| (a.typename === 'Document')|| (a.typename === 'Artboard')|| (a.typename === 'LegacyTextItem')|| (a.typename === 'NoNNativeItem')|| (a.typename === 'Pattern')|| (a.typename === 'PlacedItem')|| (a.typename === 'PluginItem')|| (a.typename === 'RasterItem')|| (a.typename === 'MeshItem')|| (a.typename === 'SymbolItem')) {return false;}else if (!a.typename && !(a instanceof Array)) {return false;}else {return true;}};
$.getArr = function (obj, attr, value, exclude) {var arr = [];function checkExclude (item) {if (exclude !== undefined) {var j = exclude.length;while (j--) if (exclude[j] === item) return true;}return false;}if ($.isArr(obj)) {for (var i = 0; i < obj.length; i++) {if (!checkExclude(obj[i])) {if (attr) {if (value !== undefined) {arr.push(obj[i][attr][value]);}else {arr.push(obj[i][attr]);}}else {arr.push(obj[i]);}}}return arr;}else if (attr) {return obj[attr];}else {return obj;}};

var doc = app.activeDocument;
var pathClipSelected = new Array();
// var notSelected = new Array();
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
            // pathClipSelected[index] = doc.selection[index];
            // notSelected.push(pathClipSelected[index]);
        } else {
            pathClipSelected.push(itemMask[0]);
        }
    }
    if (pathClipSelected.length!=0) {
        
        doc.selection = pathClipSelected;
        var sele = doc.selection
        app.executeMenuCommand("Inverse menu item");
        app.executeMenuCommand("lock");
        doc.selection = sele;
    }
    app.redraw();
    BridgeTalk.bringToFront("illustrator")

}

