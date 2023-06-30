import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import '../css/CreatePoll.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const { Title } = Typography;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Perform registration logic here
        console.log('Registering user:', { name, email, password });
    };

    return (
        <div className='p-5 col-4 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom: '5%' }}>

            <Title level={2} className='text-center mb-0'>Create a free account</Title>
            <div className='text-center '>
                <Link to="/login"  style={{ fontSize: '14px', color: 'black' }}>Or log in to your account</Link>
            </div><br />

            <label>Name:</label><br />
            <Input placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='inputBg col' /><br /><br />

            <label>Email:</label><br />
            <Input placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='inputBg col' /><br /><br />

            <label>Password:</label><br />
            <Input.Password placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='inputBg col' /><br /><br /><br />

            <Button type="primary" onClick={handleRegister} className='buttonBg col'>Register</Button>            

        </div>
    );
};

export default Register;
