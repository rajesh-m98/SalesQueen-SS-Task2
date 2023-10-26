const MenuButton = document.getElementById('menu');
const SideBar = document.getElementById('sidebar');

MenuButton.addEventListener('click', () => {
    SideBar.style.display="block";
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show-sidebar");
}

MenuButton.addEventListener('dblclick', () => {
    SideBar.style.display="none";
});

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const calendarBody = document.getElementById("calendar-body");

// Function to update the calendar
function updateCalendar() {
    // Clear previous calendar cells
    calendarBody.innerHTML = "";

    // Set the calendar's header
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

    // Create a row for the day names
    const dayNamesRow = document.createElement("tr");
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (const dayName of dayNames) {
        const dayNameCell = document.createElement("th");
        dayNameCell.textContent = dayName;
        dayNamesRow.appendChild(dayNameCell);
    }
    calendarBody.appendChild(dayNamesRow);

    // Calculate the first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1);

    // Calculate the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Determine the day of the week for the first day (0 = Sunday, 1 = Monday, ...)
    let startDay = firstDay.getDay();

    // Create a new row
    let row = document.createElement("tr");

    // Fill blank cells for the days before the first day of the month
    for (let i = 0; i < startDay; i++) {
        const blankCell = document.createElement("td");
        blankCell.textContent = "";
        row.appendChild(blankCell);
    }

    // Create cells for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement("td");
        cell.textContent = i;
        if (i === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            cell.classList.add("today");
        }
        row.appendChild(cell);

        // If it's the 6th day (Saturday), start a new row
        if (startDay === 6) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
            startDay = 0; // Reset the start day for the new row
        } else {
            startDay++;
        }
    }

    // Append any remaining cells
    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }
}

// Get the current date
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Add event listeners to previous and next month buttons
prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// Initial calendar update
updateCalendar();