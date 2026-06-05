const timeDisplay = document.querySelector(".time-display");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const gondolas = document.querySelectorAll(".gondola");

const WORK_TIME = 25 * 60; // 25分
let timeLeft = WORK_TIME;
let timerId = null;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timeDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  updateActiveGondola();
}

function updateActiveGondola() {
  const elapsed = WORK_TIME - timeLeft;

  // 25分を10分割。1ゴンドラあたり150秒＝2.5分
  const currentIndex = Math.min(
    Math.floor(elapsed / (WORK_TIME / 10)),
    9
  );

  gondolas.forEach((gondola, index) => {
    gondola.classList.toggle("active", index === currentIndex);
  });
}

function startTimer() {
  if (timerId !== null) return;

  document.body.classList.add("is-running");
  console.log(document.body.className);

  startBtn.textContent = "RUNNING";

  timerId = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timerId);
      timerId = null;
      document.body.classList.remove("is-running");
      startBtn.textContent = "START";
    }

    updateDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  timeLeft = WORK_TIME;
  document.body.classList.remove("is-running");
  startBtn.textContent = "START";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();