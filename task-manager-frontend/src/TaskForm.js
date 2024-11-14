import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [task, setTask] = useState({ title: '', description: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/tasks', task)
            .then(() => setTask({ title: '', description: '' }))
            .catch(error => console.error("Error creating task:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Task Title"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;