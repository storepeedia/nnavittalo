const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `      async function loadBookings() {
        document.getElementById("bookingsLoading").classList.remove("hidden");
        let query = dbClient
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        const { data, error } = await query;
        document.getElementById("bookingsLoading").classList.add("hidden");
        if (error) return console.error(error);

        currentBookings = data;
        renderBookingsList();
      }`;

const replaceHtml = `      async function loadBookings() {
        document.getElementById("bookingsLoading").classList.remove("hidden");
        let query = dbClient
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        const { data, error } = await query;
        document.getElementById("bookingsLoading").classList.add("hidden");
        if (error) return console.error(error);

        currentBookings = data;

        // Populate Trip Dates dropdown
        const tripDates = [...new Set(data.map(b => b.chosen_trip_date).filter(Boolean))];
        // Sort descending (latest future date at top, past at bottom)
        tripDates.sort((a, b) => new Date(b) - new Date(a));

        const dropdown = document.getElementById("filterTripDateDropdown");
        dropdown.innerHTML = tripDates.map(date => \`
          <label class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" value="\${date}" class="trip-date-checkbox mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <span class="text-sm text-gray-700">\${date}</span>
          </label>
        \`).join("");

        // Attach change listeners to new checkboxes
        document.querySelectorAll('.trip-date-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                updateTripDateLabel();
                renderBookingsList();
            });
        });

        renderBookingsList();
      }

      function updateTripDateLabel() {
        const checked = Array.from(document.querySelectorAll('.trip-date-checkbox:checked')).map(cb => cb.value);
        const label = document.getElementById('filterTripDateLabel');
        if (checked.length === 0) {
            label.textContent = "All Dates";
        } else if (checked.length === 1) {
            label.textContent = checked[0];
        } else {
            label.textContent = checked.length + " Dates Selected";
        }
      }`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing trip populate HTML");
} else {
    console.log("Could not find the HTML to replace.");
}
