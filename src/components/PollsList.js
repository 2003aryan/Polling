import React, { useContext, useEffect, useState } from 'react';
import { Table, Typography, Tag, Dropdown, Menu, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../store/UserContext';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat)
const { Title } = Typography;

const PollsList = () => {
    const [data, setData] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/polls/pollslist/${userCtx.uuid}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [userCtx.uuid]);

    const getStatus = (endDate, endTime, startDate, startTime) => {
        const now = new Date();
        const finalDate = dayjs(endDate + " " + endTime, "YYYY-MM-DD HH:mm A")
        if (endDate && endTime && finalDate < now) {
            return { status: 'Ended', color: 'red' };
        }
        const initialDAte = dayjs(startDate + " " + startTime, "YYYY-MM-DD HH:mm A");
        if (initialDAte > now) {
            return { status: 'Not Started', color: 'blue' };
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
            }} style={{ color: 'navy', fontWeight: 'bold' }}>
                Delete
            </Menu.Item>
            <Menu.Item key="3">
                <Link to={`/editpoll/${record._id}`}>Edit</Link>
            </Menu.Item>
        </Menu>
    );

    const deletePoll = () => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/polls/deletepoll/${selectedPoll._id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                // Update the data by removing the deleted poll from the state
                // const updatedData = data.filter((poll) => poll._id !== selectedPoll._id);
                // setData(updatedData);
            })
            .catch((error) => {
                console.error('Error deleting poll:', error);
            });
        setDeleteModalVisible(false);
    };

    // Reload data after deleting a poll
    useEffect(() => {
        if (deleteModalVisible === false) {
            fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/polls/pollslist/${userCtx.uuid}`)
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
                style={{ borderWidth: '2px', borderColor: 'black' }}>

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
                }} />
                <Table.Column
                    title="Status"
                    dataIndex="endDate"
                    key="status"
                    align="center"
                    render={(endDate, record) => {
                        const { status, color } = getStatus(endDate, record.endTime, record.startDate, record.startTime);
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
