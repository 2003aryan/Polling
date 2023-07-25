import React, { useEffect, useState } from 'react';
import { Typography, Radio, Space, Button, Input, Divider, message, Switch, Alert } from 'antd';
import '../css/Master.css';
import { useParams } from 'react-router-dom';

const ViewPoll = () => {

    let { id } = useParams();
    const { Title } = Typography;
    const [ans, setAns] = useState('');
    const [poll, setPoll] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isEndDatePassed, setIsEndDatePassed] = useState(false);

    
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Vote Submitted!',
        });
    };

    useEffect(() => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPoll(data);

                // Check if the end date and time have passed
                // const endDate = new Date(data.endDate);
                // const endTime = new Date(data.endTime);
                // const currentDate = new Date();

                // if (currentDate >= endDate || currentDate >= endTime) {
                //     setIsEndDatePassed(true);
                // } else {
                //     setIsEndDatePassed(false);
                // }

                // ALT
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
        success();
    };

    const saveAns = (ans) => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}/saveans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ans),
        })
    };

    return (
        <div className='component py-4 px-5 col-5 mx-auto shadow'>{contextHolder}

            {isEndDatePassed && <Alert message="The poll has ended. Voting is no longer allowed." type="warning" showIcon className='mb-3'/>}

            {poll.reqName && (
            
            <div><Title level={5}>Name:</Title>
                <Input placeholder="Enter your name" style={{ width: '500px' }} value={name} onChange={(e) => { setName(e.target.value) }} className='col' />
                <Title level={5} className='mt-3' >Email:</Title>
                <Input placeholder="Enter your name" style={{ width: '500px' }} value={email} onChange={(e) => { setEmail(e.target.value) }} className='col' />
                <br />    <Divider />
            </div>
            
            )}

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

            {/* <Title level={5} className='mt-3'>Email:</Title>
            <Input placeholder="Enter your name" style={{ width: '500px' }} value={email} onChange={(e) => { setEmail(e.target.value) }} className='option col' /> */}

            <br /><br />
            <Button type="primary" className='blueBg' onClick={handleAns} style={{ width: '130px' }} disabled={isEndDatePassed}>Submit</Button>

            {/* {userUUID === poll.uuid && (
                <div>
                    <label htmlFor="toggleSwitch" style={{ marginRight: '10px' }}>Accepting responses</label>

                    <Switch
                        checked={isPollReopenEnabled}
                        onChange={(checked) => setIsPollReopenEnabled(checked)}
                        // checkedChildren="Reopen Poll"
                        // unCheckedChildren="Close Poll"
                    />
                </div>
            )} */}

        </div>
    );
};

export default ViewPoll;