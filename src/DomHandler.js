//add new list
//add to list
//remove from list
//edit list
//edit task
//delete task
//expand todo

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

    createItem(domType, elementType){
        const element = document.createElement(domType);
        element.className = elementType;
        return element;
    }

    // createDOMList(name){
    //     const newList = this.createItem("div", name);
    //     listContainer.appendChild(newList);
    // } *****this was never used

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
            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = index;
            // console.log(listName + " index " + index);
            index++;
            listContainer.appendChild(listName);
        }
    }

    populateSelect(){
        this.clearDOM("selectList");
        let index = 0;
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("option", "select");
            listName.textContent = this.listHandler.taskList[list].name;
            listName.id = index;
            console.log(listName.textContent + " index " + index);
            console.log(listName.id);
            index++;
            this.selectList.appendChild(listName);
        }
    }

    setUpEventListeners(){
        this.newListButton.addEventListener("click", () => {
            addListDialog.showModal();
        });
        
        this.submitListDialog.addEventListener("click", () => {
            const listNameInput = document.querySelector("#listName").value;
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
            taskInput.textContent = taskNameInput;
            //console.log(this.listHandler.taskList.indexOf(this.selectList.value));
            //console.log(this.listHandler.taskList[this.listHandler.taskList.indexOf(this.selectList.value)]);
            console.log(this.selectList.value + " index " + this.selectList.value.id);
            this.listHandler.taskList[this.selectList.value.id].addToList(taskInput); //use id of list, set id as the nth element in the array, seach by id which is the index**************************************************
            const listToAddTo = document.getElementById(this.listHandler.taskList[this.selectList.value]);
            listToAddTo.appendChild(taskInput);
        });

        this.cancelTaskDialog.addEventListener("click", () => {
            this.addTaskDialog.close();
        });
    }
}
