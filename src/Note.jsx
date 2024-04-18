import React from 'react';

const Note = ({ content, size, timestamp, onDelete }) => {
  return (
    <div className={`note ${size}`}>
      <p>{content}</p>
      <span className="timestamp">Added on: {timestamp}</span>
      <button className="delete-btn" onClick={onDelete}>
        <img src="https://img.icons8.com/material-rounded/24/000000/trash.png" alt="Delete" />
      </button>
    </div>
  );
};

export default Note;
