const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `                    <div><span class="text-gray-500 text-sm">DOB:</span><br/><strong>\${b.dob || "N/A"}</strong></div>
                    <div><span class="text-gray-500 text-sm">Package:</span><br/><strong>\${b.event_name}</strong></div>
                    <div><span class="text-gray-500 text-sm">Total PLN:</span><br/><strong>\${b.total_price_pln || "N/A"}</strong></div>`;

const replaceHtml = `                    <div><span class="text-gray-500 text-sm">DOB:</span><br/><strong>\${b.dob || "N/A"}</strong></div>
                    <div><span class="text-gray-500 text-sm">Package:</span><br/><strong>\${b.event_name}</strong></div>
                    <div><span class="text-gray-500 text-sm">Trip Date:</span><br/><strong>\${b.chosen_trip_date || "N/A"}</strong></div>
                    <div><span class="text-gray-500 text-sm">Total PLN:</span><br/><strong>\${b.total_price_pln || "N/A"}</strong></div>`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing modal HTML");
} else {
    console.log("Could not find modal HTML to replace.");
}
