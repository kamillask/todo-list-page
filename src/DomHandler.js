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
    cancelDialog = document.querySelector("#cancel");
    submitListDialog = document.querySelector("#submitListDialog");
    listContainer = document.querySelector("#listContainer");

    constructor(listHandler, taskHandler){
        this.listHandler = listHandler;
        this.taskHandler = taskHandler;
    }

    createItem(type, className){
        const element = document.createElement(type);
        element.className = className;
        return element;
    }

    createDOMList(name){
        const newList = this.createItem("div", name);
        listContainer.appendChild(newList);
    }

    clearDOM(domElement){
        const content = document.getElementById(domElement);
        while(content.firstChild){
            content.removeChild(content.firstChild);
        }
    }

    showLists(){
        this.clearDOM("listContainer");
        for(let list in this.listHandler.taskList){
            const listName = this.createItem("div", this.listHandler.taskList[list].name);
            listName.textContent = this.listHandler.taskList[list].name;
            listContainer.appendChild(listName);
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
        
        this.cancelDialog.addEventListener("click", () => {
            addListDialog.close();
        })
        
        this.newTaskButton.addEventListener("click", () => {
            addTaskDialog.showModal();
        });
    }
}
