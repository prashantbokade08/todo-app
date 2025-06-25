const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST new
router.post("/", async (req, res) => {
  const todo = new Todo({ task: req.body.task, completed: false });
  await todo.save();
  res.json(todo);
});

// PUT update
router.put("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
