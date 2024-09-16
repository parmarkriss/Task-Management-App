import axios from 'axios';
import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [passwordmatch, setPasswordMatch] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("user"); 

    const handleSubmit = async () => {
        if (name && email && password && gender && confirmpassword && role) {
            if (password !== confirmpassword) {
                alert("Passwords do not match");
            } else {
                try {
                    const user = await axios.post('http://localhost:8000/users', {
                        name : name,
                        email : email,
                        password : password,
                        confirmpassword : confirmpassword,
                        gender : gender,
                        role : role,
                    });
    
                    if (user.data) {
                        alert("User Successfully Registered");
                        localStorage.setItem('isRegistered', 'true'); 
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmpassword("");
                        setGender("");
                        setRole(""); 
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("User not registered");
                    return false;
                }
            }
        } else {
            alert("Please fill all details");
        }
    };
    

    return (
        <div className='register'>
            <div className="testbox">
                <h1>Registration</h1>
                <form action="/">
                    <hr />
                    <label id="icon" htmlFor="name"><i className="icon-user" /></label>
                    <input type="text" name="name" id="name" placeholder="Name" required onChange={(e) => setName(e.target.value)} value={name} />

                    <label id="icon" htmlFor="email"><i className="icon-envelope" /></label>
                    <input type="text" name="email" id="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />

                    <label id="icon" htmlFor="password"><i className="icon-shield" /></label>
                    <input type="password" name="password" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} className='mt-3' />

                    <label id="icon" htmlFor="confirmpassword"><i className="icon-shield" /></label>
                    <input type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" required onChange={(e) => setConfirmpassword(e.target.value)} value={confirmpassword} className='mt-1' />

                    <div className="gender">
                        <input type="radio" id="male" name="gender" defaultChecked value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                        <label htmlFor="male" className="radio">Male</label>
                        <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                        <label htmlFor="female" className="radio">Female</label>
                    </div>

                    <div className="role">
                        <label htmlFor="role">Role:</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
