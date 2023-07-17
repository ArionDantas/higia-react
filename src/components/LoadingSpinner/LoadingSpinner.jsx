// import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner gap-1">
                <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
