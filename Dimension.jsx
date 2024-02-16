/**
 * Specify
 * =================================
 * Version: 1.3.1
 * https://github.com/adamdehaven/Specify
 *
 * Adam DeHaven
 * http://adamdehaven.com
 * @adamdehaven
 *
 * Additional info:
 * https://adamdehaven.com/blog/dimension-adobe-illustrator-designs-with-a-simple-script/
 * ====================
//  */
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
CMYKColor.prototype.getColorValues = function () {return $.getColorValues(this);};
RGBColor.prototype.getColorValues = function () {return $.getColorValues(this);};
GrayColor.prototype.getColorValues = function () {return $.getColorValues(this);};
LabColor.prototype.getColorValues = function () {return $.getColorValues(this);};
NoColor.prototype.getColorValues = function () {return $.getColorValues(this);};


var doc = activeDocument;
var selectedItems = parseInt(doc.selection.length, 10) || 0;
$cropMarksColor = {
    type: 'RGBColor',
    values: [0, 0, 0, 1]
};

if (app.documents.length > 0 && selectedItems > 0) {

    // Document
    var doc = activeDocument;
    // Count selected items
    // var selectedItems = parseInt(doc.selection.length, 10) || 0;
    var isUndo = false;
    //
    // Defaults
    // ===========================
    // Units
    var setUnits = true;
    var defaultUnits = $.getenv("Specify_defaultUnits") ? convertToBoolean($.getenv("Specify_defaultUnits")) : setUnits;
    // Font Size
    var setFontSize = 8;
    var defaultFontSize = $.getenv("Specify_defaultFontSize") ? convertToUnits($.getenv("Specify_defaultFontSize")).toFixed(3) : setFontSize;
    // Colors
    var setRed = 36;
    var defaultColorRed = $.getenv("Specify_defaultColorRed") ? $.getenv("Specify_defaultColorRed") : setRed;
    var setGreen = 151;
    var defaultColorGreen = $.getenv("Specify_defaultColorGreen") ? $.getenv("Specify_defaultColorGreen") : setGreen;
    var setBlue = 227;
    var defaultColorBlue = $.getenv("Specify_defaultColorBlue") ? $.getenv("Specify_defaultColorBlue") : setBlue;
    // Decimals
    var setDecimals = 2;
    var defaultDecimals = $.getenv("Specify_defaultDecimals") ? $.getenv("Specify_defaultDecimals") : setDecimals;
    // Scale
    var setScale = 0;
    var defaultScale = $.getenv("Specify_defaultScale") ? $.getenv("Specify_defaultScale") : setScale;
    // Use Custom Units
    var setUseCustomUnits = false;
    var defaultUseCustomUnits = $.getenv("Specify_defaultUseCustomUnits") ? convertToBoolean($.getenv("Specify_defaultUseCustomUnits")) : setUseCustomUnits;
    // Custom Units
    var setCustomUnits = getRulerUnits();
    var defaultCustomUnits = $.getenv("Specify_defaultCustomUnits") ? $.getenv("Specify_defaultCustomUnits") : setCustomUnits;

    var usevisible = false;
    var gap = 4;
    var defaultgap = $.getenv("Specify_defaultGap") ? $.getenv("Specify_defaultGap") : gap;
    //
    // Create Dialog
    // ===========================

    // Dialog Box
    var specifyDialogBox = new Window("dialog", "Specify");
    specifyDialogBox.alignChildren = "left";



    //
    // Dimension Panel
    // ===========================
    dimensionPanel = specifyDialogBox.add("panel", undefined, "SELECT DIMENSION(S) TO SPECIFY");
    dimensionPanel.orientation = "column";
    dimensionPanel.alignment = "fill";
    dimensionPanel.margins = [20, 20, 20, 10];
    dimensionGroup = dimensionPanel.add("group");
    dimensionGroup.orientation = "row";

    // Top
    (topCheckbox = dimensionGroup.add("checkbox", undefined, "Top")).helpTip = "Dimension the top side of the object(s).";
    topCheckbox.value = true;


    // Right
    (rightCheckbox = dimensionGroup.add("checkbox", undefined, "Right")).helpTip = "Dimension the right side of the object(s).";
    rightCheckbox.value = false;

    // Bottom
    (bottomCheckbox = dimensionGroup.add("checkbox", undefined, "Bottom")).helpTip = "Dimension the bottom side of the object(s).";
    bottomCheckbox.value = false;

    // Left
    (leftCheckbox = dimensionGroup.add("checkbox", undefined, "Left")).helpTip = "Dimension the left side of the object(s).";
    leftCheckbox.value = false;
    topCheckbox.onClick = function () {
        if (!topCheckbox.value && !leftCheckbox.value && !rightCheckbox.value && !bottomCheckbox.value) {
            this.value = true
        }
        previewStart();
    }
    rightCheckbox.onClick = function () {
        if (!topCheckbox.value && !leftCheckbox.value && !rightCheckbox.value && !bottomCheckbox.value) {
            this.value = true
        }
        previewStart();
    }
    leftCheckbox.onClick = function () {
        if (!topCheckbox.value && !leftCheckbox.value && !rightCheckbox.value && !bottomCheckbox.value) {
            this.value = true
        }
        previewStart();
    }
    bottomCheckbox.onClick = function () {
        if (!topCheckbox.value && !leftCheckbox.value && !rightCheckbox.value && !bottomCheckbox.value) {
            this.value = true
        }
        previewStart();
    }
    // Select All
    selectAllGroup = dimensionPanel.add("group");
    selectAllGroup.orientation = "row";

    (selectAllCheckbox = selectAllGroup.add("checkbox", undefined, "Select All")).helpTip = "Dimension all sides of the object(s).";
    selectAllCheckbox.value = false;
    selectAllCheckbox.onClick = function () {
        if (selectAllCheckbox.value) {
            // Select All is checked
            topCheckbox.value = true;
            topCheckbox.enabled = false;

            rightCheckbox.value = true;
            rightCheckbox.enabled = false;

            bottomCheckbox.value = true;
            bottomCheckbox.enabled = false;

            leftCheckbox.value = true;
            leftCheckbox.enabled = false;
        } else {
            // Select All is unchecked
            topCheckbox.value = true;
            topCheckbox.enabled = true;

            rightCheckbox.value = false;
            rightCheckbox.enabled = true;

            bottomCheckbox.value = false;
            bottomCheckbox.enabled = true;

            leftCheckbox.value = false;
            leftCheckbox.enabled = true;
        }
        previewStart();
    };

    //
    // Options Panel
    // ===========================
    optionsPanel = specifyDialogBox.add("panel", undefined, "OPTIONS");
    optionsPanel.orientation = "column";
    optionsPanel.margins = 20;
    optionsPanel.alignment = "fill";
    optionsPanel.alignChildren = ['fill', 'fill'];
    // alignChildren = ['fill', 'fill'];

    // If exactly 2 objects are selected, give user option to dimension BETWEEN them
    if (selectedItems == 2) {
        (between = optionsPanel.add("checkbox", undefined, "Dimension between selected objects")).helpTip = "When checked, return the distance between\nthe 2 objects for the selected dimensions.";
        between.value = false;
        between.onClick = function (e){
            previewStart();
        }
    }
    // Add font-size box
    offsetGroup = optionsPanel.add("group");
    offsetGroup.orientation = "row";
    offsetLbl = offsetGroup.add("statictext", undefined, "Offset    :");
    offsetSlider = offsetGroup.add('slider', [0, 0, 170, 15], 0, 4, 200);
    offsetLabel = offsetGroup.add("edittext", [0, 0, 50, 25], offsetSlider.value);
    offsetSlider.onChanging = function () {
        offsetLabel.text = Math.round(this.value)
    }
    offsetSlider.onChange = function (e) {
        gap = this.value;
        restoreDefaultsButton.enabled = true;
        previewStart();
    }
    offsetLabel.addEventListener('changing', function () {
        gap = parseInt(this.text);
        offsetSlider.value = Math.round(this.text);
        previewStart();
    });
    // offsetLabel.addEventListener('keyup', function (e) { normalizeAngle(this.value, offsetLabel, 1, 360); previewStart(); });
    fontGroup = optionsPanel.add("group");
    fontGroup.orientation = "row";
    fontLbl = fontGroup.add("statictext", undefined, "Font size:");
    fontSlider = fontGroup.add('slider', [0, 0, 170, 15], 0, 8, 72);
    fontSizeInput = fontGroup.add("edittext", [0, 0, 50, 25], fontSlider.value);
    fontSlider.onChanging = function () {
        fontSizeInput.text = Math.round(this.value)
    }
    fontSlider.onChange = function (e) {
        // gap = this.value;
        restoreDefaultsButton.enabled = true;
        previewStart();
    }
    fontSizeInput.addEventListener('changing', function () {
        previewStart();
        fontSlider.value = Math.round(this.text);
    });
    fontUnitsLabelText = "";
    switch (doc.rulerUnits) {
        case RulerUnits.Picas:
            fontUnitsLabelText = "pc";
            break;
        case RulerUnits.Inches:
            fontUnitsLabelText = "in";
            break;
        case RulerUnits.Millimeters:
            fontUnitsLabelText = "mm";
            break;
        case RulerUnits.Centimeters:
            fontUnitsLabelText = "cm";
            break;
        case RulerUnits.Pixels:
            fontUnitsLabelText = "px";
            break;
        default:
            fontUnitsLabelText = "pt";
    }

    colorGroup = optionsPanel.add("group");
    colorGroup.orientation = "row";

    // w.add ("edittext", [0, 0, 150, 70], "", {multiline: true});
    colorLabel = colorGroup.add("statictext", undefined, "Label color (RGB):");
    colorbutton1 = colorGroup.add('iconbutton', undefined, undefined, {
        name: 'coloroption1',
        style: 'iconbutton'
    });
    colorbutton1.size = [30, 30];

    colorbutton1.shadowPen = colorbutton1.graphics.newPen(colorbutton1.graphics.PenType.SOLID_COLOR, [0.7, 0.7, 0.7, 1], 3);
    colorbutton1.fillBrush = colorbutton1.graphics.newBrush(colorbutton1.graphics.BrushType.SOLID_COLOR, [defaultColorRed / 255, defaultColorGreen / 255, defaultColorBlue / 255, 1]);

    colorbutton1.onDraw = customDraw;

    colorbutton1.onClick = function () {
        this.enabled = false;
        // if (!newcolor1 === null) return; // dialog dismissed
        var $cropMarksColorNew = app.showColorPicker($.color($cropMarksColor.type, $cropMarksColor.values),"modal");
        var newcolor1 = $cropMarksColorNew.getColorValues();
        $cropMarksColor.values = newcolor1;
        this.fillBrush = this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR, [newcolor1[0]/255,newcolor1[1]/255,newcolor1[2]/255]);
        // newcolor1 = null;
        this.notify("onDraw");
        // alert(newcolor1);
        colorInputRed.text = parseInt (newcolor1[0]);
        colorInputGreen.text = parseInt (newcolor1[1] );
        colorInputBlue.text = parseInt (newcolor1[2]);
        previewStart();
        this.enabled = true;
    };

    // colorLabel = colorGroup.add("statictext", undefined, "Label color (RGB):");
    // Red

    
    


    // Add decimal places box
    // decimalPlacesGroup = optionsPanel.add("group");
    // decimalPlacesGroup.orientation = "row";
    decimalPlacesLabel = colorGroup.add("statictext", undefined, "Decimal places:");
    g = colorGroup.add("group");
    g.spacing = 0;
    g.margin = 0;


    (colorInputRed = g.add("edittext", [0, 0, 0, 0], defaultColorRed, {
        visible: false
    })).helpTip = "Enter the RGB red color value to use for dimension label(s).\n\nDefault: " + setRed;
    colorInputRed.characters = 3;
    // colorInputRed.visible = false;

    // Green
    (colorInputGreen = g.add("edittext", [0, 0, 0, 0], defaultColorGreen, {
        visible: false
    })).helpTip = "Enter the RGB green color value to use for dimension label(s).\n\nDefault: " + setGreen;
    colorInputGreen.characters = 3;
    // Blue
    (colorInputBlue = g.add("edittext", [0, 0, 0, 0], defaultColorBlue, {
        visible: false
    })).helpTip = "Enter the RGB blue color value to use for dimension label(s).\n\nDefault: " + setBlue;
    colorInputBlue.characters = 3;


    var decimalPlacesInput = g.add('edittext', [0, 0, 20, 30], '2', { readonly: true });
    var sbar = g.add("scrollbar", [5,5,20,30]);
    // var sbar = g.add("scrollbar", [5, 5, 20, 30]);
    sbar.minvalue = -4
    sbar.maxvalue = 0
    //  ("scrollbar", [0,0,20,200], 0, 0, 60
    sbar.value = -2
    sbar.onChanging = function () { decimalPlacesInput.text = -1 * this.value; previewStart() }

    // (decimalPlacesInput = colorGroup.add("edittext", undefined, defaultDecimals)).helpTip = "Enter the desired number of decimal places to\ndisplay in the label dimensions.\n\nDefault: " + setDecimals;
    decimalPlacesInput.characters = 0;
    decimalPlacesInput.onActivate = function () {
        restoreDefaultsButton.enabled = true;
        infoText.enabled = true;
        decimalPlacesInput.text = decimalPlacesInput.text.replace(/[^0-9]/g, "");
    };
    decimalPlacesInput.onChange = function () {
        decimalPlacesInput.text = decimalPlacesInput.text.replace(/[^0-9]/g, "");
    };


    // Show/hide units




    with (measurementGroup = specifyDialogBox.add("panel", undefined, "Measurement")) {
        orientation = "column";
        margins = 20;
        alignment = ["fill", "top"];
        alignChildren = "left";
        with (measurementGroup.add('group')) {
            orientation = "row";
            (units = add("checkbox", undefined, "Include units label(s)")).helpTip = "When checked, inserts the units label alongside\nthe outputted dimension.\nExample: 220 px";
            units.value = defaultUnits;
            units.onClick = function () {
                if (units.value == false) {
                    useCustomUnits.value = false;
                    customUnitsInput.text = getRulerUnits();
                    customUnitsInput.enabled = false;
                }
                previewStart();
            };

            // Add options panel checkboxes
            (useCustomUnits = add("checkbox", undefined, "Customize Units Label")).helpTip = "When checked, allows user to customize\nthe text of the units label.\nExample: ft";
            useCustomUnits.value = defaultUseCustomUnits;
            useCustomUnits.onClick = function () {
                if (useCustomUnits.value == true) {
                    customUnitsInput.enabled = true;
                    restoreDefaultsButton.enabled = true;
                } else {
                    customUnitsInput.text = getRulerUnits();
                    customUnitsInput.enabled = false;
                }
                previewStart();
            };
        }
        with (measurementGroup.add('group')) {
            orientation = 'row';
            alignChildren = ['fill', 'fill'];
            // margins = [20, 0, 20, 20];
            alignment = "fill";
            var unitshow = add('statictext', undefined, 'Unit :')
            var dropdownunit_array = ["Inches", "Millimeters", "Centimeters"];
            var dropdownunit = add("dropdownlist", undefined, undefined, {

                items: dropdownunit_array
            });
            dropdownunit.selection = 1;
            dropdownunit.onChange = function () {
                // customUnitsInput.text = dropdownunit.selection.text
                previewStart()
            }
            customUnitsLabel = add("statictext", undefined, "Custom Label:");
            customUnitsInput = add("edittext", undefined, defaultCustomUnits);
            customUnitsInput.helpTip = "Enter the string to display after the dimension \nnumber when using a custom scale.\n\nDefault: " + setCustomUnits;
            customUnitsInput.enabled = defaultUseCustomUnits;
            customUnitsInput.characters = 5;
            customUnitsInput.onChange = function () {
                restoreDefaultsButton.enabled = true;
                infoText.enabled = true;
                customUnitsInput.text = customUnitsInput.text.replace(/[^ a-zA-Z]/g, "");
            };
            customUnitsInput.addEventListener('changing', function () {
                previewStart();
                // fontSlider.value = Math.round(this.text);
            });
        }
        with (measurementGroup.add('group')) {
            orientation = 'row';
            alignChildren = ['fill', 'fill'];
            // margins = [20, 0, 20, 20];
            alignment = "fill";
            restoreDefaultsButton = add("button", undefined, "Restore Defaults");
            restoreDefaultsButton.alignment = "left";
            restoreDefaultsButton.enabled = (setFontSize != defaultFontSize || setRed != defaultColorRed || setGreen != defaultColorGreen || setBlue != defaultColorBlue || setDecimals != defaultDecimals || setScale != defaultScale || setCustomUnits != defaultCustomUnits ? true : false);
            restoreDefaultsButton.onClick = function () {
                restoreDefaults();
            };
            (previewchk = add("checkbox", undefined, "Use visible Bound")).helpTip = "";
            previewchk.alignment = "right";
            previewchk.value = false; 
            previewchk.onClick = function () {
                usevisible = this.value;
                               previewStart();
            };
        }



    }
    // Button Group

    with (specifyDialogBox.add('group')) {
        orientation = 'row';
        alignChildren = ['fill', 'fill'];
        margins = [20, 0, 20, 20];
        alignment = "right";

        var preview = add('checkbox', undefined, 'Preview'),
            cancelBtn = add('button', undefined, 'Cancel'),
            applyBtn = add('button', undefined, 'OK');

        preview.onClick = function () {
            previewStart();
        }
        cancelBtn.onClick = function () {
            specifyDialogBox.close();
        }
        applyBtn.onClick = function () {
            if (preview.value && isUndo) {
                isUndo = false;
                specifyDialogBox.close();
            } else {
                // app.undo();
                startSpec();
                isUndo = false;
                specifyDialogBox.close();
            }
        }
        
    }
    //
    // ===========================
    // End Create Dialog


    // Measurement line and text color in RGB
    var color = new RGBColor;

    // Declare global decimals var
    var decimals;

    // Declare global scale var
    var scale;

    // Gap between measurement lines and object
    // var gap = 4;

    // Size of perpendicular measurement lines.
    var size = 6;

    //
    // Start the Spec
    // ===========================
    function startSpec() {

        // Add all selected objects to array
        var objectsToSpec = new Array();
        for (var index = doc.selection.length - 1; index >= 0; index--) {
            var itemMask = doc.selection[index].getChildsByFilter(function (mask) { return mask.clipping; }, true);
            if (itemMask == "") {
                objectsToSpec[index] = doc.selection[index];
            } else {
                objectsToSpec[index] = itemMask[0];
            }

        }

        // Fetch desired dimensions
        var top = topCheckbox.value;
        var left = leftCheckbox.value;
        var right = rightCheckbox.value;
        var bottom = bottomCheckbox.value;
        // Take focus away from fontSizeInput to validate (numeric)
        fontSizeInput.active = false;

        // Set bool for numeric vars
        var validFontSize = /^[0-9]{1,3}(\.[0-9]{1,3})?$/.test(fontSizeInput.text);

        var validRedColor = /^[0-9]{1,3}$/.test(colorInputRed.text) && parseInt(colorInputRed.text) >= 0 && parseInt(colorInputRed.text) <= 255;
        var validGreenColor = /^[0-9]{1,3}$/.test(colorInputGreen.text) && parseInt(colorInputGreen.text) >= 0 && parseInt(colorInputRed.text) <= 255;
        var validBlueColor = /^[0-9]{1,3}$/.test(colorInputBlue.text) && parseInt(colorInputBlue.text) >= 0 && parseInt(colorInputBlue.text) <= 255;
        // If colors are valid, set variables
        if (validRedColor && validGreenColor && validBlueColor) {
            color.red = colorInputRed.text;
            color.green = colorInputGreen.text;
            color.blue = colorInputBlue.text;
            // Set environmental variables
            $.setenv("Specify_defaultColorRed", color.red);
            $.setenv("Specify_defaultColorGreen", color.green);
            $.setenv("Specify_defaultColorBlue", color.blue);
        }

        var validDecimalPlaces = /^[0-4]{1}$/.test(decimalPlacesInput.text);
        if (validDecimalPlaces) {
            // Number of decimal places in measurement
            decimals = decimalPlacesInput.text;
            // Set environmental variable
            $.setenv("Specify_defaultDecimals", decimals);
        }

        // var theScale = parseInt(customScaleDropdown.selection.toString().replace(/1\//g, "").replace(/[^0-9]/g, ""));
        scale = 1;
        // Set environmental variable
        $.setenv("Specify_defaultScale", "1");

        if (selectedItems < 1) {
            beep();
            alert("Please select at least 1 object and try again.");
            // Close dialog
            specifyDialogBox.close();
        } else if (!top && !left && !right && !bottom) {
            beep();
            alert("Please select at least 1 dimension to draw.");
        } else if (!validFontSize) {
            // If fontSizeInput.text does not match regex
            beep();
            alert("Please enter a valid font size. \n0.002 - 999.999");
            fontSizeInput.active = true;
            fontSizeInput.text = setFontSize;
        } else if (parseFloat(fontSizeInput.text, 10) <= 0.001) {
            beep();
            alert("Font size must be greater than 0.001.");
            fontSizeInput.active = true;
        } else if (!validRedColor || !validGreenColor || !validBlueColor) {
            // If RGB inputs are not numeric
            beep();
            alert("Please enter a valid RGB color.");
            colorInputRed.active = true;
            colorInputRed.text = defaultColorRed;
            colorInputGreen.text = defaultColorGreen;
            colorInputBlue.text = defaultColorBlue;
        } else if (!validDecimalPlaces) {
            // If decimalPlacesInput.text is not numeric
            beep();
            alert("Decimal places must range from 0 - 4.");
            decimalPlacesInput.active = true;
            decimalPlacesInput.text = setDecimals;
        } else if (selectedItems == 2 && between.value) {
            if (top) specDouble(objectsToSpec[0], objectsToSpec[1], "Top");
            if (left) specDouble(objectsToSpec[0], objectsToSpec[1], "Left");
            if (right) specDouble(objectsToSpec[0], objectsToSpec[1], "Right");
            if (bottom) specDouble(objectsToSpec[0], objectsToSpec[1], "Bottom");
            // Close dialog when finished
            // specifyDialogBox.close();
        } else {
            // Iterate over each selected object, creating individual dimensions as you go
            if (usevisible) {
                for (var objIndex = objectsToSpec.length - 1; objIndex >= 0; objIndex--) {
                    if (top) specSingle(objectsToSpec[objIndex].visibleBounds, "Top");
                    if (left) specSingle(objectsToSpec[objIndex].visibleBounds, "Left");
                    if (right) specSingle(objectsToSpec[objIndex].visibleBounds, "Right");
                    if (bottom) specSingle(objectsToSpec[objIndex].visibleBounds, "Bottom");
                }
            } else {
                for (var objIndex = objectsToSpec.length - 1; objIndex >= 0; objIndex--) {
                    if (top) specSingle(objectsToSpec[objIndex].geometricBounds, "Top");
                    if (left) specSingle(objectsToSpec[objIndex].geometricBounds, "Left");
                    if (right) specSingle(objectsToSpec[objIndex].geometricBounds, "Right");
                    if (bottom) specSingle(objectsToSpec[objIndex].geometricBounds, "Bottom");
                }
            }
           
            // Close dialog when finished
            // specifyDialogBox.close();
        }
    };

    //
    // Spec a single object
    // ===========================
    function specSingle(bound, where) {
        // unlock SPECS layer
        // specsLayer.locked = false;

        // width and height

        var w = bound[2] - bound[0];
        var h = bound[1] - bound[3];

        // a & b are the horizontal or vertical positions that change
        // c is the horizontal or vertical position that doesn't change
        var a = bound[0];
        var b = bound[2];
        var c = bound[1];

        // xy='x' (horizontal measurement), xy='y' (vertical measurement)
        var xy = "x";

        // a direction flag for placing the measurement lines.
        var dir = 1;

        switch (where) {
            case "Top":
                a = bound[0];
                b = bound[2];
                c = bound[1];
                xy = "x";
                dir = 1;
                break;
            case "Right":
                a = bound[1];
                b = bound[3];
                c = bound[2];
                xy = "y";
                dir = 1;
                break;
            case "Bottom":
                a = bound[0];
                b = bound[2];
                c = bound[3];
                xy = "x";
                dir = -1;
                break;
            case "Left":
                a = bound[1];
                b = bound[3];
                c = bound[0];
                xy = "y";
                dir = -1;
                break;
        }

        // Create the measurement lines
        var lines = new Array();

        // horizontal measurement
        if (xy == "x") {

            // 2 vertical lines
            // lines[0] = new Array(new Array(a, c + (gap) * dir));
            // lines[0].push(new Array(a, c + (gap + size) * dir));
            // lines[1] = new Array(new Array(b, c + (gap) * dir));
            // lines[1].push(new Array(b, c + (gap + size) * dir));
            lines[0] = new Array(new Array(a, c));
            lines[0].push(new Array(a, c + (gap + size) * dir));
            lines[1] = new Array(new Array(b, c));
            lines[1].push(new Array(b, c + (gap + size) * dir));


            // 1 horizontal line
            lines[2] = new Array(new Array(a, c + (gap + size / 2) * dir));
            lines[2].push(new Array(b, c + (gap + size / 2) * dir));

            // Create text label
            if (where == "Top") {
                var t = specLabel(w, (a + b) / 2, lines[0][1][1], color);
                t.top += t.height;
            } else {
                var t = specLabel(w, (a + b) / 2, lines[0][1][1], color);
                t.top -= size;
            }
            t.left -= t.width / 2;

        } else {
            // Vertical measurement

            lines[0] = new Array(new Array(c, a));
            lines[0].push(new Array(c + (gap + size) * dir, a));
            lines[1] = new Array(new Array(c, b));
            lines[1].push(new Array(c + (gap + size) * dir, b));

            //1 vertical line
            lines[2] = new Array(new Array(c + (gap + size / 2) * dir, a));
            lines[2].push(new Array(c + (gap + size / 2) * dir, b));

            // Create text label
            if (where == "Left") {
                var t = specLabel(h, lines[0][1][0], (a + b) / 2, color);
                t.left -= t.width;
                t.rotate(90, true, false, false, false, Transformation.BOTTOMRIGHT);
                t.top += t.width;
                t.top += t.height / 2;
            } else {
                var t = specLabel(h, lines[0][1][0], (a + b) / 2, color);
                t.rotate(-90, true, false, false, false, Transformation.BOTTOMLEFT);
                t.top += t.width;
                t.top += t.height / 2;
            }
        }

        // Draw lines
        var specgroup = new Array(t);

        for (var i = 0; i < lines.length; i++) {
            var p = doc.pathItems.add();
            p.setEntirePath(lines[i]);
            p.strokeDashes = []; // Prevent dashed SPEC lines
            setLineStyle(p, color);
            specgroup.push(p);
        }

        group(specgroup);

        // re-lock SPECS layer
        // specsLayer.locked = true;

    };

    //
    // Spec the gap between 2 elements
    // ===========================
    function specDouble(item1, item2, where) {

        var bound = new Array(0, 0, 0, 0);

        var a = item1.geometricBounds;
        var b = item2.geometricBounds;

        if (where == "Top" || where == "Bottom") {

            if (b[0] > a[0]) { // item 2 on right,

                if (b[0] > a[2]) { // no overlap
                    bound[0] = a[2];
                    bound[2] = b[0];
                } else { // overlap
                    bound[0] = b[0];
                    bound[2] = a[2];
                }
            } else if (a[0] >= b[0]) { // item 1 on right

                if (a[0] > b[2]) { // no overlap
                    bound[0] = b[2];
                    bound[2] = a[0];
                } else { // overlap
                    bound[0] = a[0];
                    bound[2] = b[2];
                }
            }

            bound[1] = Math.max(a[1], b[1]);
            bound[3] = Math.min(a[3], b[3]);

        } else {

            if (b[3] > a[3]) { // item 2 on top
                if (b[3] > a[1]) { // no overlap
                    bound[3] = a[1];
                    bound[1] = b[3];
                } else { // overlap
                    bound[3] = b[3];
                    bound[1] = a[1];
                }
            } else if (a[3] >= b[3]) { // item 1 on top

                if (a[3] > b[1]) { // no overlap
                    bound[3] = b[1];
                    bound[1] = a[3];
                } else { // overlap
                    bound[3] = a[3];
                    bound[1] = b[1];
                }
            }

            bound[0] = Math.min(a[0], b[0]);
            bound[2] = Math.max(a[2], b[2]);
        }
        specSingle(bound, where);
    };

    //
    // Create a text label that specify the dimension
    // ===========================
    function specLabel(val, x, y, color) {

        var t = doc.textFrames.add();
        // Get font size from specifyDialogBox.fontSizeInput
        var labelFontSize;
        if (parseFloat(fontSizeInput.text) > 0) {
            labelFontSize = parseFloat(fontSizeInput.text);
        } else {
            labelFontSize = defaultFontSize;
        }

        // Convert font size to RulerUnits
        var labelFontInUnits = convertToPoints(labelFontSize);

        // Set environmental variable
        $.setenv("Specify_defaultFontSize", labelFontInUnits);

        t.textRange.characterAttributes.size = labelFontInUnits;
        t.textRange.characterAttributes.alignment = StyleRunAlignmentType.center;
        t.textRange.characterAttributes.fillColor = color;

        // Conversions : http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/illustrator/sdk/CC2014/Illustrator%20Scripting%20Guide.pdf
        // UnitValue object (page 230): http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/scripting/pdfs/javascript_tools_guide.pdf

        var displayUnitsLabel = units.value;
        // Set environmental variable
        $.setenv("Specify_defaultUnits", displayUnitsLabel);

        var v = val * scale;
        var unitsLabel = "";

        switch (dropdownunit.selection.text) {
            case "Picas":
                v = new UnitValue(v, "pt").as("pc");
                var vd = v - Math.floor(v);
                vd = 12 * vd;
                v = Math.floor(v) + "p" + vd.toFixed(decimals);
                break;
            case "Inches":
                v = new UnitValue(v, "pt").as("in");
                v = v.toFixed(decimals);
                unitsLabel = " in"; // add abbreviation
                break;
            case "Millimeters":
                v = new UnitValue(v, "pt").as("mm");
                v = v.toFixed(decimals);
                unitsLabel = " mm"; // add abbreviation
                break;
            case "Centimeters":
                v = new UnitValue(v, "pt").as("cm");
                v = v.toFixed(decimals);
                unitsLabel = " cm"; // add abbreviation
                break;
            case "Pixels":
                v = new UnitValue(v, "pt").as("px");
                v = v.toFixed(decimals);
                unitsLabel = " px"; // add abbreviation
                break;
            default:
                v = new UnitValue(v, "pt").as("pt");
                v = v.toFixed(decimals);
                unitsLabel = " pt"; // add abbreviation
        }

        // If custom scale and units label is set
        if (useCustomUnits.value == true && customUnitsInput.enabled && customUnitsInput.text != getRulerUnits()) {
            unitsLabel = customUnitsInput.text;
            $.setenv("Specify_defaultUseCustomUnits", true);
            $.setenv("Specify_defaultCustomUnits", unitsLabel);
        }

        if (displayUnitsLabel) {
            t.contents = v + " " + unitsLabel;
        } else {
            t.contents = v;
        }
        t.top = y;
        t.left = x;

        return t;
    };

    function convertToBoolean(string) {
        switch (string.toLowerCase()) {
            case "true":
                return true;
                break;
            case "false":
                return false;
                break;
        }
    };

    function setLineStyle(path, color) {
        path.filled = false;
        path.stroked = true;
        path.strokeColor = color;
        path.strokeWidth = 0.75;
        return path;
    };

    // Group items in a layer
    function group(items, isDuplicate) {

        // Create new group
        var gg = doc.groupItems.add();


        // Add to group
        // Reverse count, because items length is reduced as items are moved to new group
        for (var i = items.length - 1; i >= 0; i--) {

            if (items[i] != gg) { // don't group the group itself
                if (isDuplicate) {
                    newItem = items[i].duplicate(gg, ElementPlacement.PLACEATBEGINNING);
                } else {
                    items[i].move(gg, ElementPlacement.PLACEATBEGINNING);
                }
            }
        }
        return gg;
    };

    function convertToPoints(value) {
        switch (doc.rulerUnits) {
            case RulerUnits.Picas:
                value = new UnitValue(value, "pc").as("pt");
                break;
            case RulerUnits.Inches:
                value = new UnitValue(value, "in").as("pt");
                break;
            case RulerUnits.Millimeters:
                value = new UnitValue(value, "mm").as("pt");
                break;
            case RulerUnits.Centimeters:
                value = new UnitValue(value, "cm").as("pt");
                break;
            case RulerUnits.Pixels:
                value = new UnitValue(value, "px").as("pt");
                break;
            default:
                value = new UnitValue(value, "pt").as("pt");
        }
        return value;
    };

    function convertToUnits(value) {
        switch (doc.rulerUnits) {
            case RulerUnits.Picas:
                value = new UnitValue(value, "pt").as("pc");
                break;
            case RulerUnits.Inches:
                value = new UnitValue(value, "pt").as("in");
                break;
            case RulerUnits.Millimeters:
                value = new UnitValue(value, "pt").as("mm");
                break;
            case RulerUnits.Centimeters:
                value = new UnitValue(value, "pt").as("cm");
                break;
            case RulerUnits.Pixels:
                value = new UnitValue(value, "pt").as("px");
                break;
            default:
                value = new UnitValue(value, "pt").as("pt");
        }
        return value;
    };

    function getRulerUnits() {
        var rulerUnits;
        switch (doc.rulerUnits) {
            case RulerUnits.Picas:
                rulerUnits = "pc";
                break;
            case RulerUnits.Inches:
                rulerUnits = "in";
                break;
            case RulerUnits.Millimeters:
                rulerUnits = "mm";
                break;
            case RulerUnits.Centimeters:
                rulerUnits = "cm";
                break;
            case RulerUnits.Pixels:
                rulerUnits = "px";
                break;
            default:
                rulerUnits = "pt";
        }
        return rulerUnits;
    };

    function restoreDefaults() {
        try {
            units.value = setUnits;
            fontSizeInput.text = setFontSize;
            fontSlider.value = setFontSize;
            offsetSlider.value = 4;
            offsetLabel.text = 4;
            gap = 4;
            colorInputRed.text = setRed;
            colorInputGreen.text = setGreen;
            colorInputBlue.text = setBlue;
            decimalPlacesInput.text = setDecimals;
            usevisible = false;
            previewchk.value = false;

            // customScaleDropdown.selection = setScale;
            customUnitsInput.text = setCustomUnits;
            useCustomUnits.value = false;
            customUnitsInput.enabled = false;
            restoreDefaultsButton.enabled = false;
            // Unset environmental variables
            $.setenv("Specify_defaultUnits", "");
            $.setenv("Specify_defaultFontSize", "");
            $.setenv("Specify_defaultColorRed", "");
            $.setenv("Specify_defaultColorGreen", "");
            $.setenv("Specify_defaultColorBlue", "");
            $.setenv("Specify_defaultDecimals", "");
            $.setenv("Specify_defaultScale", "");
            $.setenv("Specify_defaultUseCustomUnits", "");
            $.setenv("Specify_defaultCustomUnits", "");
            $.setenv("Specify_defaultGap", "");
            colorbutton1.shadowPen = colorbutton1.graphics.newPen(colorbutton1.graphics.PenType.SOLID_COLOR, [0.7, 0.7, 0.7, 1], 3);
            colorbutton1.fillBrush = colorbutton1.graphics.newBrush(colorbutton1.graphics.BrushType.SOLID_COLOR, [defaultColorRed / 255, defaultColorGreen / 255, defaultColorBlue / 255, 1]);

            // colorbutton1.onDraw = customDraw;
            colorbutton1.notify("onDraw");
            previewStart()
        } catch (err) {
            alert(err)
        }

    };

   

    function customDraw() {
        with (this) {
            graphics.drawOSControl();
            graphics.rectPath(0, 0, size[0], size[1]);
            graphics.fillPath(fillBrush);
            graphics.strokePath(shadowPen);
            if (text) graphics.drawString(text, textPen, (size[0] - graphics.measureString(text, graphics.font, size[0])[0]) / 2, 3, graphics.font);
        }
    };


    function previewStart() {
        try {
            if (preview.value) {
                if (isUndo) app.undo();
                else isUndo = true;

                startSpec();
                app.redraw();
            } else if (isUndo) {
                app.undo();
                app.redraw();
                isUndo = false;
            }
        } catch (error) {

        }

    }

    specifyDialogBox.onClose = function () {
        if (isUndo) {
            app.undo();
            app.redraw();
            isUndo = false;
        }

        // selection = $items;
        // saveSettings();
        return true;
    }


    //
    // Run Script
    // ===========================
    switch (selectedItems) {
        case 0:
            beep();
            alert("Please select at least 1 object and try again.");
            break;
        default:
            specifyDialogBox.show();
            break;
    }

} else { // No active document
    alert("There are no objects to Specify. \nPlease open a document and select at least 1 object to continue.")
}