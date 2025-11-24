import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initial = {}, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // 🔥 Update form fields whenever initial changes (Edit clicked)
  useEffect(() => {
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setDueDate(
      initial.dueDate
        ? new Date(initial.dueDate).toISOString().slice(0, 10)
        : ''
    );
  }, [initial]);

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate: dueDate || null
    });

    // Clear fields ONLY when adding a new task
    if (!initial._id) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={submitForm} style={{ marginBottom: 15 }}>
      <div className="form-row">
        <input
          required
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit">
        {initial._id ? 'Update Task' : 'Add Task'}
      </button>

      {initial._id && (
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: 10, background: '#aaa' }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
