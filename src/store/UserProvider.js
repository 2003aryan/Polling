import React, { useEffect, useState } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [uuid, setUuid] = useState('');

    useEffect(() => {
        const storedUserIdentifier = localStorage.getItem('userIdentifier');
        if (storedUserIdentifier) {
            setUuid(storedUserIdentifier);
        } else {
            // If not found in localStorage, try sessionStorage
            const storedSessionUserIdentifier = sessionStorage.getItem('userIdentifier');
            if (storedSessionUserIdentifier) {
                setUuid(storedSessionUserIdentifier);
                localStorage.setItem('userIdentifier', storedSessionUserIdentifier);
            }
        }
    }, []);

    const globalLoginHandler = (userID) => {
        if (userID) {
            localStorage.setItem('userIdentifier', userID);
            sessionStorage.setItem('userIdentifier', userID);
        }
        setUuid(userID);
    };

    const globalLogoutHandler = () => {
        localStorage.removeItem('userIdentifier');
        sessionStorage.removeItem('userIdentifier');
        setUuid(null);
    };


    return (
        <UserContext.Provider value={{ uuid, globalLoginHandler, globalLogoutHandler }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;