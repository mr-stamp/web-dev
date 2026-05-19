let urlParams = new URLSearchParams(window.location.search);
const P1_STRATS = urlParams.get("p1Strats");
const P2_STRATS = urlParams.get("p2Strats");
const CELL_CONTENTS = "(<input type='number'>, <input type='number'>)";

buildMatrix();



function buildMatrix() {
  const MATRIX = document.getElementById("matrix");
  
  for (let i = -1; i < P2_STRATS; i++) {
    let newRow = document.createElement("div");
    MATRIX.append(newRow);
    
    for (let j = -1; j < P1_STRATS; j++) {
      let newCell = document.createElement("div");
      if (i >= 0 && j >= 0) {
        newRow.setAttribute("class", "payoff-cell");
        newCell.innerHTML = CELL_CONTENTS;
      } else if (i >= 0) {
        newRow.setAttribute("class", "strat-cell");
        newCell.innerHTML = "t<sub>" + (i + 1) + "</sub>";
      } else if (j >= 0) {
        newRow.setAttribute("class", "strat-cell");
        newCell.innerHTML = "s<sub>" + (j + 1) + "</sub>";
      }
      
      newRow.append(newCell);
    }
  }
}

function resetMatrix() {
  
}

function computeDSE() {
  let p1PayElemArr = document.querySelectorAll(".payoff-cell input:first-child");
  let p2PayElemArr = document.querySelectorAll(".payoff-cell input:last-child");
  let p1PayArr = new Array(p1PayElemArr.length);
  let p2PayArr = new Array(p2PayElemArr.length);
  let p1Elim = new Array(p1PayElemArr.length);
  let p2Elim = new Array(p2PayElemArr.length);
  
  for (let i = 0; i < p1PayArr.length; i++) {
    p1PayArr[i] = p1PayElemArr[i].value;
    p1Elim[i] = false;
  }
  
  for (let i = 0; i < p2PayArr.length; i++) {
    p2PayArr[i] = p2PayElemArr[i].value;
    p2Elim[i] = false;
  }
  
  
  
  
}
