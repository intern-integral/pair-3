import React, { useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';

function App() {
  const data = [
    { id: 1, title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
    { id: 2, title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
    { id: 3, title: 'hehe iseng', description: 'mbeeeee' }
  ];

  const [todos, setTodos] = useState(data);

  const handleAdd = (title, description) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      description
    };

    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1 className="todo-title">Todo List</h1>
      <TodoForm handleAdd={handleAdd} />
      <div className="todo-list">
        <TodoList handleDelete={handleDelete} className="todo-wrapper" todos={todos} />
      </div>
    </div>
  );
}

export default App;
