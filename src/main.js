import "./styles.css";
//Declarations
let btnAdd = document.querySelector("#btn-add");
let txtTask = document.querySelector(".task-name");
let tasksDiv = document.querySelector(".tasks");
let tasks = [];

//check if storage has tasks to load them
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((element) => {
    let div = document.createElement("div");
    let divText = document.createTextNode(element.task);
    let btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    div.className = "task";
    btnDelete.className = "add-task";
    btnDelete.setAttribute("data-index", element.id);
    btnDelete.id = element.id;
    tasksDiv.style.display = "block";
    div.append(divText);
    div.append(btnDelete);
    tasksDiv.append(div);
  });
}

//add click event to add the task to tasks div.
btnAdd.addEventListener("click", function () {
  console.log("Clicked");
  if (txtTask.value !== "") {
    let id = Math.random();
    let value = txtTask.value;
    tasks.push({ id: id, task: value });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    let div = document.createElement("div");
    let divText = document.createTextNode(txtTask.value);
    let btnDelete = document.createElement("button");
    tasksDiv.style.display = "block";
    div.className = "task";
    btnDelete.innerHTML = "Delete";
    btnDelete.className = "add-task";
    btnDelete.setAttribute("data-index", id);
    btnDelete.id = id;
    div.append(divText);
    div.append(btnDelete);
    tasksDiv.append(div);
  }
  txtTask.value = "";
});

//add click event to delete button
window.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-index")) {
    let btn = e.target;
    tasks.forEach(function (item, index, arr) {
      if (item.id.toString() === btn.id) {
        arr.splice(index, 1);
        window.localStorage.setItem("tasks", JSON.stringify(arr));
      }
    });
    btn.parentElement.remove();
    tasks.length === 0
      ? (tasksDiv.style.display = "none")
      : (tasksDiv.style.display = "block");
  }
});
