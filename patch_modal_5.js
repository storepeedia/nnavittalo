const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also need to verify that `hideBookingForm()` correctly restores the pricing panel
html = html.replace(
    /function hideBookingForm\(\) \{\n    document.getElementById\('bookingFormContainer'\).style.display = 'none';\n    document.getElementById\('pricingPanelOriginal'\).style.display = 'block';/,
    "function hideBookingForm() {\n    document.getElementById('bookingFormContainer').style.display = 'none';\n    document.getElementById('pricingPanelOriginal').style.display = 'block';"
);
// It looks like hideBookingForm() is:
/*
function hideBookingForm() {
    document.getElementById('bookingFormContainer').style.display = 'none';
    document.getElementById('pricingPanelOriginal').style.display = 'block';
    // const sbar = document.querySelector('.modal-sidebar');
    // if(sbar) sbar.style.display = 'block';
}
*/

// Let's replace the commented out code
html = html.replace(/\/\/ const sbar = document\.querySelector\('\.modal-sidebar'\);\n\s*\/\/ if\(sbar\) sbar\.style\.display = '(none|block)';/g, "");

fs.writeFileSync('index.html', html, 'utf8');
