import { useEffect, useState } from 'react';
import './App.css';
import { Task } from './Task';
import { CSVLink } from "react-csv";
import axios from 'axios'
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

function TodoItem({ match }) {
  const [todo, setTodo] = useState(null);
  const todoId = match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${todoId}`)
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => {
        console.error('Error fetching todo:', error);
      });
  }, [todoId]);

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Todo Details</h2>
      <p>ID: {todo.id}</p>
      <p>Task Name: {todo.taskName}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
    </div>
  );
}




function App() {
  const [todoList, setTodoList] = useState(() => {
    const saveTodoList = localStorage.getItem('todoList');
    return saveTodoList ? JSON.parse(saveTodoList) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

useEffect(()=>{
  axios.get('http://localhost:8081/')
  .then(res=>{setTodoList(res.data)})
  .catch(err=>console.log(err))
},[todoList])

function TodoItem({ match }) {
  const [todo, setTodo] = useState(null);
  const todoId = match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${todoId}`)
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => {
        console.error('Error fetching todo:', error);
      });
  }, [todoId]);
}



  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(json => {
        let data = [];
        json.forEach((element) => {
          let object = {
            id: element.id,
            taskName: element.title,
            completed: element.completed,
          }
          data.push(object);
        });
        setTodoList(data);
      })

  }, [])
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      let task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        completed: false,
      };
  
      axios.post('http://localhost:8081/add', task, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // Update todoList with the response data
        setTodoList(res.data);
        setNewTask('');
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
    }
  };
  
  

  // const deleteTask = (id) => {
  //   setTodoList(todoList.filter(task => task.id !== id));
  //   setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
  // };

const deleteTask = (id) => {
  axios.delete(`http://localhost:8081/delete/${id}`)
    .then(response => {
      console.log(response.data);
      setTodoList(response.data);
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
};


  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task;
      })
    );
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedTasks([...selectedTasks, id]);
    } else {
      setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
    }
  };



  const deleteSelectedTasks = () => {
    setTodoList(todoList.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };
  // const updateTask = (id, updatedTaskName) => {
  //   axios.put(`http://localhost:8081/update/${id}`, updatedTaskName)
  //     .then(response => {
  //       console.log('Task updated:', response.data);
  //       return response.data; // Update the todo list with the updated data
  //     })
  //     .catch(error => {
  //       console.error('Error updating task:', error);
  //     });
  // };
  const updateTask = (id, updatedTaskName) => {
    setTodoList(todoList.map(task => {
      if (task.id === id) {
        return { ...task, taskName: updatedTaskName };
      }
      return task;
    }));
  };

  let filteredTasks = filter ? todoList.filter(task => task.completed) : todoList;


  return (
    <Router>
    <div className="App">
      <div className="addTask">
        <input type='text' placeholder='Add a task' value={newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
        <button onClick={handleFilter}>Filter</button>
        {selectedTasks.length > 0 && <button onClick={deleteSelectedTasks}>Delete Selected</button>}
      </div>
      <div className="list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={(event) => handleCheckboxChange(event, task.id)}
            />

            <Task
              taskName={task.taskName}
              completed={task.completed}
              deleteTask={() => deleteTask(task.id)}
              completeTask={() => completeTask(task.id)}
              updateTask={(id,updatedTaskName) => updateTask(task.id, updatedTaskName)}
            />
          </div>
        ))}
      </div>
      <div className='csv-button'>
        <CSVLink className='react-csv-link' data={todoList}>Export</CSVLink>
      </div>
      <Routes>
      <Route path="/get/:id" component={TodoItem} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
