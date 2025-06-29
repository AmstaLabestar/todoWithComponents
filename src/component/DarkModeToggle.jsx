import React, { memo } from 'react';

/**
 * Bouton pour activer/désactiver le mode sombre.
 * Change de texte et de style selon l'état darkMode.
 */
function DarkModeToggle({ darkMode, setDarkMode }) {
  console.log('Dark'); // Vérifier les rerenders

  return (
    <div className="d-flex justify-content-start my-2">
      <button
        className={`btn btn-sm btn-border ${darkMode ? 'btn-light' : 'btn-dark'} rounded-pill shadow px-4 py-2 mb-2`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞 Mode clair' : '🌙 Mode sombre'}
      </button>
    </div>
  );
}

// memo() évite de re-render sauf si darkMode change
export default memo(DarkModeToggle);
