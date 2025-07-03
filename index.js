let scores, currentScore, activePlayer, playing;

const diceImg = document.getElementById('diceimages');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const current1 = document.getElementById('current1');
const current2 = document.getElementById('current2');
const btnNew = document.querySelector('.new-game button');
const btnRoll = document.querySelector('.roll-dice button');
const btnHold = document.querySelector('.hold button');
const player1El = document.querySelector('.player1');
const player2El = document.querySelector('.player2');

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  diceImg.src = './images/dice-1.jpg';

  player1El.style.opacity = '1';
  player2El.style.opacity = '1';

  player1El.style.border = '4px solid black';
  player2El.style.border = 'none';
}

function switchPlayer() {
  document.getElementById(`current${activePlayer + 1}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player1El.style.opacity = activePlayer === 0 ? '1' : '0.8';
  player2El.style.opacity = activePlayer === 1 ? '1' : '0.8';

  player1El.style.border = activePlayer === 0 ? '4px solid black' : 'none';
  player2El.style.border = activePlayer === 1 ? '4px solid black' : 'none';
}

btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  diceImg.src = `./images/dice-${dice}.jpg`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score${activePlayer + 1}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceImg.src = '';
    alert(`Player ${activePlayer + 1} wins!`);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

init();