let quotes = [];

// Load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    // Default quotes
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Motivation" },
      { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers", category: "Inspiration" },
      { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi", category: "Perseverance" }
    ];
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote
function showRandomQuote() {
  const category = document.getElementById("categoryFilter").value;
  let filteredQuotes = category === "all" ? quotes : quotes.filter(q => q.category === category);
  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes found in this category.</p>";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}"</p><p>— ${quote.author}</p><p><em>(${quote.category})</em></p>`;

  // Save last viewed quote category in session storage
  sessionStorage.setItem("lastCategory", category);
}

// Toggle add quote form
function toggleAddQuoteForm() {
  const form = document.getElementById("addQuoteForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add a new quote
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

  alert("Quote added successfully!");
}

// Populate category dropdown dynamically
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

  // Restore last selected filter
  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    categorySelect.value = lastFilter;
  }
}

// Filter quotes by selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastFilter", selectedCategory);
  showRandomQuote();
}

// Export quotes to JSON
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

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Invalid JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize app
window.onload = function() {
  loadQuotes();
  populateCategories();

  // Restore last filter
  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    document.getElementById("categoryFilter").value = lastFilter;
  }

  // Show a quote on load
  showRandomQuote();
};
