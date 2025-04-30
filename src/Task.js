export class Task {
    constructor(name, desc, dueDate){
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
    }

    createTask(newName, newDesc, newDate){
        return new Task(newName, newDesc, newDate);
    }
}