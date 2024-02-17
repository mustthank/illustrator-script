// Copyright joojaa 2016
// License: Buy somebody you do not know 
// a beer or other similar culturally 
// appropriate refreshment.

(function(){
var win = new Window('dialog','Bagi Tabung');
var lingkaranTabung = txtgroup(win, 'Lingkaran Tabung', '');
var jumlahgambar = txtgroup(win,    'Jumlah Gambar   ', '');
lingkaranTabung.active=true;
 (win.dimsPnl = win.add('panel', undefined, 'Orientation:')).helpTip = "Transform orientation"; 
    win.dimsPnl.orientation='row';
    (win.dimsPnl.selectV = win.dimsPnl.add('radiobutton', [0,15,80,35], 'Verical' )).helpTip = "Bagi ke kanan"; 
    (win.dimsPnl.selectH = win.dimsPnl.add('radiobutton', [0,15,80,35], 'Horizontal' )).helpTip = "TBagi ke atas";
    win.dimsPnl.selectH.value = true;
    win.dimsPnl.selectV.value = false;
var grp1 = win.add('group');
var lbl = grp1.add("statictext",undefined,'Designed by MASRUR AFANDY');
var grp = win.add('group');
var ok = grp.add('button {text: "OK"}');
grp.add('button {text: "Cancel"}');

var doDraw = function(){
    if (win.dimsPnl.selectH.value == true) {
        draw();
    } else if (win.dimsPnl.selectV.value == true) {
        drawV();
    }
    else{

    }
    win.close(0);
    }
ok.onClick = doDraw;

win.show();

function txtgroup(win, name ,txt) {
    var grp = win.add('group');
    grp.add('statictext {text: "'+name+': "}');
    var item = grp.add('edittext {characters: 12, active: true}');
    item.text = txt;
    return item;
}
function convert_units(n, to) {
   var temp = n*2.8346456692;
  return temp
}


//      left   = bounds[0],
//      top    = bounds[1],
//      right  = bounds[2],
//      bottom = bounds[3],
//
//      width  = right - left,
//      height = top - bottom,





//function convert_units(n, to) {
//  var unitConversions = {
//    'pt': 1.0000000000,
//    'p': 12.0000000000,
//    'mm': 2.8346456692,
//    'in': 72.00000000,
//    'ag': 5.1428571428,
//    'cm': 28.3464566929,
//    'c': 12.7878751998,
//    'tr': 3.0112500000
//  }
//  var obj = fix_measurement(n);
//  var temp = (obj.amount * unitConversions[obj.unit]) / unitConversions[to];
//  return temp
//}
//function fix_measurement(n) {
//  n = n.replace(/ /g, ' '); // Delete all spaces
//  n = n.replace(/^([pc])/, '0$1'); // Change p3 to 0p3
//  // Infixed 'p' and 'c' to decimal suffixes: 3p6 > 3.5 p
//  n = n.replace(/(\d+)([pc])([.\d]+)$/, function() {
//    return Number(arguments[1]) + Number(arguments[3] / 12) + arguments[2]
//  });
//  // Split on unit
//  var temp = n.split(/(ag|cm|mm|c|pt|p|in)$/);
//  return {
//    amount: Number(temp[0]),
//    unit: temp.length === 1 ? doc_units() : temp[1]
//  };
//}
function drawV()
{
    var idoc = app.activeDocument;  
    var sel = idoc.selection[0];
    var selVB = sel.visibleBounds;  
    var selVw = selVB[2]-selVB[0];  
    var w = convert_units(lingkaranTabung.text, 'pt');
    var h = sel.height; 
    var b = jumlahgambar.text;
    var jumlah = jumlahgambar.text;
    var m = w/b;
    var artLayer = idoc.layers[0];
    var rect = artLayer.pathItems.rectangle( sel.top, sel.left , selVw, w );
    rect.filled = false;
    rect.stroked = false;
    var cent = sel.left + (sel.width*0.5);
    var le = sel.top+100;
    var lef = sel.top-10;
    var le1 = sel.top-w+10;
    var lef1 =sel.top-w-100;
    newCMYKColor = new CMYKColor();
    newCMYKColor.cyan = 0;
    newCMYKColor.magenta = 0;
    newCMYKColor.yellow = 0;
    newCMYKColor.black = 55;
    newCompoundPath = idoc.activeLayer.compoundPathItems.add();
    // Create the path items
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath( Array( Array(cent, le), Array(cent, lef) ) );
    newPath.filled=false;
    newPath.stroked = true;
    newPath.strokeWidth=0.7;
    newPath.strokeColor=newCMYKColor;
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath(Array(Array(cent,le1),Array(cent,lef1)));
    newGroup = app.activeDocument.groupItems.add();
    for(var i = 1; i < jumlah; i++) { 
        var dup = sel.duplicate();
        dup.top = dup.top-m*i;
        dup.moveToBeginning(newGroup);
        sel.moveToBeginning(newGroup);
        dup.selected=false;
        sel.selected=false;  
    }; 
        var grVB = newGroup.visibleBounds;  
        var grVw = grVB[2]-grVB[0];  
        var grVh = grVB[1]-grVB[3]; 
    var jr = (w-grVh) *0.5;
    newGroup.top=sel.top-jr;
    rect.moveToBeginning(newGroup);
    newCompoundPath.moveToBeginning(newGroup);
}
function draw()
{
	var idoc = app.activeDocument;  
    var sel = idoc.selection[0];
                    var selVB = sel.visibleBounds;  
                    var selVw = selVB[2]-selVB[0];  
                    var selVh = selVB[1]-selVB[3];  
    var w = convert_units(lingkaranTabung.text, 'pt');
    var h = sel.height; 
    var b = jumlahgambar.text;
    var jumlah = jumlahgambar.text;
    var m = w/b;
    var artLayer = idoc.layers[0];
    var rect = artLayer.pathItems.rectangle( sel.top, sel.left , w, selVh );
    rect.filled = false;
    rect.stroked = false;
    var cent = sel.top - (sel.height/2);
    var le = sel.left-100;
    var lef = sel.left+10;
    var cent1 = sel.top - (sel.height/2)+0.35;
    var le1 = sel.left+w-10;
    var lef1 =sel.left+w+100;
    newCMYKColor = new CMYKColor();
    newCMYKColor.cyan = 0;
    newCMYKColor.magenta = 0;
    newCMYKColor.yellow = 0;
    newCMYKColor.black = 55;
    newCompoundPath = idoc.activeLayer.compoundPathItems.add();
    // Create the path items
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath( Array( Array(le, cent), Array(lef, cent) ) );
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath( Array( Array(sel.left+3, cent), Array(sel.left-3, cent) ) );
    newPath.left = newPath.left + m;
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath( Array( Array(sel.left, cent-8.5), Array(sel.left, cent+8.5) ) );
    newPath.left = newPath.left + m;
    newPath.filled=false;
    newPath.stroked = true;
    newPath.strokeWidth=0.7;
    newPath.strokeColor=newCMYKColor;
    newPath = newCompoundPath.pathItems.add();
    newPath.setEntirePath(Array(Array(le1,cent),Array(lef1,cent)));
    newGroup = app.activeDocument.groupItems.add();
    for(var i = 1; i < jumlah; i++) { 
        var dup = sel.duplicate();
    	dup.left = dup.left-m*i;
    	dup.moveToBeginning(newGroup);
    	sel.moveToBeginning(newGroup);
        dup.selected=false;
        sel.selected=false;  
    }; 
                    var grVB = newGroup.visibleBounds;  
                    var grVw = grVB[2]-grVB[0];  
                    var grVh = grVB[1]-grVB[3]; 
    var jr = (w - grVw)*0.5;
    newGroup.left=sel.left+jr;
    rect.moveToBeginning(newGroup);
    newCompoundPath.moveToBeginning(newGroup);
}

})();