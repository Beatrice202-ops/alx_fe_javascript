document.addEventListener("DOMContentLoaded", () => {
  // Create an array of quotes
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    {
      text: "The best way to get started is to quit talking and begin doing.",
      category: "Motivation",
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    {
      text: "Your time is limited, so don’t waste it living someone else’s life.",
      category: "Inspiration",
    },
    { text: "Stay positive", category: "Motivation" },
    { text: "Work hard", category: "Success" },
    {
      text: '"A man does what he must in spite of personal consequences, in spite of obstacles and dangers and pressures and that is the basis of all human morality" - John F Kennedy',
      category: "Leadership",
    },
    {
      text: "It's not bragging if you can back it up. - Muhammad Ali",
      category: "Success",
    },
    {
      text: "If my mind can conceive it, and my heart can believe it, then I can achieve it. - Muhammad Ali",
      category: "Success",
    },
    {
      text: "Build a life you don\'t need a vacation from." - Luke Belmar,
      category: "Inspiration",
    },
    {
      text: "Never say never, because limits, like fears, are often just an illusion. - Michael Jordan",
      category: "Inspiration",
    },
    {
      text: "To learn to succeed, you must first learn to fail. - Michael Jordan",
      category: "Inspiration",
    },
    {
      text: "To live is to suffer, to survive is to find some meaning in the suffering." - Friedrich Nietzsche,
      category: "Philosophy",
    },
    {
      text: "'He who has a why to live can bear almost any how.' - Friedrich Nietzsche",
      category: "Philosophy",
    },
    {
      text: "'Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours' - John Locke",
      category: "Philosophy",
    },
    {
      text: "New opinions are always suspected, and usually opposed, without any other reason but because they are not already common." - John Locke,
      category: "Philosophy",
    },
    {
      text: "Patience is bitter, but its fruit is sweet." - Aristotle,
      category: "Philosophy",
    },
    {
      text: "The educated differ from the uneducated as much as the living differ from the dead - Aristotle",
      category: "Philosophy",
    },
    {
      text: "The more you know, the more you realize you don't know. - Aristotle",
      category: "Philosophy",
    },
    {
      text: "Happiness depends upon ourselves." - Aristotle,
      category: "Philosophy",
    },
    {
      text: "I think it is possible for ordinary people to choose to be extraordinary - Elon Musk",
      category: "Motivation",
    },
    {
      text: "'“Any product that needs a manual to work is broken.”' -  Elon Musk",
      category: "Business",
    },
    {
      text: "'“If something's important enough, you should try. Even if the probable outcome is failure.”' -  Elon Musk",
      category: "Business",
    },
    {
      text: "Success is nothing more than a few simple disciplines, practiced every day. - Jim Rohn",
      category: "Motivation",
    },
    {
      text: "'Embrace what you don't know, especially in the beginning, because what you don't know can become your greatest asset.' - Sara Blakely",
      category: "Business",
    },
    {
      text: "'Failure is not the outcome, failure is not trying. Don't be afraid to fail.' - Sara Blakely",
      category: "Business",
    },
    {
      text: "'Discipline equals freedom.' - Jocko Willink",
      category: "Discipline",
    },
    {
      text: "'If you are not willing to risk the unusual, you will have to settle for the ordinary.' - Jim Rohn",
      category: "Motivation",
    },
    {
      text: "The only way to do great work is to love what you do.",
      category: "Motivation",
    },
    {
      text: "'Fate is in your hands and no one elses' - Byron Pulsifer",
      category: "Inspiration",
    },
    {
      text: "Be the chief but never the lord. - Lao Tzu",
      category: "Leadership",
    },
    {
      text: "Nothing happens unless first we dream." - Carl Sandburg,
      category: "Motivation",
    },
  { text: "Well begun is half done. - Aristotle", category: "Philosophy" },
    {
      text: "Life is a learning experience, only if you learn." - Yogi Berra,
      category: "Discipline",
    },
    {
      text: "Self-complacency is fatal to progress." - Margaret Sangster,
      category: "Motivation",
    },
    {
      text: "Peace comes from within. Do not seek it without." - Buddha,
      category: "Philosophy",
    },
    {
      text: "What you give is what you get." - Byron Pulsifer,
      category: "Motivation",
    },
    {
      text: "We can only learn to love by loving." - Iris Murdoch,
      category: "Inspiration",
    },
    {
      text: "Life is change. Growth is optional. Choose wisely." - Karen Clark,
      category: "Inspiration",
    },
    {
      text: "You\'ll see it when you believe it." - Wayne Dyer,
      category: "Success",
    },
    {
      text: "To lead people walk behind them." - Lao Tzu,
      category: "Leadership",
    },
    {
      text: "Having nothing, nothing can he lose." - William Shakespeare,
      category: "Poets",
    },
    {
      text: "Trouble is only opportunity in work clothes." - Henry J. Kaiser,
      category: "Inspiration",
    },
    {
      text: "A rolling stone gathers no moss." - Publilius Syrus,
      category: "Motivation",
    },
    {
      text: "Ideas are the beginning points of all fortunes." - Napoleon Hill,
      category: "Motivation",
    },
    {
      text: "'Everything in life is luck.' - Donald Trump",
      category: "Philosopy",
    },
    {
      text: "'Doing nothing is better than being busy doing nothing.' - Lao Tzu",
      category: "Philosophy",
    },
    {
      text: "'Trust yourself. You know more than you think you do.' - Benjamin Spock",
      category: "Motivation",
    },
    {
      text: "'Study the past, if you would divine the future.' - Confucius",
      category: "Philosophy",
    },
    {
      text: "Believe you can and you're halfway there.",
      category: "Motivation",
    },
    {
      text: "Do something today that your future self will thank you for.",
      category: "Inspiration",
    },
    {
      text: "Don’t watch the clock; do what it does. Keep going.",
      category: "Productivity",
    },
    { text: "Dream big and dare to fail.", category: "Courage" },
    {
      text: "The secret of getting ahead is getting started.",
      category: "Success",
    },
    {
      text: "It always seems impossible until it's done.",
      category: "Determination",
    },
    { text: "Little by little, a little becomes a lot.", category: "Growth" },
    { text: "Mistakes are proof you are trying.", category: "Encouragement" },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      category: "Persistence",
    },
    { text: "Your only limit is your mind.", category: "Mindset" },
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteButton = document.getElementById("newQuote");

  // 🔹 Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>${quote.category}</small>`;

    sessionStorage.setItem("lastViewedQuote", randomIndex);
  }

  // Show random quote when user clicks button
  newQuoteButton.addEventListener("click", showRandomQuote);

  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.id = "quoteForm";

    // Input for quote text
    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";

    // Input for quote category
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    // Add button
    const addButton = document.createElement("button");
    addButton.id = "addQuoteBtn";
    addButton.textContent = "Add Quote";

    // Add to container
    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
  }
  // Create the add-quote form and then wire the listener
  createAddQuoteForm();
  const addBtn = document.getElementById("addQuoteBtn");
  if (addBtn) addBtn.addEventListener("click", addQuote);

  // Add new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
      quotes.push({ text, category });
      localStorage.setItem("quotes", JSON.stringify(quotes));
      textInput.value = "";
      categoryInput.value = "";
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  }

  // Buttons for Import/Export JSON
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Quotes";
  exportButton.addEventListener("click", exportToJsonFile);

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  // Append export/import controls to the page so the user can use them
  document.body.appendChild(exportButton);
  document.body.appendChild(importInput);

  // Export quotes to JSON
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
  }

  // Import quotes from JSON
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Load last viewed quote if available
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed !== null && quotes[lastViewed]) {
    const quote = quotes[lastViewed];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>${quote.category}</small>`;
  }

  // Implementing Filtering Logic
  const categoryFilter = document.getElementById("categoryFilter");

  // Populate category dropdown
  function populateCategories() {
    const categories = [...new Set(quotes.map((q) => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  // Initialize
  populateCategories();

  // Filter quotes by selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;

    // Get filtered quotes
    const filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((q) => q.category === selectedCategory);

    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes found in this category.</p>";
      return;
    }

    // Show a random quote from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>${quote.category}</small>`;
  }

  // When user changes category
  categoryFilter.addEventListener("change", filterQuotes);

  // 🔹 Simulate fetching quotes from a server
  async function fetchQuotesFromServer() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=3"
    );
    const data = await response.json();
    return data.map((item) => ({
      text: item.title,
      category: "Server",
    }));
  }

// 🔹 Sync local data with server (server takes precedence)
async function syncQuotes() {
  try {
    // 1️⃣ Fetch simulated server quotes
    const serverQuotes = await fetchQuotesFromServer();

    // 2️⃣ Merge server + local quotes (server first)
    const combined = [...serverQuotes, ...quotes];
    const unique = Array.from(new Map(combined.map((q) => [q.text, q])).values());

    quotes = unique;
    saveQuotes();
    populateCategories();

    // 3️⃣ 🔹 Simulate sending local data back to server
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quotes: quotes,
        timestamp: new Date().toISOString(),
      }),
    });

    alert("🔁 Quotes synced with server!");
  } catch (error) {
    alert("⚠ Failed to sync with server.");
    console.error(error);
  }
}

  // 🔹 Auto-sync every 20 seconds
  setInterval(syncQuotes, 20000);
});