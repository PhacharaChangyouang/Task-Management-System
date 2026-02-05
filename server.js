const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== Database =====
const db = new sqlite3.Database(
  path.join(__dirname, "database", "tasks.db"),
  (err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

// ===== API Routes =====

// GET all tasks
app.get("/api/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET task by id
app.get("/api/tasks/:id", (req, res) => {
  const sql = "SELECT * FROM tasks WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Task not found" });
    res.json(row);
  });
});

// CREATE task
app.post("/api/tasks", (req, res) => {
  const { title, description, priority } = req.body;

  const sql = `
    INSERT INTO tasks (title, description, priority, status)
    VALUES (?, ?, ?, 'To Do')
  `;

  db.run(sql, [title, description, priority], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      id: this.lastID,
      title,
      description,
      priority,
      status: "To Do",
    });
  });
});

// UPDATE task (full update)
app.put("/api/tasks/:id", (req, res) => {
  const { title, description, priority, status } = req.body;

  const sql = `
    UPDATE tasks
    SET title = ?, description = ?, priority = ?, status = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [title, description, priority, status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task updated" });
    }
  );
});

// UPDATE task status only
app.patch("/api/tasks/:id/status", (req, res) => {
  const { status } = req.body;

  const sql = "UPDATE tasks SET status = ? WHERE id = ?";
  db.run(sql, [status, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Status updated" });
  });
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
  const sql = "DELETE FROM tasks WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted" });
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
