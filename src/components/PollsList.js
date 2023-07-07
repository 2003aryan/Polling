import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import "../css/PollsList.css";

const { Title } = Typography;

const PollsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/polls/pollslist')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getStatus = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    
    if (end < now) {
      return { status: 'Closed', color: 'red' };
    }
    
    return { status: 'Live', color: 'green' };
  };

  const renderMenu = (record) => (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/viewpoll/${record._id}`}>View</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/deletepoll/${record._id}`}>Delete</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/sharepoll/${record._id}`}>Share</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Title level={2} className='mx-5 my-1'>Your Polls</Title><br />

      <Table dataSource={data} pagination={false} rowKey="_id" className='mx-5' bordered style={{ borderWidth: '2px', borderColor: 'black' }}
      rowClassName={(record, index) => {
        if (true) {
          return 'highlight-bottom-border';
        }
      }}
      >
        <Table.Column
          title="Question"
          dataIndex="question"
          key="question"
          render={(text, record) => (
            <Link to={`/viewpoll/${record._id}/pollresults`} style={{ color: 'black', display: 'block' }}>
              {text}
            </Link>
          )}
        />
        <Table.Column title="Participants" dataIndex="" key="participants" align="center"/>
        <Table.Column title="End Date" dataIndex="endDate" key="endDate" align="center"/>
        <Table.Column
          title="Status"
          dataIndex="endDate"
          key="status"
          align="center"
          render={(endDate) => {
            const { status, color } = getStatus(endDate);
            return (<Tag color={color} key={status}>{status}</Tag>);
          }}
        />
        <Table.Column
          title=""
          key="actions"
          align="center"
          render={(text, record) => (
            <Dropdown overlay={renderMenu(record)}>
              <EllipsisOutlined style={{ fontSize: '24px' }} />
            </Dropdown>
          )}
        />
      </Table>
    </div>
  );
};

export default PollsList;
