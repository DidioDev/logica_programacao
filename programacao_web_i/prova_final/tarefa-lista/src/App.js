//TODAS AS VARIÁVEIS
const todoTitleInput = document.querySelector("#todoTitle");
const addTodoForm = document.querySelector("#addTodoForm");
const todoListOutput = document.querySelector("#todoList");

let allTodoList = [];
let isEditMode = false;
let selectedIndex = null;

//FUNÇÃO PRINCIPAL
function start() {
    addTodoForm.addEventListener("submit", handleSubmitTodo);
    getTodoListFromLocalStorage();
    renderTodoList();
    todoTitleInput.focus();
}

//FUNÇÕES DE AÇÃO
function handleSubmitTodo(event) {
    event.preventDefault();
    todoTitleInput.focus();
    const title = todoTitleInput.value.trim();
    if (!title) {
        clearInput();
        return;
    }
    if (isEditMode) {
        handleUpdateTodo(title);
    } else {
        handleAddTodo(title);
    }

    clearInput();
    renderTodoList();
}

function toggleTodoUpdateMode(event) {
    const itemToUpdate = Number(event.currentTarget.id.split("-")[1]);
    todoTitleInput.value = allTodoList[itemToUpdate].title;
    selectedIndex = itemToUpdate;
    isEditMode = true;
    todoTitleInput.focus();
}

function handleAddTodo(todoTitle) {
    allTodoList.push({ title: todoTitle, isDone: false });
}

function handleUpdateTodo(todoTitle) {
    allTodoList[selectedIndex].title = todoTitle;
}

function handleDeleteTodo(event) {
    let confirmDelete = ("Você tem certeza que quer deletar a tarefa?");
    if (confirmDelete) {
        const itemIndexToDelete = Number(event.currentTarget.id.split("-")[1]);
        allTodoList = allTodoList.filter((_, i) => i !== itemIndexToDelete);
    }

    renderTodoList();
}

function handleCompleteTodo(event) {
    const itemToComplete = Number(event.currentTarget.id.split("-")[1]);
    allTodoList.forEach((todo, index) => {
        if (index === itemToComplete) {
            todo.isDone = !todo.isDone;
        }
    });

    renderTodoList();
}

//CONSTRUÇÃO HTML
function createTodoItemHTML(itemData, itemIndex) {
    const { title, isDone } = itemData;
    return `
    <li>
        <span class="todo-text ${isDone ? "completed" : ""}">
            <input type="checkbox" id="item-${itemIndex}" ${isDone ? "checked" : ""} />${title}</span>
        <div class="todo-list-controls">
            <button type="button" id="update_item-${itemIndex}" class="btn btn-update"> <i class="far fa-edit"></i> </button>
            <button type="button" id="del_item-${itemIndex}" class="btn btn-delete"> <i class="far fa-trash-alt"></i> </button>
        </div>  
    </li>
    `;
}

//FUNÇÃO DE RENDERIZAÇÃO
function renderTodoList() {
    if (allTodoList.length === 0) {
        removeTodoListFromLocalStorage();
        return (todoListOutput.innerHTML = "<p class='info-message'>Nenhuma tarefa cadastrada.<p>");
    }

    let todoListHTML = allTodoList.map((item, i) => {
        return createTodoItemHTML(item, i);
    });

    todoListOutput.innerHTML = todoListHTML.join("");

    allTodoList.forEach((_, i) => {
        const checkbox = document.getElementById(`item-${i}`);
        const deleteButton = document.getElementById(`del_item-${i}`);
        const updateButton = document.getElementById(`update_item-${i}`);
        checkbox.addEventListener("input", handleCompleteTodo);
        deleteButton.addEventListener("click", handleDeleteTodo);
        updateButton.addEventListener("click", toggleTodoUpdateMode);
    });

    setTodoListToLocalStorage();
}

//ARMAZENAMENTO LOCALSTORAGE
function getTodoListFromLocalStorage() {
    const localStorageList = JSON.parse(localStorage.getItem("todoList"));
    if (localStorageList) {
        allTodoList = localStorageList;
    }
}

function setTodoListToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(allTodoList));
}

function removeTodoListFromLocalStorage() {
    localStorage.removeItem("todoList");
}

//FUNÇÃO AUXILIAR
function clearInput() {
    isEditMode = false;
    todoTitleInput.value = "";
}

//EXECUTAR FUNÇÃO PRINCIPAL
start();