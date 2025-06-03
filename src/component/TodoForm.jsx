import React from 'react';

// Formulaire  pour ajouter une tâche
export default function TodoForm({ todo, setTodo, todoDate, setTodoDate, handleSubmit }) {
  return (
    
 
    <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap champForm">
        <input
          type="text"
          className="form-control"
          placeholder="Nouvelle tâche"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Ajouter
        </button>
      </form>
  );
}
