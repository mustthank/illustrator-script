/*
  Date: July, 2020
  Author: Katja Bjerrum, email: katja@productivista.com , www.productivista.com
  ============================================================================
  NOTICE:
  This script is provided "as is" without warranty of any kind.
  Free to use, not for sale.
  ============================================================================
  Released under the MIT license.
  http://opensource.org/licenses/mit-license.php
  ============================================================================
  
*/

//@target illustrator
var doc = app.activeDocument;
var myLayer = doc.activeLayer;
app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
var swGrps = doc.swatchGroups;
var mainSwGr = doc.swatchGroups[0];
var sel = doc.selection;

var actionSet = 'CreateSwatchGroup';
var actionName = 'ColourGroup';
var actionPath = Folder.myDocuments + '/Adobe Scripts/';

if (!Folder(actionPath).exists) Folder(actionPath).create();
//app.doScript("Colorgroup", "ToSwatchScript");//Action, that creates swatch group

var actionDoc =
  [ '/version 3',
    '/name [' + actionSet.length  + ' ' + ascii2Hex(actionSet) + ']',
   ' /isOpen 1',
   ' /actionCount 1',
   ' /action-1 {',
   '/name [' + actionName.length + ' ' + ascii2Hex(actionName) + ']',
   '   /keyIndex 0',
   '   /colorIndex 0',
   '   /isOpen 1',
   '   /eventCount 1',
   '   /event-1 {',
   '     /useRulersIn1stQuadrant 0',
   '     /internalName (ai_plugin_swatches)',
   '     /localizedName [ 8',
   '       5377617463686573',
   '     ]',
   '     /isOpen 0',
   '     /isOn 1',
   '     /hasDialog 1',
   '     /showDialog 1',
   '     /parameterCount 1',
   '     /parameter-1 {',
   '       /key 1835363957',
   '       /showInPalette 4294967295',
   '       /type (enumerated)',
   '       /name [ 15',
   '         4e657720436f6c6f722047726f7570',
   '       ]',
   '      /value 17',
   '     }',
   '   }',
    '}'].join('');

    createAction(actionDoc, actionName, actionPath);

    app.redraw();
       app.doScript ( actionName, actionSet);
       app.redraw();
    
    
       app.unloadAction(actionSet, '');


var convMM = 2.8346456692; // initialization of the variable to convert points to mm

var colorgroup = doc.swatchGroups[doc.swatchGroups.length - 1];//Choose the last swatch group
var stY = - 500;//
var stX = 20;
var recW = 25;
var recH = 25;

var offX = recW / 5;
var offY = recH / 4;
var textoffY = recH / 4;
var rows = 4;
var cols = 4;

var black = new GrayColor();
black.gray = 80;
var white = new GrayColor()	;
white.gray = 0;
var noStroke = doc.swatches[0].color;

if (swGrps.length <=1){
	alert ("Please create swatch group from your selection");
}
else if (sel <= 0){
	//docRef.placedItems[0].selected == false;
	alert ("Please make a selection");
	delSwatchGr(colorgroup);//delete swatch group
}
else{
	swatchGroupList(colorgroup, stY, stX);//create corlor list
	delSwatchGr(colorgroup);//delete swatch group
	
}


//Function, that creates color list
function swatchGroupList(swatchGroup, stY, stX) {

	// Groups everything in the list
	var MainGroup = myLayer.groupItems.add();
	MainGroup.name = "Colors";
	MainGroup.moveToBeginning(myLayer);

	
	//Name of the color list
	nameText = myLayer.textFrames.add();
	nameText.contents = swatchGroup.name;//the name of the swatch group
	nameText.position = [stX, stY + recH];

	var nameStyle = nameText.textRange.characterAttributes;
	nameStyle.size = 12;//size in punkt
	//nameStyle.textFont = textFonts.getByName("Avenir-Book");//the font
	nameStyle.capitalization = FontCapsOption.ALLCAPS;//ALL CAPITALS
	
	var swatches = swatchGroup.getAllSwatches();
	var SwatchArray = [];
        
        for (i = 0; i < swatches.length; i++) {
        
            var mySwatch = swatches[i];
            
            var SubGroup = createSwatchGroup(mySwatch, textoffY);
            //alert(SubGroup.name);
            SwatchArray.push(SubGroup);
                
        }
    
    nameText.moveToEnd(MainGroup);
    var myGroup = SwatchArray;
	var maxW = maxWidth(myGroup);


    

	for (var j = 0; j < myGroup.length; j++) {
        var mySubGroup = myGroup[j];
        mySubGroup.moveToBeginning(MainGroup);      
    }

    for (var i = 0; i < MainGroup.groupItems.length; i++) {
        var mySubGroup = MainGroup.groupItems[i];
    
        if (MainGroup.groupItems.length > 7) {
            rows = 7;
            var c = i%rows;
	        var r = Math.floor(i/rows);
            mySubGroup.position = [stX + r * (maxW + 10), stY - c * (recH + offY)];
        }
        else {
            rows = 7;
            var c = i % rows;
            var r = Math.floor(i / rows);
            mySubGroup.position = [stX, stY - c * (recH + offY)];
        } 
    }  
	// textSwatch.moveToBeginning(SubGroup);
	// path_ref.moveToBeginning(SubGroup);
	// SubGroup.position = [stX + c * 140, stY - r * (path_ref.height + offY)];
    SubGroup.moveToBeginning(MainGroup);
    
}   

function lightColor(c){
	if(c.typename)
	{
	   switch(c.typename)
	   {
		   	case "CMYKColor":
			return (c.black>=10 || c.cyan>10 || c.magenta>10 || c.yellow > 10) ? true : false;
		   	case "RGBColor":
			return (c.red<230  || c.green<230 || c.blue<230) ? true : false;
		   	case "GrayColor":
		   	return c.gray >= 10 ? true : false;
		   	case "SpotColor":
		   	return lightColor(c.spot.color);
   
		   	//return false;
	   }
   }
   }

function fitItem(item, itemW, itemH, diff) {
    var oldWidth = item.width
    var oldHeight = item.height
  
    if (item.width > item.height) {
      // landscape, scale height using ratio from width
      item.width = itemW - diff.deltaX
      var ratioW = item.width / oldWidth
      item.height = oldHeight * ratioW
    } else {
      // portrait, scale width using ratio from height
      item.height = itemH - diff.deltaY
      var ratioH = item.height / oldHeight
      item.width = oldWidth * ratioH
    }
  
  }

  function itemBoundsDiff(item) {
    var itemVB = item.visibleBounds
  
    var itemVW = itemVB[2] - itemVB[0] // right - left
    var itemVH = itemVB[1] - itemVB[3] // top - bottom
  
    var itemGB = item.geometricBounds
  
    var itemGW = itemGB[2] - itemGB[0] // right - left
    var itemGH = itemGB[1] - itemGB[3] // top - bottom
  
    var deltaX = itemVW - itemGW
    var deltaY = itemVH - itemGH
  
    var diff = { deltaX: deltaX, deltaY: deltaY }
  
    return diff
  }
  
  function delSwatchGr(swGr){
    
        var swGrSws = swGr.getAllSwatches();
        for (var j = 0; j < swGrSws.length; j++){
            var sw = swGrSws[j];
            sw.color = new CMYKColor();
            
        }
        swGr.remove();
           
}


//Function finds the max group width
function maxWidth(myGroup) {

    var maxFound = 0;

    for (var j = 0; j < myGroup.length; j++) {

        var GrWidth = myGroup[j].width;

        //var Widthmax = GrWidth.width;
        maxFound = Math.max(maxFound, GrWidth);

    }
    return maxFound;
}

function createSwatchGroup(sw, myOffset) {
    //Is "MyForm" path exists?
    try{
		var path_ref_ori = app.activeDocument.pathItems.getByName("MyForm" || "myform" || "MYFORM");
    }
    catch(e)
    {
        var path_ref_ori = false;
	}
		
    if (path_ref_ori) {
		myPath = path_ref_ori.duplicate();
		var boundsDiff = itemBoundsDiff(myPath);
		fitItem(myPath, recW, recH, boundsDiff);
		myPath.name = "NewForm";
        myPath.position = [0, 0];
            
    }
    else {
        var myPath = createMyPath()
	
    
       }
        myPath.fillColor = sw.color;
        myPath.stroked = true;
        myPath.strokeWidth = 0.3;
        myPath.strokeColor = lightColor(myPath.fillColor)? noStroke : black;
    
    var textSwatch = myLayer.textFrames.add(); //swatch text
    textSwatch.contents = sw.name;

    textSwatch.position = [myPath.width + 1.3 * convMM, -myOffset];
    var textSwStyle = textSwatch.textRange.characterAttributes;
    textSwStyle.size = 10; //size in punkt
    //textSwStyle.textFont = textFonts.getByName("MyriadPro-Semibold"); //the font

    var SubGroup = myLayer.groupItems.add(); //groups path and text 
    SubGroup.name = sw.name;
    SubGroup.position = [0, 0];

    textSwatch.moveToBeginning(SubGroup);
    myPath.moveToBeginning(SubGroup);
    
    return SubGroup;   

}


function createMyPath(){
//Is "MyForm" path exists?
    try{
        var path_ref_ori = app.activeDocument.pathItems.getByName("MyForm" || "myform" || "MYFORM");
    }
    catch(e)
    {
        var path_ref_ori = false;
    }

    if (path_ref_ori) {
        path_ref = path_ref_ori.duplicate();
        var boundsDiff = itemBoundsDiff(path_ref);
        fitItem(path_ref, recW, recH, boundsDiff);
        path_ref.name = "NewForm";
        path_ref.position = [0, 0];	
        
    }
    else {
        var path_ref = myLayer.pathItems.rectangle(0, 0, recW, recH);//swatch path item

    }
    
            
    return path_ref
};

function createAction(str, set, path) {
    var f = new File('' + path + '/' + set + '.aia');
    f.open('w');
    f.write(str);
    f.close();
    app.loadAction(f);
    f.remove();
  };
  
  function ascii2Hex(hex) {
    return hex.replace(/./g, function (a) { return a.charCodeAt(0).toString(16) });
  };
  