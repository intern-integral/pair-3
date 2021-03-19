import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

const TodoForm = ({ handleAdd, handleUpdate, todoData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isEmpty(todoData)) {
      setTitle(todoData[0].title);
      setDescription(todoData[0].description);
    }
  }, [todoData]);

  const createOrEdit = () => {
    if (!todoData) return handleAdd(title, description);
    return handleUpdate(todoData[0]._id, title, description);
  };

  return (
    <div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="title"
        className="title-field"
        name="title-field"
        type="text"
      />
      <br />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="description"
        className="description-field"
        name="description-field"
      />
      <br />
      <button
        onClick={createOrEdit}
        className="add-btn"
        type="button"
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
