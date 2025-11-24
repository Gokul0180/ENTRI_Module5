import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function Dashboard() {
  const { api } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (data) => {
    const res = await api.post('/tasks', data);
    setTasks(prev => [res.data, ...prev]);
  };

  const updateTask = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    setTasks(prev => prev.map(t => t._id === id ? res.data : t));
    setEditTask(null);
  };

  const toggleTask = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, {
      completed: !task.completed
    });
    setTasks(prev => prev.map(t => t._id === task._id ? res.data : t));
  };

  const deleteTask = async (task) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${task._id}`);
    setTasks(prev => prev.filter(t => t._id !== task._id));
  };

  return (
    <div>
      <h3>Dashboard</h3>

      <TaskForm
        onSubmit={(data) =>
          editTask ? updateTask(editTask._id, data) : addTask(data)
        }
        initial={editTask || {}}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={toggleTask}
            onEdit={() => setEditTask(task)}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
  );
}
