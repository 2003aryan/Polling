import React from 'react'
import './CreatePoll.css';

const Navbar = () => {
    return (
        <div style={{marginBottom:'5%'}}><nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#7C5026'}}>
            <a className="navbar-brand" href="#" style={{ fontStyle: 'italic' }}>LivePoll</a>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarText" >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Create Poll <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Edit Poll</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">FAQs</a>
                    </li>
                </ul>
                <span className="navbar-text border px-3 rounded text-white">
                    Login / Sign Up
                </span>
            </div>
        </nav>
        </div>
    )
}

export default Navbar