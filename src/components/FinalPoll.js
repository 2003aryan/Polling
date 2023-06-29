import React, { useEffect, useState } from 'react';
import { Typography, Radio, Space, Button } from 'antd';
import '../css/FinalPoll.css';
import { useParams } from 'react-router-dom';

const FinalPoll = () => {

    const { Title } = Typography;
    const [value, setValue] = useState(1);
    const [poll, setPoll] = useState({});
    
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/api/polls/poll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPoll(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className=' py-4 px-5 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom: '5%' }}>
            <Title level={3}>{poll.question}</Title>
            <Radio.Group onChange={onChange} value={value} style={{ width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {poll.options && poll.options.map((option, index) => (
                            <div className='option' key={index}>
                                <Radio value={option}>{option}</Radio>
                            </div>
                        ))
                    }
                </Space>
            </Radio.Group><br/><br/>
            <Button type="primary" className='buttonBg'>Submit</Button>
        </div>
    )
}

export default FinalPoll