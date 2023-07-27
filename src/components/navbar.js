import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import '../css/custom.css';

const Navbar = () => {
    const { globalLogoutHandler, uuid } = useContext(UserContext);

    const onLogoutHandler = () => {
        globalLogoutHandler();
    };

    return (<div style={{ marginBottom: '50px' }}>
        <nav className="nav-kc navbar navbar-expand-lg px-5">
            <Link className="navbar-brand" to="/homepage" style={{ fontStyle: 'italic' }}>
                <FontAwesomeIcon icon={faPoll} style={{ marginRight: '5px' }} />
                LivePoll
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                             <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    {uuid && (<ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/createpoll">
                                Create New Poll <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pollslist">
                                Dashboard
                            </Link>
                        </li></ul>
                    )}
                    <li className="nav-item">
                        {/* <Link className="nav-link" to="#">FAQs</Link> */}
                    </li>
                </ul>
                {!uuid ? (
                    <span>
                        <span className="navbar-text border px-3 rounded mr-4">
                            <Link to="/login">Login</Link>
                        </span>
                        <span className="navbar-text border px-3 rounded text-white">
                            <Link to="/register"> Sign Up</Link>
                        </span>
                    </span>
                ) : (
                    <span className="navbar-text border px-3 rounded"
                        onClick={onLogoutHandler}
                        style={{ cursor: 'pointer' }}>
                            <Link to="/">Logout</Link>
                    </span>
                )}
            </div>
        </nav>
    </div>
    );
};

export default Navbar;