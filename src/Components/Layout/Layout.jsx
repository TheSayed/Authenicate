import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'

import Login from '../Login/Login.jsx'
import UserContextProvider from '../../Context/userContext.js'



export default function Layout() {
    return (<>
        <UserContextProvider>
            <NavBar />
            <Outlet />
        </UserContextProvider>
    </>
    )
}
