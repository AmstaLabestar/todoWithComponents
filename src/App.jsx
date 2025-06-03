// App.jsx
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import TodoForm from './component/TodoForm';
import TodoFilters from './component/TodoFilters';
import DarkModeToggle from './component/DarkModeToggle';
import TodoList from './component/TodoList';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);


//   useEffect(() => {
//   const savedTodos = localStorage.getItem('todoList');
//   if (savedTodos) {
//     setTodoList(JSON.parse(savedTodos));
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem('todoList', JSON.stringify(todoList));
// }, [todoList]);
useEffect(() => {
  fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then(data => setTodoList(data))
    .catch(err => console.error('Erreur chargement tâches', err));
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo.trim()=='') {
      toast.error('Veuillez saisir une tâche.');

    return
    }
      
    if (!todo) return;
    const newTodo = {
      text: todo,
      date: todoDate,
      completed: false,
      isEditing: false
    };
    // setTodoList([...todoList, newTodo]);
    // setTodo('');
    // setTodoDate('');

  fetch('http://localhost:3001/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newTodo)
})
.then(res => res.json())
.then(data => {
  setTodoList([...todoList, data]);
  toast.success('Tâche ajoutée !');

  setTodo('');
  setTodoDate('');
});
  };

  const toggleComplete = (index) => {
    // const updated = [...todoList];
    // updated[index].completed = !updated[index].completed;
    // setTodoList(updated);

    const todo = todoList[index];
const updatedTodo = { ...todo, completed: !todo.completed };

fetch(`http://localhost:3001/todos/${todo.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: updatedTodo.completed })
})
.then(res => res.json())
.then(() => {
  const updatedList = [...todoList];
  updatedList[index] = updatedTodo;
  setTodoList(updatedList);
  toast.success(todo.completed ? 'Tâche marquée comme à faire.' : 'Tâche marquée comme faite.');

});

  };

  const deleteTodo = (index) => {
    // const updated = [...todoList];
    // updated.splice(index, 1);
    // setTodoList(updated);
    const id = todoList[index].id;

fetch(`http://localhost:3001/todos/${id}`, {
  method: 'DELETE'
})
.then(() => {
  const updated = todoList.filter(todo => todo.id !== id);
  setTodoList(updated);
  toast.info('Tâche supprimée.');

});

  };

  const startEditing = (index) => {
    const updated = [...todoList];
    updated[index].isEditing = true;
    setTodoList(updated);
  };

  const saveEditedTodo = (index, newText) => {
    // const updated = [...todoList];
    // updated[index].text = newText;
    // updated[index].isEditing = false;
    // setTodoList(updated);
    const todo = todoList[index];
const updatedTodo = { ...todo, text: newText, isEditing: false };

fetch(`http://localhost:3001/todos/${todo.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: newText, isEditing: false })
})
.then(res => res.json())
.then(() => {
  const updatedList = [...todoList];
  updatedList[index] = updatedTodo;
  setTodoList(updatedList);
  toast.success('Tâche modifiée.');

});

  };

  const handleEditKey = (e, index) => {
    if (e.key === 'Enter') {
      saveEditedTodo(index, e.target.value);
    }
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'done') return todo.completed;
    if (filter === 'todo') return !todo.completed;
  });

  return (
    <div className={`app container mt-5 ${darkMode ? 'dark' : ''}`}>
      <h2>Toom segglego</h2>
      

      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <TodoForm {...{ todo, setTodo, todoDate, setTodoDate, handleSubmit }} />
      <TodoFilters filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEditing={startEditing}
        handleEditKey={handleEditKey}
      />
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}
