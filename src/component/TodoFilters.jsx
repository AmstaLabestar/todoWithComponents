import React from 'react';

export default function TodoFilters({ setFilter }) {
  return (
    
    <div className="btn-group my-4 ">
        <button onClick={() => setFilter('all')} className="btn btn-outline-primary">Toutes</button>
        <button onClick={() => setFilter('todo')} className="btn btn-outline-warning">À faire</button>
        <button onClick={() => setFilter('done')} className="btn btn-outline-success">Faites</button>
      </div>
  );
}
