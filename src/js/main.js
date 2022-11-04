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
clearButton.addEventListener("click", () => {
  localStorage.clear();
  list.innerHTML = "";
  localStorage.setItem("to-do", JSON.stringify(toDoList));
});

// class ToDo {
//   constructor(task, completed) {
//     this.task = task;
//     this.completed = completed;
//   }
// }

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

// window.addEventListener("load", () => {
//   toDoList = JSON.parse(localStorage.getItem("to-do")) || [];
//   testFunction();
// });

// testFunction();
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

//funktion som skapar en synlig lista för mina
function createToDoList() {
  // listContainer.innerHTML = "";
  list.innerHTML = "";
  for (let i = 0; i < toDoList.length; i++) {
    //PROVAR ÄNDRA OM
    const itemContainer = document.createElement("span");
    const task = document.createElement("li");
    const checkbox = document.createElement("input");
    let deleteButton = document.createElement("button");

    list.classList.add("list");
    itemContainer.classList.add("list__item__container");
    task.classList.add("list__item");
    checkbox.classList.add("list__checkbox");
    deleteButton.classList.add("list__deletebutton");

    task.innerHTML = toDoList[i].task; // funkar inte att skriva + checkbox, måste göra myTask.appendChild(checkbox)!

    //eventlyssnare för att hantera när checkboxen är iklickad
    checkbox.type = "checkbox";
    checkbox.checked = toDoList[i].completed;
    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        toDoList[i].completed = true;
        //försöker få de klara att hamna längst ner i listan

        task.classList.add("list__item--completed");
        // task.appendChild(checkbox);
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

    // checkbox.addEventListener("click", () => {
    //   handleClick(checkbox[i]);
    // });
    // function handleClick(checkbox) {
    //   // Varför e den grå? Vad försöker jag göra här?
    //   console.log("Du klickade på", toDoList[i]);
    // }

    //det här fick soptunnan att ligga längst bort me nförlorade funktionen delete
    // list.appendChild(itemContainer);
    // itemContainer.appendChild(task);
    // task.appendChild(checkbox);
    // itemContainer.appendChild(deleteButton);
    // listContainer.appendChild(itemContainer);

    // SENASTE ÄNDRINGEN:
    task.appendChild(checkbox);
    task.appendChild(deleteButton);
    list.appendChild(task);
    listContainer.append(list);

    //sparar mitt gamla:
    // task.appendChild(checkbox);
    // task.appendChild(deleteButton);
    // list.appendChild(task);
    // listContainer.append(list);
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

    // names must be equal
    return 0;
  });

  createToDoList();
}

inputContainer.appendChild(inputButton);

console.log(toDoList);
