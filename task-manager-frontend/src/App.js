import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css'; // Import the CSS file for global styling
import axios from 'axios';

const App = () => {
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false); // State to manage form visibility
    const [tasks, setTasks] = useState([]);

    // Fetching tasks on component mount
    const fetchTasks = () => {
        axios.get('http://localhost:8080/taskmanager/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    };

    // Fetch tasks initially
    React.useEffect(() => {
        fetchTasks();
    }, []);

    // Toggle visibility of TaskForm
    const toggleTaskForm = () => {
        setIsTaskFormVisible(!isTaskFormVisible);
    };

    // This function is passed to TaskForm to update the task list after adding a new task
    const onTaskAdded = (newTask) => {
        // You could either append the new task directly to the state
        setTasks((prevTasks) => [...prevTasks, newTask]);

        // Or re-fetch tasks from the backend (if the task list needs to be synchronized)
        // fetchTasks();

        // Hide the TaskForm after submission
        setIsTaskFormVisible(false);
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Task Manager</h1>
                <p className="app-description">Organize your tasks efficiently!</p>
            </header>
            
            <div className="main-content">
                <div className="task-list-container">
                    {/* New Task button positioned at the top left */}
                    <button className="new-task-btn" onClick={toggleTaskForm}>
                        {isTaskFormVisible ? 'Hide Task Form' : 'New Task'}
                    </button>

                    {/* Conditionally render TaskForm above TaskList */}
                    {isTaskFormVisible && (
                        <div className="task-form-overlay">
                            <TaskForm onTaskAdded={onTaskAdded} />
                        </div>
                    )}

                    {/* TaskList will show updated tasks */}
                    <TaskList tasks={tasks} />
                </div>
            </div>
        </div>
    );
};

export default App;
