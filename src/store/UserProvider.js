import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [uuid, setUuid] = useState('');

    return (
        <UserContext.Provider value={{uuid, setUuid}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;