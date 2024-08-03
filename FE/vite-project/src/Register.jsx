import React, { useState } from 'react';
import axios from 'axios';
import './relo.css'
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', { name, email, password });
            console.log(response.data);
            alert('data sent in your database :Register successful');
            setEmail('')
        } catch (error) {
            console.error(error);
        }
    };       
    return (
        
<>
<h1>This is register</h1>
        <div className='registerss'>
            
            <form onSubmit={handle}>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br /><br />
                <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button type="submit">Register</button><br /><br />
            </form>
        </div>
</>
    );
}
