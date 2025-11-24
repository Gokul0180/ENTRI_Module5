const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Get all tasks for logged-in user
router.get('/', auth, getTasks);

// Create a new task
router.post('/', auth, createTask);

// Update an existing task
router.put('/:id', auth, updateTask);

// Delete a task
router.delete('/:id', auth, deleteTask);

module.exports = router;
