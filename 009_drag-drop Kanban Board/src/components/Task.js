import React from 'react';

const Task = ({ task }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <div className="task" data-task-id={task.id}>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-meta">
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
        <span className="task-assignee">@{task.assignee}</span>
      </div>
    </div>
  );
};

export default Task;