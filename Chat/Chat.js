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

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    // Function to add messages to chat box
    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }

    // Function to call Gemini 2.0 Flash API
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return; // Ignore empty messages

        addMessage(userMessage, "user"); // Show user message
        userInput.value = ""; // Clear input field

        const API_KEY = "AIzaSyCqIrIk89dfmn8kEMZ0PK46PqSW3UU_6ic"; // Replace with your actual API key
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const requestString = `Act like a virtual assistant to a teacher named Rakesh, 
        Students database is this for today:
        Abhishek - Present
        Aditya - Absent
        Anjali - Present
        Pankaj - Absent
        the message he sent you is ${userMessage}, reply only what is asked and be concise with the response`;
        const requestBody = {
            contents: [{ role: "user", parts: [{ text: requestString }] }]
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
            addMessage(botResponse, "bot"); // Show bot response
        } catch (error) {
            console.error("Error:", error);
            addMessage("Error connecting to AI.", "bot");
        }
    }

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});

document.getElementById("chat").addEventListener("click", function() {
    window.location.href ="../Chat/Chat.html";
})

document.getElementById("dashboard").addEventListener("click", function() {
    window.location.href ="../Dashboard/DashBoard.html";
})