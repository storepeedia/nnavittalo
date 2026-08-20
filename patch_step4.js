const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I want to remove these two lines:
// <div class="booking-label">Total Amount to Pay</div>
// <div id="formTotalPrice" class="booking-price" style="margin-bottom:15px;"></div>
html = html.replace('<div class="booking-label">Total Amount to Pay</div>', '');
html = html.replace('<div id="formTotalPrice" class="booking-price" style="margin-bottom:15px;"></div>', '');

// Also remove `const display2 = document.getElementById('formTotalPrice'); if(display2) display2.innerHTML = priceText;`
html = html.replace(/const display2 = document\.getElementById\('formTotalPrice'\);\n\s*if\(display2\) display2\.innerHTML = priceText;/g, '');

fs.writeFileSync('index.html', html, 'utf8');
