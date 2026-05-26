//UNCOMMENT TO GET PARAMS FROM LANDING PAGE
// let urlParams = new URLSearchParams(window.location.search);
// const P1_STRATS = urlParams.get("p1Strats");
// const P2_STRATS = urlParams.get("p2Strats");
const P1_STRATS = 3;
const P2_STRATS = 2;
const CELL_CONTENTS = "<span class='payoff-pair'>(<input type='number' value='0'>, <input type='number' value='0'>)</span>";

buildMatrix();



function buildMatrix() {
  const MATRIX = document.getElementById("matrix");
  
  for (let i = -1; i < P1_STRATS; i++) {
    let newRow = document.createElement("div");
    MATRIX.append(newRow);
    
    for (let j = -1; j < P2_STRATS; j++) {
      let newCell = document.createElement("div");
      if (i >= 0 && j >= 0) {
        newCell.classList.add("payoff-cell");
        newCell.innerHTML = CELL_CONTENTS;
      } else if (i >= 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "s<sub>" + (i + 1) + "</sub>";
      } else if (j >= 0) {
        newCell.classList.add("strat-cell");
        newCell.innerHTML = "t<sub>" + (j + 1) + "</sub>";
      }
      
      newRow.append(newCell);
    }
  }
}

function resetMatrix() {
  
}

/*
* Use the best response method to compute the NE of the matrix
*/
function computeNE() {
  let p1PayElemArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayElemArr = document.querySelectorAll(".payoff-cell input:last-child");
  let p1PayArr = new Array(p1PayElemArr.length);
  let p2PayArr = new Array(p2PayElemArr.length);
  let p1Best = new Array(p1PayElemArr.length);
  let p2Best = new Array(p2PayElemArr.length);
  
  //Fill array of Player 1's payoffs and best responses
  for (let i = 0; i < p1PayArr.length; i++) {
    p1PayArr[i] = p1PayElemArr[i].value;
    p1Best[i] = false;
  }
  
  //Fill array of Player 2's payoffs and best responses
  for (let i = 0; i < p2PayArr.length; i++) {
    p2PayArr[i] = p2PayElemArr[i].value;
    p2Best[i] = false;
  }
  
  //Go through each row of the matrix, comparing player 2's payoffs
  for (let i = 0; i < P1_STRATS; i++) {
    let largestT = -Infinity;
    
    //Identify the largest payoff to player 2 in the ith row
    for (let j = 0; j < P2_STRATS; j++) {
      if (p2PayArr[P2_STRATS*i + j] > largestT) largestT = p2PayArr[P2_STRATS*i + j];
    }
    
    //If a payoff is equal to the greatest in this row, mark it as a best response
    for (let j = 0; j < P2_STRATS; j++) {
      if (p2PayArr[P2_STRATS*i + j] >= largestT) p2Best[P2_STRATS*i + j] = true;
    }
  }
  
  //Go through each column of the matrix, comparing player 1's payoffs
  for (let j = 0; j < P2_STRATS; j++) {
    let largestS = -Infinity;
    
    //Identify the largest payoff to player 1 in the jth column
    for (let i = 0; i < P1_STRATS; i++) {
      if (p1PayArr[P2_STRATS*i + j] > largestS) largestS = p1PayArr[P2_STRATS*i + j];
    }
    
    //If a payoff is equal to the greatest in this column, mark it as a best response
    for (let i = 0; i < P1_STRATS; i++) {
      if (p1PayArr[P2_STRATS*i + j] >= largestS) p1Best[P2_STRATS*i + j] = true;
    }
  }
  
  let cells = document.querySelectorAll(".payoff-cell");
  
  //Iterate through every payoff now. If both players' payoffs are best responses in a cell, then mark it as an NE. Otherwise, mark it as eliminated.
  for (let k = 0; k < (P1_STRATS * P2_STRATS); k++) {
    cells[k].setAttribute("class", "payoff-cell");
    if (p1Best[k] && p2Best[k]) cells[k].classList.add("NE");
    else cells[k].classList.add("eliminated");
  }
  
}

function randomize() {
  let inputArr = document.querySelectorAll(".payoff-pair input");
  
  for (const elem of inputArr) {
    const MAX = 12;
    const MIN = -3;
    elem.value = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN);
  }
}
