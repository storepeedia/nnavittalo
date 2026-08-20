const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">\${b.event_name}</div>
                        <div class="text-sm text-gray-500">\${b.is_main_booker ? (b.guests || 1) + " Guests" : "Additional Guest"}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        \${b.total_price_pln ? b.total_price_pln + " PLN" : "-"}
                    </td>`;

const replaceHtml = `                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">\${b.event_name}</div>
                        <div class="text-sm text-gray-500">\${b.is_main_booker ? (b.guests || 1) + " Guests" : "Additional Guest"}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        \${b.chosen_trip_date || "N/A"}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        \${b.total_price_pln ? b.total_price_pln + " PLN" : "-"}
                    </td>`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing table body HTML");
} else {
    console.log("Could not find table body HTML to replace.");
}
