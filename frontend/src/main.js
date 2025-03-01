document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  const taskInput = document.getElementById("task-input");
  const taskForm = document.getElementById("task-form");

  // ✅ Check if elements exist before using them
  if (!taskList || !taskInput || !taskForm) {
    console.error("Missing required elements in HTML!");
    return;
  }

  // Fetch and display tasks
  function fetchTasks() {
    fetch("https://vite-tasklist-api.onrender.com/tasks")
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

    fetch("https://vite-tasklist-api.onrender.com/tasks", {
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
