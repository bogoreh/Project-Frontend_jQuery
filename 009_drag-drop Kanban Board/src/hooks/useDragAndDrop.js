import { useState } from 'react';

export const useDragAndDrop = (initialColumns) => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      task,
      sourceColumn
    }));
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTask(task);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e, targetColumn) => {
    e.preventDefault();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const { task, sourceColumn } = data;

      if (sourceColumn !== targetColumn) {
        moveTask(task, sourceColumn, targetColumn);
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
    
    setDraggedTask(null);
  };

  const moveTask = (task, fromColumn, toColumn) => {
    setColumns(prevColumns => {
      // Remove from source column
      const updatedSourceColumn = prevColumns[fromColumn].filter(
        t => t.id !== task.id
      );
      
      // Add to target column (avoid duplicates)
      const taskExists = prevColumns[toColumn].some(t => t.id === task.id);
      const updatedTargetColumn = taskExists 
        ? prevColumns[toColumn] 
        : [...prevColumns[toColumn], task];

      return {
        ...prevColumns,
        [fromColumn]: updatedSourceColumn,
        [toColumn]: updatedTargetColumn
      };
    });
  };

  const addTask = (columnId, task) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: [...prevColumns[columnId], { ...task, id: Date.now() + Math.random() }]
    }));
  };

  const updateTask = (columnId, taskId, updates) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: prevColumns[columnId].map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: prevColumns[columnId].filter(task => task.id !== taskId)
    }));
  };

  return {
    columns,
    draggedTask,
    onDragStart,
    onDragOver,
    onDrop,
    addTask,
    updateTask,
    deleteTask,
    setColumns
  };
};