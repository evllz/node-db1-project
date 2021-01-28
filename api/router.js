const express = require("express");
const router = express.Router();
const db = require("./model");
const { route } = require("./server");

//*Paths*

router.get("/", async (req, res, next) => {
  try {
    const data = await db.get();
    res.status(200).json(data);
  } catch {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.getById(id);
    res.status(201).json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const post = await db.create(data);
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const post = await db.update(id, changes);
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db.remove(id);
    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

//*Middleware functions*

router.use((err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  res.status(err.statusCode).json({ message: err.message, stack: err.stack });
});

module.exports = router;
