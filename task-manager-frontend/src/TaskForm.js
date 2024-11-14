import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'TO_DO'  // Default status
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure dueDate is in the correct format (ISO string format)
        const taskData = {
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null  // Convert to ISO string if exists
        };

        // Send the task data to the backend
        axios.post('http://localhost:8080/taskmanager/api/tasks', taskData)
            .then(() => {
                setTask({ title: '', description: '', dueDate: '', status: 'TO_DO' });  // Reset form
                alert('Task created successfully!');
            })
            .catch(error => {
                console.error('Error creating task:', error);
                alert('Error creating task.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task Title</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />
            </div>

            <div>
                <label>Task Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Task Description"
                />
            </div>

            <div>
                <label>Due Date</label>
                <input
                    type="datetime-local"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Status</label>
                <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                >
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
