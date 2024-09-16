import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        task: '',
        description: '',
        category: '',
        status: 'Pending'
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/task/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/task/${id}`, task);
            navigate('/viewuser');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Edit Task
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="task"
                    label="Task"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={task.task}
                    onChange={handleChange}
                />
                <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={task.description}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        label="Category"
                        value={task.category}
                        onChange={handleChange}
                    >
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        label="Status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Task
                </Button>
            </form>
        </Container>
    );
};

export default EditTask;
