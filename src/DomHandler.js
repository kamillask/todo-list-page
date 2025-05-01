//add new list
//add to list
//remove from list
//edit list
//edit task
//delete task
//expand todo

import deleteIcon from "./images/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import addIconBox from "./images/add_box_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import editIcon from "./images/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"

export class DomHandler {

    newListButton = document.querySelector("#newListButton");
    newTaskButton = document.querySelector("#newTaskButton");
    addListDialog = document.querySelector("#addListDialog");
    addTaskDialog = document.querySelector("#addTaskDialog");
    cancelListDialog = document.querySelector("#cancelList");
    cancelTaskDialog = document.querySelector("#cancelTask");
    submitListDialog = document.querySelector("#submitListDialog");
    submitTaskDialog = document.querySelector("#submitTaskDialog");
    selectList = document.querySelector("#selectList");
    listContainer = document.querySelector("#listContainer");

    constructor(listHandler, taskHandler){
        this.listHandler = listHandler;
        this.taskHandler = taskHandler;
    }

    createItem(domType, elementClass){
        const element = document.createElement(domType);
        element.className = elementClass;
        return element;
    }

    clearDOM(domElement){
        const content = document.getElementById(domElement);
        while(content.firstChild){
            content.removeChild(content.firstChild);
        }
    }

    showLists(){
        this.clearDOM("listContainer");
        let index = 0;
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("div", "list");

            const deleteListButton = this.createItem("button", "deleteButton");
            deleteListButton.setAttribute("title", "Delete List");
            deleteListButton.id = "deleteButton-" + index;
            const deleteListButtonIcon = this.createItem("img", "icon");
            deleteListButtonIcon.src = deleteIcon;
            deleteListButton.addEventListener("click", () => {
                this.deleteList(this.listHandler.taskList[list]);
                this.showLists();
            })
            deleteListButton.appendChild(deleteListButtonIcon);

            const addTaskToListButton = this.createItem("button", "addTaskToList");
            addTaskToListButton.setAttribute("title", "Add a task to this List");
            addTaskToListButton.id = "addTaskToList-" + index;
            const addTaskToListIcon = this.createItem("img", "icon");
            addTaskToListIcon.src = addIconBox;
            const selectedIndex = "select-"+index;
            addTaskToListButton.addEventListener("click", () => {
                this.populateSelect();
                document.getElementById(selectedIndex).setAttribute("selected", "selected");
                addTaskDialog.showModal();
            });
            addTaskToListButton.appendChild(addTaskToListIcon);


            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = "list-" + index;
            this.showTasks(this.listHandler.taskList[list], listName, index);
            index++;
            listName.appendChild(deleteListButton);
            listName.appendChild(addTaskToListButton);
            listContainer.appendChild(listName);
            
        }
    }

    showTasks(list, container, index){
        console.log(list.taskList);
        for(let task in list.taskList){
            const taskName = this.createItem("div", "task");
            taskName.id = "task-"+index;
            console.log(list.taskList[task].name);
            taskName.textContent = list.taskList[task].name;
            const editTaskButton = this.createItem("button", "icon");
            editTaskButton.setAttribute("title", "Edit Task");
            editTaskButton.id = "editTask-"+index;
            const editTaskIcon = this.createItem("img", "icon");
            editTaskIcon.src = editIcon;
            editTaskButton.addEventListener("click", () => {
                this.populateSelect();
                document.getElementById("select-"+index).setAttribute("selected", "selected");
                addTaskDialog.showModal();
                //currently adds new task, doesnt overwrite current
            })
            editTaskButton.appendChild(editTaskIcon);
            taskName.appendChild(editTaskButton);
            container.appendChild(taskName);
        }
    }

    populateSelect(){
        this.clearDOM("selectList");
        let index = 0;
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("option", "select");
            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = "select-" + index;
            index++;
            this.selectList.appendChild(listName);
        }
    }

    deleteList(list){
        this.listHandler.deleteFromList(list);
    }

    deleteTask(list, task){
        this.listHandler.taskList[list].deleteFromList(task);
    }

    setUpEventListeners(){
        this.newListButton.addEventListener("click", () => {
            addListDialog.showModal();
        });
        
        this.submitListDialog.addEventListener("click", () => {
            const listNameInput = document.querySelector("#listName").value;
            if(listNameInput==="") {
                return;
            }
            const listInput = this.listHandler.createList(listNameInput);
            this.listHandler.addToList(listInput);
            this.showLists();
        });
        
        this.cancelListDialog.addEventListener("click", () => {
            addListDialog.close();
        })
        
        this.newTaskButton.addEventListener("click", () => {
            this.populateSelect();
            addTaskDialog.showModal();
        });
    
        this.submitTaskDialog.addEventListener("click", () => {
            const taskNameInput = document.querySelector("#taskName").value;
            const taskDescInput = document.querySelector("#taskDescription").value;
            const taskDueDateInput = document.querySelector("#taskDueDate").value;
            const taskInput = this.taskHandler.createTask(taskNameInput, taskDescInput, taskDueDateInput);
            this.listHandler.taskList[this.selectList.selectedIndex].addToList(taskInput); 
            this.showLists();
        });
    
        this.cancelTaskDialog.addEventListener("click", () => {
            this.addTaskDialog.close();
        });
    }
}
