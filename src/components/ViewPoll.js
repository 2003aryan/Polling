import React, { useEffect, useState } from 'react';
import { Typography, Radio, Space, Button, Input, Divider, message, Alert, Modal } from 'antd';
import '../css/custom.css';
import { useParams } from 'react-router-dom';
import Countdown from 'react-countdown'; 
import QRCode from 'react-qr-code';

const ViewPoll = () => {

    let { id } = useParams();
    const { Title } = Typography;
    const [ans, setAns] = useState('');
    const [poll, setPoll] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isEndDatePassed, setIsEndDatePassed] = useState(false);

    
    const success = (a) => {
        messageApi.open({
            type: 'success',
            content: a,
        });
    };

    useEffect(() => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPoll(data);

                const endDateTime = data.endDate && data.endTime ? new Date(`${data.endDate}T${data.endTime}`) : null;
                const now = new Date();

                if (data.endDate && data.endTime && now > endDateTime) {
                    setIsEndDatePassed(true);
                } else {
                    setIsEndDatePassed(false);
                }


            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAns = () => {
        const data = { ans, questionid: id, name, email }
        console.log('Submitting answer:', data);
        saveAns(data);
        setAns('');
        success("Vote Submitted!");
    };

    const saveAns = (ans) => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}/saveans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ans),
        })
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Time's up!</span>;
        } else {
            return (
                <span>
                Voting ends in {days} days, {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </span>
            );
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='component py-4 px-5 col-5 mx-auto shadow'>{contextHolder}

            {isEndDatePassed && <Alert message="The poll has ended. Voting is no longer allowed." type="warning" showIcon className='mb-3'/>}

            {poll.reqName && (
            
                <div>
                    <Title level={4} className='mb-4'>Your Details</Title>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginRight: '10px', alignItems: 'center' }}>Name:</label>
                        <Input placeholder="Enter your name" style={{ width: '500px' }} value={name} onChange={(e) => setName(e.target.value)} className='col' />
                    </div><br/>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px'}}>
                        <label style={{ marginRight: '10px', alignItems: 'center' }}>Email:</label>
                        <Input placeholder="Enter your email" style={{ width: '500px' }} value={email} onChange={(e) => setEmail(e.target.value)} className='col' />
                    </div>

                    <Divider />
                </div>
            
            )}

            <Title level={4} className='mb-4'>{poll.question}</Title>
            <Radio.Group onChange={(e) => { setAns(e.target.value) }} value={ans} style={{ width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {poll.options && poll.options.map((option, index) => (
                        <div className='option' key={index}>
                            <Radio className='custom-radio' value={option}>{option}</Radio>
                        </div>
                    ))
                    }
                </Space>
            </Radio.Group>

            <br /><br />
            <Button type="primary" className='blueBg' onClick={handleAns} style={{ width: '130px' }} disabled={isEndDatePassed}>Submit</Button><br/>
            <Countdown date={new Date(poll.endDate + "T01:02:03")} renderer={renderer} />

            <QRCode title="test" value={window.location.href}/>

            <Button type="default" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

        </div>
    );
};

export default ViewPoll;