// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'notes_database' // Use the name of the database you created
//   });
  
// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'notes_database'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create a new note
app.post('/notes', (req, res) => {
  const { content, size, timestamp } = req.body;
  const query = 'INSERT INTO notes (content, size, timestamp) VALUES (?, ?, ?)';
  connection.query(query, [content, size, timestamp], (err, result) => {
    if (err) {
      console.error('Error creating note: ', err);
      res.status(500).send('Error creating note');
      return;
    }
    res.status(201).send('Note created successfully');
  });
});

// Get all notes
app.get('/notes', (req, res) => {
  const query = 'SELECT * FROM notes';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving notes: ', err);
      res.status(500).send('Error retrieving notes');
      return;
    }
    res.json(results);
  });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM notes WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting note: ', err);
      res.status(500).send('Error deleting note');
      return;
    }
    res.send('Note deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
