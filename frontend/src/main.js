document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const taskInput = document.getElementById("task-input");
  const taskForm = document.getElementById("task-form");

  // Fetch and display tasks
  function fetchTasks() {
    fetch("/api/tasks") // ✅ Vite proxy will map this to `http://localhost:4000/tasks`
      .then(res => res.json())
      .then(data => {
        taskList.innerHTML = data.map(task => `<li>${task.title}</li>`).join("");
      })
      .catch(err => console.error("Error fetching tasks:", err));
  }

  // Add a new task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then(res => res.json())
      .then(() => {
        taskInput.value = ""; // Clear input
        fetchTasks(); // Refresh task list
      })
      .catch(err => console.error("Error adding task:", err));
  });

  // Initial fetch on page load
  fetchTasks();
});
