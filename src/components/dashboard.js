import React, { useEffect, useState } from 'react';
import '../css/dashboard.css'
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const Dashboard = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/api/polls/pollslist`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setList(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

    }, []);

    return (
    <div>
        <Title level={2} className='col-5 mx-auto my-1'>Your Polls</Title><br />

        {list && list.map((item, index) => (
            <div key={index}>
                <div key={index} className=' pl-5 py-3 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)'}}>
                <div className='rounded px-2' style={{ display: 'inline-block', border: "1px solid black", backgroundColor: "#DFC298" }}>Room No. 2345</div>
                <div className='column' style={{display: 'inline-block'}}>{item.startDate}</div>
                <div className='my-2'><h4>{item.question}</h4></div>
                <div className='text-success mt-1' style={{display: 'inline-block',}}>Status: Open</div>
                <Link to={`/finalpoll/${item._id}`} style={{ color: 'black' }}>
                <div className='rounded px-2 mr-3' 
                style={{ display: 'inline-block', border: "1px solid black", backgroundColor: "#DFC298", float: 'right' }}>View Poll</div><br />
                </Link>
                </div>
            <br/><br/>
            </div>
            ))
        }
    </div>
    )
}

export default Dashboard