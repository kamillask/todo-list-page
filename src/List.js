export class List{
    constructor(name){
        this.name = name;
        this.taskList = [];
    }

    addToList(task){
        this.taskList.push(task);
    }

    deleteFromList(task){
        if(this.taskList.indexOf(task)===-1){
            return false;
        }
        this.taskList.splice(this.taskList.indexOf(task),1);
    }
}

