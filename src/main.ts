// Define the shape of a TodoItem
interface TodoItem {
    id: number;
    name: string;
    completed: boolean;
}

// Get DOM elements and initialize empty todo list
const form = document.querySelector("form")!;
const input = document.querySelector("#todo-input")! as HTMLInputElement;
const list = document.querySelector("#todo-list")!;
let todos: TodoItem[] = [];

// Render todo list
function renderTodos() {
    // Clear the list
    list.innerHTML = "";

    // Count the total and completed todos
    let totalTodos = todos.length;
    let completedTodos = todos.filter((todo) => todo.completed).length;

    // Update the counters in the DOM
    document.querySelector("#total-todos")!.textContent = totalTodos.toString();
    document.querySelector("#completed-todos")!.textContent = completedTodos.toString();

    // Add each todo item to the list
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div>
            <input type="checkbox" class="todo-checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
            <span>${todo.name}</span>
        </div>
        <div>
            <button class="edit-todo" data-id="${todo.id}">Edit</button>
            <button class="delete-todo" data-id="${todo.id}">Delete</button>
        </div>
      `;
        list.appendChild(li);
    });
}

// Handle form submission to add new todo
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the todo name from the input
    const todoName = input.value.trim();

    // Do not add empty todo
    if (!todoName) return;

    // Create a new todo item and add to the list
    const todo: TodoItem = {
        id: todos.length + 1,
        name: todoName,
        completed: false,
    };
    todos.push(todo);

    // Clear the input and focus on it
    input.value = "";
    input.focus();

    // Render the updated todo list
    renderTodos();
});

// Handle clicks on edit and delete buttons
list.addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;

    // Delete the todo item
    if (target.classList.contains("delete-todo")) {
        const id = parseInt(target.dataset.id!);
        todos = todos.filter((todo) => todo.id !== id);
        renderTodos();
    } 
    // Edit the todo item name
    else if (target.classList.contains("edit-todo")) {
        const id = parseInt(target.dataset.id!);
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            const newName = prompt("Enter new name for the to-do item", todo.name);
            if (newName) {
                todo.name = newName;
                renderTodos();
            }
        }
    }
});

// Handle checkbox changes to update completed status
list.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains("todo-checkbox")) {
        const id = parseInt(target.dataset.id!);
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = target.checked;
            renderTodos();
        }
    }
});

// Render the initial todo list
renderTodos();
