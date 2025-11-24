const Task = require('../models/Task');

// ========================
// GET TASKS
// ========================
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ========================
// CREATE TASK
// ========================
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
      dueDate: dueDate || null,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ========================
// UPDATE TASK
// ========================
exports.updateTask = async (req, res) => {
  const { title, description, completed, dueDate } = req.body;

  // Build update object
  const taskFields = {};
  if (title !== undefined) taskFields.title = title;
  if (description !== undefined) taskFields.description = description;
  if (completed !== undefined) taskFields.completed = completed;
  if (dueDate !== undefined) taskFields.dueDate = dueDate;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Check ownership
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// ========================
// DELETE TASK
// ========================
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ message: 'Task not found' });

    // Authorization check
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
