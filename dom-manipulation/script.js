// Array to store quotes and their categories
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Strive not to be a success, but rather to be of value.", category: "Success" }
];

// Get main elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryContainer = document.getElementById("categoryContainer");

// Create and insert category dropdown
const categorySelect = document.createElement("select");
categoryContainer.appendChild(categorySelect);

// Function to populate dropdown categories
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

// Function to show random quote
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
}

// Function to create "Add Quote" form dynamically
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

// Function to add a new quote dynamically
function addQuote(textInput, categoryInput) {
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and a category!");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  populateCategories();

  textInput.value = "";
  categoryInput.value = "";

  alert("New quote added successfully!");
}

// Initialize the app
function init() {
  populateCategories();
  showRandomQuote();
  createAddQuoteForm();
  newQuoteBtn.addEventListener("click", showRandomQuote);
}

init();
