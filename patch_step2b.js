const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also need to ensure that the layout of `.modal-sidebar` on mobile has consistent width.
// Currently `.modal-sidebar{padding:16px}`.
// Also in `@media(max-width:640px)`, `.modal-body{grid-template-columns:1fr}`.
// The issue is likely that `.booking-panel` is a direct child of `.modal-sidebar` but `.modal-main` has `border-right: none` and `padding: 16px`.
// I'll make sure it looks identical.
// Actually, I think adding `box-sizing: border-box; width: 100%;` to `.booking-panel` might have fixed it.

fs.writeFileSync('index.html', html, 'utf8');
