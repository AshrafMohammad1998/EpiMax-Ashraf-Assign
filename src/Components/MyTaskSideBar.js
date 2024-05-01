import React, { useState } from "react";
import "./MyTaskSidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const customforreport = {
    content: {
        width: "400px", 
        height: "300px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        overflow: "hidden",
        zIndex: 2,
    },
};

function MyTaskSideBar ({ onAddTask, onAssignedTasks }) {
    const [isOpen, setIsOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [selectItem, setSelectItem] = useState("MyTask")

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleTaskInputChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleAddButtonClick = () => {
        if (taskName.trim() !== '') {
            onAddTask(taskName);
            setTaskName('');
            closeModal();
        }
    };

    const handleMyTask = () => {
        setSelectItem("MyTask")
        onAssignedTasks("MyTask")
    }

    const handleAssignedTasksClick = () => {
        setSelectItem("AssignedTasks")
        onAssignedTasks("AssignedTasks")
      };

    const handleTaskStatus = () => {
        setSelectItem("taskstatus")
        onAssignedTasks("taskstatus")
    }

    return(
        <div className="sidebar-container">
            <div className="add-task-container" onClick={handleMyTask} style={{ cursor: "pointer" }}>
            <h1 className="add-task-name" style={{ color: selectItem === "MyTask" ? "orange" : "inherit" }}>Add Task</h1>
                <div className="add-task-icon" onClick={openModal}> <FontAwesomeIcon icon={faPlus}  /> </div>
            </div>

            <div onClick={handleAssignedTasksClick} style={{ cursor: "pointer" }}>
                <h1 className="add-task-name" style={{ color: selectItem === "AssignedTasks" ? "orange" : "inherit" }}>Assigned Tasks</h1>
            </div>

            <div onClick={handleTaskStatus} style={{ cursor: "pointer" }}>
                <h1 className="add-task-name" style={{ color: selectItem === "taskstatus" ? "orange" : "inherit" }}>Status</h1>
            </div>

            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customforreport}>
                <input type="text" placeholder="Enter task name" className="input-box" value={taskName} onChange={handleTaskInputChange} />
                <button className="add-button" onClick={handleAddButtonClick}>Add</button>
            </Modal>
        </div>
    )
}

export default MyTaskSideBar;