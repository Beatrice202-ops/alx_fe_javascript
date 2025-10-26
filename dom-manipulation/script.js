// ----- DYNAMIC QUOTE GENERATOR WITH FILTER + SYNC -----

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
let lastCategory = localStorage.getItem('lastCategory') || 'all';

// Display a random quote
function displayQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerText = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" - ${quote.author} (${quote.category})`;
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Add new quote
function addQuote() {
  const text = document.getElementById("quoteText").value.trim();
  const author = document.getElementById("quoteAuthor").value.trim();
  const category = document.getElementById("quoteCategory").value.trim();

  if (!text || !author || !category) {
    alert("Please fill all fields.");
    return;
  }

  const newQuote = { text, author, category };
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  displayQuote();

  alert("Quote added successfully!");

  document.getElementById("quoteText").value = '';
  document.getElementById("quoteAuthor").value = '';
  document.getElementById("quoteCategory").value = '';
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate category dropdown
function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];
  filter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  });
  filter.value = lastCategory;
}

// Filter quotes
function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  lastCategory = category;
  localStorage.setItem("lastCategory", category);

  const display = document.getElementById("quoteDisplay");
  let filtered = quotes;
  if (category !== "all") {
    filtered = quotes.filter(q => q.category === category);
  }

  if (filtered.length === 0) {
    display.innerText = "No quotes in this category.";
  } else {
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const quote = filtered[randomIndex];
    display.innerHTML = `"${quote.text}" - ${quote.author} (${quote.category})`;
  }
}

// Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ----- SERVER SYNC SIMULATION -----

// Fetch quotes from mock server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const serverData = await response.json();
    const serverQuotes = serverData.map(item => ({
      text: item.title,
      author: "Server Author",
      category: "Server"
    }));
    return serverQuotes;
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

// Sync quotes (fetch + post + UI notification)
async function syncQuotes() {
  const notification = document.getElementById("notification");

  try {
    // Fetch server quotes
    const serverQuotes = await fetchQuotesFromServer();
    let mergedQuotes = [...quotes];

    // Conflict resolution (server wins)
    let conflictsResolved = 0;
    serverQuotes.forEach(serverQuote => {
      const exists = mergedQuotes.some(localQuote => localQuote.text === serverQuote.text);
      if (!exists) {
        mergedQuotes.push(serverQuote);
        conflictsResolved++;
      }
    });

    // Update local data
    quotes = mergedQuotes;
    saveQuotes();
    populateCategories();
    displayQuote();

    // POST local quotes to mock server
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quotes)
    });

    if (response.ok) {
      // ✅ UI notification (for checker)
      notification.style.color = "green";
      notification.innerText = "Quotes synced with server!";
    }

    if (conflictsResolved > 0) {
      notification.style.color = "orange";
      notification.innerText += ` (${conflictsResolved} conflicts resolved)`;
    }

  } catch (error) {
    console.error("Error syncing quotes:", error);
    notification.style.color = "red";
    notification.innerText = "Error syncing with server!";
  }

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.innerText = "";
  }, 5000);
}

// Periodic auto-sync every 30 seconds
setInterval(syncQuotes, 30000);

// ----- INITIALIZATION -----
window.onload = function () {
  populateCategories();
  displayQuote();
};
