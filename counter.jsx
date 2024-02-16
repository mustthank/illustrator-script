if (app.documents.length > 0) {
    var doc = activeDocument;
    var selectedItems = parseInt(doc.selection.length, 10) || 0;
    alert(selectedItems + " items")
} else { // No active document
    alert("Please open a document to continue.")
}