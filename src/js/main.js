const userInput = document.getElementById("user-input");
const inputButton = document.getElementById("add-task");
const myListContainer = document.getElementById("uncompleted-tasks"); // måste ligga utanför loopen, annars blir det två div:ar
myListContainer.classList.add("container");

// container for list items

class Task {
  constructor(task, completed) {
    this.task = task;
    this.completed = completed;
  }
}

let toDoList = [
  new Task("gå till systemet", false),
  new Task("köp pizza", false),
  new Task("måla naglarna", false),
  // { task: "drick två folköl", completed: false },
  // { task: "röka cigg under köksfläkten", completed: false },
  // { task: "lyssna på goa låtar", completed: false },
];

// let toDoList = [];
// for (let i = 0; i < myToDos.length; i++) {
//   toDoList.push(myToDos[i]);
//   console.log(toDoList);
//   console.log("kolla");
// }
testFunction();

function addTodo() {
  const newToDo = new Task(userInput.value, false);
  toDoList.push(newToDo);
  console.log(toDoList);
  userInput.value = "";
  testFunction(newToDo);
}

inputButton.addEventListener("click", addTodo);

function testFunction() {
  document.getElementById("uncompleted-tasks").innerHTML = "";
  for (let i = 0; i < toDoList.length; i++) {
    const myList = document.createElement("ul");
    const myTask = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => {
      if (checkbox.checked === true) {
        toDoList[i].completed = true;
        myTask.classList.add("completed");
        myTask.appendChild(checkbox);
      } else {
        toDoList[i].completed = false;
        myTask.classList.remove("completed");
      }
    });

    myTask.innerHTML = toDoList[i].task; // funkar inte att skriva + checkbox, måste göra myTask.appendChild(checkbox)!

    checkbox.addEventListener("click", () => {
      handleClick(checkbox[i]);
    });
    function handleClick(checkbox) {
      // Varför e den grå? Vad försöker jag göra här?
      console.log("Du klickade på", toDoList[i]);
    }

    myTask.appendChild(checkbox);
    myList.appendChild(myTask);
    myListContainer.append(myList);
    //document.body.appendChild(myListContainer);
  }
}

/********* HÄR SLUTAR FOR-LOOPEN! *********/
