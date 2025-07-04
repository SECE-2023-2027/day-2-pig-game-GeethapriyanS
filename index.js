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

let scores, currentScore, activePlayer, playing,player1,player2;

function init() {
  player1=0;
  player2=0;
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
  switch (activePlayer) {
    case 0:
      activePlayer = 1;
      break;
    case 1:
      activePlayer = 0;
      break;      
  }

  switch (activePlayer) {
    case 0: 
      player2El.style.opacity = '0.5';
      player1El.style.opacity = '1';
      break;
    case 1:
      player1El.style.opacity = '0.5';
      player2El.style.opacity = '1';
      break;
  }
  
  switch (activePlayer) {
    case 0:             
      player2El.style.border = 'none';
      player1El.style.border = '4px solid black';
      break;
    case 1:
      player1El.style.border = 'none';
      player2El.style.border = '4px solid black';
      break;
  } 
}

btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }

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
  if (!playing) {
    return;
  }

  if(activePlayer === 0) {
    player1 += currentScore;
  }
  else {
    player2 += currentScore;
  }
  if( activePlayer === 0) {
    score1.textContent = player1; 
  }
  else {
    score2.textContent = player2; 
  }

  if (player1 >= 100) {
    playing = false;
    diceImg.src = '';
    alert(`Player 1 wins!`);
  } else if (player2 >= 100) {
    playing = false;
    diceImg.src = '';
    alert(`Player 2 wins!`);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

init();