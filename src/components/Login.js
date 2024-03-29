import React, { useState, useContext } from 'react';
import { Typography, Input, Button, message } from 'antd';
import '../css/custom.css'
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../store/UserContext';

const Login = () => {
    const { Title } = Typography;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const history = useHistory();
    const userCtx = useContext(UserContext); // Access the UUID context

    const handleLogin = () => {
        const loginData = { email, password };

        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(loginData),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Login response:', data);
                if (data.message === 'Login successful') {
                    message.success('Login successful')
                    userCtx.globalLoginHandler(data.userId); // Set the UUID in the context
                    history.push('/pollslist');
                } 
                else {
                    console.log('Login failed:', data.message);
                    setErrorMessage(data.message);
                }
            })
            .catch(error => {
                console.error('Error occurred during login:', error);
                setErrorMessage('Error occurred during login');
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
    <div className='container d-flex align-items-center justify-content-center mt-5' style={{ minHeight: '75vh' }}>{contextHolder}

        <div className='row' >

            <div className='py-5 pr-5 col-sm-6 d-flex align-items-center mx-auto'>
                <div className='mx-auto text-center'>
                    <Title level={1} style={{ color: 'navy', textAlign: 'left', margin: '0', padding: '0' }}>
                        LivePoll
                    </Title>
                    <Title level={2} style={{ textAlign: 'left', margin: '0', padding: '0' }}>
                        Making it easy to create instant, real time polls for free.
                    </Title>
                </div>
            </div>

            <div className='component p-5 col-sm-5 mr-auto shadow '>

                <Title level={2} className='text-center mb-0' style={{ color: 'navy' }}>Log in to your account</Title>
                <div className='text-center '>
                    <Link to="/register" style={{ fontSize: '14px', color: 'navy' }}>Or create a free account</Link>
                </div><br />

                <label>Email:</label><br />
                <Input placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='col rounded' /><br /><br />

                <label>Password:</label><br />
                <Input.Password placeholder="Enter your password"
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setPassword(e.target.value)}
                    className='col rounded' /><br /><br /><br />

                <Button type="primary" onClick={handleLogin} className='blueBg col rounded' style={{ backgroundColor: 'navy' }}>Log In</Button>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            </div>
        </div>  
    </div>
    );
};

export default Login;
