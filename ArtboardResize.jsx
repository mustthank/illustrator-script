var dropdown1_array = [
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "-",
  "print DTF",
  "print digital",
  "-",
  "F4",
];
var idoc = app.activeDocument;
// ======

// DIALOG
// ======
var dialog = new Window("dialog", undefined, undefined, { closeButton: false });
dialog.text = "Artboard size";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// GROUP1
// ======
var group1 = dialog.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["right", "center"];
group1.spacing = 10;
group1.margins = [0, 0, 0, 0];
var kreasiutama = File("C:/scripts/icon/kreasiutama.png");

var image1 = group1.add("image", undefined, kreasiutama, { name: "image1" });

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Artboard";
panel1.preferredSize.width = 200;
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

var dropdown1 = panel1.add("dropdownlist", undefined, undefined, {
  name: "dropdown1",
  items: dropdown1_array,
});
dropdown1.selection = 3;
dropdown1.preferredSize.width = 208;

// GROUP2
// ======
var group2 = dialog.add("group", undefined, { name: "group2" });
group2.preferredSize.width = 223;
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var checkbox1 = group2.add("checkbox", undefined, undefined, {
  name: "checkbox1",
});
checkbox1.text = " All Artboards";
checkbox1.preferredSize.width = 108;

// PANEL2
// ======
var panel2 = group2.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "Orientation";
panel2.preferredSize.width = 112;
panel2.orientation = "column";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

// DIALOG
// ======
var divider1 = dialog.add("panel", undefined, undefined, { name: "divider1" });
divider1.alignment = "fill";

// GROUP3
// ======
var group3 = dialog.add("group", undefined, { name: "group3" });
group3.preferredSize.width = 230;
group3.orientation = "row";
group3.alignChildren = ["right", "center"];
group3.spacing = 10;
group3.margins = 0;

var button1 = group3.add("button", undefined, undefined, { name: "button1" });
button1.text = "OK";
button1.preferredSize.width = 75;

var button2 = group3.add("button", undefined, undefined, { name: "button2" });
button2.text = "Cancel";
button2.preferredSize.width = 75;
var radiobutton1 = panel2.add("radiobutton", undefined, undefined, {name: "radiobutton1"}); 
    radiobutton1.text = "Portrait"; 
    radiobutton1.value = true; 

var radiobutton2 = panel2.add("radiobutton", undefined, undefined, {name: "radiobutton2"}); 
    radiobutton2.text = "Landscape"; 

// var portrait = File("C:/scripts/icon/portrait.png");
// var portr = panel2.add("iconbutton", [10, 10, 40, 40], portrait, {
//   style: "toolbutton",
// });
// portr.selection = false;
// var landscape = File("C:/scripts/icon/landscape.png");
// var lands = panel2.add("iconbutton", [10, 10, 40, 40], landscape, {
//   style: "toolbutton",
//   toggle: true,
// });
// lands.selection = false;

getNewSize();
var idx = idoc.artboards.getActiveArtboardIndex();
getArtboardSize(idx);
dropdown1.onChange = function () {
  getNewSize();
};

button1.onClick = function () {
  resizeArtboard();
  // var ab = getArtboardInstance(0);
  // alert(ab[4]);
  dialog.close();
};

dialog.show();
function getArtboardSize(i) {
  var ab = getArtboardInstance(i);
  if (ab[4] == "portrait") {
    abwidth = ab[2];
    abheight = ab[3];
    radiobutton1.value = true;
  } else {
    abwidth = ab[3];
    abheight = ab[2];
    radiobutton2.value = true;
  }
 
  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(841, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(1189, "mm").as("px"))
  ) {
    dropdown1.selection = 0;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(594, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(841, "mm").as("px"))
    )
    {
    dropdown1.selection = 1;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(420, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(594, "mm").as("px"))
    )
    {
    dropdown1.selection = 2;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(297, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(420, "mm").as("px"))
    )
    {
    dropdown1.selection = 3;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(210, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(297, "mm").as("px"))
    )
    {
    dropdown1.selection = 4;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(148, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(210, "mm").as("px"))
    )
    {
    dropdown1.selection = 5;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(580, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(1000, "mm").as("px"))
    )
    {
    dropdown1.selection = 7;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(320, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(480, "mm").as("px"))
    )
    {
    dropdown1.selection = 8;
  } else  if (
    Math.ceil(abwidth) == Math.ceil(new UnitValue(215, "mm").as("px")) &&
    Math.ceil(abheight) == Math.ceil(new UnitValue(330, "mm").as("px"))
    )
    {
    dropdown1.selection = 10;
  }
  getNewSize();
}

function getNewSize() {
  switch (dropdown1.selection.text) {
    case "A0":
      newwidth = new UnitValue(841, "mm").as("px");
      newheight = new UnitValue(1189, "mm").as("px");
      break;
    case "A1":
      newwidth = new UnitValue(594, "mm").as("px");
      newheight = new UnitValue(841, "mm").as("px");
      break;
    case "A2":
      newwidth = new UnitValue(420, "mm").as("px");
      newheight = new UnitValue(594, "mm").as("px");
      break;
    case "A3":
      newwidth = new UnitValue(297, "mm").as("px");
      newheight = new UnitValue(420, "mm").as("px");
      break;
    case "A4":
      newwidth = new UnitValue(210, "mm").as("px");
      newheight = new UnitValue(297, "mm").as("px");
      break;
    case "A5":
      newwidth = new UnitValue(148, "mm").as("px");
      newheight = new UnitValue(210, "mm").as("px");
      break;
    case "print DTF":
      newwidth = new UnitValue(580, "mm").as("px");
      newheight = new UnitValue(1000, "mm").as("px");
      break;
    case "print digital":
      newwidth = new UnitValue(320, "mm").as("px");
      newheight = new UnitValue(480, "mm").as("px");
      break;
    case "F4":
      newwidth = new UnitValue(215, "mm").as("px");
      newheight = new UnitValue(330, "mm").as("px");
      break;
    default:
      newwidth = new UnitValue(297, "mm").as("px");
      newheight = new UnitValue(420, "mm").as("px");
  }
}
function getArtboardInstance(index) {
  var abBounds = idoc.artboards[index].artboardRect;
  var ableft = abBounds[0];
  var abtop = abBounds[1];
  var abwidth = abBounds[2] - ableft;
  var abheight = abtop - abBounds[3];
  var abctrx = abwidth / 2 + ableft;
  var abctry = abtop - abheight / 2;
  var orient = "portrait";
  if (abwidth > abheight) {
    orient = "landscape";
  } else {
    orient = "portrait";
  }
  return [abctrx, abctry, abwidth, abheight, orient];
}
function resizeArtboard() {

  if (checkbox1.value == true) {
    for (i = 0; i < idoc.artboards.length; i++) {
      var abctr = getArtboardInstance(i);
      var abctrx = abctr[0];
      var abctry = abctr[1];
      if (radiobutton1.value == true) {
        var nw = newwidth;
        var nh = newheight;
      } else{
        var nw = newheight;
        var nh = newwidth;
      }
      var ableft = abctrx - nw / 2;
      var abtop = abctry + nh / 2;
      var abright = abctrx + nw / 2;
      var abbottom = abctry - nh / 2;
      idoc.artboards[i].artboardRect = [ableft, abtop, abright, abbottom];
    }
  } else {
    var idx = idoc.artboards.getActiveArtboardIndex();
    var abctr = getArtboardInstance(idx);
    var abctrx = abctr[0];
    var abctry = abctr[1];
    if (radiobutton1.value == true) {
      var nw = newwidth;
      var nh = newheight;
    } else {
      var nw = newheight;
      var nh = newwidth;
    }
    var ableft = abctrx - nw / 2;
    var abtop = abctry + nh / 2;
    var abright = abctrx + nw / 2;
    var abbottom = abctry - nh / 2;
    idoc.artboards[idx].artboardRect = [ableft, abtop, abright, abbottom];
  }
}
