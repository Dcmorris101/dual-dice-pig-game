/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 (on either of the dice), all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Game Variables
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. generate random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. display result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    //3. update the round score IF the rolled number is not a 1
    if (dice !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //1. Add current score to global score
    scores[activePlayer] += roundScore;

    //2. Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //define what the winning score should be
    var input = document.querySelector('.winning-score-box').value;
    var winningScore;

    //Undefined, 0, null, or "" are coerced to false
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //3. Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('dice-1').style.display = 'none'
      document.getElementById('dice-2').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
    previousRoll = 0;
  }
});


function nextPlayer() {
  //Next player
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  gamePlaying = true;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;


  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

}












































//
