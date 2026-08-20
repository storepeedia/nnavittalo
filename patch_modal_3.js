const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The success container should probably also take over the sidebar, replacing bookingFormContainer.
// Wait, currently successContainer takes over the WHOLE modal because previously it was:
// resetModalState(): document.getElementById('successContainer').style.display = 'none'; document.getElementById('tripDetailsContainer').style.display = 'flex'; hideBookingForm();
// confirmBooking(): ... document.getElementById('bookingFormContainer').style.display = 'none'; document.getElementById('successContainer').style.display = 'block';

// If successContainer is outside modal-sidebar, let's see where it is exactly.
// It is after <!-- end modal-sidebar -->.
// Let's move it into the modal-sidebar.

const successRegex = /<!-- SUCCESS SCREEN -->[\s\S]*?<!-- END SUCCESS SCREEN -->/;
const match = html.match(successRegex);
const successContent = match ? match[0] : '';
if (match) {
    html = html.replace(successRegex, '');
}

const sidebarEndRegex2 = /<\/div> <!-- end modal-sidebar -->/;
html = html.replace(sidebarEndRegex2, `  ${successContent}\n\n</div> <!-- end modal-sidebar -->`);

// Now modify confirmBooking success flow
html = html.replace(
    "document.getElementById('bookingFormContainer').style.display = 'none';",
    "document.getElementById('bookingFormContainer').style.display = 'none';\n    document.getElementById('modalMainContent').style.display = 'none';"
);

// We want the success screen to take over the WHOLE modal?
// The easiest way is to let successContainer replace both modal-main and modal-sidebar, but since we put it in modal-sidebar...
// Let's keep it in modal-sidebar, but make the success container take full width.
// Actually, earlier behavior: tripDetailsContainer (which wrapped both main and sidebar) was hidden, and successContainer was shown.
// Let's revert successContainer back to outside modal-body, and change logic.
