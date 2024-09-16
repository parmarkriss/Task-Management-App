import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';

const AdminUpdate = () => {
    const { id } = useParams(); // Get task ID from URL
    const [task, setTask] = useState({ title: '', status: '', userId: '', category: '' });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch task details by ID
        axios.get(`http://localhost:8000/task/${id}`)
            .then(res => setTask(res.data))
            .catch(err => console.log(err));

        // Fetch users for the dropdown
        axios.get('http://localhost:8000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/task/${id}`, task)
            .then(() => {
                navigate('/dashboard'); // Redirect to dashboard after update
            })
            .catch(err => console.log(err));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Task</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Status"
                    name="status"
                    select
                    value={task.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Complete">Complete</MenuItem>
                </TextField>
                <TextField
                    label="Category"
                    name="category"
                    select
                    value={task.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <MenuItem value="Work">Work</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                    label="Assign to User"
                    name="userId"
                    select
                    SelectProps={{ native: true }}
                    value={task.userId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                    Update Task
                </Button>
            </form>
        </Container>
    );
};

export default AdminUpdate;
