// #include "C:/scripts/json2.js";
// "object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();
var dropdown1_array = ["A0","A1","A2","A3","A4","A5","-","print DTF","print digital","-","F4"]; 
var idoc = app.activeDocument;
// ======


// DIALOG
// ======
var dialog = new Window("dialog", undefined, undefined, {closeButton: false}); 
    dialog.text = "Artboard size"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["right","center"]; 
    group1.spacing = 10; 
    group1.margins = [0,0,0,0]; 
    var kreasiutama = File ("C:/scripts/icon/kreasiutama.png")

var image1 = group1.add("image", undefined, kreasiutama, {name: "image1"}); 

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Artboard"; 
    panel1.preferredSize.width = 200; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

var dropdown1 = panel1.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 3; 
    dropdown1.preferredSize.width = 208; 

// GROUP2
// ======
var group2 = dialog.add("group", undefined, {name: "group2"}); 
    group2.preferredSize.width = 223; 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var checkbox1 = group2.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkbox1.text = " All Artboards"; 
    checkbox1.preferredSize.width = 108; 

// PANEL2
// ======
var panel2 = group2.add("panel", undefined, undefined, {name: "panel2"}); 
    panel2.text = "Orientation"; 
    panel2.preferredSize.width = 112; 
    panel2.orientation = "row"; 
    panel2.alignChildren = ["left","top"]; 
    panel2.spacing = 10; 
    panel2.margins = 10; 

// DIALOG
// ======
var divider1 = dialog.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

// GROUP3
// ======
var group3 = dialog.add("group", undefined, {name: "group3"}); 
    group3.preferredSize.width = 230; 
    group3.orientation = "row"; 
    group3.alignChildren = ["right","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var button1 = group3.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "OK"; 
    button1.preferredSize.width = 75; 

var button2 = group3.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Cancel"; 
    button2.preferredSize.width = 75; 




    var portrait = File ("C:/scripts/icon/portrait.png")
    var portr = panel2.add('iconbutton',[10, 10, 40, 40], portrait,{style: "toolbutton"});
    portr.selection = false;
    var landscape = File ("C:/scripts/icon/landscape.png")
    var lands = panel2.add('iconbutton',[10, 10, 40, 40], landscape,{style: "toolbutton",toggle: true});
    lands.selection = false;

getNewSize();
dropdown1.onChange = function () {
  getNewSize();
};

button1.onClick = function () {
  var idx = idoc.artboards.getActiveArtboardIndex();
  getArtboardSize(idx);
  resizeArtboard();
  dialog.close();
};

dialog.show();
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
function getArtboardSize(index){
  var abBounds = idoc.artboards[index].artboardRect;
  var ableft = abBounds[0];
  var abtop = abBounds[1];
  var abwidth = abBounds[2] - ableft;
  var abheight = abtop - abBounds[3];
  var orient = "portrait"
  if (abwidth > abheight) {
    orient = "landscape"
  } else {
    orient = "portrait"
  }
  // alert (orient);
}
function resizeArtboard() {
  
  // alert(checkbox1.value)
  if (checkbox1.value == true) {
    for (i = 0; i < idoc.artboards.length; i++) {
      var abBounds = idoc.artboards[i].artboardRect;
      var ableft = abBounds[0];
      var abtop = abBounds[1];
      var abwidth = abBounds[2] - ableft;
      var abheight = abtop - abBounds[3];

      var abctrx = abwidth / 2 + ableft;
      var abctry = abtop - abheight / 2;

      var ableft = abctrx - newwidth / 2;
      var abtop = abctry + newheight / 2;
      var abright = abctrx + newwidth / 2;
      var abbottom = abctry - newheight / 2;
      idoc.artboards[i].artboardRect = [ableft, abtop, abright, abbottom];
    }
  } else {
    var idx = idoc.artboards.getActiveArtboardIndex();
    var abBounds = idoc.artboards[idx].artboardRect;
    var ableft = abBounds[0];
    var abtop = abBounds[1];
    var abwidth = abBounds[2] - ableft;
    var abheight = abtop - abBounds[3];

    var abctrx = abwidth / 2 + ableft;
    var abctry = abtop - abheight / 2;

    var ableft = abctrx - newwidth / 2;
    var abtop = abctry + newheight / 2;
    var abright = abctrx + newwidth / 2;
    var abbottom = abctry - newheight / 2;
    idoc.artboards[idx].artboardRect = [ableft, abtop, abright, abbottom];
  }
}

// readJsonFile(File("C:/scripts/paper.json"))
// alert(data)
// function readJsonFile(jsonFile) {
//     jsonFile.open("r");
//     var json = jsonFile.read();
//     jsonFile.close();
//     data = JSON.parse(json);
//     for (var i in data) {
//        $.writeln(i + data[i])

//     }
// }
