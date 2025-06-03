import React from 'react';

/**
 * Composant pour basculer entre mode clair et sombre.
 */
export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="d-flex justify-content-start my-2">
      {/* Bouton toggle  */}
      <button
        className={`btn btn-sm  btn-border ${darkMode ? 'btn-light' : 'btn-dark'} rounded-pill shadow px-4 py-2 mb-2`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞 Mode clair' : '🌙 Mode sombre'}
      </button>
    </div>
  );
}
