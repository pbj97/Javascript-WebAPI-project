`use strict`;
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';
import Game from './game.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;
const CARROT_SIZE = 80;

const game = new Game(CARROT_COUNT, GAME_DURATION_SEC);
const gameField = new Field(CARROT_COUNT, BUG_COUNT, CARROT_SIZE);
const gameFinishBanner = new PopUp();

game.setClickListener(() => {
  if (game.started) {
    stopGame();
  } else {
    startGame();
  }
});
game.finishGame(finishGame);

gameField.setClickListener(onItemClick);
function onItemClick(item) {
  if (!game.started) {
    return;
  }
  if (item === 'carrot') {
    game.score++;
    game.updateScoreBoard();
    if (game.score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}

gameFinishBanner.setClickListener(() => {
  startGame();
});

function startGame() {
  game.started = true;
  initGame();
  game.showStopButton();
  game.showTimerAndScore();
  game.startGameTimer();
  sound.playBackground();
}

function stopGame() {
  game.started = false;
  game.stopGameTimer();
  game.hideGameButton();
  gameFinishBanner.showWithText('REPLAY?');
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  game.started = false;
  game.stopGameTimer();
  game.hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
}

function initGame() {
  game.init();
  gameField.init();
}
