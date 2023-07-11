import React, { useEffect, useState } from 'react';
import { Table, Typography, Tag, Dropdown, Menu, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import moment from 'moment';

const { Title } = Typography;

const PollsList = () => {
  const [data, setData] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
      <Menu.Item key="2" onClick={() => {
        setSelectedPoll(record);
        setDeleteModalVisible(true);
      }}>
        Delete
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={`/sharepoll/${record._id}`}>Share</Link>
      </Menu.Item>
    </Menu>
  );

  const deletePoll = () => {
    // Make a DELETE request to the server to delete the poll
    fetch(`http://localhost:5001/api/polls/deletepoll/${selectedPoll._id}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the data by removing the deleted poll from the state
        const updatedData = data.filter((poll) => poll._id !== selectedPoll._id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting poll:', error);
      });

    // Close the delete confirmation modal
    setDeleteModalVisible(false);
  };

  // Reload data after deleting a poll
  useEffect(() => {
    if (deleteModalVisible === false) {
      fetch('http://localhost:5001/api/polls/pollslist')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [deleteModalVisible]);

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <Title level={2} className="mx-5 my-1">Your Polls</Title><br />

      <Table
        dataSource={data}
        pagination={false}
        rowKey="_id"
        className="mx-5"
        bordered
        style={{ borderWidth: '2px', borderColor: 'black' }}
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
        {/* <Table.Column title="Participants" dataIndex="" key="participants" align="center" /> */}
        <Table.Column title="Start Date" dataIndex="startDate" key="startDate" align="center" render={(startDate) => {
          if (startDate) {
            return moment(startDate).format('Do MMMM');
          } else {
            return ' ';
          }
        }} />
        <Table.Column title="End Date" dataIndex="endDate" key="endDate" align="center" render={(endDate) => {
          if (endDate) {
            return moment(endDate).format('Do MMMM');
          } else {
            return ' ';
          }
        } }/>
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

      <Modal
        title="Delete Poll"
        visible={deleteModalVisible}
        onOk={deletePoll}
        onCancel={hideDeleteModal}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this poll?</p>
      </Modal>
    </div>
  );
};

export default PollsList;
