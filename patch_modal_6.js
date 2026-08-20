const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also need to verify that `closeModalAndGoHome()` still correctly closes the modal, which it does.
// resetModalState resets everything.
// The success message shouldn't hide the whole modal, only the modalBodyMain. Wait, earlier I did this:
// document.getElementById('bookingFormContainer').style.display = 'none'; document.getElementById('modalMainContent').style.display = 'none';

// Let's replace the previous logic in confirmBooking which I mistakenly did:
html = html.replace(
    "document.getElementById('bookingFormContainer').style.display = 'none';\n    document.getElementById('modalMainContent').style.display = 'none';",
    "document.getElementById('modalBodyMain').style.display = 'none';"
);

// We need to double check confirmBooking body.
