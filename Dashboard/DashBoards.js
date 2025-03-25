function generateCalendar() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Display Month and Year
    const monthYear = document.getElementById("month-year");
    monthYear.innerText = today.toLocaleString("default", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay(); // Get first day of month (0-6)
    const lastDate = new Date(year, month + 1, 0).getDate(); // Get last date of month

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = ""; // Clear previous calendar

    let date = 1;
    for (let i = 0; i < 6; i++) { // Max 6 rows
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) { // 7 Days in a row
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                cell.innerText = ""; // Empty cells before the 1st day
            } else if (date > lastDate) {
                break; // Stop when the last date is reached
            } else {
                cell.innerText = date;
                if (date === today.getDate()) {
                    cell.classList.add("today"); // Highlight today's date
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > lastDate) break; // Stop adding rows if all dates are added
    }
}

generateCalendar();

// Generate last 7 days dynamically
function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toLocaleDateString('en-US', { weekday: 'short' })); // Example: "Mon", "Tue"
    }
    return days;
}

// Attendance data (modify as needed)
const attendanceData = [50, 45, 55, 60, 40, 70, 65]; // Example values

// Get the canvas context
const ctx = document.getElementById('attendanceChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: getLast7Days(),
        datasets: [{
            label: 'Attendance Count',
            data: attendanceData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF9800', '#03A9F4'],
            borderColor: '#333',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 50
            }
        }
    }
});



// Theme Handler

const DarkThemeColors = {
    superBackground: "#000000",
    primaryText: "#ffffff",
    backgroundColor: "#323232",
    hoverColor: "#212121",
    backgroundSecondary: "#565656"
}

const LightThemeColors = {
    superBackground: "#ababab",
    primaryText: "#000000",
    backgroundColor: "#ffffff",
    hoverColor: "#8b8b8b",
    backgroundSecondary: "#94949480"
}

function changeTheme() {
    const currentTheme = document.getElementById("theme-selector");

    if (currentTheme.value === "dark") {
        currentTheme.value = "light"
        currentTheme.innerHTML = "&#127769;"
        document.documentElement.style.setProperty('--super-background', LightThemeColors.superBackground);
        document.documentElement.style.setProperty('--primary-text', LightThemeColors.primaryText);
        document.documentElement.style.setProperty('--background-primary', LightThemeColors.backgroundColor);
        document.documentElement.style.setProperty('--hover-primary', LightThemeColors.hoverColor);
        document.documentElement.style.setProperty('--background-secondary', LightThemeColors.backgroundSecondary);

    } else {
        currentTheme.value = "dark"
        currentTheme.innerHTML = "&#9728;"
        document.documentElement.style.setProperty('--super-background', DarkThemeColors.superBackground);
        document.documentElement.style.setProperty('--primary-text', DarkThemeColors.primaryText);
        document.documentElement.style.setProperty('--background-primary', DarkThemeColors.backgroundColor);
        document.documentElement.style.setProperty('--hover-primary', DarkThemeColors.hoverColor);
        document.documentElement.style.setProperty('--background-secondary', DarkThemeColors.backgroundSecondary);

        console.log(currentTheme.value);
    }

}

document.getElementById("chat").addEventListener("click", function() {
    window.location.href ="../Chat/Chat.html";
})

document.getElementById("dashboard").addEventListener("click", function() {
    window.location.href ="../Dashboard/DashBoard.html";
})