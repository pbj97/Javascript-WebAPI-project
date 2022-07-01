`use strict`;
import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;
const CARROT_SIZE = 80;

const game = new GameBuilder()
  .carrotCount(CARROT_COUNT)
  .bugCount(BUG_COUNT)
  .gameDuration(GAME_DURATION_SEC)
  .carrotSize(CARROT_SIZE)
  .build();

const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay?';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'YOU WON';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
