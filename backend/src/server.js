const express = require("express");
const cors = require("cors");
const pool = require("./config/database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Network Monitoring API is running",
  });
});

app.get("/api/health", async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const result = await connection.query("SELECT 1 AS connected");

    res.json({
      status: "ok",
      database: "connected",
      result: result[0],
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  } finally {
    if (connection) connection.release();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});