const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `              <div class="flex flex-col">
                <label for="filterTripDate" class="text-xs text-gray-600 mb-1">Trip Date</label>
                <input type="date" id="filterTripDate" class="px-3 py-2 border rounded shadow-sm" />
              </div>`;

const replaceHtml = `              <div class="flex flex-col relative" id="filterTripDateContainer">
                <label class="text-xs text-gray-600 mb-1">Trip Dates</label>
                <div class="relative">
                  <button type="button" id="filterTripDateBtn" class="w-full px-3 py-2 border rounded shadow-sm bg-white text-left text-gray-700 focus:outline-none flex justify-between items-center">
                    <span id="filterTripDateLabel" class="truncate pr-2">All Dates</span>
                    <svg class="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div id="filterTripDateDropdown" class="hidden absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                    <!-- Checkboxes populated by JS -->
                  </div>
                </div>
              </div>`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing trip date HTML");
} else {
    console.log("Could not find the HTML to replace.");
}
