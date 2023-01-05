
var BT = new BridgeTalk();
var specifier = "illustrator";
if (!BridgeTalk.isRunning(specifier)) {
    BridgeTalk.launch(specifier);
}
var scriptFile = File("C:/scripts/progBar.txt")
scriptFile.open("r");
scriptCode = scriptFile.read();
scriptFile.close();
BT.target = specifier;
BT.body = scriptCode;
BT.send();
var fileRef = new File("~/Desktop/FiletoSplit.tif");
app.open(fileRef);

rastersparasi()
var doc = app.documents.getByName("FiletoSplit.tif");
function rastersparasi() {
    var jpegoptions = new JPEGSaveOptions()
    jpegoptions.quality = 1;
    var docRef = activeDocument
    var myLocation = "~/Desktop"
    docRef.changeMode(ChangeMode.CMYK);
    var myChannel = docRef.activeChannels
    
    try {
        var savedState = docRef.activeHistoryState;
        var nameChannel = ["cyan", "magenta", "yellow", "black"]
        var myAngle = ["108", "162", "90", "45"]
        var usedChannel = [1, 1, 1, 1]
        for (var i = 0, len = myChannel.length; i < len; i++) {
            if (usedChannel[i]) {
                 docRef.activeChannels = [myChannel[i]]
                var bitSaveOptions = new BitmapConversionOptions();
                bitSaveOptions.method = BitmapConversionType.HALFTONESCREEN;
                bitSaveOptions.angle = myAngle[i];
                bitSaveOptions.frequency = frequencyHalft;
                bitSaveOptions.resolution = 300;
                switch (shapeHalft) {
                    case "Round":
                        bitSaveOptions.shape = BitmapHalfToneType.ROUND;
                        break;
                    case "Diamond":
                        bitSaveOptions.shape = BitmapHalfToneType.DIAMOND;
                        break;
                    case "Elips":
                        bitSaveOptions.shape = BitmapHalfToneType.ELIPS;
                        break;
                    case "Line":
                        bitSaveOptions.shape = BitmapHalfToneType.LINE;
                        break;
                    case "Square":
                        bitSaveOptions.shape = BitmapHalfToneType.SQUARE;
                        break;
                    case "Cross":
                        bitSaveOptions.shape = BitmapHalfToneType.CROSS;
                        break;

                    default:
                        break;
                }
                // bitSaveOptions.shape = BitmapHalfToneType.ROUND;
                docRef.changeMode(ChangeMode.BITMAP, bitSaveOptions)
                docRef.saveAs(new File(myLocation + "/" + nameChannel[i] + frequencyHalft + ".psd"), undefined, true);
                docRef.activeHistoryState = savedState
            }
        };

        // dialog.close();
    } catch (err) {
        alert(err)
    }

}
doc.close(SaveOptions.DONOTSAVECHANGES);