// ========== QUOTE DATA HANDLING WITH STORAGE ==========

// Default quotes
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Strive not to be a success, but rather to be of value.", category: "Success" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryContainer = document.getElementById("categoryContainer");
const exportBtn = document.getElementById("exportBtn");
const categorySelect = document.createElement("select");

// ========== LOCAL STORAGE HANDLERS ==========

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// ========== SESSION STORAGE HANDLER (Optional) ==========
function saveLastViewedQuote(quote) {
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function getLastViewedQuote() {
  const last = sessionStorage.getItem("lastQuote");
  return last ? JSON.parse(last) : null;
}

// ========== CATEGORY DROPDOWN ==========

function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// ========== QUOTE DISPLAY ==========

function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p class="category">— ${randomQuote.category}</p>
  `;

  saveLastViewedQuote(randomQuote); // store in session
}

// ========== ADD QUOTE FORM CREATION ==========

function createAddQuoteForm() {
  const formSection = document.createElement("div");
  formSection.className = "form-section";

  const title = document.createElement("h2");
  title.textContent = "Add a New Quote";

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", () => addQuote(textInput, categoryInput));

  formSection.appendChild(title);
  formSection.appendChild(textInput);
  formSection.appendChild(categoryInput);
  formSection.appendChild(addButton);

  document.body.appendChild(formSection);
}

// Add a new quote dynamically
function addQuote(textInput, categoryInput) {
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category!");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  saveQuotes(); // persist in localStorage
  populateCategories();

  textInput.value = "";
  categoryInput.value = "";

  alert("New quote added successfully!");
}

// ========== JSON IMPORT / EXPORT ==========

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid JSON format. Expected an array of quotes.");
        return;
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    } catch (e) {
      alert("Error reading JSON file: " + e.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ========== APP INITIALIZATION ==========

function init() {
  loadQuotes();
  categoryContainer.appendChild(categorySelect);
  populateCategories();
  createAddQuoteForm();

  const lastQuote = getLastViewedQuote();
  if (lastQuote) {
    quoteDisplay.innerHTML = `
      <p>"${lastQuote.text}"</p>
      <p class="category">— ${lastQuote.category}</p>
    `;
  } else {
    showRandomQuote();
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportToJsonFile);
}

init();
