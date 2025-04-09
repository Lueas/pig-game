let randomNumber = 0;
let totalTurns = 1; // starting turn
let rolledThisTurn = 0;
let totalRolled = 0;
let hasStarted = false; // enabled after users enter their name
let hasWon = false; // by default the user hasnt won yet
let playerName = ""; // store the player name

function handleWelcome() {
  if (!hasStarted) {
    // clear the game menu
    const gameMenu = document.getElementById("game-menu");
    gameMenu.innerHTML = "";

    // create title and description
    const title = document.createElement("h2");
    title.textContent = "Welcome to Pig Dice Game!";
    const desc = document.createElement("p");
    desc.textContent = "Try to reach 100 points in as few turns as possible.";

    // create the form
    const nameForm = document.createElement("form");
    nameForm.id = "name-form";
    nameForm.onsubmit = function (event) {
      event.preventDefault();
      startGame();
    };

    // create input field
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "player-name";
    nameInput.placeholder = "Enter your name";
    nameInput.required = true;
    nameInput.style.marginBottom = "20px";
    nameInput.style.padding = "5px";

    // create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Start Game";
    submitButton.style.padding = "5px";

    // add elements to form
    nameForm.appendChild(title)
    nameForm.appendChild(desc)
    nameForm.appendChild(document.createElement("br"));
    nameForm.appendChild(nameInput);
    nameForm.appendChild(document.createElement("br"));
    nameForm.appendChild(submitButton);
    // add form to game menu
    gameMenu.appendChild(nameForm);
  }
}

function startGame() {
  // get player name from input
  const nameInput = document.getElementById("player-name");
  playerName = nameInput.value.trim();

  hasStarted = true; // start game

  // clear the menu
  const gameMenu = document.getElementById("game-menu");
  gameMenu.innerHTML = "";

  // create player info
  const playerInfo = document.createElement("h3");
  playerInfo.textContent = "Player: " + playerName;
  playerInfo.id = "player-info";

  // create game buttons
  const rollButton = document.createElement("button");
  rollButton.textContent = "Roll the dice";
  rollButton.id = "roll-button";
  rollButton.addEventListener("click", handleClick);

  const freezeButton = document.createElement("button");
  freezeButton.textContent = "Freeze turn";
  freezeButton.id = "freeze-button";
  freezeButton.addEventListener("click", handleFreeze);

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.id = "restart-button";
  restartButton.addEventListener("click", handleRestart);

  rollButton.style.marginRight = "10px";
  freezeButton.style.marginRight = "10px";
  restartButton.style.marginRight = "10px";

  // create game info text
  const rollText = document.createElement("p");
  rollText.id = "roll-text";

  const totalRollText = document.createElement("p");
  totalRollText.id = "total-roll-text";

  const turnText = document.createElement("p");
  turnText.id = "turn-text";

  // add all elements to game menu
  gameMenu.appendChild(playerInfo);
  gameMenu.appendChild(rollButton);
  gameMenu.appendChild(freezeButton);
  gameMenu.appendChild(restartButton);
  gameMenu.appendChild(rollText);
  gameMenu.appendChild(totalRollText);
  gameMenu.appendChild(turnText);

  showText();
}

function handleClick() {
  if (hasWon) return;

  randomNumber = Math.floor(Math.random() * 6 + 1); // rolls 1-6

  if (randomNumber == 1) {
    // if a one is rolled clear the total for the turn
    rolledThisTurn = 0;
    totalTurns = totalTurns + 1;
  } else {
    // else add the roll to the total for the turn
    rolledThisTurn = rolledThisTurn + randomNumber;
  }

  if (totalRolled + rolledThisTurn >= 100) {
    // check combined score
    youWon();
  }

  showText();
}

function handleFreeze() {
  if (hasWon) return; // if the user has won already, prevent them from still freezing

  // adds the total for the turn to the total overall
  totalRolled = totalRolled + rolledThisTurn;
  totalTurns = totalTurns + 1;
  // totalTurns =+ 1;
  rolledThisTurn = 0; // resets the turn total

  if (totalRolled >= 100) {
    youWon();
  }

  showText();
}

function handleRestart() {
  randomNumber = 0;
  totalTurns = 1; // starting turn
  rolledThisTurn = 0;
  totalRolled = 0;
  hasWon = false; // reset to default

  // remove win elements if they exist
  const newButton = document.getElementById("new-button");
  const newParagraph = document.getElementById("win-message");

  if (newButton) newButton.remove();
  if (newParagraph) newParagraph.remove();

  // Re-enable buttons
  const rollButton = document.getElementById("roll-button");
  const freezeButton = document.getElementById("freeze-button");
  const restartButton = document.getElementById("restart-button");

  if (rollButton) rollButton.disabled = false;
  if (freezeButton) freezeButton.disabled = false;
  if (restartButton) restartButton.disabled = false;

  showText();
}

function youWon() {
  hasWon = true; // the player has now won the game

  // create win messages
  const winMessage = document.createElement("h3");
  winMessage.textContent =
    "Congratulations " +
    playerName +
    "! You won in " +
    totalTurns +
    " turns with a score of " +
    (totalRolled + rolledThisTurn) +
    "!";
  winMessage.id = "win-message";
  winMessage.style.color = "green";
  winMessage.style.fontWeight = "bold";

  // create play again button
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.id = "new-button";
  playAgainButton.className = "game-button";

  playAgainButton.addEventListener("click", handleRestart);

  // get container and add new elements
  const container = document.getElementById("game-menu");
  container.appendChild(winMessage);
  container.appendChild(playAgainButton);

  // disable game buttons after winning
  const rollButton = document.getElementById("roll-button");
  const freezeButton = document.getElementById("freeze-button");
  const restartButton = document.getElementById("restart-button");

  if (rollButton) rollButton.disabled = true;
  if (freezeButton) freezeButton.disabled = true;
  if (restartButton) restartButton.disabled = true;
}

function showText() {
  const rollText = document.getElementById("roll-text");
  if (randomNumber == 0) {
    rollText.innerHTML = ""; // prevents the "rolled a 0" at launch
  } else if (randomNumber == 1) {
    rollText.innerHTML =
      "Oof! You rolled a " + randomNumber + " and lost your progress...";
    rollText.style.color = "red";
    rollText.style.fontWeight = "bold";
  } else {
    rollText.innerHTML = "Rolled a " + randomNumber + "!";
    rollText.style.color = "green";
    rollText.style.fontWeight = "bold";
  }

  document.getElementById("total-roll-text").innerHTML =
    "Total: " + totalRolled + " (This turn: " + rolledThisTurn + ")";
  document.getElementById("turn-text").innerHTML = "Turn: " + totalTurns;
}

// Initialize the game when page loads
document.addEventListener("DOMContentLoaded", () => {
  handleWelcome();
});
