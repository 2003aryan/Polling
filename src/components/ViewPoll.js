import React, { useEffect, useState } from 'react';
import { Typography, Radio, Space, Button, Input } from 'antd';
import '../css/Master.css';
import { useParams } from 'react-router-dom';

const ViewPoll = () => {

    const { Title } = Typography;
    const [ans, setAns] = useState('');
    const [poll, setPoll] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/api/polls/viewpoll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPoll(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAns = () => {
        const data = { ans, questionid: id, name, email }
        console.log('Submitting answer:', data);
        saveAns(data);
    };
    
    const saveAns = (ans) => {
        fetch(`http://localhost:5001/api/polls/viewpoll/${id}/saveans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ans),
        })};

    return (
        <div className='component py-4 px-5 col-5 mx-auto shadow'>
            <Title level={4} className='mb-4'>{poll.question}</Title>
            <Radio.Group onChange={(e) => { setAns(e.target.value) }} value={ans} style={{ width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {poll.options && poll.options.map((option, index) => (
                            <div className='option' key={index}>
                                <Radio value={option}>{option}</Radio>
                            </div>
                        ))
                    }
                </Space>
            </Radio.Group>

            {/* <label className='mt-5 font-weight-bold'>Name:</label><br /> */}
            <Title level={5} className='mt-5'>Name:</Title>
            <Input placeholder="Enter your name" style={{ width: '500px' }} value={name} onChange={(e) => { setName(e.target.value) }} className='option col' />

            <Title level={5} className='mt-3'>Email:</Title>
            <Input placeholder="Enter your name" style={{ width: '500px' }} value={email} onChange={(e) => { setEmail(e.target.value) }} className='option col' /><br /><br /><br />
            <Button type="primary" className='blueBg' onClick={handleAns} style={{width: '130px'}}>Submit</Button><br /><br />
        </div>
    );
};

export default ViewPoll;