import React, { useState, useContext } from 'react';
import { Typography, Input, Button } from 'antd';
import '../css/CreatePoll.css';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../store/UserContext';

const Login = () => {
  const { Title } = Typography;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const userCtx = useContext(UserContext); // Access the UUID context

  const handleLogin = () => {
    const loginData = { email, password };

    fetch('http://localhost:5001/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Login response:', data);
        if (data.message === 'Login successful') {
          userCtx.globalLoginHandler(data.userId); // Set the UUID in the context
          history.push('/pollslist');
        } else {
          console.log('Login failed:', data.message);
          setErrorMessage(data.message);
        }
      })
      .catch(error => {
        console.error('Error occurred during login:', error);
        setErrorMessage('Error occurred during login');
      });
  };

  return (
    <div className='p-5 col-4 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom: '5%' }}>

      <Title level={2} className='text-center mb-0'>Log in to your account</Title>
      <div className='text-center '>
        <Link to="/register" style={{ fontSize: '14px', color: 'black' }}>Or create a free account</Link>
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

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

    </div>
  );
};

export default Login;
