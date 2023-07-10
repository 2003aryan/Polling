import React, { Fragment, useContext } from 'react'
// import '../css/CreatePoll.css';
import { Link } from 'react-router-dom';
import UserContext from '../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const userCtx = useContext(UserContext);

    const onLogoutHandler = ()=>{
        userCtx.globalLogoutHandler();
    }

    return (
        <div style={{ marginBottom: '90px' }}>
            <nav className="navbar navbar-expand-lg fixed-top px-5" style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}>
                <Link className="navbar-brand" to="/" style={{ fontStyle: 'italic' }}>
                    <FontAwesomeIcon icon={faPoll} style={{ marginRight: '5px' }} />
                    LivePoll
                </Link>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <Link className="nav-link" to="/createPoll">Create Poll <span className="sr-only">(current)</span></Link>
                        </li>
                    {userCtx.uuid && <li className="nav-item">
                            <Link className="nav-link" to="/pollslist">Polls List</Link>
                    </li>}
                    {/* <li><Link className="nav-link" to="/pollslist">Polls List</Link></li> */}

                        <li className="nav-item">
                            {/* <Link className="nav-link" to="#">FAQs</Link> */}
                        </li>
                    </ul>
               {!userCtx.uuid && <Fragment><span className="navbar-text border px-3 rounded text-white mr-3">
                        <Link to="/login">Login</Link>
                    </span>
                    <span className="navbar-text border px-3 rounded text-white">
                        <Link to="/register">Sign Up</Link>
                </span></Fragment>}
                {userCtx.uuid && <span className="navbar-text border px-3 rounded text-white" onClick={onLogoutHandler} style={{cursor : 'pointer'}}>
                    <span>Logout</span>                    
                </span>}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;