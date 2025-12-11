document.getElementById("taskForm").addEventListener("submit", function(e){
    e.preventDefault();
    
    let title = document.getElementById("title").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let status = document.getElementById("status").value;

    let task = { title, dueDate, priority, status };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.reset();
    loadTasks();
});

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let table = document.getElementById("taskTable");
    table.innerHTML = "";

    tasks.forEach((task, index) => {
        let row = `
            <tr>
                <td>${task.title}</td>
                <td class="${task.priority}">${task.priority}</td>
                <td>${task.dueDate}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option ${task.status === "To Do" ? "selected" : ""}>To Do</option>
                        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>
                <td>
                    <button onclick="editTask(${index})">Edit</button>
                </td>
                <td>
                    <button onclick="deleteTask(${index})">Delete</button>
                </td>
            </tr>`;
        table.innerHTML += row;
    });

    updateDashboard();
}

function updateStatus(index, newStatus) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks[index];

    document.getElementById("title").value = task.title;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("status").value = task.status;

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function searchTasks() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#taskTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

function updateDashboard() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("highCount").innerText = tasks.filter(t => t.priority === "High").length;
    document.getElementById("mediumCount").innerText = tasks.filter(t => t.priority === "Medium").length;
    document.getElementById("lowCount").innerText = tasks.filter(t => t.priority === "Low").length;
}

loadTasks();
