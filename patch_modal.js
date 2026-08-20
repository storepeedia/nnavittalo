const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove tripDetailsContainer entirely
html = html.replace('<div id="tripDetailsContainer" style="display:flex; flex-direction:row; flex-wrap:wrap; gap:30px; width:100%;">\n      <div class="modal-main">', '<div class="modal-main" id="modalMainContent">');

// We also need to fix the closing div of tripDetailsContainer
// Let's find: </div> <!-- end tripDetailsContainer (added to wrap both modal-main and modal-sidebar) -->
html = html.replace('</div> <!-- end tripDetailsContainer (added to wrap both modal-main and modal-sidebar) -->', '');

// 2. Move bookingFormContainer INSIDE modal-sidebar, replacing the booking panel, but we can just put it directly in the sidebar.
// Let's first extract the bookingFormContainer block
const bookingFormRegex = /<!-- NEW BOOKING FORM CONTAINER -->[\s\S]*?<!-- END NEW BOOKING FORM CONTAINER -->/;
const match = html.match(bookingFormRegex);
const formContent = match ? match[0] : '';

// Remove it from its current position
if (match) {
    html = html.replace(bookingFormRegex, '');
}

// Now insert it into modal-sidebar, right after the booking-panel.
// We will hide booking-panel and show bookingFormContainer when "Book Your Spot" is clicked.
// Find the end of booking-panel
const sidebarEndRegex = /<\/div>\s*<\/div>\s*<!-- end modal-sidebar -->/;
html = html.replace(sidebarEndRegex, `  </div>\n\n  ${formContent}\n\n</div> <!-- end modal-sidebar -->`);

// 3. Fix the display toggling in JavaScript
// In showBookingForm(), we want to hide the original booking-panel, and show bookingFormContainer.
// We also want to hide modalMainContent on mobile? Wait, the user chose Option A:
// "Option A. in desktop i want this box to be on side and in mobile when it is shown below the box length is smaller tot he length of other boxes with make it visually not appealing."
// For Option A (Option A: "When clicking 'Book your spot', the left side (images/description) should STAY visible on desktop, and the Booking Form should just replace the pricing panel on the right side (sidebar)")
html = html.replace(
    /document\.getElementById\('tripDetailsContainer'\)\.style\.display = 'none';/g,
    "document.getElementById('pricingPanelOriginal').style.display = 'none';"
);

html = html.replace(
    /document\.getElementById\('tripDetailsContainer'\)\.style\.display = 'flex';/g,
    "document.getElementById('pricingPanelOriginal').style.display = 'block';"
);

// We need to add ID to the original booking panel
html = html.replace(
    '<div class="booking-panel">',
    '<div class="booking-panel" id="pricingPanelOriginal">'
);

fs.writeFileSync('index.html', html, 'utf8');
