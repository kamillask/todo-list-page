import "./styles.css";
import { List } from "./List";
import { Task } from "./Task";
import { DomHandler} from "./DomHandler";

const listContainer = new List("Container");
listContainer.addToList(new List("Default"));
listContainer.taskList[0].addToList(new Task("Go for a run", "Timed run at the park", "2025-03-24", 0, "Low"));
listContainer.taskList[0].addToList(new Task("Contact Dr. Hastra", "Talk about your medication", "2025-05-01", 0, "Low"));
listContainer.taskList[0].addToList(new Task("Unwind", "Take some time to youself", "2025-09-18", 0, "Low"));
const taskHandler = new Task("task handler");
if(localStorage.getItem("listContainerStorage")!==null){
    const listContainerJSON = JSON.parse(localStorage.getItem("listContainerStorage"));
    const listContainerNew = new List("Container");
    Object.assign(listContainerNew, listContainerJSON);

    for(let list in listContainerNew.taskList){
        const newList = new List(listContainerNew.taskList[list].name);
        Object.assign(newList, listContainerNew.taskList[list]);
        listContainerNew.taskList[list] = newList;
        for(let task in newList.taskList){
            const newTask = new Task(newList.taskList[task].name, newList.taskList[task].desc, newList.taskList[task].dueDate, newList.taskList[task].listIndex, newList.taskList[task].priority);
            Object.assign(newTask, newList.taskList[task]);
            newList.taskList[task] = newTask;
        }
    }
    const domHandler = new DomHandler(listContainerNew, taskHandler);
    domHandler.setUpEventListeners();
    domHandler.showLists();
} else{
    const domHandler = new DomHandler(listContainer, taskHandler);
    console.log("listcontainer is " + Object.prototype.toString.call(listContainer));
    domHandler.setUpEventListeners();
    domHandler.showLists();
}