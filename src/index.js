import "./styles.css";
import { List } from "./List";
import { Task } from "./Task";
import { DomHandler} from "./DomHandler";

const listContainer = new List("Container");
const taskHandler = new Task("task handler");
const domHandler = new DomHandler(listContainer, taskHandler);
domHandler.setUpEventListeners();

// const testelement = domHandler.createItem("div", "something");
// testelement.textContent = "shutup";
// const listContainerDOM = document.querySelector(".listContainer");
// console.log(testelement);
// listContainerDOM.appendChild(testelement);

// const defaultList = new List("Default");
// const schoolWorkList = new List("School Work");
// listContainer.addToList(defaultList);
// listContainer.addToList(schoolWorkList)
// const store = new Task("Go to the Store", "Get bananas", "3.24.98");
// const park = new Task("Go to the park", "Get a workout in", "4.27.25");
// const sleep = new Task("Sleep", "It is important", "Today");
// defaultList.addToList(store);
// defaultList.addToList(park);
// defaultList.addToList(sleep);

// console.log(defaultList.taskList);
// defaultList.deleteFromList(park);
// console.log(defaultList.taskList);
// console.log(listContainer.taskList);
// listContainer.deleteFromList(schoolWorkList);
// console.log(listContainer.taskList);
