// Get Quotes from API 
const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote'); 
let apiQuotes = [];
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const newQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[getRandomInt(apiQuotes.length)]
    // Check if author is blank and replace with unknown
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}


async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); 
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error)
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

