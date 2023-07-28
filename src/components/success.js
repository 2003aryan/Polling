import React from 'react';
import { Button, Result } from 'antd';
const Success = () => (
    <Result
        status="success"
        title="Vote successful"
        subTitle="Thank you for participating in this poll. Your vote has been counted."
        // extra={[
        //     <Button type="primary" key="console">
        //         Go Console
        //     </Button>,
        //     <Button key="buy">Buy Again</Button>,
        // ]}
    />
);
export default Success;