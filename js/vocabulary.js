
const searchInput = document.querySelector("#searchInput");
const wordCards = document.querySelectorAll(".word-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let selectedLevel = "all";

function filterWords() {
    const searchText = searchInput.value.toLowerCase().trim();

    wordCards.forEach(function (card) {
        const word = card.querySelector("h2").textContent.toLowerCase();
        console.log("Advanced cards:", document.querySelectorAll(".word-card.advanced").length);

        const matchesSearch = word.includes(searchText);

        const matchesLevel =
            selectedLevel === "all" ||
            card.classList.contains(selectedLevel);

        if (matchesSearch && matchesLevel) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", filterWords);


filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        selectedLevel = button.dataset.level;

    
        filterButtons.forEach(function (btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        filterWords();
    });
});

const favoriteButtons = document.querySelectorAll(".favorite");

favoriteButtons.forEach(function (button) {

    const card = button.closest(".word-card");
    const word = card.querySelector("h2").textContent;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(word)) {
        button.classList.add("active");
        button.textContent = "★";
    }

    button.addEventListener("click", function () {

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(word)) {
            favorites = favorites.filter(function (item) {
                return item !== word;
            });

            button.classList.remove("active");
            button.textContent = "☆";

        } else {
            favorites.push(word);

            button.classList.add("active");
            button.textContent = "★";
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});

const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach(function (button) {

    const card = button.closest(".word-card");
    const word = card.querySelector("h2").textContent;

    let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];

    if (savedWords.includes(word)) {
        button.textContent = "✓ Saved";
        button.classList.add("saved");
    }

    button.addEventListener("click", function () {

        let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];

        if (savedWords.includes(word)) {

            savedWords = savedWords.filter(function (item) {
                return item !== word;
            });

            button.textContent = "♧ Save";
            button.classList.remove("saved");

        } else {

            savedWords.push(word);

            button.textContent = "✓ Saved";
            button.classList.add("saved");
        }

        localStorage.setItem("savedWords", JSON.stringify(savedWords));

    });
});

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(function (button) {

    const card = button.closest(".word-card");
    const word = card.querySelector("h2").textContent;

    let myList = JSON.parse(localStorage.getItem("myWordList")) || [];

    if (myList.includes(word)) {
        button.textContent = "✓ Added";
    }

    button.addEventListener("click", function () {

        let myList = JSON.parse(localStorage.getItem("myWordList")) || [];

        if (myList.includes(word)) {

            myList = myList.filter(function (item) {
                return item !== word;
            });

            button.textContent = "＋ Add to List";

        } else {

            myList.push(word);

            button.textContent = "✓ Added";
        }

        localStorage.setItem("myWordList", JSON.stringify(myList));

    });
});