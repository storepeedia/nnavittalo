const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `      document
        .getElementById("filterBookingDateEnd")
        .addEventListener("change", renderBookingsList);
      document
        .getElementById("filterTripDate")
        .addEventListener("change", renderBookingsList);`;

const replaceHtml = `      document
        .getElementById("filterBookingDateEnd")
        .addEventListener("change", renderBookingsList);

      // Dropdown toggle logic
      document.getElementById('filterTripDateBtn').addEventListener('click', (e) => {
          e.stopPropagation();
          document.getElementById('filterTripDateDropdown').classList.toggle('hidden');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
          const dropdown = document.getElementById('filterTripDateDropdown');
          const btn = document.getElementById('filterTripDateBtn');
          if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
              dropdown.classList.add('hidden');
          }
      });
      // We removed filterTripDate as an ID, so we also remove the listener for it here.`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing trip toggle HTML");
} else {
    console.log("Could not find toggle HTML to replace.");
}
