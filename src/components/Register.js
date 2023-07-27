import React, { createContext, useState, useContext } from 'react';
import { Typography, Input, Button } from 'antd';
import '../css/custom.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const { Title } = Typography;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const registerdata = {
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
        };

        console.log('Registering user:', registerdata);
        registerToDatabase(registerdata);
    };

    const registerToDatabase = (registerdata) => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerdata),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuccessMessage('Registeration successful. Please log in.');
                setErrorMessage('');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    return (
            <div className='component p-5 col-4 mx-auto shadow'>
            <Title level={2} className='text-center mb-0' style={{ color: 'navy' }}>Create a free account</Title>
                <div className='text-center '>
                    <Link to="/login" style={{ fontSize: '14px', color: 'navy' }}>Or log in to your account</Link>
                </div><br />

                <label>Name:</label><br />
                <Input placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='col rounded' /><br /><br />

                <label>Email:</label><br />
                <Input placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='col rounded' /><br /><br />

                <label>Password:</label><br />
                <Input.Password placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='col rounded' /><br /><br />

                <label>Confirm Password:</label><br />
                <Input.Password placeholder="Enter your confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='col rounded' /><br /><br /><br />

                <Button type="primary" onClick={handleRegister} className='blueBg col'>Register</Button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
    );
};

export default Register;
