const express = require("express");
const pool = require("../config/database");
const crypto = require("crypto");

const router = express.Router();

// GET /api/devices
router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();

    const devices = await connection.query(
      "SELECT * FROM devices ORDER BY created_at DESC"
    );

    res.json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);

    res.status(500).json({
      message: "Failed to fetch devices",
    });
  } finally {
    if (connection) connection.release();
  }
});

// GET /api/devices/:id
router.get("/:id", async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const devices = await connection.query(
      "SELECT * FROM devices WHERE id = ?",
      [id]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    res.json(devices[0]);
  } catch (error) {
    console.error("Error fetching device:", error);

    res.status(500).json({
      message: "Failed to fetch device",
    });
  } finally {
    if (connection) connection.release();
  }
});

// POST /api/devices
router.post("/", async (req, res) => {
  let connection;

  try {
    const {
      host,
      dev,
      ip,
      group,
      severity,
      status,
    } = req.body;

    const id = crypto.randomUUID();

    connection = await pool.getConnection();

    await connection.query(
      `INSERT INTO devices
        (id, host, dev, ip_address, device_group, severity, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        host,
        dev,
        ip,
        group,
        severity || "normal",
        status || "unknown",
      ]
    );

    res.status(201).json({
      message: "Device created successfully",
      device: {
        id,
        host,
        dev,
        ip,
        group,
        severity: severity || "normal",
        status: status || "unknown",
      },
    });
  } catch (error) {
    console.error("Error creating device:", error);

    res.status(500).json({
      message: "Failed to create device",
    });
  } finally {
    if (connection) connection.release();
  }
});

// PUT /api/devices/:id
router.put("/:id", async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    const {
      host,
      dev,
      ip,
      group,
      severity,
      status,
    } = req.body;

    connection = await pool.getConnection();

    const result = await connection.query(
      `UPDATE devices
       SET
         host = ?,
         dev = ?,
         ip_address = ?,
         device_group = ?,
         severity = ?,
         status = ?
       WHERE id = ?`,
      [
        host,
        dev,
        ip,
        group,
        severity,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    const updatedDevice = await connection.query(
      "SELECT * FROM devices WHERE id = ?",
      [id]
    );

    res.json({
      message: "Device updated successfully",
      device: updatedDevice[0],
    });
  } catch (error) {
    console.error("Error updating device:", error);

    res.status(500).json({
      message: "Failed to update device",
    });
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/:id", async (req, res) => {
  let connection;

  try {
    const { id } = req.params;

    connection = await pool.getConnection();

    const result = await connection.query(
      "DELETE FROM devices WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Device not found",
      });
    }

    res.json({
      message: "Device deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting device:", error);

    res.status(500).json({
      message: "Failed to delete device",
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;