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
            const listEntity = this.createItem("div", "listEntity");
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
                this.submitTaskDialog.setAttribute("data-submit-type", "submitNew");
                addTaskDialog.showModal();
            });
            addTaskToListButton.appendChild(addTaskToListIcon);

            const editListButton = this.createItem("button", "icon");
            editListButton.setAttribute("title", "Edit List");
            editListButton.id = "editList-"+index;
            const editListIcon = this.createItem("img", "icon");
            editListIcon.src = editIcon;
            const editIndex = index;
            editListButton.addEventListener("click", () => {
                this.submitListDialog.setAttribute("data-submit-type", "submitEdit");
                this.submitListDialog.setAttribute("data-edit-index", editIndex);
                this.addListDialog.showModal();
            })
            editListButton.appendChild(editListIcon);

            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = "list-" + index;
            listName.appendChild(editListButton);
            listName.appendChild(deleteListButton);
            listName.appendChild(addTaskToListButton);
            this.showTasks(this.listHandler.taskList[list], listName, index);
            
            
            // listName.appendChild(editListButton);
            // listName.appendChild(deleteListButton);
            // listName.appendChild(addTaskToListButton);

            listEntity.appendChild(listName);
            listContainer.appendChild(listEntity);
            index++;
        }
    }

    showTasks(list, container, listIndex){
        let index = 0;
        for(let task in list.taskList){
            const taskName = this.createItem("div", "task");
            taskName.id = "task-"+index;
            taskName.textContent = list.taskList[task].name;

            const editTaskButton = this.createItem("button", "icon");
            editTaskButton.setAttribute("title", "Edit Task");
            editTaskButton.id = "editTask-"+index;
            const editTaskIcon = this.createItem("img", "icon");
            editTaskIcon.src = editIcon;
            const indexToEdit = index;
            editTaskButton.addEventListener("click", () => {
                this.populateSelect();
                document.getElementById("select-"+listIndex).setAttribute("selected", "selected");
                this.submitTaskDialog.setAttribute("data-submit-type", "submitEdit");               
                this.submitTaskDialog.setAttribute("data-edit-index", indexToEdit);
                addTaskDialog.showModal();
            });

            const deleteTaskButton = this.createItem("button", "icon");
            deleteTaskButton.setAttribute("title", "Delete Task");
            deleteTaskButton.id = "deleteTask-"+index;
            const deleteTaskIcon = this.createItem("img", "icon");
            deleteTaskIcon.src = deleteIcon;
            deleteTaskButton.addEventListener("click", () => {
                this.deleteTask(list, list.taskList[task]);
                this.showLists();
            })
            index++;
            editTaskButton.appendChild(editTaskIcon);
            deleteTaskButton.appendChild(deleteTaskIcon);
            taskName.appendChild(editTaskButton);
            taskName.appendChild(deleteTaskButton);
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
        list.deleteFromList(task);
    }

    setUpEventListeners(){
        this.newListButton.addEventListener("click", () => {
            this.submitListDialog.setAttribute("data-submit-type", "submitNew");
            addListDialog.showModal();
        });
        
        this.submitListDialog.addEventListener("click", () => {
            const listNameInput = document.querySelector("#listName").value;
            if(listNameInput==="") {
                return;
            }
            if(this.submitListDialog.dataset.submitType==="submitEdit"){
                this.listHandler.taskList[this.submitListDialog.dataset.editIndex].name=listNameInput;
            }
            if(this.submitListDialog.dataset.submitType==="submitNew"){
                const listInput = this.listHandler.createList(listNameInput);
                this.listHandler.addToList(listInput);
            }
            
            this.showLists();
        });
        
        this.cancelListDialog.addEventListener("click", () => {
            addListDialog.close();
        })
        
        this.newTaskButton.addEventListener("click", () => {
            this.populateSelect();
            this.submitTaskDialog.setAttribute("data-submit-type", "submitNew");
            addTaskDialog.showModal();
        });
    
        this.submitTaskDialog.addEventListener("click", () => {
            const taskNameInput = document.querySelector("#taskName").value;
            const taskDescInput = document.querySelector("#taskDescription").value;
            const taskDueDateInput = document.querySelector("#taskDueDate").value;
            if(this.submitTaskDialog.dataset.submitType==="submitNew"){
                const taskInput = this.taskHandler.createTask(taskNameInput, taskDescInput, taskDueDateInput);
                this.listHandler.taskList[this.selectList.selectedIndex].addToList(taskInput);
            }
            if(this.submitTaskDialog.dataset.submitType==="submitEdit"){
                const taskInput = this.taskHandler.createTask(taskNameInput, taskDescInput, taskDueDateInput);
                console.log(taskInput);
                this.listHandler.taskList[this.selectList.selectedIndex].replace(this.submitTaskDialog.dataset.editIndex ,taskInput);
                console.log(this.listHandler.taskList[this.selectList.selectedIndex]);
            }
            this.showLists();
        });
    
        this.cancelTaskDialog.addEventListener("click", () => {
            this.addTaskDialog.close();
        });
    }
}
