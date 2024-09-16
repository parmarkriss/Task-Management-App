import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Container, Typography, Button, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ViewUser = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const handleStatusChange = async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
        try {
            await axios.patch(`http://localhost:8000/task/${taskId}`, { status: newStatus });
            setTasks(tasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            ));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/task/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('checkUserLogin');
        navigate('/login');
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const user = JSON.parse(localStorage.getItem('checkUserLogin'));
            try {
                const response = await axios.get(`http://localhost:8000/task?userId=${user.id}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('checkUserLogin');
        if (!user) {
            navigate('/login');
        }
    }, []);
    

 

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ my: 4 }}>
                Task View
            </Typography>
            <Button color="primary" variant="contained" sx={{ mb: 2 }} component={Link} to="/taskuser">
                Add Task
            </Button>
            <Button color="secondary" variant="contained" sx={{ mb: 2, ml: 2 }} onClick={handleLogout}>
                Logout
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Task</strong></TableCell>
                            <TableCell><strong>Description</strong></TableCell>
                            <TableCell><strong>Category</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.task}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>{task.category}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={task.status === 'Completed' ? 'success' : 'warning'}
                                        onClick={() => handleStatusChange(task.id, task.status)}
                                    >
                                        {task.status}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" component={Link} to={`/edit-task/${task.id}`} sx={{ mr: 1 }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ViewUser;
