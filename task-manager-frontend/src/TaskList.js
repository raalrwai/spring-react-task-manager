import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css';  // Import the CSS file for styling

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/taskmanager/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    return (
        <div className="task-list-container">
            <h3>Task List</h3>
            {tasks.length > 0 ? (
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{new Date(task.dueDate).toLocaleString()}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
