// Fetch and display daily affirmation
fetch("/affirmations/random")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("affirmation").textContent = data.affirmation;
  })
  .catch((error) => console.error("Error fetching affirmation:", error));

// Log mood form submission
// Function to log the mood based on the button clicked
function logMood(mood) {
  fetch("/mood/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "your-username", mood }), // Replace 'your-username' with the actual username or session data
  })
    .then((response) => {
      if (response.ok) {
        alert(`${mood} mood logged successfully!`);
      } else {
        alert(`Error logging ${mood} mood.`);
      }
    })
    .catch((error) => console.error(`Error logging ${mood} mood:`, error));
}

// Fetch and display mood report
fetch("/mood/report")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log("API Response:", data); // Log the raw response data

    if (!data || Object.keys(data).length === 0) {
      console.error("No mood data available.");
      return;
    }

    // Extract keys (mood labels) and values (frequencies)
    const moods = Object.keys(data);
    const counts = Object.values(data);

    console.log("Moods:", moods);
    console.log("Counts:", counts);

    if (moods.length === 0 || counts.length === 0) {
      console.error("No data to display");
      return;
    }
    const ctx = document.getElementById("reportChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: moods, // Mood labels
        datasets: [
          {
            label: "Mood Frequency",
            data: counts, // Frequency data
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4, // Smooth curves
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching mood report:", error);
  });

// Fetch and display activity suggestions
fetch("/suggestions/happy")
  .then((response) => response.json())
  .then((data) => {
    const suggestions = data.suggestions
      .map((s) => `<li class="list-group-item">${s}</li>`)
      .join("");
    document.getElementById(
      "activitySuggestions"
    ).innerHTML = `<ul class="list-group">${suggestions}</ul>`;
  })
  .catch((error) => console.error("Error fetching suggestions:", error));
