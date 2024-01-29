import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        if (userToken) {
            localStorage.setItem('userToken', userToken); // Store the user token in local storage
        }
    }, [userToken]); // Run the effect whenever userToken changes



    return <UserContext.Provider value={{ setUserToken, userToken }}>
        {props.children}
    </UserContext.Provider>

};

export default UserContextProvider;