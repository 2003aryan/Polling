import React, { useState } from 'react';
import { Typography, Input, DatePicker, TimePicker, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import '../css/CreatePoll.css';
import moment from 'moment';

const CreatePoll = () => {

    const { Title } = Typography;
    const [options, setOptions] = useState(['']);
    const [Ques, setQues] = useState('')
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreatePoll = () => {

        const trimmedQuestion = Ques.trim();
        if (trimmedQuestion === '') {
            setErrorMessage('Please enter the poll question.');
        return;}

        const selectedStartDate = new Date(startDate + 'T' + startTime);
        const currentDate = new Date();
        if (selectedStartDate < currentDate) {
            setErrorMessage('Start date cannot be in the past.');
        return;}

        if (options.length < 2) {
            setErrorMessage('Please fill at least two options.');
        return;}

        const pollData = {
            question: Ques,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            options: options.filter((option) => option !== ''),
        };
        console.log(pollData);
        saveDataToDatabase(pollData);
        setQues('');

    };

    const saveDataToDatabase = (pollData) => {
        fetch('http://localhost:5001/api/polls/savedata', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(pollData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setQues('');
            setEndDate(null);
            setEndTime(null);
            setOptions(['']);
            setErrorMessage('');
            setSuccessMessage('Poll Created Successfully!!');
        })
          .catch((error) => console.error('Error saving data:', error));
      };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = () => {
        setOptions([...options].slice(0, -1));
    };
    
    return (
        <div className=' p-5 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom:'5%'}}>

            <Title level={2} style={{ textAlign: 'center' }}>Create New Poll</Title>

            <label>Question:</label><br />
            <Input placeholder="Enter poll title" style={{ width: '500px' }}
            value={Ques} onChange={(e) => { setQues(e.target.value) }} className='inputBg col'/><br /><br />

            <label>Start Time:</label>
            <br />
            <DatePicker defaultValue={moment()} onChange={(date, dateString) => setStartDate(dateString)} style={{ marginRight: '30px' }} className='inputBg sameWidth'/>
            <TimePicker defaultValue={moment()} format="h:mm A" onChange={(time, timeString) => setStartTime(timeString)} className='inputBg sameWidth'/>
            <br /><br />
            <label>End Time:</label>
            <br />
            <DatePicker onChange={(date, dateString) => setEndDate(dateString)} style={{ marginRight: '30px' }} className='inputBg sameWidth'/>
            <TimePicker format="h:mm A" onChange={(time, timeString) => setEndTime(timeString)} className='inputBg sameWidth'/>
            <br /><br />

            <label>Options:</label><br />
            {options.map((option, index) => (
                <React.Fragment key={index}>
                    {index+1 + '.  '}
                    <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder="Enter choice"
                        style={{ width: '275px' }} 
                        className='inputBg col'/>
                    <br /><br />
                </React.Fragment>
            ))}

            {/* <Button type="primary" style={{ marginRight: '30px', width: '90px' }} onClick={handleRemoveOption} className='buttonBg'>Remove</Button>
            <Button type="primary" onClick={handleAddOption} style={{ width: '90px' }}className='buttonBg'>Add</Button><br /><br /> */}
            <Button type="primary" style={{ marginRight: '10px' }} onClick={handleRemoveOption} className='iconBg' shape="circle" icon={<MinusOutlined />}></Button>
            <Button type="primary" onClick={handleAddOption} className='iconBg' shape="circle" icon={<PlusOutlined />}></Button><br /><br />
            <Button type="primary" onClick={handleCreatePoll} className='buttonBg col sameWidth'>Submit</Button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}


        </div>
    );
};

export default CreatePoll;
