import React from 'react'
import '../css/dashboard.css'
import { Typography } from 'antd';
const { Title } = Typography;
const Dashboard = () => {
    return (
        <div>
            <Title level={2} className='col-5 mx-auto my-1'>Your Polls</Title><br />

            <div className=' pl-5 py-2 col-5 mx-auto shadow' style={{ borderRadius: '40px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)'}}>
                <div className='rounded px-2' style={{ display: 'inline-block', border: "1px solid black", backgroundColor: "#DFC298" }}>Room No. 2345</div>
                <div className='column' style={{display: 'inline-block'}}>Date: 1st Jan 2023</div>
                <div className='my-2'><h4>Who will be the president?</h4></div>
                <div className='text-success mt-1'>Status: Closed<br /></div>

                {/* <div className="container">
                    <div className="row">
                        <div className="column">Column 1</div>
                        <div className="column">Column 2</div>
                        <div className="column">Column 3</div>
                        <div className="column">Column 4</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard