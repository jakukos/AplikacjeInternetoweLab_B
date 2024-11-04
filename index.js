function addTask() {
    const date = document.getElementById('selectDate');
    const task = document.getElementById('task');
    const taskList = document.getElementById('taskList');

    if (task.value === '') {
        alert('Pole nie może być puste!!');
    } else {
        let li = document.createElement('li');
        li.textContent = `${task.value} | ${date.value}`;

        let editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.onclick = function() {
            editTask(li);
        };

        li.appendChild(editButton);
        taskList.appendChild(li);

        task.value = '';
        date.value = '';
        saveToLocalStorage();
    }
}

function editTask(taskItem) {
    const taskText = taskItem.firstChild.textContent.split(' | ')[0];
    const taskDate = taskItem.firstChild.textContent.split(' | ')[1];

    document.getElementById('task').value = taskText;
    document.getElementById('selectDate').value = taskDate;

    taskItem.remove();
    saveToLocalStorage();
}

function deleteTask() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');

    for (let i = tasks.length - 1; i >= 0; i--) {
        if (tasks[i].classList.contains('checked')) {
            taskList.removeChild(tasks[i]);
        }
    }
    saveToLocalStorage();
}

function saveToLocalStorage(){
    localStorage.setItem('taskList', taskList.innerHTML);
}

function loadFromLocalStorage(){
    if(localStorage.getItem('taskList')){
        taskList.innerHTML = localStorage.getItem('taskList');
    }
}

function searchTasks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tasks = document.getElementById('taskList').getElementsByTagName('li');

    for (let task of tasks) {
        const taskText = task.textContent.toLowerCase();
        const originalText = task.textContent;

        if (taskText.includes(searchInput)) {
            const highlightedText = originalText.replace(new RegExp(searchInput, 'gi'), (match) => `<span class="highlight">${match}</span>`);
            task.innerHTML = highlightedText;
            task.style.display = '';
        } else {
            task.innerHTML = originalText;
            task.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // Zaznaczanie zadań do usunięcia
    const taskList = document.getElementById('taskList');
    taskList.addEventListener('click', function(e){
        if(e.target.tagName === 'LI'){
            e.target.classList.toggle('checked');
            saveToLocalStorage();
        }
    });

    // Blokada wybrania daty w przeszłości
    const dateInput = document.getElementById('selectDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    document.getElementById('search').addEventListener('input', searchTasks);

    loadFromLocalStorage();
});