let myToDos = [
  { task: "drick två folköl", completed: false },
  { task: "röka cigg under köksfläkten", completed: false },
  { task: "lyssna på goa låtar", completed: false },
];

let myListContainer = document.getElementById("uncompleted-tasks"); // måste ligga utanför loopen, annars blir det två div:ar
myListContainer.classList.add("container");

for (let i = 0; i < myToDos.length; i++) {
  let myList = document.getElementById("ulTag");
  let myTask = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("click", () => {
    if (checkbox.checked === true) {
      myToDos[i].completed = true;
      myTask.classList.add("completed");
      myTask.appendChild(checkbox);
    } else {
      myToDos[i].completed = false;
      myTask.classList.remove("completed");
    }
  });

  myTask.innerHTML = myToDos[i].task;
  // funkar inte att skriva + checkbox, måste göra myTask.appendChild(checkbox)!

  myTask.appendChild(checkbox);

  // Skapar en funktion som vid klick i checkbox skriver ut vilket
  //objekt man klickat på och om det är true eller false

  checkbox.addEventListener("click", () => {
    handleClick(checkbox[i]);
  });
  function handleClick(checkbox) {
    // Varför e den grå? Vad ska stå här?
    console.log("Du klickade på", myToDos[i]);
  }

  myList.appendChild(myTask);
  myListContainer.append(myList);
  document.body.appendChild(myListContainer);
  // document.body.appendChild(myCompletedTasks);
}

/********* HÄR SLUTAR FOR-LOOPEN! *********/

let newToDo = document.getElementById("user-input").value;
let inputButton = document.getElementById("add-task");
inputButton.addEventListener("click", () => {
  myToDos.push(newToDo);
  console.log(myToDos);
});
