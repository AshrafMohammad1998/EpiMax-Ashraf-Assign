import React from "react";
import "./TaskStatus.css"; // Import CSS file for styling

function TaskStatus() {
    const assignData = localStorage.getItem("tasks");
    const parsedTasks = JSON.parse(assignData) || [];
    
    const tasksWithStatus = parsedTasks.flatMap(task => {
        return task.assignedTo?.filter(user => user.status).map(user => ({
            taskName: task.name,
            userName: user.name,
            status: user.status
        }));
    });

    return (
        <div className="task-status-container">
            {tasksWithStatus.map((task, index) => (
                <div className="task-status-item" key={index}>
                    <p className="task-name">Task Name: {task?.taskName}</p>
                    <p className="user-name">User Name: {task?.userName}</p>
                    <p className="status">Status: {task?.status}</p>
                </div>
            ))}
        </div>
    );
}

export default TaskStatus;