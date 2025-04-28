export class List{
    constructor(name){
        this.name = name;
        this.taskList = [];
    }

    addToList(element){
        this.taskList.push(element);
    }

    deleteFromList(element){
        if(this.taskList.indexOf(element)===-1){
            return false;
        }
        this.taskList.splice(this.taskList.indexOf(element),1);
    }
}

