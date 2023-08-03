import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPoll } from '@fortawesome/free-solid-svg-icons';
import '../css/custom.css';

const Navbar = () => {
    const { globalLogoutHandler, uuid } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);

    const onLogoutHandler = () => {
        globalLogoutHandler();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div style={{ marginBottom: '50px' }}>
            <nav className="nav-kc navbar navbar-expand-lg px-5">
                <Link className="navbar-brand" to="/pollslist" style={{ fontStyle: 'italic' }}>
                    <FontAwesomeIcon icon={faPoll} style={{ marginRight: '5px' }} />
                    LivePoll
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText" 
                    onClick={toggleMenu} 
                    aria-controls="navbarText"
                    aria-expanded={showMenu}
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        style={{ color: 'navy' }}
                    />
                </button>
                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        {uuid && (
                            <React.Fragment>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/createpoll">
                                        Create Poll <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pollslist">
                                        Dashboard
                                    </Link>
                                </li>
                            </React.Fragment>
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
                        <span
                            className="navbar-text border px-3 rounded"
                            onClick={onLogoutHandler}
                            style={{ cursor: 'pointer' }}
                        >
                            <Link to="/">Logout</Link>
                        </span>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
