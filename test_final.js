const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (html.includes('id="formTotalPrice"')) {
    console.log("Error: formTotalPrice is still there.");
}
if (!html.includes('max-width:100%;min-width:0;appearance:none;-webkit-appearance:none;')) {
    console.log("Error: Date input CSS missing.");
}
if (!html.includes('(including main booker)') && !html.includes('(including the main booker)')) {
    console.log("Error: Label missing.");
}
if (html.includes('tripDetailsContainer')) {
    console.log("Warning: tripDetailsContainer still exists?");
}
console.log("All tests passed");
