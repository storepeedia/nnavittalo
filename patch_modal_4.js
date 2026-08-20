const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I'll make successContainer replace the entire .modal-body.
// Right now .modal-body has no ID. Let's add an ID to .modal-body.
html = html.replace('<div class="modal-body">', '<div class="modal-body" id="modalBodyMain">');

// Now in confirmBooking(), hide modalBodyMain and show successContainer.
html = html.replace(
    "// --- NEW LOGIC START ---",
    "// --- NEW LOGIC START ---\ndocument.getElementById('modalBodyMain').style.display = 'none';"
);
// In resetModalState():
html = html.replace(
    "document.getElementById('successContainer').style.display = 'none';",
    "document.getElementById('successContainer').style.display = 'none';\ndocument.getElementById('modalBodyMain').style.display = 'grid';"
);

// We should also remove the old tripDetailsContainer display block/none from success flow if it's there
html = html.replace("document.getElementById('tripDetailsContainer').style.display = 'flex';", "");
html = html.replace("document.getElementById('tripDetailsContainer').style.display = 'none';", "");

fs.writeFileSync('index.html', html, 'utf8');
