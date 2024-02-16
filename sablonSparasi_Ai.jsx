var dialog = new Window("dialog");
dialog.text = "Split Channel and Halftone";
dialog.orientation = "column";
dialog.alignChildren = ["fill", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// PANEL1
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Channel Angle";
panel1.orientation = "row";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

// GROUP1
// ======
var group1 = panel1.add("group", undefined, { name: "group1" });
group1.orientation = "column";
group1.alignChildren = ["fill", "top"];
group1.spacing = 10;
group1.margins = 0;

// GROUP2
// ======
var group2 = group1.add("group", undefined, { name: "group2" });
group2.orientation = "row";
group2.alignChildren = ["center", "center"];
group2.spacing = 32;
group2.margins = 0;
group2.alignment = ["fill", "top"];

var cyanChk = group2.add("checkbox", undefined, undefined, { name: "cyanChk" });
cyanChk.text = "Cyan";
cyanChk.value = true;

var cyanAngle = group2.add('edittext {properties: {name: "cyanAngle"}}');
cyanAngle.text = "108";
cyanAngle.preferredSize.width = 30;

// GROUP3
// ======
var group3 = group1.add("group", undefined, { name: "group3" });
group3.orientation = "row";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;
group3.alignment = ["fill", "top"];

var magentaChk = group3.add("checkbox", undefined, undefined, { name: "magentaChk" });
magentaChk.text = "Magenta";
magentaChk.value = true;

var magentaAngle = group3.add('edittext {properties: {name: "magentaAngle"}}');
magentaAngle.text = "162";
magentaAngle.preferredSize.width = 30;

// GROUP4
// ======
var group4 = panel1.add("group", undefined, { name: "group4" });
group4.orientation = "column";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;

// GROUP5
// ======
var group5 = group4.add("group", undefined, { name: "group5" });
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;

var yellowChk = group5.add("checkbox", undefined, undefined, { name: "yellowChk" });
yellowChk.text = "yellow";
yellowChk.value = true;

var yellowAngle = group5.add('edittext {properties: {name: "yellowAngle"}}');
yellowAngle.text = "90";
yellowAngle.preferredSize.width = 30;

// GROUP6
// ======
var group6 = group4.add("group", undefined, { name: "group6" });
group6.orientation = "row";
group6.alignChildren = ["left", "center"];
group6.spacing = 17;
group6.margins = 0;
group6.alignment = ["fill", "center"];

var blackChk = group6.add("checkbox", undefined, undefined, { name: "blackChk" });
blackChk.text = "Black";
blackChk.value = true;

var blackAngle = group6.add('edittext {properties: {name: "blackAngle"}}');
blackAngle.text = "45";
blackAngle.preferredSize.width = 30;

// PANEL2
// ======
var panel2 = dialog.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "Halftone Screen";
panel2.orientation = "column";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

// GROUP7
// ======
var group7 = panel2.add("group", undefined, { name: "group7" });
group7.orientation = "row";
group7.alignChildren = ["left", "center"];
group7.spacing = 10;
group7.margins = 0;

// GROUP8
// ======
var group8 = group7.add("group", undefined, { name: "group8" });
group8.orientation = "column";
group8.alignChildren = ["fill", "center"];
group8.spacing = 10;
group8.margins = 0;

var statictext1 = group8.add("statictext", undefined, undefined, { name: "statictext1" });
statictext1.text = "Frequency :";

var statictext2 = group8.add("statictext", undefined, undefined, { name: "statictext2" });
statictext2.text = "Shape  :";
statictext2.justify = "right";

// GROUP9
// ======
var group9 = group7.add("group", undefined, { name: "group9" });
group9.orientation = "column";
group9.alignChildren = ["left", "center"];
group9.spacing = 10;
group9.margins = 0;

// GROUP10
// =======
var group10 = group9.add("group", undefined, { name: "group10" });
group10.orientation = "row";
group10.alignChildren = ["left", "center"];
group10.spacing = 10;
group10.margins = 0;

var frequencyHalft = group10.add('edittext {properties: {name: "frequencyHalft"}}');
frequencyHalft.text = "65";
frequencyHalft.preferredSize.width = 30;

var dropdown1_array = ["Line/Inch", "Line/Cm"];
var dropdown1 = group10.add("dropdownlist", undefined, undefined, { name: "dropdown1", items: dropdown1_array });
dropdown1.selection = 0;

// GROUP11
// =======
var group11 = group9.add("group", undefined, { name: "group11" });
group11.orientation = "row";
group11.alignChildren = ["left", "center"];
group11.spacing = 10;
group11.margins = 0;

var shapeHalft_array = ["Round", "Diamond", "Elips", "Line", "Square", "Cross"];
var shapeHalft = group11.add("dropdownlist", undefined, undefined, { name: "shapeHalft", items: shapeHalft_array });
shapeHalft.selection = 0;

// GROUP12
// =======
var group12 = dialog.add("group", undefined, { name: "group12" });
group12.orientation = "row";
group12.alignChildren = ["left", "center"];
group12.spacing = 10;
group12.margins = 0;
group12.alignment = ["fill", "top"];

var progBar = group12.add("progressbar", undefined, undefined, { name: "progBar" });
progBar.maxvalue = 99;
progBar.value = 0;
progBar.preferredSize.width = 201;
progBar.alignment = ["left", "fill"];

var progBarLabel = group12.add("statictext", undefined, undefined, { name: "progBarLabel" });
progBarLabel.text = "0  %";
progBarLabel.preferredSize.width = 33;

// GROUP13
// =======
var group13 = dialog.add("group", undefined, { name: "group13" });
group13.orientation = "row";
group13.alignChildren = ["right", "center"];
group13.spacing = 10;
group13.margins = 0;

var cancelButton = group13.add("button", undefined, undefined, { name: "cancelButton" });
cancelButton.text = "Cancel";
cancelButton.alignment = ["right", "bottom"];

var applyButton = group13.add("button", undefined, undefined, { name: "applyButton" });
applyButton.text = "OK";


applyButton.onClick = function () {
    if (!BridgeTalk.isRunning("photoshop")) {
        BridgeTalk.launch("photoshop");
        BridgeTalk.bringToFront("illustrator");
        rastersparasi()
    } else {
        rastersparasi();

    }
}
dialog.show();

function rastersparasi() {
    app.redraw()
    var doc = app.activeDocument;
    var usedChannel = [cyanChk.value, magentaChk.value, yellowChk.value, blackChk.value];
    var nameChannel = ["cyan", "magenta", "yellow", "black"];
    var bt = new BridgeTalk();
    var specifier = "photoshop";
    var rasterfreq = frequencyHalft.text;
    var colorCyan = new CMYKColor();
    colorCyan.cyan = 100;
    colorCyan.magenta = 0;
    colorCyan.yellow = 0;
    colorCyan.black = 0;
    var colorMagenta = new CMYKColor();
    colorMagenta.cyan = 0;
    colorMagenta.magenta = 100;
    colorMagenta.yellow = 0;
    colorMagenta.black = 0;
    var colorYellow = new CMYKColor();
    colorYellow.cyan = 0;
    colorYellow.magenta = 0;
    colorYellow.yellow = 100;
    colorYellow.black = 0;
    var colorBlack = new CMYKColor();
    colorBlack.cyan = 0;
    colorBlack.magenta = 0;
    colorBlack.yellow = 0;
    colorBlack.black = 100;
    var selc = doc.selection;
    app.executeMenuCommand("Inverse menu item");
    app.executeMenuCommand("hide");
    doc.selection = selc;
    if (selection.length) {
        var ex = new ExportOptionsTIFF();
        ex.resolution = 300;
        ex.byteOrder = TIFFByteOrder.IBMPC;
        ex.IZWCompression = false;
        ex.imageColorSpace = ImageColorSpace.CMYK;
        var exType = ExportType.TIFF;
        var file = new File("~/Desktop/FiletoSplit");
        var origArtboard = activeDocument.artboards[activeDocument.artboards.getActiveArtboardIndex()].artboardRect
        activeDocument.artboards[activeDocument.artboards.getActiveArtboardIndex()].artboardRect = selection[0].visibleBounds;
        // export
        doc.exportFile(file, exType, ex);
        // reset - fit artboard to selection
        activeDocument.artboards[activeDocument.artboards.getActiveArtboardIndex()].artboardRect = origArtboard;
    }

    app.executeMenuCommand("showAll");
    // app.redraw();
    var scriptFile = File("C:/scripts/SablonSeparasi.jsx")
    scriptFile.open("r");
    var scriptCode = "var frequencyHalft=" + rasterfreq + ";";
    scriptCode += "var shapeHalft='" + shapeHalft.selection.text + "';";
    scriptCode += "var usedChannel = ["+ cyanChk.value + "," + magentaChk.value + "," + yellowChk.value + "," + blackChk.value +"];";
    scriptCode += scriptFile.read();
    scriptFile.close();
    bt.target = specifier;
    bt.body = scriptCode;
    bt.onResult = function () {
        
        while (progBar.value < progBar.maxvalue) {
            progBar.value++;
            progBarLabel.text = progBar.value + "%";
            $.sleep(10);
            dialog.update();
        }
        try {
            for (var i = 0, len = usedChannel.length; i < len; i++) {
                if (usedChannel[i]) {
                    var placedItem = doc.placedItems.add();
                    placedItem.file = File("~/Desktop/" + nameChannel[i] + rasterfreq + ".psd");
                    placedItem.blendingMode = BlendModes.MULTIPLY;
                    switch (nameChannel[i]) {
                        case "cyan":
                            doc.defaultFillColor = colorCyan;
                            break;
                        case "magenta":
                            doc.defaultFillColor = colorMagenta;
                            break;
                        case "yellow":
                            doc.defaultFillColor = colorYellow;
                            break;
                        case "black":
                            doc.defaultFillColor = colorBlack;
                            break;
    
                        default:
                            break;
                    }
                    placedItem.embed()
                    File("~/Desktop/" + nameChannel[i] + rasterfreq + ".psd").remove();
                }
            }
    
            File("~/Desktop/FiletoSplit.tif").remove();
        } catch (error) {
            alert(error)
        }
        
        // app.executeMenuCommand("showAll");
        // app.executeMenuCommand("group");
        dialog.close();

    }
    bt.send(100);
    app.redraw();
    BridgeTalk.bringToFront("illustrator");



}