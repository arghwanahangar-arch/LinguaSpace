/* =================================
   LinguaSpace - Main JavaScript
   ================================= */

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("Welcome to LinguaSpace! 🌍");

    // Get the saved language
    const savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage) {
        console.log("Your selected language is:", savedLanguage);
    }

});


// =================================
// Language Selection
// =================================

function selectLanguage(language) {

    // Save selected language
    localStorage.setItem("selectedLanguage", language);

    // Show confirmation message
    alert(`Wonderful choice! 🌍 You selected ${language}.`);

    // Display selection in console
    console.log("Selected language:", language);

}// =================================
// Culture Page - Country Search
// =================================

const countrySearch = document.getElementById("countrySearch");
const countryCards = document.querySelectorAll("#countryGrid article");

if (countrySearch) {
    countrySearch.addEventListener("input", function () {
        const searchTerm = countrySearch.value.trim().toLowerCase();

        countryCards.forEach(function (card) {
            const countryName = card.querySelector("h3").textContent.toLowerCase();

            if (countryName.includes(searchTerm)) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
}

// =================================
// Inspiration Page - Rotating Quotes
// =================================

const inspirationalQuotes = [
    {
        text: "The limits of my language mean the limits of my world.",
        author: "Ludwig Wittgenstein"
    },
    {
        text: "A different language is a different vision of life.",
        author: "Federico Fellini"
    },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },
    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "B.B. King"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Learning another language is like becoming another person.",
        author: "Haruki Murakami"
    }
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

if (quoteText && quoteAuthor) {
    let currentQuote = 0;

    setInterval(function () {
        currentQuote = (currentQuote + 1) % inspirationalQuotes.length;

        quoteText.textContent =
            '"' + inspirationalQuotes[currentQuote].text + '"';

        quoteAuthor.textContent =
            "— " + inspirationalQuotes[currentQuote].author;
    }, 5000);
}