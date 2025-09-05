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

    createEntity(type, item, index){ //type(list or task), and pass the list or task
        const entity = this.createItem("div", type+"Entity");
        const name = this.createItem("div", type+"Name");
        const controls = this.createItem("div", type+"Controls");
        const main = this.createItem("div", type+"Main");

        const deleteButton = this.createButton("delete", "Delete "+type, deleteIcon, index);
        deleteButton.addEventListener("click", () => {
            if(type==="list"){
                this.deleteList(this.item.taskList[index]);
                this.showLists();
            }
            if(type==="task"){
                this.deleteTask(item, this.item.taskList[index]);
                this.showLists();
            }
            
        })

        const addButton = this.createButton("addTaskToList", "Add a task to this list", addIconBox, index);
        const selectedIndex = "select-"+index;
        addButton.addEventListener("click", () => {
            this.populateSelect();
            document.getElementById(selectedIndex).setAttribute("selected", "selected");
            this.submitTaskDialog.setAttribute("data-submit-type", "submitNew");
            addTaskDialog.showModal();
        });

        const editButton = this.createButton("edit"+type, "Edit "+type, editIcon, index);
        const editIndex = index;
        editButton.addEventListener("click", () => {
            if(type==="task"){
                this.populateSelect();
                document.getElementById("select-"+listIndex).setAttribute("selected", "selected");   
            }
            this.submitListDialog.setAttribute("data-submit-type", "submitEdit");
            this.submitListDialog.setAttribute("data-edit-index", editIndex);
            this.addListDialog.showModal();
        })

        if(type==="task"){
            const checkedButton = this.createButton("check", "Mark as completed", uncheckedIcon, item.listIndex+index);
            checkedButton.addEventListener("click", () => {
                item.taskList[task].toggleComplete();
                console.log(item.taskList[task].isComplete);
                if(item.taskList[task].isComplete == false){
                    document.getElementById("checkIcon-"+item.listIndex+index).src = uncheckedIcon;
                } else{
                    document.getElementById("checkIcon-"+item.listIndex+index).src = checkedIcon;
                }
            })
            entity.appendChild(checkedButton);
        }

        name.textContent = item.name;
        //when creating a new task, make it store the list index in the task? gets around list and task index issue
        if(type==="task"){
            entity.id = "task-"+item.listIndex+index;
        } else{
            entity.id = "list-"+index;
        }

        

        controls.appendChild(editButton);
        controls.appendChild(deleteButton);
        controls.appendChild(addButton);

        main.appendChild(name);
        if(type==="task"){
            const dueDate = this.createItem(("div", "taskDueDate"));
            dueDate.id = "taskDueDate-"+item.listIndex+index;
            taskDueDate.textContent = item.dueDate;
            main.appendChild(dueDate);
        }
        main.appendChild(controls);
        entity.appendChild(main);

        return entity;
    }


    showLists(){
        this.clearDOM("listContainer");
        let index = 0;
        for(let list in this.listHandler.taskList){
            const listEntity = this.createEntity("list", this.listHandler.taskList[list], index);
            // const listEntity = this.createItem("div", "listEntity");
            // const listName = this.createItem("div", "listName");
            // const listControls = this.createItem("div", "listControls");
            // const listMain = this.createItem("div", "listMain");


            // const deleteListButton = this.createButton("delete", "Delete List", deleteIcon, index);
            // deleteListButton.addEventListener("click", () => {
            //     this.deleteList(this.listHandler.taskList[list]);
            //     this.showLists();
            // })

            // const addTaskToListButton = this.createButton("addTaskToList", "Add a task to this List", addIconBox, index);
            // const selectedIndex = "select-"+index;
            // addTaskToListButton.addEventListener("click", () => {
            //     this.populateSelect();
            //     document.getElementById(selectedIndex).setAttribute("selected", "selected");
            //     this.submitTaskDialog.setAttribute("data-submit-type", "submitNew");
            //     addTaskDialog.showModal();
            // });

            // const editListButton = this.createButton("editList", "Edit List", editIcon, index);
            // //why make new index?
            // //const editIndex = index;
            // editListButton.addEventListener("click", () => {
            //     this.submitListDialog.setAttribute("data-submit-type", "submitEdit");
            //     this.submitListDialog.setAttribute("data-edit-index", editIndex);
            //     this.addListDialog.showModal();
            // })

            // listName.textContent = this.listHandler.taskList[list].name;
            // listEntity.id = "list-" + index;
            // listControls.appendChild(editListButton);
            // listControls.appendChild(deleteListButton);
            // listControls.appendChild(addTaskToListButton);
            // listMain.appendChild(listName);
            // listMain.appendChild(listControls);
            // listEntity.appendChild(listMain);


            // console.log(this.listHandler.taskList[list]);
            this.showTasks(this.listHandler.taskList[list], listEntity);
            listContainer.appendChild(listEntity);
            index++;
        }
    }

    showTasks(list, container){
        let index = 0;
        for(let task in list.taskList){
            console.log(list.taskList[task]);
            const taskEntity = this.createEntity("task", list.taskList[task], index);
            // const taskEntity = this.createItem("div", "taskEntity");
            // const taskName = this.createItem("div", "task");
            // const taskControls = this.createItem("div", "taskControls");
            // const taskMain = this.createItem("div", "taskMain");

            // // const taskDueDate = this.createItem(("div", "taskDueDate"));
            // // taskDueDate.id = "taskDueDate-"+listIndex+index;
            // // taskDueDate.textContent = list.taskList[task].dueDate;

            // const checkedButton = this.createButton("check", "Mark as completed", uncheckedIcon, listIndex+task);
            // checkedButton.addEventListener("click", () => {
            //     list.taskList[task].toggleComplete();
            //     console.log(list.taskList[task].isComplete);
            //     if(list.taskList[task].isComplete == false){
            //         document.getElementById("checkIcon-"+listIndex+task).src = uncheckedIcon;
            //     } else{
            //         document.getElementById("checkIcon-"+listIndex+task).src = checkedIcon;
            //     }
            // })

            
            // taskEntity.id = "task-"+listIndex+index;
            // taskName.textContent = list.taskList[task].name;

            // const editTaskButton = this.createButton("editTask", "Edit Task", editIcon, task);
            // const indexToEdit = index;
            // editTaskButton.addEventListener("click", () => {
            //     this.populateSelect();
            //     document.getElementById("select-"+listIndex).setAttribute("selected", "selected");                
            //     this.submitTaskDialog.setAttribute("data-submit-type", "submitEdit");               
            //     this.submitTaskDialog.setAttribute("data-edit-index", indexToEdit);
            //     addTaskDialog.showModal();
            // });

            // const deleteTaskButton = this.createButton("deleteTask", "Delete Task", deleteIcon, task);
            // deleteTaskButton.addEventListener("click", () => {
            //     this.deleteTask(list, list.taskList[task]);
            //     this.showLists();
            // })

            index++;

            // taskEntity.appendChild(checkedButton);
            // taskMain.appendChild(taskName);
            // taskMain.appendChild(taskDueDate);
            // taskControls.appendChild(editTaskButton);
            // taskControls.appendChild(deleteTaskButton);
            // taskEntity.appendChild(taskMain);
            // taskEntity.appendChild(taskControls);
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

    expandTask(task){

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
                const taskInput = this.taskHandler.createTask(taskNameInput, taskDescInput, taskDueDateInput, this.selectList.selectedIndex);
                this.listHandler.taskList[this.selectList.selectedIndex].addToList(taskInput);
                console.log(taskInput.listIndex);
            }
            if(this.submitTaskDialog.dataset.submitType==="submitEdit"){
                const taskInput = this.taskHandler.createTask(taskNameInput, taskDescInput, taskDueDateInput, this.selectList.selectedIndex);
                console.log(taskInput.listIndex);
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
