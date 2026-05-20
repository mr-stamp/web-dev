let endDiv = document.getElementById("end-of-game");
let winText = document.querySelector("#end-of-game p");
let squareArr = document.querySelectorAll("div.ttt-square");
let turnTrackerText = document.getElementById("symbol");

//Turn control vars. Let 0 be player X and 1 be player O
let wentFirst = 0;
let currentPlayer = 0;

for (const element of squareArr) {
  element.addEventListener("click", (event) => markSymbol(event)); 
}


/*
* 
*/
function markSymbol(event) {
  let clickedSquare = event.target;
  
  //Change text in selected cell
  if (clickedSquare.innerText == "") clickedSquare.innerText+= ((currentPlayer == 0) ? "X" : "O");
  
  //Remove event handler in selected cell
  
  if (checkForWinner()) endGame(false);
  else if (checkForFull()) endGame(true);
  else changePlayer();
}

/*
*
*/
function changePlayer() {
  currentPlayer = 1 - currentPlayer;
  turnTrackerText.innerText = ((currentPlayer == 0) ? "X" : "O");
}

/*
* return: true if a player has three in a row; false otherwisse
*/
function checkForWinner() {
  let hasWon = false;
  let winSym = ((currentPlayer == 0) ? "X" : "O");
  
  //Check for 3 in a horizontal row
  for (let i = 0; i < 3; i++) {
    if (squareArr[3 * i].innerText == winSym
        && squareArr[3 * i + 1].innerText == winSym
        && squareArr[3 * i + 2].innerText == winSym) hasWon = true;
  }
  
  //Check for 3 in vertical column
  for (let i = 0; i < 3; i++) {
    if (squareArr[i].innerText == winSym
        && squareArr[i + 3].innerText == winSym
        && squareArr[i + 6].innerText == winSym) hasWon = true;
  }
  
  //Check the diagonals
  if (squareArr[0].innerText == winSym
      && squareArr[4].innerText == winSym
      && squareArr[8].innerText == winSym) hasWon = true;
  else if (squareArr[2].innerText == winSym
      && squareArr[4].innerText == winSym
      && squareArr[6].innerText == winSym) hasWon = true;
  
  return hasWon;
}

/*
*
*/
function checkForFull() {
  let isFull = true;
  
  for (const element of squareArr) {
    if (element.innerText == "") isFull = false;
  }
  
  return isFull;
}

/*
* 
*/
function endGame(isDraw) {
  if (isDraw) {
    winText.innerText = "✌️Draw!✌️";
  } else {
    winText.innerText = "🎉" + ((currentPlayer == 0) ? "X" : "O") + " Player Wins!🎉";
    incrementScore();
  }
  
  endDiv.style.display = "block";
}

/*
* 
*/
function incrementScore() {
  let boardToInc;
  if (currentPlayer == 0) boardToInc = document.querySelectorAll("#x-score p")[1];
  else boardToInc = document.querySelectorAll("#o-score p")[1];
  
  boardToInc.innerText = Number(boardToInc.innerText) + 1;
}

/*
* 
*/
function resetGame() {
  for (const element of squareArr) {
    element.innerText = "";
  }
  currentPlayer = wentFirst;
  wentFirst = 1 - wentFirst;
  changePlayer();
  endDiv.style.display = "none";
}
