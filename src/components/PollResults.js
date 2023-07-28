import React, { useState, useEffect } from 'react';
import { Bar, Pie } from '@ant-design/plots';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Col, Row, Table } from 'antd';
import DownloadResult from './DownloadResult';

const PollResults = () => {

    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}/pollresults`)
            .then((res) => res.json())
            .then((data) => {
                setAnswers(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
            fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' :''}/api/polls/viewpoll/${id}/pollresults`)
            .then((res) => res.json())
            .then((data) => {
                setResponses(data);
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
      <div className="container mb-5">
        <div className="row">
          <div className="col-sm-6">
            {answers && answers.length > 0 && (
              <div className="chart-item" style={{ backgroundColor: "white" }}>
                <Bar {...barConfig} />
              </div>
            )}
          </div>
          <div className="col-sm-6">
            {answers && answers.length > 0 && (
              <div className="chart-item" style={{ backgroundColor: "white" }}>
                <Pie {...pieConfig} />
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 text-center">
            <Table dataSource={answers} pagination={false} className="mx-5 mt-5" bordered>
              <Table.Column title="Options" dataIndex="answer" key="answer" />
              <Table.Column title="Count" dataIndex="count" key="count" />
            </Table>
            <br />
            <Row
            justify={'center'}
            gutter={16}
            >
            <Col className="gutter-row" >
            <Button
            size='large'
                onClick={() => {
                  history.push(`/viewpoll/${id}`);
                }}>
                View Poll
              </Button>
            </Col>
            <Col className="gutter-row" >
            <Button size='large'
                onClick={() => {
                  history.push(`/editpoll/${id}`);
                }}>
                Edit Poll
              </Button>
            </Col>
            <Col className="gutter-row">
            <DownloadResult resultData={answers} responseData={responses}/>
            </Col>
            <Col className="gutter-row" >
            <Button size='large'
                onClick={() => {
                    const parsedURL = new URL(window.location.href);
                    const baseURL = `${parsedURL.protocol}//${parsedURL.host}`;
                    const linkToShare =`${baseURL}/viewpoll/${id}`;
                    const message = 'Check out this link: ' + linkToShare;
                  
                    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
                    window.location.href = url;
                  }}>
                Share @WhatsApp
              </Button>
            </Col>
            
            </Row>
           
          </div>
        </div>
      </div>
    );
};

export default PollResults;