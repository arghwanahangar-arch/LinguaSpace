const quizQuestions = {
    vocabulary: [
        {
            question: "What is the meaning of Beautiful?",
            options: ["زیبا", "بزرگ", "کوچک", "سریع"],
            answer: "زیبا"
        },
        {
            question: "What is the meaning of Brave?",
            options: ["ترسو", "شجاع", "خسته", "خوشحال"],
            answer: "شجاع"
        }
    ],

    grammar: [
        {
            question: "She ___ a student.",
            options: ["am", "is", "are", "be"],
            answer: "is"
        },
        {
            question: "They ___ playing football.",
            options: ["is", "am", "are", "be"],
            answer: "are"
        }
    ]
};

quizQuestions.mixed = [
    ...quizQuestions.vocabulary,
    ...quizQuestions.grammar
];

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz(type) {
    if (!quizQuestions[type]) {
        console.error("Quiz type not found:", type);
        return;
    }

    currentQuiz = quizQuestions[type];
    currentQuestion = 0;
    score = 0;

    const quizBox = document.getElementById("quizBox");

    if (!quizBox) {
        console.error("quizBox not found in HTML!");
        return;
    }

    quizBox.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const question = currentQuiz[currentQuestion];

    if (!question) return;

    answered = false;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("feedback").textContent = "";

    document.getElementById("nextBtn").classList.add("hidden");

    const optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = option;
        button.className =
            "bg-[#252044] p-3 rounded-lg hover:bg-purple-700 text-left";

        button.onclick = () => checkAnswer(option);

        optionsBox.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (answered) return;

    answered = true;

    const correct = currentQuiz[currentQuestion].answer;

    if (selected === correct) {
        score++;
        document.getElementById("feedback").textContent =
            "✅ Correct! Great job!";
    } else {
        document.getElementById("feedback").textContent =
            "❌ Incorrect! Correct answer: " + correct;
    }

    document.getElementById("nextBtn").classList.remove("hidden");
}

function saveQuizResult() {
    let stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        daily: {}
    };

    stats.completed++;
    stats.totalScore += score;
    stats.correctAnswers += score;
    stats.totalQuestions += currentQuiz.length;

    const today = new Date();

    const dateKey =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    stats.daily[dateKey] = (stats.daily[dateKey] || 0) + 1;

    localStorage.setItem("quizStats", JSON.stringify(stats));

    updateDashboard();
}

function updateDashboard() {
    const stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        daily: {}
    };

    document.getElementById("totalScore").textContent =
        stats.totalScore;

    document.getElementById("quizzesCompleted").textContent =
        stats.completed;

    const accuracy = stats.totalQuestions > 0
        ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
        : 0;

    document.getElementById("accuracyRate").textContent =
        accuracy + "%";

    const barIds = [
        "barMon", "barTue", "barWed", "barThu",
        "barFri", "barSat", "barSun"
    ];

    const today = new Date();
    const day = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() + (day === 0 ? -6 : 1 - day));

    barIds.forEach((barId, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);

        const dateKey =
            date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0");

        const count = stats.daily[dateKey] || 0;
        const bar = document.getElementById(barId);

        if (bar) {
            bar.style.height = Math.min(12 + count * 20, 140) + "px";
        }
    });
}

function handleNextQuestion() {
    if (!currentQuiz.length) return;

    currentQuestion++;

    if (currentQuestion < currentQuiz.length) {
        showQuestion();
    } else {
        saveQuizResult();

        document.getElementById("question").textContent =
            "🎉 Quiz Completed!";

        document.getElementById("options").innerHTML = "";

        document.getElementById("feedback").textContent =
            "Your score: " + score + " / " + currentQuiz.length;

        document.getElementById("nextBtn").classList.add("hidden");
    }
}

window.startQuiz = startQuiz;

function initializeQuiz() {
    const nextBtn = document.getElementById("nextBtn");

    if (nextBtn) {
        nextBtn.onclick = handleNextQuestion;
    }

    updateDashboard();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeQuiz);
} else {
    initializeQuiz();
}