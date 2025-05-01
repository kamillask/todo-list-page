export class List{
    constructor(name){
        this.name = name;
        this.taskList = [];
    }

    createList(name){
        return new List(name);
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

    replace(element, index){
        if(this.taskList.indexOf(element)===-1){
            return false;
        }
        this.taskList.splice(this.taskList.indexOf(element),1,index);
    }
}

