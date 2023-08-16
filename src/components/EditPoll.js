import React, { useState, useEffect } from 'react';
import { Typography, Input, DatePicker, TimePicker, Button, Collapse, Switch } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useParams, useHistory } from 'react-router-dom';
import '../css/custom.css';

const EditPoll = () => {
    const { id } = useParams();
    const history = useHistory();

    const { Panel } = Collapse;
    const { Title } = Typography;
    const [options, setOptions] = useState(['', '']);
    const [Ques, setQues] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [reqName, setReqName] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        // Fetch poll data based on the ID and populate the form fields
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setQues(data.question);
                setStartDate(data.startDate);
                setStartTime(data.startTime);
                setEndDate(data.endDate);
                setEndTime(data.endTime);
                setOptions(data.options);
                setReqName(data.reqName);
                setLogin(data.login);
            })
            .catch((error) => console.error('Error fetching poll data:', error));
    }, [id]);

    const handleUpdatePoll = () => {
        const trimmedQuestion = Ques.trim();
        if (trimmedQuestion === '') {
            setErrorMessage('Please enter the poll question.');
            return;
        }

        if (options.some((option) => option.trim() === '')) {
            setErrorMessage('Please fill all the options.');
            return;
        }

        if (options.length < 2) {
            setErrorMessage('Please fill at least two options.');
            return;
        }

        if (options.length > 6) {
            setErrorMessage('There cannot be more than 6 options');
            return;
        }

        if (startDate === null) {
            setErrorMessage('Please select a start date.');
            return;
        }

        if (startTime === null) {
            setErrorMessage('Please select a start time.');
            return;
        }

        const pollData = {
            question: trimmedQuestion,
            startDate,
            startTime,
            endDate,
            endTime,
            options: options.filter((option) => option !== ''),
            reqName,
            login
        };

        // Send the updated poll data to the server
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/editpoll/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pollData),
        })
            .then((res) => {
                if (res.status === 200) {
                    setErrorMessage('');
                    setSuccessMessage('Poll updated successfully!');
                } else {
                    throw new Error('Failed to update poll');
                }
            })
            .catch((error) => {
                console.error('Error updating poll:', error);
                setErrorMessage('Failed to update poll');
                setSuccessMessage('');
            });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    return (
        <div className="component p-5 col-sm-5 mx-auto shadow">
            <Title level={2} style={{ textAlign: 'center', color: 'navy' }}>
                Edit Poll
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
                type="primary"
                style={{ marginRight: '10px' }}
                onClick={() => setOptions([...options].slice(0, -1))}
                className="iconBg"
                shape="circle"
                icon={<MinusOutlined />}
            ></Button>

            <Button
                type="primary"
                onClick={() => setOptions([...options, ''])}
                className="iconBg"
                shape="circle"
                icon={<PlusOutlined />}
            ></Button>
            <br />
            <br />

            <Collapse defaultActiveKey={['1']}>
                <Panel header="Show Advanced Settings" key="1" style={{ color: 'navy' }}>
                    <label>Start Time:</label>
                    <br />
                    <DatePicker
                        value={startDate ? dayjs(startDate, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => setStartDate(dateString)}
                        className="timebox"
                    />
                    <TimePicker
                        value={startTime ? dayjs(startTime, 'HH:mm A') : null}
                        format="h:mm A"
                        onChange={(time, timeString) => setStartTime(timeString)}
                        className="timebox"
                    />
                    <br />

                    <label>End Time:</label>
                    <br />
                    <DatePicker
                        value={endDate ? dayjs(endDate, 'YYYY-MM-DD') : null}
                        onChange={(date, dateString) => setEndDate(dateString)}
                        className="timebox"
                    />
                    <TimePicker
                        value={endTime ? dayjs(endTime, 'HH:mm A') : null}
                        format="h:mm A"
                        onChange={(time, timeString) => setEndTime(timeString)}
                        className="timebox"
                    />
                    <br />
                    <br />
                    <div>
                        <label htmlFor="toggleSwitch" style={{ marginRight: '10px' }}>
                            Capture name and email:
                        </label>
                        <Switch id="toggleSwitch" checked={reqName} onChange={setReqName} />
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
                onClick={handleUpdatePoll}
                className="blueBg col sameWidth"
            >
                Update
            </Button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default EditPoll;
