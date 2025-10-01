let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// Restart button create
let restartBtn = document.createElement("button");
restartBtn.innerText = "RESTART";
restartBtn.classList.add("restart-btn");
restartBtn.style.display = "none"; // by default hidden
document.body.appendChild(restartBtn);

// Game start by keypress
document.addEventListener("keypress", function () {
  if (started == false) {
    startGame();
  }
});

// Also allow Start/Restart button to trigger game
restartBtn.addEventListener("click", function () {
  startGame();
});

function startGame() {
  console.log("game started");
  started = true;
  level = 0;
  gameSeq = [];
  userSeq = [];
  h2.innerText = "Level " + level;
  restartBtn.style.display = "none"; // hide restart while playing
  playBtn.style.display = "none";    // hide play button while playing
  levelUp();
}

// Flash animation for game
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

// Level Up
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  
  let randidx = Math.floor(Math.random() * btns.length);
  let randcolor = btns[randidx];
  let randbtn = document.querySelector(`#${randcolor}`);
  
  gameSeq.push(randcolor);
  console.log(gameSeq);

  gameFlash(randbtn);

  updateScores(); // <-- update current score
}

// Reset
function reset() {
  started = false;
  if (level > highScore) highScore = level;

  // Only show "Game Over!" in h2
  h2.innerHTML = `Game Over! Press Restart or Play Again.`;

  updateScores(); // updates the bottom scoreboard

  restartBtn.style.display = "inline-block";
  playBtn.style.display = "inline-block";
}


// Check Answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Wrong Answer
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "black";
    }, 150);

    reset();
  }
}

// Button Press
function btnPress() {
  if (!started) return; // ignore if game not started

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Play button for mobile
let playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", function () {
    startGame();
});

// Dummy updateScores function (You can customize this as per your scoreboard UI)
function updateScores() {
  document.getElementById("currentScore").innerText = level;
  document.getElementById("highScore").innerText = highScore;
}

