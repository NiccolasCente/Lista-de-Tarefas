import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Tarefas</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite uma nova tarefa"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>Adicionar</button>
      </div>
      <ul className="list-group">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-light' : ''}`}
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            <div>
              <button className="btn btn-sm btn-success mx-1" onClick={() => handleToggleComplete(task.id)}>
                {task.completed ? 'Desfazer' : 'Concluir'}
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
