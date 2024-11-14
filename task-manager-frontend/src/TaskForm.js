import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', status: 'TO_DO' });
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if title is provided
        if (!task.title.trim()) {
            setSnackbarMessage('Title is required!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        // Prepare task data
        const taskData = {
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null
        };

        console.log('Sending task data:', taskData); // Log the data being sent

        // Include Basic Auth credentials (username:password)
        const auth = {
            username: 'admin', // username from application.properties
            password: 'adminpass', // password from application.properties
        };

        // Make the POST request
        axios.post('http://localhost:8080/taskmanager/api/tasks', taskData)
        .then((response) => {
            console.log('Task created:', response);
            setTask({ title: '', description: '', dueDate: '', status: 'TO_DO' });
            setSnackbarMessage('Task created successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        })
        .catch((error) => {
            console.error('Error creating task:', error.response || error);
            setSnackbarMessage('Error creating task. Please try again!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        });
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Task Title"
                required
            />
            <input
                type="text"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                placeholder="Task Description"
            />
            <input
                type="datetime-local"
                value={task.dueDate}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;