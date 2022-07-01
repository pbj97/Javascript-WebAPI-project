'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

export class GameBuilder {
  carrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }

  bugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }

  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotSize(carrotSize) {
    this.carrotSize = carrotSize;
    return this;
  }

  build() {
    return new Game(
      this.carrotCount,
      this.bugCount,
      this.gameDuration,
      this.carrotSize
    );
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDurationSec, carrotSize) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDurationSec = gameDurationSec;

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');

    this.gameField = new Field(carrotCount, bugCount, carrotSize);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

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
        this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
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
    this.gameField.init();
  }
}
