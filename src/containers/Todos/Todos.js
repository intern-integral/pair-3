import React, { useEffect, useState } from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoServices from '../../services/TodoServices';

const Todos = () => {
  const {
    add,
    fetchAll,
    fetchById,
    update
  } = TodoServices;

  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const loadData = async () => {
    const getTodos = await fetchAll();
    setTodos(getTodos);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (title, description) => {
    const newTodo = {
      title,
      description
    };

    const todoWithId = await add(newTodo);

    setTodos([todoWithId, ...todos]);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const handleUpdate = async (id, title, description) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        return { ...todo, title, description };
      }
      return todo;
    });

    await update(id, { title, description });

    setTodos(updatedTodos);
    setSelectedTodo(null);
  };

  const handleEdit = async (id) => {
    // const findTodo = todos.filter((todo) => todo._id === id);
    // bingung hiks
    const findTodo = await fetchById(id);

    setSelectedTodo(findTodo);
  };
  return (
    <div>
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
};

export default Todos;
