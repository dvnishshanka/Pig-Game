"use strict";

let currentScore = 0;
const score = [0, 0];
let activePlayer = 1;

const diceImageElement = document.querySelector(".dice");
const newElement = document.querySelector(".new-game");
const gameWrapperElement = document.querySelector(".game-wrapper");
const popupElement = document.querySelector(".popup");
const overlayElement = document.querySelector(".show");
const popupDescElement = document.querySelector(".popup-description");

const resetPlayer = (player) => {
  currentScore = 0;
  document.getElementById(`total-score-pl${player}`).innerText =
    score[player - 1];
  document.getElementById(`current-score-pl${player}`).textContent =
    currentScore;
};

document.querySelector(".roll").addEventListener("click", function rollDice() {
  const diceNo = Math.trunc(Math.random() * 6 + 1);

  if (diceNo === 1) {
    currentScore = 0;
    resetPlayer(activePlayer);
    activePlayer = activePlayer === 1 ? 2 : 1;
    gameWrapperElement.classList.toggle("pl2-active");
  } else {
    currentScore += diceNo;
  }
  document.getElementById(`current-score-pl${activePlayer}`).textContent =
    currentScore;

  diceImageElement.classList.remove("hidden");
  diceImageElement.src = `assets/dice-${diceNo}.png`;
  diceImageElement.alt = `dice-${diceNo}`;
});

document.querySelector(".hold").addEventListener("click", function () {
  score[activePlayer - 1] += currentScore;
  currentScore = 0;

  document.getElementById(`total-score-pl${activePlayer}`).innerText =
    score[activePlayer - 1];
  document.getElementById(`current-score-pl${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;

  if (score[0] >= 100 || score[1] >= 100) {
    popupElement.style.display = "block";
    overlayElement.classList.add("overlay");
    document.querySelector(".hold").disabled = true;
    document.querySelector(".roll").disabled = true;
    popupDescElement.innerText =
      score[0] > score[2] ? "🎈Player 1 won!🎈🎈" : "🎈Player 2 won!🎈🎈";
  } else {
    gameWrapperElement.classList.toggle("pl2-active");
  }
});

const newGame = function () {
  score[0] = 0;
  score[1] = 0;
  activePlayer = 1;
  resetPlayer(1);
  resetPlayer(2);
  popupElement.style.display = "none";
  overlayElement.classList.remove("overlay");
  diceImageElement.classList.add("hidden");
  document.querySelector(".hold").disabled = false;
  document.querySelector(".roll").disabled = false;
  gameWrapperElement.classList.remove("pl2-active");
};

newElement.addEventListener("click", newGame);

document.getElementById("close").addEventListener("click", newGame);
