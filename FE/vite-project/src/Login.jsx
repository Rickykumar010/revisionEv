import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // Store token in local storage
            alert('Login successful');
            navigate('/show'); 
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>This is Login</h1>
            <form onSubmit={handle}>
     <input type="email" placeholder='email'value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
    <input  type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
     <button type="submit">Login</button>
                <br />
            </form>
        </div>
    );
}
