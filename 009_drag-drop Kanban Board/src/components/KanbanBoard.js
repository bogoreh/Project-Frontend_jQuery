import React from 'react';
import Column from './Column';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

const KanbanBoard = () => {
  const initialColumns = {
    todo: [
      { 
        id: 1, 
        title: 'Design Homepage', 
        description: 'Create wireframes and mockups for the homepage', 
        priority: 'high', 
        assignee: 'Alice',
        dueDate: '2024-01-15'
      },
      { 
        id: 2, 
        title: 'Research Competitors', 
        description: 'Analyze competitor features and pricing', 
        priority: 'medium', 
        assignee: 'Bob',
        dueDate: '2024-01-20'
      }
    ],
    inProgress: [
      { 
        id: 3, 
        title: 'Develop API', 
        description: 'Build RESTful API endpoints for user management', 
        priority: 'high', 
        assignee: 'Charlie',
        dueDate: '2024-01-18'
      },
      { 
        id: 4, 
        title: 'Write Documentation', 
        description: 'Document API usage and integration guidelines', 
        priority: 'low', 
        assignee: 'Diana',
        dueDate: '2024-01-25'
      }
    ],
    done: [
      { 
        id: 5, 
        title: 'Setup Project', 
        description: 'Initialize React project with all dependencies', 
        priority: 'medium', 
        assignee: 'Eve',
        dueDate: '2024-01-10'
      }
    ]
  };

  const {
    columns,
    onDragStart,
    onDragOver,
    onDrop,
    addTask,
    updateTask,
    deleteTask
  } = useDragAndDrop(initialColumns);

  return (
    <div className="kanban-board">
      <Column
        id="todo"
        title="To Do"
        tasks={columns.todo}
        className="todo"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
      <Column
        id="inProgress"
        title="In Progress"
        tasks={columns.inProgress}
        className="in-progress"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
      <Column
        id="done"
        title="Done"
        tasks={columns.done}
        className="done"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default KanbanBoard;