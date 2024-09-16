import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Admindashboard = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [adminId, setAdminId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem('adminuser'));
        if (admin) {
            setAdminId(admin.id);
        }

        axios.get('http://localhost:8000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));

        axios.get('http://localhost:8000/task')
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:8000/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
                setTasks(tasks.filter(task => task.userId !== userId)); // Remove tasks assigned to the deleted user
            })
            .catch(err => console.log(err));
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:8000/task/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('adminuser');
        navigate('/admin'); // Redirect to the login page
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleLogout} 
                style={{ marginBottom: '20px' }}
            >
                Logout
            </Button>
            <Typography variant="h5" gutterBottom>Users</Typography>
            <Grid container spacing={3}>
                {users.filter(user => user.id !== adminId).map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography color="textSecondary">{user.email}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    color="secondary" 
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" gutterBottom mt={4}>Tasks</Typography>
            <Grid container spacing={3}>
                {tasks.map(task => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Card>
                            <CardContent>
                                
                                <Typography color="textSecondary">
                                    Assigned to: {users.find(user => user.id === task.userId)?.name || 'Unknown'}
                                </Typography>
                                <Typography  color="textSecondary">Title:{task.title}</Typography>
                                <Typography color="textSecondary">Status: {task.status}</Typography>
                                <Typography color="textSecondary">Category: {task.category || 'No Category'}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    component={Link} 
                                    to={`/adminupdate/${task.id}`} // Update the path to include task ID
                                    sx={{ mr: 1 }}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    size="small" 
                                    color="secondary" 
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Admindashboard;
