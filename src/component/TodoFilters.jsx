import React from 'react';

export default function TodoFilters({ setFilter }) {
  return (
    // <div className="btn-group mb-4">
    //   <button
    //     className={`btn btn-outline-secondary ${filter === 'all' ? 'active' : ''}`}
    //     onClick={() => setFilter('all')}
    //   >
    //     Tout
    //   </button>
    //   <button
    //     className={`btn btn-outline-secondary ${filter === 'todo' ? 'active' : ''}`}
    //     onClick={() => setFilter('todo')}
    //   >
    //     À faire
    //   </button>
    //   <button
    //     className={`btn btn-outline-secondary ${filter === 'done' ? 'active' : ''}`}
    //     onClick={() => setFilter('done')}
    //   >
    //     Fait
    //   </button>
    // </div>
    <div className="btn-group mt-4">
        <button onClick={() => setFilter('all')} className="btn btn-outline-primary">Toutes</button>
        <button onClick={() => setFilter('todo')} className="btn btn-outline-warning">À faire</button>
        <button onClick={() => setFilter('done')} className="btn btn-outline-success">Faites</button>
      </div>
  );
}
