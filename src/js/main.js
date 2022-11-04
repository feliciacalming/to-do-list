import { ToDo } from "./models/todo";

//globala variabler
const userInput = document.getElementById("user-input");
const inputContainer = document.getElementById("input-container");
const inputButton = document.createElement("button");
const listContainer = document.getElementById("uncompleted-tasks"); // måste ligga utanför loopen, annars blir det två div:ar
const sortButton = document.getElementById("sort-btn");
const list = document.createElement("ul");
const clearButton = document.getElementById("clear-btn");

//klassnamn
inputButton.classList.add("input__button");
listContainer.classList.add("list-container");

//knappar
inputButton.innerHTML = "+";
inputButton.addEventListener("click", addTodo);
sortButton.addEventListener("click", sortAlphabetical);

//Knapp med eventlyssnare för att rensa listan. Nu laddas min hårdkodade lista
//in när man lägger till en ny to-do efter att ha rensat listan, vilket inte är
//meningen men det får jag fortsätta fila på efter inlämningen!

clearButton.addEventListener("click", () => {
  localStorage.clear();
  list.innerHTML = "";
  localStorage.setItem("to-do", JSON.stringify(toDoList));
});

let toDoList = [
  new ToDo("Gå till systemet", false),
  new ToDo("Köp pizza", false),
  new ToDo("Måla naglarna", false),
];

//startar funktionen så att min hårdkodade lista visas direkt
createToDoList();

//hämtar från localstorage när sidan laddas
window.addEventListener("load", () => {
  toDoList = JSON.parse(localStorage.getItem("to-do")).map((task) => {
    return new ToDo(task.task, task.completed);
  });

  createToDoList();
});

window.onload = setCaret();

//funktion som sätter markören i input-textrutan
function setCaret() {
  userInput.select();
  userInput.setSelectionRange(userInput.value.length, userInput.value.length);
}

console.log(toDoList);

//funktion för att lägga till ny to do
function addTodo() {
  const newToDo = new ToDo(userInput.value, false);
  toDoList.push(newToDo);
  console.log(toDoList);
  localStorage.setItem("to-do", JSON.stringify(toDoList));
  userInput.value = "";
  createToDoList(newToDo);
}

//eventlyssnare för att lägga till funktion genom att trycka "enter"
userInput.addEventListener("keypress", () => {
  if (event.key === "Enter") {
    addTodo();
  }
});

//funktion som skapar en synlig lista
function createToDoList() {
  list.innerHTML = "";
  for (let i = 0; i < toDoList.length; i++) {
    const itemContainer = document.createElement("span");
    const task = document.createElement("li");
    const checkbox = document.createElement("input");
    let deleteButton = document.createElement("button");

    list.classList.add("list");
    itemContainer.classList.add("list__item__container");
    task.classList.add("list__item");
    checkbox.classList.add("list__checkbox");
    deleteButton.classList.add("list__deletebutton");

    task.innerHTML = toDoList[i].task;
    // funkar inte att skriva + checkbox, måste göra myTask.appendChild(checkbox)!

    //eventlyssnare för att hantera när checkboxen är iklickad
    checkbox.type = "checkbox";
    checkbox.checked = toDoList[i].completed;
    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        toDoList[i].completed = true;
        task.classList.add("list__item--completed");
      } else {
        toDoList[i].completed = false;
        task.classList.remove("list__item--completed");
      }
      localStorage.setItem("to-do", JSON.stringify(toDoList));
    });

    //knapp med eventlyssnare för att ta bort en list item från listan
    deleteButton.innerHTML = "<i class='bi bi-trash'></i>";
    deleteButton.addEventListener("click", () => {
      toDoList.splice([i], 1);
      localStorage.setItem("to-do", JSON.stringify(toDoList));
      createToDoList();
    });

    task.appendChild(checkbox);
    task.appendChild(deleteButton);
    list.appendChild(task);
    listContainer.append(list);
  }
}

/********* HÄR SLUTAR FOR-LOOPEN! *********/

//funktion för att sortera listan alfabetiskt
function sortAlphabetical() {
  toDoList.sort((a, b) => {
    const taskA = a.task.toUpperCase(); // ignore upper and lowercase
    const taskB = b.task.toUpperCase(); // ignore upper and lowercase
    if (taskA < taskB) {
      return -1;
    }
    if (taskA > taskB) {
      return 1;
    }

    return 0;
  });

  createToDoList();
}

inputContainer.appendChild(inputButton);

console.log(toDoList);
