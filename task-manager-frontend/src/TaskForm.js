import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 

const TaskForm = ({ onTaskAdded }) => {
    // State variables
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: 'TO_DO' });
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate title
        if (!task.title.trim()) {
            showSnackbar('Title is required!', 'error');
            return;
        }

        // Prepare task data
        const taskData = {
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null
        };

        // Log the task data
        console.log('Sending task data:', taskData);

        // Post the data to backend
        axios.post('http://localhost:8080/taskmanager/api/tasks', taskData)
            .then((response) => {
                console.log('Task created:', response);
                resetForm();
                showSnackbar('Task created successfully!', 'success');

                // Pass the newly created task back to App.js
                onTaskAdded(response.data); // Update the task list in App.js
            })
            .catch((error) => {
                console.error('Error creating task:', error.response || error);
                showSnackbar('Error creating task. Please try again!', 'error');
            });
    };

    // Show snackbar message
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    // Reset form fields
    const resetForm = () => {
        setTask({ title: '', description: '', dueDate: '', status: 'TO_DO' });
    };

    return (
        <div className="task-form-container">
            <h2>Create a New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        id="title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        placeholder="Enter task title"
                        required
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        placeholder="Enter task description"
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        value={task.dueDate}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <button type="submit" className="submit-btn">Add Task</button>
                </div>
            </form>

            {openSnackbar && (
                <div className={`snackbar ${snackbarSeverity}`}>
                    {snackbarMessage}
                </div>
            )}
        </div>
    );
};

export default TaskForm;
