import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';

import TodoServices from './services/TodoServices';
import './App.css';

function App() {
  const data = [
    { id: 1, title: 'Hello World', description: 'Duaaar ini todo list pertama hore' },
    { id: 2, title: 'banana potato', description: 'lorem ipsum dolor sit amet' },
    { id: 3, title: 'hehe iseng', description: 'mbeeeee' }
  ];

  const { fetchAll } = TodoServices;

  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const loadData = async () => {
    const getTodos = await fetchAll();
    setTodos(getTodos);
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const handleUpdate = (id, title, description) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, description };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setSelectedTodo(null);
  };

  const handleEdit = (id) => {
    const findTodo = todos.filter((todo) => todo.id === id);

    setSelectedTodo(findTodo);
  };

  return (
    <div className="App">
      <h1 className="todo-title">Todo List</h1>
      <TodoForm
        handleUpdate={handleUpdate}
        handleAdd={handleAdd}
        todoData={selectedTodo}
      />
      <div className="todo-list">
        <TodoList
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          className="todo-wrapper"
          todos={todos}
        />
      </div>
    </div>
  );
}

export default App;
