import React, { memo } from 'react';

// Composant qui affiche 3 boutons pour filtrer la liste des tâches
function TodoFilters({ setFilter }) {
  console.log('Filter'); // Pour voir quand ce composant est rendu

  return (
    <div className="btn-group my-4">
      {/* Afficher toutes les tâches */}
      <button onClick={() => setFilter('all')} className="btn btn-outline-primary">
        Toutes
      </button>
      {/* Afficher seulement les tâches non terminées */}
      <button onClick={() => setFilter('todo')} className="btn btn-outline-warning">
        À faire
      </button>
      {/* Afficher seulement les tâches terminées */}
      <button onClick={() => setFilter('done')} className="btn btn-outline-success">
        Faites
      </button>
    </div>
  );
}

// memo() empêche le composant de se re-render inutilement
export default memo(TodoFilters);
