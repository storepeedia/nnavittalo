const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The script previously added `padding: 20px;` inline to bookingFormContainer.
// It also has a border, etc.? No, it doesn't have a border. Let's make it look just like booking-panel.
html = html.replace(
    '<div id="bookingFormContainer" style="display:none; padding: 20px;">',
    '<div id="bookingFormContainer" class="booking-panel" style="display:none;">'
);

// We need to remove the inline 'padding: 20px;' from successContainer if it's placed inside modal-sidebar,
// wait, successContainer is outside modal-sidebar. Let's check where successContainer is.
// I'll leave successContainer where it is for now, it's outside.

fs.writeFileSync('index.html', html, 'utf8');
