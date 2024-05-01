import React, { useState } from "react";
import "./AssignedTasks.css"; // Import CSS file for styling

const AssignedTasks = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  const handleStatusChange = (taskId, userId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedUsers = task.assignedTo.map(user => {
          if (user.id === userId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
        return { ...task, assignedTo: updatedUsers };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map(task => (
          task.assignedTo && task.assignedTo.length > 0 && ( // Check if assignedTo array is not empty
            <div className="task-box" key={task.id}>
              <p className="task-name">Task Name: {task.name}</p>
              <p className="assigned-to">Assigned To:</p>
              <ul className="user-list">
                {task.assignedTo.map(user => (
                  <li key={user.id}>
                    {user.name}
                    <div>
                      <button onClick={() => handleStatusChange(task.id, user.id, 'start')} >Start</button>
                      <button onClick={() => handleStatusChange(task.id, user.id, 'process')} style={{marginLeft:"5px"}}>Process</button>
                      <button onClick={() => handleStatusChange(task.id, user.id, 'end')} style={{marginLeft:"5px"}}>End</button>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          )
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default AssignedTasks;