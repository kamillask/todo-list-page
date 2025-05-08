import "./styles.css";
import { List } from "./List";
import { Task } from "./Task";
import { DomHandler} from "./DomHandler";

const listContainer = new List("Container");
listContainer.addToList(new List("Default"));
listContainer.taskList[0].addToList(new Task("Go for a run", " ", ""));
const taskHandler = new Task("task handler");
const domHandler = new DomHandler(listContainer, taskHandler);
domHandler.setUpEventListeners();
domHandler.showLists();
