

// // import { getTaskById } from './controller/getFunctions.js';
// // import { getAll } from './controller/getFunctions.js';
// // import { addNewTask } from './controller/addTask.js';
// // import { delTask } from './controller/deleteTask.js';
// // import { updTask } from './controller/updateTask.js';

// const express = require('express');
// const cors = require('cors');
// const getAll=require('./controller/getAllTasks.js');
// const getTaskById=require('./controller/getTasksById.js');
// const addNewTask = require('./controller/addTask.js');
// const delTask = require('./controller/deleteTask.js');
// const updTask = require('./controller/updateTask.js');
// const completeTask=require('./controller/complTask.js')



// const app = express();
// app.use(cors());
// app.use(express.json());

// app.listen(8081, () => { console.log("Server started on port 8081") })

// app.get('/', getAll);

// app.get('/get/:id', getTaskById);

// app.post('/add', addNewTask);

// app.delete('/delete/:id', delTask);

// app.put('/update/:id', updTask);
// app.put('/complete/:id',completeTask);

// module.exports = { app};


const express = require('express');
const cors = require('cors');
const getAll = require('./controller/getAllTasks.js');
const getTaskById = require('./controller/getTasksById.js');
const addNewTask = require('./controller/addTask.js');
const delTask = require('./controller/deleteTask.js');
const updTask = require('./controller/updateTask.js');
const completeTask = require('./controller/complTask.js');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, // PostgreSQL default port
});

app.listen(8081, () => { console.log("Server started on port 8081") })

// Route to get all tasks
app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM TodoList');
    res.send(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/owners', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM Owner');
      res.send(rows);
    } catch (error) {
      console.error('Error fetching owners:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to get task by ID
app.get('/get/:id', getTaskById);

// Route to add new task
app.post('/add', async (req, res) => {
    const { taskname } = req.body;

    const completed = false;
    const owner_id = 1; 
    try {
      const result = await pool.query('INSERT INTO TodoList (taskname, completed, owner_id) VALUES ($1, $2, $3) RETURNING *', [taskname, completed, owner_id]);
      res.status(201).json(result); // Send back the newly added task
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Failed to add task' });
    }
});

app.post('/addOwner', async (req, res) => {
  const { name } = req.body;


  const age = Math.floor(Math.random() * (40 - 15 + 1)) + 15; 
  try {
    const result = await pool.query('INSERT INTO Owner (name,age) VALUES ($1, $2) RETURNING *', [name,age]);
    res.status(201).json(result); // Send back the newly added task
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add owner' });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const result = await pool.query('DELETE FROM TodoList WHERE id = $1', [id]);
      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.delete('/deleteOwner/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const result = await pool.query('DELETE FROM Owner WHERE id = $1', [id]);
      res.status(200).json({ message: 'Owner deleted successfully' });
  } catch (error) {
      console.error('Error deleting owner:', error);
      res.status(500).json({ error: 'Failed to delete owner'});
  }
});

app.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  const updatedTaskName = req.body.taskName;

  try {
      const result = await pool.query('UPDATE TodoList SET taskName = $1 WHERE id = $2 RETURNING *', [updatedTaskName, id]);

  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
  }
});

app.put('/updateOwner/:id', async (req, res) => {
  const id = req.params.id;
  const updatedOwnerName = req.body.name;

  try {
      const result = await pool.query('UPDATE Owner SET name = $1 WHERE id = $2 RETURNING *', [updatedOwnerName, id]);

  } catch (error) {
      console.error('Error updating owner:', error);
      res.status(500).json({ error: 'Failed to update owner' });
  }
});
// app.get('/ownersByAge', async (req, res) => {
//   const { col } = req.body;
//   try {
//       const { rows } = await pool.query('SELECT * FROM Owner ORDER BY $1',[col]);
//       res.send(rows);
//   } catch (error) {
//       console.error('Error fetching owners:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.get('/ownersByAge', async (req, res) => {
  const { col } = req.params;
  console.log({col});
  try {
      const query = `SELECT * FROM Owner ORDER BY ${col}`;
      const { rows } = await pool.query(query);
      res.send(rows);
  } catch (error) {
      console.error('Error fetching owners:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/complete/:id', completeTask);

module.exports = app;
