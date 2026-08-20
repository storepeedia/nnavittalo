const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The user states: "in mobile when it is shown below the box length is smaller tot he length of other boxes with make it visually not appealing."
// In `.modal-main{padding:16px}`, the content spans to edge - 16px.
// But `.modal-sidebar{padding:16px}` wraps `.booking-panel` which has its own `padding:20px`,
// causing the visual block of `.booking-panel` to be smaller in width (36px total from edge instead of 16px).
// By changing `.modal-sidebar{padding:16px}` to `.modal-sidebar{padding:16px; padding-top: 0;}`
// and potentially removing lateral padding for modal-sidebar on mobile altogether?
// Wait, if we remove padding from modal-sidebar, the `.booking-panel` spans wider.
// Let's change `.modal-sidebar{padding:16px}` to `.modal-sidebar{padding:0 16px 16px 16px}`
// so the width aligns with main text?
// No, the `.booking-panel` is a card (with a white background, border, shadow) inside `.modal-sidebar`.
// If we want `.booking-panel` to align with the text, maybe it's fine.
// BUT the user says "the box length is smaller...". They probably want `.booking-panel` to take up the full width, exactly matching `.modal-gallery` image width.
// `.modal-main` has padding 16px. So the image inside it is at 16px from the edge.
// If `.modal-sidebar` has 16px padding, the `.booking-panel` will start at 16px from edge, MATCHING the image width.
// So why does it look smaller?
// Ah! In my previous patch for `bookingFormContainer`, I added `padding: 20px;` inline, and then I replaced it with `<div id="bookingFormContainer" class="booking-panel" style="display:none;">`.
// But WAIT, `IMG_2670.png` shows the problem!
// Looking at the screenshot, the booking form's white container itself is fine, but the inputs inside it... Wait, no.
// Let's re-read the screenshot.
// The screenshot `IMG_2670.png` shows the booking form container. The white box has a light-blue border.
// And inside it, there is another "TOTAL AMOUNT TO PAY" box which is also white with a light-blue border.
// Oh! My previous script added `.booking-panel` class to `bookingFormContainer` but LEFT the internal `.booking-panel` div!
// Let's fix that.

html = html.replace(
    /<div class="booking-panel" style="margin-top: 20px;">/g,
    '<div style="margin-top: 20px;">'
);

// To fix mobile width visually: The `.modal-sidebar` could have `padding: 16px;` on mobile, but since `.modal-main` also has `padding: 16px`, they should technically match in width.
// But maybe `.booking-panel` needs to be `width: 100%; box-sizing: border-box;`.
html = html.replace(
    /\.booking-panel\{/g,
    '.booking-panel{box-sizing:border-box;'
);

fs.writeFileSync('index.html', html, 'utf8');
