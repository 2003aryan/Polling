import { createContext } from 'react';

const UserContext = createContext({
    uuid: '',
    setUuid: () => { },
});

export default UserContext;