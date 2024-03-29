import React, { useContext, useState } from 'react';
import '../css/custom.css';
import { Typography, Input, DatePicker, TimePicker, Button, Collapse, Switch, message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import UserContext from '../store/UserContext';

const CreatePoll = () => {
    const { uuid } = useContext(UserContext);
    const { Panel } = Collapse;
    const { Title } = Typography;
    const [options, setOptions] = useState(['', '']);
    const [Ques, setQues] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [reqName, setReqName] = useState(false);
    const [login, setLogin] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleCreatePoll = () => {
        const trimmedQuestion = Ques.trim();
        if (trimmedQuestion === '') {
            messageApi.error('Please enter the poll question.');
            return;
        }

        if (options.some((option) => option.trim() === '')) {
            messageApi.error('Please fill all the options.');
            return;
        }

        if (startDate === null) {
            messageApi.error('Please select a start date.');
            return;
        }

        if (startTime === null) {
            messageApi.error('Please select a start time.');
            return;
        }

        const selectedStartDate = dayjs(startDate);
        const currentDate = dayjs();
        if (selectedStartDate.isBefore(currentDate, 'day')) {
            messageApi.error('Start date cannot be in the past.');
            return;
        }

        if (endDate !== null && endTime !== null) {
            const selectedEndDate = dayjs(endDate);
            const selectedEndTime = dayjs(endTime);

            if (selectedEndDate.isBefore(selectedStartDate, 'day') ||
                (selectedEndDate.isSame(selectedStartDate, 'day') && selectedEndTime.isBefore(startTime))) {
                messageApi.error('Please enter valid end date and time.');
                return;
            }
        }

        if (options.length < 2) {
            messageApi.error('Please fill at least two options.');
            return;
        }

        if (options.length > 6) {
            messageApi.error('There cannot be more than 6 options');
            return;
        }

        const pollData = {
            question: Ques,
            startDate: selectedStartDate.format('YYYY-MM-DD'),
            startTime: startTime.format('HH:mm A'),
            endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
            endTime: endTime ? endTime.format('HH:mm A') : null,
            options: options.filter((option) => option !== ''),
            uuid,
            reqName,
            login
        };

        saveDataToDatabase(pollData);
    };

    const saveDataToDatabase = (pollData) => {
        fetch( `${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/savedata`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pollData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setQues('');
                setEndDate(null);
                setEndTime(null);
                setOptions(['', '']);
                setReqName(false);
                setLogin(false);
                messageApi.success('Poll Created Successfully')
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    return (
        <div className="component p-5 col-sm-5 mx-auto shadow">{contextHolder}
            <Title level={2} style={{ textAlign: 'center', color: 'navy' }}>
                Create New Poll
            </Title>

            <label>Question:</label>
            <br />
            <Input
                placeholder="Enter poll title"
                style={{ width: '500px' }}
                value={Ques}
                onChange={(e) => setQues(e.target.value)}
                className="inputBg col"
            />
            <br />
            <br />

            <label>Options:</label>
            <br />
            {options.map((option, index) => (
                <React.Fragment key={index}>
                    <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder="Enter choice"
                        style={{ width: '275px' }}
                        className="inputBg col"
                    />
                    <br />
                    <br />
                </React.Fragment>
            ))}

            <Button
                type=""
                className='iconBg'
                onClick={() => setOptions([...options].slice(0, -1))}
                shape="circle"
                icon={<MinusOutlined />}
            ></Button>

            <Button
                type=""
                onClick={() => setOptions([...options, ''])}
                className='iconBg'
                shape="circle"
                icon={<PlusOutlined />}
            ></Button>
            <br />
            <br />

            <Collapse defaultActiveKey={['']}>
                <Panel header="Show Advanced Settings" key="1" style={{ color: 'navy' }}>
                    <label>Start Time:</label>
                    <br />
                    <DatePicker
                        defaultValue={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="timebox"
                    />
                    <TimePicker
                        defaultValue={startTime}
                        format="h:mm A"
                        onChange={(time) => setStartTime(time)}
                        className="timebox"
                    />
                    <br />

                    <label>End Time:</label>
                    <br />
                    <DatePicker
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="timebox"
                    />
                    <TimePicker
                        value={endTime}
                        format="h:mm A"
                        onChange={(time) => setEndTime(time)}
                        className="timebox"
                    />
                    <br />
                    <br />
                    <div>
                        <label htmlFor="toggleSwitch" style={{ marginRight: '10px' }}>
                            Capture name and email:
                        </label>
                        <Switch id="toggleSwitch" checked={reqName} onChange={setReqName}/>
                        <br /><br />
                        <label htmlFor="toggleSwitch2" style={{ marginRight: '10px' }}>
                            Login mandatory:
                        </label>
                        <Switch id="toggleSwitch2" checked={login} onChange={setLogin} />
                    </div>
                </Panel>
            </Collapse>
            <br />
            <br />

            <Button
                type="primary"
                onClick={handleCreatePoll}
                className="blueBg col sameWidth"
            >
                Submit
            </Button>
        </div>
    );
};

export default CreatePoll;
