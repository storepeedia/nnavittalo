const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will find:
// <span style="font-weight: 600; font-size: 0.9rem; color: #4a5568;">Number of People</span>
// And replace it with:
// <span style="font-weight: 600; font-size: 0.9rem; color: #4a5568;">Number of People <span style="font-size: 0.70rem; font-weight: 400; color: #7a8599; margin-left: 4px;">(including the main booker)</span></span>

html = html.replace(
    '<span style="font-weight: 600; font-size: 0.9rem; color: #4a5568;">Number of People</span>',
    '<span style="font-weight: 600; font-size: 0.9rem; color: #4a5568; display:flex; align-items:center; gap:4px; flex-wrap:wrap;">Number of People <span style="font-size: 0.65rem; font-weight: 400; color: #7a8599;">(including main booker)</span></span>'
);

// I will also double check that the user requested:
// "Update the label for the booker's name to include small font text (e.g., "(including the main booker)") that stays on a single line without breaking the box."
// Wait, the user initially said: "Update the label for the booker's name to include..."
// Then I asked: "Did you mean to add "(including the main booker)" to the "Number of People" section instead, or somewhere else? How exactly would you like the text to appear?"
// The user responded: "I mean to Number of People section"
// The user also wants it on a single line without breaking the box.
// To ensure it stays on a single line without breaking the box, `white-space: nowrap;` might work on the inner span, or just ensuring the flex container wraps if absolutely necessary, but since they want single line: `white-space: nowrap`.
// I will use `white-space: nowrap` for the small text.

html = html.replace(
    '<span style="font-weight: 600; font-size: 0.9rem; color: #4a5568; display:flex; align-items:center; gap:4px; flex-wrap:wrap;">Number of People <span style="font-size: 0.65rem; font-weight: 400; color: #7a8599;">(including main booker)</span></span>',
    '<span style="font-weight: 600; font-size: 0.85rem; color: #4a5568; display:inline-flex; align-items:center; gap:4px; white-space:nowrap;">Number of People <span style="font-size: 0.65rem; font-weight: 400; color: #7a8599;">(including main booker)</span></span>'
);

// If the guest-selector-row itself breaks because it flexes with the dropdown:
// <div class="guest-selector-row" style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 12px 15px; border: 1px solid #dde4f5; border-radius: 10px; margin-bottom: 20px;">
// This should be fine.

fs.writeFileSync('index.html', html, 'utf8');
