import React from 'react';

// Composant qui représente UNE tâche, avec ses actions
export default function TodoItem({
  todo,
  toggleComplete,
  deleteTodo,
  startEditing,
  handleEditKey
}) {
  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        todo.completed ? 'list-group-item-success' : ''
      }`}
    >
      {todo.isEditing ? (
        // Mode édition : champ input pour modifier le texte
        <input
          type="text"
          className="form-control"
          defaultValue={todo.text}
          onKeyDown={(e) => handleEditKey(e, todo.id)}
          autoFocus
        />
      ) : (
        // Mode affichage normal
        <div className="flex-grow-1" onClick={() => startEditing(todo.id)}>
          <strong>{todo.text}</strong>
          <br />
          <small className="text-muted">
            Date limite : {todo.date || 'Aucune'}
          </small>
        </div>
      )}

      {/* Groupe de boutons d'action */}
      <div className="btn-group ms-2">
        {!todo.isEditing && (
          <button className="btn btn-sm btn-outline-primary" onClick={() => startEditing(todo.id)}>
            ✎
          </button>
        )}
        <button className="btn btn-sm btn-outline-success" onClick={() => toggleComplete(todo.id)}>
          ✓
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}>
          🗑
        </button>
      </div>
    </li>
  );
}
