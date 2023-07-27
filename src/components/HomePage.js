import React from 'react';

const HomePage = () => {
    return (
        <div>
            {/* Header section */}
            <div className="container text-center vertical-space">
                <div className="col-12">
                    <h3 className="display-4">Tracking website updates,</h3>
                    <h3 className="display-4">automated and simplified</h3>
                    <br />
                    <button className="btn btn-primary text-white btn-lg">Get Started for Free</button>
                </div>
            </div>

            {/* Content section */}
            <div className="container vertical-space">
                <div className="row">
                    <div className="col-6">
                        <img src="https://distill.io/images/home/homepage-step-1.svg" className="img-fluid" alt="Step 1" />
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <h3 style={{ whiteSpace: 'pre-wrap' }}>
                            1
                            Select the parts of the
                            page you want to track
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
