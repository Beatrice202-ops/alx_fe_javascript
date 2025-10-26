let quotes = [];
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API

// Utility function to show notifications
function showNotification(message, type = "info") {
  const box = document.getElementById("notification");
  box.style.display = "block";
  box.style.backgroundColor = type === "error" ? "#ffcccc" : "#ffffcc";
  box.textContent = message;
  setTimeout(() => (box.style.display = "none"), 4000);
}

// Load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Motivation" },
      { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers", category: "Inspiration" },
      { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi", category: "Perseverance" }
    ];
  }
}

// Save quotes locally
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);

  if (filtered.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found in this category.</p>";
    return;
  }

  const random = filtered[Math.floor(Math.random() * filtered.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${random.text}"</p>
    <p>— ${random.author}</p>
    <p><em>(${random.category})</em></p>
  `;

  sessionStorage.setItem("lastCategory", category);
}

// Toggle add quote form
function toggleAddQuoteForm() {
  const form = document.getElementById("addQuoteForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const author = document.getElementById("newQuoteAuthor").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !author || !category) {
    alert("Please fill in all fields!");
    return;
  }

  quotes.push({ text, author, category });
  saveQuotes();
  populateCategories();
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteAuthor").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showNotification("Quote added successfully!");
}

// Populate category dropdown
function populateCategories() {
  const categorySelect = document.getElementById("categoryFilter");
  const uniqueCategories = ["all", ...new Set(quotes.map(q => q.category))];

  categorySelect.innerHTML = "";
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });

  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    categorySelect.value = lastFilter;
  }
}

// Filter quotes
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastFilter", selected);
  showRandomQuote();
}

// Export JSON
function exportToJsonFile() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import JSON
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      showNotification("Quotes imported successfully!");
    } catch (err) {
      showNotification("Invalid JSON file!", "error");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// --- SERVER SYNC FUNCTIONS ---

// ✅ The required function name:
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Simulate server returning a few quotes
    const simulatedQuotes = serverData.slice(0, 3).map(post => ({
      text: post.title,
      author: "Server Author",
      category: "Server"
    }));

    return simulatedQuotes;
  } catch (error) {
    showNotification("Error fetching from server.", "error");
    return [];
  }
}

// Simulate sending local quotes to server
async function sendToServer() {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify(quotes),
      headers: { "Content-Type": "application/json" }
    });
    showNotification("Quotes synced to server successfully!");
  } catch (error) {
    showNotification("Error syncing to server.", "error");
  }
}

// Merge server and local quotes (server wins)
async function syncWithServer() {
  showNotification("Syncing with server...");
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes.length === 0) {
    showNotification("No updates from server.");
    return;
  }

  // Conflict resolution — server data takes precedence
  const merged = [...serverQuotes];
  const localUnique = quotes.filter(
    q => !serverQuotes.some(sq => sq.text === q.text && sq.author === q.author)
  );
  merged.push(...localUnique);

  quotes = merged;
  saveQuotes();
  populateCategories();
  showNotification("Data synced — server version took precedence!");
  await sendToServer();
}

// Periodic auto-sync every 30 seconds
setInterval(syncWithServer, 30000);

// Initialize app
window.onload = function() {
  loadQuotes();
  populateCategories();
  showRandomQuote();
};
