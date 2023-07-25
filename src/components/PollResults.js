import React, { useState, useEffect } from 'react';
// import { Bar, Pie } from '@ant-design/plots';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Table } from 'antd';

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

    return (
    <div className='container mb-5'>

        <div className='row'>
            {/* <div className="col-sm-6">{answers && answers.length > 0 && <div className="chart-item" style={{backgroundColor: 'white'}}><Bar {...barConfig} /></div>}</div>
            <div className="col-sm-6">{answers && answers.length > 0 && <div className="chart-item" style={{ backgroundColor: 'white' }}><Pie {...pieConfig} /></div>}</div> */}
        </div>

        <div className="row">
            <div className="col-sm-12 text-center">
                <Table
                    dataSource={answers}
                    pagination={false}
                    className="mx-5 mt-5"
                    bordered>
                    <Table.Column
                        title="Options"
                        dataIndex="answer"
                        key="answer"/>
                    <Table.Column
                        title="Count"
                        dataIndex="count"
                        key="count"/>
                </Table><br />
                    <Button onClick={() => {
                        history.push(`/viewpoll/${id}`)
                    }}>View Poll</Button>
                    
                    <Button onClick={() => {
                        history.push(`/editpoll/${id}`)
                    }}>Edit Poll</Button>

            </div>
        </div>
    </div>
    );
};

export default PollResults;