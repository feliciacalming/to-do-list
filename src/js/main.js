let myToDos = [
  { task: "tvätta", completed: false },
  { task: "handla", completed: false },
  { task: "städa", completed: false },
];

let listWrapper = document.createElement("div"); // måste ligga utanför loopen, annars blir det två div:ar
listWrapper.classList.add("wrapper");

for (let i = 0; i < myToDos.length; i++) {
  let myListContainer = document.getElementById("ulTag");
  let myTask = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  myTask.innerHTML = myToDos[i].task;
  // funkar inte att skriva + checkbox, måste göra myTask.appendChild(checkbox)!

  myTask.appendChild(checkbox);
  myListContainer.appendChild(myTask);
  listWrapper.append(myListContainer);
  document.body.appendChild(listWrapper);
  // let htmlString = "";
  // htmlString += "<li>" + myToDos[i].task + "</li>";
}
