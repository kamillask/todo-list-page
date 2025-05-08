export class Task {
    constructor(name, desc, dueDate){
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.isComplete = false;
    }

    createTask(newName, newDesc, newDate){
        return new Task(newName, newDesc, newDate);
    }

    toggleComplete(){
        if (this.isComplete==true){
            this.isComplete==false;
        } else{
            this.isComplete==true;
        }
    }
}