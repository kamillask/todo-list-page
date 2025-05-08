//expand todo

import deleteIcon from "./images/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import addIconBox from "./images/add_box_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import editIcon from "./images/edit_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import uncheckedIcon from "./images/radio_button_unchecked_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"
import checkedIcon from "./images/radio_button_checked_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png"

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

    createButton(name, desc, imgSrc, index){
        const button = this.createItem("button", name+"Button");
        button.setAttribute("title", desc);
        button.id = name+"-"+index;
        const icon = this.createItem("img", "icon");
        icon.id = name+"Icon-"+index;
        icon.src = imgSrc;
        button.appendChild(icon);
        return button;
    }

    showLists(){
        this.clearDOM("listContainer");
        let index = 0;
        for(let list in this.listHandler.taskList){
            const listEntity = this.createItem("div", "listEntity");
            const listName = this.createItem("div", "listName");
            const listControls = this.createItem("div", "listControls");
            const listMain = this.createItem("div", "listMain");


            const deleteListButton = this.createButton("delete", "Delete List", deleteIcon, index);
            deleteListButton.addEventListener("click", () => {
                this.deleteList(this.listHandler.taskList[list]);
                this.showLists();
            })

            const addTaskToListButton = this.createButton("addTaskToList", "Add a task to this List", addIconBox, index);
            const selectedIndex = "select-"+index;
            addTaskToListButton.addEventListener("click", () => {
                this.populateSelect();
                document.getElementById(selectedIndex).setAttribute("selected", "selected");
                this.submitTaskDialog.setAttribute("data-submit-type", "submitNew");
                addTaskDialog.showModal();
            });

            const editListButton = this.createButton("editList", "Edit List", editIcon, index);
            const editIndex = index;
            editListButton.addEventListener("click", () => {
                this.submitListDialog.setAttribute("data-submit-type", "submitEdit");
                this.submitListDialog.setAttribute("data-edit-index", editIndex);
                this.addListDialog.showModal();
            })

            listName.textContent = this.listHandler.taskList[list].name;
            listEntity.id = "list-" + index;
            listControls.appendChild(editListButton);
            listControls.appendChild(deleteListButton);
            listControls.appendChild(addTaskToListButton);
            listMain.appendChild(listName);
            listMain.appendChild(listControls);
            listEntity.appendChild(listMain);
            this.showTasks(this.listHandler.taskList[list], listEntity, index);
            listContainer.appendChild(listEntity);
            index++;
        }
    }

    showTasks(list, container, listIndex){
        let index = 0;
        for(let task in list.taskList){
            const taskEntity = this.createItem("div", "taskEntity");
            const taskControls = this.createItem("div", "taskControls");
            const taskMain = this.createItem("div", "taskMain");

            const checkedButton = this.createButton("check", "Mark as completed", uncheckedIcon, listIndex+task);
            checkedButton.addEventListener("click", () => {
                list.taskList[task].toggleComplete();
                console.log(list.taskList[task].isComplete);
                if(list.taskList[task].isComplete == false){
                    document.getElementById("checkIcon-"+listIndex+task).src = uncheckedIcon;
                } else{
                    document.getElementById("checkIcon-"+listIndex+task).src = checkedIcon;
                }
            })

            const taskName = this.createItem("div", "task");
            taskName.id = "task-"+listIndex+index;
            taskName.textContent = list.taskList[task].name;

            const editTaskButton = this.createButton("editTask", "Edit Task", editIcon, task);
            const indexToEdit = index;
            editTaskButton.addEventListener("click", () => {
                this.populateSelect();
                document.getElementById("select-"+listIndex).setAttribute("selected", "selected");
                this.submitTaskDialog.setAttribute("data-submit-type", "submitEdit");               
                this.submitTaskDialog.setAttribute("data-edit-index", indexToEdit);
                addTaskDialog.showModal();
            });

            const deleteTaskButton = this.createButton("deleteTask", "Delete Task", deleteIcon, task);
            deleteTaskButton.addEventListener("click", () => {
                this.deleteTask(list, list.taskList[task]);
                this.showLists();
            })
            index++;

            taskMain.appendChild(checkedButton);
            taskMain.appendChild(taskName);
            taskControls.appendChild(editTaskButton);
            taskControls.appendChild(deleteTaskButton);
            taskEntity.appendChild(taskMain);
            taskEntity.appendChild(taskControls);
            container.appendChild(taskEntity);
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
