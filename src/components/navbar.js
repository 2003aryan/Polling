import React from 'react'

const Navbar = () => {
    return (
        <div><nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Polling</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Create Poll <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Edit Poll</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"></a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Login / Signup
                </span>
            </div>
        </nav></div>
    )
}

export default Navbar