import React, { useState } from 'react';
import { Typography, Input, DatePicker, TimePicker, Button } from 'antd';
import './CreatePoll.css';

const CreatePoll = () => {

    const [options, setOptions] = useState(['']);
    const [Ques, setQues] = useState('')
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const { Title } = Typography;

    const handleCreatePoll = () => {
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

    const saveDataToDatabase = (pollData) => {
        fetch('/api/polls/savedata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pollData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // Handle the response if needed
          })
          .catch((error) => {
            console.error('Error saving data:', error);
            // Handle the error if needed
          });
      };
    
    
    return (
        <div className=' p-5 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom:'5%'}}>

            <Title level={2}>Create New Poll</Title><br />

            <label>Poll Question:</label><br />
            <Input placeholder="Enter poll title" style={{ width: '500px' }}
                onChange={(e) => { setQues(e.target.value) }} className='inputBg col'/><br /><br />

            <label>Start Time:</label>
            <br />
            <DatePicker onChange={(date, dateString) => setStartDate(dateString)} style={{ marginRight: '30px' }} className='inputBg'/>
            <TimePicker onChange={(time, timeString) => setStartTime(timeString)} className='inputBg'/>
            <br /><br />
            <label>End Time:</label>
            <br />
            <DatePicker onChange={(date, dateString) => setEndDate(dateString)} style={{ marginRight: '30px' }} className='inputBg'/>
            <TimePicker onChange={(time, timeString) => setEndTime(timeString)} className='inputBg'/>
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

            <Button type="primary" style={{ marginRight: '30px' }} onClick={handleRemoveOption} className='buttonBg'>Remove</Button>
            <Button type="primary" onClick={handleAddOption} className='buttonBg'>Add</Button><br /><br />
            <Button type="primary" onClick={handleCreatePoll} className='buttonBg'>Create</Button>

        </div>
    );
};

export default CreatePoll;
