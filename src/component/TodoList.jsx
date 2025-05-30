import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  startEditing,
  handleEditKey
}) {
  return (
    <ul className="list-group mt-4">
      {todos.length === 0 ? (
        <li className="list-group-item d-flex justify-content-between align-items-center text-center">Aucune tâche</li>
      ) : (
        todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            startEditing={startEditing}
            handleEditKey={handleEditKey}
          />
        ))
      )}
    </ul>
  );
}
