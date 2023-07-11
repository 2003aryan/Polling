import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar, Pie } from '@ant-design/plots';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import '../css/Master.css';

const PollResults = () => {

    const [answers, setAnswers] = useState([]);
    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5001/api/polls/viewpoll/${id}/pollresults`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAnswers(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    let pieConfig = {
        appendPadding: 10,
        data : answers,
        angleField: 'count',
        colorField: 'answer',
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

    const barConfig = {
        data: answers,
        xField: 'count',
        yField: 'answer',
        seriesField: 'answer',
        legend: {
            position: 'top-left',
        },
    };

    const handlePage = () => {
        history.push(`/viewpoll/${id}`)
    }

    return (
    <div>
            <div className="chart-container">
                {answers && answers.length > 0 && <div className="chart-item"><Bar {...barConfig} /></div>}
                {answers && answers.length > 0 && <div className="chart-item"><Pie {...pieConfig} /></div>}
            </div>
            <Button onClick={handlePage}>View Poll</Button>
    </div>
    );
};

export default PollResults;

// ReactDOM.render(<DemoPie />, document.getElementById('container'));