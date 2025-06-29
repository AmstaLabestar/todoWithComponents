// reducer.js
export const initialState = {
  todo: '',             // Le texte de la tâche en cours d’écriture
  todoDate: '',         // La date limite de la tâche en cours
  todoList: [],         // Liste des tâches
  filter: 'all',        // Filtre sélectionné ('all', 'done', 'todo')
  darkMode: false,      // Mode sombre activé ou non
};

// constantes  pour éviter d’écrire les noms d’actions à la main
export const SET_TODO ='todo/set_todo'
export const SET_TODO_DATE ='todo/set_todo_date'
export const ADD_TODO ='todo/add_todo'
export const DELETE_TODO ='todo/delete_todo'
export const TOGGLE_TODO ='todo/toggle_todo'
export const START_EDITING ='todo/start_editing'
export const SAVE_EDITED_TODO ='todo/save_edited_todo'
export const SET_FILTER = 'todo/set_filter'
export const SET_DARK_MODE = 'todo/set_dark_mode'
export const LOAD_SAVED_STATE = 'todo/load_saved_state'


export function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODO':
      return { ...state, todo: action.payload }; // change la valeur de todo

    case 'SET_TODO_DATE':
      return { ...state, todoDate: action.payload }; // change la valeur de date

       case 'ADD_TODO': {
      if (!state.todo.trim()) return state;  // Si la tâche est vide, ne rien faire

      const newTodo = {
        id: Date.now(),         // id unique
        text: state.todo,       // texte de la tâche
        date: state.todoDate,   // date limite
        completed: false,       // tâche non faite par défaut
        isEditing: false,       // pas en cours d'édition
      };

      return {
        ...state,
        todoList: [...state.todoList, newTodo], // ajoute la tâche à la liste
        todo: '',              // vide le champ de saisie
        todoDate: '',          // vide la date
      };
    }


    case 'DELETE_TODO':
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload), //Supprimer une tâche :
      };

// Changer le statut fait/pas fait
    case 'TOGGLE_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

      // Commencer l’édition
    case 'START_EDITING':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, isEditing: true } : todo
        ),
      };

      // Sauver l’édition 
    case 'SAVE_EDITED_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.newText, isEditing: false }
            : todo
        ),
      };

      // Changer le filtre
    case 'SET_FILTER':
      return { ...state, filter: action.payload };


      // Changer le mode sombre
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };

      // Charger un état sauvegardé
    case 'LOAD_SAVED_STATE':
      return {
        ...state,
        ...action.payload,
      };
      // Si action inconnue on return le state initiale
    default:
      return state;
  }
}
