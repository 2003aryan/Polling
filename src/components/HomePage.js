import React from 'react';

const HomePage = () => {
    return (
        <div className="container">
            <div className="left">
                <h1>Welcome to the Polling App</h1>
                <p>Cast your vote and make your voice heard!</p>
                <button className="button">Vote Now</button>
            </div>
            <div className="right">
                <img className="image"  alt="Polling App Image" />
            </div>
        </div>
    );
};

export default HomePage;
