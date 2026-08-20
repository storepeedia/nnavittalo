const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// To fix the date input overflow on iOS Safari, we should explicitly set max-width and min-width.
// Sometimes `input[type="date"]` needs `appearance: none; -webkit-appearance: none;` to respect width limits.
// Or just adding `max-width: 100%` and `width: 100%`.

html = html.replace(
    /\.form-input\{/g,
    '.form-input{max-width:100%;min-width:0;appearance:none;-webkit-appearance:none;'
);

// We should also remove the inline styling of `bookDob` if there is any, there is none: `<input class="form-input" type="date" id="bookDob" required />`

fs.writeFileSync('index.html', html, 'utf8');
