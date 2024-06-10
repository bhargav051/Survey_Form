# Survey Project

This repository contains a fully functional survey project, including a React frontend, a backend API, and a database schema. The survey project dynamically generates questions based on user responses and stores user responses in the database.

## Table of Contents
- [Survey Project](#survey-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
  - [Database Schema](#database-schema)
  - [Sample Data](#sample-data)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Running the Project](#running-the-project)
  - [SQL Queries](#sql-queries)
  - [Project Structure](#project-structure)
  - [License](#license)

## Overview
This project includes:
- A React frontend to display survey questions and handle user responses.
- An Express backend API to serve survey questions and options and to store user responses.
- A MySQL database schema to store information related to surveys, questions, answer options, and user responses.

## Prerequisites
- Node.js (v14 or higher)
- MySQL
- Git

## Setup Instructions

### Database Schema
1. **Create the database and tables:**
   ```sql
   CREATE DATABASE survey_db;

   USE survey_db;

   CREATE TABLE surveys (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL
   );

   CREATE TABLE questions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       survey_id INT,
       text VARCHAR(255) NOT NULL,
       depends_on INT,
       depends_on_option INT,
       FOREIGN KEY (survey_id) REFERENCES surveys(id)
   );

   CREATE TABLE options (
       id INT AUTO_INCREMENT PRIMARY KEY,
       question_id INT,
       option_number INT,
       text VARCHAR(255) NOT NULL,
       FOREIGN KEY (question_id) REFERENCES questions(id)
   );

   CREATE TABLE responses (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT,
       question_id INT,
       option_number INT,
       FOREIGN KEY (question_id) REFERENCES questions(id)
   );
   ```

2. **Populate the tables with sample data:**
   ```sql
   INSERT INTO surveys (title) VALUES ('Customer Satisfaction Survey');

   INSERT INTO questions (survey_id, text, depends_on, depends_on_option) VALUES 
   (1, 'How satisfied are you with our service?', NULL, NULL),
   (1, 'What did you like the most?', 1, 1),
   (1, 'What can we improve?', 1, 2);

   INSERT INTO options (question_id, option_number, text) VALUES 
   (1, 1, 'Very satisfied'),
   (1, 2, 'Not satisfied'),
   (2, 1, 'Quality'),
   (2, 2, 'Support'),
   (3, 1, 'Speed'),
   (3, 2, 'Price');
   ```

### Frontend Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/survey-project.git
   cd survey-project
   ```

2. **Navigate to the `frontend` directory and install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

### Backend Setup
1. **Navigate to the `backend` directory and install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure the database connection:**
   Create a `.env` file in the `backend` directory with the following content:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=survey_db
   ```

## Running the Project

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   ```

2. **Start the frontend server:**
   ```sh
   cd frontend
   npm start
   ```

The application will be accessible at `http://localhost:3000`.

## SQL Queries

1. **Retrieve a list of available surveys:**
   ```sql
   SELECT * FROM surveys;
   ```

2. **Retrieve questions for a selected survey:**
   ```sql
   SELECT * FROM questions WHERE survey_id = 1;
   ```

3. **Retrieve answer options for a selected question:**
   ```sql
   SELECT * FROM options WHERE question_id = 1;
   ```

4. **Store user responses to survey questions:**
   ```sql
   INSERT INTO responses (user_id, question_id, option_number) VALUES (1, 1, 1);
   ```

5. **Handle the dynamic nature of the survey process by generating tailored questions based on user responses:**
   ```sql
   SELECT * FROM questions WHERE depends_on = 1 AND depends_on_option = 1;
   ```

## Project Structure

```
survey-project/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   ├── package.json
├── README.md
```

## License
This project is licensed under the MIT License.

---

Feel free to update the README file with any additional instructions or information that might be relevant to your specific implementation.
