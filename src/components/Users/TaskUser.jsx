import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskUser = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('checkUserLogin'));  // Get logged-in user data
        try {
            const response = await axios.post('http://localhost:8000/task', {
                task,
                description,
                category,
                status,
                userId: user.id  // Include userId when adding a task
            });
            console.log('Task added successfully:', response.data);
            setTask('');
            setDescription('');
            setCategory('');
            setStatus('Pending');
            navigate('/viewuser');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Create New Task
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Add task"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Task
                </Button>
            </form>
        </Container>
    );
};

export default TaskUser;
