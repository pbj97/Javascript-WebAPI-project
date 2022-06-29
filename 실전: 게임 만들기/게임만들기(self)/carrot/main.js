`use strict`;

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_SIZE = 50;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', (e) => {
  if (!started) {
    return;
  }
  if (e.target.matches('.carrot')) {
    const toBeDeleted = document.querySelector(
      `.carrot[data-id="${e.target.dataset.id}"]`
    );
    playSound(carrotSound);
    toBeDeleted.remove();
    score++;
    gameScore.innerHTML = CARROT_COUNT - score;
    if (CARROT_COUNT == score) {
      stopGame(true);
    }
  } else if (e.target.matches('.bug')) {
    stopGame(false);
  }
});

popUpRefresh.addEventListener('click', () => {
  field.innerHTML = '';
  hidePopUp();
  hideTimerAndScore();
  showGameButton();
  showStartButton();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
  playSound(alertSound);
}

function stopGame(win) {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText(win ? 'YOU WON' : 'YOU LOST');
  stopSound(bgSound);
  win ? playSound(winSound) : playSound(bugSound);
}

function showStartButton() {
  const icon = gameBtn.querySelector('.fa-stop');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showGameButton() {
  gameBtn.style.visibility = 'visible';
}
function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}
function hideTimerAndScore() {
  gameTimer.style.visibility = 'hidden';
  gameScore.style.visibility = 'hidden';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      stopGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerHTML = CARROT_COUNT;
  score = 0;

  addItem('carrot', CARROT_COUNT, 'img/carrot.png', CARROT_SIZE);
  addItem('bug', BUG_COUNT, 'img/bug.png', BUG_SIZE);
}

function addItem(className, count, imagPath, size) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - size;
  const y2 = fieldRect.height - size;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imagPath);
    item.setAttribute('data-id', `${i}`);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}
