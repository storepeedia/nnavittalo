const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Just some quick checks to make sure we didn't break html tags
if (!html.includes('<div class="modal-body" id="modalBodyMain">')) {
  console.log("Error: modal-body missing ID");
}
if (!html.includes('<div class="modal-main" id="modalMainContent">')) {
  console.log("Error: modal-main missing ID");
}
if (!html.includes('id="successContainer"')) {
  console.log("Error: successContainer missing");
}
console.log("Done checking.");
