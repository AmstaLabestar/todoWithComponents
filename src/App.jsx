// App.jsx
import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    const newTodo = {
      text: todo,
      date: todoDate,
      completed: false,
      isEditing: false
    };
    setTodoList([...todoList, newTodo]);
    setTodo('');
    setTodoDate('');
  };

  const toggleComplete = (index) => {
    const updated = [...todoList];
    updated[index].completed = !updated[index].completed;
    setTodoList(updated);
  };

  const deleteTodo = (index) => {
    const updated = [...todoList];
    updated.splice(index, 1);
    setTodoList(updated);
  };

  const startEditing = (index) => {
    const updated = [...todoList];
    updated[index].isEditing = true;
    setTodoList(updated);
  };

  const saveEditedTodo = (index, newText) => {
    const updated = [...todoList];
    updated[index].text = newText;
    updated[index].isEditing = false;
    setTodoList(updated);
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
      <h2>Ma Todo List</h2>
      

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
    </div>
  );
}
