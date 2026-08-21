const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<div id="bookingFormContainer" class="booking-panel" style="display:none;">/, `<div id="bookingFormContainer" class="booking-panel" style="display:none; border-top: none; border-top-left-radius: 0; border-top-right-radius: 0; padding-top: 10px;">`);

fs.writeFileSync('index.html', html);
