import React, { useState } from 'react';


const TodoForm = ({ handleAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
        onClick={() => handleAdd(title, description)}
        className="add-btn"
        type="button"
      >
        Add
      </button>
    </div>
  );
};

export default TodoForm;
