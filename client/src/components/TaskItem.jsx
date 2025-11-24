import React from 'react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className="task">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>{task.title}</strong>
          <div style={{ fontSize: 13 }}>{task.description}</div>

          {task.dueDate && (
            <div style={{ fontSize: 12, color: '#555' }}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            /> Completed
          </label>

          <button onClick={() => onEdit(task)}>Edit</button>
          <button
            onClick={() => onDelete(task)}
            style={{ marginLeft: 6, background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
