import React from 'react';

const TodoList = ({ todos, handleDelete, handleEdit }) => (
  todos.map((todo) => (
    <div key={todo._id} className="todo-item">
      <h5>{todo.title}</h5>
      <p>{todo.description}</p>
      <button onClick={() => handleDelete(todo._id)} type="button" className="delete-btn">delete</button>
      <button onClick={() => handleEdit(todo._id)} type="button" className="edit-btn">edit</button>
    </div>
  ))
);

export default TodoList;
