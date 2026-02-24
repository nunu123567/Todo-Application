let todo = JSON.parse(localStorage.getItem("todos")) || [];

const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const importance = document.getElementById("importance");

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todo));
}

function renderTodo() {
    todoList.innerHTML = "";

    todo.forEach((toDo, index) => {
        const li = document.createElement("li");
        li.textContent = `[${toDo.priority}] ${toDo.text}`;

        if(toDo.priority === "urgent") li.style.color = "red";
        if(toDo.priority === "normal") li.style.color = "orange";
        if(toDo.priority === "notUrgent") li.style.color = "green";

        li.addEventListener("click", function () {
            li.style.textDecoration =
                li.style.textDecoration === "line-through"
                    ? "none"
                    : "line-through";
        });
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "✕";
        removeButton.className = "removeButton";

        removeButton.addEventListener("click", function (e) {
            e.stopPropagation();
            removeTodo(index);
        });

        li.appendChild(removeButton);
        todoList.appendChild(li);
    });
}

function removeTodo(index) {
    todo.splice(index, 1);
    saveTodos();
    renderTodo();
}

addButton.addEventListener("click", function () {
    const text = todoInput.value.trim();
    const priority = importance.value;

    if (text === "") return;

    todo.push({
        text: text,
        priority: priority
    });
    saveTodos();
    renderTodo();
    todoInput.value = "";
});


renderTodo();

async function  fetchJoke(){
    try{
        const response = await fetch(
            "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
        );

        const data = await response.json();

        const jokeElement = document.getElementById("joke");

        if(data.type === "twopart") {
            jokeElement.textContent = `${data.setup} - ${data.delivery}`;
        } else {
            jokeElement.textContent = data.joke;
        }
    } catch (error) {
        document.getElementById("joke").textContent = "Couldn't load a joke today 😢";
    }
    
}

document.addEventListener("DOMContentLoaded",fetchJoke);
