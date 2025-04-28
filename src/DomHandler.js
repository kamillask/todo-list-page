//add new list
//add to list
//remove from list
//edit list
//edit task
//delete task
//expand todo

class DomHandler {

    createList(name){
        const listContainer = document.querySelector(".listContainer");
        const newList = document.createElement("div");
        newList.className(name);

        listContainer.appendChild(newList);
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
    
});

newTaskButton.addEventListener("click", () => {

});

