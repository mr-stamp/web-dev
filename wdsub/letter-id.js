

function iterateLetters() {
  let name = document.getElementById("input").value;
  
  for (let i = 0; i < name.length; i++) {
    let ltr = name.substr(i, 1);
    console.log("The next letter in your name is " + ltr);
  }
}
