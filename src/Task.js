export class Task {
    constructor(title, desc, dueDate){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
    }

    createTask(newTitle, newDesc, newDate){
        return new Task(newTitle, newDesc, newDate);
    }
}