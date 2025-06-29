import React, { memo } from 'react';

// Formulaire pour saisir une nouvelle tâche et sa date limite
function TodoForm({ todo, setTodo, todoDate, setTodoDate, handleSubmit }) {
  console.log('form'); // Utile pour vérifier les rerenders pendant le développement

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap champForm">
      {/* Champ texte pour écrire la nouvelle tâche */}
      <input
        type="text"
        className="form-control"
        placeholder="Nouvelle tâche"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* Champ date pour indiquer la date limite */}
      <input
        type="date"
        className="form-control"
        value={todoDate}
        onChange={(e) => setTodoDate(e.target.value)}
      />

      {/* Bouton pour soumettre le formulaire */}
      <button type="submit" className="btn btn-success">
        Ajouter
      </button>
    </form>
  );
}

// memo() optimise le composant : il ne se re-render que si ses props changent
export default memo(TodoForm);
