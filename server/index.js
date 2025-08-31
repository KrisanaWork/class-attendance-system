require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://krisanawork.github.io"],
  })
);

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_NEW === "prodution"
      ? { rejectUnauthorized: false }
      : false,
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.get("/api/users", async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM users");
    // res.json(result.rows);

    const mockUsers = [
      { id: 1, name: "Alice", email: "alice@gmail.com" },
      { id: 2, name: "Bob", email: "bob@gmail.com" },
    ];
    res.json(mockUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})