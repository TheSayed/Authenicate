import React, { useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Router, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext.js';


export default function NavBar() {


    let { setUserToken, userToken } = useContext(UserContext)
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('userToken')
        setUserToken(null)
        navigate('./login')
    }

    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                {userToken !== null ?
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>

                        <li className="nav-item ms-auto mb-2 mb-lg-0">
                            <Link className="nav-link active cursor-pointer" onClick={() => { logout() }} to="/register" >Logout</Link>
                        </li>

                    </ul> : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/register">register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">login</Link>
                        </li>

                    </ul>
                }

            </div>
        </div>
    </nav>

}

