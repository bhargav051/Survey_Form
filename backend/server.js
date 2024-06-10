const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors(
  {
    origin:'*',
  }
));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'survey_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Route to get questions
app.get('/api/questions', (req, res) => {
  const query = 'SELECT * FROM Questions';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching questions:', error);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Route to get options
app.get('/api/options', (req, res) => {
  const query = 'SELECT * FROM Options';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching options:', error);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Route to store user responses
app.post('/api/responses', (req, res) => {
  const responses = req.body.responses;
  const query = 'INSERT INTO UserResponses (user_id, question_id, option_number) VALUES ?';
  const values = responses.map(response => [response.user_id, response.question_id, response.option_number]);
  db.query(query, [values], (error, results) => {
    if (error) {
      console.error('Error storing responses:', error);
      res.status(500).send('Server error');
      return;
    }
    res.json({ message: 'Responses stored successfully', results });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
