import React, { useState } from 'react';
import { Typography, Input, Button } from 'antd';
import '../css/CreatePoll.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const { Title } = Typography;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    console.log('Logging in:', { email, password });
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log('Redirecting to registration page...');
  };

  return (
    <div className='p-5 col-4 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom: '5%' }}>

      <Title level={2} className='text-center mb-0'>Log in to your account</Title>
      <div className='text-center '>
        <Link to="/register" onClick={handleRegister} style={{ fontSize: '14px', color: 'black' }}>Or create a free account</Link>
      </div><br />

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

      <Button type="primary" onClick={handleLogin} className='buttonBg col'>Log In</Button>

    </div>
  );
};

export default Login;
