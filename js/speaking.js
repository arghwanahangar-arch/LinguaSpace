
const speakingQuestions = {
    "Daily Conversation": [
        "What do you usually do in the morning?",
        "What is your favorite part of the day?",
        "How do you spend your free time?"
    ],

    "Travel & Tourism": [
        "Which country would you like to visit?",
        "Why do you enjoy travelling?",
        "What do you usually pack for a trip?"
    ],

    "Education": [
        "What is your favorite subject?",
        "Why is education important?",
        "What are your future study goals?"
    ],

    "Job Interview": [
        "Can you introduce yourself?",
        "What are your strengths?",
        "Why should we choose you for this job?"
    ],

    "About Yourself": [
        "Can you describe yourself?",
        "What are your hobbies?",
        "What is your biggest dream?"
    ],

    "Making Friends": [
        "How do you make new friends?",
        "What qualities do you value in a friend?",
        "How do you keep a friendship strong?"
    ]
};

let currentTopic = "";
let currentQuestionIndex = 0;

function startPractice(topic) {
    currentTopic = topic;
    currentQuestionIndex = 0;

    document.getElementById("practiceTitle").textContent = topic;
    showQuestion();

    document.getElementById("practice").scrollIntoView({
        behavior: "smooth"
    });
}


function showQuestion() {
    const questions = speakingQuestions[currentTopic];

    document.getElementById("question").textContent =
        questions[currentQuestionIndex];

    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
}

function nextQuestion() {
    if (!currentTopic) {
        document.getElementById("feedback").textContent =
            "Please choose a topic first.";
        return;
    }

    const answer = document.getElementById("answer").value.trim();

    if (answer === "") {
        document.getElementById("feedback").textContent =
            "Please write your answer before continuing.";
        return;
    }

    const questions = speakingQuestions[currentTopic];

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        document.getElementById("question").textContent =
            "🎉 You have completed this practice!";

        document.getElementById("answer").value = "";

        document.getElementById("feedback").textContent =
            "Great job! Keep practising to improve your English.";
    }
}
window.startPractice = startPractice;
window.nextQuestion = nextQuestion;

function filterSpeakingTopics(level) {
    const cards = document.querySelectorAll(".topic-card");
    const buttons = document.querySelectorAll(".level-btn");

    cards.forEach(card => {
        card.hidden = !(level === "all" || card.classList.contains(level));
    });

    buttons.forEach(button => {
        const active = button.dataset.level === level;

        button.classList.remove(
            "bg-purple-700", "text-white",
            "bg-white", "text-purple-700",
            "border", "border-purple-200"
        );

        if (active) {
            button.classList.add(
                "bg-purple-700", "text-white"
            );
        } else {
            button.classList.add(
                "bg-white", "text-purple-700",
                "border", "border-purple-200"
            );
        }
    });
}

window.filterSpeakingTopics = filterSpeakingTopics;