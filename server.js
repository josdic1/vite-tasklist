import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: { rejectUnauthorized: false }, // Required for Render
});

// ✅ Check if API is running
app.get("/", (req, res) => {
   res.json({ message: "Connected to PostgreSQL" });
});

// ✅ Fetch tasks
app.get("/tasks", async (req, res) => {
   try {
      const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
      res.json(result.rows);
   } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).json({ error: "Failed to fetch tasks" });
   }
});

// ✅ Add a task
app.post("/tasks", async (req, res) => {
   try {
      const { title } = req.body;
      const result = await pool.query("INSERT INTO tasks (title) VALUES ($1) RETURNING *", [title]);
      res.status(201).json(result.rows[0]);
   } catch (err) {
      console.error("Error adding task:", err);
      res.status(500).json({ error: "Failed to add task" });
   }
});

// ✅ Delete a task
app.delete("/tasks/:id", async (req, res) => {
   try {
      const { id } = req.params;
      await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
      res.status(204).send();
   } catch (err) {
      console.error("Error deleting task:", err);
      res.status(500).json({ error: "Failed to delete task" });
   }
});

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
