let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

//  Fetch quotes from mock server (simulation)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    // Simulate server quotes
    const serverQuotes = data.slice(0, 5).map(post => ({
      text: post.title,
      author: "Server"
    }));

    return serverQuotes;
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

// Sync quotes between local and server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Simple conflict resolution: server data takes precedence
  const mergedQuotes = [...serverQuotes, ...localQuotes];
  localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
  quotes = mergedQuotes;

  //  UI notification for sync
  showNotification("Quotes synced with server!");
}

//  Function to display a random quote
function displayRandomQuote() {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");

  if (quotes.length === 0) {
    quoteText.textContent = "No quotes available.";
    quoteAuthor.textContent = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = `- ${randomQuote.author}`;
}

// Function to create Add Quote form handler
function createAddQuoteForm() {
  const form = document.getElementById("add-quote-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = document.getElementById("new-quote-text").value;
    const author = document.getElementById("new-quote-author").value;
    const newQuote = { text, author };

    // Add to local storage
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Post to mock server
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuote)
    });

    showNotification("New quote added and synced with server!");
    e.target.reset();
  });
}

//Helper: show notifications
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  setTimeout(() => (notification.textContent = ""), 3000);
}

//Initialization
document.getElementById("new-quote").addEventListener("click", displayRandomQuote);
createAddQuoteForm();
syncQuotes(); // initial sync
setInterval(syncQuotes, 15000); // periodic sync every 15 seconds
