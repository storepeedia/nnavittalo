const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>`;

const replaceHtml = `                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trip Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing table header HTML");
} else {
    console.log("Could not find table header HTML to replace.");
}
