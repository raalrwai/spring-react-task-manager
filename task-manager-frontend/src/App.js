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
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setIsTaskFormVisible(false); // Hide TaskForm after submission
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">Task Manager</h1>
                    <p className="app-description">Organize your tasks efficiently and effectively!</p>
                </div>
            </header>
            
            <div className="dashboard-container">
                <aside className="sidebar">
                    <button className="new-task-btn" onClick={toggleTaskForm}>
                        {isTaskFormVisible ? 'Close Task Form' : 'New Task'}
                    </button>
                </aside>
                
                <main className="main-content">
                    {/* Conditionally render TaskForm above TaskList */}
                    {isTaskFormVisible && (
                        <div className="task-form-overlay">
                            <TaskForm onTaskAdded={onTaskAdded} />
                        </div>
                    )}

                    {/* TaskList will show updated tasks */}
                    <TaskList tasks={tasks} />
                </main>
            </div>
        </div>
    );
};

export default App;
