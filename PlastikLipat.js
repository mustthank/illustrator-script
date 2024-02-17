#target illustrator

// Copyright joojaa 2016
// License: Buy somebody you do not know 
// a beer or other similar culturally 
// appropriate refreshment.

(function(){
var win = new Window('dialog','ukuran plastik (mm)');
var lebarPlastik = txtgroup(win, 'lebar plastik ', '',);
var lebarJadi = txtgroup(win,    'lebar jadi    ', '');
var tinggiPlastik = txtgroup(win,   'tinggi plastik', '');
lebarPlastik.active=true;
var grp = win.add('group');
var ok = grp.add('button {text: "OK"}');
grp.add('button {text: "Cancel"}');

var doDraw = function(){
    draw();
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
function convert_units(n) {
  var temp = n*2.8346456692;
  return temp
}

function draw(){
  newCMYKColor = new CMYKColor();
newCMYKColor.black = 0;
newCMYKColor.cyan = 0;
newCMYKColor.magenta = 0;
newCMYKColor.yellow = 0;
  var idoc = app.activeDocument;  
var sel = idoc.selection[0];
var artLayer = idoc.layers[0];
app.defaultStroked = true;
app.defaultFilled = true;
var l = convert_units (lebarPlastik.text);
var b = convert_units(lebarJadi.text); 
var t = convert_units(tinggiPlastik.text);
var lipat = (l-b)/2;
newGroup = app.activeDocument.groupItems.add(); 
var rect = artLayer.pathItems.rectangle( 30, 30 , b, t );
rect.filled=true;
rect.fillColor = newCMYKColor;
rect.stroked=true;
rect.strokeDashes=[0,0];
var rect1 = artLayer.pathItems.rectangle(30,30,lipat,t);
rect1.filled=false;
rect1.stroked=true;
rect1.strokeDashes = [4,4];
var rect2 = rect1.duplicate(); 
rect2.left=rect1.left+(b-rect2.width);
rect.moveToBeginning(newGroup);
rect1.moveToBeginning(newGroup);
rect2.moveToBeginning(newGroup);
}

})();