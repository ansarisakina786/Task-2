import React, { useState } from 'react';
import Note from './Note';
import './NotesApp.css';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [noteSize, setNoteSize] = useState('medium');

  const handleAddNote = () => {
    if (noteContent.trim() !== '') {
      const newNote = {
        content: noteContent,
        size: noteSize,
        timestamp: new Date().toLocaleString(),
      };
      setNotes([...notes, newNote]);
      setNoteContent('');
    }
  };

  return (
    <div className="notes-app">
      <h1>Notes App</h1>
      <textarea
        rows="4"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Enter your note..."
      ></textarea>
      <button onClick={handleAddNote}>Add Note</button>
      <div className="notes-list">
        {notes.map((note, index) => (
          <Note key={index} content={note.content} size={note.size} timestamp={note.timestamp} />
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
