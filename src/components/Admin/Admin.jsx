import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = () => {
        axios.get(`http://localhost:8000/users?email=${email}&password=${password}&role=admin`)
            .then((res => {
                if (res.data) {
                    localStorage.setItem('adminuser', JSON.stringify(res.data[0]));
                    setEmail("");
                    setPassword("");
                    navigate('/dashboard');
                } else {
                    alert("email and password is not valid..");
                }
            })).catch((err) => {
                console.log(err);
                return false;

            })
    }


    return (
        <div>
            <div className='login-container d-flex justify-content-center align-items-center min-vh-100'>
                <div className="card p-4" style={{ maxWidth: '' }}>
                    <h1 className='text-center mb-4'>Admin Login</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleSubmit()}
                            >
                                Login
                            </button>
                           <Link to={`/login`}>
                           <button
                                type="button"
                                className="btn btn-primary"
                            >
                                UserLogin
                            </button>
                           </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Admin
