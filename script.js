"use strict";

let currentScore = 0;
let scorePl1 = 0;
let scorePl2 = 0;
let isPlayerOneActive = true;

const diceImageElement = document.querySelector(".dice");
const newElement = document.querySelector(".new-game");
const currentScorePl1Element = document.getElementById("current-score-pl1");
const currentScorePl2Element = document.getElementById("current-score-pl2");
const scorePl1Element = document.getElementById("total-score-pl1");
const scorePl2Element = document.getElementById("total-score-pl2");
const gameWrapperElement = document.querySelector(".game-wrapper");

document
  .querySelector(".roll")
  .addEventListener("click", function rollDice(player) {
    const diceNo = Math.trunc(Math.random() * 6 + 1);

    if (isPlayerOneActive) {
      if (diceNo === 1) {
        currentScore = 0;

        //switch to the other player
        isPlayerOneActive = false;
        gameWrapperElement.classList.add("plTwo-active");
      } else {
        currentScore += diceNo;
      }
      currentScorePl1Element.textContent = currentScore;
    } else {
      if (diceNo === 1) {
        currentScore = 0;

        //switch to the other player
        isPlayerOneActive = true;
        gameWrapperElement.classList.remove("plTwo-active");
      } else {
        currentScore += diceNo;
      }
      currentScorePl2Element.innerText = currentScore;
    }

    if (diceImageElement.classList.contains("hidden"))
      diceImageElement.classList.remove("hidden");
    diceImageElement.src = `assets/dice-${diceNo}.png`;
    diceImageElement.alt = `dice-${diceNo}`;
  });

document.querySelector(".hold").addEventListener("click", function () {
  if (isPlayerOneActive) {
    scorePl1 += currentScore;
    currentScore = 0;
    scorePl1Element.innerText = scorePl1;
    currentScorePl1Element.textContent = currentScore;
    isPlayerOneActive = false;
  } else {
    scorePl2 += currentScore;
    currentScore = 0;
    scorePl2Element.innerText = scorePl2;
    currentScorePl2Element.innerText = currentScore;
    isPlayerOneActive = true;
  }
  gameWrapperElement.classList.toggle("plTwo-active");
});

newElement.addEventListener("click", function () {
  currentScore = 0;
  scorePl1 = 0;
  scorePl2 = 0;
  isPlayerOneActive = true;
  scorePl1Element.innerText = scorePl1;
  currentScorePl1Element.textContent = currentScore;
  scorePl2Element.innerText = scorePl2;
  currentScorePl2Element.innerText = currentScore;
  if (!diceImageElement.classList.contains("hidden"))
    diceImageElement.classList.add("hidden");

  if (gameWrapperElement.classList.contains("plTwo-active"))
    diceImageElement.classList.remove("plTwo-active");
});
