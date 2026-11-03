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
    currentQuiz = quizQuestions[type];

    if (!currentQuiz) return;

    currentQuestion = 0;
    score = 0;

    document.getElementById("quizBox").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const question = currentQuiz[currentQuestion];

    answered = false;

    document.getElementById("question").textContent = question.question;
    document.getElementById("feedback").textContent = "";
    document.getElementById("nextBtn").classList.add("hidden");

    const optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");

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
    function saveQuizResult() {
    let stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0
    };

    stats.completed++;
    stats.totalScore += score;
    stats.correctAnswers += score;
    stats.totalQuestions += currentQuiz.length;

    localStorage.setItem("quizStats", JSON.stringify(stats));

    updateDashboard();
}

function updateDashboard() {
    const stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0
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
}

    document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").onclick = function () {
    currentQuestion++;

    if (currentQuestion < currentQuiz.length) {
        showQuestion();
    } else {
        document.getElementById("question").textContent =
            "🎉 Quiz Completed!";

        document.getElementById("options").innerHTML = "";

        document.getElementById("feedback").textContent =
            "Your score: " + score + " / " + currentQuiz.length;

        this.classList.add("hidden");
    }
};
function saveQuizResult() {
    let stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0
    };

    stats.completed++;
    stats.totalScore += score;
    stats.correctAnswers += score;
    stats.totalQuestions += currentQuiz.length;

    localStorage.setItem("quizStats", JSON.stringify(stats));
    updateDashboard();
}
function updateDashboard() {
    const stats = JSON.parse(localStorage.getItem("quizStats")) || {
        completed: 0,
        totalScore: 0,
        correctAnswers: 0,
        totalQuestions: 0
    };

    document.getElementById("totalScore").textContent =
        stats.totalScore;

    document.getElementById("quizzesCompleted").textContent =
        stats.completed;

    const accuracy = stats.totalQuestions > 0
        ? Math.round(
            (stats.correctAnswers / stats.totalQuestions) * 100
        )
        : 0;

    document.getElementById("accuracyRate").textContent =
        accuracy + "%";
}

document.getElementById("nextBtn").onclick = function () {
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

        this.classList.add("hidden");
    }
};

window.startQuiz = startQuiz;
updateDashboard();