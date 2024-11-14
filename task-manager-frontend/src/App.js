import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import './App.css'; // Import the CSS file for global styling

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Task Manager</h1>
                <p className="app-description">Organize your tasks efficiently!</p>
            </header>
            
            <div className="main-content">
                <TaskForm />
                <TaskList />
            </div>
        </div>
    );
};

export default App;

