import React from 'react';
import TodoItem from './TodoItem';

// Composant qui affiche la liste des tâches, ou un message si la liste est vide
export default function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  startEditing,
  handleEditKey
}) {
  return (
    <ul className="list-group mt-4 tolist">
      {todos.length === 0 ? (
        // Message si aucune tâche
        <li className="list-group-item text-center">Aucune tâche</li>
      ) : (
        // Sinon, on affiche chaque tâche via TodoItem
        todos.map((todo) => (
          <TodoItem
            key={todo.id} // clé unique pour React
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
