import React, { useState, useEffect } from 'react'; // <-- Import useState and useEffect from React
import axios from 'axios';
import './TaskList.css';  // Import the CSS file for styling

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetching tasks on component mount
    useEffect(() => {
        axios.get('http://localhost:8080/taskmanager/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    // Function to handle the search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter tasks based on the search term (searching in title or description)
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="task-list-container">
            <h3>Task List</h3>
            
            {/* Search bar */}
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search tasks by title or description..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {filteredTasks.length > 0 ? (
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
                        {filteredTasks.map(task => (
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
