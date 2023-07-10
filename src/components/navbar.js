import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import '../css/Master.css';

const Navbar = () => {
    const { globalLogoutHandler, uuid } = useContext(UserContext);

    const onLogoutHandler = () => {
        globalLogoutHandler();
    };

    return (<div style={{ marginBottom: '90px' }}>
        <nav className="nav-kc navbar navbar-expand-lg fixed-top px-5">
            <Link className="navbar-brand" to="/" style={{ fontStyle: 'italic' }}>
                <FontAwesomeIcon icon={faPoll} style={{ marginRight: '5px' }} />
                LivePoll
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/createPoll">
                            Create Poll <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    {uuid && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/pollslist">
                                Polls List
                            </Link>
                        </li>
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