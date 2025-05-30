import React from 'react';

/**
 * Composant pour basculer entre mode clair et sombre.
 * Stylisé avec Bootstrap pour un rendu moderne et espacé.
 */
export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="d-flex justify-content-end my-4">
      {/* Bouton toggle avec style moderne et espacement */}
      <button
        className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'} rounded-pill shadow px-4 py-2`}
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌞 Mode clair' : '🌙 Mode sombre'}
      </button>
    </div>
  );
}
