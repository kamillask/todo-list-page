
# Todo List Page

A dynamic task and list management application that allows users to create, edit, and manage tasks and lists with priorities, completion tracking, and persistent storage using localStorage. The UI updates automatically as tasks and lists are added, edited, or marked complete.


## Features

- Create, edit, and delete lists
- Create, edit, and delete tasks
- Assign tasks to specific lists
- Mark tasks as complete/incomplete
- View task details in an expanded modal
- Color-coded task priorities (Low, Medium, High)
- Persistent storage via localStorage
- Clean modular architecture using ES Modules

## Architecture
- List → Manages task collections
- Task → Represents individual tasks with details and status
- DomHandler → Handles DOM creation, events, modals, and updates
- localStorage → Saves and retrieves task/list data
## Tech Stack
- JavaScript (ES6+)
- HTML
- CSS
- localStorage for persistent data
- ES Modules for modular architecture
## Run Locally

Clone the project

```bash
  git clone https://github.com/kamillask/todo-list-page
```

Go to the project directory

```bash
  cd todo-list-page
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Screenshots

![Default View](https://github.com/kamillask/todo-list-page/blob/main/todoview.png)
![Create Task](https://github.com/kamillask/todo-list-page/blob/main/todonewtask.png)
![View Task](https://github.com/kamillask/todo-list-page/blob/main/todoviewtask.png)

