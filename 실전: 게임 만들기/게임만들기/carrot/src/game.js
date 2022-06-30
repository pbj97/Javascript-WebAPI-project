'use strict';
export default class Game {
  constructor(carrotCount, gameDurationSec) {
    this.carrotCount = carrotCount;
    this.gameDurationSec = gameDurationSec;
    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  finishGame(f) {
    this.finishGame = f;
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDurationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finishGame && this.finishGame(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  init() {
    this.score = 0;
    this.gameScore.innerHTML = this.carrotCount;
  }
}
