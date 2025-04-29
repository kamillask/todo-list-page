//add new list
//add to list
//remove from list
//edit list
//edit task
//delete task
//expand todo

class DomHandler {

    constructor(listHandler, taskHandler){
        this.listHandler = listHandler;
        this.taskHandler = taskHandler;
    }

    createList(name){
        const listContainer = document.querySelector(".listContainer");
        const newList = document.createElement("div");
        newList.className(name);

        listContainer.appendChild(newList);
    }

    showLists(){
        for(let list in this.listHandler.taskList){
            const listContainer = document.querySelector(".listContainer");
            const listName = document.createElement("div");
            listName.className = this.listHandler.taskList[list].name;
            listContainer.appendChild(listName);
        }
    }

}

const newListButton = document.querySelector("#newListButton");
const newTaskButton = document.querySelector("#newTaskButton");
const addListDialog = document.querySelector("#addListDialog");
const cancelDialog = document.querySelector("#cancel");
const submitListDialog = document.querySelector("#submitListDialog");


newListButton.addEventListener("click", () => {
    addListDialog.showModal();
});

submitListDialog.addEventListener("click", () => {
    let listNameInput = document.querySelector("#listName");
    let listInput = new List(listNameInput.value); //this doesnt work
    listHandler.addToList(listInput);

});

newTaskButton.addEventListener("click", () => {

});

