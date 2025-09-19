import "./styles.css";
import { List } from "./List";
import { Task } from "./Task";
import { DomHandler} from "./DomHandler";

const listContainer = new List("Container");
listContainer.addToList(new List("Default"));
listContainer.taskList[0].addToList(new Task("Go for a run", "Timed run at the park", "2025-03-24", 0, "low"));
listContainer.taskList[0].addToList(new Task("Contact Dr. Hastra", "Talk about your medication", "2025-05-01", 0, "low"));
listContainer.taskList[0].addToList(new Task("Unwind", "Take some time to youself", "2025-09-18", 0, "low"));
const taskHandler = new Task("task handler");
if(localStorage.getItem("listContainerStorage")!==null){
    console.log(typeof localStorage.getItem("listContainerStorage"));
    const listContainerJSON = JSON.parse(localStorage.getItem("listContainerStorage"));
    const domHandler = new DomHandler(listContainerJSON, taskHandler);
    domHandler.setUpEventListeners();
    domHandler.showLists();
} else{
    const domHandler = new DomHandler(listContainer, taskHandler);
    domHandler.setUpEventListeners();
    domHandler.showLists();
}
//const domHandler = new DomHandler(localStorage.getItem(listContainerStorage), taskHandler);
//domHandler.setUpEventListeners();
//domHandler.showLists();
