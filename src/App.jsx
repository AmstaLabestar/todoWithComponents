import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import TodoForm from './component/TodoForm';
import TodoFilters from './component/TodoFilters';
import DarkModeToggle from './component/DarkModeToggle';
import TodoList from './component/TodoList';
import { initialState, todoReducer } from './component/FunctionReducer';



export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todo, todoDate, todoList, filter, darkMode } = state;


  console.log('render')


  // Crée des fonctions qu’on va donner aux composants, mémorisées pour éviter de recréer à chaque rendu
  const setTodo = useCallback((val) => {
  dispatch({ type: 'SET_TODO', payload: val });
}, []);

const setTodoDate = useCallback((val) => {
  dispatch({ type: 'SET_TODO_DATE', payload: val });
}, []);


// au chargement, on récupère le localStorage.
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todoList'));
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    dispatch({
      type: 'LOAD_SAVED_STATE',
      payload: {
        todoList: savedTodos || [],
        darkMode: savedDarkMode ?? false,
      },
    });
  }, []);


  
    // À chaque changement de todoList, sauvegarde-la dans localStorage
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // À chaque changement de darkMode, sauvegarde-le dans localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

    // Gestion de la soumission du formulaire pour ajouter une tâche
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      if (todo.trim() === '') {
        toast.error('Veuillez saisir une tâche.');
        return;
      }
      dispatch({ type: 'ADD_TODO' });
      toast.success('Tâche ajoutée !');
    },
    [todo] // Dépend de la valeur actuelle du champ texte
  );


    // Supprime une tâche par son id
  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    toast.info('Tâche supprimée.');
  }, []);

  // Change le statut (fait / pas fait) d'une tâche
  const toggleComplete = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
    toast.success('Statut changé.');
  }, []);

  // Met une tâche en mode édition
  const startEditing = useCallback((id) => {
    dispatch({ type: 'START_EDITING', payload: id });
  }, []);

  // Sauvegarde le texte modifié d'une tâche
  const saveEditedTodo = useCallback((id, newText) => {
    dispatch({ type: 'SAVE_EDITED_TODO', payload: { id, newText } });
    toast.success('Tâche modifiée.');
  }, []);

  
    // Quand on appuie sur Entrée pendant l'édition, sauvegarde la tâche
  const handleEditKey = useCallback((e, id) => {
    if (e.key === 'Enter') {
      saveEditedTodo(id, e.target.value);
    }
  }, [saveEditedTodo]);

  // Change le filtre actif (toutes, à faire, faites)
  const setFilter = useCallback((value) => {
    dispatch({ type: 'SET_FILTER', payload: value });
  }, []);

  // Active / désactive le mode sombre
  const setDarkMode = useCallback((value) => {
    dispatch({ type: 'SET_DARK_MODE', payload: value });
  }, []);


    const filteredTodos = useMemo(() => {
    if (filter === 'all') return todoList;
    if (filter === 'done') return todoList.filter((todo) => todo.completed);
    if (filter === 'todo') return todoList.filter((todo) => !todo.completed);
    return todoList;
  }, [filter, todoList]); // Recalcule seulement si le filtre ou la liste changent

    return (
    <div className={`app container mt-5 ${darkMode ? 'dark' : ''}`}>
      <h2>Toom segglego</h2>

      {/* Bouton pour changer de mode clair / sombre */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Formulaire pour ajouter une nouvelle tâche */}
      <TodoForm
        todo={todo}
        setTodo={setTodo}              
        todoDate={todoDate}
        setTodoDate={setTodoDate}      
        handleSubmit={handleSubmit}
      />

      {/* Filtres pour afficher toutes, à faire ou faites */}
      <TodoFilters filter={filter} setFilter={setFilter} />

      {/* Liste des tâches filtrées */}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEditing={startEditing}
        handleEditKey={handleEditKey}
      />

      {/* Container des notifications toastify */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
