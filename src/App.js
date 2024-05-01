import React, { useState, useEffect } from 'react';
import './App.css';
import MyTaskSideBar from "./Components/MyTaskSideBar";
import AssignedTasks from "./Components/AssignedTasks";
import TaskStatus from './Components/TaskStatus';
import Modal from 'react-modal';

const customforreport = {
  content: {
      width: "400px", 
      height: "350px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", 
      overflow: "hidden",
      zIndex: 2,
  },
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [showContainer, setShowContainer] = useState("MyTask");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  console.log("selected Users", selectedUsers)

  const openModal = (taskId, taskName) => {
    setIsOpen(true);
    setSelectedTaskId(taskId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const dummyUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Michael Brown" },
    { id: 5, name: "Emily Davis" },
    { id: 6, name: "Daniel Wilson" },
    { id: 7, name: "Olivia Martinez" },
    { id: 8, name: "William Taylor" },
    { id: 9, name: "Sophia Anderson" },
    { id: 10, name: "James Jackson" }
  ];
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleAddTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      assignedTo: null,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAssignedTasks = (state) => {
    setShowContainer(state)
  }

  const handleUserSelection = (user) => {
    setSelectedUsers((prevUsers) => {
      if (prevUsers.some((prevUser) => prevUser.id === user.id)) {
        return prevUsers.filter((prevUser) => prevUser.id !== user.id);
      } else {
        return [...prevUsers, user];
      }
    });
  };

  const handleAssignTask = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTaskId) {
        let combinedUsers;
        if (task.assignedTo && Array.isArray(task.assignedTo)) {
          // Combine existing assignedTo users with newly selected users
          combinedUsers = [...new Set([...task.assignedTo, ...selectedUsers])];
        } else {
          // If assignedTo is null or not an array, use only selectedUsers
          combinedUsers = selectedUsers;
        }
        return { ...task, assignedTo: combinedUsers };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsOpen(false);
    setSelectedUsers([]);
  };
  

  return (
    <div className='main-container'>
      <MyTaskSideBar onAddTask={handleAddTask} tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} onAssignedTasks={handleAssignedTasks} />
      <div className='right-container'>
        <h1>Ashraf Mohammad Portal</h1>
        <hr className='hr-line' />

        {showContainer === "MyTask" && (
          <div className="task-list-container">
          {tasks.length === 0 ? (
            <p style={{textAlign:"center"}}>No tasks available.</p>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.name}
                  <div>
                    <i className="fas fa-edit task-action-icon" onClick={() => handleEditTask(task.id, prompt("Enter new task name", task.name))}></i>
                    <i className="fas fa-trash-alt task-action-icon" onClick={() => handleDeleteTask(task.id)}></i>
                    <button className='assign-button' onClick={() => openModal(task.id, task.name)}>Assign</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        )}

        {showContainer === "AssignedTasks" && (
          <AssignedTasks  />
        )}

        {showContainer === "taskstatus" && (
          <TaskStatus />
        )}
        
      </div>

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customforreport}>
        <h1>Assign Task</h1>
        <ul>
          {dummyUsers.map((eachUser) => (
            <li key={eachUser.id} className='task-list'>
              <input
                type="checkbox"
                checked={selectedUsers.some((selectedUser) => selectedUser.id === eachUser.id)}
                onChange={() => handleUserSelection(eachUser)}
              />
              {eachUser.name}</li>
          ))}
        </ul>
        <div style={{textAlign:"center"}}>
        <button className='assign-button' onClick={handleAssignTask}>Assign</button>
        </div>
      </Modal>
      
    </div>
  );
}

export default App;