const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

const searchHtml = `      function renderBookingsList() {
        const search = document
          .getElementById("searchBookings")
          .value.toLowerCase();
        const filterPkg = document.getElementById("filterPackage").value;
        const filterStatus = document.getElementById("filterStatus").value;
        const filterBookingStart = document.getElementById("filterBookingDateStart").value;
        const filterBookingEnd = document.getElementById("filterBookingDateEnd").value;
        const filterTripDate = document.getElementById("filterTripDate").value;

        const filtered = currentBookings.filter((b) => {
          const matchSearch =
            (b.customer_name || "").toLowerCase().includes(search) ||
            (b.booking_no || "").toLowerCase().includes(search);
          const matchPkg = filterPkg === "" || b.event_id === filterPkg;
          const matchStatus = filterStatus === "" || b.status === filterStatus;

          let matchBookingDate = true;
          if (filterBookingStart || filterBookingEnd) {
            const bDate = new Date(b.created_at);
            // Reset time part for comparison
            bDate.setHours(0, 0, 0, 0);

            if (filterBookingStart) {
                const sDate = new Date(filterBookingStart);
                sDate.setHours(0, 0, 0, 0);
                if (bDate < sDate) matchBookingDate = false;
            }
            if (filterBookingEnd) {
                const eDate = new Date(filterBookingEnd);
                eDate.setHours(0, 0, 0, 0);
                if (bDate > eDate) matchBookingDate = false;
            }
          }

          let matchTripDate = true;
          if (filterTripDate) {
              if (!b.chosen_trip_date) {
                  matchTripDate = false;
              } else {
                  // Assuming chosen_trip_date is stored in a format compatible with Date or YYYY-MM-DD
                  const tDate = new Date(b.chosen_trip_date);
                  tDate.setHours(0, 0, 0, 0);
                  const filterTDate = new Date(filterTripDate);
                  filterTDate.setHours(0, 0, 0, 0);
                  if (tDate.getTime() !== filterTDate.getTime()) {
                      matchTripDate = false;
                  }
              }
          }

          return matchSearch && matchPkg && matchStatus && matchBookingDate && matchTripDate;
        });`;

const replaceHtml = `      function renderBookingsList() {
        const search = document
          .getElementById("searchBookings")
          .value.toLowerCase();
        const filterPkg = document.getElementById("filterPackage").value;
        const filterStatus = document.getElementById("filterStatus").value;
        const filterBookingStart = document.getElementById("filterBookingDateStart").value;
        const filterBookingEnd = document.getElementById("filterBookingDateEnd").value;

        const selectedTripDates = Array.from(document.querySelectorAll('.trip-date-checkbox:checked')).map(cb => cb.value);

        const filtered = currentBookings.filter((b) => {
          const matchSearch =
            (b.customer_name || "").toLowerCase().includes(search) ||
            (b.booking_no || "").toLowerCase().includes(search);
          const matchPkg = filterPkg === "" || b.event_id === filterPkg;
          const matchStatus = filterStatus === "" || b.status === filterStatus;

          let matchBookingDate = true;
          if (filterBookingStart || filterBookingEnd) {
            const bDate = new Date(b.created_at);
            // Reset time part for comparison
            bDate.setHours(0, 0, 0, 0);

            if (filterBookingStart) {
                const sDate = new Date(filterBookingStart);
                sDate.setHours(0, 0, 0, 0);
                if (bDate < sDate) matchBookingDate = false;
            }
            if (filterBookingEnd) {
                const eDate = new Date(filterBookingEnd);
                eDate.setHours(0, 0, 0, 0);
                if (bDate > eDate) matchBookingDate = false;
            }
          }

          let matchTripDate = true;
          if (selectedTripDates.length > 0) {
              if (!b.chosen_trip_date || !selectedTripDates.includes(b.chosen_trip_date)) {
                  matchTripDate = false;
              }
          }

          return matchSearch && matchPkg && matchStatus && matchBookingDate && matchTripDate;
        });`;

if (content.includes(searchHtml)) {
    content = content.replace(searchHtml, replaceHtml);
    fs.writeFileSync('admin.html', content);
    console.log("Success replacing trip logic HTML");
} else {
    console.log("Could not find the logic HTML to replace.");
}
