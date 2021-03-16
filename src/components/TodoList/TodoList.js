import React from 'react';

const TodoList = ({ todos, handleDelete }) => (
  todos.map((todo) => (
    <div key={todo.id} className="todo-item">
      <h5>{todo.title}</h5>
      <p>{todo.description}</p>
      <button onClick={() => handleDelete(todo.id)} type="button" className="delete-btn">delete</button>
    </div>
  ))
);

export default TodoList;
