import React from 'react';

export default function TodoItem({
  index,
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
      {/* <div className="form-check flex-grow-1">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        {todo.isEditing ? (
          <input
            type="text"
            className="form-control"
            defaultValue={todo.text}
            onKeyDown={(e) => handleEditKey(e, index)}
          />
        ) : (
          <span>
            {todo.text} {todo.date && <small className="text-muted">({todo.date})</small>}
          </span>
        )}
      </div> */}
         {todo.isEditing ? (
              <input
                type="text"
                className="form-control"
                defaultValue={todo.text}
                onKeyDown={(e) => handleEditKey(e, index)}
                autoFocus
              />
            ) : (
              <div className="flex-grow-1" onClick={() => startEditing(index)}>
                <strong>{todo.text}</strong> <br />
                <small className="text-muted">Date limite : {todo.date || 'Aucune'}</small>
              </div>
            )}

            <div className="btn-group ms-2">
                {!todo.isEditing && (
          <button className="btn btn-sm btn-outline-primary" onClick={() => startEditing(index)}>
            ✎
          </button>
        )}
              <button className="btn btn-sm btn-outline-success" onClick={() => toggleComplete(index)}>✓</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(index)}>🗑</button>
            </div>


      {/* <div className="btn-group ms-2">
        {!todo.isEditing && (
          <button className="btn btn-sm btn-outline-primary" onClick={() => startEditing(index)}>
            ✎
          </button>
        )}
        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(index)}>
          ❌
        </button>
      </div> */}
    </li>
  );
}
