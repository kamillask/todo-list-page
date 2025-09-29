export class Task {
    constructor(name, desc, dueDate, listIndex, priority){
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.listIndex = listIndex;
        this.isComplete = false;
        this.priority = priority;
    }

    createTask(newName, newDesc, newDate, newIndex, newPriority){
        return new Task(newName, newDesc, newDate, newIndex, newPriority);
    }

    toggleComplete(){
        if (this.isComplete==true){
            this.isComplete=false;
        } else{
            this.isComplete=true;
        }
    }

    taskStatus(){
        if(this.isComplete==true){
            return "Complete";
        } else{
            return "Not Complete";
        }
    }
}