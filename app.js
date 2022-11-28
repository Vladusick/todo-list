// Глобальные переменые
let todos = [];
let users = [];

// Attach Events
document.addEventListener('DOMContentLoaded', initApp);

initApp();

// Event logic (Функция получение данных и записи)
function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then(values => {
        [todos, users] = values;
    });

    
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