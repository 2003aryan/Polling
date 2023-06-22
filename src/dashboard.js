import React from 'react'
import './dashboard.css'
import { Typography, Input, DatePicker, TimePicker, Button } from 'antd';
const { Title } = Typography;
const Dashboard = () => {
    return (
        <div>
            <Title level={2} className='col-5 mx-auto my-5'>Your Polls</Title><br />

            <div className=' p-5 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', marginBottom: '5%' }}>
                Room No. 2345<br />
                Who will be the president?<br />
                Status: Closed<br />

                <div className="container">
                    <div className="row">
                        <div className="column">Column 1</div>
                        <div className="column">Column 2</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard