const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also need to update confirmBooking to actually hide modalBodyMain
html = html.replace(
    "document.getElementById('successContainer').style.display = 'block';",
    "document.getElementById('modalBodyMain').style.display = 'none';\n        document.getElementById('successContainer').style.display = 'block';"
);

fs.writeFileSync('index.html', html, 'utf8');
