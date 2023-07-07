import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'antd';

const PollResults = () => {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];

    const [answers, setAnswers] = useState([]);
    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/api/polls/viewpoll/${id}/pollresults`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAnswers(answers);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    const handlePage = () => {
        history.push(`/viewpoll/${id}`)
    }

    return (
        <div className=''>
            <div><Pie {...config} /></div>
            <Button onClick={handlePage}>View Poll</Button>
    </div>
    );
};

export default PollResults;

// ReactDOM.render(<DemoPie />, document.getElementById('container'));