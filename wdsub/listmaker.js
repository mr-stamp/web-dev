const TRASH_BUTTON = "<button class='trash-btn' onclick='deleteItem(this)'><svg viewBox='0 0 448 512' width='15' title='trash-alt'><path d='M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z' /></svg></button>";
const CHECK_BOX = "<button onclick='uncheckItem(this)'><svg viewBox='0 0 448 512' width='15' title='check-square' style='fill:gray'><path d='M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z' /></svg></button>";
const UNCHECK_BOX = "<button onclick='checkItem(this)'><svg viewBox='0 0 448 512' width='15' title='square'><path d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z' /></svg></button>";

let itemInput = document.querySelector("#item-input");
let list = document.getElementById("list");
let numItems = 0;
loadOldList();

document.addEventListener("keydown", (key) => {
  if (key.code == "Enter") addItem(key);
});

function addItem(event) {
  if (itemInput.value != "") {
    let _newItemText = itemInput.value;
    //Create new list item element
    let _elem = document.createElement("li");

    //Set the content and attributes of the new list item
    _elem.innerText = _newItemText;
    _elem.innerHTML = UNCHECK_BOX + _elem.innerHTML + TRASH_BUTTON;

    //Add new list item to list
    list.append(_elem);
    numItems++;
    
    
    //Save cookie for next time
    saveItem(itemInput.value);

    itemInput.value = "";
    itemInput.focus();
  }
}

function autoAddItem(str) {
  if (typeof str !== "undefined") {
    let _newItemText = str;
    //Create new list item element
    let _elem = document.createElement("li");

    //Set the content and attributes of the new list item
    _elem.innerText = _newItemText;
    _elem.innerHTML = UNCHECK_BOX + _elem.innerHTML + TRASH_BUTTON;

    //Add new list item to list
    list.append(_elem);
    numItems++;
    
    //Save cookie for next time
    saveItem(str);
  }
}


function clearList(event) {
  list.innerHTML = "";
  
  //TODO: delete all cookies
}

function deleteItem(elem) {
  elem.parentElement.remove();
  
  //TODO: delete specific cookie
}

function checkItem(elem) {
  let parentLI = elem.parentElement;
  parentLI.style.textDecoration = "solid gray line-through 0.1em";
  parentLI.style.color = "gray";
  parentLI.innerHTML = CHECK_BOX + parentLI.innerText + TRASH_BUTTON;
}

function uncheckItem(elem) {
  let parentLI = elem.parentElement;
  parentLI.style.textDecoration = "none";
  parentLI.style.color = "inherit";
  parentLI.innerHTML = UNCHECK_BOX + parentLI.innerText + TRASH_BUTTON;
}

function loadOldList() {
  cookieArr = document.cookie.split("; ");
  
  // for (let _i = 0; _i < cookieArr.length; _i++) {
  //   let _item = cookieArr[_i];
  //   let _key = _item.split("=")[0];
  //   let _value = _item.split("=")[1];
  //   if (_key.substr(0,4) == "item" && typeof _value !== "undefined") {
  //     autoAddItem(_value);
  //   }
  // }
  
  cookieArr.forEach((_item) => {
    let _key = _item.split("=")[0];
    let _value = _item.split("=")[1];
    if (_key.substr(0,4) == "item" && typeof _value !== "undefined") {
      autoAddItem(_value);
    }
  });
}

function saveItem(str) {
  document.cookie = "item" + numItems + "=" + str;
}
