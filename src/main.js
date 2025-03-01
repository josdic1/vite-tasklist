const API_URL = "https://vite-tasklist-api.onrender.com";

async function fetchTasks() {
   try {
      const res = await fetch(`${API_URL}/tasks`);
      const tasks = await res.json();

      document.body.innerHTML = `<h1>Tasks</h1>`;
      tasks.forEach(task => {
         document.body.innerHTML += `<p>${task.title}</p>`;
      });
   } catch (error) {
      console.error("Error fetching tasks:", error);
      document.body.innerHTML = "<h1>Failed to load tasks</h1>";
   }
}

fetchTasks();
