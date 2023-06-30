import React from 'react'
import '../css/CreatePoll.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div style={{marginBottom:'90px'}}><nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#7C5026'}}>
            <Link className="navbar-brand" to="/" style={{ fontStyle: 'italic' }}>LivePoll</Link>
            <div className="collapse navbar-collapse" id="navbarText" >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/pollslist">Polls List</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Create Poll <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">FAQs</Link>
                    </li>
                </ul>
                <span className="navbar-text border px-3 rounded text-white mr-3">
                    <Link to="/login">Login</Link>                    
                </span>
                <span className="navbar-text border px-3 rounded text-white">
                    <Link to="/register">Sign Up</Link>                    
                </span>
            </div>
        </nav>
        </div>
    )
}

export default Navbar