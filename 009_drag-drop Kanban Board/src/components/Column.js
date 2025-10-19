import React from 'react';
import Task from './Task';

const Column = ({ id, title, tasks, className, onAddTask }) => {
  const handleAddTask = () => {
    const taskTitle = prompt('Enter task title:');
    if (taskTitle) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: 'New task description',
        priority: 'medium',
        assignee: 'You'
      };
      onAddTask(id, newTask);
    }
  };

  return (
    <div className={`column ${className}`} data-column={id}>
      <div className={`column-header ${className}`}>
        <div className="column-title">{title}</div>
        <div className="task-count">{tasks.length}</div>
      </div>
      
      <div className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <Task key={task.id} task={task} />
          ))
        ) : (
          <div className="empty-state">No tasks</div>
        )}
      </div>
      
      <button 
        onClick={handleAddTask}
        style={{
          width: '100%',
          padding: '10px',
          background: 'transparent',
          border: '2px dashed #ccc',
          borderRadius: '6px',
          cursor: 'pointer',
          color: '#666',
          marginTop: '10px'
        }}
      >
        + Add Task
      </button>
    </div>
  );
};

export default Column;