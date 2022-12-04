// Глобальные переменые
const todoList = document.getElementById('todo-list');
const userSelect = document.getElementById('user-todo');
const form = document.querySelector('form');
let todos = [];
let users = [];

// Attach Events (Привязка событий)
// Повесил событие срабатывания скрипта после загрузки страницы
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);

// Basic logic
//Функция получения имени по идентификатору
function getUserName(userId) {
    const user = users.find(u => u.id === userId);
    return user.name;
}

// Функция отрисовки списка задач
function printTodo({ id, userId, title, completed }) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(userId)}</b></span>`;

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;
    status.addEventListener('change', handleTodoChange);

    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.className = 'close';

    li.prepend(status);
    li.append(close);
    todoList.prepend(li);
}

// Функция создания пользователей
function createUserOption(user) {
    const option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;

    userSelect.append(option);
}

// Event logic (Функция получение данных и записи)
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then(values => {
        [todos, users] = values;

        // Отправка в разметку
        todos.forEach((todo) => printTodo(todo));
        users.forEach((user) => createUserOption(user));
    })
}

function handleSubmit(event) {
    event.preventDefault();

    createTodo({
        userId: Number(form.user.value),
        title: form.todo.value,
        completed: false,
    });
}

function handleTodoChange() {
    const todoId = this.parentElement.dataset.id;
    const completed = this.checked;

    toggleTodoComplete(todoId, completed);
}


// Async logic
// Получение всех задач
async function getAllTodos() {
    const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await responce.json();

    return data;
}

// Получение всех пользователей
async function getAllUsers() {
    const responce = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await responce.json();

    return data;
}

// Функция создания новой задачи
async function createTodo(todo) {
    const responce = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const newTodo = await responce.json();
    printTodo(newTodo);
}

// Функция изменения чекбокса
async function toggleTodoComplete(todoId, completed) {
    const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: completed }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Проверка изменения статуса
    const data = await responce.json();
    console.log(data);

    if (!responce.ok) {
        // error
    }
}