//add new list
//add to list
//remove from list
//edit list
//edit task
//delete task
//expand todo

import deleteIcon from "./images/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"

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
        //let index = 0;
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("div", "list");

            const deleteListButton = this.createItem("button", "deleteButton");
            deleteListButton.setAttribute("title", "Delete List");
            const deleteListButtonIcon = this.createItem("img", "icon");
            deleteListButtonIcon.src = deleteIcon;
            deleteListButton.appendChild(deleteListButtonIcon);

            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = this.listHandler.taskList[list].name;
            this.showTasks(this.listHandler.taskList[list], listName);
            // index++;
            listName.appendChild(deleteListButton);
            listContainer.appendChild(listName);
            
        }
    }

    showTasks(list, container){
        console.log(list.taskList);
        for(let task in list.taskList){
            const taskName = this.createItem("div", "task");
            console.log(list.taskList[task].name);
            taskName.textContent = list.taskList[task].name;
            container.appendChild(taskName);
        }
    }

    populateSelect(){
        this.clearDOM("selectList");
        // let index = 0;
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("option", "select");
            listName.textContent = this.listHandler.taskList[list].name;
            // listName.id = "select-" + index;
            // index++;
            this.selectList.appendChild(listName);
        }
    }

    deleteList(){

    }

    deleteTask(){
        
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
