

let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('PLease enter a valid number');
  } else if (guess < 1) {
    alert('PLease enter a number more than 1');
    
  } else if (guess > 100) {
    alert('PLease enter a  number less than 100');
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOO low`);
    if(randomNumber-guess<=5){
    displayMessage(`you are so near`)
    }
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOO High`);
    if(guess-randomNumber<=5){
      displayMessage(`you are so near`)
    }
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;

  // Add a "Start New Game" button after the game ends
  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'Start New Game';
  newGameButton.addEventListener('click', function () {
    startNewGame();
  });
  startOver.appendChild(newGameButton);
}

function startNewGame() {
  randomNumber = parseInt(Math.random() * 100 + 1);
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = '';
  remaining.innerHTML = `${11 - numGuess} `;
  userInput.removeAttribute('disabled');
  
  // Remove the paragraph element and the button
  startOver.removeChild(p);
  startOver.removeChild(startOver.lastChild);

  playGame = true;
}



