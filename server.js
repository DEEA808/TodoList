import express from 'express'
import cors from 'cors'



const app = express();
app.use(cors());
app.use(express.json());
const todoList = [
    { id: 1, taskName: 'Todo 1', completed: false },
    { id: 2, taskName: 'Todo 2', completed: true },
    { id: 3, taskName: 'Todo 3', completed: false }
];

app.listen(8081, () => { console.log("Server started on port 5000") })

app.get('/', (req, res) => {
    res.send(todoList);
});

app.get('/get/:id', (req, res) => {
    const todoId = parseInt(req.params.id); 
    const todo = todoList.find(todo => todo.id === todoId);
    if (todo) {
        res.send(todo); 
    } else {
        res.status(404).json({ message: 'Todo item not found' }); 
    }
});

app.post('/add',(req,res)=>{
    let todo=req.body;
    console.log(req.body);
    todoList.push(todo);
    res.send(todoList);
});
app.delete('/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    console.log(req);
    const index = todoList.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        todoList.splice(index, 1);
        res.send(todoList);
        console.log(todoList);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// app.get('/add', (req, res) => {
//     res.send(todoList);
//   });
  
// app.put('/update/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const updatedTaskName = req.body;
  
//     todoList.forEach(task => {
//       if (task.id === taskId) {
//         task.taskName = updatedTaskName.taskName;
//         task.completed = updatedTaskName.completed;
//       }
//     });
//     console.log(todoList);
  
//     res.send(todoList);
//   });
  