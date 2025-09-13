const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    choices: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: 1
  },
  {
    question: "Which language runs in the browser?",
    choices: ["Java", "C++", "Python", "JavaScript"],
    answer: 3
  }
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  resetState();
  let q = questions[currentQ];
  questionEl.textContent = q.question;
  
  q.choices.forEach((choice, i) => {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(i, btn);
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  choicesEl.innerHTML = "";
  timeLeft = 15;
}

function selectAnswer(i, btn) {
  clearInterval(timer);
  let q = questions[currentQ];
  const buttons = choicesEl.querySelectorAll("button");
  
  buttons.forEach((b, index) => {
    if (index === q.answer) b.classList.add("correct");
    else if (index === i) b.classList.add("wrong");
    b.disabled = true;
  });

  if (i === q.answer) score++;
  scoreEl.textContent = "Score: " + score;
  nextBtn.style.display = "block";
}

function startTimer() {
  timerEl.textContent = `⏳ ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1, null); // auto-submit
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  questionEl.textContent = "🎉 Quiz Finished!";
  choicesEl.innerHTML = "";
  nextBtn.style.display = "none";
  timerEl.style.display = "none";
}
startQuiz();
























































