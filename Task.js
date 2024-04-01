import { useEffect, useState } from 'react';

export const Task = (props) => {
    const [editable, setEditable] = useState(false);
    const [updatedTaskName, setUpdatedTaskName] = useState(props.taskName);
  
    const handleUpdate = () => {
      props.updateTask(props.id, updatedTaskName); // Call updateTask with id and updatedTaskName
      setEditable(false);
    };
  
    return (
      <div className="task" style={{ backgroundColor: props.completed ? "hsl(120, 60%, 70%)" : "white" }}>
        {editable ? (
          <input
            type="text"
            value={updatedTaskName}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
          />
        ) : (
          <h1>{props.taskName}</h1>
        )}
        
        <button onClick={() => props.completeTask(props.id)}>Complete</button>
        <button onClick={() => props.deleteTask(props.id)}>Delete</button>
        {editable ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setEditable(true)}>Edit</button>
        )}
      </div>
    );
  };
  