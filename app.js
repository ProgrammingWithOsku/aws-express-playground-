const express = require('express');
const { Client } = require('pg');
const app = express();

// Serve static files from the root directory
app.use(express.static('public'));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Connect to the PostgreSQL database
client.connect();

// Automatically create the `questions` table if it doesn't exist and seed data
const createAndSeedTable = async () => {
  const createTableQuery = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS questions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer CHAR(1) NOT NULL
  );
  `;

  const seedDataQuery = `
  INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer)
  SELECT 'What does the "A" in AWS stand for?', 'Amazon', 'Apple', 'Azure', 'Alibaba', 'A'
  WHERE NOT EXISTS (SELECT 1 FROM questions);
  INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer)
  SELECT 'Which AWS service is used for object storage?', 'RDS', 'S3', 'EC2', 'Lambda', 'B'
  WHERE NOT EXISTS (SELECT 1 FROM questions WHERE question = 'Which AWS service is used for object storage?');
  `;

  try {
    // Create the table if it doesn't exist
    await client.query(createTableQuery);
    console.log('Table "questions" is ready.');

    // Seed the table with data if it doesn't already exist
    await client.query(seedDataQuery);
    console.log('Sample data inserted into "questions" table.');
  } catch (err) {
    console.error('Error setting up the database:', err);
  }
};

// Call the function to create the table and seed data
createAndSeedTable();

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API route to get questions from PostgreSQL
app.get('/questions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving questions:', err);
    res.status(500).send('Error retrieving questions');
  }
});

// Export the app instance
module.exports = app;