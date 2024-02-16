
var idoc = app.activeDocument;
var idx = idoc.artboards.getActiveArtboardIndex();
  var abBounds = idoc.artboards[idx].artboardRect;
  var ableft = abBounds[0];
  var abtop = abBounds[1];
  var abwidth = abBounds[2] - ableft;
  var abheight = abtop - abBounds[3];
  var orient = "portrait"
  if (abwidth>abheight) {
    orient = "landscape"
  } else{
    orient = "portrait"
  }
alert(orient);