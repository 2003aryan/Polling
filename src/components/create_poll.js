import React, { useState } from 'react';
import { Typography, Input, DatePicker, TimePicker, Button } from 'antd';

const CreatePoll = () => {

const [options, setOptions] = useState(['']);
const [Ques, setQues] = useState('')
const { Title } = Typography;

const handleCreatePoll = () => {
    const pollData = {
        question: Ques,
        options: options.filter((option) => option !== ''),
    };
    console.log(pollData);
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
    <div style={{ margin: '50px' }}>

        <Title level={2}>Create New Poll</Title><br /><br />

        <label>Poll Question:</label><br /><br />
        <Input placeholder="Enter poll title" style={{ width: '300px' }} 
        onChange={(e)=>{setQues(e.target.value)}}/><br /><br />

        <label>Start Time:</label><br /><br />
        <DatePicker style={{ marginRight: '25px' }}/>
        <TimePicker /><br /><br />

        <label>End Time:</label><br /><br />
        <DatePicker style={{ marginRight: '25px' }}/>
        <TimePicker /><br /><br />

        <label>Options:</label><br /><br />
        {options.map((option, index) => (
            <React.Fragment key={index}>
            <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder="Enter choice"
                style={{ width: '300px' }}/>
                <br /><br />
            </React.Fragment>
        ))}
        
        <Button type="default" style={{ marginRight: '25px' }} onClick={handleRemoveOption}>Remove</Button>
        <Button type="default" onClick={handleAddOption}>Add</Button><br /><br />
        <Button type="primary" onClick={handleCreatePoll}>Create</Button>

    </div>
    );
};

export default CreatePoll;
