/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-6":{"id":6,"type":"Button","parentId":10,"style":{"enabled":true,"varName":"applyButton","text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Slider","parentId":9,"style":{"enabled":true,"varName":"scaleSlider","preferredSize":[198,0],"alignment":"fill","helpTip":null}},"item-8":{"id":8,"type":"StaticText","parentId":9,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":true},"softWrap":false,"text":"%","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"Group","parentId":14,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":14,"alignChildren":["center","center"],"alignment":null}},"item-11":{"id":11,"type":"Checkbox","parentId":10,"style":{"enabled":true,"varName":"previewChk","text":"Preview","preferredSize":[165,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Button","parentId":10,"style":{"enabled":true,"varName":"cancelButton","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"EditText","parentId":9,"style":{"enabled":true,"varName":"scaleText","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"1000","justify":"left","preferredSize":[0,0],"alignment":"fill","helpTip":null}},"item-14":{"id":14,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Scale Stroke Width","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":"fill"}}},"order":[0,14,9,7,13,8,10,11,12,6],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":10}
*/

// DIALOG
// ======
var isUndo = false;
var dialog = new Window("dialog");
dialog.text = "Dialog";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, {
    name: "panel1"
});
panel1.text = "Scale Stroke Width";
panel1.orientation = "column";
panel1.alignChildren = ["fill", "top"];
panel1.spacing = 10;
panel1.margins = 10;
panel1.alignment = ["fill", "top"];

// GROUP1
// ======
var group1 = panel1.add("group", undefined, {
    name: "group1"
});
group1.orientation = "row";
group1.alignChildren = ["fill", "fill"];
group1.spacing = 10;
group1.margins = 0;

var scaleSlider = group1.add("slider", undefined, undefined, undefined, undefined, {
    name: "scaleSlider"
});
scaleSlider.minvalue = 50;
scaleSlider.maxvalue = 1000;
scaleSlider.value = 100;
scaleSlider.preferredSize.width = 250;
scaleSlider.alignment = ["fill", "fill"];
scaleSlider.onChanging = function() {
    scaleText.text = Math.round(this.value);
    previewStart();
}

var scaleText = group1.add('edittext {properties: {name: "scaleText"}}');
scaleText.text = "100";
scaleText.alignment = ["fill", "fill"];

var statictext1 = group1.add("statictext", undefined, undefined, {
    name: "statictext1",
    scrolling: true
});
statictext1.text = "%";

// GROUP2
// ======
var group2 = dialog.add("group", undefined, {
    name: "group2"
});
group2.orientation = "row";
group2.alignChildren = ["center", "center"];
group2.spacing = 14;
group2.margins = 0;

var previewChk = group2.add("checkbox", undefined, undefined, {
    name: "previewChk"
});
previewChk.text = "Preview";
previewChk.preferredSize.width = 165;
previewChk.value = true;

var cancelButton = group2.add("button", undefined, undefined, {
    name: "cancelButton"
});
cancelButton.text = "Cancel";

var applyButton = group2.add("button", undefined, undefined, {
    name: "applyButton"
});
applyButton.text = "OK";
applyButton.onClick = function() {
    if (preview.value && isUndo) {
        isUndo = false;
        dialog.close();
    } else {
        // app.undo();
        startSpec();
        isUndo = false;
        dialog.close();
    }
}
previewChk.onClick = function() {
    previewStart();
}
cancelButton.onClick = function() {
    dialog.close();
}


function fatStroke(inp) {
    if (documents.length > 0 && activeDocument.pathItems.length > 0) {


        // inp = prompt( "Fat Val [ % ]", "" );

        // if ( inp != "" ){

        zerocnt = 0;
        d = eval(inp) * 0.01;

        if (d != 1.0) {

            myObj = activeDocument.pathItems;
            myNum = activeDocument.pathItems.length;

            for (i = 0; i < myNum; i++) {

                if (myObj[i].selected && myObj[i].stroked) {

                    if (d == 0) zerocnt++;
                    line = myObj[i].strokeWidth;
                    myObj[i].strokeWidth = line * d;
                }
            }
            if (zerocnt)
                alert("0 line width path = " + zerocnt);
        }
        // }
    }
}

function previewStart() {
    if (previewChk.value) {
        if (isUndo) app.undo();
        else isUndo = true;

        fatStroke(scaleSlider.value)
        app.redraw();
    } else if (isUndo) {
        app.undo();
        app.redraw();
        isUndo = false;
    }
}
dialog.onClose = function() {
    if (isUndo) {
        app.undo();
        app.redraw();
        isUndo = false;
    }

    // selection = $items;
    // saveSettings();
    return true;
}

dialog.show();