const API_URL = "/api/tasks";

const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const filterSelect = document.getElementById("filter-status");

// ===== Fetch & Render =====
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  const filter = filterSelect.value;

  tasks
    .filter(task => filter === "ALL" || task.status === filter)
    .forEach(task => {
      const div = document.createElement("div");

      // map status → class
const statusClass = getStatusClass(task.status);
div.className = `task-card ${statusClass}`;

      div.className = `task-card ${statusClass}`;

      div.innerHTML = `
        <span class="status-label">${task.status}</span>
        <h3>${task.title}</h3>
        <p>${task.description || ""}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>

        <select onchange="updateStatus(${task.id}, this.value)">
          <option ${task.status === "To Do" ? "selected" : ""}>To Do</option>
          <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${task.status === "Done" ? "selected" : ""}>Done</option>
        </select>

        <button onclick="deleteTask(${task.id})">Delete</button>
      `;

      taskList.appendChild(div);
    });
}


// ===== Create Task =====
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, priority }),
  });

  taskForm.reset();
  fetchTasks();
});

// ===== Delete Task =====
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// ===== Update Status =====
async function updateStatus(id, status) {
  await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  fetchTasks();
}

// ===== Filter =====
filterSelect.addEventListener("change", fetchTasks);

// ===== Init =====
fetchTasks();
