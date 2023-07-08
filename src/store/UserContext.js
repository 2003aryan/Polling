import { createContext } from 'react';

const UserContext = createContext({
    uuid: '',
    globalLogoutHandler: () => { },
    globalLoginHandler : () => { }, 
});

export default UserContext;