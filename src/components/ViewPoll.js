import React, { useContext, useEffect, useState } from 'react';
import { Typography, Radio, Space, Button, Input, Divider, message, Alert, Modal, Result } from 'antd';
import '../css/custom.css';
import { useHistory, useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import QRCode from 'react-qr-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import UserContext from '../store/UserContext';

const ViewPoll = () => {

    let { id } = useParams();
    const history = useHistory();
    const { Title } = Typography;
    const [ans, setAns] = useState('');
    const [poll, setPoll] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isEndDatePassed, setIsEndDatePassed] = useState(false);
    const [isRadioSelected, setIsRadioSelected] = useState(false);
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss'); 
    const { uuid } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/polls/viewpoll/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPoll(data);

                const endDateTime = data.endDate && data.endTime ? dayjs(`${data.endDate} ${data.endTime}`, 'YYYY-MM-DD h:mm A').format('YYYY-MM-DD HH:mm:ss') : null;
               
                if (data.endDate && data.endTime && now > endDateTime) {
                    setIsEndDatePassed(true);
                } else {
                    setIsEndDatePassed(false);
                }

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const startDateTime = poll.startDate && poll.startTime ? dayjs(`${poll.startDate} ${poll.startTime}`, 'YYYY-MM-DD h:mm A').format('YYYY-MM-DD HH:mm:ss') : null;
    
    const handleAns = () => {
        if (!isRadioSelected) {
            messageApi.warning('Please select an option before submitting.');
            return;
        }
        if (isEndDatePassed) {
            messageApi.warning('The poll has ended. Voting is no longer allowed.');
            return;
        }
        if (startDateTime >now) {
            messageApi.info('The poll has not started. Voting is not permitted.');
            return;
        }
        if(poll.reqName){
            if(!name){
                messageApi.warning('Please enter name');
                return;
            }
            if(!email){
                messageApi.warning('Please enter email');
                return;
            }
        }
        const data = { ans, questionid: id, name, email, uuid }
        console.log('Submitting answer:', data);
        saveAns(data);
        setAns('');
        // message.success('Vote Submitted!');
        // history.push(`/success`);
    };

    const handleRadioClick = () => {
        setIsRadioSelected(true);
    };

    const saveAns = (data) => {
        fetch(`${process.env.NODE_ENV !== 'production' ? 'http://localhost:5001' : ''}/api/polls/viewpoll/${id}/saveans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(async (res) => {
                if (res.status === 409) {
                    const data = await res.json();
                    messageApi.warning(data.message);
                }
                return res.json();
            })
            .then((data) => {
                message.success('Vote Submitted!');
                history.push(`/success`);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error saving answer:', error);
            });
    };

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span></span>;
        } else {
            return (
                <span style={{ color: 'red' }}>
                    Voting ends in {days} days, {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </span>
            );
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const textToCopy = window.location.href;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
            })
            .catch((error) => {
                console.error('Failed to copy to clipboard:', error);
            });
    };

    const pollEndTime = dayjs(poll.endTime, 'h:mm A').format('HH:mm:ss');

    return (
        <div className='component py-4 px-5 col-sm-5 mx-auto shadow'>{contextHolder}

            {isEndDatePassed && <Alert message="The poll has ended. Voting is no longer allowed." type="warning" showIcon className='mb-3' />}
            { startDateTime > now && <Alert message="The poll has not started. Voting is not permitted." type="info" showIcon className='mb-3' />}

           {!poll.login || uuid ? (<>
            {poll.reqName && (
                <div>
                    <Title level={4} className='mb-4'>Your Details</Title>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '10px', alignItems: 'center', marginTop: '10px' }}>Name:</p>
                        <Input placeholder="Enter your name" style={{ width: '500px' }} value={name}   onChange={(e) => setName(e.target.value)} className='col' />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <p style={{ marginRight: '14px', alignItems: 'center', marginTop: '15px' }}>Email:</p>
                        <Input placeholder="Enter your email" style={{ width: '500px' }} value={email} onChange={(e) => setEmail(e.target.value)} className='col' />
                    </div>

                    <Divider />
                </div>

            )}

            <Title level={4} className='mb-4'>{poll.question}</Title>
            <Radio.Group onChange={(e) => { setAns(e.target.value) }} value={ans} style={{ width: "100%" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    {poll.options && poll.options.map((option, index) => (
                        <div className='option' key={index}>
                            <Radio onClick={handleRadioClick} className='custom-radio' value={option}>{option}</Radio>
                        </div>
                    ))
                    }
                </Space>
            </Radio.Group>

            <br /><br />
            <div className="d-flex justify-content-between">
                <Button type="primary" className="blueBg" onClick={handleAns} style={{ width: '120px' }}>
                    Submit
                </Button>

                <Button type="default" onClick={showModal} style={{ width: '120px' }}>
                    <FontAwesomeIcon icon={faShareAlt} style={{ marginRight: '5px' }} />
                    Share
                </Button>
            </div>

            <Modal title="Share this poll" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <div style={{ textAlign: 'center' }}><br />
                    <QRCode title="qrcode" value={window.location.href} />
                </div><br />
                <Input
                    id="link-input"
                    value={window.location.href}
                    addonAfter={
                        <Button type="text" onClick={copyToClipboard} style={{ height: '30px' }}>
                            <p><FontAwesomeIcon icon={faLink} style={{ color: '#1890ff' }} />  Copy</p>
                        </Button>
                    }
                />
                {copied && <p style={{ color: 'green' }}>Successfully copied.</p>}
                Share Link: <Button className='mt-3' shape="circle" onClick={() => {
                    const message = 'Check out this link: ' + window.location.href;
                    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
                    window.location.href = url
                }}><FontAwesomeIcon
                        icon={faWhatsapp}
                        style={{ color: 'green', fontSize: '20px' }}
                    />
                    </Button>
            </Modal>

            {poll.endDate && <Countdown date={new Date(poll.endDate + "T" + pollEndTime)} renderer={renderer} />}
            </>) : (<>
                    <Result
                        status="warning"
                        title="You need to login to access the poll"
                        extra={
                            <Button type="primary" key="login" size='large' style={{ backgroundColor: 'navy' }}
                                onClick={() => {history.push('/login');}}>
                                Login
                            </Button>
                        }
                    />
            </>)}
        </div>
    );
};

export default ViewPoll;